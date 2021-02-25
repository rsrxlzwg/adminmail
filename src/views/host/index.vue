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
import {getHost,submitInfo,editInfo,delInfo} from '../../api/base/host'
import {getList} from '../../api/base/setUpCredentials'
let credentialOption=''

export default {
  name: 'Host',
   components:{
    compTable
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        Active: 'success',
        Cordoned: 'warning',
        xxx1: 'gray',
        xxx2: 'danger'
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
            label: '主机ID'
          },
          {
            prop: 'name',
            label: '名称'
          },
          {
            prop: 'ip',
            label: '私有ip'
          },
          {
            prop: 'credential',
            label: '主机凭据',
            render:()=>{

            }
          },
          {
            prop: 'port',
            label: '节点'
          },
           {
            prop: 'host_name',
            label: '主机名'
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
          ip: '',
          port: '',
          host_name:'',
          credential_id:'',
          role:''
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
            label:'主机名',
            prop:'host_name',
            type:'input',
            disabled:false,
          },
          {
            label:'主机ip',
            prop:'ip',
            type:'input',
            disabled:false,
          },
          {
            label:'端口',
            prop:'port',
            type:'input',
            disabled:false,
          },           
          {
            label:'凭据',
            prop:'credential_id',
            type:'select',
            disabled:false,
            options:credentialOption
          },
          {
            label:'角色',
            prop:'role',
            type:'select',
            disabled:false,
            options:[{
              label:'master',
              value:'master'
            },
            {
              label:'worker',
              value:'worker'
            }]
          },
        ],
        btnData:[       
          {
            type:'submit' ,
            style:'primary',
            label:'确定',
          },
          {
            type:'cancle' ,
            label:'取消',
            style:'',
          }
         
        ],
        rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
          ],
          host_name: [
            { required: true, message: '请输入主机名', trigger: 'blur' },
          ],
          ip: [
            { required: true, message: '请输入ip', trigger: 'blur' }
          ],
          port: [
            { required: true, message: '请输入端口', trigger: 'blur' }
          ],
           role: [
            { required: true, message: '请选择角色', trigger: 'change' }
          ],
          credential_id: [
            { required: true, message: '请选择凭证', trigger: 'change' }
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
    this.getHost()
    this.getCredential()
  },
  methods: {
    getHost(){
      getHost().then(response => {
        this.tableModel.tableData = response.data
        // this.listLoading = false
             console.log(this.list)
      })
 
    },
    submitInfo(params){
        console.log({params})
        params.port=parseInt(params.port)
        submitInfo(params).then(res=>{
          if(res.status===200){
            this.$message.success('添加成功');
            this.$refs.compTable.hideDialog()
            this.getHost()
          }
        })
      },
    editInfo(params){
       editInfo(params).then(res=>{
          if(res.status===200){
            this.$message.success('编辑成功');
            this.$refs.compTable.hideDialog()
            this.getHost()
          }
      })
    },
    delInfo(params){
       delInfo(params).then(res=>{
          if(res.status===200){
            this.$message.success('删除成功');
            this.getHost()
          }
      })
    },
    getCredential(){
      getList().then(res=>{
        console.log('list',res)
        let options=[]
        res.data.forEach(item=>{
          options.push({
            label:item.name,
            value:item.id
          })
        })
        this.formModel.formFilds[4].options=options
        console.log(this.formModel.formFilds)
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
