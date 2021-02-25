<template>
  <!-- 命名空间 -->
  <div class="name-container">
      <div class="flex-inline-between">
        <el-button type="primary" size="medium" @click="onAdd">添加命名空间</el-button>
            <!-- 查询部分 -->
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="集群">
                <el-select v-model="formInline.status" placeholder="集群">
                  <el-option label="项目default" value="项目default" />
                  <el-option label="xxx" value="xxx" />
                </el-select>
              </el-form-item>
              <el-form-item class="mr0">
                <el-input v-model="formInline.user" placeholder="请输入命名空间" />
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
      <el-table-column label="命名空间" sortable>
        <template slot-scope="scope">
          <span style="color:#409EFF">{{ scope.row.nameSpace }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="项目名称" />
      <el-table-column prop="des" label="描述" />
      <el-table-column prop="time" sortable label="创建时间" />
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
    <div class="block">
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
          <el-form-item label="命名空间" :label-width="formLabelWidth">
            <el-input v-model="form.nameSpace" autocomplete="off"></el-input>
          </el-form-item> 
          <el-form-item label="项目名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>     
          <el-form-item label="项目描述" :label-width="formLabelWidth">
            <el-input type="textarea" v-model="form.des" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "NameSpace",
  filters: {
    statusFilter(status) {
      const statusMap = {
        Active: "success",
        Cordoned: "warning",
        xxx1: "gray",
        xxx2: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      title: "",
      form: { 
        nameSpace:'',     
        name: "",
        des: ""
      },
      formLabelWidth: "120px",
      formInline: {
        user: ""
      },
      formInline: {
        status: "项目default",
        region: ""
      },
      tableData: [
        {
          status: "Active",
          nameSpace: "nifjdn",
          name: "default",
          des: "",
          time: "2020-02-07 15:40:25"
        },
        {
          status: "Active",
          nameSpace: "nifjdnq",
          name: "default",
          des: "",
          time: "2020-02-07 15:40:25"
        },
        {
          status: "Active",
          nameSpace: "nifjdns",
          name: "default",
          des: "",
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
      // this.$router.replace("/infrastructure/modify");
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';
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
</style>

