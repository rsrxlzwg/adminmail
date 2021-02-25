<template>
  <div>
     <headersearch :searchModel=searchModel @onSearch="onSearch" ></headersearch>
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
     <component
        :is="item.component"
        ref="refForm"
        :formData="formData"
        :detaildata="detaildata"
        :selectDisabled="selectDisabled"
        v-for="(item,i) in moudlelist.filter(e => e.id == selectid)"
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
import {getInfo,getGroup,submitInfo,editInfo,deleteOne} from '@/api/serviceManagement/onlineManagement/acticeDistribute'
import moudlelist from './moudle'
export default {
  components: {
    rendertable,
    headersearch
  },
  data() {
    return {
      moudlelist,
      selectid: '',
      dialogVisible: false,
      form: {},
      groupList:[],
      pagination:{
        currentPage: 1,
        pagesize: 10,
        total:10,
        show:true
      },
      searchModel:{
         formModel:{

          },
          searchFild:[
            {
              type:'input',
              label:'多活流量名称',
              prop:'name'
            }
        ]
      },
      renderheader: [
        {
          prop: 'name',
          label: '多活流量名称'
        },

        {
          prop: 'appName',
          label: '所属应用'
        },
        {
          prop: 'description',
          label: '描述'
        },
        {
          prop: 'Jump',
          label: '终端组信息',
          render: (h, {row}) => {
            return h('el-button', {
              attrs: {
                size: 'mini',
                type:'text'
              },
              on: {
                click: () => {
                  this.dialogVisible=true
                  this.selectid = 3
                   this.dialogwidth = '60%'
                   this.getDetail(row)
                }
              }
            }, '详情信息')
          }
        },

      ],
      renderdata: [
        {

        }
      ],
      electDisabled: false,
      detaildata:[],
      selectDisabled: false,
      formData:{
        id:'',
        name:'',
        appId:'',
        appName:'',
        description:'',
        strategyName:'',
        distributeInfo:[
          {
            activeDistruId:'',
            weightDistributeInfo:'',
            terminalGroupName:'',
            terminalGroupId:'',
            id:''
          }
        ]
      },
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
                    this.dialogwidth = '40%'
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
                   this.dialogwidth = '40%'
                }
              }
            }, '编辑')
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

      ]
    }
  },
  created(){

  },
  mounted(){
    this.getList()
  },
  methods:{
    openAdd(){
       this.selectid = 1
       this.pageType='add'
       this.selectDisabled= false
       this.dialogVisible = true
       var queryList = {appId:''}
       getGroup(queryList).then( res =>
        {
          console.log("servdata",res.data)
          if(res.code===200){
            this.groupList = res.data
        }else{
           this.$message({
              type: 'error',
              message: res.message
          });
        }

      })
      Object.keys(this.formData).map(key => this.formData[key] = "")
      this.formData.distributeInfo=[]
    },
    openEdit(){
        // 获取选中值
        this.selectDisabled= true
        const selectionData=this.$refs.multipleTable.$refs.multipleTable.selection
        if(selectionData.length!==1){
           this.$message({
              type: 'warning',
              message:'请选择一条数据'
          });
          return false
        }

        this.dialogVisible = true
        this.selectid = 1
        this.pageType='edit'
        let refForm=this.formData

       var queryList = {appId:selectionData[ 0 ].appId}
      console.log("codssssss",selectionData[ 0 ])
       getGroup(queryList).then( res =>
        {
          console.log("servdata",res.data)
          if(res.code===200){
            this.servicelist = res.data
            console.log("codeeee",res.data)
        }else{
           this.$message({
              type: 'error',
              message: res.message
          });
        }

      })


        Object.keys(refForm).forEach(key => { refForm[ key ] = selectionData[ 0 ][ key ] })
        getGroup(selectionData[ 0 ]).then( res =>
        {
          if(res.code===200){
            this.formData.distributeInfo = res.data
            this.formData.distributeInfo.forEach(element => {
              element.terminalId=element.id

            });
            console.log("distributeInfo",this.formData.distributeInfo)
        }else{
           this.$message({
              type: 'error',
              message: res.message
          });
        }

      })
    },
    onSearch(){
      this.getList()
    },
    getDetail(params){
    console.log('detail',params)
      getGroup(params).then( res =>
        {
          if(res.code===200){
            this.detaildata = res.data

        }else{
           this.$message({
              type: 'error',
              message: res.message
          });
        }

      })

    },
     getList(){
      const params={
        "requestObject": {
          ...this.searchModel.formModel
          },
        "pageNo": this.pagination.currentPage,
        "pageSize": this.pagination.pagesize
      }
      getInfo(params).then(res => {
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
    delFun() {
      // 获取选中值
      const selectionData = this.$refs.multipleTable.$refs.multipleTable.selection
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
    submitHandle(){
      const params=this.formData
      console.log(this.formData)
      var senData = {'esbGovActiveDistribute':this.formData,'esbGovActiveDistributeInfo':this.formData.distributeInfo}
      if(this.pageType==='add' && this.selectid===1){
        this.submitFun(senData)
      }
      if(this.pageType==='edit'&& this.selectid===1){
           console.log('222')
        this.editFun(senData)
      }
    },
    submitFun(params){
      submitInfo(params).then(res=>{
        if(res.code===200){
           this.$message({
                type: 'success',
                message:'添加成功'
            });
            this.dialogVisible=false
            this.getList()
        }
      })
    },
    editFun(params){
      editInfo(params).then(res=>{
        if(res.code===200){
           this.$message({
                type: 'success',
                message:'编辑成功'
            });
            this.dialogVisible=false
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

<style scoped lang="scss">
fieldset {
  border-radius: 3px;
  padding: 20px 10px;
  border-color: #f2f2f2;
  border-width: 1px;
  margin-bottom: 20px;
}
</style>
