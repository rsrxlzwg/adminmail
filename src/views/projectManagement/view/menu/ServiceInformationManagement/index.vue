<template>
  <div>

    <el-card>
      <span slot="header">服务详情信息</span>
      <!-- <fieldset>
        <legend>基础信息</legend>
        <el-row
          type="flex"
          align="middle"
          style="margin-bottom:20px"
          :gutter="12"
        >
          <el-col :span="2">
            <span style="fontSize:'5px'">服务代码</span>
          </el-col>
          <el-col :span="3">
            <el-input v-model="basic.serviceCode" readOnly size="mini"/>
          </el-col>
          <el-col :span="2">
            <span style="fontSize:'5px'">服务名称</span>
          </el-col>
          <el-col :span="3">
            <el-input
              v-model="basic.serviceName"
              readOnly
              size="mini"
            ></el-input>
          </el-col>
          <el-col :span="2">
            <span style="fontSize:'5px'">服务版本</span>
          </el-col>
          <el-col :span="3">
            <el-input
              v-model="basic.version"
              readOnly
              size="mini"
            ></el-input>
          </el-col>
          <el-col :span="3">
            <span style="fontSize:'5px'">交易码</span>
          </el-col>
          <el-col :span="3">
            <el-input v-model="basic.transCode" readOnly
              size="mini"
            ></el-input>
          </el-col>
        </el-row>
      </fieldset> -->
      <el-card style="marginBottom:20px">
        <span slot="header">提供者和消费者关系</span>
        <rendertable
          ref="multipleTable"
          :table-data="relationData"
          :table-header="relationHeader"
          :showpagination=false
          @currentChange="currentChange"
          @sizeChange="sizeChange"
          :showselect='true'
        />
      </el-card>
      <el-card>
        <span slot="header">字段映射</span>
        <div>
          <el-row
            type="flex"
            align="middle"
            justify="center"
            style="backgroundColor:#EEF1F6;height:30px;borderBottom:1px solid #E2E2E2"
          >
            <el-col :span="5"/>
            <el-col :span="4" style="borderRight:1px solid #ccc">接口信息</el-col>
            <el-col :span="6"/>
            <el-col :span="6">元数据信息</el-col>
          </el-row>
          <rendertable
            :table-data="this.defineData"
            :table-header="defineHeader"
            cloumalign="left"
            :showpagination=false
          />
        </div>

      </el-card>
      <div style="width: 300px;margin: 30px auto;">
        <el-button type="primary" @click="$router.go(-1)">返 回</el-button>
      </div>
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
  // import renderlist from './moudle'
  // import ServiceSDA from './moudle/component/ServiceSDA'
  import rendertable from '@/views/projectManagement/components/table'
  import {getServiceDetail, getMetadataList} from '@/api/serviceManagement/offlineManagement/serviceInfoManage'

  export default {
    components: {
      rendertable
    },
    filters: {
      filterRequired(type) {
        const statusMap = {
          '0': '非必输',
          '1': '必输'
        }
        return statusMap[type]
      },
      filterDataType(type) {
        const statusMap = {
          '1': 'String',
          '2': 'Integer',
          '3': 'Long',
          '4': 'Double',
          '5': 'BigDecimal',
          '6': 'Boolean',
          '7': 'Date',
          '8': 'List',
          '9': 'Object'
        }
        return statusMap[type]
      },
      filterAppType(type){
        const statusMap = {
          '1': '消费方',
          '2': '服务方',
          '3': '消费方与服务方'
        }
        return statusMap[type]
      }
    },
    data() {
      return {
        mainParam: {},
        metadataList: [],
        requiredList: [{
          label: '非必输',
          value: '0'
        }, {
          label: '必输',
          value: '1'
        }],
        basic: {
          serviceCode: '',
          serviceName: '',
          version: '',
          transCode: ''
        },
        relationData: [],
        relationHeader: [
          {
            prop: 'appCode',
            label: '应用编码'
          },{
            prop: 'appAbbr',
            label: '应用简称'
          },
          {
            prop: 'appName',
            label: '应用名称'
          },
          {
            prop: 'appType',
            label: '应用类型',
            render: (h, {row}) => {
              return h('span', this.$options.filters.filterAppType(row.appType))
            }
          },
          {
            prop: 'tradeName',
            label: '交易名称'
          },
          {
            prop: 'tradeCode',
            label: '交易码'
          },
          {
            prop: 'interfaceCode',
            label: '接口编码'
          },
          {
            prop: 'interfaceDesc',
            label: '接口描述'
          }
        ],
        defineData: [],
        defineHeader: [
          {
            prop: 'fieldKey',
            label: '字段名称',
            width: 200
          },
          {
            prop: 'fieldName',
            label: '字段别名'
          },
          {
            prop: 'required',
            label: '是否必输入',
            render: (h, {row}) => {
              return h('span', this.$options.filters.filterRequired(row.required))
            }
          },
          {
            prop: 'description',
            label: '备注'
          },
          {
            prop: 'metadataKey',
            label: '元数据名'
          },
          {
            prop: 'metadataName',
            label: '属性名称'
          },
          {
            prop: 'metadataType',
            label: '数据类型',
            render: (h, {row}) => {
              return h('span', this.$options.filters.filterDataType(row.required))
            }
          },
          {
            prop: 'metadataLength',
            label: '数据长度'
          }
        ],
        pagination: {
          currentPage: 1,
          pagesize: 10,
          total: 0,
          show: true
        },
        pageType: ''
      }
    },
    mounted() {
      this.getSelected()
      this.getDetails()
    },
    methods: {
      getSelected() {
        getMetadataList().then(res => {
          if (res.code === 200) {
            this.metadataList = res.data
          } else {
            this.$message({
              type: 'error',
              message: res.message
            })
          }
        })
      },
      getDetails() {
        const tableData = [{
          id: 'ROOT',
          fieldKey: 'root',
          fieldName: '根节点',
          children: [{
            id: 'REQUEST',
            fieldKey: 'request',
            fieldName: '请求报文体',
            fieldType: '1',
            children: []
          }, {
            id: 'RESPONSE',
            fieldKey: 'response',
            fieldName: '响应报文体',
            fieldType: '2',
            children: []
          }]
        }]
        this.mainParam = this.$route.query
        getServiceDetail(this.mainParam.serviceId).then(res => {
          let detail = res.data
          for (let key in this.basic){
            this.basic[key] = detail[key]
          }
          this.relationData.push(detail.consumerApp)
          this.relationData.push(detail.providerApp)
          // this.relationData.push(detail.interfaceInfo)
          let fieldList = detail.interfaceFieldModelList
          for (let i in fieldList) {
            let field = fieldList[i]
            // 请求
            if (field.fieldType === '1') {
              tableData[0].children[0].children.push(field)
            }
            // 响应
            else {
              tableData[0].children[1].children.push(field)
            }
          }
          this.defineData = tableData
        })
      },
      sizeChange(val) {
        this.pagination.pagesize = val
        this.getList()
      },
      currentChange(val) {
        this.pagination.currentPage = val
        this.getList()
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
