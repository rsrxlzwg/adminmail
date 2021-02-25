<template>
  <div class="clusterOverview">
    <el-card>
      <el-row>
        <el-button
          plain
          @click="installation"
        >安装</el-button>
        <el-button
          type="danger"
          plain
          @click="uninstall"
        >卸载</el-button>
        <el-button
          type="success"
          plain
          @click="upgrade"
        >升级</el-button>
        <el-button
          type="info"
          plain
          @click="reset"
        >重置</el-button>
        <el-button
          type="primary"
          plain
        >WEBKUBECTL</el-button>
      </el-row>
    </el-card>
    <el-card class="m-tb-20">
      <el-row :gutter="40">
        <el-col :span="8">
          <ul class="cluster-infos">
            <li>
              <span>集群名称: </span>
              <span>{{baseInfo.cluster_name}}</span>
            </li>
            <li><span> 版本:</span> <span>{{baseInfo.cluster_version}}</span> </li>
            <li><span> 插件类型:</span> <span>{{baseInfo.storage_type}}</span> </li>
            <li><span>插件:</span> <span>{{baseInfo.storage_plugin.name}}</span> </li>
            <li><span>pod_cidr:</span> <span>{{baseInfo.pod_cidr}}</span> </li>
            <li><span>svc_cidr:</span> <span>{{baseInfo.svc_cidr}}</span> </li>
            <li><span>创建时间:</span> <span>{{baseInfo.updated_at}}</span> </li>
          </ul>
        </el-col>
        <el-col
          :span="6"
          class="chart-container"
        >
          <div class="card-titles bold">集群状态</div>
          <!-- <ball-chart  :chart-data="ballData[0]"/> -->
          <div class="chart-bg">
            <PieChart height="150px" />
          </div>

        </el-col>
        <el-col :span="10">
          <div class="card-titles" />
          <ul class="cluster-status">
            <li>
              <img
                src="../../assets/kubernetes.svg"
                alt=""
              >
              <p><span>9</span>/9</p>
            </li>
            <!-- <li>
                <img src="../../assets/openpitrix.svg" alt="" class="img-90">
                <p><span>13</span>/13</p>
              </li> -->
            <li>
              <img
                src="../../assets/istio.svg"
                alt=""
              >
              <p><span>12</span>/12 </p>
            </li>
            <li>
              <img
                src="../../assets/monitoring.svg"
                alt=""
              >
              <p><span>7</span>/7</p>
            </li>
            <li>
              <img
                src="../../assets/logging.svg"
                alt=""
              >
              <p><span>4</span>/4 </p>
            </li>
          </ul>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <div
        slot="header"
        class="clearfix"
      >
        <span>资源使用情况</span>
      </div>
      <div class="flex-inline">
        <div class="chart-box">
          <resource-chart :pie-data="cpuData" />
        </div>
        <div class="chart-box">
          <resource-chart :pie-data="memoryData" />
        </div>
        <div class="chart-box">
          <resource-chart :pie-data="storageData" />
        </div>
        <div class="chart-box">
          <resource-chart :pie-data="containerData" />
        </div>

      </div>
      <p>节点用量</p>
      <el-table
        :data="tableData"
        style="width: 99%"
        stripe
        :cell-style="rowClass"
        :header-cell-style="headClass"
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <!-- <el-table-column prop="date" label="状态" /> -->
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
                :format="format2"
              />
            </template>
            <span style="font-size:10px">{{ scope.row.memory }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="store"
          label="本地存储"
        />

          <el-table-column prop="inode" label="inode 使用率" />
          <el-table-column prop="container" label="容器组" />
           <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="nodeDetail(scope.row)"
            type="text"
            size="small"
          >详情</el-button>
        </template>
      </el-table-column>        
      </el-table>
    </el-card>
    <el-dialog
      :close-on-click-modal="false"
      :title="'正在' + executionLabel"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
      top="2vh"
    >
      <el-row>
        <el-col :span="24">
          <el-steps
            :active="1"
            align-center
            finish-status="success"
          >
            <el-step
              :title="executionLabel + '操作系统'"
              :description="executionLabel + '操作系统'"
              icon="el-icon-s-platform"
            />
            <el-step
              :title="executionLabel + '安装环境'"
              :description="executionLabel + '安装环境'"
              icon="el-icon-s-home"
            />
            <el-step
              :title="executionLabel + 'master'"
              :description="executionLabel + 'master'"
              icon="el-icon-s-promotion"
            />
            <el-step
              :title="executionLabel + 'worker'"
              :description="executionLabel + 'worker'"
              icon="el-icon-s-shop"
            />
          </el-steps>
        </el-col>
      </el-row>
      <extir />
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BallChart from '../../components/Charts/BallChart'
import PieChart from '../../components/Charts/PieChart'
import ResourceChart from './components/resourceChart'
import extir from '@/components/commond'
import {getDetail} from '../../api/base/cluster'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        Active: 'success',
        Cordoned: 'warning',
        xxx1: 'gray',
        xxx2: 'danger'
      }
      return statusMap[ status ]
    }
  },
  components: {
    BallChart,
    PieChart,
    ResourceChart,
    extir
  },
  data() {
    return {
      baseInfo:{
        cluster_name:"",
        cluster_version:"",
        storage_type:"",
        storage_plugin:"",
        pod_cidr:"",
        svc_cidr:"",
        updated_at:"",
      },
      executionLabel:'',
      dialogVisible: false,
      ballData: [
        {
          title: 'cpu用量',
          value: 0.82,
          type: 1,
          radiusType: 1
        },
        {
          title: '内存用量',
          value: 0.32,
          type: 2,
          radiusType: 2
        },
        {
          title: 'cpu请求',
          value: 0.50,
          type: 3,
          radiusType: 1
        },
        {
          title: '内存请求',
          value: 0.72,
          type: 4,
          radiusType: 2
        }
      ],
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
      cpuData:{       
          name: 'CPU core',
          max:12,
          value: 1.34 ,
          color:'rgba(36, 209, 209, 1)',
          title:'在线节点状态'       
      },
       memoryData: {
        name: '内存 GiB',
        max: 46.54,
        value: 70.73,
        color: 'rgba(252, 142, 108, 1)'
      },
      storageData: {
        name: '本地存储 GB',
        max: 296.56,
        value: 64.73,
        color: 'rgba(68, 163, 252, 1)'
      },
      containerData: {
        name: '容器组',
        max: 330,
        value: 80,
        color: 'rgba(165, 211, 255, 1)'
      }
      }
    },
    mounted(){
      this.getDetail()
      // console.log('router',this.route.params)
    },
  methods: {
  
    getDetail(){
      const row=this.$route.query.rows
      getDetail(row.id).then(res=>{
        if(res.status==200){
          this.baseInfo=res.data
        }
      })
    },
     backUp(){
        this.$router.push({path:'/infrastructure/culster'})
      },
      nodeDetail(row){
        this.$router.push({path:'/infrastructure/clusterNodeDetail'})
      },
      headClass() {
        return "text-align: center;background:#eef1f6;";
      },
    openPopup(type) {
      this.dialogVisible = true
      this.executionLabel = type
    },
    uninstall() {
      this.openPopup('卸载')
    },
    installation() {
      this.openPopup('安装')
    },
    upgrade() {
      
    },
     reset() {
     
    },
    handleClose(){

    },
    showcommod() { },
    toastcommond() { },
    headClass() {
      return 'text-align: center;background:#eef1f6;'
    },
    rowClass() {
      return 'text-align: center;'
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    format1(percentage) {
      // return percentage === 100 ? "满" : `${percentage}%`;
      return ''
    },
    format2(percentage) {
      // return percentage === 100 ? "满" : `${percentage}%`;
      return ``
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/common.scss";
.chart-box {
  background: #f9fbfd;
  border-radius: 4px;
  width: 24%;
  height: 160px;
  padding: 20px;
}
.card-titles {
  height: 50px;
}
.chart-bg {
  background: #242e42;
  border-radius: 4px;
}

.cluster-infos {
  li {
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    color: #5f708a;
    font-size: 14px;
    span {
      display: inline-block;
    }
   
    
    
  }
}
.img-90 {
  width: 90px;
}
.cluster-status {
  display: flex;
  flex-wrap: wrap;
  li{
    width: 46%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    background: #f9fbfd;
    padding: 0 10px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.175, 0.35, 0.32, 1);
    &:hover {
      box-shadow: 0 8px 16px 0 rgba(36, 46, 66, 0.08);
    }
    &:nth-child(2n-1) {
      margin-right: 20px;
    }
    p {
      font-size: 16px;
      span {
        font-size: 22px;
        font-weight: bold;
      }
    }
  }
}
</style>
