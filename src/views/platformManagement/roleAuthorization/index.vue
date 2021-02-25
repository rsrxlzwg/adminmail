<template>
  <div>
    <el-row :gutter="5">
      <el-col :span="5">
        <el-card>
          <div slot="header" class="clearfix">
            <span>角色</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <el-tree :expand-on-click-node="false" :render-content="renderContent" :data="data" :props="defaultProps" :default-expand-all="true" @node-click="handleNodeClick" />
        </el-card>
      </el-col>
      <el-col :span="19">
        <headersearch :searchModel=searchModel @onSearch="onSearch" :show='true'></headersearch>
        <el-card>
            <comp-table 
            ref="compTable"
            :tableModel=tableModel 
            :formModel=formModel 
            :searchModel=searchModel
            @submitHandle="submitInfo"
            @editHandle="editInfo"
            @editFun="editModal"
            @addModal="addModal"
            @delInfo="delInfo"
            ></comp-table>
        </el-card>
      </el-col>
    </el-row>
      <el-dialog
      class="deepdialog"
      title="关联"
      :visible.sync="dialogFormVisible"
      width="65%">
        <div style="margin:-20px -90px;">
           <el-row :gutter="10">
             <el-col :span="2" style="display:flex;margin: 5px 0">
               <span>用户名</span>
             </el-col>
              <el-col :span="6" >
               <el-input size="mini" v-model="authsearchModel.formModel.nickName"></el-input>
             </el-col>
            <el-col :span="6">
               <el-button size="mini" type="" style="margin-right:5px" @click="findUser">搜索</el-button>
               <el-button size="mini" type=""  @click="clenNickName">重置</el-button>
             </el-col>
           </el-row>
           <comp-table 
            ref="authTable"
            :tableModel=authtableModel 
            :formModel=authformModel 
            :searchModel=authsearchModel
            @submitHandle="submitInfo"
            @editHandle="editInfo"
            @editFun="editModal"
            @addModal="addModal"
            ></comp-table>
          
             </div>
              <div
              slot="footer"
              class="dialog-footer">
              <el-button 
              @click="submitRoleUsers"
              type="primary"      
              size="mini">确定</el-button>
              <el-button 
              @click="dialogFormVisible=false"
              type=""      
              size="mini">取消</el-button>
            </div>
      </el-dialog>

  </div>
</template>

<script type="text/ecmascript-6">
import compTable from '@/views/components/table'
import headersearch from '@/views/components/search'
import {getRoles,getAllUsers,getUsersByroleId,insertRoleUsers,deleteAll} from '@/api/sysManagement/roleAndUser'
export default {
  components:{
    compTable,
    headersearch
  },
  data() {
    return {
    
      dialogFormVisible:false,
      checknode: '',
      from: {},
      checked: false,
      data: [{
        label: '系统管理',
        userData:[
           {
            teamName:'张某某',
            num:'建行'
          },
          {
            teamName:'王某某',
            num:'工商银行'
          },
        ],
        children: [{
          label: '系统配置',
          userData:[
           {
            teamName:'孙某某',
            num:'西安银行'
          },
          {
            teamName:'赵某某',
            num:'陕农'
          },
        ],
          children: [{
            label: '菜单管理',
            userData:[]
          }
          ]
        }]
      }, {
        label: '服务治理',
        children: [{
          label: '线下治理',
          children: [{
            label: '协议管理'
          }]
        }, {
          label: '线上治理',
          children: [{
            label: '链路追踪'
          }]
        }]
      }, {
        label: '网关管理',
        children: [{
          label: '协议类型'
        }, {
          label: '报文类型'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
     tableModel:{
        tableData: [
           {
             account:'0070070',
            name:'李某某',
             nickName:'总行技术管理岗',
             companyOrgName:'13000000001',
             orgName:'启用',
          },
        ],
        rowData:[
         {
            prop:'nickName',
            label:'用户名'
          }, 
           {
            prop:'name',
            label:'姓名'
          },
           {
            prop:'account',
            label:'工号'
          },
           {
            prop:'companyOrgName',
            label:'公司名称'
          },
            {
            prop:'orgName',
            label:'部门名称'
          },
        ],
        operateData:[],
        pagination:{
          currentPage:1,
          pagesize:10,
          total:3
        },
      },
      formModel:{
        formData:{
          teamName: ''
        },
        formLabelWidth: '80px',
        formFilds:[
          {
            label:'团队名称',
            prop:'teamName',
            type:'input',
            disabled:false,
          },
          {
            label:'团队名称',
            prop:'teamName',
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
        show:true,
        btnSpan:5,
        btnGroup:[
          {
            type:'addNew',
            style:'primary',
            label:'关联用户',
            url:'',
            funName:'addModal',
          },
          {
            type:'delete',
            style:'',
            label:'删除',
            url:'',
          },
        ],
        formModel:{
          nickName:''
        },
        searchFild:[
          {
           type:'input',
           label:'用户名称',
           prop:'nickName',
            span:8,
         },
        ]
      },

       authtableModel:{
        tableData: [
           {
            code:'0070070',
            name:'李某某',
            role:'总行技术管理岗',
            phone:'13000000001',
            address:'',
            status:'启用',
          },
        ],
        rowData:[
          {
            prop:'nickName',
            label:'用户名'
          },
          {
            prop:'name',
            label:'姓名'
          },
          {
            prop:'account',
            label:'工号'
          },
          {
            prop:'companyOrgName',
            label:'公司名称'
          },
          {
            prop:'orgName',
            label:'部门名称'
          },
        ],
        operateData:[],
        pagination:{
          currentPage:1,
          pagesize:10,
          total:3
        },
      },
      authformModel:{
        formData:{
          teamName: ''
        },
        formLabelWidth: '80px',
        formFilds:[
          {
            label:'团队名称',
            prop:'teamName',
            type:'input',
            disabled:false,
          },
          {
            label:'团队名称',
            prop:'teamName',
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
      authsearchModel:{
        show:false,
        btnSpan:6,
        btnGroup:[],
        formModel:{
          nickName:''
        },
        searchFild:[
          {
            type:'input',
            label:'用户名称',
            prop:'nickName',
            span:8,
          },
        ]
      },
      tableDataAuth:[
         {
            code:'0070070',
            name:'李某某',
            role:'总行技术管理岗',
            phone:'13000000001',
            address:'',
            status:'启用',
          },
           {
            code:'0070070',
            name:'张某某',
            role:'总行技术管理岗',
            phone:'13000000001',
            address:'',
            status:'启用',
          },
      ],
      rowDataAuth:[
         {
            prop:'nickName',
            label:'用户名'
          },
           {
            prop:'name',
            label:'姓名'
          },
           {
            prop:'account',
            label:'工号'
          },
           {
            prop:'companyOrgName',
            label:'公司名称'
          },
            {
            prop:'orgName',
            label:'部门名称'
          },
      ],
      currentRole:''
    }
  },

  mounted(){
    this.getAllRoles()
  },
  methods: {
    getAllRoles() {
       getRoles().then(res=>{
         this.data = res.data
       })
    },
    handleNodeClick(params){
      this.currentRole=params.id
      const param={
          id:params.id,
          pageSize:this.tableModel.pagination.pagesize,
          pageNo:this.tableModel.pagination.currentPage
      }
      this.getUsers(param)
    },
    onSearch(){
      if(this.currentRole==''){
        return false;
      }else {
        const param={
          id:this.currentRole,
          nickName:this.searchModel.formModel.nickName,
          pageSize:this.tableModel.pagination.pagesize,
          pageNo:this.tableModel.pagination.currentPage
        }
        this.getUsers(param)
      }
    },
    getUsers(param){
      getUsersByroleId(param).then(res=>{
        this.tableModel.tableData = res.data.data
        this.tableModel.pagination.total=res.data.length
      })
    },
    renderContent(h, { node, data, store }) {
      return h('div', {
        style: {
          width: '80%'
        },
        attrs: {
          type: 'flex',
          justify: 'space-between'
        },
         on: {
          click: () => {
            this.tableModel.tableData=data.userData
          }
        }
       
      },node.label)
    },
     addModal(){
      this.dialogFormVisible=true
       const userParam={
         requestObject:{ roleId:this.currentRole
         },
         pageSize:this.authtableModel.pagination.pagesize,
         pageNo:this.authtableModel.pagination.currentPage
       }
       this.querryUsers(userParam)
    },
    findUser(){
      const userm={
        requestObject:{
          roleId:this.currentRole,
          nickName:this.authsearchModel.formModel.nickName
        },
        pageSize:this.authtableModel.pagination.pagesize,
        pageNo:this.authtableModel.pagination.currentPage
      }
      this.querryUsers(userm)
    },
    querryUsers(userm){
      getAllUsers(userm).then(res=>{
        this.authtableModel.tableData = res.data.data
        this.authtableModel.pagination.total=res.data.length
      })
    },
    clenNickName(){
      this.authsearchModel.formModel.nickName='',
      this.findUser()
    },

    submitRoleUsers(){
      let users=this.$refs.authTable.$refs.commonTable.selection
      const userlength= users.length>0
      let ids=[]
      users.forEach(user=>{
        ids.push(user.id)
      })
      if(userlength){
        this.dialogFormVisible=false
        const roleUsersParam={
          roleId:this.currentRole,
          userIdList:ids
        }
        insertRoleUsers(roleUsersParam).then(res=>{
          if(res.code===200){
            const params={
              id:this.currentRole,
              pageSize:this.tableModel.pagination.pagesize,
              pageNo:this.tableModel.pagination.currentPage
            }
            this.getUsers(params)
          }
        })
      }else{
        this.$message({
          message: '请选择一条数据',
          type: 'warning'
        })
      }
    },
    delInfo(params){
      deleteAll({ids:params}).then(res=>{
        if(res.code===200){
          this.$refs.compTable.hideDialog()
          const params={
            id:this.currentRole,
            pageSize:this.tableModel.pagination.pagesize,
            pageNo:this.tableModel.pagination.currentPage
          }
          this.getUsers(params)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
