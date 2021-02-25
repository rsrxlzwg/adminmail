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
       @issueFun="issueFun"
       @issueSearch="issueSearch"
       ></comp-table> 
      <el-dialog class="deepdialog" title="下发" :visible.sync="visible" width="30%">
        <component is="issue" ></component>
        <div slot="footer" class="dialog-footer">
          <el-button @click="visible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="visible = false" size="mini">确 定</el-button>
        </div>
    </el-dialog>
    <el-dialog class="deepdialog" title="日志" :visible.sync="extirvisible" width="60%">
        <component is="extir" ></component>
        <div slot="footer" class="dialog-footer">
          <el-button @click="extirvisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="extirvisible = false" size="mini">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import compTable from '../../components/table'
import issue from './issue'
import extir from '@/components/commond'

// import {getCluster,submitInfo,editInfo} from '../../api/base/cluster'
export default {
  name: "Culster",
  components:{
    compTable,
    issue,
    extir
  },
  data() {
    return {
      extirvisible:false,
      tableModel:{
        tableData: [
          {
            sysName:'ECIF',
            terminal:'ECIF105',
            consumerSystem:'ABS',
            status:'新增',
            serviceCode:'2001030002',
            tokensNum:'100',
          }
        ],
        rowData:[
          {
            prop:'sysName',
            label:'所属系统简称'
          }, 
           {
            prop:'terminal',
            label:'终端'
          },
           {
            prop:'consumerSystem',
            label:'消费者系统简称'
          },
           {
            prop:'status',
            label:'状态'
          },
          {
            prop: 'serviceCode',
            label: '服务代码'
          },
          {
            prop: 'tokensNum',
            label: '令牌数'
          },
        ],
        operateData:[
          {
            label:'编辑',
            type:'edit',
          },
          {
            label:'下发',
            type:'issueFun',
            funName:'issueFun'
          },
          {
            label:'下发查询',
            type:'issueSearch',
            funName:'issueSearch'
          },
           {
            label:'删除',
            type:'delete',
          },
          
        ],
        pagination:[]
      },
      formModel:{
        formData:{
            sysName:'',
            terminal:'',
            consumerSystem:'',
            serviceCode:'',
            tokensNum:'',
        },
        formLabelWidth: '140px',
        formFilds:[
          {
            label:'所属系统简称',
            prop:'sysName',
            type:'select',
            disabled:false,
            options:[
              {
                label:'统一客户信息服务平台(ECIF)',
                value:'1'
              }
            ]
          },
          {
            label:'终端',
            prop:'terminal',
            type:'select',
            disabled:false,
            options:[
              {
                label:'容器终端',
                value:'1'
              },
              {
                label:'普通终端',
                value:'2'
              }
            ]
          },
          {
            label:'消费者系统简称',
            prop:'consumerSystem',
            type:'select',
            disabled:false,
            options:[
              {
                label:'综合前端（ABS）',
                value:'1'
              }
            ]
          },
          {
            label:'服务代码',
            prop:'serviceCode',
            type:'select',
            disabled:false,
             options:[
              {
                label:'200103000102',
                value:'1'
              }
            ]
          },
          {
            label:'令牌数',
            prop:'tokensNum',
            type:'number',
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
            type:'add',
            style:'primary',
            label:'新增',
          }
        ],
        formModel:{
           sysName:'',
            terminal:'',
            consumerSystem:'',
            serviceCode:'',
            tokensNum:'',
        },
        searchFild:[
          {
           type:'select',
           label:'所属系统',
           prop:'sysName',
           options:[
             {
               label:"ECIF",
               value:'ECIF'
             }
           ]
          },
           {
           type:'select',
           label:'终端',
           prop:'terminal',
            options:[
              {
                label:'容器终端',
                value:'1'
              },
              {
                label:'普通终端',
                value:'2'
              }
           ]
          },
          {
           type:'select',
           label:'消费者系统',
           prop:'consumerSystem',
            options:[
              {
                label:'综合前端（ABS）',
                value:'1'
              }
           ]
          },
           {
           type:'input',
           label:'服务代码',
           prop:'code'
         },
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
      visible:false

    };
  },
  mounted(){
    // this.getList()
  },
  methods: {
    issueSearch(){
      this.extirvisible=true
    },
    issueFun(){
      this.visible=true
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
