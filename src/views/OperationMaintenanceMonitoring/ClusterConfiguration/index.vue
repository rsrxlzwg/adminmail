<template>
  <div class="cluster-container">
    <div class="table-templet">
      <div class="table-border">
        <el-table
          :data="tableData"
          style="width: 100%"
          :header-cell-style="headerCellStyle"
          :default-sort="{prop: 'date', order: 'descending'}"
        >
          <template slot="empty">暂无数据</template>

          <el-table-column label="集群名称" prop="name" align="center">
            <template slot-scope="scope">{{ scope.row.name }}</template>
          </el-table-column>
          <el-table-column align="center" label="prometheusHost" prop="prometheusHost">
            <template slot-scope="scope">{{ scope.row.prometheusHost }}</template>
          </el-table-column>
          <el-table-column align="center" label="tillerHostPort" prop="tillerHostPort">
            <template slot-scope="scope">
              <span>{{ scope.row.tillerHostPort }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="grafanaHost" prop="grafanaHost">
            <template slot-scope="scope">
              <span>{{ scope.row.grafanaHost }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="grafanaToken" prop="grafanaToken">
            <template slot-scope="scope">{{ scope.row.grafanaToken }}</template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          "name":'81-test',
          "prometheusHost":"http://192.168.1.111:3000/",
          "tillerHostPort":'192.168.1.111:3000',
          "grafanaHost":'192.168.1.111:3000/',
          "grafanaToken":"ddfsdf34tweaf2331wf"
        },
        {
          "name":'81-test',
          "prometheusHost":"http://192.168.1.111:3000/",
          "tillerHostPort":'192.168.1.111:3000',
          "grafanaHost":'192.168.1.111:3000/',
          "grafanaToken":"ddfsdf34tweaf2331wf"
        },
        {
          "name":'81-test',
          "prometheusHost":"http://192.168.1.111:3000/",
          "tillerHostPort":'192.168.1.111:3000',
          "grafanaHost":'192.168.1.111:3000/',
          "grafanaToken":"ddfsdf34tweaf2331wf"
        }
      ],
    };
  },
  methods: {
    headerCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: #f7f9fc;color:#303133";
      }
    },
    handleEdit(index, row) {
      // console.log(index, row);
      this.$router.push({path:"clusterConfigurationEdit"})
    }
  }
};
</script>

<style lang="scss" scoped>
.cluster-container {
  padding: 10px 15px;
}
.form-inline {
  display: flex;
  justify-content: space-between;
}
.table-border {
  border: 1px solid #e6e9f1;
}
</style>