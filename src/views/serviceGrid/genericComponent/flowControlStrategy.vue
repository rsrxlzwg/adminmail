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
    />
  </div>
</template>

<script>
import compTable from '../../components/table'
import headersearch from '@/views/components/search'
import { getInfo, submitInfo, editInfo, deleteInfo } from '@/api/commonComponents/flowControlStrategy'

export default {
  name: 'Culster',
  components: {
    compTable,
    headersearch
  },
  data() {
    return {
      visible: false,
      tableModel: {
        tableData: [
        ],
        rowData: [
          {
            prop: 'strategyName',
            label: '流控策略名称'
          },
          {
            prop: 'strategyHandle',
            label: '策略解析类'
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
          total: 2
        }
      },

      formModel: {
        formData: {
          id: '',
          strategyName: '',
          strategyHandle: '',
          description: ''
        },
        formLabelWidth: '110px',
        formFilds: [
          {
            label: '流控策略名称',
            prop: 'strategyName',
            type: 'input',
            disabled: false
          },
          {
            label: '策略解析类',
            prop: 'strategyHandle',
            type: 'input',
            disabled: false
          },
          {
            label: '描述',
            prop: 'description',
            type: 'textarea',
            disabled: false
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
            style: '',
            label: '新增'
          },
          {
            label: '编辑',
            style: '',
            type: 'edit'
          },
          {
            label: '删除',
            style: '',
            type: 'delete'
          },
          {
            type: 'issue',
            style: '',
            label: '查看关联'
          }
        ],
        formModel: {
          strategyName: ''
        },
        searchFild: [
          {
            type: 'input',
            label: '流控策略名称',
            prop: 'strategyName'
          }
        ]
      }
    }
  },

  mounted() {
    this.getList()
  },

  methods: {

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
