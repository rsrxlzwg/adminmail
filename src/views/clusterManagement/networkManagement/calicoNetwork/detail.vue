<template>
  <!-- 主机  -->
  <div class="host-container">
    
    <!-- 表格 -->
    <el-table
      :data="tableData"
      style="width: 99%"
      stripe>
      <el-table-column prop="ipv4" label="ipv4" />
      <el-table-column prop="ipv6" label="ipv6" />
      <el-table-column prop="status" label="链接状态" />
      <el-table-column prop="container" label="链接容器组" />
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
  name: "host",
  data() {
    return {
      tableData: [
        {
          ipv4:'172.28.241.66/32',
          ipv6:'-',
          status:'已连接',
          container:'kube-agent-controller-7645dcc6cc-kmnbh',
        },
        {
          ipv4:'172.28.241.66/32',
          ipv6:'-',
          status:'已连接',
          container:'kube-agent-prometheus-5b94c979f-mkkvq',
        },
      ]
    };
  },
  methods: {
     handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
   
  }
};
</script>

<style lang="scss" scoped>

 .block {
    float: right;
    margin: 12px;
  }
</style>