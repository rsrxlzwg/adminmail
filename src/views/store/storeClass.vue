<template>
  <!-- 存储类 -->
  <div class="store-container">
    <el-button type="primary" size="medium" @click="addStoreClass">添加存储类</el-button>
    <!-- 查询部分 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="集群">
        <el-select v-model="formInline.status" placeholder="集群">
          <el-option label="81-test" value="81-test" />
          <el-option label="xxx" value="xxx" />
        </el-select>
      </el-form-item>
      <el-form-item label>
        <el-input v-model="formInline.user" placeholder="请输入存储类名称">
          <el-button slot="append" @click="onSubmit">搜索</el-button>
        </el-input>
      </el-form-item>
    </el-form>
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
      <el-table-column label="名称" sortable>
        <template slot-scope="scope">
          <span style="color:#409EFF">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="plug" label="插件" />
      <el-table-column prop="default" label="默认" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="editRow(scope.$index, tableData)"
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
  </div>
</template>

<script>
export default {
  name: "StoreClass",
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
      formInline: {
        status: "81-test",
        region: ""
      },
      tableData: [
        {
          status: "Active",
          name: "1212",
          plug: "NFS Share",
          default: ""
        },
        {
          status: "Active",
          name: "cluster205",
          plug: "NFS Share",
          default: ""
        },
        {
          status: "Active",
          name: "81-text",
          plug: "NFS Share",
          default: ""
        }
      ]
    };
  },
  methods: {
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
      this.$router.replace("/store/storeEdit");
    },
    addStoreClass() {
      this.$router.replace("/store/storeAdd");
    }
  }
};
</script>

<style lang="scss" scoped>
.store-container {
  // &-container {
  // }
  .mr0 {
    margin-right: 0 !important;
  }
  form.el-form {
    float: right;
  }
  .block {
    float: right;
    margin: 12px;
  }
}
</style>

