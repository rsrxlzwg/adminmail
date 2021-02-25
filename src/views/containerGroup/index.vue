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
import compTable from '../components/table'
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
            container:'app-2048-6d6dfbb6ff-z47l7',
            ipv4:'172.29.1.8',
            app:'-',
            host:'node1(192.168.1.3)',
            mirror:'k8s/app-2048:latest',
            ruining:'1/1',
            status:'运行中',
            time:'0次',
            cpu:'0.050 核',
            memory:'50 M',
            create:'2020-10-20 15:02:38'
          }
        ],
        rowData:[       
          {
            prop: 'container',
            label: '容器组',
             render:(h,params)=>{
                return h("el-link", {
                  style: {
                    display: "inline-block",
                    color:'#409EFF'
                  },
                  on:{
                    click:()=>{
                      this.$router.push('containerGroup/detail')
                    }
                  }
                },params.row.container);
              }
          },
          {
            prop: 'ipv4',
            label: 'IP地址'
          },
          {
            prop:'app',
            label:'应用'
          }, 
           {
            prop:'host',
            label:'主机'
          }, 
          {
            prop:'mirror',
            label:'镜像'
          },
          {
            prop:'ruining',
            label:'运行中'
          },
           {
            prop:'status',
            label:'状态'
          },
           {
            prop:'time',
            label:'重启次数'
          },
          {
            prop:'cpu',
            label:'cpu限制'
          },
           {
            prop:'memory',
            label:'内存限制'
          },
           {
            prop:'create',
            label:'创建时间'
          },
        ],
        operateData:[
          // {
          //   label:'详情',
          //   type:'detail',
          //   url:'containerGroup/detail'
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
