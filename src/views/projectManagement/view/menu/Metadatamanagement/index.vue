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
        label-width="100px"
        label-position="left"
      >
        <el-form-item label="元数据编码">
          <el-input
            v-model="form.metadataCode"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="元数据名">
          <el-input
            v-model="form.metadataKey"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="属性名称">
          <el-input
            v-model="form.metadataName"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="数据类型">
          <el-select
            v-model="form.dataType"
            size="mini"
            style="width:100%"
            placeholder=""
            @change="changeMetadata"
          >
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <!-- <template v-if="form.dataType === '8'">
        <el-form-item label="关联元数据">
          <el-select
            v-model="form.referenceMetadataId"
            size="mini"
            style="width:100%"
            placeholder=""
          >
            <el-option
              v-for="item in metadataList"
              :key="item.id"
              :label="item.metadataName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        </template> -->

         <!-- <template v-if="form.dataType === '9' || form.dataType === '8' "> -->
        <el-form-item label="关联元数据"  v-if="update">
          <el-select
            v-model="form.referenceMetadataId"
            size="mini"
            style="width:100%"
            placeholder=""
            :multiple="isMultiple"
            
          >
            <el-option
              v-for="item in metadataList"
              :key="item.id"
              :label="item.metadataName"
              :value="item.id"
              :disabled="item.id==form.id"
            />
          </el-select>
        </el-form-item>
        <!-- </template> -->
        <el-form-item label="数据长度">
          <el-input
            v-model="form.dataLength"
            size="mini"
          />
        </el-form-item>

        <el-form-item label="数据精度">
          <el-input
            v-model="form.dataPrecision"
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
import {
  getMetadatas,
  addtMetadata,
  editMetadata,
  deletetMetadata,
  download,
  upload,
  getModel,
  getMetadataList,
  getReferenceList,
  getDistinctMeta
} from '@/api/serviceManagement/offlineManagement/metadata'

export default {
  components: {
    rendertable,
    headersearch
  },
  filters: {
    filterType(type) {
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
    }
  },
  data() {
    return {
      selectid: '',
      metadataList:'',
      dialogVisible: false,
      typeList: [{
        label: 'String',
        value: '1'
      }, {
        label: 'Integer',
        value: '2'
      }, {
        label: 'Long',
        value: '3'
      }, {
        label: 'Double',
        value: '4'
      }, {
        label: 'BigDecimal',
        value: '5'
      }, {
        label: 'Boolean',
        value: '6'
      }, {
        label: 'Date',
        value: '7'
      }, {
        label: 'List',
        value: '8'
      }, {
        label: 'Object',
        value: '9'
      }],
      form: {
        id: '',
        metadataCode: '',
        metadataKey: '',
        metadataName: '',
        dataType: '',
        dataLength: '',
        dataPrecision: '',
        referenceMetadataId:''
      },
 
      searchModel: {
        formModel: {
          metadataCode: '',
          metadataKey: '',
          metadataName: ''
        },
        searchFild: [
          {
            type: 'input',
            label: '元数据编码',
            prop: 'metadataCode'
          }, {
            type: 'input',
            label: '元数据名',
            prop: 'metadataKey'
          }, {
            type: 'input',
            label: '属性名称',
            prop: 'metadataName'
          }
        ]
      },
      renderheader: [
        {
          prop: 'metadataCode',
          label: '元数据编码'
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
          prop: 'dataType',
          label: '数据类型',
          render: (h, {row}) => {
            return h('el-tag', this.$options.filters.filterType(row.dataType))
          }
        },
        {
          prop: 'dataLength',
          label: '数据长度'
        },
        {
          prop: 'dataPrecision',
          label: '精度'
        },
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
        }, {
          render: (h) => {
            return h('el-button', {
              attrs: {
                size: 'mini',
                icon: 'el-icon-video-play'
              },
              on: {
                click: () => {
                  this.uploadFun()
                }
              }
            }, '导入')
          }
        }, {
          render: (h) => {
            return h('el-button', {
              attrs: {
                size: 'mini',
                icon: 'el-icon-upload2'
              },
              on: {
                click: () => {
                  this.downloadFun()
                }
              }
            }, '导出')
          }
        }, {
          render: (h) => {
            return h('el-button', {
              attrs: {
                size: 'mini',
                icon: 'el-icon-download'
              },
              on: {
                click: () => {
                  this.getModelFun()
                }
              }
            }, '模板下载')
          }
        }
      ],
      pagination: {
        currentPage: 1,
        pagesize: 10,
        total: 0,
        show: true
      },
      pageType: '',
      isMultiple:false,
      update: false
    }
  },
   watch:{  
          'isMultiple'(){ //单个监控
                this.update = false  
                setTimeout(()=>{   
                    this.update = true 
                },50)
          }
        } ,
  mounted() {
    this.getList()
    this.getSelected()
  },
  methods: {
    changeMetadata(){
if(this.form.dataType === '9'){
  this.update = true
  this.isMultiple = true
}else if(this.form.dataType === '8'){
    this.update = true
    this.isMultiple = false
}else{
   this.update = false
   this.form.referenceMetadataId = null
}



      // this.referenceMetadataId = null
      // getMetadataList().then(res => {
      //     if (res.code === 200) {
      //       this.metadataList = res.data
      //     } else {
      //       this.$message({
      //         type: 'error',
      //         message: res.message
      //       })
      //     }
      //   })
    },
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
    getList() {
      const params = {
        'requestObject': {
          ...this.searchModel.formModel
        },
        'pageNo': this.pagination.currentPage,
        'pageSize': this.pagination.pagesize
      }
      getMetadatas(params).then(res => {
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
      this.update = false
      this.referenceMetadataId = null
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

      if(selectionData[0].dataType === '9'){
        this.update = true
        this.isMultiple = true
    }else if(selectionData[0].dataType === '8'){
        this.update = true
        this.isMultiple = false
    }else{
      this.update = false
      this.form.referenceMetadataId = null
    }

      var esbGroup = { metadataId: selectionData[0].id };
      getReferenceList(esbGroup).then((res) => {
        if (res.code === 200) {
          if(selectionData[0].dataType==='9'){
            this.form.referenceMetadataId = res.data;
            }else if(selectionData[0].dataType==='8'){
              this.form.referenceMetadataId = res.data[0];
            }else{
               this.form.referenceMetadataId = null
            }
          console.log("referenceMetadataId",this.form.referenceMetadataId)
          
        } else {
          this.$message({
            type: "error",
            message: res.message,
          });
        }
      });

      var metaId = { id: selectionData[0].id };
      getDistinctMeta(metaId).then(res => {
          if (res.code === 200) {
            this.metadataList = res.data
          } else {
            this.$message({
              type: 'error',
              message: res.message
            })
          }
        })



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
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = []
        selectionData.forEach(e => {
          ids.push(e.id)
        })
        deletetMetadata(ids[0]).then(res => {
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
    sendFun() {
      sendTemplates().then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '下发成功'
          })
          this.getList()
        }
      })
    },
    submitHandle() {
      const params = this.form
      if (this.pageType === 'add' && this.selectid === 1) {
        if(params.referenceMetadataId instanceof Array){
        params.referenceMetadataId = params.referenceMetadataId.join(',')
        }
        this.submitFun(params)
      } else if (this.pageType === 'edit' && this.selectid === 1) {
        if(params.referenceMetadataId instanceof Array){
        params.referenceMetadataId = params.referenceMetadataId.join(',')
        }
        this.editFun(params)
      }
    },
    submitFun(params) {
      addtMetadata(params).then(res => {
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
      editMetadata(params).then(res => {
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
    uploadFun() {
      upload().then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: 'testing...'
          })
          this.getList()
        }
      })
    },
    downloadFun() {
      download().then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: 'testing...'
          })
          this.getList()
        }
      })
    },
    getModelFun() {
      getModel().then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: 'testing...'
          })
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
