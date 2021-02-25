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
            code:'CORE',
            sysname:'核心系统',
            id:'200400401',
            serviceName:'账户查询',
            time:'2020-10-10 10:10:10'
          }
        ],
        rowData:[
        
           {
            prop:'code',
            label:'系统代码'
          },
           {
            prop:'sysname',
            label:'系统名称'
          },
          {
            prop: 'id',
            label: '服务ID'
          },
          {
            prop: 'serviceName',
            label: '服务名称'
          },
          {
            prop:'time',
            label:'上线时间'
          }
        ],
        operateData:[],
        pagination:{
          currentPage:1,
          pagesize:10,
          total:1
        }
      },
      formModel:{
        formData:{
          
        },
        formLabelWidth: '100px',
        formFilds:[    
        ],
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
        btnGroup:[ ],
        formModel:{
          name: '',
        },
        searchFild:[
          {
           type:'selectSearch',
           label:'实例地址',
           prop:'name',
           options:[
             {
               label:'10.122.1.50:2181',
               value:'10.122.1.50:2181'
              }
           ]
         },
         {
           type:'input',
           label:'系统代码',
           prop:'code'
         },
         {
           type:'input',
           label:'系统名称',
           prop:'sysname'
         },
         {
           type:'input',
           label:'服务ID',
           prop:'id'
         },{
           type:'input',
           label:'服务名称',
           prop:'serviceName'
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
