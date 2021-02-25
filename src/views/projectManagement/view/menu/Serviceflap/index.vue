<template>
  <div>
    <headersearch :search-model="searchModel" @onSearch="onSearch" />
    <el-card>
      <rendertable
        ref="multipleTable"
        :table-data="renderdata"
        :table-header="renderheader"
        :actionlinedata="actionlinedata"
        :pagination="pagination"
        :showselect="true"
        @currentChange="currentChange"
        @sizeChange="sizeChange"
      />
    </el-card>
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <component
        :is="item.component"
        v-for="(item,i) in moudlelist.filter(e => e.id == selectid)"
        ref="refForm"
        :form-data="formData"
      />

      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="submitHandle"
        >确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>

      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import rendertable from '@/views/projectManagement/components/table'
import headersearch from '@/views/components/search'
import moudlelist from './moudle'
import {getInfo, submitInfo, editInfo, deleteOne} from '@/api/serviceManagement/offlineManagement/serviceflap'
export default {
  components: {
    rendertable,
    headersearch
  },
  data() {
    return {
      moudlelist,
      selectid: 1,
      dialogVisible: false,
      form: {},
      searchModel: {
        formModel: {
          baffleName: ''
        },
        searchFild: [
          {
            type: 'input',
            label: '挡板名称',
            prop: 'baffleName'
          }
        ]
      },
      renderheader: [
        {
          prop: 'baffleName',
          label: '挡板名称'
        },
        {
          prop: 'bodyInfo',
          label: '报文内容'
        },
        {
          prop: 'baffleDes',
          label: '挡板描述'
        }
      ],
      renderdata: [
        {
          Startitemclassname: '核心系统挡板',
          Startupsequence: 'request fuse',
          Systemid: '核心系统挡板'
        },
        {
          Startitemclassname: '账户系统挡板',
          Startupsequence: 'request limit ',
          Systemid: '账户系统挡板'
        }
      ],
      // 操作按钮
      actionlinedata: [
        {
          render: (h) => {
            return h('el-button', {
              attrs: {
                size: 'mini',
                icon: 'el-icon-zoom-in'
              },
              on: {
                click: () => {
                  this.openAdd()
                }
              }
            }, '新增')
          }
        },
        {
          render: (h) => {
            return h('el-button', {
              attrs: {
                size: 'mini',
                icon: 'el-icon-edit'
              },
              on: {
                click: () => {
                  this.openEdit()
                }
              }
            }, '修改')
          }
        },
        {
          render: (h) => {
            return h('el-button', {
              attrs: {
                size: 'mini',
                icon: 'el-icon-delete'
              },
              on: {
                click: () => {
                  this.delFun()
                }
              }
            }, '删除')
          }
        }

      ],
      pagination: {
        currentPage: 1,
        pagesize: 10,
        total: 10,
        show: true
      },
      formData: {
        id: '',
        baffleName: '',
        bodyInfo: '',
        baffleDes: ''
      },
      pageType: ''
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    onSearch() {
      this.pagination.currentPage=1
      this.pagination.pagesize=10
      this.getList()
      this.getList()
    },

    openAdd() {
      this.selectid = 1
      this.pageType = 'add'
      this.dialogVisible = true
      Object.keys(this.formData).map(key => this.formData[key] = '')
    },
    openEdit() {
      // 获取选中值

      const selectionData = this.$refs.multipleTable.$refs.multipleTable.selection
      if (selectionData.length !== 1) {
        this.$message({
          type: 'warning',
          message: '请选择一条数据'
        })
        return false
      }
      this.dialogVisible = true
      this.selectid = 1
      this.pageType = 'edit'
      const refForm = this.formData
      Object.keys(refForm).forEach(key => { refForm[ key ] = selectionData[ 0 ][ key ] })
    },
    delFun() {
      // 获取选中值
      const selectionData = this.$refs.multipleTable.$refs.multipleTable.selection
      if (selectionData.length !== 1) {
        this.$message({
          type: 'warning',
          message: '请选择一条数据'
        })
        return false
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
    getList() {
      const params = {
        'requestObject': {
          ...this.searchModel.formModel
        },
        'pageNo': this.pagination.currentPage,
        'pageSize': this.pagination.pagesize
      }
      getInfo(params).then(res => {
        if (res.code === 200) {
          this.renderdata = res.data.data
          this.pagination.total = res.data.totalCount
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      })
    },
    submitHandle() {
      const params = this.formData
      console.log('00', this.selectid)
      if (this.pageType === 'add' && this.selectid === 1) {
        console.log('111')
        this.submitFun(params)
      }
      if (this.pageType === 'edit' && this.selectid === 1) {
        console.log('222')
        this.editFun(params)
      }
    },
    submitFun(params) {
      submitInfo(params).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.dialogVisible = false
          this.getList()
        }
      })
    },
    editFun(params) {
      editInfo(params).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '编辑成功'
          })
          this.dialogVisible = false
          this.getList()
        }
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
fieldset {
  border-radius: 3px;
  padding: 20px 10px;
  border-color: #f2f2f2;
  border-width: 1px;
  margin-bottom: 20px;
}
</style>
