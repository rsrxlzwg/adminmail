<template>

  <div class="culster-container">
    <headersearch :search-model="searchModel" :show="searchModel.show" @onSearch="onSearch" />
    <comp-table
      ref="compTable"
      :table-model="tableModel"
      :form-model="formModel"
      :search-model="searchModel"
      @submitHandle="submitInfo"
      @editHandle="editInfo"
      @delInfo="delInfo"
      @sizeChange="sizeChange"
      @currentChange="currentChange"
      @onSearch="onSearch"
      @editFun="editFun"
    />
  </div>
</template>

<script>
import compTable from '../../components/table'
import headersearch from '@/views/components/search'
import { getInfo, submitInfo, editInfo, deleteInfo, editFun } from '@/api/commonComponents/mappingCodeManagement'

export default {
  name: 'Culster',
  components: {
    compTable,
    headersearch
  },
  data() {
    return {
      tableModel: {
        tableData: [],
        rowData: [

          {
            prop: 'mappingName',
            label: '映射码'
          },
          {
            prop: 'metadataId',
            label: '元数据'
          },
          {
            prop: 'description',
            label: '描述'
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
          mappingName: '',
          metadataId: '',
          description: '',
          mappingInfo: [
            {
              primaryValue: '',
              presentValue: '',
              id:''
            }
          ]
        },
        formLabelWidth: '85px',
        formFilds: [
          {
            label: '映射码',
            prop: 'mappingName',
            type: 'input',
            disabled: false
          },
          {
            label: '元数据',
            prop: 'metadataId',
            type: 'input',
            disabled: false
          },
          {
            label: '描述',
            prop: 'description',
            type: 'textarea',
            disabled: false
          },
          {
            label: '映射值',
            prop: 'mappingInfo',
            type: 'other',
            disabled: false,
            tabelData: [
              {
                primaryValue: '',
                presentValue: '',
                default: ''
              }
            ],
            tabelFild: [
              {
                label: '原参数值',
                prop: 'primaryValue',
                type: 'input'
              },
              {
                label: '现参数值',
                prop: 'presentValue',
                type: 'input'
              }
            ]
          }
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
        ]
      },
      searchModel: {
        btnGroup: [
          {
            type: 'add',
            style: 'primary',
            label: '新增'
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
            label: '查看关联',
            type: 'search'
          }
        ],
        formModel: {
          mappingName: ''
        },
        searchFild: [
          {
            type: 'input',
            label: '映射码',
            prop: 'mappingName'
          }
        ]
      }
    }
  },

  mounted() {
    this.getList()
  },

  methods: {

    editFun(row) {
       if(row.length!==1){
      this.$message({
            message: '请选择一条数据',
            type: 'warning'
          });
    }else{
      this.$refs.compTable.dialogType = 'edit'
      editFun(row[0].id).then(res => {
        if (res.code === 200) {
          this.$refs.compTable.dialogFormVisible=true
          Object.keys(this.formModel.formData).forEach(key => { this.formModel.formData[ key ] =  res.data[ key ] })
        }
      })
    }
    },

    onSearch() {
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

    submitInfo(params) {
      console.log({params})
      JSON.stringify(params)
      submitInfo(params).then(res => {
        if (res.code === 200) {
          this.$refs.compTable.hideDialog()
          this.getList()
        }
      })
    },

    editInfo(params) {
      editInfo(params).then(res => {
        if (res.code === 200) {
          this.$refs.compTable.hideDialog()
          this.getList()
        }
      })
    },

    delInfo(params) {
      deleteInfo({ids: params}).then(res => {
        if (res.code === 200) {
          this.$refs.compTable.hideDialog()
          this.getList()
        }
      })
    },

    sizeChange(val) {
      this.tableModel.pagination.pagesize = val
      this.getList()
    },

    currentChange(val) {
      this.tableModel.pagination.currentPage = val
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
