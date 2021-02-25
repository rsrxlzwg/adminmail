<template>
  <div class="cloud-overview">
    <el-row class="cloud-top" :gutter="30">
      <el-col :span="6">
        <el-card class=" card-common flex-column box-one">
          <el-row  :gutter="20"  v-for="sub in subData">
            <el-col :span="24" class="m-b-10">
               <subjectn-item  :subData="sub"/>
            </el-col>
          
          </el-row>
    
        
        </el-card>
        </el-col>
      <el-col :span="18">
          <el-card class=" card-common ">
             <div class="bold m-b-30">应用状态</div>
            <el-row class="flex-inline card-content" :gutter="20">      
                 <el-col  class=" flex-inline" :span="8" v-for="item in appData">
                  <application-item :appData="item"/>
                   <el-divider direction="vertical"></el-divider>
              </el-col>               
              <!-- <el-col class="flex-inline" :span="8">
                 <application-item :appData="appData[1]"/>
                 <el-divider direction="vertical"></el-divider>
              </el-col>
              <el-col class=" flex-inline" :span="8">
                 <application-item  :appData="appData[2]"/>
              </el-col>            -->
            </el-row>
       
        </el-card>
     
        </el-col>
    </el-row>
    <el-row class="cloud-bittom " :gutter="30">
      <el-col :span="6">
        <el-card class="card-common">
          <div class="bold m-b-30">资源使用情况</div>
          <div class="cpu-box  flex-column-center" style="height:220px">
            <div  class="flex-inline-between flex-1">
              <div> <span class="font-34 bold">2.22</span><span>cores</span>   </div>
              <span class="bold font-28">1.73%</span>
            </div>
            <div>cpu用量</div>
            <div class="flex-inline-between flex-1">
              <el-progress :text-inside="true" :stroke-width="20" :percentage="50" status="exception" style="width:120px"></el-progress>
              <span>128Cores</span>
            </div>

          </div>
            <!-- <bar-chart /> -->
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card class=" card-common">
           <div class="bold m-b-20">集群状态</div>
           <el-row :gutter="20" class="card-content">
            <el-col :span="16" class="height-inherit">
              <pie-chart />
            </el-col>
            <el-col :span="8" class="height-inherit flex-column-center">  
              <div><el-button type="success" icon="el-icon-check" circle></el-button> 所有集群正常运行</div>
              
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
import LineChart from '../../../components/Charts/LineChart'
import BarChart from '../../../components/Charts/BarChart'
import PieChart from '../../../components/Charts/PieChartNew'
import SubjectnItem from '../components/SubjectItem'
import ApplicationItem from '../components/ApplicationItem'
export default {
  name: 'clousOverview',
  components: {
    LineChart,
    BarChart,
    PieChart,
    SubjectnItem,
    ApplicationItem
  },
  data(){
    return {
      lineChartData: lineChartData.newVisitis,
       subData:[
        {name:'项目',num:10},
        {name:'命名空间',num:61},
        {name:'注册用户',num:22},
        {name:'用户在线',num:4},
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
  height: 300px;
}

.cloud{
  &-top{
    margin-bottom: 20px;
  }
}
.card-content{
  height: calc(300px - 80px);
}
.height-inherit{
  height: inherit;
}



</style>