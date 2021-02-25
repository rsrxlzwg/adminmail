<template>
  <!-- 集群  -->
  <div class="culster-container">
    <headersearch :searchModel=searchModel @onSearch="onSearch" :show="searchModel.show"></headersearch>
     <comp-table 
      ref="compTable"
      :tableModel=tableModel 
       :formModel=formModel 
       :searchModel=searchModel
       @submitHandle="submitInfo"
       @editHandle="editInfo"
       @issueFun="issueFun"
      @sizeChange="sizeChange"
      @currentChange="currentChange"
       ></comp-table>
  </div>
</template>

<script>

import compTable from '@/views/components/table'
import headersearch from '@/views/components/search'
import {getInfo} from '@/api/logManagement/logApproval'
export default {
  name: "Culster",
  components:{
    compTable,
    headersearch
  },
  data() {
    return {
      tableModel:{
        tableData: [
        ],
        rowData:[
           {
            prop:'operatorUserName',
            label:'用户'
          },
          {
            prop: 'menuName',
            label: '菜单'
          },
          {
            prop: 'buttonName',
            label: '按钮'
          },
           {
            prop: 'methonName',
            label: '方法'
          },
           {
            prop:'desc',
            label:'描述'
          },
          {
            prop: 'operateResult',
            label: '操作结果'
          },
           {
            prop:'operateIp',
            label:'访问IP'
          },
           {
            prop: 'createDate',
            label: '操作时间'
          },
          
        ],
        operateData:[],
        pagination:{
          currentPage:1,
          pagesize:10,
          total:2
        }
      },
      formModel:{
        formData:{
          menuName: '',
          methonName:'',
          buttonName:'',
          operateResult:'',
          createDate:''
        },
        formLabelWidth: '100px',
        formFilds:[ ],
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
        btnGroup:[],
        formModel:{
          menuName: '',
          methonName:'',
          buttonName:'',
          operateResult:'',
          createDate:''
        },
        searchFild:[
          {
           type:'input',
           label:'菜单',
           prop:'menuName'
         },
           {
           type:'input',
           label:'按钮',
           prop:'buttonName'
          },
          {
           type:'input',
           label:'方法',
           prop:'methonName'
          },
           {
           type:'input',
           label:'操作结果',
           prop:'operateResult'
          },
          {
           type:'time',
           label:'操作时间',
           prop:'operateTime',
            span:11
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
    issueFun(){
      this.$message.success('下发成功')
    },
    getList(){
      const params={
        "requestObject": {
          ...this.searchModel.formModel
        },
        "pageNo": this.tableModel.pagination.currentPage,
        "pageSize": this.tableModel.pagination.pagesize
      }
      getInfo(params).then(res => {
        if(res.code===200){
          this.tableModel.tableData = res.data.data
          this.tableModel.pagination.total=res.data.totalCount
        }else{
          this.$message({
            type: 'error',
            message: res.message
          });
        }

      })
    },
    onSearch(){
      this.getList()
    },
    sizeChange(val){
      this.tableModel.pagination.pagesize=val
      this.getList()
    },
    currentChange(val){
      this.tableModel.pagination.currentPage=val
      this.getList()
    }
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
