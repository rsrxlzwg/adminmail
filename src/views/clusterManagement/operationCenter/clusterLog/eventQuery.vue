<template>
  <!-- 主机  -->
  <div class="host-container">
     <el-row class="row-bg">
      <el-col :span="18">
         <!-- 查询部分 -->
          <el-form :inline="true" :model="formInline">
            <el-form-item label>
               <el-select v-model="formInline.type"  placeholder='请选择' style="width:110px" @change="changeType">
                    <el-option label="项目" value="1"></el-option>
                    <el-option label="资源类型" value="2"></el-option>
                    <el-option label="资源名称" value="3"></el-option>
                    <el-option label="事件类别" value="4"></el-option>
                    <el-option label="时间范围" value="5"></el-option>
                </el-select>  
            </el-form-item>
            <el-form-item label v-show="formInline.type!=5">
                <el-input placeholder="请输入" v-model="formInline.key" style="width:500px"></el-input>
            </el-form-item>
             <el-form-item label v-show="formInline.type==5">
                <!-- <el-input placeholder="请输入" v-model="formInline.key" style="width:500px"></el-input> -->
                <el-date-picker
                  v-model="timeData"
                  type="datetimerange"
                  :picker-options="pickerOptions"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  align="right">
                </el-date-picker>
            </el-form-item>
            <el-form-item label>
               <el-button type="primary" @click="onSubmit">搜索</el-button>
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
      <el-table-column prop="timestamp" label="时间" />
      <el-table-column prop="type" label="类别" />
      <el-table-column prop="namespace" label="项目" />
      <el-table-column prop="name" label="资源名称" />
      <el-table-column prop="kind" label="类型" />
      <el-table-column prop="reason" label="原因" />
      <el-table-column prop="message" label="消息" />
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
      timeData:[],
      pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      formInline:{
        key:'',
        type:'关键字',
      },
      tableData: [
        {
            "namespace": "demo1",
            "kind": "FederatedWorkspace",
            "name": "system-workspace",
            "reason": "CreateInCluster",
            "message": "Creating Workspace \"system-workspace\" in cluster \"dev\"",
            "timestamp": "2020-10-09T15:08:12Z",
            "type": "Normal"
        },
       {
            "kind": "PodDisruptionBudget",
            "namespace": "demo2",
            "name": "memcach-1s3bws-memcached",
            "reason": "NoPods",
            "message": "No matching pods found",
            "timestamp": "2020-10-09T15:08:02Z",
            "type": "Normal"
        }, 
        {
            "namespace": "demo3",
            "kind": "ClusterRoleBinding",
            "name": "ks-events-operator",
            "reason": "Synced",
            "message": "ClusterRoleBinding synced successfully",
            "timestamp": "2020-10-09T15:08:12Z",
            "type": "Normal"
        }
      ]
    }
  },
  methods: {
     headClass() {
      return 'text-align: center;background:#eef1f6;'
    },
    rowClass() {
      return 'text-align: center;'
    },
    tableInit(){
       this.tableData=[
        {
            "namespace": "demo1",
            "kind": "FederatedWorkspace",
            "name": "system-workspace",
            "reason": "CreateInCluster",
            "message": "Creating Workspace \"system-workspace\" in cluster \"dev\"",
            "timestamp": "2020-10-09T15:08:12Z",
            "type": "Normal"
        },
       {
            "kind": "PodDisruptionBudget",
            "namespace": "demo2",
            "name": "memcach-1s3bws-memcached",
            "reason": "NoPods",
            "message": "No matching pods found",
            "timestamp": "2020-10-09T15:08:02Z",
            "type": "Normal"
        }, 
        {
            "namespace": "demo3",
            "kind": "ClusterRoleBinding",
            "name": "ks-events-operator",
            "reason": "Synced",
            "message": "ClusterRoleBinding synced successfully",
            "timestamp": "2020-10-09T15:08:12Z",
            "type": "Normal"
        }
      ]
    },

   changeType(e){
     console.log({e})
      this.tableInit()
      this.formInline.key=''
    },
    onSubmit() {
      if(this.formInline.key==''){
        this.tableInit()
      }else{
         var search=this.tableData.filter(data=>{ 
            return data.type.toLowerCase().indexOf(this.formInline.key) !== -1 ||
               data.namespace.toLowerCase().indexOf(this.formInline.key) !== -1 ||
              data.name.toLowerCase().indexOf(this.formInline.key) !== -1 ||
              data.kind.toLowerCase().indexOf(this.formInline.key) !== -1 ||
              data.reason.toLowerCase().indexOf(this.formInline.key) !== -1 ||
              data.message.toLowerCase().indexOf(this.formInline.key) !== -1             

      })
      this.tableData=search
      console.log('ddd',search)
    }
     
    },
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