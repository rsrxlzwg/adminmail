<template>
    <div  class="center-content">
        <el-form ref="baseInfo" :model="baseInfo" :rules="rules" label-width="80px" >
          <!-- <el-form-item label="项目">
            <el-select v-model="baseInfo.project" placeholder="请选择项目" class="input-width">
              <el-option label="项目一" value="shanghai"></el-option>
              <el-option label="项目二" value="beijing"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="集群名称" prop="cluster_name">
            <el-input v-model="baseInfo.cluster_name" class="input-width" ></el-input>
          </el-form-item> 
           <el-form-item label="域名后缀" prop="domain_name">
            <el-input v-model="baseInfo.domain_name" class="input-width"></el-input>
          </el-form-item> 
          <!-- <el-form-item label="离线包">        
            <el-select v-model="culsterForm.baseInfo.pack" placeholder="请选择离线包" class="input-width">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item> -->
            <el-form-item label="配置镜像" prop="cluster_version">        
            <el-select v-model="baseInfo.cluster_version" placeholder="请选择部署模式" @change="modelChange" class="input-width"> 
               <!-- <el-option label="自动模式" value="1"></el-option>         -->
              <el-option label="v1" value="2"></el-option>         
            </el-select>
          </el-form-item>         
        </el-form>  
      <div class="text-center">
        <el-button
          type="primary"
          :disabled="true"
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
import BaseInfo from './baseInfo'
const auto=['基本信息','配置网络','配置存储','其它设置','完成']
const  handle=['基本信息','配置节点','配置网络','配置存储','集群应用','完成']

export default {
 
  data(){
    return{
      baseInfo:{
        "cluster_name": "",
        "domain_name": "",
        "cluster_version": "",
      },
      rules:{
         cluster_name:[
            { required: true, message: '请输入集群名称', trigger: 'blur' },
          ],
          domain_name:[
            { required: true, message: '请输入后缀名', trigger: 'blur' },
          ],
          cluster_version:[
            { required: true, message: '请选择镜像', trigger: 'change' }
          ],
      },
      stepLists: handle,
    }
  },
    methods:{
      upStep(){
         this.$emit('upStep')
      },
      nextStep(){
         this.$refs.baseInfo.validate((valid) => {
          if (valid) {
            this.$emit('nextStep')
          } else {
            return false;
          }
        });
      },
      modelChange(e){
            console.log(e)
            this.stepLists=handle
            // if(e==1){
            //   this.stepLists=auto
            // }else{
            //   this.stepLists=handle
            // }
            
          },
    }
  }
</script>

<style lang="scss" scoped>
@import '../../../styles/common.scss';

</style>