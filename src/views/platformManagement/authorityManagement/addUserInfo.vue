<template>
  <div>
    <el-card>
      <span slot="header"> 编辑用户信息</span>
      <el-form ref="form" :model="form" label-position="left" label-width="140px" style="width:80%;margin:0 auto">
        <el-row :gutter="20">
           <el-col :span="12"> 
            <el-form-item label="姓名">
              <el-input v-model="form.name" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12"> 
            <el-form-item label="工号">
              <el-input v-model="form.account" size="small" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
         <el-row :gutter="20">
           <el-col :span="12">
            <el-form-item label="所属公司">
              <el-select v-model="form.companyId" size="small" placeholder="" style="width:100%" @change="changeCpy">
                <el-option :label="option.name" :value="option.id"  v-for="option in companyOptions" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12"> 
            <el-form-item label="所属部门">
              <treeselect
                name="upName"
                v-model="form.orgId"
                :multiple="false"
                :options="options"
                :normalizer="normalizer"
                noChildrenText=""
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12"> 
              <el-form-item label="用户">
                <el-input v-model="form.nickName" size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="移动电话">
                <el-input v-model="form.phone" size="small"></el-input>
              </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12"> 
            <el-form-item label="身份证">
              <el-input v-model="form.idCast"  size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12"> 
            <el-form-item label="邮件">
              <el-input v-model="form.email"  size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
         <el-row :gutter="20">
          <el-col :span="12"> 
            <el-form-item label="入职日期">
              <el-date-picker
              style="width:100%"
              size="small"
                v-model="form.entryDate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
           <el-col :span="12">
              <el-form-item label="出生日期">
              <el-date-picker
              style="width:100%"
              size="small"
                v-model="form.birthday"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
         <el-row :gutter="20">
           <el-col :span="12"> 
            <el-form-item label="性别">
              <el-radio-group v-model="form.sex" size="small">
                <el-radio label="0" >男</el-radio>
                <el-radio label="1" >女</el-radio>
                <el-radio label="2" >保密</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
           <el-col :span="12">
              <el-form-item label="状态">
               <el-radio-group v-model="form.status" size="small">
                <el-radio label="1" >启用</el-radio>
                <el-radio label="0">停用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
           <el-col :span="12">
             <el-form-item label="密码">
               <el-input v-model="form.password" size="small" show-password></el-input>
             </el-form-item>
           </el-col>
        </el-row>
         <el-form-item label="地址" size="small">
                  <el-input v-model="form.address"  type="textarea"></el-input>
                </el-form-item>
      </el-form>
       <div  class="dialog-footer">
        <el-button @click="backPage" size="small">取 消</el-button>
        <el-button type="primary" @click="useradd" size="small">确 定</el-button>
      </div>
    </el-card>
    <el-dialog class="deepdialog" title="部门" :visible.sync="treeModel" width="40%">
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
       <div slot="footer" class="dialog-footer">
        <el-button @click="treeModel = false">取 消</el-button>
        <el-button type="primary" @click="treeModel = false">确 定</el-button>
      </div>
    </el-dialog >
  </div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import {getDetail,submitInfo,editInfo,selectOrgTree,selectCompany} from '@/api/sysManagement/user'

  export default {
    components:{
      Treeselect
    },
    data(){
      return{
        companyOptions:[],
        treeModel:false,
        form:{
          account:'',
          name:'',
          sex:'',
          email:'',
          nickName:'',
          phone:'',
          status:'',
          adress:'',
          password:'',
          entryDate:'',
          birthday:"",
          idCast:'',
          adress:''
        },
        options: [ {
          id: '10001',
          label: '总公司',
          children: [ {
            id: '10002',
            label: '财务部',
          }, {
            id: '10003',
            label: '行政部',
          } ],
        }, ],
        data: [{
          label: '未来银行',
          children: [{
            label: '总行'
          },
          {
            label:'网络金融部'
          },{
            label:'公司业务部'
          }]
        }, {
          label: '邮储银行',
          children: [{
            label: '总行电子银行部'
          }, {
            label:'总行网络金融部'
          }]
        }, {
          label: '中旅银行',
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        pageType:'',
        normalizer(node) {
          return {
            id: node.id,
            label: node.name,
            children: node.children,
          }
        },
      }
    },
    mounted(){
      const {type,id}=this.$route.query
      this.pageType=type
      this.selectCompany()
      if(type==='edit'){
        this.getInfo({id:id})
      }
      if(type==='add'){
        this.form ={} 
      }

    },
    methods:{
      changeCpy(val){
        this.selectOrgTree(val)
      },
      selectOrgTree(id){
        selectOrgTree({id:id}).then(res=>{
          this.options=res.data
        })
      },
      selectCompany(){
        selectCompany().then(res=>{
          this.companyOptions=res.data
        })
      },
      backPage(){
        this.$router.push('userManagement')
      },
      useradd(){
          console.log(this.form)
        const {type,id}=this.$route.query
        this.pageType=type
        if(type==='edit'){
          this.getInfo({id:id})
            editInfo(this.form).then(res=>{
              if(res.code===200){
                this.dialogFormVisible=false
                this.getList()
              }else{
                this.$message({
                  message: res.msg,
                  type: 'warning'
                })
              }
            })
        }
        if(type==='add'){
          submitInfo(this.form).then(res=>{
            if(res.code===200){
              this.$refs.compTable.hideDialog()
              this.getList()
            }
          })
        }
        this.$router.push('userManagement')
      },

      handleNodeClick(data){
        
        this.form.dep=data.label
      },
      getInfo(id){
        getDetail(id).then(res=>{
          this.form=res.data
          this.selectOrgTree(res.data.companyId)
          Object.keys(this.form).forEach(key=>{this.form[key]=res.data[key]})
        })
      }
    }
    
  }
</script>

<style lang="scss" scoped>
.vue-treeselect__control{
  line-height: 18px ;
}
.dialog-footer{
  width: 200px;
  margin: 0 auto;
}
</style>
