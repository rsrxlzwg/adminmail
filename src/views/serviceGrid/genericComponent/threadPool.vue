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
import { getInfo, submitInfo, editInfo, deleteInfo } from '@/api/commonComponents/threadPool'


export default {
  name: "Culster",
  components:{
    compTable,
    headersearch
  },
  data() {
    return {
      visible:false,
      tableModel:{
        tableData: [
        ],
        rowData:[
          {
            prop:'name',
            label:'名称'
          },
          {
            prop:'description',
            label:'描述'
          },
          {
            prop: 'freeTime',
            label: '空闲时间'
          },
           {
            prop:'coreThread',
            label:'核心线程数'
          },
          {
            prop: 'maxThread',
            label: '最大线程数'
          },
          {
            prop:'queueDepth',
            label:'队列深度'
          },
          {
            prop: 'timeSize',
            label: '时间粒度'
          },
          {
            prop:'threadFactory',
            label:'线程工厂'
          },
          {
            prop: 'taskQueue',
            label: '任务队列'
          },
           {
            prop:'threadLevel',
            label:'优先级'
          },
          {
            prop: 'threadType',
            label: '线程池类型'
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
          id:'',
          name: '',
          freeTime: '',
          coreThread: '',
          maxThread: '',
          queueDepth: '',
          timeSize: '',
          threadFactory: '',
          taskQueue: '',
          threadLevel: '',
          threadType: '',
          description: '',
        },
        formLabelWidth: '90px',
        formFilds:[
          {
            label:'名称',
            prop :'name',
            type: 'input',
            disabled: false,
          },
          {
            label:'空闲时间',
            prop :'freeTime',
            type: 'input',
            disabled: false,
          },
          {
            label:'核心线程数',
            prop :'coreThread',
            type: 'number',
            disabled: false,
          },
          {
            label:'最大线程数',
            prop :'maxThread',
            type: 'number',
            disabled: false,
          },{
            label:'队列深度',
            prop :'queueDepth',
            type: 'number',
            disabled: false,
          },
          {
            label:'时间粒度',
            prop :'timeSize',
            type: 'number',
            disabled: false,
          },
          {
            label:'线程工厂',
            prop :'threadFactory',
            type: 'input',
            disabled: false,
          },
          {
            label:'任务队列',
            prop :'taskQueue',
            type: 'input',
            disabled: false,
          },
          {
            label:'优先级',
            prop :'threadLevel',
            type: 'number',
            disabled: false,
          },
          {
            label:'线程池类型',
            prop :'threadType',
            type: 'input',
            disabled: false,
          },
          {
            label:'描述',
            prop :'description',
            type: 'textarea',
            disabled: false,
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
            type: 'add',
            style: '',
            label: '新增'
          },
          {
            label: '编辑',
            style: '',
            type: 'edit'
          },
          {
            label: '删除',
            style: '',
            type: 'delete'
          },
          {
            type: 'issue',
            style: '',
            label: '查看关联'
          }
        ],
        formModel:{
          name: '',
        },
        searchFild:[
           {
           type:'input',
           label:'名称',
           prop:'name'
         },
        ]
      },
    };
  },

  mounted(){
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
