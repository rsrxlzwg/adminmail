<template>
  <div class="notice-container">
    <el-form
      :inline="true"
      :model="formInline"
      class="form-inline"
    >
      <el-form-item>
        <el-button
          type="primary"
          @click="onAdd"
        >添加通知</el-button>
      </el-form-item>
      <div>
        <el-form-item label="集群">
          <el-select
            v-model="formInline.region"
            placeholder="项目 default"
          >
            <el-option
              label="81-test"
              value="81-test"
            />
            <el-option
              label="区域二"
              value="beijing"
            />
          </el-select>
        </el-form-item>
        <el-form-item label>
          <el-input
            v-model="formInline.input2"
            placeholder="请输入通知名称"
          >
            <el-button slot="append">搜索</el-button>
          </el-input>
        </el-form-item>
      </div>
    </el-form>
    <div class="table-templet">
      <div class="table-border">
        <el-table
          v-loading="listLoading"
          :data="tableData.slice((currentPage-1)*10,currentPage*10)"
          style="width: 100%"
          :header-cell-style="headerCellStyle"
        >
          <template slot="empty">暂无数据</template>

          <el-table-column
            label="状态"
            prop="status"
            align="center"
            width="100"
          >
            <template slot-scope="scope">
              <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="名称"
            prop="name"
            sortable
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                @click="handleName(scope.$index, scope.row)"
              >{{ scope.row.name }}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="通知类型"
            prop="type"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.type }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="描述"
            prop="desc"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.desc }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="用户组"
            prop="usergroup"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.address }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="创建时间"
            prop="date"
            sortable
            width="180"
          >
            <template slot-scope="scope">{{ scope.row.display_time }}</template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button>
              <el-button
                size="mini"
                type="text"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          background
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <el-dialog
      class="deepdialog"
      :title="title"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form">
        <el-form-item
          label="状态"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="form.status"
            placeholder="请选择活动区域"
          >
            <el-option
              label="published"
              value="published"
            />
            <el-option
              label="draft"
              value="draft"
            />
            <el-option
              label="deleted"
              value="deleted"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="名称"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.name"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="类型"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="form.type"
            placeholder="请选择活动区域"
          >
            <el-option
              label="success"
              value="success"
            />
            <el-option
              label="danger"
              value="danger"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="描述"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.desc"
            type="textarea"
            autocomplete="off"
          />
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
import tableData from '../tabledata'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[ status ]
    }
  },
  data() {
    return {
      formInline: {
        region: '81-test',
        input2: ''
      },
      list: null,
      listLoading: false,
      currentPage: 1,
      tableData: tableData,
      dialogFormVisible: false,
      form: {
        status: '',
        name: '',
        type: '',
        desc: ''
      },
      title: '',
      formLabelWidth: '120px'
    }
  },
  created() {
    // this.fetchData();
    console.log(tableData)
  },
  methods: {
    fetchData() {
      // this.listLoading = true;
      getAllList({})
        .then(res => {
          console.log(res)
        })
        .catch(rej => { })
    },
    onAdd() {
      // console.log("submit!");
      this.title = '新增'
      this.dialogFormVisible = true
    },
    headerCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: #f7f9fc;color:#303133'
      }
    },
    handleName(index, row) {
      // console.log(index, row);
      this.title = '编辑'
      this.dialogFormVisible = true
    },
    handleEdit(index, row) {
      // console.log(index, row);
      this.title = '编辑'
      this.dialogFormVisible = true
    },
    handleDelete(index, row) {
      // console.log(index, row);
      this.$confirm('将删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.tableData.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      console.log(`当前页: ${val}`)
    }
  }
}
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
.deepdialog {
  /deep/ .el-select {
    display: block;
  }
}
</style>
