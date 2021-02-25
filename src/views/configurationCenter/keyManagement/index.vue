<template>
  <!-- 集群  -->
  <div class="culster-container">
     <comp-table 
      ref="compTable"
      :tableModel=tableModel 
       :formModel=formModel 
       :searchModel=searchModel
        @addFile="addFile"
        @editTag="editTag"
        @editNote="editNote"
        @editConfig="editConfig"
        @editContent="editContent"
       ></comp-table> 
      <el-dialog class="deepdialog" title="修改标签" :visible.sync="tagVisible">
        <component is="TagEdit" :tagData='tagData'></component>
          <div slot="footer" class="dialog-footer">
          <el-button @click="tagVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="tagVisible = false" size="mini">确 定</el-button>
      </div>
      </el-dialog>
      <el-dialog class="deepdialog" title="修改注解" :visible.sync="noteVisible">
        <component is="TagEdit" :tagData='noteData'></component>
          <div slot="footer" class="dialog-footer">
          <el-button @click="noteVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="noteVisible = false" size="mini">确 定</el-button>
      </div>
      </el-dialog>
      <el-dialog class="deepdialog" title="高级配置" :visible.sync="configVisible">
        <component is="advanced" :entercode='entercode'></component>
          <div slot="footer" class="dialog-footer">
          <el-button @click="configVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="configVisible = false" size="mini">确 定</el-button>
      </div>
      </el-dialog>
      <el-dialog class="deepdialog" :title="title" :visible.sync="addVisible" >
         <el-form
         v-show="page==='add' "
          :model="fileData"
          label-position="left"
          ref="ruleForm"  
          label-width="120px" >
          <el-form-item 
            prop="teamName"
            label='名称' >
            <!-- 输入框 -->
            <el-input
              v-model="fileData.name"
              size="mini"
              placeholder= "请输入名称"/>
          </el-form-item>
          <el-form-item 
            prop="teamName"
            label='类型' >
            <!-- 输入框 -->
            <el-input
              v-model="fileData.type"
              size="mini"
              placeholder= "请输入类型"/>
            </el-form-item>
        </el-form>
         <el-button type="primary" size="mini" @click="addTable" style="float:right">添加</el-button>
          <el-table
            :data="fileData.content"
            style="width: 100%">
            <el-table-column
              prop="key"
              label="键">
              <template slot-scope="scope">
                <el-input type="text" v-model="scope.row.key" size="small" />
              </template>
            </el-table-column>
            <el-table-column
              label="模式">
              <template slot-scope="scope">
                <el-select v-model="scope.row.type"  size="small">
                  <el-option value="1" label="手动输入"></el-option>
                  <el-option value="2"  label="上传文件"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              label="值">
              <template slot-scope="scope"    >
                <el-input type="text" v-model="scope.row.value"  size="small"  v-if="scope.row.type==1 " />
                 <el-upload
                 v-if="scope.row.type==2 "
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="3"
                  :on-exceed="handleExceed"
                  :file-list="scope.row.fileList">
                  <el-button size="mini" type="primary">上传</el-button>
                  <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                </el-upload>
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
import TagEdit from '../../components/tagEdit'
import advanced from '../../components/advanced'

// import {getCluster,submitInfo,editInfo} from '../../api/base/cluster'
export default {
  name: "Culster",
  components:{
    compTable,
    TagEdit,
    advanced
  },
  data() {
    return {
      page:'add',
      title:'创建',
      addVisible:false,
      noteVisible:false,
      tagVisible:false,
      configVisible:false,
      fileData:{
          name:'',
          type:'',
          content:[
            {
              key:'',
              value:'',
              type:1,
              fileList:[]
            }
          ],
        
      },
      tagData:[
        {
          key:'beta.kubernetes.io/arch',
          value:'amd64'
        }
      ],
      noteData:[
        {
          key:'beta.kubernetes.io/arch',
          value:'amd64'
        }
      ],
      tableModel:{
        tableData: [
          {
            file:'app-2048-6d6dfbb6ff-z47l7',
            type:'helm.sh/release.v1',
            create:'10天前'
          }
        ],
        rowData:[
          {
            prop: 'file',
            label: '加密文件',
            render:(h,params)=>{
                return h("el-link", {
                  style: {
                    display: "inline-block",
                    color:'#409EFF'
                  },
                  on:{
                    click:()=>{
                      this.$router.push('keyDetail')
                    }
                  }
                },params.row.file);
              }
          },
          {
            prop: 'type',
            label: '类型'
          },
          {
            prop:'create',
            label:'创建时间'
          } 
        ],
        operateData:[
          // {
          //   label:'详情',
          //   type:'detail',
          //   url:'keyDetail'
          // },
          {
            label:'编辑内容',
            type:'editRow',
            url:'',
            funName:'editContent'
          },
          {
            label:'编辑标签',
            type:'editTag',
            url:'',
            funName:'editTag'
          },
          {
            label:'编辑注解',
            type:'editNotes',
            url:'',
            funName:'editNote'

          },
           {
            label:'高级配置',
            type:'config',
            url:'',
            funName:'editConfig'

          },
          {
            label:'删除',
            type:'delete',
            url:''
          },
          
        ],
        pagination:[]
      },
      formModel:{
        formData:{
          tenantName: ''
        },
        formLabelWidth: '80px',
        formFilds:[
               
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
            type:'addFile',
            style:'primary',
            label:'创建加密文件',
            url:'',
            funName:'addFile'
          }
        ],
        formModel:{
          cluster: '81-test',
          region: '',
        },
        searchFild:[]
      },
      entercode:`
        kind: Secret
        apiVersion: v1
        metadata:
          name: my-conf
          namespace: default
          selfLink: /api/v1/namespaces/default/secrets/my-conf
          uid: e2a23edf-2a9b-467e-a7b3-77f72f985662
          resourceVersion: '7150648'
          creationTimestamp: '2020-10-21T01:32:19Z'
        data:
          c: Y2Q=
        type: op
      `
      
    };
  },
  mounted(){
    // this.getList()
  },
  methods: {
    editContent(){
      this.addVisible=true
      this.page='edit'
      this.title='修改内容'
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    tableDel(i){
      this.fileData.content.splice(i,1)
    },
    addTable(){
      this.fileData.content.push({
        key:'',
        value:'',
        type:1,
        fileList:[]
      })
    },
    editConfig(){
      this.configVisible=true
    },
    editNote(){
      this.noteVisible=true
    },
    editTag(){
      this.tagVisible=true
    },
    addFile(){
      this.addVisible=true
       this.page='add'
      this.title='创建'
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

  .block {
    float: right;
    margin: 12px;
  }
}
</style>
