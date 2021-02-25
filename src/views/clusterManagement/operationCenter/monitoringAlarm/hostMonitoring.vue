<template>
  <!-- 主机  -->
  <div class="host-container">
    <!-- 表格 -->
    <el-table
      :data="tableData"
      style="width: 99%"
        :cell-style="rowClass"
      :header-cell-style="headClass"
      :default-sort="{prop: 'date', order: 'descending'}"
      stripe
    >
      <el-table-column label="节点" sortable>
        <template slot-scope="scope">
          <el-link type="primary"  @click="editRow(scope.row)">
            {{ scope.row.ip }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column label="CPU">
        <template slot-scope="scope">
          <template v-if="scope.row.cpu !== 'NaN' ">
            <el-progress :percentage="scope.row.cpu" :stroke-width="10" :format="format1" />
          </template>
          <span style="font-size:10px">{{ scope.row.cpu }}%</span>
        </template>
      </el-table-column>
       <el-table-column label="CPU平均负载">
        <template slot-scope="scope">
          <template v-if="scope.row.loadBalancing !== 'NaN' ">
            <el-progress :percentage="scope.row.loadBalancing" :stroke-width="10" :format="format2" />
          </template>
          <span style="font-size:10px">{{ scope.row.loadBalancing }}%</span>
        </template>
      </el-table-column>
      <el-table-column label="内存">
        <template slot-scope="scope">
          <template v-if="scope.row.store !== 'NaN' ">
            <el-progress :percentage="scope.row.store" :stroke-width="10" :format="format2" />
          </template>
          <span style="font-size:10px">{{ scope.row.store }}%</span>
        </template>
      </el-table-column>
      
      <el-table-column label="本地存储">
        <template slot-scope="scope">
          <template v-if="scope.row.storeLoacl !== 'NaN' ">
            <el-progress :percentage="scope.row.storeLoacl" :stroke-width="10" :format="format2" />
          </template>
          <span style="font-size:10px">{{ scope.row.storeLoacl }}%</span>
        </template>
      </el-table-column>
      <el-table-column label="inode使用率">
        <template slot-scope="scope">
          <template v-if="scope.row.inode !== 'NaN' ">
            <el-progress :percentage="scope.row.inode" :stroke-width="10" :format="format2" />
          </template>
          <span style="font-size:10px">{{ scope.row.inode }}%</span>
        </template>
      </el-table-column>
       <el-table-column label="容器组">
        <template slot-scope="scope">
          <template v-if="scope.row.containerGroup !== 'NaN' ">
            <el-progress :percentage="scope.row.containerGroup" :stroke-width="10" :format="format2" />
          </template>
          <span style="font-size:10px">{{ scope.row.containerGroup }}%</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作"> -->
        <!-- <template slot-scope="scope">
            <el-button
            @click.native.prevent="editRow(scope.$index, tableData)"
            type="text"
            size="small">详情</el-button>
        </template> -->
      <!-- </el-table-column> -->

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
        cluster: "81-test",
        region: ""
      },
      tableData: [
        {
              node:'node1',
              ip:'172.16.5.50',
              cpu:60,
              loadBalancing:10,
              store:15,
              storeLoacl:4,
              inode:10,
              containerGroup:40
         },
          {
              node:'node2',
              ip:'172.16.5.51',
              cpu:60,
              loadBalancing:10,
              store:15,
              storeLoacl:4,
              inode:10,
              containerGroup:40
         },
          {
              node:'node3',
              ip:'172.16.5.52',
              cpu:60,
              loadBalancing:10,
              store:15,
              storeLoacl:4,
              inode:10,
              containerGroup:40
         },
        
      ]
    };
  },
  methods: {
    headClass() {
      return 'text-align: center;background:#eef1f6;'
    },
    rowClass() {
      return 'text-align: center;'
    },
    addHost(){
      this.$router.push('/addHost')
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
      this.$router.push("nodeDetail");
    }
  }
};
</script>

<style lang="scss" scoped>

.host-container {
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