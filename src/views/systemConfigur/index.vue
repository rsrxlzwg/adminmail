<template>
  <!-- 系统配置 -->
  <div>
    <el-card>
      <div slot="header" class="clearfix ">
          <span>es集群配置信息</span>
         <el-button  icon="el-icon-edit" size="mini" style="float: right; padding: 3px 10px" @click="showEsConfig"></el-button>
      </div>
      <div>
         <el-form  :model="esConfig" label-width="80px" class="demo-form-inline">
           <el-row>
             <el-col :span="12">
                <el-form-item label="ip">
                  <el-input v-model="esConfig.ip" placeholder="" disabled></el-input>
                </el-form-item>
             </el-col>
             <el-col :span="12">
                <el-form-item label="端口">
                  <el-input v-model="esConfig.port" placeholder="" disabled></el-input>
                </el-form-item>
             </el-col>
           </el-row>      
         </el-form>
      </div>
    </el-card>
     <el-card class="m-t-40">
      <div slot="header" class="clearfix">
        <span>镜像仓库配置信息</span>
        <el-button  icon="el-icon-edit" size="mini" style="float: right; padding: 3px 10px" @click="showMirroringConfig"></el-button>
      </div>
      <div>
         <el-form  :model="mirroringConfig" label-width="80px" class="demo-form-inline">
           <el-row>
             <el-col :span="12">
                <el-form-item label="ip">
                  <el-input v-model="mirroringConfig.ip" placeholder="" disabled></el-input>
                </el-form-item>
             </el-col>
             <el-col :span="12">
                <el-form-item label="端口">
                  <el-input v-model="mirroringConfig.port" placeholder="" disabled></el-input>
                </el-form-item>
             </el-col>
           </el-row> 
            <el-row>
             <el-col :span="12">
                <el-form-item label="用户名">
                  <el-input v-model="mirroringConfig.userName" placeholder="" disabled></el-input>
                </el-form-item>
             </el-col>
             <el-col :span="12">
                <el-form-item label="密码">
                  <el-input v-model="mirroringConfig.password" placeholder="" disabled></el-input>
                </el-form-item>
             </el-col>
           </el-row>     
         </el-form>
      </div>
    </el-card>
<!-- es编辑  -->
   <el-dialog class="deepdialog" title="es集群配置" :visible.sync="esEditVisible">
      <el-form :model="esEditConfig">
        <el-form-item label="ip" :label-width="formLabelWidth">
          <el-input v-model="esEditConfig.ip" autocomplete="off"></el-input>

        </el-form-item>
        <el-form-item label="port" :label-width="formLabelWidth">
          <el-input v-model="esEditConfig.port" autocomplete="off"></el-input>
        </el-form-item>
      
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="esEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="esEditVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 镜像编辑 -->
     <el-dialog class="deepdialog" title="镜像仓库配置" :visible.sync="mirroringEditVisible">
      <el-form :model="mirroringEditConfig">
        <el-form-item label="ip" :label-width="formLabelWidth">
          <el-input v-model="mirroringEditConfig.ip" autocomplete="off"></el-input>

        </el-form-item>
        <el-form-item label="port" :label-width="formLabelWidth">
          <el-input v-model="mirroringEditConfig.port" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input v-model="mirroringEditConfig.userName" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="mirroringEditConfig.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="mirroringEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="mirroringEditVisible = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
      data() {
        return {
          esConfig: {
            ip: "http:172.168.5.173",
            port:'32684'
          },
           mirroringConfig:{
              ip: "http:172.168.5.173",
              port:'',
              userName:'admin',
              password:'admin123'
           },
            esEditConfig: {
            ip: "",
            port:''
          },
            mirroringEditConfig:{
              ip: "",
              port:'',
              userName:'',
              password:''
           },
           formLabelWidth:'120px',
           mirroringEditVisible:false,
           esEditVisible:false       
        };
  },
  methods:{
    showEsConfig(){
      this.esEditConfig=this.esConfig
      this.esEditVisible=true
    },
    showMirroringConfig(){
      this.mirroringEditConfig=this.mirroringConfig
      this.mirroringEditVisible=true
    }
  }
    
  }
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';


</style>