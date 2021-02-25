<template>
  <!-- 集群添加  -->
  <div class="culster-container">
    <el-steps
      :active="active"
      finish-status="success"
      class="steps-box"
    >
      <el-step
        v-for="step in stepLists"
        :title="step"
      />
    </el-steps>
    <div class="steps-content">
      <base-info
        v-show="active==0"
        ref="baseInfo"
        @nextStep="nextStep"
        @upStep="upStep"
      />
      <node-config
        v-show="active==1"
        ref="nodeConfig"
        :culster-name="culsterName"
        @nextStep="nextStep"
        @upStep="upStep"
      />
      <!-- <mirror-config
        v-show="active==2"
        ref="mirrorConfig"
      /> -->
      <network-config
        v-show="active==2"
        ref="networkConfig"
          @nextStep="nextStep"
        @upStep="upStep"
      />
      <storageConfig
        v-show="active==3"
        ref="storageConfig"
           :culster-name="culsterName"
        @nextStep="nextStep"
        @upStep="upStep"
      />
      <other-config
        v-show="active==4"
        ref="otherConfig"
           :culster-name="culsterName"
        @nextStep="nextStep"
        @upStep="upStep"
      />
      <!-- <div v-show="active==6">666</div> -->
      <div v-if="active==5">
        <el-card>
          <div
            slot="header"
            class="clearfix"
          >
            <span>基础信息</span>
          </div>
          <el-form
            label-position="left"
            inline
            :model="culsterForm.baseInfo">

            <el-row>
              <el-col :span="6">
                <el-form-item label="集群名称:">
                  <span>{{ culsterForm.baseInfo.cluster_name }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="域名后缀:">
                  <span>{{ culsterForm.baseInfo.domain_name }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="集群版本:">
                  <span>{{ culsterForm.baseInfo.cluster_version }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

        </el-card>
        <el-card>
          <div
            slot="header"
            class="clearfix"
          >
            <span>配置节点</span>
          </div>
          <span class="m-tb-20 bold">master</span>
          <el-row
            v-for="item in culsterForm.nodeConfig.master_node"
            class="m-tb-20"
          >    
            <el-col :span="6">主机：{{ item.value.role }}</el-col>
            <el-col :span="6">ip:{{ item.value.ip }}</el-col>
            <el-col :span="6">端口:{{ item.value.port }}</el-col>
            <el-col :span="6">凭证：{{ item.value.credential.name }}</el-col>
          </el-row>
          <span class="m-tb-20 bold">worker</span>
          <el-row
            v-for="item in culsterForm.nodeConfig.worker_node"
            class="m-tb-20" >
            <el-col :span="6">主机：{{ item.value.role }}</el-col>
            <el-col :span="6">ip：{{ item.value.ip }}</el-col>
            <el-col :span="6">端口:{{ item.value.port }}</el-col>
            <el-col :span="6">凭证：{{ item.value.credential.name }}</el-col>
          </el-row>
        </el-card>
        <el-card>
          <div
            slot="header"
            class="clearfix"
          >
            <span>配置网络</span>
          </div>
          <el-form
            label-position="left"
            inline
            :model="culsterForm.networkConfig"
          >
            <el-row>
              <el-col :span="6">
                <el-form-item label="网络插件类型:">
                  <span>{{ culsterForm.networkConfig.network_type }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="kube-proxy 运行模式:">
                  <span>{{ culsterForm.networkConfig.proxy_mode }}</span>
                </el-form-item>
              </el-col>   
              <el-col :span="6">
                <el-form-item label="Service CIDR:">
                  <span>{{ culsterForm.networkConfig.svc_cidr }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="POD CIDR:">
                  <span>{{ culsterForm.networkConfig.pod_cidr }}</span>
                </el-form-item>
              </el-col>
               <el-col :span="6">
                <el-form-item label="可运行POD数量:">
                  <span>{{ culsterForm.networkConfig.max_pod_num }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

        </el-card>
        <el-card >
          <div
            slot="header"
            class="clearfix"
          >
            <span>配置存储</span>
          </div>
          <el-form
            label-position="left"
            inline
            :model="culsterForm.storageConfig"
          >
            
            <el-row v-if="culsterForm.storageConfig.storage_type=='nfs' ">
              <el-col :span="6">
                <el-form-item label="存储类型:">
                  <span>{{ culsterForm.storageConfig.storage_type }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="存储名:">
                  <span>{{ culsterForm.storageConfig.storage_plugin.name }}</span>
                </el-form-item>
              </el-col>
               <el-col :span="6">
                <el-form-item label="存储ip:">
                  <span>{{ culsterForm.storageConfig.storage_plugin.nfs_server_ip }}</span>
                </el-form-item>
              </el-col>
               <el-col :span="6">
                <el-form-item label="存储路径:">
                  <span>{{ culsterForm.storageConfig.storage_plugin.nfs_server_path }}</span>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="6">
                <el-form-item label="NFSPath:">
                  <span>{{ culsterForm.storageConfig.NFSPath }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="GLUSTERFS:">
                  <span>{{ culsterForm.storageConfig.GLUSTERFS }}</span>
                </el-form-item>
              </el-col> -->
            </el-row>
            <el-row v-if="culsterForm.storageConfig.type=='ceph' ">
              <el-col :span="6">
                <el-form-item label="ceph_rbd_monitors:">
                  <span>{{ culsterForm.storageConfig.monitors }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="ceph_rbd_admin_secret:">
                  <span>{{ culsterForm.storageConfig.secret }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="ceph_rbd_pool:">
                  <span>{{ culsterForm.storageConfig.pool }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="ceph_rbd_fsType:">
                  <span>{{ culsterForm.storageConfig.fsType }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="ceph_rbd_imageFormat:">
                  <span>{{ culsterForm.storageConfig.imageFormat }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="culsterForm.storageConfig.type=='local-volume' ">
              <el-col :span="6">
                <el-form-item label="路径:">
                  <span>{{ culsterForm.storageConfig.path }}</span>
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
        </el-card>
        <el-card>
          <div
            slot="header"
            class="clearfix"
          >
            <span>集群应用</span>
          </div>
          <el-form
            label-position="left"
            inline
            :model="culsterForm.otherConfig">
             <el-form-item label="集群应用" prop="type">
                <el-checkbox disabled label="告警"  name="type" v-model="culsterForm.otherConfig.alert_enable"></el-checkbox>
                <el-checkbox disabled label="监控" name="type" v-model="culsterForm.otherConfig.monitor_enable"></el-checkbox>
                <el-checkbox disabled label="日志" name="type" v-model="culsterForm.otherConfig.log_enable"></el-checkbox>
                <el-checkbox disabled label="dns缓存" name="type" v-model="culsterForm.otherConfig.dns_cache_enable"></el-checkbox>
                <el-checkbox disabled label="metric_server" name="type" v-model="culsterForm.otherConfig.metric_server_enable"></el-checkbox>
                <el-checkbox disabled label="ingress" name="type" v-model="culsterForm.otherConfig.ingress_enable"></el-checkbox>
                <el-checkbox disabled label="node问题检查" name="type" v-model="culsterForm.otherConfig.node_problem_detector_enable"></el-checkbox>      
            </el-form-item>
          </el-form>

        </el-card>
        <div class="text-center">      
          <el-button
            type="primary"
            :disabled="active==0"
            @click="upStep"
          >上一步</el-button>
          <el-button
            type="primary"
            :disabled="active==stepLists.length-1"
            @click="nextStep"
          >下一步</el-button>
          <el-button
            type=""
            :disabled="active < stepLists.length-1"
            @click="saveCluster"
          >保存</el-button>
        </div>
      </div>

    </div>
    <!-- <el-row :gutter="10">
      <el-col
        :xs="24"
        class="alignC"
      >
        <el-button
          type="primary"
          :disabled="active==0"
          @click="upStep"
        >上一步</el-button>
        <el-button
          type="primary"
          :disabled="active==stepLists.length-1"
          @click="nextStep"
        >下一步</el-button>
        <el-button
          type=""
          :disabled="active < stepLists.length-1"
          @click="saveCluster"
        >保存</el-button>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
const handle = [ '基本信息', '配置节点', '配置网络', '配置存储', '集群应用', '完成' ]
import BaseInfo from './baseInfo'
import NodeConfig from './nodeConfig'
import MirrorConfig from './mirrorConfig'
import NetworkConfig from './networkConfig'
import StorageConfig from './storageConfig'
import OtherConfig from './otherConfig'
import {submitInfo} from '../../../api/base/cluster'
export default {
  name: 'CulsterModify',
  components: {
    BaseInfo,
    NodeConfig,
    MirrorConfig,
    NetworkConfig,
    StorageConfig,
    OtherConfig
  },
  data() {
    return {
      stepLists: handle,
      active: 0,
      culsterName: '',
      culsterForm: {
        baseInfo: '',
        nodeConfig: '',
        mirrorConfig: '',
        networkConfig: '',
        storageConfig: '',
        otherConfig: ''
      }
    }
  },
  methods: {
    saveCluster() {
      console.log('kkk', this.culsterForm)
      let master_node=[],worker_node=[]
      this.$refs.nodeConfig.deployModel.master_node.forEach(e=>{
        master_node.push({
          id:e.value.id,
          role:e.value.role
        })
      })
       this.$refs.nodeConfig.deployModel.worker_node.forEach(e=>{
        worker_node.push({
          id:e.value.id,
          role:e.value.role
        })
      })
      let storageConfig={
        storage_type:this.$refs.storageConfig.storageConfig.storage_type,
        storage_plugin:{
            id:this.$refs.storageConfig.storageConfig.storage_plugin.id
          }
      }
      const params = {
          ...this.$refs.baseInfo.baseInfo,
          ...this.$refs.networkConfig.networkConfig,
          ...this.$refs.otherConfig.otherConfig,
          ...storageConfig,
          master_node,
          worker_node,
          
        }
        params.max_pod_num=parseInt(params.max_pod_num)
        console.log({params})
      submitInfo(params).then(res=>{
        if(res.status==200){
          this.$message.success('添加成功')
          this.$router.push({path:'/infrastructure/culster'})
        }
      })

      // this.$router.push({ path: 'clusterOverview', params: { culsterForm: this.culsterForm } })
    },

    nextStep() {
      // console.log('base',this.$refs.baseInfo)
      // this.$refs.baseInfo.$refs.baseInfo.validate((valid) => {
      //     if (valid) {
      //       alert('submit!');
      //     } else {
      //       console.log('error submit!!');
      //       return false;
      //     }
      //   });
      if (this.active <= this.stepLists.length) {
        this.active++
      }
      // if (this.active == 1) {
      //   this.culsterName = this.$refs.baseInfo.baseInfo.culsterName
      //   console.log(this.$refs.baseInfo)
      //   console.log(this.culsterName)
      // }
      // if(this.active==2){
      //   console.log(this.$refs.nodeConfig)
      // }
      if (this.active == 4) {
        this.culsterForm = {
          baseInfo: this.$refs.baseInfo.baseInfo,
          nodeConfig: this.$refs.nodeConfig.deployModel,
          networkConfig: this.$refs.networkConfig.networkConfig,
          storageConfig: this.$refs.storageConfig.storageConfig,
          otherConfig: this.$refs.otherConfig.otherConfig
        }
        console.log('this.culsterForm', this.culsterForm)
      }
    },
    upStep() {
      if (this.active > 0) {
        this.active--
      }
    },
    onSubmit() {
      this.$router.replace('/infrastructure')
    },
    cancel() {
      this.$router.replace('/infrastructure')
    }

  }
}
</script>

<style lang="scss" scoped>
@import "../../../styles/common.scss";
.culster-container {
  /deep/ .el-select .el-input__inner,
  .el-input {
    width: 300px;
  }
  .center-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    // margin: 0 auto;
    // width: 600px;
  }
  .tips-icon {
    cursor: pointer;
  }
  .input-width {
    width: 300px;
  }
  .steps-box {
    padding: 30px;
  }
  .steps-content {
    // padding: 0 300px;
    margin: 50px 0;
  }
  .el-card {
    margin-bottom: 20px;
  }
  .alignC {
    text-align: center;
  }
  .size-full.el-select {
    width: 100%;
  }
}
</style>
