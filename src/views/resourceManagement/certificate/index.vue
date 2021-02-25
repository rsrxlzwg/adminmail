<template>
  <div class="notice-container">
    <el-form :inline="true" :model="formInline" class="form-inline">
      <el-form-item>
        <el-button type="primary" @click="onAdd">添加证书</el-button>
      </el-form-item>
      <div>
        <el-form-item label="集群">
          <el-select v-model="formInline.region" placeholder="项目 default">
            <el-option label="81-test" value="81-test"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.status">
            <el-option label="全部" value="81-test"></el-option>
            <el-option label="成功" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label>
          <el-input placeholder="证书名称" v-model="formInline.input2">
            <el-button slot="append">搜索</el-button>
          </el-input>
        </el-form-item>
      </div>
    </el-form>
    <div class="table-templet">
      <h3>81-test-jhb-test</h3>
      <div class="table-border">
        <el-table
          :data="tableData"
          style="width: 100%"
          :header-cell-style="headerCellStyle"
          @selection-change="handleSelectionChange"
        >
          <template slot="empty">暂无数据</template>
          <el-table-column label="状态" prop="status" align="center" width="80">
            <template slot-scope="scope">
              <el-tag type="success">{{ scope.row.status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="名称" prop="name" sortable width="80">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                @click="handleName(scope.$index, scope.row)"
              >{{ scope.row.name }}</el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" label="描述" prop="desc">
            <template slot-scope="scope">
              <span>{{ scope.row.desc }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="过期时间" prop="time" width="180">
            <template slot-scope="scope">{{ scope.row.time }}</template>
          </el-table-column>
          <el-table-column align="center" label="创建时间" prop="end" width="180">
            <template slot-scope="scope">{{ scope.row.end }}</template>
          </el-table-column>
          <el-table-column label="操作" width="80" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                class="el-icon-more"
                @click="handleEdit(scope.$index, scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="0"
        ></el-pagination>
      </div>
       <el-dialog class="deepdialog" :title="title" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
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
export default {
  data() {
    return {
      dialogFormVisible: false,
      title: "",
      form: {      
        name: "",
        desc: ""
      },
      formLabelWidth: "120px",
      formInline: {
        region: "81-test",
        status: "全部",
        input2: ""
      },
      tableData: [
        {
          id:1,
          status: "Active",
          name: "mysqlaaa-test1",
          desc: "默认项目",
          time: "2020-02-07 15:40:25",
          end: "2020-02-07 15:40:25"
        },
        {
          id:2,
          status: "Active",
          name: "mysqlaaa-test2",
          desc: "默认项目",
          time: "2020-02-07 15:40:25",
          end:"2020-02-07 15:40:25"
        }
      ],
      currentPage: 1
    };
  },
  methods: {
    onAdd() {
      // console.log("submit!");
      this.title = "新增";
      this.dialogFormVisible=true
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    headerCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: #f7f9fc;color:#303133";
      }
    },
    handleName(index, row) {
      // console.log(index, row);
    },
   
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.notice-container {
  padding: 10px 15px;
}
.form-inline {
  display: flex;
  justify-content: space-between;
}
.table-border {
  border: 1px solid #e6e9f1;
}
.pagination {
  margin-top: 20px;
  float: right;
}
</style>