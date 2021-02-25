<template>
  <!-- 平台 -用户 -->
  <div>
    <comp-table 
      ref="compTable"
      :tableModel=tableModel 
       :formModel=formModel 
       :searchModel=searchModel 
       ></comp-table> 
 
  <div class="platform-users" v-show="false">
    <div class="flex-inline-between">
      <el-button type="primary" size="medium" @click="onAdd">添加用户</el-button>
        <!-- 查询部分 -->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item class="mr0">
            <el-input v-model="formInline.user" placeholder="请输入用户名称" />
          </el-form-item>
          <el-form-item>
            <el-button inline="true" type="info" plain @click="onSubmit">搜索</el-button>
          </el-form-item>
        </el-form>
    </div>
  
    <!-- 表格 -->
    <el-table
      :data="tableData"
      style="width: 99%"
      stripe
      :cell-style="rowClass"
      :header-cell-style="headClass"
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <!-- <el-table-column prop="date" label="状态" /> -->
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="用户名" sortable>
        <template slot-scope="scope">
          <span style="color:#409EFF">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="别名" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.nickName }}</span>
          <!-- <el-tag :type="scope.row.level | levelFilter"></el-tag> -->
        </template>
      </el-table-column>
      <el-table-column prop="role" label="角色" />
      <el-table-column prop="phone" label="手机号" />
       <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="describe" label="用户描述" />
      <el-table-column prop="time" label="创建时间" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="handleEdit(scope.$index, scope.row)"
            type="text"
            size="small"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="right m-t-20">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="3"
      ></el-pagination>
    </div>
     <el-dialog class="deepdialog" :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>

        </el-form-item>
        <el-form-item label="别名" :label-width="formLabelWidth">
          <el-input v-model="form.nickName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.desc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
  </div>
</template>

<script>
import compTable from '../../components/table'

export default {
  name: "Culster",
   components:{
    compTable
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        Active: "success",
        Cordoned: "warning",
        xxx1: "gray",
        xxx2: "danger"
      };
      return statusMap[status];
    },
    levelFilter(level) {
      const levelMap = {
        私有: "info",
        公开: ""
      };
      return levelMap[level];
    }
  },
  data() {
    return {

tableModel:{
        tableData: [
          {
            userName:'admin',
            email:'you@163.com',
            ladp:'否'
          }
        ],
        rowData:[
          {
            prop: 'userName',
            label: '用户名称'
          },
          {
            prop: 'email',
            label: '邮箱'
          },
          {
            prop:'ladp',
            label:'LADP用户'
          }
        ],
        operateData:[
          {
            label:'编辑',
            type:'edit',
            url:''
          },
           {
            label:'删除',
            type:'delete',
            url:''
          }
        ],
        pagination:[]
      },
      formModel:{
        formData:{
          userName: '',
          email:'',
          manage:'',
          password:'',
          checkPassword:''
        },
        formLabelWidth: '80px',
        formFilds:[
          {
            label:'用户名称',
            prop:'userName',
            type:'input',
            disabled:false,
          }, 
           {
            label:'邮箱',
            prop:'email',
            type:'input',
            disabled:false,
          }, 
           {
            label:'设置管理员',
            prop:'manage',
            type:'radio',
            disabled:false,
            options:[
              {
                label:'是',
                value:'1'
              },
              {
                label:'否',
                value:'2'
              },
            ]
          }, 
           {
            label:'密码',
            prop:'password',
            type:'password',
            disabled:false,
          },
           {
            label:'确认密码',
            prop:'checkPassword',
            type:'password',
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
            label:'新增用户',
            url:''
          }
        ],
        formModel:{
          cluster: '81-test',
          region: '',
        },
        searchFild:[]
      },


      dialogFormVisible: false,
      title: "",
      form: {      
        name: "",
        nickName:'',
        phone: "",
        email:'',
        desc: ""
      },
      formLabelWidth: "120px",
      formInline: {
        user: ""
      },
      tableData: [
        {
          status: "Active",
          name: "01-test-nn",
          nickName:'susu',
          role: "超级管理员",
          phone: "13267896375",
          email: "diedh@163.com",
          describe:'',
          time: "2020-02-07 15:40:25"
        },
        {
          status: "Active",
          name: "cluster205",
          nickName:'csc',
          role: "项目管理员",
          phone: "13267896375",
           email: "sasdc@163.com",
           describe:'',
          time: "2020-02-07 15:40:25"
        },
        {
          status: "Active",
          name: "81-text",
          nickName:'bfgd',
          role: "微服务发布员",
          phone: "13267896375",
           email: "fhdf@163.com",
           describe:'',
          time: "2020-02-07 15:40:25"
        }
      ]
    };
  },
  methods: {
     onAdd() {
      // console.log("submit!");
      this.title = "新增";
      this.dialogFormVisible = true;
      for(var i in this.form){
        this.form[i]=''
      }
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.title = "编辑";
      this.dialogFormVisible = true;
      this.form=row
    },
    headClass() {
      return "text-align: center;background:#eef1f6;";
    },
    rowClass() {
      return "text-align: center;";
    },
    onSubmit() {
      console.log("submit!");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    format1(percentage) {
      // return percentage === 100 ? "满" : `${percentage}%`;
      return "";
    },
    format2(percentage) {
      // return percentage === 100 ? "满" : `${percentage}%`;
      return ``;
    },
    // 编辑表格跳转
    editRow() {
      //   this.$router.replace("/infrastructure/modify");
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../../styles/common.scss';

</style>

