<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <el-card>
         <div slot="header" class="clearfix">
            <span>node</span>
          </div>
          <div>
            <p class="bold">详情</p>
            <ul class="detail-infos">
              <li>
                <span>状态:</span><span>运行中</span>
              </li>
              <li>
                <span>IP:</span><span>192.168.11.18</span>
              </li>
              <li>
                <span>无法调度:</span><span>false</span>
              </li>
              <li>
                <span>角色:</span><span>worker</span>
              </li>
               <li>
                <span>操作系统:</span><span>centOS Linux 7 (Core)</span>
              </li>
               <li>
                <span>操作系统类型:</span><span>linux</span>
              </li>
               <li>
                <span>内核版本:</span><span>3.10.0-1062.el7.x86_64</span>
              </li>
               <li>
                <span>容器版本:</span><span>docker://18.9.7</span>
              </li>
               <li>
                <span>Kubelet 版本:</span><span>v1.16.7</span>
              </li>
               <li>
                <span>Kube-Proxy 版本:</span><span>v1.16.7</span>
              </li>
              <li>
                <span>创建时间:</span><span>2020-06-01 17:41:36</span>
              </li>
            </ul>
          </div>
      </el-card>
    </el-col>
    <el-col :span="18">
       <ul class="nav-tab">
        <li :class='activeTab==index?"tab-active":"" ' @click="changeTab(index)" v-for="(item ,index) in tabList">{{item}}</li>       
       </ul>
      <div v-if="activeTab==1" class="m-tb-20">      
        <el-card >
          <div class="bold m-b-10">容器组运行状态</div>
          <el-row class="m-t-30">
            <el-col :span="8">
              <div class="chart-bg">
                <PieChart height="150px" />
              </div>
            </el-col>
              <el-col :span="16">
              <line-charts  :lineData=cpuData  height="190px"></line-charts>
              </el-col>
          </el-row>
        </el-card>
        <el-card class="m-tb-20">
            <div class="bold m-b-10">容器组</div>
            <el-table
              :data="tableData"
              style="width: 99%"
              stripe
              :cell-style="rowClass"
              :header-cell-style="headClass"
              :default-sort="{prop: 'date', order: 'descending'}">
              <el-table-column label="">
                <template slot-scope="scope">
                  <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                label="节点"
                sortable
              >
                <template slot-scope="scope">
                  <span style="color:#409EFF">{{ scope.row.node }}</span>
                </template>
              </el-table-column>
              <el-table-column label="cpu">
                <template slot-scope="scope">
                  <template v-if="scope.row.cpu !== 'NaN' ">
                    <el-progress
                      :percentage="3"
                      :stroke-width="10"
                      :format="format1"
                    />
                  </template>
                  <span style="font-size:10px">{{ scope.row.cpu }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="cpuInfo"
                label="CPU 平均负载"
              />
              <el-table-column label="内存">
                <template slot-scope="scope">
                  <template v-if="scope.row.cpu !== 'NaN' ">
                    <el-progress
                      :percentage="3"
                      :stroke-width="10"
                      :format="format2"/>
                  </template>
                  <span style="font-size:10px">{{ scope.row.memory }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="store"
                label="本地存储"/>
                <el-table-column prop="inode" label="inode 使用率" />
                <el-table-column prop="container" label="容器组" />      
            </el-table>

        </el-card>
      </div>
      <el-card class="m-tb-20" v-if="activeTab==2">
        <div class="bold m-b-10">注释</div>
        
          <el-tag type="info">alpha.kubernetes.io/provided-node-ip</el-tag>
           <el-tag type="info">kubeadm.alpha.kubernetes.io/cri-socket</el-tag>

      </el-card>
      <el-card class="m-tb-20" v-if="activeTab==3">
          <div class="bold m-b-10">监控</div>
          <line-charts  :lineData=cpuData></line-charts>
          <line-charts  :lineData=cupBalanc></line-charts>
          <line-charts  :lineData=memoryData></line-charts>
       </el-card>
    </el-col>
  </el-row>
</template>

<script>
import LineCharts from './components/lineCharts'
import PieChart from '../../components/Charts/PieChart'

export default {
    components: {
      LineCharts, 
      PieChart
    },
    data() {
      return {
        activeTab: 1,
        tabList:['运行状态','容器组','注释','监控','时间'],
        cpuData:{       
          name: 'cpu使用情况',
          xAxisData:["2020-05-11", "2020-05-12", "2020-05-13", "2020-05-14", "2020-05-15", "2020-05-16", "2020-05-17", "2020-05-18", "2020-05-19", "2020-05-20", "2020-05-21", "2020-05-22", "2020-05-23", "2020-05-24", "2020-05-25", "2020-05-26", "2020-05-27", "2020-05-28", "2020-05-29", "2020-05-30", "2020-05-31", "2020-06-01", "2020-06-02", "2020-06-03", "2020-06-04", "2020-06-05", "2020-06-06", "2020-06-07", "2020-06-08", "2020-06-09", "2020-06-10"],
          data: [43, 58, 195, 229, 320, 211, 124, 131, 124, 360, 124, 78, 160, 200, 17, 0, 0, 0, 2, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],        
          color:'rgba(18,61,172,0.5)',
          title:'在线节点状态'       
        },
        cupBalanc:{
          name:'cpu负载均衡',
          data: [23, 39, 118, 71, 116, 89, 58, 71, 51, 146, 31, 41, 61, 185, 5, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          xAxisData:["2020-05-11", "2020-05-12", "2020-05-13", "2020-05-14", "2020-05-15", "2020-05-16", "2020-05-17", "2020-05-18", "2020-05-19", "2020-05-20", "2020-05-21", "2020-05-22", "2020-05-23", "2020-05-24", "2020-05-25", "2020-05-26", "2020-05-27", "2020-05-28", "2020-05-29", "2020-05-30", "2020-05-31", "2020-06-01", "2020-06-02", "2020-06-03", "2020-06-04", "2020-06-05", "2020-06-06", "2020-06-07", "2020-06-08", "2020-06-09", "2020-06-10"],
          color:'rgba(115,226,226,0.5)',
        },
         memoryData:{
          name:'内存使用情况(%)',
          data: [20, 37, 91, 72, 68, 67, 54, 42, 42, 115, 41, 33, 64, 112, 4, 0, 0, 0, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          xAxisData:["2020-05-11", "2020-05-12", "2020-05-13", "2020-05-14", "2020-05-15", "2020-05-16", "2020-05-17", "2020-05-18", "2020-05-19", "2020-05-20", "2020-05-21", "2020-05-22", "2020-05-23", "2020-05-24", "2020-05-25", "2020-05-26", "2020-05-27", "2020-05-28", "2020-05-29", "2020-05-30", "2020-05-31", "2020-06-01", "2020-06-02", "2020-06-03", "2020-06-04", "2020-06-05", "2020-06-06", "2020-06-07", "2020-06-08", "2020-06-09", "2020-06-10"],
          color:'rgba(255,126,133,0.5)',
        },
        tableData: [
        {
          status: 'Active',
          cpu: '2.03/56Cores',
          node: '81-text',
          cpuInfo: '0.34',
          store: '26%  25 / 98.85 GB',
          inode: '1%',
          memory: '13.05 / 15.51 GiB',
          container: '19%'
        },
        {
          status: 'Active',
          cpu: '2.03/56Cores',
          node: 'cluster205',
          cpuInfo: '0.45',
          store: '26 25 / 98.85 GB',
          inode: '4%',
          memory: '54.58/125.04G',
          container: '20%'
        }
      ],
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      changeTab(index){
        this.activeTab=index
      },
      headClass() {
        return "text-align: center;background:#eef1f6;";
      },
      rowClass() {
      return 'text-align: center;'
    },

    }
  }
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';

.detail-infos{
  li{
    color: #5f708a;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    span{
      display: inline;
      // &:nth-child(2){
      //   margin-left: 120px;
      // }
    }
    // display: flex;
  }
}
.chart-bg{
  background: #242e42;
  border-radius: 4px;
}
.nav-tab{
    height: 35px;
    line-height: 35px;
    // width: 300px;
    border-radius: 15px;
    background: rgba(243,244,245,0.8);  //#3c6bae
    font-size: 14px;
    display: flex;
    justify-content:space-around;
    align-items: center;
    cursor: pointer;
    li{
      width: 20%;
      color: #3c6bae;  
      text-align: center; 
    }
    .tab-active{
       color:#fff;
       background: #3c6bae;
       border-radius: 25px;
    }   
  }

</style>