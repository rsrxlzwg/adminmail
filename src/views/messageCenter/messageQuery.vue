<template>
  <!-- 集群  -->
  <div class="culster-container">
    <headersearch :searchModel=searchModel @onSearch="onSearch" :show="searchModel.show"></headersearch>
     <comp-table 
      ref="compTable"
      :tableModel=tableModel 
       :formModel=formModel 
       :searchModel=searchModel
       @onSearch="onSearch"
      
       ></comp-table> 
  </div>
</template>

<script>
import compTable from '@/views/components/table'
import headersearch from '@/views/components/search'
import {getInfo,getIdList} from '@/api/jms/mqInfo'
let mqlist=[]
export default {
  name: "Culster",
  components:{
    compTable,
    headersearch
  },
  data() {
    return {
      tableModel:{
        tableData: [],
        rowData:[
          {
            prop:'mqName',
            label:'消息中心'
          },
           {
            prop:'topic',
            label:'topic'
          },
          {
            prop: 'mqContent',
            label: '消息内容'
          },
           {
            prop: 'operTime',
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
      searchModel:{
        // labelWidth:'70px',
        btnGroup:[],
        formModel:{
          mqId: '',
          topic:'',
          dateList:[],
        },
        searchFild:[
          {
           type:'select',
           label:'消息中心',
           prop:'mqId',
            options:mqlist,
         },
         {
           type:'input',
           label:'topic',
           prop:'topic',
          span:5
         },
          {
           type:'time',
           label:'操作时间',
           prop:'dateList',
            span:9
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
  beforeCreate(){
    mqlist=[]
      getIdList().then( res =>
        {
          if(res.code===200){
            res.data.forEach(e => {
             mqlist.push({
                label:e.mqName,
                value:e.id
              })
            });
        }else{
           this.$message({
              type: 'error',
              message: res.message
          });
        }

      })
  },
  mounted(){
    this.getList()
  },
  methods: {
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
      this.searchModel.formModel.dateList=[]
      this.tableModel.pagination.currentPage=1
      this.tableModel.pagination.pagesize=10
      this.getList()
    }
    
  }
};
</script>

// <style lang="scss" scoped>
/deep/ .el-date-editor--datetimerange.el-input__inner{
  width: 350px !important;
}
/deep/.el-form-item__label{
  padding-right: 5px !important;
}
/deep/ .el-input--suffix{
  width: 90%;
}
/deep/ .el-form--inline .el-form-item{
  margin-right: 5px !important;
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
