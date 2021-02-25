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
import {getCluster,submitInfo,editInfo} from '../../api/base/cluster'
export default {
  name: "Culster",
  components:{
    compTable
  },
  data() {
    return {
      tableModel:{
        tableData: [],
        rowData:[
         
          {
            prop: 'cluster_name',
            label: '集群名称'
          },
          {
            prop: 'cluster_version',
            label: '集群版本'
          },
          {
            prop:'network_type',
            label:'网络插件(calico)'
          }, 
          {
            prop:'storage_type',
            label:'存储插件（nfs）'
          },
          {
            prop: 'proxy_mode',
            label: '集群类型'
          },
          {
            prop: 'pod_cidr',
            label: 'pod网段'
          },
           {
            prop: 'svc_cidr',
            label: '服务网段'
          },       
          {
            prop: 'status',
            label: '状态'
          },       
          {
          prop: 'created_at',
          label: '创建时间'
          },
         
        ],
        operateData:[
          {
            label:'详情',
            type:'detail',
            url:'/infrastructure/clusterOverview'
          }
        ],
        pagination:[]
      },
      formModel:{
        formData:{
          name: '',
          nfs_server_ip: '',
          nfs_server_path: ''
        },
        formLabelWidth: '80px',
        formFilds:[
          {
            label:'名称',
            prop:'name',
            type:'input',
            disabled:false,
          },
          {
            label:'主机ip',
            prop:'nfs_server_ip',
            type:'input',
            disabled:false,
          },
          {
            label:'挂载路径',
            prop:'nfs_server_path',
            type:'input',
            disabled:false,
          },
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
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
          ],
          nfs_server_ip: [
            { required: true, message: '请输入ip', trigger: 'blur' }
          ],
          nfs_server_path: [
            { required: true, message: '请输入路径', trigger: 'blur' }
          ]
        },
      },
      searchModel:{
        btnGroup:[
          {
            type:'add',
            style:'primary',
            label:'新增',
            url:'/infrastructure/add'
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
    this.getList()
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
