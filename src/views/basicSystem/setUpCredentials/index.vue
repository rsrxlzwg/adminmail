<template>
  <!-- 命名空间 -->
  <div class="name-container">
    <comp-table 
      ref="compTable"
      :tableModel=tableModel 
       :formModel=formModel 
       :searchModel=searchModel
       @submitHandle="submitInfo"
       @editHandle="editInfo"
       @delInfo="delInfo"></comp-table>
   
  </div>
</template>

<script>
import {getList,submitInfo,editInfo,delInfo} from '../../../api/base/setUpCredentials'
import CompTable from '../../components/table'

export default {
  name: 'NameSpace',
  filters: {
    
  },
  components:{
    CompTable
  },
  data() {
    return {   
      tableModel:{
        tableData: [],
        rowData:[
         {
            prop: 'id',
            label: '凭证ID'
          },
          {
            prop: 'name',
            label: '名称'
          },
          {
            prop: 'username',
            label: '用户名'
          },
          {
            prop: 'type',
            label: '类型'
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
          username: '',
          type: 'password',
          credential_data:''
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
            label:'用户名',
            prop:'username',
            type:'input',
            disabled:false,
          },
          {
            label:'凭据',
            prop:'type',
            type:'radio',
            radios:[
              {
                value:'password',
                label:'密码'
              },
              {
                value:'sshkey',
                label:'sshkey'
              }
            ]
          },
          {
            label:'密码',
            prop:'credential_data',
            type:'password',
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
            { required: true, message: '请输名称', trigger: 'blur' },
          ],
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择凭证类型', trigger: 'blur' }
          ],
          credential_data: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
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
          cluster:''
        },
        searchFild:[
          {
            type:'input',
            label:'集群',
            prop:'cluster',          
          },
          {
            type:'select',
            label:'集群',
            prop:'clusters',
            options:[
              {
                value:'1',
                label:'2'
              }
            ]
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
      getList().then(res=>{
        console.log(res)
        this.tableModel.tableData=res.data
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
            this.$refs.compTable.hideDialog()
            this.getList()
          }
      })
    }
    
  }
}
</script>

<style lang="scss" scoped>

</style>

