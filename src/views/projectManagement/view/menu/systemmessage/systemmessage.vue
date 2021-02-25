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
        ref="form"
        :model="form"
        label-width="80px"
        label-position="left"
      >
        <el-form-item label="应用编码">
          <el-input
            v-model="form.appCode"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="应用简称">
          <el-input
            v-model="form.appAbbr"
            size="mini"
          />
        </el-form-item>

        <el-form-item label="应用名称">
          <el-input
            v-model="form.appName"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="应用类型">
          <el-select
            v-model="form.appType"
            size="mini"
            style="width:100%"
            placeholder=""
          >
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="协议">
          <el-select
            v-model="form.protocolId"
            size="mini"
            style="width:100%"
            placeholder=""
            multiple
          >
            <el-option
              v-for="item in protocolList"
              :key="item.id"
              :label="item.protocolName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="应用描述">
          <el-input
            v-model="form.appDesc"
            type="textarea"
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
  import {getApps, addApp, editApp, deleteOne, getProtocols, startApp, stopApp} from '@/api/serviceManagement/appManage/appConfig'

  export default {
    components: {
      rendertable,
      headersearch
    },
    filters:{
      filterType(type){
        const statusMap = {
          '1': '消费方',
          '2': '服务方',
          '3': '消费方与服务方'
        }
        return statusMap[type]
      },
      filterStatus(type){
        const statusMap = {
          '0': '停用',
          '1': '启用'
        }
        return statusMap[type]
      }
    },
    data() {
      return {
        dialogVisible: false,
        typeList: [{
          label: '消费方',
          value: "1"
        }, {
          label: '服务方',
          value: "2"
        }, {
          label: '消费方与服务方',
          value: "3"
        }],
        protocolList: [],
        form: {
          id: '',
          appCode: '',
          appAbbr: '',
          appName: '',
          appType: 1,
          protocolId: '',
          appDesc: ''
        },
        searchModel: {
          formModel: {
            appAbbr: '',
            appName: ''
          },
          searchFild: [
            {
              type: 'input',
              label: '应用简称',
              prop: 'appAbbr'
            }, {
              type: 'input',
              label: '应用名称',
              prop: 'appName'
            }
          ]
        },
        renderheader: [
          {
            prop: 'appCode',
            label: '应用编码',
            width: 100
          },
          {
            prop: 'appAbbr',
            label: '应用简称'
          },
          {
            prop: 'appName',
            label: '应用名称'
          },
          {
            prop: 'appStatus',
            label: '应用状态',
            render: (h, {row}) => {
              return h('span',  this.$options.filters.filterStatus(row.appStatus))
            }
          },
          {
            prop: 'appType',
            label: '应用类型',
            render: (h, {row}) => {
              return h('el-tag',  this.$options.filters.filterType(row.appType))
            }
          },
          {
            prop: 'appDesc',
            label: '应用描述',
            width: 280
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
          },{
            render: (h) => {
              return h('el-button', {
                attrs: {
                  size: 'mini',
                  icon: 'el-icon-delete'
                },
                on: {
                  click: () => {
                    this.startFun()
                  }
                }
              }, '启用')
            }
          },{
            render: (h) => {
              return h('el-button', {
                attrs: {
                  size: 'mini',
                  icon: 'el-icon-delete'
                },
                on: {
                  click: () => {
                    this.stopFun()
                  }
                }
              }, '停用')
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
        getApps(params).then(res => {
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
      getProtocolList() {
        getProtocols().then(res => {
          if (res.code === 200) {
            this.protocolList = res.data
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
        this.getProtocolList()
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
        this.getProtocolList()
        let refForm = this.form
        Object.keys(refForm).forEach(key => {
          refForm[key] = selectionData[0][key]
        })
        refForm.protocolId=refForm.protocolId.split(',')
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
        let ids = []
        selectionData.forEach(e => {
          ids.push(e.id)
        })
        deleteOne(ids[0]).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getList()
          }
        })
        });
      },
      startFun() {
        // 获取选中值
        const selectionData = this.$refs.multipleTable.$refs.multipleTable.selection
        if (selectionData.length !== 1) {
          this.$message({
            type: 'warning',
            message: '请选择一条数据'
          })
          return false
        }
        this.$confirm('确定执行启用操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let ids = []
          selectionData.forEach(e => {
            ids.push(e.id)
          })
          startApp(ids[0]).then(res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: '启用成功'
              })
              this.getList()
            }
          })
        });
      },
      stopFun() {
        // 获取选中值
        const selectionData = this.$refs.multipleTable.$refs.multipleTable.selection
        if (selectionData.length !== 1) {
          this.$message({
            type: 'warning',
            message: '请选择一条数据'
          })
          return false
        }
        this.$confirm('确定执行停用操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let ids = []
          selectionData.forEach(e => {
            ids.push(e.id)
          })
          stopApp(ids[0]).then(res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: '停用成功'
              })
              this.getList()
            }
          })
        });
      },
      submitHandle() {
        const params = this.form
        if (this.pageType === 'add' && this.selectid === 1) {
          console.log("join", params.protocolId)
          params.protocolId = params.protocolId.join(',')
          this.submitFun(params)
        } else if (this.pageType === 'edit' && this.selectid === 1) {
          params.protocolId = params.protocolId.join(',')
          this.editFun(params)
        }
      },
      submitFun(params) {
        addApp(params).then(res => {
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
        editApp(params).then(res => {
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
