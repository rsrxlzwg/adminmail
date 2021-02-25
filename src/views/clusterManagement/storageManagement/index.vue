<template>
  <!-- 主机  -->
  <div class="host-container">
     <el-row class="row-bg">
      <el-col :span="18">
        <el-button
          type="primary"
          @click="addPool()">创建存储池</el-button>
      </el-col>
      <el-col :span="6">
         <!-- 查询部分 -->
          <el-form :inline="true" :model="formInline">
            <!-- <el-form-item label="集群">
              <el-select v-model="formInline.cluster" placeholder="集群">
                <el-option label="81-test" value="81-test" />
                <el-option label="xxx" value="xxx" />
              </el-select>
            </el-form-item> -->
            <el-form-item label>
              <el-input placeholder="请输入存储池名称" v-model="formInline.user">
                <el-button slot="append" @click="onSubmit">搜索</el-button>
              </el-input>
            </el-form-item>
          </el-form>
      </el-col>
     </el-row>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      style="width: 99%"
       :cell-style="rowClass"
      :header-cell-style="headClass"
      :default-sort="{prop: 'date', order: 'descending'}"
      stripe>
      <!-- <el-table-column prop="date" label="状态" /> -->
     
      <el-table-column label="名称" sortable>
        <template slot-scope="scope">
          <el-link type="primary"  @click="detailRow(scope.row)">
            {{ scope.row.name }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="contain" label="存储卷容量" />
      <el-table-column prop="default" label="默认" />
      <el-table-column prop="apply" label="支持存储快照" />
      <el-table-column prop="supplier" label="供应者" />
      <el-table-column label="操作">
        <template slot-scope="scope">
            <!-- <el-button
            @click.native.prevent="detailRow(scope.row)"
            type="text"
            size="small">详情</el-button> -->
            <el-button
            @click.native.prevent="editRow(scope.row)"
            type="text"
            size="small">编辑</el-button>
            <el-button
            @click.native.prevent="delRow(scope.$index)"
            type="text"
            size="small">删除</el-button>
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
    <el-dialog class="deepdialog" title="驱动池" :visible.sync="poolVisible" width="40%">
      <el-form :model="form" label-width="80px">
        <el-form-item label="驱动类型" >
          <el-input v-model="form.type" />
          <!-- <el-select  v-model="form.type" size="mini" >
            <el-option :label="item.label" :value="item.value" :key="item.value" v-for="item in typeItem"></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="驱动名称" >
          <el-input v-model="form.driverName" />
        </el-form-item>
        <el-form-item label="供应商" >
          <el-input v-model="form.supplier" />
        </el-form-item>
        <el-form-item label="回收策略" >
          <el-radio-group v-model="form.recycling">
            <el-radio label="删除"></el-radio>
            <el-radio label="循环使用"></el-radio>
            <el-radio label="保留"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="绑定模式" >
          <el-radio-group v-model="form.binding">
            <el-radio label="立即绑定"></el-radio>
            <el-radio label="等待绑定"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>      
      <div slot="footer" class="dialog-footer">
        <el-button @click="poolVisible = false">取 消</el-button>
        <el-button type="primary" @click="poolVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  
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
      typeItem:[
        {
          label:'NFS',
          value:'NFS'
        }
      ],
      form:{
        poolName:'',
        driverName:'',
        supplier:'',
        recycling:'删除',
        binding:'立即绑定'
      },
      formInline:{
        user:''
      },
      poolVisible:false,
      tableData: [
        {
          name:'local',
          contain:'100',
          default:'是',
          apply:'否',
          supplier:'open',
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
    detailRow(row){
      this.$router.push('sourceDetail')
    },
    editRow(row){
      this.poolVisible=true
      row.recycling='删除'
      row.binding='立即绑定'
      this.form=row
    },
    delRow(i){
       this.$confirm('确定要删除该条数据吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(i,1)
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
    addPool(){
      this.poolVisible=true
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
  // form.el-form {
  //   float: right;
  // }
  .block {
    float: right;
    margin: 12px;
  }
}
</style>