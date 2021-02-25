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
       @editFun="editModal"
       @addModal="addModal"
       ></comp-table> 
    <el-dialog
      class="deepdialog"
      :title="title"
      :visible.sync="dialogFormVisible"
      width="40%">
      <el-form
        :model="groupForm"
        label-position="left"
        ref="ruleForm"  
        label-width="120px" >
        <el-form-item 
          prop="teamName"
          label='群组名称' >
           <!-- 输入框 -->
          <el-input
                v-model="groupForm.teamName"
                size="mini"
                placeholder= "请输入"/>
        </el-form-item>
        <el-form-item 
          prop="member"
          label='群组成员' >
           <!-- 输入框 -->
           <el-row :gutter="20">
             <el-col :span="17">
              <el-autocomplete
                v-model="state1"
                size="mini"
                :fetch-suggestions="querySearch"
                @select="handleSelect"
                placeholder= "请输入群组名称"></el-autocomplete>
             </el-col>
             <el-col :span="6">
                <el-button type="primary" size="mini" @click="addMember">添加</el-button>
             </el-col>
           </el-row>
           <el-table
            :data="searchTableData">
              <el-table-column
              type="selection"
              width="55" />
              <el-table-column 
              prop="userName" 
              label="用户名称" />
              <el-table-column 
              prop="email" 
              label="邮箱" />
              <el-table-column 
              prop="ldap" 
              label="LDAP用户" />
               <el-table-column 
              prop="manage" 
              label="团队管理员" />
              <el-table-column label="操作">
                <template slot-scope="scope">
                <el-button
                    type="text"
                    size="small"
                    @click.native.prevent="searchTableData.splice(scope.$index,1)"
                  >删除</el-button></template>
              </el-table-column>
           </el-table>
          
        </el-form-item>
      </el-form>
        <div
              slot="footer"
              class="dialog-footer">
              <el-button 
              @click="cancelClick()"
              type="primary"      
              size="mini">确定</el-button>
              <el-button 
              @click="cancelClick()"
              type=""      
              size="mini">取消</el-button>
            </div>
    </el-dialog>
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
      restaurants:[],
      state1:'',
      title:'新增',
      dialogFormVisible:false,
      searchTableData:[
        {
        userName:'admin',
        email:'yo@163.com',
        ldap:'s',
        manage:'admin'
        }
      ],
      groupForm:{
        teamName:'',
        num:'',
        item:''
      },
      tableModel:{
        tableData: [
          {
            teamName:'team',
            num:'2'
          }
        ],
        rowData:[
          {
            prop: 'teamName',
            label: '群组名称'
          },
          {
            prop: 'num',
            label: '成员'
          }
        ],
        operateData:[
          {
            label:'编辑',
            type:'editNew',
            url:'',
            funName:'editFun',
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
        btnGroup:[
          {
            type:'addNew',
            style:'primary',
            label:'新增群组',
            url:'',
            funName:'addModal',
          }
        ],
        formModel:{},
        searchFild:[]
      }

    };
  },
  mounted(){
    // this.getList()
    this.restaurants = this.loadAll();
  },
  methods: {
    addMember(){
      console.log('state1',this.state1)
      this.searchTableData.push(this.groupForm.item) 
    },
    loadAll() {
      return [
          {value:'admin', 'userName':'admin', 'email':'admin@163.com','ldap':'s','manage':'admin' },
          {value:'demo', 'userName':'demo', 'email':'demo@163.com','ldap':'o','manage':'demo' },
      ]},
    handleSelect(item) {
      console.log({item});
      this.groupForm.item=item
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    cancelClick(){
      this.dialogFormVisible=false
    },
    addModal(){
      console.log('xxxx')
      this.dialogFormVisible=true
      Object.keys(this.groupForm).map(key => this.groupForm[key] = "")    
    },
    editModal(row){
      this.dialogFormVisible=true,
      Object.keys(this.groupForm).forEach(key=>{this.groupForm[key]=row[key]})       
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
