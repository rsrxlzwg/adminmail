<template>
  <div class="dashboard-container">
    <div class="dashboard-top">
      <ul class="common-tab" >
          <li :class='activeTab==index?"tab-active":"" ' v-for="(tab,index) in tabList" @click="changeTab(tab)">{{tab.name}}</li>
      </ul>
      <div class="change-section">
        <div class="home-txt" v-show="activeTab==0">你好，欢迎访问云平台</div>
        <div class="cluster-overview" v-show="activeTab==1">
          <span class="mr-10">集群</span>
          <el-select v-model="cluster" placeholder="请选择集群" size="mini">
            <el-option label="集群一" value="shanghai"></el-option>
            <el-option label="集群二" value="beijing"></el-option>
          </el-select>
        </div>
        <div class="cluster-overview" v-show="activeTab==2">
          <span class="mr-10">项目</span>
          <el-select v-model="project" placeholder="请选择项目" size="mini">
            <el-option label="集群一" value="shanghai"></el-option>
            <el-option label="集群二" value="beijing"></el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="dashboard-component">
        <component :is="tabList[activeTab].code" />
    </div>
   
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import cloudOverview from './cloud-overview'
import clusterOverview from './cluster-overview'
import projectOverview from './project-overview'

export default {
  name: 'Dashboard',
  components: { cloudOverview, clusterOverview ,projectOverview},
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data(){
    return {
      activeTab:0,
      tabList:[
        {
          index:0,
          name:'云概览',
          code:'cloudOverview'
        },
        {
          index:1,
          name:'集群概览',
          code:'clusterOverview'
        },
        {
          index:2,
          name:'项目概览',
          code:'projectOverview'
        }      
      ],
      cluster:'shanghai',
      project:'shanghai',
      // currentComponent:''
    }
  },
  methods:{
    changeTab(tab){
      this.activeTab=tab.index
      this.currentComponent=tab.code
    }
  },
  mounted(){
    // this.currentComponent=this.tabList[this.activeTab].code
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    // margin: 30px;
    background: #fff;
    height: 500px;
    border-radius: 5px;
    padding: 10px;
    // &:before{
    //   content: '';
    //   display:table;
    // }
  }
  &-top{
    display: flex;
    justify-content:space-between ;
    flex-flow: row nowrap;
  }
  &-text {
    font-size: 24px;
    line-height: 24px;
  }
  &-component{
    margin-top: 20px;
  }
}
.mr-10{
  margin-right: 10px;
}
.common-tab{
    height: 35px;
    line-height: 35px;
    width: 300px;
    border-radius: 15px;
    background: rgba(243,244,245,0.8);  //#3c6bae
    font-size: 14px;
    display: flex;
    justify-content:space-around;
    align-items: center;
    cursor: pointer;
    li{
      width: 100px;
      color: #3c6bae;  
      text-align: center; 
    }
    .tab-active{
       color:#fff;
       background: #3c6bae;
       border-radius: 25px;
    }   
  }
  .change-section{
    // width: 200px;
    .home-txt{
      color: #3c6bae;
    }
    .cluster-overview{
      display: flex;
      align-items: center;
    }

  }
</style>
