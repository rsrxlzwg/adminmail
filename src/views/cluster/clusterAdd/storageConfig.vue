<template>
    <div  class="center-content">
         <el-form ref="culsterForm" :model="storageConfig" :rules="rules" label-width="200px" >
          <el-form-item label="存储类型" prop="storage_type">
              <el-select v-model="storageConfig.storage_type" placeholder="请选择项目">
                <el-option label="nfs" value="nfs"></el-option>
                <el-option label="ceph" value="ceph"></el-option>
                <el-option label="local-volume" value="local-volume"></el-option>
              </el-select>
          </el-form-item >
          <el-form-item prop="storage_plugin"  label="存储id" v-if="storageConfig.storage_type=='nfs' " @change="storageChange($event)">
              <el-select v-model="storageConfig.storage_plugin" value-key="id"  placeholder="请选择项目" >
                <el-option :label="options.name" :value="options" :key="options.id"  v-for="options in storageList"></el-option>
              </el-select>
          </el-form-item>
           <!-- <el-form-item label="NFSServer" v-if="storageConfig.storage_type=='nfs' ">
            <el-input v-model="storageConfig.NFSServer"></el-input>           
          </el-form-item>
       
          
           <el-form-item label="CephRbdMonitors" v-if="storageConfig.type=='ceph' ">
            <el-input v-model="storageConfig.monitors"></el-input>
          </el-form-item>
           <el-form-item label="CephRbdAdminSecret" v-if="storageConfig.type=='ceph' ">
            <el-input v-model="storageConfig.secret"></el-input>
          </el-form-item>
          <el-form-item label="CephRbdPool" v-if="storageConfig.type=='ceph' ">
            <el-input v-model="storageConfig.pool"></el-input>
          </el-form-item>
          <el-form-item label="CephRbdFsType" v-if="storageConfig.type=='ceph' ">
            <el-input v-model="storageConfig.fsType"></el-input>
          </el-form-item>
           <el-form-item label="CephRbdImageFormat" v-if="storageConfig.type=='ceph' ">
            <el-input v-model="storageConfig.imageFormat"></el-input>
          </el-form-item>
          <el-form-item label="RbdMonitors" v-if="storageConfig.type=='ceph' ">
            <el-input v-model="storageConfig.RbdMonitors"></el-input>
          </el-form-item>
           <el-form-item label="RbdAdminId" v-if="storageConfig.type=='ceph' ">
            <el-input v-model="storageConfig.RbdAdminId"></el-input>
          </el-form-item>
          <el-form-item label="RbdAdminSecret" v-if="storageConfig.type=='ceph' ">
            <el-input v-model="storageConfig.RbdAdminSecret"></el-input>
          </el-form-item>
           <el-form-item label="RbdPool" v-if="storageConfig.type=='ceph' ">
            <el-input v-model="storageConfig.RbdPool"></el-input>
          </el-form-item>
          <el-form-item label="RbdFsType" v-if="storageConfig.type=='ceph' ">
            <el-input v-model="storageConfig.RbdFsType"></el-input>
          </el-form-item>
           <el-form-item label="RbdImageFormat" v-if="storageConfig.type=='ceph' ">
            <el-input v-model="storageConfig.RbdImageFormat"></el-input>
          </el-form-item>
          <el-form-item label="路径" v-if="storageConfig.type=='local-volume'  ">
            <el-input v-model="storageConfig.localPath"></el-input>
          </el-form-item>  -->
         </el-form>
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
import {getList} from '../../../api/base/externalStorage'
export default {
 
  data(){
    return{
       storageConfig:{
          storage_type:'',
          storage_plugin: {
              id: ""
          },

          // nfs:'nfs',
          // localPath:'',
          // NFSServer:'192.168.1.20/24',
          // NFSPath:'/opt/mnt',
          // GLUSTERFS:'预留',
          // monitors:'172.24.0.3:6789',
          // secret:'TYPE_ADMIN_ACCOUNT_HERE',
          // pool: 'rbd',
          // fsType: 'ext4',
          // imageFormat: 1,
          // RbdMonitors:'',
          // RbdAdminId:'',    
          // RbdAdminSecret :'', 
          // RbdPool:'',         
          // RbdFsType :'',      
          // RbdImageFormat:''

        },
      storageList:[
        {
          id:'',
          name:''
        }
      ],
      rules:{
        storage_type:[
          { required: true, message: '请选择存储类型', trigger: 'change' },
        ],
         storage_plugin:[
          { required: true, message: '请选择存储id', trigger: 'change' },
        ]
      },
    }
  },
  mounted(){
    this.getList()
  },
  methods:{
    storageChange(e){
      console.log('e',e)
    },
      getList(){
        getList().then(res=>{
          this.storageList=res.data
        })
      },
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