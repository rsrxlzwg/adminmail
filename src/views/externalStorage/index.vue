<template>
  <!-- 主机  -->
  <div class="host-container">
     <comp-table 
      ref="compTable"
      :tableModel=tableModel 
       :formModel=formModel 
       :searchModel=searchModel
       @submitHandle="submitInfo"
       @editHandle="editInfo"
       @delInfo="delInfo"
       ></comp-table> 
  </div>
</template>

<script>
import compTable from '../components/table'
import {getList,submitInfo,editInfo,delInfo} from '../../api/base/externalStorage'
export default {
  name: 'Host',
  components:{
    compTable
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        Active: true,
        Cordoned: false,
      }
      return statusMap[ status ]
    }
  },
  data() {
    return {
      tableModel:{
        tableData: [],
        rowData:[
          {
            prop: 'id',
            label: '存储ID'
          },
          {
            prop: 'name',
            label: '名称'
          },
          {
            prop: 'nfs_server_ip',
            label: '主机ip'
          },
          {
            prop: 'nfs_server_path',
            label: '挂载路径'
          },
          {
            prop: 'used',
            label: '是否被使用'
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
            label:'编辑',
            type:'edit',
            url:''
          },
          {
            label:'删除',
            type:'delete',
            url:''
          }
        ],
        pagination:[]
      },
      formModel:{
        formData:{
          id:'',
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
            label:'新增'
          }
        ],
        formModel:{
          cluster: '81-test',
          region: '',
        },
        searchFild:[
          {
            type:'select',
            label:'集群',
            prop:'cluster',  
             options:[
              {
                value:'1',
                label:'集群1'
              }
            ]        
          },
          {
            type:'input',
            label:'名称',
            prop:'region',
          }
        ]
      }

    }
  },
  mounted(){
    this.getList()
  },
  methods: {
    getList(){
      getList().then(response => {
        this.tableModel.tableData = response.data
        // this.listLoading = false
             console.log(this.list)
      })
 
    },
    submitInfo(params){
        console.log({params})
        submitInfo(params).then(res=>{
          if(res.status===200){
            this.$message.success('添加成功');
            this.$refs.compTable.hideDialog()
            this.getList()
          }
        })
      },
    editInfo(params){
       editInfo(params).then(res=>{
          if(res.status===200){
            this.$message.success('更新成功');
            this.$refs.compTable.hideDialog()
            this.getList()
          }
      })
    },
    delInfo(params){
       delInfo(params).then(res=>{
          if(res.status===200){
            this.$message.success('删除成功');
            this.getList()
          }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.host-container {
  // &-container {
  // }
  .mr0 {
    margin-right: 0 !important;
  }
  .demo-form-inline {
    float: right;
  }
  .block {
    float: right;
    margin: 12px;
  }
}
</style>
