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
       ></comp-table> 
  </div>
</template>

<script>
import compTable from '../../components/table'
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
            tenantName:'admin',
            usage:'不限',
            cpuUsage:'不限',
            memoryUsage:'不限',
            authorizedNum:'1'
          }
        ],
        rowData:[
         
          {
            prop: 'tenantName',
            label: '项目名称',
            render:(h,params)=>{
              return h("el-link", {
                style: {
                  display: "inline-block",
                  color:'#409EFF'
                },
                on:{
                  click:()=>{
                    this.$router.push('/tenant/projectDetail')
                  }
                }
              },params.row.tenantName);
            }
          },
          {
            prop: 'usage',
            label: '容器组用量'
          },
          {
            prop:'cpuUsage',
            label:'CPU用量'
          }, 
          {
            prop:'memoryUsage',
            label:'内存用量'
          },
          {
            prop: 'authorizedNum',
            label: '授权团队数量'
          },
        ],
        operateData:[
          {
            label:'编辑',
            type:'detail',
            url:'/tenant/projectDetail'
          },
          
        ],
        pagination:[]
      },
      formModel:{
        formData:{
          tenantName: ''
        },
        formLabelWidth: '80px',
        formFilds:[
          {
            label:'项目名称',
            prop:'tenantName',
            type:'input',
            disabled:false,
          }      
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
        btnGroup:[
          {
            type:'add',
            style:'primary',
            label:'新增项目',
            url:''
          }
        ],
        formModel:{
          cluster: '81-test',
          region: '',
        },
        searchFild:[]
      }

    };
  },
  mounted(){
    // this.getList()
  },
  methods: {
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
  form.el-form {
    float: right;
  }
  .block {
    float: right;
    margin: 12px;
  }
}
</style>
