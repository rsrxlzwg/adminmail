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
            name:'elasticsearch-logging-curator-elasticsearch-curator-1603040400',
            status:'已完成',
            group:'k8s-logging-system',
            rules:'0 1 * * *',
            time:'2020-10-19 01:00:16',
          }
        ],
        rowData:[       
          {
            prop: 'name',
            label: '任务名',
             render:(h,params)=>{
                return h("el-link", {
                  style: {
                    display: "inline-block",
                    color:'#409EFF'
                  },
                  on:{
                    click:()=>{
                      this.$router.push('timedDetail')
                    }
                  }
                },params.row.name);
              }
          },
          {
            prop: 'status',
            label: '状态'
          },
          {
            prop:'group',
            label:'项目'
          }, 
          {
            prop:'rules',
            label:'定时计划'
          },
          {
            prop:'time',
            label:'更新时间'
          }
        ],
        operateData:[
          // {
          //   label:'详情',
          //   type:'detail',
          //   url:'timedDetail'
          // },
          
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
          // {
          //   type:'add',
          //   style:'primary',
          //   label:'新增项目',
          //   url:''
          // }
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
