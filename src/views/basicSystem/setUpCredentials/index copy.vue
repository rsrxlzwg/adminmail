<template>
  <!-- 命名空间 -->
  <div class="name-container">
    <el-row class="row-bg">
      <el-col>
        <el-button
          type="primary"
          @click="addsetup"
        >添加</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      style="width: 99%"
      stripe
      :cell-style="rowClass"
      :header-cell-style="headClass"
      :default-sort="{prop: 'date', order: 'descending'}">
      <el-table-column label="凭证ID">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="名称"
        sortable
      >
        <template slot-scope="scope">
          <span style="color:#409EFF">{{ scope.row.nameSpace }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="用户名"
      />
      <el-table-column
        prop="des"
        label="类型"
      />
      <el-table-column
        prop="time"
        sortable
        label="创建时间"
      />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click.native.prevent="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        background
        :current-page="1"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="3"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog
      class="deepdialog"
      :title="title"
      :visible.sync="dialogFormVisible"
      width="30%"
    >
      <el-form
        :model="form"
        label-position="left"
        :label-width="formLabelWidth"
      >
        <el-form-item label="名称">
          <el-input
            v-model="form.nameSpace"
            size="mini"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="用户名">
          <el-input
            v-model="form.name"
            autocomplete="off"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="凭据">
          <el-radio
            v-model="radio"
            label="1"
          >密码</el-radio>
          <el-radio
            v-model="radio"
            label="2"
          >sshkey</el-radio>
        </el-form-item>
        <el-form-item
          label="密码"
          size="mini"
        >
          <el-input
            v-model="form.mim"
            autocomplete="off"
            type="password"
          >
            <i
              slot="suffix"
              class="el-icon-view "
              style="fontSize:18px;cursor:pointer"
            />
          </el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogFormVisible = false"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getList,editInfo} from '../../../api/base/setUpCredentials'
import compTable from '../../components/table'

export default {
  name: 'NameSpace',
  filters: {
    statusFilter(status) {
      const statusMap = {
        Active: 'success',
        Cordoned: 'warning',
        xxx1: 'gray',
        xxx2: 'danger'
      }
      return statusMap[ status ]
    }
  },
  components:{
    compTable
  },
  data() {
    return {
      radio: '1 ',
      dialogFormVisible: false,
      title: '',
      form: {
        nameSpace: '124213',
        name: '4123213',
        des: '1',
        mim: '123123'
      },
      formLabelWidth: '60px',
      formInline: {
        user: ''
      },

      tableData: []
    }
  },
  mounted(){
    this.getList()
  },
  methods: {
    getList(){
      getList().then(res=>{
        this.tableData=res
      })
    },
    addsetup() {
      this.dialogFormVisible = true
    },
    onAdd() {
      // console.log("submit!");
      this.title = '新增'
      this.dialogFormVisible = true
      for (var i in this.form) {
        this.form[ i ] = ''
      }
    },
    handleEdit(index, row) {
      console.log(index, row)
      this.title = '添加凭据'
      this.dialogFormVisible = true
      // this.form = row
    },
    headClass() {
      return 'text-align: center;background:#eef1f6;'
    },
    rowClass() {
      return 'text-align: center;'
    },
    onSubmit() {
      console.log('submit!')
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    format1(percentage) {
      // return percentage === 100 ? "满" : `${percentage}%`;
      return ''
    },
    format2(percentage) {
      // return percentage === 100 ? "满" : `${percentage}%`;
      return ``
    },
    // 编辑表格跳转
    editRow() {
      // this.$router.replace("/infrastructure/modify");
    }
  }
}
</script>

<style lang="scss" scoped>
// @import "../../styles/common.scss";
.name-container {
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
.row-bg {
  margin-bottom: 20px;
}
</style>

