<template>
  <!-- 主机  -->
  <div class="host-container">
     <el-row class="row-bg">
      <el-col :span="18">
         <!-- 查询部分 -->
          <el-form :inline="true" :model="formInline">
            <el-form-item label>
               <el-select v-model="formInline.type"  placeholder='请选择' style="width:110px" @change="changeType">
                    <el-option label="关键字" value="1"></el-option>
                    <el-option label="项目" value="2"></el-option>
                    <el-option label="工作负载" value="3"></el-option>
                    <el-option label="容器组" value="4"></el-option>
                    <el-option label="容器" value="5"></el-option>
                    <el-option label="时间范围" value="6"></el-option>
                </el-select>  
            </el-form-item>
            <el-form-item label v-show="formInline.type!=6">
                <el-input placeholder="请输入" v-model="formInline.key" style="width:500px"></el-input>
            </el-form-item>
             <el-form-item label v-show="formInline.type==6">
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
      <el-table-column prop="time" label="时间" />
      <el-table-column prop="item" label="项目" />
      <el-table-column prop="container" label="容器组" />
      <el-table-column prop="log" label="日志" />
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
          time:'2020-10-16 09:53:48',
          item:'kube-demo',
          container:'nginx-dedd32',
          log:'[85] felix/route_rule.go 172: Queueing a resync of routing rules. ipVersion=4',
        },
        {
                  time:'2020-10-15 09:53:48',
                  item:'kube-system',
                  container:'calico-node-xz59j',
                  log:"2020-10-16 01:50:07.1311 -DEBUG- dbr.select spend 1.08ms: map[sql:SELECT app_id, GROUP_CONCAT(DISTINCT type ORDER BY type SEPARATOR ',') FROM app_version WHERE (`app_id` IN ('app-VRpOw3x2ENJy')) AND (`active` = 0) GROUP BY app_id] (event.go:48)",
        },
        {
                  time:'2020-10-14 09:53:48',
                  item:'kube-item',
                  container:'calico-node-xz59j',
                  log:"2020-10-16 01:50:07.13189 -DEBUG- dbr.select spend 0.69ms: map[sql:SELECT category_id, resource_id, status, create_time, status_time FROM category_resource WHERE (`resource_id` IN ('app-VRpOw3x2ENJy'))] (event.go:48)",
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
          time:'2020-10-16 09:53:48',
          item:'kube-system',
          container:'nginx-dedd32',
          log:'[85] felix/route_rule.go 172: Queueing a resync of routing rules. ipVersion=4',
        },
        {
                  time:'2020-10-16 09:53:48',
                  item:'kube-system',
                  container:'calico-node-xz59j',
                  log:"2020-10-16 01:50:07.1311 -DEBUG- dbr.select spend 1.08ms: map[sql:SELECT app_id, GROUP_CONCAT(DISTINCT type ORDER BY type SEPARATOR ',') FROM app_version WHERE (`app_id` IN ('app-VRpOw3x2ENJy')) AND (`active` = 0) GROUP BY app_id] (event.go:48)",
        },
        {
                  time:'2020-10-16 09:53:48',
                  item:'kube-system',
                  container:'calico-node-xz59j',
                  log:"2020-10-16 01:50:07.13189 -DEBUG- dbr.select spend 0.69ms: map[sql:SELECT category_id, resource_id, status, create_time, status_time FROM category_resource WHERE (`resource_id` IN ('app-VRpOw3x2ENJy'))] (event.go:48)",
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