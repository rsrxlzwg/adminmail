<template>
    <div >
      <el-card>
          <div slot="header" class="clearfix">
            <span>master</span> 
            <el-popover
              placement="top-start"
              title="支持操作系统: CentOS  7.4  7.5  7.6  7.7  7.8  RedHat  7.4  7.5  7.6  7.7"
              width="600"
              trigger="hover"
              >
              <i class="el-icon-info m-l-5 tips-icon" style="color: #E6A23C;" slot="reference"></i>
            
              <div class="m-tb-20 bold">设备要求</div>
              <el-table :data="gridData">
                <el-table-column width="100" property="name" label="设备名称"></el-table-column>
                <el-table-column width="100" property="config" label="最低配置"></el-table-column>
                <el-table-column width="100" property="recommendConfig" label="推荐配置"></el-table-column>
                <el-table-column width="100" property="unit" label="单位"></el-table-column>
                <el-table-column width="100" property="remark" label="备注"></el-table-column>
              </el-table>
               <div class="m-tb-20 bold">磁盘要求</div>
              <el-table :data="diskData">
                <el-table-column width="100" property="name" label="设备名称"></el-table-column>
                <el-table-column width="100" property="config" label="最低配置"></el-table-column>
                <el-table-column width="100" property="recommendConfig" label="推荐配置"></el-table-column>
                <el-table-column width="100" property="unit" label="单位"></el-table-column>
                <el-table-column width="150" property="remark" label="备注"></el-table-column>
              </el-table>
            </el-popover> 
            
            <el-button style="float: right; padding: 3px 0"  type="text" @click="addMaster">新增</el-button>
          </div>
          <el-form ref="deployMaster" :model="deployModel"  :inline="true" label-width="100px" >
            <el-row v-for="(item ,index) in deployModel.master_node">
              <el-col :span="12">
                  {{culsterName}} 
              </el-col>
              <el-col :span="12">
                <el-form-item label="选择主机" prop="hostMaster">
                  <el-select v-model="item.value"  value-key="id" placeholder="请选择项目" class="input-width" >
                    <el-option :label="host.host_name" :key="host.id" :value="host" v-for="host in hostList"></el-option>
                  </el-select>
                </el-form-item>
                <el-button type="text" @click="delMaster(index)">删除</el-button>

              </el-col>
              
            </el-row>                  
          </el-form>
        </el-card>
      <el-card class="m-tb-20">
          <div slot="header" class="clearfix">
            <span>worker</span> 
             <el-popover
              placement="top-start"
              title="支持操作系统: CentOS  7.4  7.5  7.6  7.7  7.8  RedHat  7.4  7.5  7.6  7.7"
              width="600"
              trigger="hover"
              >
              <i class="el-icon-info m-l-5 tips-icon" style="color: #E6A23C;" slot="reference"></i>
            
              <div class="m-tb-20 bold">设备要求</div>
              <el-table :data="gridDataWoker">
                <el-table-column width="100" property="name" label="设备名称"></el-table-column>
                <el-table-column width="100" property="config" label="最低配置"></el-table-column>
                <el-table-column width="100" property="recommendConfig" label="推荐配置"></el-table-column>
                <el-table-column width="100" property="unit" label="单位"></el-table-column>
                <el-table-column width="100" property="remark" label="备注"></el-table-column>
              </el-table>
               <div class="m-tb-20 bold">磁盘要求</div>
              <el-table :data="diskData">
                <el-table-column width="100" property="name" label="设备名称"></el-table-column>
                <el-table-column width="100" property="config" label="最低配置"></el-table-column>
                <el-table-column width="100" property="recommendConfig" label="推荐配置"></el-table-column>
                <el-table-column width="100" property="unit" label="单位"></el-table-column>
                <el-table-column width="150" property="remark" label="备注"></el-table-column>
              </el-table>
            </el-popover>          
            <el-button style="float: right; padding: 3px 0" type="text" @click="addWorker">新增</el-button>
          </div>
          <el-form ref="deployWorker" :model="deployModel"  :inline="true" label-width="100px" >
            <el-row v-for="(item ,index) in deployModel.worker_node">
              <el-col :span="12">
                 {{culsterName}}  
              </el-col>
              <el-col :span="12">
                <el-form-item label="选择主机"  >
                  <el-select v-model="item.value" value-key="id" placeholder="请选择项目" >
                    <el-option :label="host.host_name" :key="host.id" :value="host" v-for="host in hostList"></el-option>
                  </el-select>
                </el-form-item>
                <el-button type="text" @click="delWorker(index)">删除</el-button>
              </el-col>            
            </el-row>                  
          </el-form>
        </el-card>   
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
import {getHost} from '../../../api/base/host'
export default {
  props:{
    culsterName:{
      type:String,
      default:''
    }
  },
  data(){
    return{
    rulesMaster:{
         hostMaster:[
            { required: true, message: '请选择主机', trigger: 'change' },
          ]
      },

      hostWorker:[
        { required: true, message: '请选择主机', trigger: 'change' },
      ],
     
      gridData: [{
          name: 'CPU 核心数',
          config: '2',
          recommendConfig: '4',
          unit:'个',
          remark:'无'
        },{
          name: '内存大小',
          config: '4',
          recommendConfig: '16',
          unit:'GB',
          remark:'无'
        }],
      diskData: [{
          name: '系统卷:',
          config: '50',
          recommendConfig: '100',
          unit:'BG',
          remark:'系统卷，用于运行操作系统'
        }],
      gridDataWoker: [{
          name: 'CPU 核心数',
          config: '2',
          recommendConfig: '8',
          unit:'个',
          remark:'无'
        },{
          name: '内存大小',
          config: '8',
          recommendConfig: '32',
          unit:'GB',
          remark:'无'
        }
      ],
      deployModel:{
          master_node:[
            {
              value:''
            }
          ],
          worker_node:[
            {
              value:''
            }
          ]
      },
      hostList:[]
    
    }
  },
  mounted(){
    this.getList()
  },
  methods:{
     upStep(){
         this.$emit('upStep')
      },
      nextStep(){
        //  this.$refs.deployWorker.validate((valid) => {
        //   if (valid) {
            this.$emit('nextStep')
          // } else {
          //   return false;
          // }
        // });
      },
      masterChange(val,item){      
        // const value=this.hostList.find(e=>{return e.id===val})
        // this.deployModel.master_node.forEach(item=>{
        //   item=value
        //   // if(item.id===value.id){
        //   //   item.role=value.role
        //   // }
        // })
      },
      workerChange(val,item){
        //  const value=this.hostList.find(e=>{return e.id===val})
        // this.deployModel.worker_node.forEach(item=>{
        //   if(item.id===value.id){
        //     item.role=value.role
        //   }
        // })
      },
      getList(){
        getHost().then(res=>{
          console.log('res',res)
          this.hostList=res.data
        })
      },
      addMaster(){
        this.deployModel.master_node.push({
          id:''
        })
      },
      delMaster(index){
        this.deployModel.master_node.splice(index,1)
      },
      addWorker(){
        this.deployModel.worker_node.push({
          id:''
        })
      },
      delWorker(index){
        this.deployModel.worker_node.splice(index,1)
      }
     
    }
  }
</script>

<style lang="scss" scoped>
@import '../../../styles/common.scss';

</style>