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
import {getInfo, submitInfo, editInfo, deleteInfo, selectAddInfo} from '@/api/sysManagement/dict'
import moudlelist from './moudle'
export default {
  components: {
    headersearch,
    rendertable
  },
  data() {
    return {
      moudlelist,
      selectid: '1',
      dialogVisible: false,
      form: {},
      searchModel: {
        formModel: {
          dicCode: '',
          dicName: ''
        },
        searchFild: [
          {
            type: 'input',
            label: '字典编码',
            prop: 'dicCode'
          },
          {
            type: 'input',
            label: '字典名称',
            prop: 'dicName'
          }
        ]
      },
      renderheader: [
        {
          prop: 'cateCode',
          label: '所属分类编码'
        },
        {
          prop: 'dicCode',
          label: '字典编码'
        },
        {
          prop: 'dicName',
          label: '字典名称'
        },
        {
          prop: 'dicDesc',
          label: '字典描述'
        },
        {
          prop: 'Desensitization',
          label: '编辑字典项',
          render: (h, {row}) => {
            return h('el-button', {
              attrs: {
                size: 'mini',
                icon: 'el-icon-plus'
              },
              on: {
                click: () => {
                  this.dialogVisible = true,
                  this.selectid = 2,
                  this.openAddInfo(row)
                }
              }
            })
          }
        }
      ],

      renderdata: [],
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
            }, '新增字典')
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
        dicCode: '',
        dicName: '',
        dicDesc: ''
      },

      infoDate: {
        id: '',
        dictId: '',
        dicName: '',
        dicValue: '',
        dicDesc: ''
      },
      pageType: ''
    }
  },
  mounted() {
    this.getList()
  },

  methods: {

    onSearch() {
      this.getList()
    },

    openAddInfo(row) {
      selectAddInfo({row}).then(res => {
        if (res.code === 200) {
          this.selectid = 2
          this.pageType = 'add'
          this.dialogVisible = true
          const refForm = res.data

          // 写到该处不会写了 星期一写
          Object.keys(refForm).forEach(key => { refForm[ key ] = res.data[ 0 ][ key ] })

        }
      })
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
      // if (selectionData.length !== 1) {
      //   this.$message({
      //     type: 'warning',
      //     message: '请选择一条数据'
      //   })
      //   return false
      // }
      const ids = []
      selectionData.forEach(e => {
        ids.push(e.id)
      })
      console.log({ids})
      deleteInfo({ids: ids}).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getList()
        }
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
.linerow {
  padding-bottom: 18px;
  border-bottom: 1px solid #f1f3f5;
}
.linerow:nth-of-type(2) {
  margin: 14px 0;
}
/deep/.ulstyle {
  border: 1px solid #ebeef5;
  width: 90%;
  border-radius: 4px;
  padding: 10px 2px;
  box-shadow: 3px 3px 8px 3px #f3f3f3;
  font-weight: bold;
  li {
    font-size: 14px;
    margin: 25px 16px;
    border-radius: 5px;
    border-bottom: 1px solid #e4e7ed;
    padding-bottom: 6px;
    cursor: pointer;
  }
}
/deep/ .listylepend {
  // background-color: #ccc;
  color: #000;
}
/deep/ .listylepends {
  // background-color: #ccc;
  color: #9ba3af;
}
</style>
