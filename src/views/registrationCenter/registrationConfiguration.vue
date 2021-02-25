<template>
  <!-- 集群  -->
  <div class="culster-container">
      <headersearch :search-model="searchModel" :show="searchModel.show" @onSearch="onSearch" />
    <comp-table
      ref="compTable"
      :tableModel="tableModel"
      :formModel="formModel"
      :searchModel="searchModel"
    @openAdd="openAdd"
    @openEdit="openEdit"
      @editInfo="editInfo"
      @onSearch="onSearch"
      @delFun="delFun"
    ></comp-table>
    <el-dialog
      class="deepdialog"
      title="编辑"
      :visible.sync="visible"
      width="40%"
    >
      <component
        ref="childcomponet"
        is="addProcess"
        :fileData="fileData"
        @addAddress="addAddress"
        @delAddress="delAddress"
      ></component>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="testlint"
          size="mini"
        >测试链接</el-button>
        <el-button
          type="primary"
          @click="submitHandle"
          size="mini"
        >确 定</el-button>
        <el-button
          @click="visible = false"

          size="mini"
        >取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import compTable from '@/views/components/table'
import addProcess from './Registryconfiguration'
import headersearch from '@/views/components/search'
import { getInfo, submitInfo, editInfo, deleteOne } from '@/api/registryCenter/registConfig.js'

export default {
  name: "Culster",
  components: {
    compTable,
    addProcess,
    headersearch

  },
  filters:{
     filterType(type){
      const statusMap = {
        '1': 'Zookeeper',
        '2': 'Nacos',
      }
      return statusMap[type]
    },
  },
  data() {
    return {
      visible: false,
      tableModel: {
        tableData: [
        ],
        rowData: [

          {
            prop: 'registryName',
            label: '注册名'
          },
          {
            prop: 'registryType',
            label: '注册类型',
            render:(h,params)=>{
                return h("span", {
                  style: {
                    display: "inline-block",
                  },
              },
             this.$options.filters.filterType(params.row.registryType) );
            }
          },
          // {
          //   prop: 'registryAddress',
          //   label: '地址'
          // },
          {
            prop: 'registryComment',
            label: '备注'
          }


        ],
        operateData: [],
        pagination: {
          currentPage: 1,
          pagesize: 10,
          total: 4
        }
      },
      pagination: {
          currentPage: 1,
          pagesize: 10,
          total: 3
        },
      formModel: {
        formData: {
          registryName: '',
          registryType: '',
          registryAddress: '',
          registryComment:''
        },
        formLabelWidth: '100px',
        formFilds: [
          {
            label: '名称',
            prop: 'registryName',
            type: 'input',
            disabled: false,
          },
          {
            label: '注册类型',
            prop: 'registryType',
            type: 'select',
            disabled: false,
            options: [
              {
                label: 'Zookeeper',
                value: '1'
              },
              {
                label: 'Nacos',
                value: '2'
              }
            ]
          },
          {
            label: '地址',
            prop: 'registryAddress',
            type: 'inputBtn',
            disabled: false,
            btnName: '测试链接'
          },
        ],
        btnData: [
          {
            type: 'submit',
            style: 'primary',
            label: '确定',
            handle: () => { }
          },
          {
            type: 'cancle',
            label: '取消',
            style: '',
            handle: () => { }
          }

        ],
        rules: {
          tenantName: [
            { required: true, message: '请输入名称', trigger: 'registryName' },
          ],
        },
      },
      searchModel: {
        btnGroup: [
          {
            type: 'openAdd',
            style: '',
            label: '新增',
            funName: 'openAdd'

          },
          {
            label: '编辑',
            type: 'openEdit',
            funName: 'openEdit'
          },
          {
            label: '删除',
            type: 'delFun',
            funName: 'delFun'
          },

        ],
        formModel: {
          name: '',
        },
        searchFild: [
          {
            type: 'input',
            label: '名称',
            prop: 'registryName'
          },
          {
            type: 'select',
            label: '类型',
            prop: 'registryType',
            options: [
              {
                label: 'Zookeeper',
                value: '1'
              },
              {
                label: 'Nacos',
                value: '2'
              }
            ]
          },
        ]
      },
      addVisible: false,
      fileData: {
        id:'',
        mainRegistryId:'',
        standbyRegistryId:'',
        registryName: '',
        registryType: '',
        registryAddress:'',
        registryComment: '',
        addressTable:[]
      },

    };
  },
  mounted() {
     this.getList()
  },
  methods: {
      onSearch() {
        // console.log('123456',)
      this.tableModel.pagination.currentPage=1
      this.tableModel.pagination.pagesize=10
      this.getList()
    },
    getList() {
      const params = {
        'requestObject': {
          ...this.searchModel.formModel
        },
        'pageNo': this.tableModel.pagination.currentPage,
        'pageSize': this.tableModel.pagination.pagesize
      }
      getInfo(params).then(res => {
        if (res.code === 200) {
          this.tableModel.tableData = res.data.data
          this.tableModel.pagination.total = res.data.totalCount
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      })
    },
    addAddress(){
      this.fileData.addressTable.push({
        IPaddress:'',
        port:''
      })
    },
    delAddress(index){
        this.fileData.addressTable.splice(index,1)
    },
    submitInfo(params) {
      console.log(params,"params")
      submitInfo(params).then(res => {
        if (res.code === 200) {
          this.visible=false
          this.getList()
        }
      })
    },
    openAdd(){
      this.pageType = "add";
      this.visible=true
      Object.keys(this.fileData).map((key) => (this.fileData[key] = ""));
      this.fileData.addressTable=[{
        IPaddress:'',
        port:''
      }]
    },
     openEdit() {
      this.selectDisabled = true;
      const selectionData = this.$refs.compTable.$refs.commonTable.selection
      if (selectionData.length !== 1) {
        this.$message({
          type: "warning",
          message: "请选择一条数据",
        });
        return false;
      }
      const address=this.fileData.registryAddress
      let table=address.split(',')
      let addressTable=[]
      table.forEach(e=>{
        let item=e.split(':')
        addressTable.push({
           IPaddress:item[0],
          port:item[1]
        })
      })
      this.visible = true;
      this.pageType = "edit";
      let refForm = this.fileData;
      Object.keys(refForm).forEach(key => { refForm[ key ] = selectionData[ 0 ][ key ] })
      this.fileData.addressTable=addressTable
     },
    editInfo(params) {
      console.log(params,"params")
      editInfo(params).then(res => {
        if (res.code === 200) {
          this.$refs.compTable.hideDialog()
          this.visible=false
          this.getList()
        }
      })
    },

    delFun() {
      // 获取选中值
      const selectionData = this.$refs.compTable.$refs.commonTable.selection
      if (selectionData.length !== 1) {
        this.$message({
          type: "warning",
          message: "请选择一条数据",
        });
        return false;
      }
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
      const ids = []
      selectionData.forEach(e => {
        ids.push(e.id)
      })
      console.log({ids})
      deleteOne(ids[0]).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getList()
        }
      })
        })
    },
    submitHandle() {
      // const params = this.formData;

      const table=this.fileData.addressTable
      let address=[]
      table.forEach(e=>{
        address.push(
          e.IPaddress+':'+e.port
        )
      })
      this.fileData.registryAddress=address.join(',')
      const params=JSON.parse(JSON.stringify(this.fileData))
      delete params.addressTable
      console.log('123456',params)
      if (this.pageType === "add") {
        console.log('111111',params)
        this.submitInfo(params);
      }
      if (this.pageType === "edit") {
        console.log('22222',params)
        this.editInfo(params);
      }
    },

    //测试链接
    testlint() {
      this.$refs.childcomponet.showInfos()
    },


  }
};
</script>

<style lang="scss" scoped>
.culster-container {
  // &-container {
  // }
  .mr0 {
    margin-right: 0 !important;
  }
  // form.el-form {
  //   float: right;
  // }
  .block {
    float: right;
    margin: 12px;
  }
}
</style>
