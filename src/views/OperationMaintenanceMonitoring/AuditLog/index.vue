<template>
  <div class="notice-container">
    <el-form :inline="true" :model="formInline" class="form-inline">
      <el-form-item>
        <el-date-picker
          v-model="value1"
          prefix-icon="el-icon-date"
          type="datetimerange"
          range-separator="-"
          start-placeholder="请选择开始时间"
          end-placeholder="请选择结束时间"
        ></el-date-picker>
      </el-form-item>
      <div>
        <el-form-item>
          <el-input placeholder="请输入功能模块/操作类型" v-model="formInline.input2">
            <el-button slot="append">搜索</el-button>
          </el-input>
        </el-form-item>
      </div>
    </el-form>
    <div class="table-templet">
      <div class="table-border">
        <el-table
          :data="tableData"
          style="width: 100%"
          :header-cell-style="headerCellStyle"
          :default-sort="{prop: 'date', order: 'descending'}"
        >
          <template slot="empty">暂无数据</template>

          <el-table-column label="功能模块" prop="model" align="center" sortable>
            <template slot-scope="scope">
              <span>{{ scope.row.model }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作类型" prop="type" sortable>
            <template slot-scope="scope">
              <span >{{ scope.row.type }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作内容" prop="content">
            <template slot-scope="scope">
              <span>{{ scope.row.content }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作结果" prop="result">
            <template slot-scope="scope">
              <span>{{ scope.row.result }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="结果详情" prop="detail">
            <template slot-scope="scope">
              <span>{{ scope.row.detail }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="IP地址" prop="ip">
            <template slot-scope="scope">
              <span>{{ scope.row.ip }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="账号" prop="count" sortable>
            <template slot-scope="scope">
              <span>{{ scope.row.count }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="时间" prop="date" sortable>
            <template slot-scope="scope">{{ scope.row.date }}</template>
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        region: "81-test",
        input2: ""
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      tableData: [
        {
          model:'通知模块',
          type:'更新通知',
          content:'{cluster:"111"}',
          result:'成功',
          detail:'更新通知成功',
          ip:'172.168.1.1',
          count:'admin',
          date:'2020-5-17'
        }
      ],
      currentPage: 1
    };
  },
  methods: {
    headerCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: #f7f9fc;color:#303133";
      }
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