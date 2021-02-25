<template>
  <div>
    <headersearch :searchModel="searchModel" @onSearch="onSearch"></headersearch>
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
      :title="title"
      :visible.sync="dialogVisible"
      :width="dialogwidth"
    >
      <component
      ref="refForm"
        :is="item.component"
        :formData="formData"
        v-for="item in moudlelist.filter(e => e.id == selectid)"
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
import { saveAs } from 'file-saver'
import {getPage,uploadInfo,downloadInfo,deleteOne} from '@/api/serviceManagement/appManage/terminalVersion'

export default {
  components: {
    rendertable,
    headersearch
  },
  data() {
    return {
      title: '',
      dialogwidth: '',
      moudlelist,
      selectid: '',
      dialogVisible: false,
      form: {},
     searchModel:{
         formModel:{
            versionName: '',
          },
          searchFild:[
           {
              type:'input',
              label:'版本名称',
              prop:'versionName'
            },
            // {
            //   type:'time',
            //   label:'上传时间',
            //   prop:'updateDate',
            //   span:10
            // },
        ]
      },
      renderheader: [
        {
          prop: 'versionName',
          label: '版本名称'
        },
        {
          prop: 'versionNum',
          label: '版本号'
        },
        {
          prop: 'fileName',
          label: '文件名称'

        },
        {
          prop: 'uploadTime',
          label: '上传时间',
          width: 180

        }, {
          prop: 'versionDesc',
          label: '版本描述'

        },
      ],
      renderdata: [
        {
          Startitemclassname: '全量版本',
          Startupsequence: 'V1.0.0',
          Systemid: 'IBANK',
          Systemtype: '网上银行系统',
          state: '2021-1-2 12:01:05',
          sysname: '全量版本',
        },
         {
          Startitemclassname: '增量版本',
          Startupsequence: 'V1.0.1',
          Systemid: 'IBANK',
          Systemtype: '网上银行系统',
          state: '2021-1-3 14:12:07',
          sysname: '增量版本',
        },
      ],
      actionlinedata: [
        {
          render: (h) => {
            return h('el-button', {
              attrs: {
                size: 'mini',
                icon: 'el-icon-upload'
              },
              on: {
                click: () => {
                  this.dialogwidth = '40%'
                  this.dialogVisible = true
                  this.title = '上传'
                  this.selectid = 1
                  this.openAdd()
                },
              }
            }, '上传')
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
        },
        {
          render: (h) => {
            return h('el-button', {
              attrs: {
                size: 'mini',
                icon: 'el-icon-sort-down'
              },
              on: {
                click: _ => {
                  saveAs(new Blob([ 111 ], { type: "text/plain;charset=utf-8" }), 'Advancedconfiguration.zip')
                }
              }
            }, '下载')
          }
        },       
      ],
      pagination:{
        currentPage:1,
        pagesize:10,
        total:10,
        show:true
      },
      formData:{
        fileList:[
          {
          prop: 'versionName',
          label: '版本名称'
        },
        {
          prop: 'versionNum',
          label: '版本号'
        },{
          prop: 'versionDesc',
          label: '版本描述'

        }
        ]
      }
    }
  },
  mounted(){
    this.getList()
  },
  methods:{
    onSearch(){
      this.getList()
    },
    getList(){
      const params={ 
        "requestObject": {
          ...this.searchModel.formModel
          },
        "pageNo": this.pagination.currentPage,
        "pageSize": this.pagination.pagesize
      }
      console.log('2222')
      getPage(params).then(res => {
        if(res.code===200){
            this.renderdata = res.data.data
            this.pagination.total=res.data.totalCount
        }else{
           this.$message({
              type: 'error',
              message: res.message
          });
        }
      
      })
    },
    openAdd(){
       this.selectid = 1
       this.pageType='add'
       this.dialogVisible = true
        Object.keys(this.formData).map(key => this.formData[key] = "")
        this.formData.fileList=[]
    },
     submitHandle(){
      const params=this.formData
           console.log('000',params) 
      if(this.selectid===1){
        console.log('111')
        this.submitFun(params)
      }
    
    },
    submitFun(params){
      const newparams ={
        xxx:{
           x1: this.formData.name,
        },
        xx:this.formData.fileList
      }
      this.$refs.refForm[0].$refs.upload.submit()

      // uploadInfo(newparams).then(res=>{
      //   if(res.code===200){
      //      this.$message({
      //           type: 'success',
      //           message:'添加成功'
      //       });
      //       this.dialogVisible=false
      //       this.getList()
      //   }
      // })
    },
     delFun(){
       // 获取选中值
        const selectionData=this.$refs.multipleTable.$refs.multipleTable.selection
        if(selectionData.length!==1){
           this.$message({
              type: 'warning',
              message:'请选择一条数据'
          });
          return false
        }
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        let ids=[]
        selectionData.forEach(e => {
          ids.push(e.id)
        });
        console.log({ids})
        deleteOne(ids[0]).then(res=>{
          if(res.code===200){
              this.$message({
                type: 'success',
                message:'删除成功'
            });
            this.getList()
          }
        })
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



<style scoped lang="scss">
fieldset {
  border-radius:3px;
  padding: 10px 10px;
  border-color: #f2f2f2;
  border-width: 1px;
  margin-bottom: 20px;
}
</style>
