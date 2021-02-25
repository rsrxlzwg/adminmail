<template>
  <div>
    <el-tabs
      v-model="activeName"

    >
      <el-tab-pane
        label="协议基本信息"
        name="first"
      >
        <div class="overflow">
          <el-row :gutter="20">
            <el-col :span="10">
              <el-card style="marginBottom:20px;height:360px">
                <span slot="header">基本信息</span>
                <el-form
                  ref="form"
                  :model="formData"
                  label-width="100px">
                  <el-form-item label="协议名称">
                    <el-input
                      v-model="formData.protocolName"
                      size="mini"
                    />
                  </el-form-item>
                  <el-form-item label="访问模式">
                    <el-select
                      v-model="formData.visitType"
                      size="mini"
                      style="width:100%"
                      placeholder=""
                    ><el-option
                      label="C端接入"
                      value="0"
                    />
                      <el-option
                        label="P端接出"
                        value="1"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="通讯类型">
                    <el-select
                      v-model="formData.communicationType"
                      size="mini"
                      style="width:100%"
                      placeholder=""
                    ><el-option
                      label="SDK内部"
                      value="0"
                    />
                      <el-option
                        label="SDK外部"
                        value="1"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="协议类型名称">
                    <el-select
                      v-model="formData.protocolId"
                      size="mini"
                      style="width:100%"
                      placeholder=""
                    ><el-option
                        v-for="item in esbBaseProtocolInfos"
                        :label="item.typeName"
                        :value="item.id"
                        :key="item.id"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="报文模式">
                    <el-select
                      v-model="formData.messageId"
                      size="mini"
                      style="width:100%"
                      placeholder=""
                    ><el-option
                      v-for="item in esbBaseMessagePatterns"
                      :label="item.patternName"
                      :value="item.id"
                      :key="item.id"
                    />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="异常处理">
                    <el-select
                      v-model="formData.exceptionId"
                      size="mini"
                      style="width:100%"
                      placeholder=""
                    ><el-option
                      v-for="item in esbBaseExceptionHandles"
                      :label="item.exceptionHandle"
                      :value="item.id"
                      :key="item.id"
                    />
                    </el-select>
                  </el-form-item>
                    <el-form-item label="模式">
                    <el-select
                      v-model="formData.type"
                      size="mini"
                      style="width:100%"
                      placeholder=""
                    ><el-option
                        label="同步"
                        value="0"
                      />
                      <el-option
                        label="异步"
                        value="1"
                      />
                    </el-select>
                  </el-form-item>
                </el-form>
              </el-card>
            </el-col>
            <el-col
              :span="10"
              :offset="1"
            >
              <el-card style="marginBottom:20px;height:360px">
                <span slot="header">请求参数</span>
                <el-form
                  ref="form"
                  :model="formData"
                  label-width="100px"
                >
                  <el-form-item label="地址">
                    <el-input
                      v-model="formData.requestValue.requestUrl"
                      size="mini"
                    />
                  </el-form-item>
                  <el-form-item label="请求方式">
                    <el-select
                      v-model="formData.requestValue.requestType"
                      size="mini"
                      style="width:100%"
                      placeholder=""
                    >
                      <el-option
                        label="GET"
                        value="0"
                      />
                      <el-option
                        label="POST"
                        value="1"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="端口" v-if="formData.visitType == '0'">
                    <el-input
                      v-model="formData.requestValue.port"
                      size="mini"
                      v-if="formData.visitType == '0'"
                    />
                  </el-form-item>
                  <el-form-item label="线程池类型">
                    <el-select
                      v-model="formData.requestValue.threadTypeId"
                      size="mini"
                      style="width:100%"
                      placeholder=""
                    ><el-option
                      v-for="item in esbBaseThreadManages"
                      :label="item.name"
                      :value="item.id"
                      :key="item.id"
                    />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="请求编码">
                    <el-select
                      v-model="formData.requestValue.requestCode"
                      size="mini"
                      style="width:100%"
                      placeholder=""
                    >
                      <el-option
                        label="GBK"
                        :value="0"
                      />
                      <el-option
                        label="UTF-8"
                        :value="1"
                      />
                    </el-select>
                  </el-form-item>
                </el-form>
              </el-card>
            </el-col>
          </el-row>
          <el-row>
            <el-card
              style="marginBottom:20px;width:90%"
              v-if="formData.visitType == '1'"
            >
              <span slot="header">响应参数</span>
              <el-form
                ref="form"
                :model="form"
                label-width="85px"
              >
                <el-form-item label="响应编码">
                  <el-select
                    v-model="formData.responseValue.responseCode"
                    size="mini"
                    style="width:100%"
                    placeholder=""
                  >
                    <el-option
                      label="GBK"
                      :value="0"
                    />
                    <el-option
                      label="UTF-8"
                      :value="1"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="映射码转换">
                  <el-transfer
                    size='mini'
                    v-model="formData.responseValue.codeMappingIds"
                    :data="esbBaseMappingCodes"
                    :props="{
                      key: 'id',
                      label: 'mappingName'
                    }"
                  ></el-transfer>
                </el-form-item>
              </el-form>
            </el-card>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane
        label="适配流程"
        name="second"
      >
        <div style="marginBottom:20px">
          <span style="marginRight:10px">适配流程</span>
          <el-select
            @change="getBaseServices"
            v-model="formData.adaptationId"
            size="mini"
            style="width:80%"
            placeholder=""
          ><el-option
            v-for="item in esbBaseAdaptationFlows"
            :label="item.name"
            :value="item.id"
            :key="item.id"
          />
          </el-select>
        </div>
        <rendertable
          ref="editTable"
          :table-header="tableHeader1"
          :table-data="tableData1"
          :showselect='false'
        />
      </el-tab-pane>

    </el-tabs>

  </div>
</template>

<script type="text/ecmascript-6">
import rendertable from '@/views/projectManagement/components/table'
import {getProtocolList,getBaseServiceList,submitInfo,editInfo} from '@/api/commonComponents/protocolManage'
export default {
  components: {
    rendertable
  },
  props:{
    formData:{
      type:Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      esbBaseAdaptationFlows:[],
      esbBaseExceptionHandles:[],
      esbBaseMappingCodes:[],
      esbBaseMessagePatterns:[],
      esbBaseProtocolInfos:[],
      esbBaseThreadManages:[],
      esbBaseAdaptationFlowInfoList:[],
      activeName: 'first',
      tableHeader: [
        {
          prop: 'key',
          label: 'key',
          render: (h, { row }) => {
            return h('el-input', {
              attrs: {
                size: 'mini',
                value: row[ 'key' ]
              },
              on: {
                input: (e) => {
                  row[ 'key' ] = e
                }
              }
            })
          }
        },
        {
          prop: 'value',
          label: 'value',
          render: (h, { row }) => {
            return h('el-input', {
              attrs: {
                size: 'mini',
                value: row[ 'value' ]
              },
              on: {
                input: (e) => {
                  row[ 'value' ] = e
                }
              }
            })
          }
        }
      ],
      tableData: [
        {
          key: '',
          value: ''
        }
      ],
      tableHeader1: [
        {
          prop: 'abstractName',
          label: '基础抽象服务'
        },
        {
          prop: 'description',
          label: '描述'
        }
      ],
      tableData1: [
      ],
      pagination:{
        currentPage: 1,
        pagesize: 10,
        total:10,
        show:true
      },
    }
  },
  beforeCreate(){
    getProtocolList().then(res=>{
      if(res.code===200){
        this.esbBaseAdaptationFlows = res.data.esbBaseAdaptationFlows;
        this.esbBaseExceptionHandles = res.data.esbBaseExceptionHandles;
        this.esbBaseMappingCodes = res.data.esbBaseMappingCodes;
        this.esbBaseMessagePatterns = res.data.esbBaseMessagePatterns;
        this.esbBaseProtocolInfos = res.data.esbBaseProtocolInfos;
        this.esbBaseThreadManages = res.data.esbBaseThreadManages;
      }else{
        this.$message({
          type: 'error',
          message: res.message
        })
      }
    })
  },
  methods:{
    getBaseServices(data){
      const param={
        id:data,
        pageSize:this.pagination.pagesize,
        pageNo:this.pagination.currentPage
      }
      getBaseServiceList(param).then(res=>{
        if(res.code===200){
       this.tableData1= res.data.data
        }else{
          this.$message({
            type: 'error',
            message: res.message
          });
        }
      })
    }

  }
}
</script>

<style scoped lang="scss">
.el-form-item {
  margin-bottom: 0;
}
.overflow {
  overflow-y: auto;
  overflow-x: hidden;
  height: 400px;
}
</style>
