<template>
  <div class="project-overview">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class=" card-common flex-column box-one">
          <el-row class="m-b-10" :gutter="20" v-for="sub in subData">
            <el-col :span="24" class="mr-10">
              <subjectn-item  :subData="sub" />
            </el-col>     
        
          </el-row>
       
        </el-card>
        </el-col>
      <el-col :span="16">
          <el-card class=" card-common ">
             <div class="bold m-b-30">应用状态</div>
            <el-row class="flex-inline card-content" :gutter="20">
                 <el-col  class=" flex-inline" :span="8" v-for="item in appData">
                    <application-item :appData="item"/>
                   <el-divider direction="vertical"></el-divider>
                </el-col>
                          
            </el-row>
        </el-card>    
        </el-col>   
    </el-row>
     <el-row :gutter="20" class="m-t-20">
      <el-col :span="8" class="card-height">
        <el-card>
          <div class="bold m-b-30">资源使用情况</div>
          <el-row :gutter="20">
            <el-col :span="12">
                <ball-chart  :chart-data="ballData[0]"/>
            </el-col>
             <el-col :span="12">
                  <ball-chart  :chart-data="ballData[1]"/>
             </el-col>
          </el-row>
            <el-row :gutter="20">
            <el-col :span="12">
                <ball-chart  :chart-data="ballData[2]"/>
            </el-col>
             <el-col :span="12">
                  <ball-chart  :chart-data="ballData[3]"/>
             </el-col>
          </el-row>
        </el-card>
        </el-col>
      <el-col :span="16" class="card-height">
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
import SubjectnItem from '../components/SubjectItem'
import ApplicationItem from '../components/ApplicationItem'
import LineChart from '../../../components/Charts/LineChart'
import BallChart from '../../../components/Charts/BallChart'
export default {
   components: {
    ApplicationItem,
    SubjectnItem,
    LineChart,
    BallChart
  
  },
  data(){
    return {
       lineData:lineData,
      lineChartData: lineChartData.newVisitis,
      subData:[
        {name:'default',num:''},
        {name:'命名空间',num:17},
        {name:'权限用户',num:1},
        {name:'text111',num:'项目管理员'},
        ],
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
      appData:[{
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
        }]
    }
  }

}
</script>

<style lang="scss" scoped>
@import '../../../styles/common.scss';
.card-common{
  height: 280px;
}
.card-height{
  height: 540px;
}

</style>