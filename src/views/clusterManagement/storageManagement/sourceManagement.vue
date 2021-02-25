<template>
  <!-- 主机  -->
  <div class="host-container">
     <el-row class="row-bg">
      <el-col :span="18">
        <el-button
          type="primary"
          @click="addPool()">创建存储源</el-button>
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
              <el-input placeholder="请输入存储源名称" v-model="formInline.user">
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
     
      <el-table-column label="存储源" sortable>
       
         <template slot-scope="scope">
          <el-link type="primary"  @click="detailRow(scope.row)">
            {{ scope.row.name }}
          </el-link>
        </template>
      </el-table-column>
     
      <el-table-column prop="container" label="容量" />
      <el-table-column prop="model" label="访问模式" />
      <el-table-column prop="status" label="状态" />
      <el-table-column prop="binder" label="绑定者" />
      <el-table-column prop="time" label="创建时间" />
      <el-table-column label="操作">
        <template slot-scope="scope">
         
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
    <el-dialog class="deepdialog" title="驱动池" :visible.sync="poolVisible" width="40%" >
      <el-form :model="form" label-width="140px" label-position="left">
        <el-form-item label="接入类型" >
          <el-select  v-model="form.type"  >
            <el-option :label="item.label" :value="item.value" :key="item.value" v-for="item in typeItem"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="NFS服务器IP"   >
      <el-input v-model="form.address" size="small" placeholder="NFS服务器IP" />
      </el-form-item>
      <el-form-item label="挂载路径" >
      <el-input v-model="form.path" size="small" placeholder="挂载路径" />
      </el-form-item>   
        <el-form-item label="存储源源名称" >
          <el-input v-model="form.name" />
        </el-form-item>
        <!-- <el-form-item label="供应商" >
          <el-input v-model="form.supplier" />
        </el-form-item> -->
        <el-form-item label="访问模式" >
          <el-radio-group v-model="form.model">
            <el-radio label="共享"></el-radio>
            <el-radio label="只读"></el-radio>
            <el-radio label="节点独享"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="预分配容量" >
          <el-input v-model="form.num" type="number" size="small" style="width:200px">
            <template slot="append">MB</template>
          </el-input>
        </el-form-item>
         <el-form-item label="标签" >
          <el-button type="" size="mini" @click="addTag">+添加</el-button>
           <el-table
            :data="tagData"
            style="width: 100%">
            <el-table-column
              prop="key"
              label="键">
              <template slot-scope="scope">
                <el-input type="text" v-model="scope.row.key" size="small" />
              </template>
            </el-table-column>
            <el-table-column
              prop="value"
              label="值">
              <template slot-scope="scope">
                <el-input type="text" v-model="scope.row.key"  size="small" />
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="tagDel(scope.$index)" type="text" size="small">删除</el-button>
              </template>
              </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item label="回收策略" >
          <el-radio-group v-model="form.recycling">
            <el-radio label="删除"></el-radio>
            <el-radio label="循环使用"></el-radio>
            <el-radio label="保留"></el-radio>
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
      tagData:[
        {
          key:'beta.kubernetes.io/arch',
          value:'amd64'
        }
      ],
      num: 1,
      typeItem:[
        {
          label:'NFS',
          value:'NFS'
        }
      ],
      form: {
        type:'NFS',
        address:'',
        path:'',
        name:'',
        model:'共享',
        num:'',
        tag:'',
        recycling:'删除'
      },
      formInline:{
        user:''
      },
      poolVisible:false,
      tableData: [
         {
          name:'pvc-223ewdf',
          container:'1G',
          model:'独享',
          status:'绑定成功',
          binder:'default',
          time:'创建时间'
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
     addTag(){
      this.tagData.push({
        key:'',
        value:''
      })
    },
    tagDel(i){
      this.tagData.splice(i,1)
    },
    detailRow(row){
      this.$router.push('storageDetail')
    },
    editRow(row){
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