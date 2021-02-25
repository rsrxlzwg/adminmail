<template>
  <!-- 集群  -->
  <div class="culster-container">
    <headersearch :searchModel=searchModel @onSearch="onSearch" :show="searchModel.show"></headersearch>
    <comp-table
      ref="compTable"
      :tableModel=tableModel
      :formModel=formModel
      :searchModel=searchModel
      @addInfo="addInfo"
      @submitHandle="submitInfo"
      @editHandle="editInfo"
       @sizeChange="sizeChange"
      @currentChange="currentChange"
      @delInfo="delInfo"
      @onSearch="onSearch"
       @editFun="editFun"
    ></comp-table>
    <el-dialog
      class="deepdialog"
      title="编辑"
      :visible.sync="visible"
      width="40%"
    >
      
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="testlint"
          size="mini"
        >测试链接</el-button>
        <el-button
          type="primary"
          @click="submitHandle"
          size="mini"
        >确 定</el-button>
        <el-button
          @click="visible = false"
          size="mini"
        >取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import compTable from '@/views/components/table'
import headersearch from '@/views/components/search'
import {getInfo,submitInfo,editInfo,deleteInfo,editFun} from '@/api/jms/mqConfig'


export default {
  name: "Culster",
  components: {
    compTable,
    headersearch
  },
   filters:{
     filterType(mqType){
      const statusMap = {
        '1': 'Kafka',
        '2': 'RocketMq',
      }
      return statusMap[mqType]
    },
  },
  data() {
    return {
      visible: false,
      tableModel: {
        tableData: [],
        rowData: [

          {
            prop: 'mqName',
            label: '名称'
          },
          {
            prop: 'mqType',
            label: '类型',
            render:(h,params)=>{
                return h("span", {
                  style: {
                    display: "inline-block",
                  },
              },this.$options.filters.filterType(params.row.mqType) );
            }
          },
           {
            prop: 'description',
            label: '备注'
          }

        ],
        operateData: [],
        pagination: {
          currentPage: 1,
          pagesize: 10,
          total: 2
        }
      },
      formModel: {
        formData: {
          id:'',
          mqName: '',
          mqType: '',
          configIps: [
            {
              mqAddress: '',
              mqPort: '',
              id:''
            }
          ],
          description: ''
        },
        formLabelWidth: '100px',
        formFilds: [
          {
            label: '名称',
            prop: 'mqName',
            type: 'input',
            disabled: false,
          },
          {
            label: '类型',
            prop: 'mqType',
            type: 'select',
            disabled: false,
            options: [
              {
                label: 'Kafka',
                value: '1'
              },
              {
                label: 'RocketMq',
                value: '2'
              }
            ]
          },
          {
            label: '地址',
            prop: 'configIps',
            type: 'other',
            disabled: false,
             tabelData: [
              {
                primaryValue: '',
                presentValue: '',
                default: ''
              }
            ],
            tabelFild: [
              {
                label: 'IP地址',
                prop: 'mqAddress',
                type: 'input'
              },
              {
                label: '端口',
                prop: 'mqPort',
                type: 'input'
              }
            ]
            // btnName: '测试链接',
            // onClick: () => {

            // }
          },
          {
            prop: 'description',
            label: '备注',
            type: 'textarea',
            disabled: false,
          }
        ],
        btnData: [
          {
            type: 'submit',
            style: 'primary',
            label: '确定',
            handle: () => { }
          },
          {
            type: 'cancle',
            label: '取消',
            style: '',
            handle: () => { }
          }

        ],
      },
      
      searchModel: {
        btnGroup: [
          {
            type: 'add',
            style: 'primary',
            label: '新增',
          },
          {
            label: '编辑',
            type: 'editFun',
            funName: 'editFun'
          },
          {
            label: '删除',
            type: 'delete',
          },

        ],

        formModel:{
          mqName:'',
          mqType:'',
        },

        searchFild: [
          {
            type: 'input',
            label: '名称',
            prop: 'mqName'
          },
          {
            type: 'select',
            label: '类型',
            prop: 'mqType',
            options: [
              {
                label: 'Kafka',
                value: '1'
              },
              {
                label: 'RocketMq',
                value: '2'
              },
            ]
          },
        ]
      },
      addVisible: false,
      // fileData: {
      //     mqName: '',
      //     mqType: '',
      //     mqAddress: '',
      //     description:''
      // },

    };

  },
  mounted() {
    this.getList()
  },
  methods: {
  editFun(row) {
    if(row.length!==1){
      this.$message({
            message: '请选择一条数据',
            type: 'warning'
          });
    }else{
    this.$refs.compTable.dialogType = 'edit'
      editFun(row[0].id).then(res => {
        if (res.code === 200) {
          this.$refs.compTable.dialogFormVisible=true
          Object.keys(this.formModel.formData).forEach(key => { this.formModel.formData[ key ] =  res.data[ key ] })
        }
      })
    }
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
      this.tableModel.pagination.currentPage=1
      this.tableModel.pagination.pagesize=10
      this.getList()
    },
    submitHandle(){
      const params=this.fileData
      this.submitInfo(params)
    },
     submitInfo(params){
        console.log({params})
        submitInfo(params).then(res=>{
           if(res.code===200){
              this.$message({
                type: 'success',
                message:'添加成功'
            });
            this.$refs.compTable.hideDialog()
            this.getList()
           }
        })
      },
       editInfo(params){
       editInfo(params).then(res=>{
          if(res.code===200){
             this.$message({
                type: 'success',
                message:'修改成功'
            });
            this.$refs.compTable.hideDialog()
            this.getList()
          }
      })
    },
      
      delInfo(params){
       deleteInfo({ids:params}).then(res=>{
          if(res.code===200){
             this.$message({
                type: 'success',
                message:'删除成功'
            });
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
