<template>
  <!-- 主机  -->
  <div class="host-container">
     <el-row class="row-bg">
      <el-col :span="18">
           <el-button
          type="primary"
          @click="tunnelVisible=true">修改网络模式</el-button>
           <el-button 
          type="primary"
          @click="bgpVisible=true">修改子网大小</el-button>
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
              <el-input placeholder="搜索" v-model="formInline.user">
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
      <el-table-column label="网络池" sortable>
          <template slot-scope="scope">
          <el-link type="primary"  @click="detailRow(scope.row)">
            {{ scope.row.pool }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="网络类型" />
      <el-table-column prop="subnet" label="子网" />
      <el-table-column prop="host" label=" 分配主机" />
      <el-table-column prop="totle" label=" 已使用/总数" />
     
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
    <el-dialog class="deepdialog" title="创建子网" :visible.sync="poolVisible" width="40%">
      <el-form :model="form" label-width="160px" label-position="left">
        <el-form-item label="名称" v-show="type==='add' ">
          <el-input v-model="form.name" />
         
        </el-form-item>
        <el-form-item label="IPV4子网" >
          <el-input v-model="form.subnet" />
          <span class="desc">输入的子网建议使用 24 位掩码子网，并且范围在：172.16.0.0/16 ~ 172.27.0.0/16 内，不可同集群内已使用子网重复。</span>
        </el-form-item>
        <el-form-item label="分配至命名空间" v-show="type==='add' ">
           <el-select  v-model="form.namespace" >
            <el-option :label="item.label" :value="item.value" :key="item.value" v-for="item in typeItem"></el-option>
          </el-select>
        </el-form-item>
      
      </el-form>      
      <div slot="footer" class="dialog-footer">
        <el-button @click="poolVisible = false">取 消</el-button>
        <el-button type="primary" @click="poolVisible = false">确 定</el-button>
      </div>
    </el-dialog>
     <el-dialog class="deepdialog" title="修改网络模式" :visible.sync="tunnelVisible" width="40%">
      <el-form :model="form" label-width="160px" label-position="left">
        <el-form-item label="网络模式"  size="small">
          <el-select v-model="tunnelForm.model">
            <el-option value="VXLAN" label="VXLAN"></el-option>
            <el-option value="UDP" label="UDP"></el-option>
          </el-select>
        </el-form-item>
      </el-form>      
      <div slot="footer" class="dialog-footer">
        <el-button @click="tunnelVisible = false">取 消</el-button>
        <el-button type="primary" @click="tunnelVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog class="deepdialog" title="修改子网大小" :visible.sync="bgpVisible" width="40%">
      <el-form :model="subnetForm" label-width="160px" label-position="left">
        <el-form-item label="子网长度" >
          <el-input size="small" v-model="subnetForm.widths" placeholder="24"></el-input>
        </el-form-item>
         <el-form-item label="最小IP段" >
          <el-input size="small" v-model="subnetForm.min" placeholder="10.0.1.0"></el-input>
        </el-form-item>
         <el-form-item label="最大IP段" >
          <el-input size="small" v-model="subnetForm.max" placeholder="10.0.20.0"></el-input>
        </el-form-item>
      </el-form>      
      <div slot="footer" class="dialog-footer">
        <el-button @click="bgpVisible = false">取 消</el-button>
        <el-button type="primary" @click="bgpVisible = false">确 定</el-button>
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
      tunnelVisible:false,
      bgpVisible:false,
      type:'add',
      typeItem:[
        {
          label:'dec-sys',
          value:'dec-sys'
        },
        {
          label:'kube',
          value:'kube'
        },
      ],
      form:{
        poolName:'',
        driverName:'',
        supplier:'',
        recycling:'',
        binding:''
      },
      formInline:{
        name:'',
        subnet:'',
        namespace:''
      },
      tunnelForm:{
        model:'VXLAN'
      },
      subnetForm:{
        widths:'',
        min:'',
        max:''
      },
      bgpVisibleForm:{
        model:'全互联模式（Node-to-Node Mesh)'
      },
      poolVisible:false,
      tableData: [
        {
          pool:'10.1.0.0/16',
          type:'IPV4',
          subnet:'10.1.1.0/24',
          host:'master',
          totle:'4/65535'
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
    editTunnel(){

    },
    editBGP(){

    },
    detailRow(row){
      this.$router.push('FlannelDetail')
    },
    editRow(row){
      this.type="edit"
      this.poolVisible=true,
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
       this.type="add"
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
/deep/ .el-radio{
  display: block;
  margin-bottom: 20px;
}
.desc{
  font-size: 14px;
color: #9ba3af;
}
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