<template>
  <!-- 集群  -->
  <div class="culster-container">
     <comp-table 
      ref="compTable"
      :tableModel=tableModel 
       :formModel=formModel 
       :searchModel=searchModel
       @submitHandle="submitInfo"
       @editHandle="editInfo"
       @issueFun="issueFun"
       ></comp-table> 
  </div>
</template>

<script>
import compTable from '@/views/components/table'
// import {getCluster,submitInfo,editInfo} from '../../api/base/cluster'
export default {
  name: "Culster",
  components:{
    compTable
  },
  data() {
    return {
      tableModel:{
        tableData: [
          {
            serviceRequester:'财务核心系统',
            serviceProviders:'资金项目组',
            serviceName:'AccountBackService',
            serviceVersion:'1.0',
            operationName:'accountback',
            status:'成功',
            returnCode:'000001',
            responsetime:'10',
            requestTime:'2020/12/16 16:59:00'
          },
           {
            serviceRequester:'财务核心系统',
            serviceProviders:'资金项目组',
            serviceName:'AccountBackService',
            serviceVersion:'1.1',
            operationName:'accountback',
            status:'成功',
            returnCode:'000002',
            responsetime:'10',
            requestTime:'2020/12/16 16:59:50'
          },
           {
            serviceRequester:'财务核心系统',
            serviceProviders:'资金项目组',
            serviceName:'AccountBackService',
            serviceVersion:'1.0',
            operationName:'accountback',
            status:'成功',
            returnCode:'000001',
            responsetime:'50',
            requestTime:'2020/12/16 16:59:55'
          },
        ],
        rowData:[
           {
            prop:'serviceRequester',
            label:'服务请求者'
          },
          {
            prop: 'serviceProviders',
            label: '服务提供者'
          },
          {
            prop: 'serviceName',
            label: '服务名称'
          },
           {
            prop:'serviceVersion',
            label:'服务版本'
          },
          {
            prop: 'operationName',
            label: '服务操作名称'
          },
           {
            prop:'status',
            label:'状态'
          },
           {
            prop: 'returnCode',
            label: '返回码'
          },
           {
            prop: 'responsetime',
            label: '响应时间（ms）'
          },
           {
            prop: 'requestTime',
            label: '服务请求时间'
          },
        ],
        operateData:[],
        pagination:{
          currentPage:1,
          pagesize:10,
          total:3
        }
      },
      formModel:{
        formData:{
          id: '',
          name:'',
          type:'',
          desc:''
        },
        formLabelWidth: '100px',
        formFilds:[ ],
        btnData:[       
          {
            type:'submit' ,
            style:'primary',
            label:'确定',
            handle:()=>{}
          },
          {
            type:'cancle' ,
            label:'取消',
            style:'',
            handle:()=>{}
          }
         
        ],
        rules: {
          tenantName: [
            { required: true, message: '请输入名称', trigger: 'blur' },
          ],
        },
      },
      searchModel:{
        labelWidth:80,
        btnGroup:[],
        formModel:{
          name: '',
        },
        searchFild:[
          {
           type:'input',
           label:'服务请求者',
           prop:'serviceRequester',
            span:5
         },
          {
           type:'input',
           label:'服务提供者',
           prop:'serviceProviders',
            span:5
         },
          {
           type:'time',
           label:'服务请求时间',
           prop:'requestTime',
           span:9
         },
        ]
      },
      addVisible:false,
      fileData:{
        name:'',
        virtulname:'',
        content:[
          {
            workload:'',
            versions:'',
          }
        ],
      },

    };
  },
  mounted(){
    // this.getList()
  },
  methods: {
    issueFun(){
      this.$message.success('下发成功')
    },
     tableDel(i){
      this.fileData.content.splice(i,1)
    },
    addTable(){
      this.fileData.content.push({
            workload:'',
            versions:'',
          })
    },
    addService(){
      this.addVisible=true
    },
    getList(){
      getCluster().then(response => {
        this.tableModel.tableData = response.data
      })
    },
    submitInfo(params){
        console.log({params})
        submitInfo(params).then(res=>{
          if(res.status===200){
            this.$refs.compTable.hideDialog()
            this.getList()
          }
        })
      },
    editInfo(params){
       editInfo(params).then(res=>{
          if(res.status===200){
            this.$refs.compTable.hideDialog()
            this.getList()
          }
      })
    },
  
  }
};
</script>

<style lang="scss" scoped>

/deep/.el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner{
  width: 375px !important;
}
/deep/.el-form-item__label{
  padding-right: 5px !important;
}
/deep/ .el-input__inner{
  width: 90%;
}
/deep/ .el-form--inline .el-form-item{
  margin-right: 5px !important;
}
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
