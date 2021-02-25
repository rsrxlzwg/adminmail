<template>
  <!-- 集群  -->
  <div class="culster-container">
   <headersearch  :searchModel=searchModel @onSearch="onSearch" ></headersearch>
     <!-- <comp-table 
      ref="compTable"
      :tableModel=tableModel 
       :formModel=formModel 
       :searchModel=searchModel
       @submitHandle="submitInfo"
       @editHandle="editInfo"
       @delInfo="delInfo"
       @issueFun="issueFun"
       @auth="auth"
       ></comp-table>  -->

      <el-card>
            <el-button
            style="margin-bottom:20px"
            type=""
            @click="addsetup(btn)"
            v-for="btn in searchModel.btnGroup"
            :icon="choseIcon(btn)"
            size="small"
          >{{btn.label}}</el-button>
          <dragTreeTable
            :data="treeData"
            :onDrag="onTreeDataChange"
            fixed
            >
            </dragTreeTable>
      </el-card>
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
          label='父角色' >
           <!-- 输入框 -->
            <treeselect
            v-model="groupForm.parentId"
            :multiple="false"
            :options="treeOptions"
            :normalizer="normalizer"
            />
        </el-form-item>
        <el-form-item
          prop="teamName"
          label='角色名称' >
          <el-input
                v-model="groupForm.name"
                size="mini"
                placeholder= "请输入"/>
        </el-form-item>
        <el-form-item
          prop="teamName"
          label='角色编码' >
          <el-input
                v-model="groupForm.code"
                size="mini"
                placeholder= "请输入"/>
        </el-form-item>
         
         <el-form-item
          prop="teamName"
          label='角色类型' >
          <el-select  v-model="groupForm.type" size="mini" >
              <el-option label="开发人员" :value="2"  />
              <el-option label="运维人员" :value="1"  />
              <el-option label="管理人员" :value="0"  />
          </el-select>
        </el-form-item>
          <el-form-item
          prop="teamName"
          label='角色描述' >
          <el-input
                v-model="groupForm.description"
                size="mini"
                type="desc"
                placeholder= "请输入"/>
        </el-form-item>
      </el-form>
        <div
          slot="footer"
          class="dialog-footer">
          <el-button
          @click="addClick()"
          type="primary"
          size="mini">确定</el-button>
          <el-button
          @click="dialogFormVisible=false"
          type=""
          size="mini">取消</el-button>
        </div>
    </el-dialog>
    <el-dialog class="deepdialog" title="授权" :visible.sync="authVisible" width="50%">
     <el-tabs type="border-card">
      <el-tab-pane label="功能权限" class="tab-panes">
        <el-tree 
        ref="menuTree"
       :data="functionPermissions" 
       :props="defaultProps"
       node-key="id"
       :default-checked-keys="checkedMenuData"
       default-expand-all
        show-checkbox
        @node-click="handleNodeClick"></el-tree>
      </el-tab-pane>
      <el-tab-pane label="数据权限" class="tab-panes">
        <el-tree 
         ref="baseDataTree"
        node-key="id"
       :data="dataPermission" 
       :props="defaultProps"
       :default-checked-keys="checkedBaseData"
       default-expand-all
        show-checkbox
        @node-click="handleNodeClick"></el-tree>
      </el-tab-pane>
    </el-tabs>
       
       <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitAuthFun " size="mini">确 定</el-button>
        <el-button @click="authVisible = false" size="mini">取 消</el-button>
   
      </div>
   </el-dialog>
  </div>
</template>

<script>
import compTable from '@/views/components/table'
import headersearch from '@/views/components/search'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import dragTreeTable from "drag-tree-table";
import {getList,submitInfo,editInfo,deleteInfo,getAuthData,submitAuth,getAllTree,updateSort,getAllDataTree,getPermissionAuthData} from '@/api/sysManagement/rule'
let treeOptions=[]
const rebuildData = (value, arr) => {
      let newarr = [];
        arr.forEach(element => {
        if (element.name.indexOf(value) > -1) {
          newarr.push(element);
        } else {
          if (element.children && element.children.length > 0) {
            const ab = rebuildData(value, element.children);
            const obj = {
              ...element,
              children: ab
            };
            if (ab && ab.length>0) {
              newarr.push(obj);
            }
          }
        }
      });
      return newarr;
      
    };
export default {
  name: "Culster",
  components:{
    compTable,
    headersearch,
    Treeselect,
    dragTreeTable
  },
  data() {
    return {
      checkedMenuData:[],
      checkedBaseData:[],
      selectionRows:[],
      title:'',
       normalizer(node) {
        return {
          id: node.id,
          label: node.name,
          children: node.children,
        }
      },
       treeOptions:[],
       groupForm:{
        parentId:null,
        name:'',
        type:'',
        description:"",
        code:'',
        roleSort:1
      },
      dialogFormVisible:false,
      treeData: {
        lists: [
            {
            id:1,
            name:'team',
            simpleName:'xxx',
            num:'10001',
            type:'总公司',
            desc:'',
            children: [{
              id: 11,
              name:'team',
              simpleName:'xxx',
              num:'10002',
              type:'财务部',
              desc:'',
              },{
                 id: 12,
                name:'team',
                simpleName:'xxx',
                num:'10003',
                type:'行政部',
                desc:'',
            }]}
        　],
      columns: [
        {
            type: 'checkbox',
            width: 100,
            align: "center",
            isContainChildren: true,
            onChange: (selectRows) => {
              console.log('一共选择了' + selectRows.length + '条数据')
              console.log({selectRows})
              this.selectionRows=selectRows
            }
          },
      
          {
            type: 'selection',
            title: '角色名称',
            field: 'name',
            width: 200,
            align: 'center',
          },
          {
            type: 'default',
            title: '角色编码',
            field: 'code',
            width: 200,
            align: 'center',
          },
          {
            type: 'description',
            title: '角色描述',
            field: 'name',
            width: 200,
            align: 'center',
          },
          {
            type: 'default',
            title: '角色类型',
            field: 'type',
            width: 200,
            align: 'center',
            formatter: (item) => {
              let typeLable=''
              
              const type=item.type
              console.log({type})
              if(type==0){
                  typeLable='管理人员'
              }else if(type==1){
                typeLable='运维人员'
              }else if(type==2){
                typeLable='开发人员'
              }else{
                typeLable='其它'
              }
              return '<a>'+typeLable+'</a>'
            }
          },
           {
            prop: 'status',
            label: '状态'
          },
            {
            type: 'default',
            title: '描述',
            field: 'description',
            width: 200,
            align: 'center',
          },
          ],
        custom_field: {
            lists: 'children',
        }
      },
      dataPermission:[],
      functionPermissions: [{
         id:1,
          label: '通用组件',
          checked:true,
          children: [{
            id:11,
            label: '协议类型'
          },
          {
              id:12,
            label:'报文类型'
          },{
              id:13,
            label:'基础服务'
          }]
        }, {
            id:2,
          label: '服务治理',
          children: [{
              id:21,
            label: '系统管理',
            children:[
              {
                  id:22,
                label:'终端管理'
              }
            ]
          }, {
              id:23,
            label:'线下治理',
            children:[
              {
                label:'元数据'
              }
            ]
          }]}
          
       ],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
      tableModel:{
        defaultExpand:true,
        tableData: [
          {
            id:'0',
            code:'010001',
            name:'总行经办',
            role:'-',
            type:'管理人员',
            status:'启用',
            children:[
               {
                  id:'1',
                  code:'0100011',
                  name:'分行经办',
                  role:'-',
                  type:'管理人员',
                  status:'启用',}
            ]
          },
        ],
        rowData:[
          {
            prop:'code',
            label:'角色编码'
          }, 
           {
            prop:'name',
            label:'角色名称'
          },
           {
            prop:'description',
            label:'角色描述'
          },
          {
            prop: 'type',
            label: '角色类型'
          },
          {
            prop: 'status',
            label: '状态'
          },
        ],
        operateData:[
          // {
          //   label:'编辑',
          //   type:'edit',
          // },
          //  {
          //   label:'删除',
          //   type:'delete',
          // },
          
        ],
        pagination:{
         
        }
      },
      formModel:{
        formData:{
             id:'',
            leavel:1,
            type:1,
            code:'',
            name:'',
            status:1,
            desc:'-',
        },
        formLabelWidth: '140px',
        formFilds:[
          // {
          //   label:'机构层级',
          //   prop:'leavel',
          //   type:'select',
          //   disabled:false,
          //   options:[
          //     {
          //       label:'总行',
          //       value:1
          //     },
          //     {
          //       label:'租户',
          //       value:2
          //     },
          //   ]
          // } ,
          {
            label:'角色类型',
            prop:'type',
            type:'select',
            disabled:false,
            options:[
              {
                label:'管理员',
                value:1
              },
              {
                label:'开发人员',
                value:2
              },
            ]
          }  ,
          {
            label:'角色编码',
            prop:'code',
            type:'input',
            disabled:false,
          } , 
          {
            label:'角色名称',
            prop:'name',
            type:'input',
            disabled:false,
          } , 
          {
            label:'状态',
            prop:'status',
            type:'radio',
            disabled:false,
            options:[
              {
                label:'启用',
                value:1
              },
               {
                label:'停用',
                value:2
              },
            ]
          } ,
          {
            label:'角色描述',
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
          },
           {
            type:'edit',
            style:'primary',
            label:'编辑',
          },
           {
            type:'delete',
            style:'primary',
            label:'删除',
          },
          {
            type:'auth',
            style:'primary',
            label:'授权',
            funName:'auth'
          },
        ],
        formModel:{
          name:''
        },
        searchFild:[
          {
           type:'input',
           label:'角色名称',
           prop:'name'
         },
         
        ]
      },
      authVisible:false,
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
    }
  },
  mounted(){
     this.getList()
     this.getAllTree()
     this.getAllDataTree()
  },
  methods: {
    // 提交权限
    submitAuthFun(){
      const menuTree=this.$refs.menuTree.getCheckedNodes()
      const baseDataTree=this.$refs.baseDataTree.getCheckedNodes()
      console.log({menuTree})
        // this.$refs.menuTree.setCheckedNodes( this.checkedMenuData)
      submitAuth({
        operateList:menuTree,
        dataRuleList:baseDataTree,
        roleId: this.selectionRows[0].roleId
      }).then(res=>{
        if(res.code===200){
          this.$message({
            type:'success',
            message:'添加授权成功'
          })
          this.authVisible=false
        }
      })
    },
     // 获取功能权限树
    getAllTree(){
      getAllTree().then(res=>{
        if(res.code===200){
          this.functionPermissions=res.data.allShow
          // this.dataPermission=res.data.allBaseSysDataList
        }
      })
    },
     // 获取权限
    getAuth(id){
      
      getAuthData({roleId:id}).then(res=>{
        if(res.code===200){
            // this.$refs.menuTree.setCheckedNodes(res.data)
            // this.$refs.baseDataTree.setCheckedNodes(res.data)
          this.$nextTick(()=>{
            this.$refs.menuTree.setCheckedNodes(res.data)
          })
        }
      })
    },


// 获取数据树
    getAllDataTree(){
      console.log('bbb')
      getAllDataTree().then(res=>{
        if(res.code===200){
          this.dataPermission=res.data.dataRuleShow
          // this.dataPermission=res.data.allBaseSysDataList
        }
      })
    },



  // 获取数据权限
    getDataAuth(id){
      getPermissionAuthData({roleId:id}).then(res=>{
        if(res.code===200){
            // this.$refs.menuTree.setCheckedNodes(res.data)
            // this.$refs.baseDataTree.setCheckedNodes(res.data)
          this.$nextTick(()=>{
            this.$refs.baseDataTree.setCheckedNodes(res.data)
          })
        }
      })
    },



     addModal(){
      this.dialogFormVisible=true
        this.dialogType='add'
       this.title='新增角色'
      Object.keys(this.groupForm).map(key => this.groupForm[key] = "")
    },
     editModal(row){
       this.dialogType='edit'
       this.title='编辑角色'
      const haveData=row.length>0
      const haveOne=row.length==1
      console.log({row})
      if(haveData&&haveOne){
        this.dialogFormVisible=true,
        Object.keys(this.groupForm).forEach(key=>{this.groupForm[key]=row[0][key]})
        this.groupForm={id:row[0].id,...this.groupForm}
      }else{
        this.$message({
            message: '请选择一条数据',
            type: 'warning'
          });
      }

    },
     addsetup(item) {
        const selectData = this.selectionRows
        const haveData = selectData.length > 0
        const isOneData = selectData.length == 1
        if (item.type === 'add'){
          this.addModal()
        }else if (item.type === 'edit') {
          this.editModal(selectData)
      }else if (item.type === 'delete') {
        let ids=[]
          selectData.forEach(e => {
            ids.push(e.id)
          });
            if (haveData) {
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              // this.$emit('delInfo', ids);
              this.delInfo(ids)
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          } else {
            this.$message({
              message: '请选择一条数据',
              type: 'warning'
            });
          }
        }else if(item.type ==='auth'){
          if(haveData&&isOneData){
            // 获取权限树
              this.getAuth(selectData[0].roleId)
            //获取数据权限的树
            this.getDataAuth(selectData[0].roleId)
              
             this.authVisible=true
          
          }else {
            this.$message({
              message: '请选择一条数据',
              type: 'warning'
            });
          }

        }else{

        }
      },
    addClick(){
      const params=this.groupForm
       console.log({params})
      if(this.dialogType=='add'){
        this.submitInfo(params)
      }else{
          this.editInfo(params)
      }
    },
     onTreeDataChange(list,from, to, where) {
      this.treeData.lists = list;
      console.log(from.name + '  拖拽到  ' + to.name + '的' +where)
      const params= {
        "position":where,
        "targetId":to.id,
        "id":from.id
        }
      updateSort(params).then(res=>{
         this.$message({
              type: 'info',
              message: res.message
         });
         this.getList()
      })
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
    handleNodeClick(data){
      this.form.dep=data.label
    },
  
    getList(){
      getList().then(response => {
         this.treeOptions= response.data
        this.treeData.lists = response.data
      })
    },
    submitInfo(params){
        console.log({params})
        submitInfo(params).then(res=>{
          if(res.code===200){
            // this.$refs.compTable.hideDialog()
            this.dialogFormVisible=false
            this.getList()
          }
        })
      },
    editInfo(params){
       editInfo(params).then(res=>{
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
    },
   delInfo(params){
      deleteInfo({idList:params}).then(res=>{
         if(res.code===200){
              this.dialogFormVisible=false
            this.getList()
             this.$message({
                message: res.msg,
                type: 'success'
            })
          }else{
              this.$message({
              message: res.msg,
              type: 'warning'
            })
          }
      })
    },

 onSearch(){
        const search=this.searchModel.formModel.name
        if(!search){
            this.getList()
            return
        }
        const result= rebuildData(search,this.treeData.lists)
        console.log('111',search,result)
        this.treeData.lists=result
    }

  }
};
</script>

<style lang="scss" scoped>
// /deep/ .el-dialog__body{
//   padding: 0  !important;
// }
/deep/ .drag-tree-table-header{
  height: inherit;
  line-height: inherit;
}
/deep/.tree-row{
  line-height: inherit;
}
/deep/.drag-tree-table{
  margin: 0;
}
/deep/ .el-tabs--border-card{
  border:0;
  box-shadow:0 0;
  margin: -30px -100px;
}
.tab-panes{
  height: 300px;
  overflow-y: scroll;
}
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
