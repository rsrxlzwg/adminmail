<template>
  <div class="cluster-overview">
    <el-card>
      <el-row :gutter="20" class="cluster-top"> 
        <el-col :span="8" class="cluster-info flex-inline"> 
          <div><span>名称：</span> <span>81-test</span></div>
          <div><span>版本：</span> <span>v1.0.1</span></div>
          <div><el-button  type="primary" plain>物理机集群</el-button></div>    
        </el-col>
        <el-col :span="16" >
          <el-row class="cluster-pods flex-inline" :gutter="20">
            <el-col :span="8" class="flex-inline">
               <span>业务应用</span>
                <div class="flex-column-center text-center">
                  <span class="txt-blue font-28">67</span>
                  <span class="txt-grey font-12">异常</span>
                </div>
                <div class="flex-column-center text-center">
                  <span class="txt-red font-28">35</span>
                  <span class="txt-grey font-12">异常</span>
              </div>
            </el-col>  
             <el-col :span="8" class="flex-inline">
               <span>Pods</span>
                <div class="flex-column-center text-center">
                  <span class="txt-blue font-28">134</span>
                  <span class="txt-grey font-12">异常</span>
                </div>
                <div class="flex-column-center text-center">
                  <span class="txt-red font-28">50</span>
                  <span class="txt-grey font-12">异常</span>
              </div>
            </el-col> 
              <el-col :span="8" class="flex-inline">
               <span>Containers</span>
                <div class="flex-column-center text-center">
                  <span class="txt-blue font-28">189</span>
                  <span class="txt-grey font-12">异常</span>
                </div>
                <div class="flex-column-center text-center">
                  <span class="txt-red font-28">73</span>
                  <span class="txt-grey font-12">异常</span>
              </div>
            </el-col> 
          </el-row>
    
        </el-col>
          </el-row>
    </el-card>
    
   <el-row :gutter="20" class="m-t-20">
    <el-col :span="12">
      <el-card>
        <div class="flex-inline-between">
          <div class="w-30">
            <ball-chart  :chart-data="ballData[0]"/>

          </div>
          <div class="w-30">
            <ball-chart  :chart-data="ballData[1]"/>

          </div>
          <div class="w-30">
            <ball-chart  :chart-data="ballData[2]"/>

          </div>
          
        </div>
      
        <el-row :gutter="40" class="m-t-60" >
          <el-col :span="11" class="flex-inline">
            <span class="font-14">cpu已分配</span>
            <el-progress :text-inside="true" :stroke-width="20" :percentage="50" style="width:115px"></el-progress>
            <span class="font-14">40/48</span>
          </el-col>
           <el-col :span="13" class="flex-inline">
             <span class="font-14">内存已分配</span>
            <el-progress :text-inside="true" :stroke-width="20" :percentage="50" style="width:115px"></el-progress>
            <span class="font-14">87.13/92.6G</span>
           </el-col>
        </el-row>
       <el-divider class="m-t-80"></el-divider>
        <el-row class="flex-inline-between m-t-80">
          <el-col :span="4" class="flex-column-center text-center">
            <span class="txt-blue font-28 bold">8</span>
            <span class="txt-grey font-14 m-t-10">节点总数</span>
          </el-col>
           <el-col :span="4" class="flex-column-center text-center">
            <span class="txt-blue font-28 bold">4</span>
            <span class="txt-grey font-14 m-t-10">Master节点数</span>
          </el-col>
           <el-col :span="4" class="flex-column-center text-center">
            <span class="txt-blue font-28 bold">4</span>
            <span class="txt-grey font-14 m-t-10">Worker节点数</span>
          </el-col>
           <el-col :span="4" class="flex-column-center text-center">
            <span class="txt-green   font-28 bold">7</span>
            <span class="txt-grey font-14 m-t-10">正常节点数</span>
          </el-col>
           <el-col :span="4" class="flex-column-center text-center">
            <span class="txt-red  font-28 bold">1</span>
            <span class="txt-grey font-14 m-t-10">异常节点数</span>
          </el-col>
        
        </el-row>
        <div class="m-t-80">
            <graph-Chart />
        </div>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-row >
          <el-col>
               <el-card>
                <el-row :gutter="20">
                  <el-col :span="12">
                      <line-chart :chart-data="lineData[0]" /> 
                      </el-col>
                        <el-col :span="12">
                          <line-chart :chart-data="lineData[1]" /> 
                      </el-col>
                    </el-row>
                      <el-row :gutter="20">
                      <el-col :span="12">
                          <line-chart :chart-data="lineData[2]" /> 
                      </el-col>
                        <el-col :span="12">
                          <line-chart :chart-data="lineData[3]" /> 
                      </el-col>
                    </el-row>
                  </el-card>
          </el-col>
          <el-col class="m-t-20">
            <el-row :gutter="10">
              <el-col :span="12">
                <el-card style="height:450px"> 
                  <div slot="header" class="clearfix">
                    <span>etcd状态</span>
                     <el-button style="float: right; " size="mini" type="success" round>正常</el-button>
                  </div>
                  <ul class="m-tb-20">
                    <li class="flex-inline-between m-b-20 font-15">
                      <div>rpc速率</div>
                      <div><span>0.00</span> <span>Ops/k</span></div>
                    </li>
                    <li class="flex-inline-between m-b-20 font-15">
                      <div>GRPC客户端流量</div>
                      <div><span>0.00</span> <span>kb/s</span></div>
                    </li>
                  </ul>
                    <ul class="m-t-80">
                    <li class="flex-inline-between m-b-20 font-15">
                      <div>活动流</div>
                      <div><span>0</span> <span>个</span></div>
                    </li>
                    <li class="flex-inline-between m-b-20 font-15">
                      <div>Raft提议</div>
                      <div><span>0</span> <span>次</span></div>
                    </li>
                     <li class="flex-inline-between m-b-20 font-15">
                      <div>数据库存量</div>
                      <div><span>0.00</span> <span>Mb</span></div>
                    </li>
                    <li class="flex-inline-between m-b-20 font-15">
                      <div>磁盘同步周期</div>
                      <div><span>0.00</span> <span>ms</span></div>
                    </li>
                  </ul>
                </el-card> 
              </el-col>
               <el-col :span="12">
                <el-card> 
                   <div slot="header" class="clearfix">
                    <span>control manage状态</span>
                    <el-button style="float: right;"  size="mini" type="success" round>正常</el-button>
                  </div>
                    <ul class="m-tb-20">
                    <li class="flex-inline-between m-b-20 font-15">
                      <div>API services请求速率</div>
                      <div><span>0.00</span> <span>次/秒</span></div>
                    </li>
                    <li class="flex-inline-between m-b-20 font-15">
                      <div>API services请求延迟</div>
                      <div><span>0.00</span> <span>ms</span></div>
                    </li>
                     <li class="flex-inline-between m-b-20 font-15">
                      <div>控制器队列深度</div>
                      <div><span>0</span> <span>层</span></div>
                    </li>
                  </ul>
                  </el-card> 
                <el-card class="m-t-10"> 
                   <div slot="header" class="clearfix">
                    <span>schedule状态</span>
                    <el-button style="float: right; " size="mini" type="success" round>正常</el-button>

                  </div>
                   <ul class="m-tb-20">
                    <li class="flex-inline-between m-b-20 font-15">
                      <div>调度器尝试调度次数</div>
                      <div><span>0</span> <span>次</span></div>
                    </li>
                    <li class="flex-inline-between m-b-20 font-15">
                      <div>调度失败的pod个数</div>
                      <div><span>0</span> <span>个</span></div>
                    </li>
                  </ul>
                  
                  </el-card> 
              </el-col>
            </el-row>
             
            
          </el-col>
      </el-row>  
      
    </el-col>
  </el-row>
  </div>
  
</template>

<script>
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}
 let echartData = [{
              name: "1",
              value1: 100,
              value2: 233
          },
          {
              name: "2",
              value1: 138,
              value2: 233
          },
          {
              name: "3",
              value1: 350,
              value2: 200
          },
          {
              name: "4",
              value1: 173,
              value2: 180
          },
      
      ];

      let xAxisData = echartData.map(v => v.name);
      //  ["1", "2", "3", "4", "5", "6", "7", "8"]
      let yAxisData1 = echartData.map(v => v.value1);
      // [100, 138, 350, 173, 180, 150, 180, 230]
      let yAxisData2 = echartData.map(v => v.value2);
      // [233, 233, 200, 180, 199, 233, 210, 180]
const lineData=[
              {
                xAxisData:xAxisData,
                yAxisData:yAxisData1,
                legends:'cpu利用率',
                color:'#0090FF'
              },
              {
                xAxisData:xAxisData,
                yAxisData:yAxisData2,
                legends:'内存利用率',
                color:'#36CE9E'
              },
              {
                xAxisData:xAxisData,
                yAxisData:yAxisData1,
                legends:'磁盘',
                color:'#FFC005'
              },{
                xAxisData:xAxisData,
                yAxisData:yAxisData2,
                legends:'网络',
                color:'#8B5CFF'
              }
        ]
import PieChart from '../../../components/Charts/PieChart'
import BarChart from '../../../components/Charts/BarChart'
import LineChart from '../../../components/Charts/LineChart'
import BallChart from '../../../components/Charts/BallChart'
import graphChart from '../../../components/Charts/graphChart'
export default {
 name: 'clousterOverview',
  components: {
    PieChart,
    BarChart,
    LineChart,
    BallChart,
    graphChart
  },
   data(){
    return {
      lineData:lineData,
      lineChartData: lineChartData.newVisitis,
      ballData:[
        {
          title:'cpu用量',
          value: 0.82,
          type: 1,
          radiusType: 1
        },
        {
          title:'内存用量',
          value: 0.32,
          type: 2,
          radiusType: 2
        },
        {
          title:'cpu请求',
          value: 0.50,
          type: 3,
          radiusType: 1
        },
        {
          title:'内存请求',
          value: 0.72,
          type: 4,
          radiusType: 2
        }
      ],
      appData:[
        {
          img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590570264038&di=a963dd4cb07f588728d287f00220123c&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F16%2F08%2F20%2F2357b8781a8b798.jpg%2521%2Ffwfh%2F804x804%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue',
          name:'业务应用',
          narmal:{
            number:165,
            state:0,
            percentage:'70%'
          },
          abnormals:{
            number:35,
            state:1,
            percentage:'30%'
          }
        },
         {
          img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590570264038&di=a963dd4cb07f588728d287f00220123c&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F16%2F08%2F20%2F2357b8781a8b798.jpg%2521%2Ffwfh%2F804x804%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue',
          name:'Pods',
          narmal:{
            number:88,
            state:0,
            percentage:'90%'
          },
           abnormals:{
            number:12,
            state:1,
            percentage:'10%'
          }
        },
         {
          img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590570264038&di=a963dd4cb07f588728d287f00220123c&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F16%2F08%2F20%2F2357b8781a8b798.jpg%2521%2Ffwfh%2F804x804%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue',
          name:'Containers',
          narmal:{
            number:50,
            state:0,
            percentage:'50%'
          },
           abnormals:{
            number:50,
            state:1,
            percentage:'50%'
          }
        }],
      // stateList:[
      //     {
      //       statsName:'rpc速率',
      //       num:'0.00',
      //       unit:''
      //     }
      //   ]
    
    }
  },
  methods:{
   

  }
}
</script>

<style lang="scss" scoped>
@import '../../../styles/common.scss';
.cluster-overview{
  .cluster-top{
      // border: 1px solid #ddd;
    }
    .w-30{
      width: 28%;
    }
    .card-height{
      height: 540px;
    }
}

</style>