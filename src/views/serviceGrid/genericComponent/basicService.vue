<template>

  <div class="culster-container">
    <headersearch :search-model="searchModel" :show="searchModel.show" @onSearch="onSearch" />
    <comp-table
      ref="compTable"
      :table-model="tableModel"
      :form-model="formModel"
      :search-model="searchModel"
      @submitHandle="submitInfo"
      @editHandle="editInfo"
      @delInfo="delInfo"
      @sizeChange="sizeChange"
      @currentChange="currentChange"
      @onSearch="onSearch"
    ></comp-table>
  </div>
</template>

<script>
import compTable from '../../components/table'
import headersearch from '@/views/components/search'
import { getInfo, submitInfo, editInfo, deleteInfo } from '@/api/commonComponents/basicService'


export default {
  name: "Culster",
  components:{
    compTable,
    headersearch,
  },
  data() {
    return {
      visible: false,
      tableModel:{
        tableData: [
        ],
        rowData:[
           {
            prop:'abstractName',
            label:'服务名称'
          },
          {
            prop: 'abstractHandle',
            label: '服务处理类'
          },
          {
            prop: 'description',
            label: '服务描述'
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
          id: '',
          abstractName:'',
          abstractHandle:'',
          description:''
        },
        formLabelWidth: '100px',
        formFilds:[
          {
            label:'服务名称',
            prop:'abstractName',
            type:'input',
            disabled:false,
          },
          {
            label:'服务处理类',
            prop:'abstractHandle',
            type:'input',
            disabled:false,
          },
          {
            label:'服务描述',
            prop:'description',
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
      },
      searchModel:{
        btnGroup:[
          {
            type:'add',
            style:'',
            label:'新增',
          },
           {
            label:'编辑',
            type:'edit',
          },
           {
            label:'删除',
            type:'delete',
          },
          {
            type:'issue',
            style:'',
            label:'查看关联',

          }
        ],
        formModel:{
          abstractName: '',
        },
        searchFild:[
          {
           type:'input',
           label:'服务名称',
           prop:'abstractName'
         },
        ]
      },
    };
  },

  mounted() {
    this.getList()
  },

  methods: {

    onSearch(){
      this.tableModel.pagination.currentPage=1
      this.tableModel.pagination.pagesize=10
      this.getList()
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

    submitInfo(params){
      console.log({params})
      submitInfo(params).then(res=>{
        if(res.code===200){
          this.$refs.compTable.hideDialog()
          this.getList()
        }
      })
    },

    editInfo(params){
      editInfo(params).then(res=>{
        if(res.code===200){
          this.$refs.compTable.hideDialog()
          this.getList()
        }
      })
    },

    delInfo(params){
      deleteInfo({ids:params}).then(res=>{
        if(res.code===200){
          this.$refs.compTable.hideDialog()
          this.getList()
        }
      })
    },

    sizeChange(val){
      this.tableModel.pagination.pagesize=val
      this.getList()
    },

    currentChange(val){
      this.tableModel.pagination.currentPage=val
      this.getList()
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
