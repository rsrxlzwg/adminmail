<template>
    <div  class="center-content">
        <el-form ref="otherConfig" :model="otherConfig" label-width="80px" >
          <el-form-item label="集群应用" prop="type">
            <div><el-checkbox label="告警"  name="type" v-model="otherConfig.alert_enable"></el-checkbox></div>
            <div><el-checkbox label="监控" name="type" v-model="otherConfig.monitor_enable"></el-checkbox></div>
            <div><el-checkbox label="日志" name="type" v-model="otherConfig.log_enable"></el-checkbox></div>
            <div><el-checkbox label="dns缓存" name="type" v-model="otherConfig.dns_cache_enable"></el-checkbox></div>
            <div><el-checkbox label="metric_server" name="type" v-model="otherConfig.metric_server_enable"></el-checkbox></div>
            <div><el-checkbox label="ingress" name="type" v-model="otherConfig.ingress_enable"></el-checkbox></div>
            <div><el-checkbox label="node问题检查" name="type" v-model="otherConfig.node_problem_detector_enable"></el-checkbox></div>

      
        </el-form-item>
         <div class="text-center">
            <el-button
              type="primary"
              @click="upStep"
            >上一步</el-button>
            <el-button
              type="primary"
              @click="nextStep"
            >下一步</el-button>
        </div>
          <!-- <el-form-item label="可运行POD数量">
            <el-input v-model="otherConfig.podNum" type="number"></el-input>
          </el-form-item>
           <el-form-item label="Cgroup">
          <el-select v-model="otherConfig.cgroup" placeholder="集群状态">
              <el-option label="systemd" value="systemd" />
              <el-option label="cgroupfs" value="cgroupfs" />
            </el-select>
          </el-form-item> -->
          <!-- <el-form-item label="Docker 数据目录">
            <el-input v-model="otherConfig.dockerCatalog" type="text"></el-input>
          </el-form-item>
          <el-form-item label="Docker0 默认网段">
            <el-input v-model="otherConfig.segment" type="text"></el-input>
          </el-form-item> -->
          <!-- <el-form-item label="镜像仓库">
            <el-input v-model="otherConfig.store" type="text"></el-input>
          </el-form-item> -->
           <!-- <el-form-item label="">
             <el-checkbox-group v-model="otherConfig.cpu">
              <el-checkbox label="安装cpu套件" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item> -->
          
        </el-form>
     
      </div>
</template>

<script>

export default {
 
  data(){
    return{
       otherConfig:{
          monitor_enable:false,
          log_enable:false,
          metric_server_enable:false,
          node_problem_detector_enable:false,
          dns_cache_enable:false,
          ingress_enable:false
        }
    }
  },
    methods:{
       upStep(){
         this.$emit('upStep')
      },
      nextStep(){
        this.$emit('nextStep')
      },
    }
  }
</script>

<style lang="scss" scoped>
@import '../../../styles/common.scss';

</style>