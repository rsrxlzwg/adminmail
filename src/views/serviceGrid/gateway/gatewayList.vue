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
       @addService="addService"
       ></comp-table> 
     <el-dialog class="deepdialog" title="添加" :visible.sync="addVisible" >
         <el-form
          :model="fileData"
          label-position="left"
          ref="ruleForm"  
          label-width="120px" >
          <el-form-item 
            prop="teamName"
            label='微服务名称' >
              <el-input
              v-model="fileData.virtulname"
              size="mini"
              placeholder= "请输入"/>
            </el-form-item>
             <el-form-item 
            prop="versions"
            label='显示名称' >
            <el-input
              v-model="fileData.name"
              size="mini"
              placeholder= "请输入"/>
          </el-form-item>
        </el-form>
         <el-button type="primary" size="mini" @click="addTable" style="float:right">添加</el-button>
          <el-table
            :data="fileData.content"
            style="width: 100%">
            <el-table-column
              label="工作负载">
              <template slot-scope="scope">
                <el-select v-model="scope.row.workload"  size="small">
                  <el-option :value="1" label="details-v1"></el-option>
                  <el-option :value="2"  label="ratings-v1"></el-option>
                  <el-option :value="3"  label="reviews-v1"></el-option>
                  <el-option :value="4"  label="productPage-v1"></el-option>
              </el-select>
              </template>
            </el-table-column>
            <el-table-column
              label="版本">
              <template slot-scope="scope">
                <el-input type="text" v-model="scope.row.versions" size="small" />
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="tableDel(scope.$index)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
            <div slot="footer" class="dialog-footer">
          <el-button @click="addVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="addVisible = false" size="mini">确 定</el-button>
      </div>
      </el-dialog>
  </div>
</template>

<script>
import compTable from '../../components/table'
// import {getCluster,submitInfo,editInfo} from '../../api/base/cluster'
export default {
  name: "Culster",
  components:{
    compTable
  },
  data() {
    return {
      tableModel:{
        tableData: [
          {
            name:'productpage',
            entrance:'',
            microservice:'',
            authorized:'-',
            time:'6天前'
          }
        ],
        rowData:[
         
          {
            prop: 'name',
            label: '名称',
            render:(h,params)=>{
              return h("el-link", {
                style: {
                  display: "inline-block",
                  color:'#409EFF'
                },
                on:{
                  click:()=>{
                    this.$router.push('virtulServiceDetail')
                  }
                }
              },params.row.name);
            }
          },
          {
            prop:'entrance',
            label:'网关入口'
          }, 
           {
            prop:'microservice',
            label:'微服务'
          },
          {
            prop: 'authorized',
            label: '创建人'
          },
          {
            prop: 'time',
            label: '创建时间'
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
        pagination:[]
      },
      formModel:{
        formData:{
          tenantName: ''
        },
        formLabelWidth: '80px',
        formFilds:[
          {
            label:'项目名称',
            prop:'tenantName',
            type:'input',
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
            type:'addService',
            style:'primary',
            label:'创建网关',
            funName:'addService'
          }
        ],
        formModel:{
          cluster: '81-test',
          region: '',
        },
        searchFild:[]
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
    // this.getList()
  },
  methods: {
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
