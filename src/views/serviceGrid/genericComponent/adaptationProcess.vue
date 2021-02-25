<template>
  <div class="culster-container">
    <headersearch :search-model="searchModel" :show="searchModel.show" @onSearch="onSearch" />
    <comp-table
      ref="compTable"
      :table-model="tableModel"
      :form-model="formModel"
      :search-model="searchModel"
      @addProcess="addProcess"
      @issueFun="issueFun"
      @editFun="editFun"
      @submitHandle="submitInfo"
      @editHandle="editInfo"
      @sizeChange="sizeChange"
      @currentChange="currentChange"
      @delInfo="delInfo"
      @onSearch="onSearch"
    />

    <el-dialog class="deepdialog" title="控制台" :visible.sync="visible" width="40%">
      <component is="addProcess" :file-data="fileData" />
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="visible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="visible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import compTable from '../../components/table'
import addProcess from './addProcess'
import headersearch from '@/views/components/search'
import { getInfo, submitInfo, editInfo, deleteInfo, editFun} from '@/api/commonComponents/adaptationProcess'

export default {
  name: 'Culster',
  components: {
    compTable,
    addProcess,
    headersearch
  },
   filters:{
     filterType(type){
      const statusMap = {
        '0': 'C端流程',
        '1': 'P端流程',
      }
      return statusMap[type]
    },
  },
  data() {
    return {

      visible: false,
      tableModel: {
        tableData: [],
        rowData: [
          {
            prop: 'name',
            label: '流程名称'
          },
          {
            prop: 'flowType',
            label: '流程类型',
            render:(h,params)=>{
                return h("span", {
                  style: {
                    display: "inline-block",
                  },
              },
             this.$options.filters.filterType(params.row.flowType) );
            }
          },
          {
            prop: 'description',
            label: '流程描述'
          }
        ],
        operateData: [],
        pagination: {
          currentPage: 1,
          pagesize: 10,
          total: 3
        }
      },
      formModel: {
        formData: {
          id: '',
          name: '',
          flowType: '',
          description: ''
        },
        formLabelWidth: '140px',
        formFilds: [],
        btnData: [
          {
            type: 'submit',
            style: 'primary',
            label: '确定',
            handle: () => {}
          },
          {
            type: 'cancle',
            label: '取消',
            style: '',
            handle: () => {}
          }

        ]
      },
      searchModel: {
        btnGroup: [
          {
            type: 'add',
            style: '',
            label: '新增',
            url: '/gateway/addProcess'
          },
          {
            label: '编辑',
            type: 'editFun',
            funName: 'editFun'
          },
          {
            label: '删除',
            type: 'delete'
          },
          {
            type: 'issue',
            style: '',
            label: '查看关联'
          }
        ],
        formModel: {
          name: '',
          flowType:''
        },
        searchFild: [
          {
            type: 'input',
            label: '流程名称',
            prop: 'name'
          },
          {
            type: 'select',
            label: '流程类型',
            prop: 'flowType',
            options: [
              {
                label: 'C端流程',
                value: 0
              },
              {
                label: 'P端流程',
                value: 1
              }
            ]
          }
        ]
      },
      addVisible: false,
      fileData: {
        name: '',
        type: '',
        desc: '',
        content: [
          {
            name: '',
            desc: ''
          }
        ]
      }

    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    onSearch(){
      this.tableModel.pagination.currentPage=1
      this.tableModel.pagination.pagesize=10
      this.getList()
    },
    editFun(row) {
      console.log({row})
      if (row.length > 0) {
        this.$router.push('/gateway/addProcess')
        // this.visible=true
        // this.fileData=row[0]
      } else {
        this.$message({
          message: '请选择一条数据',
          type: 'warning'
        })
      }
    },
    issueFun() {
      this.$message.success('下发成功')
    },
    addProcess() {
      this.visible = true
    },

    delInfo(params) {
      deleteInfo({ids: params}).then(res => {
        if (res.code === 200) {
          this.$refs.compTable.hideDialog()
          this.getList()
        }
      })
    },

    addService() {
      this.addVisible = true
      this.selectid = 1
      this.pageType = 'add'
      this.dialogVisible = true
      Object.keys(this.formData).map(key => this.formData[key] = '')
    },
    getList() {
      const params={
        "requestObject": {
          ...this.searchModel.formModel
        },
        "pageNo": this.tableModel.pagination.currentPage,
        "pageSize": this.tableModel.pagination.pagesize
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
    submitInfo(params) {
      console.log({params})
      submitInfo(params).then(res => {
        if (res.status === 200) {
          this.$refs.compTable.hideDialog()
          this.getList()
        }
      })
    },
    editInfo(params) {
      editInfo(params).then(res => {
        if (res.status === 200) {
          this.$refs.compTable.hideDialog()
          this.getList()
        }
      })
    },
    sizeChange(val){
      this.pagination.pagesize=val
      this.getList()
    },
    currentChange(val){
      this.pagination.currentPage=val
      this.getList()
    }

  }
}
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
