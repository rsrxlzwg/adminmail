<template>
  <!-- 主机  -->
  <div class="host-container">
     <el-row class="row-bg">
      <el-col :span="18">
         <!-- 查询部分 -->
          <el-form :inline="true" :model="formInline">
            <el-form-item label>
               <el-select v-model="formInline.type"  placeholder='请选择' style="width:110px" @change="changeType">
                    <!-- <el-option label="关键字" value="1"></el-option> -->
                    <el-option label="项目" value="1"></el-option>
                    <el-option label="原因" value="2"></el-option>
                    <el-option label="资源名称与类型" value="3"></el-option>
                    <el-option label="子资源" value="4"></el-option>
                    <el-option label="操作账号" value="5"></el-option>
                    <el-option label="时间" value="6"></el-option>
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
      <el-table-column prop="timestamp" label="时间" />
      <el-table-column prop="action" label="操作行为" />
      <el-table-column prop="statusCode" label="状态码" />
      <el-table-column prop="namespaces" label="项目" />
      <el-table-column prop="reason" label="原因" />
      <el-table-column prop="resource" label="资源名称与类型" />
      <el-table-column prop="kind" label="子资源" />
      <el-table-column prop="user" label="操作账号" />

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
          "timestamp": "2020-10-16T03:54:53.766Z",
          "action": "create",
          "statusCode": "OK",
          "namespaces":"kube-system1",
          "reason":"system:authenticated1",
          "resource":"clusters1",
          "kind":"namespaces1",
          "user": "demo1"
        },
        {
          "timestamp": "2020-10-16T01:54:53.766Z",
          "action": "delete",
          "statusCode": "OK",
          "namespaces":"kube-system2",
          "reason":"system:authenticated2",
          "resource":"clusters2",
          "kind":"namespaces2",
          "user": "demo2"
        },
        {
          "timestamp": "2020-10-16T02:54:53.766Z",
          "action": "update",
          "statusCode": "OK",
          "namespaces":"kube-system3",
          "reason":"system:authenticated3",
          "resource":"clusters3",
          "kind":"namespaces3",
          "user": "demo3"
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
          "timestamp": "2020-10-16T03:54:53.766Z",
          "action": "create",
          "statusCode": "OK",
          "namespaces":"kube-system1",
          "reason":"system:authenticated1",
          "resource":"clusters1",
          "kind":"namespaces1",
          "user": "demo1"
        },
        {
          "timestamp": "2020-10-16T01:54:53.766Z",
          "action": "delete",
          "statusCode": "OK",
          "namespaces":"kube-system2",
          "reason":"system:authenticated2",
          "resource":"clusters2",
          "kind":"namespaces2",
          "user": "demo2"
        },
        {
          "timestamp": "2020-10-16T02:54:53.766Z",
          "action": "update",
          "statusCode": "OK",
          "namespaces":"kube-system3",
          "reason":"system:authenticated3",
          "resource":"clusters3",
          "kind":"namespaces3",
          "user": "demo3"
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
            return data.action.toLowerCase().indexOf(this.formInline.key) !== -1 ||
               data.statusCode.toLowerCase().indexOf(this.formInline.key) !== -1 ||
              data.namespaces.toLowerCase().indexOf(this.formInline.key) !== -1 ||
              data.reason.toLowerCase().indexOf(this.formInline.key) !== -1   ||
              data.resource.toLowerCase().indexOf(this.formInline.key) !== -1   ||
              data.kind.toLowerCase().indexOf(this.formInline.key) !== -1     ||
              data.user.toLowerCase().indexOf(this.formInline.key) !== -1             

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