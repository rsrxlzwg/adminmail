<template>
  <!-- 集群  -->
  <div class="culster-container">
     <!-- <comp-table
      ref="compTable"
      :tableModel=tableModel
       :formModel=formModel
       :searchModel=searchModel
       @submitHandle="submitInfo"
       @editHandle="editInfo"
       @issueFun="issueFun"
       @addInfo="addInfo"
       @editRow="editRow"
       ></comp-table>  -->
  <headersearch :searchModel=searchModel @onSearch="onSearch" :show='true'></headersearch>
  <el-card>
    <el-button
        type=""
        @click="addsetup(btn)"
        v-for="btn in searchModel.btnGroup"
        :icon="choseIcon(btn)"
        size="small"
      >{{btn.label}}</el-button>
       <el-table
          :data="tableModel.tableData"
           ref="userTable"
           style="margin-top:20px"
          :cell-style="{'text-align': 'center'}"
          :header-cell-style="{'text-align': 'center','background':'#eef1f6'}"
      >
      <el-table-column
            type="selection"
            width="55" >
          </el-table-column>
      <el-table-column
        prop="nickName"
        label="用户名"
        width="180">
        <template slot-scope="scope">
              <el-popover
              placement="bottom"
              title="详情"
              width="550"
              trigger="click"
             >
             <ul class="details">
               <li >
                 <div>
                    <span>姓名：</span>
                    <span>{{scope.row.name}}</span>
                 </div>
                 <div>
                    <span>工号：</span>
                    <span>{{scope.row.account}}</span>
                 </div>
               </li>
              <li >
                 <div>
                    <span>所属公司：</span>
                    <span>{{scope.row.companyOrgName}}</span>
                 </div>
                 <div>
                    <span>所属部门：</span>
                    <span>{{scope.row.orgName}}</span>
                 </div>
               </li>
                <li >
                 <div>
                    <span>用户名：</span>
                    <span>{{scope.row.nickName}}</span>
                 </div>
                 <div>
                    <span>身份证：</span>
                    <span>{{scope.row.idCast}}</span>
                 </div>
               </li>
                 <li >
                 <div>
                    <span>邮件：</span>
                    <span>{{scope.row.email}}</span>
                 </div>
                 <div>
                    <span>移动电话：</span>
                    <span>{{scope.row.phone}}</span>
                 </div>
               </li>
                <li >
                 <div>
                    <span>入职日期：</span>
                    <span>{{scope.row.entryDate}}</span>
                 </div>
                 <div>
                    <span>出生日期：</span>
                    <span>{{scope.row.birthday}}</span>
                 </div>
               </li>
              <li >
                 <div>
                    <span>性别：</span>
                   <span>{{scope.row.sex |filterSex }}</span>
                 </div>
                 <div>
                    <span>状态：</span>
                   <span>{{scope.row.status | filterStatus }}</span>
                 </div>
               </li>
             </ul>
              <span slot="reference">{{scope.row.nickName}}</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="account"
        label="工号"/>
            <el-table-column
        prop="companyOrgName"
        label="公司名称"/>
            <el-table-column
        prop="orgName"
        label="部门名称"/>
            <el-table-column
        prop="sex"
        label="性别">
           <template slot-scope="scope">
             <span>{{scope.row.sex |filterSex }}</span>
           </template>
        </el-table-column>
         <el-table-column
        prop="status"
        label="状态">
          <template slot-scope="scope">
            <span>{{scope.row.status | filterStatus }}</span>
          </template>
        </el-table-column>
    </el-table>
     <div
        class="block"
        v-show="tableModel.pagination.currentPage"
      >
        <el-pagination
          background
          :current-page="tableModel.pagination.currentPage"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="tableModel.pagination.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableModel.pagination.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
  </el-card>
  <el-dialog
      class="deepdialog"
      title="授权"
      :visible.sync="dialogFormVisible"
      width="65%">
      <el-form
        :model="formModel.formData"
        label-position="right"
        ref="ruleForm"
        :rules="formModel.rules"
        :label-width="formModel.formLabelWidth?formModel.formLabelWidth:'100px' "
      >
        <el-form-item
          :prop="item.prop"
          :label='item.label'
          v-for="item in formModel.formFilds"
          :key='item.prop'
        >
          <!-- 输入框 -->
          <el-input
            v-model="formModel.formData[item.prop]"
            size="mini"
            :disabled="item.disabled"
            :placeholder=' "请输入"+ item.label'
            v-if="item.type==='input' "
          />
          <!-- 输入框 -按钮 -->
          <el-row
            v-if="item.type==='inputBtn' "
            :gutter="20"
          >
            <el-col :span="10">
              <el-input
                v-model="formModel.formData[item.prop]"
                size="mini"
                :disabled="item.disabled"
                :placeholder=' "请输入"+ item.label'
              />
            </el-col>
            <el-col :span="2">
              <el-button size="small">{{item.btnName}}</el-button>
            </el-col>
          </el-row>

          <!-- 数字 -->
          <el-input
            v-model="formModel.formData[item.prop]"
            size="mini"
            type="number"
            :disabled="item.disabled"
            :placeholder=' "请输入"+ item.label'
            v-if="item.type==='number' "
          />
          <!-- 密码 -->
          <el-input
            v-model="formModel.formData[item.prop]"
            size="mini"
            :disabled="item.disabled"
            :placeholder=' "请输入"+ item.label'
            type="password"
            v-if="item.type==='password' "
          >
            <i
              slot="suffix"
              class="el-icon-view "
              style="fontSize:18px;cursor:pointer"
            />
          </el-input>
          <!-- textarea -->
          <el-input
            v-model="formModel.formData[item.prop]"
            size="mini"
            type="textarea"
            :disabled="item.disabled"
            :placeholder=' "请输入"+ item.label'
            v-if="item.type==='textarea' "
          />
          <!-- 下拉框 -->
          <el-select
            v-if="item.type==='select'"
            v-model="formModel.formData[item.prop]"
            size="mini"
          >
            <el-option
              v-for="op in item.options"
              :label="op.label"
              :value="op.value"
              :key="op.value"
            ></el-option>
          </el-select>
            <!-- 树形下拉 -->
            <treeselect
             v-if="item.type==='selectTree'"
            v-model="formModel.formData[item.prop]"
            :multiple="item.multiple"
            :options="item.options"
            :normalizer="item.normalizer?item.normalizer:[]"
            />
          <!-- 单选 -->
          <el-radio-group
            v-if="item.type==='radio'"
            v-model="formModel.formData[item.prop]"
          >
            <el-radio
              v-for="ra in item.options"
              :label="ra.value"
              :key="ra.value"
            >{{ra.label}}</el-radio>
          </el-radio-group>
          <!-- 复选框 -->
          <el-checkbox-group
            v-if="item.type==='checkbox'"
            v-model="formModel.formData[item.prop]"
          >
            <el-checkbox
              v-for="ch in item.options"
              :label="ch.value"
              :key="ch.value"
            >{{ch.label}}</el-checkbox>
          </el-checkbox-group>
          <div v-if="item.type==='other'">
            <el-button
              type="primary"
              size="mini"
              @click="addTag(item.tabelData)"
            >添加</el-button>
            <el-table
              :data="item.tabelData"
              style="width: 100%"
            >
              <el-table-column
                v-for="fild in item.tabelFild"
                :prop="fild.prop"
                :label="fild.label"
              >
                <template slot-scope="scope">
                  <el-input
                    type="text"
                    v-model="scope.row[fild.prop]"
                    size="mini"
                    v-show="fild.type=='input'"
                  />
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="100"
              >
                <template slot-scope="scope">
                  <el-button
                    @click="tagDel(scope.$index,item.tabelData)"
                    type="text"
                    size="small"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-form-item>
      </el-form>

      <div
        slot="footer"
        class="dialog-footer">
        <el-button 
        @click="dialogFormVisible=false"
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

<script>
import compTable from '@/views/components/table'
import headersearch from '@/views/components/search'
import {getInfo,submitInfo,editInfo,deleteInfo} from '@/api/sysManagement/user'
export default {
  name: "Culster",
  components:{
    compTable,
    headersearch
    // search
  },
  filters:{
    filterSex(sex){
      const statusMap = {
        '0': '男',
        '1': '女',
        '2': '保密',
      }
      return statusMap[sex]
    },
    filterStatus(status){
      const statusMap = {
        '0': '禁用',
        '1': '启用',
      }
      return statusMap[status]
    },
  },
  data() {
    return {
      dialogFormVisible:false,
        tableData: [],
      details:{
        name:'1',
        sex:'男'
      },
      visable:false,
      tableModel:{
        tableData: [],
        rowData:[
          {
            prop:'name',
            label:'用户名',
            render:(h,params)=>{
              return h("div", {
                style: {
                  // display: "inline-block",
                  color:'#409EFF'
                },
                attrs:{
                  // trigger:"click",
                  // placement:"right",
                  // width:"160",
                  // content:params.row.name
                },
                on:{
                  click:()=>{
                    this.visable=!this.visable
                    // this.$router.push('containerGroup/detail')
                  }
                }
              }, [
                h('span',{},params.row.name),
                h('div',{
                  style:{
                     display:this.visable
                  },
                 
                },`性别：${this.details.sex}`)
              ]);
            }
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
           {
            prop:'sex',
            label:'性别'
          },
        
          {
            prop: 'status',
            label: '状态'
          },
        ],
        operateData:[
          // {
          //   label:'编辑',
          //   type:'editRow',
          //   funName:'editRow'
          // },
          //  {
          //   label:'删除',
          //   type:'delete',
          // },
          
        ],
        pagination:{
          currentPage:1,
          pagesize:10,
          total:1
        }
      },
      formModel:{
        formData:{
            nickName:'',
            name:'',
            sensitiveType:'',
            desc:'-',
        },
        formLabelWidth: '140px',
        formFilds:[
          {
            label:'用户名',
            prop:'code',
            type:'input',
            disabled:false,
          } ,
          {
            label:'姓名',
            prop:'name',
            type:'input',
            disabled:false,
          } ,
          {
            label:'报文解析器',
            prop:'decoding',
            type:'select',
            disabled:false,
            options:[
              {
                label:'xml',
                value:'xml'
              },
              {
                label:'fix',
                value:'fix'
              },
              {
                label:'json',
                value:'json'
              },
            ]
          }  ,
          {
            label:'敏感数据处理类',
            prop:'sensitiveType',
            type:'input',
            disabled:false,
          } , 
           {
            label:'描述',
            prop:'desc',
            type:'textarea',
            disabled:false,
          } ,    
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
        btnGroup:[
          {
            type:'add',
            style:'primary',
            label:'新增',
            funName:'addInfo'
          },
           {
            type:'edit',
            style:'',
            label:'编辑',
            funName:'editRow'
          },
           {
            type:'delete',
            style:'',
            label:'删除',
          
          },
         
        ],
        formModel:{
          nickName:'',
          name: '',
          account: '',
          companyOrgName: '',
          orgName: ''
        },
        searchFild:[
           {
           type:'input',
           label:'用户名称',
           prop:'nickName'
         },
          {
           type:'input',
           label:'姓名',
           prop:'name'
         },
          {
           type:'input',
           label:'工号',
           prop:'account'
         },
          {
           type:'input',
           label:'公司名称',
           prop:'companyOrgName'
         },
          {
           type:'input',
           label:'部门名称',
           prop:'orgName'
         }
        ]
      },
      addVisible:false,
      fileData:{
        name:'',
        virtulname:'',
        content:[
          {
            workload:'',
            versions:'',
          }
        ],
      },

    };
  },
  mounted(){
    this.getList()
  },
  methods: {
     handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    addsetup(item) {
      const selectData=this.$refs.userTable.selection
      const haveData = selectData.length > 0
      const isOneData = selectData.length == 1
      console.log({selectData})
      let ids=[]
      selectData.forEach(e => {
        ids.push(e.id)
      });
      if(item.type=='delete'){
        if(haveData){
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.delUser(ids)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }else{
          this.$message({
            message: '请选择一条数据',
            type: 'warning'
          });
        }
       
      }
      if(item.type=='add'){
       this.gotoPage('add')
      }
      if(item.type=='edit'){
        if(haveData&&isOneData){
           const id=selectData[0].id
          this.gotoPage('edit',id)
        }else{
           this.$message({
            message: '请选择一条数据',
            type: 'warning'
          });
        }
         
      }
    },
    choseIcon(btn) {
      let icon = ''
      switch (btn.type) {
        case 'add':
          icon = "el-icon-zoom-in"
          break
        case 'issue':
          icon = "el-icon-sold-out"
          break
        case 'edit':
          icon = "el-icon-edit"
          break
        case 'delete':
          icon = "el-icon-delete"
          break
        case 'search':
          icon = "el-icon-search"
          break
        default:
          icon = "el-icon-edit"
          break
      }
      return icon
    },
    onSearch(){
       this.getList()
    },
    gotoPage(type,id){
      this.$router.push({path:'addUserInfo',query:{'type':type,'id':id}})
    },
    editRow(){
      this.$router.push('addUserInfo')
    },
    issueFun(){
      this.$message.success('下发成功')
    },
     tableDel(i){
      this.fileData.content.splice(i,1)
    },
    addTable(){
      this.fileData.content.push({
            workload:'',
            versions:'',
          })
    },
    addService(){
      this.addVisible=true
    },
    getList(){
      const params={
        pageSize:this.tableModel.pagination.pagesize,
        pageNo:this.tableModel.pagination.currentPage,
        requestObject:this.searchModel.formModel
      }
      getInfo(params).then(response => {
        this.tableModel.tableData = response.data.data
        this.tableModel.pagination.total=response.data.total
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
             this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getList()
          }
      })
    },
     delUser(params){
       deleteInfo({idList:params}).then(res=>{
          if(res.code===200){
             this.$message({
              message: '删除成功',
              type: 'success'
            });
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
 .details{
   li{
     display: flex;
    justify-content: space-around;
   }
    
  }
</style>
