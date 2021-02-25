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
      @editModal="editModal"
       @addModal="addModal"
       @delInfo="delInfo"
       ></comp-table>  -->
      <headersearch  :searchModel=searchModel @onSearch="onSearch" ></headersearch>
      <el-card>
         <el-button
         style="margin-bottom:20px"
        type=""
        @click="addsetup(btn)"
        v-for="btn in searchModel.btnGroup"
        :icon="choseIcon(btn)"
        size="small"
      >{{btn.label}}</el-button>
          <!-- <complex-grid
            ref="treeGrid1"
            :fields="tableModel.rowData"
            :data.sync="tableModel.tableData"
            :checkable="true"
            :isTree="true"
            style="height: 300px"
            @dragEnd="dragend"
            @checkboxClick="checkboxClick"
            @checkAllClick="checkAllClick"
            :isDrag="true">
        </complex-grid> -->
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
          label='上级机构' >
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
          label='机构名称' >
          <el-input
                v-model="groupForm.name"
                size="mini"
                placeholder= "请输入"/>
        </el-form-item>
         <el-form-item
          prop="teamName"
          label='机构简称' >
          <el-input
                v-model="groupForm.simpleName"
                size="mini"
                placeholder= "请输入"/>
        </el-form-item>
         <el-form-item
          prop="teamName"
          label='机构类型' >
          <el-select  v-model="groupForm.orgType" size="mini" >
              <el-option label="公司" value="0"  />
              <el-option label="部门" value="1"  />
              <el-option label="项目" value="2"  />
              <el-option label="其他" value="3"  />
          </el-select>
        </el-form-item>
          <el-form-item
          prop="teamName"
          label='机构描述' >
          <el-input
                v-model="groupForm.orgDesc"
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
              @click="cancelClick()"
              type=""
              size="mini">取消</el-button>
            </div>
    </el-dialog>
  </div>
</template>

<script>
import compTable from '../../components/table'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import {getList,submitInfo,editInfo,deleteInfo,updateSort} from '@/api/sysManagement/organization'
import headersearch from '@/views/components/search'
let treeOptions=[]
import dragTreeTable from "drag-tree-table";


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
    Treeselect,
    headersearch,
    dragTreeTable
  },
  // filters: {
  //   filterType(type){
  //     let typeLable=''
  //     if(type==0){
  //         typeLable='公司'
  //     }else if(type==1){
  //       typeLable='部门'
  //     }else if(type==2){
  //       typeLable='项目'
  //     }else{
  //       typeLable='其它'
  //     }
  //     return typeLable
  //   }
  //  },
  data() {
    return {
      selectionRows:[],
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
            title: '名称',
            field: 'name',
            width: 200,
            align: 'center',
          },
          {
            type: 'default',
            title: '简称',
            field: 'simpleName',
            width: 200,
            align: 'center',
          },
          {
            type: 'default',
            title: '机构类型',
            field: 'orgType',
            width: 200,
            align: 'center',
            formatter: (item) => {
              console.log({item})
              let typeLable=''
              const type=item.orgType
              if(type==0){
                  typeLable='公司'
              }else if(type==1){
                typeLable='部门'
              }else if(type==2){
                typeLable='项目'
              }else if(type==3){
                typeLable='其它'
              }
              return '<a>'+typeLable+'</a>'
            }
          },
           {
            type: 'default',
            title: '机构编码',
            field: 'orgCode',
            width: 200,
            align: 'center',
          },
            {
            type: 'default',
            title: '描述',
            field: 'orgDesc',
            width: 200,
            align: 'center',
          },
          ],
      custom_field: {
          lists: 'children',
      }
      },
      restaurants:[],
      state1:'',
      title:'新增机构',
      dialogType:'add',
      dialogFormVisible:false,
      searchTableData:[
        {
        userName:'admin',
        email:'yo@163.com',
        ldap:'s',
        manage:'admin'
        }
      ],
        // define options
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
      groupForm:{
        parentId:null,
        name:'',
        simpleName:'',
        orgType:'',
        orgLevel:1,
        orgDesc:''
      },
      normalizer(node) {
        return {
          id: node.id,
          label: node.name,
          children: node.children,
        }
      },
       tableModel:{
        tableData: [
           {
            id:1,
            name:'team',
            num:'10001',
            type:'总公司',
            desc:'',
            children: [{
              id: 11,
              name:'team',
              num:'10002',
              type:'财务部',
              desc:'',
              },{
                 id: 12,
                name:'team',
                num:'10003',
                type:'行政部',
                desc:'',
            }
            ]
          }
        ],
        rowData:[
           {
            id: 'name',
            title: '机构名称'
          },
          {
            id: 'simpleName',
            title: '机构简称'
          },
          {
            id: 'orgType',
            title: '机构类型',
            render:(h,params)=>{
                return h("span", {
                  style: {
                    display: "inline-block",
                  },
              },this.$options.filters.filterType(params.row.orgType));
            }
          },
           {
            id: 'orgCode',
            title: '机构编码'
          },
          {
            id: 'orgDesc',
            title: '描述'
          },
        ],
        operateData:[],
         pagination:{
          // currentPage:1,
          // pagesize:10,
          // total:3
        },
        defaultExpand:true
      },
      formModel:{
        formData:{
            parentId:'',
            name:'',
            simpleName:'',
            orgType:'',
            orgLevel:1,
            orgSort:1,
            orgDesc:''
        },
        formLabelWidth: '80px',
        formFilds:[
          {
            label:'上级机构',
            prop:'parentId',
            type:'selectTree',
            disabled:false,
            multiple:false,
            options:[],
            normalizer:[]

          },
          {
            label:'机构名称',
            prop:'name',
            type:'input',
            disabled:false,
          },
          {
            label:'机构简称',
            prop:'simpleName',
            type:'input',
            disabled:false,
          },
          {
            label:'机构类型',
            prop:'orgType',
            type:'select',
            disabled:false,
            options:[
              {
                label:'公司',
                value:1
              },
              {
                label:'部门',
                value:2
              },
            ]
          },
           {
            label:'机构类别',
            prop:'orgLevel',
            type:'select',
            disabled:false,
            options:[
              {
                label:'一级',
                value:1
              },
              {
                label:'二级',
                value:2
              },
               {
                label:'三级',
                value:3
              },
               {
                label:'四级',
                value:4
              },
            ]
          },
           {
            label:'机构排序',
            prop:'orgSort',
            type:'select',
            disabled:false,
            options:[
              {
                label:'1',
                value:1
              },
              {
                label:'2',
                value:2
              },
               {
                label:'3',
                value:3
              },
               {
                label:'4',
                value:4
              },
            ]
          },
           {
            label:'机构描述',
            prop:'orgDesc',
            type:'textarea',
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
          tenantName: [
            { required: true, message: '请输入名称', trigger: 'blur' },
          ],
        },
      },
      searchModel:{
        btnGroup:[
          {
            type:'add',
            style:'primary',
            label:'新增机构',
            url:'',
            funName:'addModal',
          },
           {
            type:'edit',
            style:'primary',
            label:'编辑',
            url:'',
            funName:'editModal',
          },
           {
            type:'delete',
            label:'删除',
          },
        ],
        formModel:{
          name:''
        },
        searchFild:[
          {
           type:'input',
           label:'机构名称',
           prop:'name',
            span:6,
         },
        //    {
        //    type:'select',
        //    label:'机构名称',
        //    prop:'serviceRequester',
        //     span:6,
        //     options:[
        //       {
        //         label:'用户登录',
        //         value:1
        //       },
        //        {
        //         label:'协议管理',
        //         value:2
        //       }
        //     ]
        //  },
        ]
      },
      treeOptions:[]
    };
  },
  mounted(){
    this.getList()
    // this.restaurants = this.loadAll();
  },
  methods: {
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
  checkboxClick(){},
  checkAllClick(){},
  // dragend (startval, endval, whereInsert) {
  //   console.log('from',startval.name+'移到了'+"to",endval.name +'的',whereInsert )
  //     let newData = this.$refs.treeGrid1.isQueryDrag(startval, endval, whereInsert)
  //     this.tableModel.tableData = [...newData]
  //   },
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
        }else{}
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
    cancelClick(){
      this.dialogFormVisible=false
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
    addModal(){
      this.dialogFormVisible=true
        this.dialogType='add'
       this.title='新增机构'
      Object.keys(this.groupForm).map(key => this.groupForm[key] = "")
    },
    editModal(row){
       this.dialogType='edit'
       this.title='编辑机构'
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
    getList(){
      getList({
          simpleName:'',
          orgIds:[],
        }).then(response => {
          this.formModel.formFilds.forEach(e=>{
            if(e.prop=='selectTree'){
              e=response.data
            }
          })
        this.treeOptions= response.data
        this.treeData.lists = response.data
        // this.tableModel.tableData=response.data
        console.log({treeOptions})
      })
    },
    submitInfo(params){
       submitInfo(params).then(res=>{
          if(res.code===200){
            // this.$refs.compTable.hideDialog()
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
/deep/ .sum-grid{
  border: 0;
}
/deep/ .sum-data-grid thead th{
    text-align: center;
    background: rgb(238, 241, 246);
    color: #202d40;
    // opacity: .5;
    font-size: 12px;
    border:0;
}
/deep/ .sum-data-grid tbody th:nth-child(1) td{

   border-top: 0;
}
/deep/ .sum-data-grid tbody td{
  font-size: 14px;
    color: rgb(32, 45, 64);
}
/deep/ .sum-data-grid  .tr-hover{
  background-color: #F5F7FA;
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
