<template>
  <!-- 主机  -->
  <div class="host-container">
     <el-row class="row-bg">
      <el-col :span="18">
         <!-- 查询部分 -->
          <el-form :inline="true" :model="formInline">
            <el-form-item label>
               <el-select v-model="formInline.type"  placeholder='请选择' style="width:110px" @change="changeType">
                    <el-option label="告警级别" value="1"></el-option>
                    <el-option label="资源类型" value="2"></el-option>
                    <el-option label="告警源" value="3"></el-option>
                    <el-option label="自定义属性" value="4"></el-option>
                </el-select>  
            </el-form-item>
            <el-form-item label v-show="formInline.type!=5">
                <el-input placeholder="请输入" v-model="formInline.key" style="width:500px"></el-input>
            </el-form-item>
             <!-- <el-form-item label v-show="formInline.type==6">
                <el-date-picker
                  v-model="timeData"
                  type="datetimerange"
                  :picker-options="pickerOptions"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  align="right">
                </el-date-picker>
            </el-form-item> -->
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
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="level" label="告警级别" />
      <el-table-column prop="resourceType" label="资源类型" />
      <el-table-column prop="resourceName" label="资源名称" />
      <el-table-column prop="alertDetail" label="告警详情" />
      <el-table-column prop="occurrenceTime" label="发生时间" />
      <el-table-column prop="lastTime" label="持续时长" />
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
        name:'node_cpu_usage_high',
        level:'warning',
        resourceType:'cluster',
        resourceName:'cpuUsage',
        alertDetail:"The CPU usage of node 'master02' is too high",
        occurrenceTime:3,
        lastTime:'2020-10-16T02:54:53.766Z'
        },
        {
        name:'node_kubelet_not_ready',
        level:'error',
        resourceType:'cluster',
        resourceName:'kubelet',
        alertDetail:'The kubelet service of host master03 is not ready',
        occurrenceTime:1,
        lastTime:'2020-10-16T02:54:53.766Z'
        },
        {
        name:'node_memory_usage_high',
        level:'warning',
        resourceType:'cluster',
        resourceName:'memUsage',
        alertDetail:"The memory usage of node 'master01' is too high",
        occurrenceTime:3,
        lastTime:'2020-10-16T02:54:53.766Z'
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
       this.tableData=[]
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
            return data.time.toLowerCase().indexOf(this.formInline.key) !== -1 ||
               data.item.toLowerCase().indexOf(this.formInline.key) !== -1 ||
              data.container.toLowerCase().indexOf(this.formInline.key) !== -1 ||
              data.log.toLowerCase().indexOf(this.formInline.key) !== -1             
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