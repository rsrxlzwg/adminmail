<template>
  <div class="culster-container">
    <headersearch :searchModel=searchModel @onSearch="onSearch" :show="searchModel.show"></headersearch>
     <comp-table
      ref="compTable"
      :tableModel=tableModel
       :formModel=formModel
       :searchModel=searchModel
       @submitHandle="submitInfo"
       @editHandle="editInfo"
       @delInfo="delInfo"
       @sizeChange="sizeChange"
       @currentChange="currentChange"
       ></comp-table>
  </div>
</template>

<script>
import compTable from '@/views/components/table'
import headersearch from '@/views/components/search'
import {getInfo,submitInfo,editInfo,deleteInfo} from '@/api/commonComponents/protocolType'
export default {
  name: "Culster",
  components:{
    compTable,
    headersearch
  },
  filters:{
     filterType(type){
      const statusMap = {
        '1': '消费端',
        '2': '服务端',
      }
      return statusMap[type]
    },
  },
  data() {
    return {
      tableModel:{
        tableData: [
        ],
        rowData:[
          {
            prop:'typeName',
            label:'类型名称'
          },
           {
            prop:'protocolCategory',
            label:'协议类别',
            render:(h,params)=>{
                return h("span", {
                  style: {
                    display: "inline-block",
                  },
              },
             this.$options.filters.filterType(params.row.protocolCategory) );
            }

          },
          {
            prop: 'protocolConfig',
            label: '协议配置类'
          },
          {
            prop: 'protocolImpl',
            label: '协议实现类'
          },
           {
            prop:'description',
            label:'类型描述'
          },
        ],
        operateData:[],
        pagination:{
          currentPage:1,
          pagesize:10,
          total:3
        }
      },
      formModel:{
        // dialogWidth:'50%',
        formData:{
            id:'',
            models:'',
            typeName:'',
            protocolType:'',
            protocolCategory:'',
            protocolConfig:'',
            protocolImpl:'',
            description:'',
        },
        formLabelWidth: '85px',
        formFilds:[
           {
            label:'协议类型',
            prop:'protocolType',
            type:'select',
            disabled:false,
            options:[
              {
                label:'HTTP',
                value:'1'
              },
              {
                label:'TCP/IP',
                value:'2'
              }
            ]
          }  ,
          {
            label:'类型名称',
            prop:'typeName',
            type:'input',
            disabled:false,
          } ,
          {
            label:'协议类别',
            prop:'protocolCategory',
            type:'select',
            disabled:false,
            options:[
              {
                label:'消费端',
                value:'1'
              },
              {
                label:'服务端',
                value:'2'
              }
            ]
          }  ,
          {
            label:'协议配置类',
            prop:'protocolConfig',
            type:'input',
            disabled:false,
          } ,
          {
            label:'协议实现类',
            prop:'protocolImpl',
            type:'input',
            disabled:false, 
          } ,
           {
            label:'类型描述',
            prop:'description',
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
      },
      searchModel:{
        btnGroup:[
          {
            type:'add',
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
            label:'查看关联',
             type:'issue',
             funName:'issueFun',
            icon:'el-icon-sort-down',
          },
        ],
        formModel:{
          typeName: '',
          protocolType:''
        },
        searchFild:[
           {
           type:'input',
           label:'类型名称',
           prop:'typeName'
         },
          {
           type:'select',
           label:'协议类别',
           prop:'protocolCategory',
           options:[
            {
              label:'消费端',
              value:'1'
             },
             {
               label:'服务端',
               value:'2'
             }
           ]
         },
        ]
      }
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
