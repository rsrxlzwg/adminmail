<template>
  <div>
    <headersearch :searchModel=searchModel @onSearch="onSearch"></headersearch>
    <el-card>
      <rendertable
        ref="multipleTable"
        :table-data="renderdata"
        :table-header="renderheader"
        :actionlinedata="actionlinedata"
        :pagination="pagination"
        @currentChange="currentChange"
        @sizeChange="sizeChange"
        :showselect='true'
      />
    </el-card>
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form
        label-position="left"
        ref="form"
        :model="form"
        label-width="100px"
      >
        <el-form-item label="参数类型">
          <el-select
            v-model="form.paramType"
            size="mini"
            style="width:100%"
            placeholder=""
          >
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="参数名称">
          <el-input
            v-model="form.paramName"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="默认值">
          <el-input
            v-model="form.defaultValue"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            type="textarea"
            v-model="form.paramDesc"
            size="mini"
          />
        </el-form-item>
      </el-form>

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
  import {getTemplates, addTemplate, editTemplate, deleteTemplate, sendTemplates} from '@/api/serviceManagement/appManage/ParamTemplate'

  export default {
    components: {
      rendertable,
      headersearch
    },
    filters:{
      filterType(type){
        const statusMap = {
          '0': '不可编辑',
          '1': '可编辑'
        }
        return statusMap[type]
      },
      filterStatus(type){
        const statusMap = {
          '1': '配置中',
          '2': '已发布',
          '3': '已删除',
          '4': '已更新'
        }
        return statusMap[type]
      }
    },
    data() {
      return {
        selectid: '',
        dialogVisible: false,
        typeList: [{
          label: '可编辑',
          value: '1'
        }, {
          label: '不可编辑',
          value: '0'
        }],
        form: {
          id: '',
          paramName: '',
          paramType: '',
          defaultValue: '',
          paramStatus: 1,
          paramDesc: ''
        },
        searchModel: {
          formModel: {
            paramType: '',
            paramName: ''
          },
          searchFild: [
            {
              type: 'select',
              label: '参数类型',
              prop: 'paramType',
              options: [{
                label: '可编辑',
                value: '1'
              }, {
                label: '不可编辑',
                value: '0'
              }]
            }, {
              type: 'input',
              label: '参数名称',
              prop: 'paramName'
            }
          ]
        },
        renderheader: [
          {
            prop: 'paramName',
            label: '参数名称'
          },
          {
            prop: 'paramType',
            label: '参数类型',
            render: (h, {row}) => {
              return h('el-tag',  this.$options.filters.filterType(row.paramType))
            }
          },
          {
            prop: 'defaultValue',
            label: '默认值'
          },
          {
            prop: 'paramStatus',
            label: '状态',
            render: (h, {row}) => {
              return h('el-tag',  this.$options.filters.filterStatus(row.paramStatus))
            }
          },
          {
            prop: 'paramDesc',
            label: '描述'

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
          ,
          {
            render: (h) => {
              return h('el-button', {
                attrs: {
                  size: 'mini',
                  icon: 'el-icon-sold-out'
                },
                on: {
                  click: () => {
                    this.sendFun()
                  }
                }
              }, '全量下发')
            }
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
      this.getList()
    },
    methods: {
      getList() {
        const params = {
          'requestObject': {
            ...this.searchModel.formModel
          },
          'pageNo': this.pagination.currentPage,
          'pageSize': this.pagination.pagesize
        }
        getTemplates(params).then(res => {
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
      onSearch() {
        this.getList()
      },
      openAdd() {
        this.selectid = 1
        this.pageType = 'add'
        this.dialogVisible = true
        Object.keys(this.form).map(key => this.form[key] = '')
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
        let refForm = this.form
        Object.keys(refForm).forEach(key => {
          refForm[key] = selectionData[0][key]
        })

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
          this.$confirm('是否将该参数状态变更为已删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        let ids = []
        selectionData.forEach(e => {
          ids.push(e.id)
        })
        console.log({ids})
        deleteTemplate(ids[0]).then(res => {
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
      sendFun(){
      this.$confirm('下发后将删除状态为已删除的数据，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        sendTemplates().then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '下发成功'
            })
            this.getList()
          }
        })
        })
      },
      submitHandle() {
        const params = this.form
        if (this.pageType === 'add' && this.selectid === 1) {
          this.submitFun(params)
        } else if (this.pageType === 'edit' && this.selectid === 1) {
          this.editFun(params)
        }
      },
      submitFun(params) {
        addTemplate(params).then(res => {
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
        editTemplate(params).then(res => {
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
