<template>
    <div  class="center-content">
         <el-form ref="networkConfig" :model="networkConfig" :rules="rules" label-width="180px" >
          <el-form-item label="网络插件类型" prop="network_type">
               <el-select v-model="networkConfig.network_type" placeholder="请选择项目" >
                <el-option label="traefik" value="1"></el-option>
                <el-option label="nginx" value="2"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="kube-proxy 运行模式" prop="proxy_mode">
              <el-select v-model="networkConfig.proxy_mode" placeholder="请选择项目" >
                <el-option label="iptables" value="1"></el-option>
                <el-option label="ipvs" value="2"></el-option>
              </el-select>
            </el-form-item>
             <el-form-item label="POD CIDR" prop="pod_cidr">
              <el-input v-model="networkConfig.pod_cidr" type="text" ></el-input>           
            </el-form-item>
            <el-form-item label="Service CIDR" prop="svc_cidr">
              <el-input v-model="networkConfig.svc_cidr" type="text" ></el-input>
            </el-form-item>
           
             <el-form-item label="可运行POD数量" prop="max_pod_num">
            <el-input v-model="networkConfig.max_pod_num" type="number"></el-input>
          </el-form-item>
         </el-form>
         
         <!-- <div class="txt-grey">
           基于隧道，在任何网络环境下都可以正常工作
            优势是对物理网络环境没有特殊要求，只要宿主机IP层可以路由互通即可
            劣势是封包和解包耗费CPU性能，且额外的封装导致带宽浪费
         </div> -->
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
    </div>
</template>

<script>
export default {
 
  data(){
    return{
      networkConfig:{
          network_type:'',
          proxy_mode:'',
          pod_cidr:'',
          svc_cidr:'',
          max_pod_num:'',
        },
      rules:{
        network_type:[
          { required: true, message: '请选择插件', trigger: 'change' },
        ],
        proxy_mode:[
          { required: true, message: '请选择运行模式', trigger: 'change' },
        ],
        pod_cidr:[
          { required: true, message: '请输入POD CIDR', trigger: 'change' }
        ],
         svc_cidr:[
          { required: true, message: '请输入Service CIDR', trigger: 'blur' },
        ],
         max_pod_num:[
          { required: true, message: '请输入最大pod量', trigger: 'blur' },
        ],
      },
    }
  },
    methods:{
       upStep(){
         this.$emit('upStep')
      },
      nextStep(){
           this.$emit('nextStep')
        //  this.$refs.networkConfig.validate((valid) => {
        //   if (valid) {
        //     this.$emit('nextStep')
        //   } else {
        //     return false;
        //   }
        // });
      },
    }
  }
</script>

<style lang="scss" scoped>
@import '../../../styles/common.scss';

</style>