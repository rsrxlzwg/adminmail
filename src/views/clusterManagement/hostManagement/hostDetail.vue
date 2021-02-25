<template>
  <div>
    <el-card>
      <div class="flex-inline-between">
        <div class="flex">
          <svg-icon class-name="hostImg" icon-class="hostImg" />            
          <div class="flex-1 m-l-15 flex-column-center">
            <span class="host-name m-r-10 m-b-5  bold">master1</span>            
             <el-tag  
                size="mini"       
                type="success"
                effect="dark">
                健康
              </el-tag>
          </div>
        </div>
        <el-button size="mini" @click="backPage()">返回</el-button>
        
      </div>
      <el-divider></el-divider>
      <ul class="flex-wrap detail-info">
        <li>
          <span>角色：</span>
          <span>控制器、镜像仓库</span>
        </li>
         <li>
          <span>控制ip：</span>
          <span>10.0.5.150</span>
        </li>
         <li>
          <span>污点：</span>
          <span>node-role.kubernetes.io</span>
        </li>
         <li>
          <span>创建时间：</span>
          <span>1个月前</span>
        </li>
         <li>
          <span>cpu使用率：</span>   
          <span>
            <el-progress :percentage="3" :stroke-width="10" :format="format1" />
          </span>
        </li>
         <li>
          <span>内存使用率：</span>   
          <span>
            <el-progress :percentage="3" :stroke-width="10" :format="format1" />
          </span>
        </li>
          <li>
          <span>正常运行时间：</span>   
          <span>4天</span>
        </li>
        <li>
          <span>操作系统：</span>   
          <span>CentOS Linux 8 (Core)</span>
        </li>
      </ul>
      
    </el-card>
    <el-row :gutter="20" class="m-t-20">
      <el-col :span="4">
        <el-card>
          <ul class="menulists">
            <li v-for="item in menus" :class="item.id===active?'active':'' " @click="changeMenu(item.id)">{{item.label}}</li>
          </ul>
        </el-card>
      </el-col>
      <el-col :span="20" >
        <div v-show="active===1">
          <el-card  > 
             <div slot="header" class="clearfix">
              <span>资源分配情况</span>
            </div>
            <table class="tabel-resource">
              <tr v-for="tr in tables">
                <td>{{tr.label}}</td>
                <td>
                  <div>
                    <span>{{tr.desc}}</span>
                  <el-progress :percentage="tr.value" :stroke-width="tr.totle" :format="format1" />
                  </div>
                </td>
              </tr>
            </table>
          </el-card>
          <el-card  style="margin-top:20px">
            <div slot="header" class="clearfix">
              <span>标签</span>
            </div>
             <el-table
              :data="tagData"
              style="width: 99%"
              highlight-current-row>
                <el-table-column prop="key" label="键" />
                <el-table-column prop="value" label="值" />
            </el-table>       
          </el-card>
          <el-card  style="margin-top:20px">
            <div slot="header" class="clearfix">
              <span>注解</span>
            </div>
             <el-table
              :data="notesData"
              style="width: 99%"
              highlight-current-row>
                <el-table-column prop="key" label="键" />
                <el-table-column prop="value" label="值" />
            </el-table>       
          </el-card>
           <el-card  style="margin-top:20px">
            <div slot="header" class="clearfix">
              <span>kubernetes 现状</span>
            </div>
             <el-table
              :data="kubernetesData"
              style="width: 99%"
              highlight-current-row>
                <el-table-column prop="type" label="类型" />
                <el-table-column prop="status" label="状态" />
                <el-table-column prop="heart" label="最近心跳时间" />
                <el-table-column prop="change" label="最近变化时间" />
                <el-table-column prop="reason" label="原因" />
                <el-table-column prop="news" label="消息" />
            </el-table>       
          </el-card>

        </div>
        <div v-show="active===2">
          <el-card  > 
             <div slot="header" class="clearfix">
              <span>kubelet 系统信息</span>
            </div>
            <table class="tabel-resource">
              <tr v-for="tr in kubeletData">
                <td>{{tr.label}}</td>
                <td>{{tr.value}}</td>
              </tr>
            </table>
          </el-card>
            <el-card  class="m-t-10"> 
             <div slot="header" class="clearfix">
              <span>Docker 系统</span>
            </div>
            <table class="tabel-resource">
              <tr v-for="tr in DockerData">
                <td>{{tr.label}}</td>
                <td>{{tr.value}}</td>
              </tr>
            </table>
          </el-card>
        </div>
        <div v-show="active===3">
          <el-card  >
            <div slot="header" class="clearfix">
              <span>概览</span>
            </div>
            <table class="tabel-resource">
              <tr v-for="tr in overviewData">
                <td>{{tr.label}}</td>
                <td>{{tr.value}}</td>
              </tr>
            </table>
                                             
          </el-card>
           <el-card  class="m-tb-10">
            <div slot="header" class="clearfix">
              <span>CPU</span>
            </div>
            <table class="tabel-resource">
              <tr v-for="tr in cpuData">
                <td>{{tr.label}}</td>
                <td>{{tr.value}}</td>
              </tr>
            </table>                                           
          </el-card>
           <el-card  >
            <div slot="header" class="clearfix">
              <span>内存</span>
            </div>
            <table class="tabel-resource">
              <tr v-for="tr in memoryData">
                <td>{{tr.label}}</td>
                <td>{{tr.value}}</td>
              </tr>
            </table>                                  
          </el-card>
          <el-card class="m-tb-10">
            <div slot="header" class="clearfix">
              <span>网络设备</span>
            </div>
            <el-table
              :data="networkData"
              style="width: 99%"
              highlight-current-row>
                <el-table-column prop="equipment" label="设备" />
                <el-table-column prop="MAC" label="MAC 地址" />
                <el-table-column prop="IPv4" label="IPv4 地址" />
                <el-table-column prop="equipmentName" label="设备名" />
                <el-table-column prop="supplier" label="供应商" />
              </el-table>
        </el-card> 
         <el-card >
            <div slot="header" class="clearfix">
              <span>图形设备</span>
            </div>
            <el-table
              :data="graphicsData"
              style="width: 99%"
              highlight-current-row>
                <el-table-column prop="host" label="主机" />
                <el-table-column prop="supplier" label="供应商" />
                <el-table-column prop="type" label="类型" />
              </el-table>
        </el-card>
        </div>
        <div v-show="active===4">
          <el-card>
             <el-table
            :data="containerData"
            style="width: 99%"
            highlight-current-row>
              <el-table-column prop="container" label="容器组" >
                 <template slot-scope="scope">
                   <el-link @click="$router.push('/applicationLoad/workload/containerGroup')">{{scope.row.container}}</el-link>
                 </template>
              </el-table-column>
              <el-table-column prop="ipv4" label="ipv4" />
              <el-table-column prop="host" label="主机" />
              <el-table-column prop="mirror" label="镜像" />
              <el-table-column prop="rurning" label="运行中" />
              <el-table-column prop="status" label="状态" />
              <el-table-column prop="restart" label="重启" />
              <el-table-column prop="cpu" label="cpu" />
              <el-table-column prop="memory" label="内存" />
              <el-table-column prop="create" label="创建时间" />
               <el-table-column  label="操作" >
                 <template slot-scope="scope">
                  <el-button @click="console(scope.$index,scope.row)" type="text" size="small">控制台</el-button>
                  <el-button @click="containerDel(scope.$index)" type="text" size="small">删除</el-button>
                </template>
               </el-table-column>
            </el-table>
          </el-card>
        </div>
        <el-card v-if="active===5">
          <div class="chartsBox">
            <line-charts  :lineData=memoryCharts></line-charts>
          </div>
           <div class="chartsBox">
            <line-charts  :lineData=cpuCharts></line-charts>
          </div>
           <div class="chartsBox">
            <line-charts  :lineData=hitData></line-charts>
          </div>
        </el-card>
      </el-col>
    </el-row>

   <el-dialog class="deepdialog" title="控制台" :visible.sync="containerVisible" width="30%">
      <el-form :model="form" label-width="80px">
        <el-form-item label="容器组" >
          <el-select  v-model="form.group" size="mini" >
            <el-option :label="item.label" :value="item.value" :key="item.value" v-for="item in groupItem"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="容器" >
          <el-select  v-model="form.container" size="mini" >
              <el-option :label="item.label" :value="item.value" :key="item.value" v-for="item in containerItem"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="containerVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="containerVisible = false" size="mini">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import LineCharts from '@/components/Charts/lineCharts'

  export default {
    components: {
      LineCharts
    },
    data(){
      return{
        containerVisible:false,
        form:{
          group:'calico-kube-controllers-c469f555b-gqwnn',
          container:'calico-kube-dsd44'
        },
        groupItem:[
          {
            label:'calico-kube-controllers-c469f555b-gqwnn',
            value:'calico-kube-controllers-c469f555b-gqwnn'
          }
        ],
        containerItem:[
          {
            label:'calico-kube-controllers-c469f555b-gqwnn',
            value:'calico-kube-dsd44'
          }
        ],
        memoryCharts:{       
          name: '内存',
          xAxisData:["2020-05-11", "2020-05-12", "2020-05-13", "2020-05-14", "2020-05-15", "2020-05-16", "2020-05-17", "2020-05-18", "2020-05-19", "2020-05-20", "2020-05-21", "2020-05-22", "2020-05-23", "2020-05-24", "2020-05-25", "2020-05-26", "2020-05-27", "2020-05-28", "2020-05-29", "2020-05-30", "2020-05-31", "2020-06-01", "2020-06-02", "2020-06-03", "2020-06-04", "2020-06-05", "2020-06-06", "2020-06-07", "2020-06-08", "2020-06-09", "2020-06-10"],
          data: [
            {
              name:'内存占用',
             value: [43, 58, 195, 229, 320, 211, 124, 131, 124, 360, 124, 78, 160, 200, 17, 0, 0, 0, 2, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
          ],   
          color:['rgba(18,61,172,0.5)'],
          title:'在线节点状态'       
        },
        cpuCharts:{
          name:'cpu',
          data: [
            {
              name:"cpu",
             value: [23, 39, 118, 71, 116, 89, 58, 71, 51, 146, 31, 41, 61, 185, 5, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
          ],
          xAxisData:["2020-05-11", "2020-05-12", "2020-05-13", "2020-05-14", "2020-05-15", "2020-05-16", "2020-05-17", "2020-05-18", "2020-05-19", "2020-05-20", "2020-05-21", "2020-05-22", "2020-05-23", "2020-05-24", "2020-05-25", "2020-05-26", "2020-05-27", "2020-05-28", "2020-05-29", "2020-05-30", "2020-05-31", "2020-06-01", "2020-06-02", "2020-06-03", "2020-06-04", "2020-06-05", "2020-06-06", "2020-06-07", "2020-06-08", "2020-06-09", "2020-06-10"],
          color:['rgba(115,226,226,0.5)'],
        },
        hitData:{
          name:'网络',
          data: [
            {
              name:'接收速率',
              value:[20, 37, 91, 72, 68, 67, 54, 42, 42, 115, 41, 33, 64, 112, 4, 0, 0, 0, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            },
            {
              name:'发送速率',
             value:[0, 0, 0, 229, 320, 211, 124, 131, 124, 360, 124, 78, 160, 200, 17, 55, 0, 0, 2, 8, 0, 0, 99, 0, 156, 0, 143, 0, 244, 0, 98]
            }
          ],
          xAxisData:["2020-05-11", "2020-05-12", "2020-05-13", "2020-05-14", "2020-05-15", "2020-05-16", "2020-05-17", "2020-05-18", "2020-05-19", "2020-05-20", "2020-05-21", "2020-05-22", "2020-05-23", "2020-05-24", "2020-05-25", "2020-05-26", "2020-05-27", "2020-05-28", "2020-05-29", "2020-05-30", "2020-05-31", "2020-06-01", "2020-06-02", "2020-06-03", "2020-06-04", "2020-06-05", "2020-06-06", "2020-06-07", "2020-06-08", "2020-06-09", "2020-06-10"],
          color:['rgba(242, 196, 123,0.5)','rgba(255,126,133,0.5)'],
        },
        containerData:[
          {
            container:'uds-storage-server-6df5d444b9-xrvfg',
            ipv4:'172.29.241.69',
            host:'master',
            mirror:'kube-system/kube-agent-parcel-calico-node:v3.13.1',
            rurning:'1/1',
            status:'运行中',
            restart:'0 次',
            cpu:'0.800 核',
            memory:'0.800 核',
            create:'16 天前'
          },
          {
            container:'uds-storage-server-6df5d444b9-xrvfg',
            ipv4:'172.29.241.69',
            host:'master',
            mirror:'kube-system/kube-agent-parcel-calico-node:v3.13.1',
            rurning:'1/1',
            status:'运行中',
            restart:'0 次',
            cpu:'0.800 核',
            memory:'0.800 核',
            create:'16 天前'
          },
          {
            container:'uds-storage-server-6df5d444b9-xrvfg',
            ipv4:'172.29.241.69',
            host:'master',
            mirror:'kube-system/kube-agent-parcel-calico-node:v3.13.1',
            rurning:'1/1',
            status:'运行中',
            restart:'0 次',
            cpu:'0.800 核',
            memory:'0.800 核',
            create:'16 天前'
          },
        ],
        graphicsData:[
          {
            host:'SVGA II Adapter',
            supplier:'VMware',
            type:'VGA compatible controller'
          }
        ],
        networkData:[
          {
            equipment:'kube-agent-mng',
            MAC:'00:50:56:9b:67:49',
            IPv4:'10.0.5.150',
            equipmentName:'VMXNET3 Ethernet Controller',
            supplier:'VMware'
          }
        ],
        memoryData:[
          {
            label:'总计		',
            value:'31.25 G'
          },
          {
            label:'使用量	',
            value:'4.27 G'
          },
          {
            label:'swap 总计	',
            value:'0.00 G'
          },
          {
            label:'swap 使用量		',
            value:'0.00 G'
          },
        ],
        cpuData:[
          {
            label:'型号		',
            value:'Intel(R) Xeon(R) CPU E5-2630 v3 @ 2.40GHz'
          },
          {
            label:'CPU 	',
            value:'架构	x86_64'
          },
           {
            label:'CPU 频率	',
            value:'2.40 GHz'
          },
          {
            label:'CPU 插槽数	',
            value:'16'
          },
           {
            label:'每个插槽的 CPU 内核数		',
            value:'1'
          },
          {
            label:'CPU 内核数	',
            value:'16'
          },
           {
            label:'逻辑 CPU 数		',
            value:'16'
          },
          {
            label:'超线程	',
            value:'不支持'
          }
        ],
        overviewData:[
          {
            label:'制造商		',
            value:'VMware, Inc.'
          },
          {
            label:'主机型号',
            value:'	VMware Virtual Platform	'
          },
          {
            label:'虚拟化	',
            value:'该主机是基于 vmware 的虚拟设备'
          },
        ],
        DockerData:[
          {
            label:'容器数		',
            value:'49 / 59 (运行中/总数)'
          },
          {
            label:'镜像数		',
            value:'48'
          },
          {
            label:'Docker 版本		',
            value:'19.03.8'
          },
          {
            label:'docker 容器存储		',
            value:'基于 overlay2 驱动	'
          },
          {
            label:'日志驱动			',
            value:'json-file	'
          },
          {
            label:'内核版本			',
            value:'4.18.0-147.el8.x86_64	'
          },
          {
            label:'操作系统			',
            value:'CentOS Linux 8 (Core)	'
          },
        ],
        kubeletData:[
          {
            label:'控制 IP 地址	',
            value:'10.0.5.150'
          },
          {
            label:'主机名称	',
            value:'master01'
          },
          {
            label:'PodCIDR		',
            value:'172.30.0.0/24'
          },
           {
            label:'容器组数	',
            value:'23'
          },
           {
            label:'Kubelet 版本		',
            value:'v1.18.6'
          },
        ],
        kubernetesData:[
          {
            type:'KubeApiServerProxyNotReady',
            status:'False',
            heart:'1小时前',
            change:'10小时前',
            reason:'KubeApiServerProxyReady',
            news:'kube apiserver proxy is posting ready status.'
          },
          {
            type:'Ready',
            status:'True',
            heart:'1小时前',
            change:'1天前',
            reason:'KubeletReady',
            news:'kubelet is posting ready status.'
          }
        ],
        notesData:[
           {
            key:'node.alpha.kubernetes.io/ttl',
            value:'0'
          },
          {
            key:'volumes.kubernetes.io/controller-managed-attach-detach',
            value:'true'
          },
        ],
        tagData:[
          {
            key:'beta.kubernetes.io/arch',
            value:'amd64'
          },
          {
            key:'beta.kubernetes.io/os',
            value:'linux'
          },
           {
            key:'kubernetes.io/arch',
            value:'amd64'
          },
          {
            key:'kubernetes.io/hostname',
            value:'master01'
          },
        ],
        tables:[
          {
            label:'CPU 分配情况',
            value:60,
            totole:10,
            desc:'已占用 6.25 核，共 16 核（其中 0.5 核为系统占用）'
          },
           {
            label:'内存分配情况',
            value:30,
            totole:10,
            desc:'已占用 10.19 G，共 31.25 G（其中 0.6 G为系统占用'
          },
           {
            label:'容器组分配情况',
            value:50,
            totole:10,
            desc:'已占用 23 个，共 110 个'
          }
        ],
        menus:[
          {
             label:'概览',
             id:1
          },
          {
             label:'系统',
             id:2
          },
          {
             label:'硬件',
             id:3
          },
          {
             label:'容器组',
             id:4
          },{
            label:'性能',
            id:5
          }
        ],
        active:4,
      }
    },
    methods:{
      containerDel(i){
        this.$confirm('删除容器组，请确保业务数据保存在存储中。', '您确定要删除该数据吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.containerData.splice(i,1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      console(){
        this.containerVisible=true
      },
      backPage(){
        this.$router.replace('hostManagement')
      },
      changeMenu(id){
        this.active=id
      },
      format1(percentage) {
        // return percentage === 100 ? "满" : `${percentage}%`;
        return "";
      },
    }
  }
</script>

<style lang="scss" scoped>
@import "../../../styles/common.scss";
.chartsBox{
  display: inline-block;
  width: 50%;
}
.hostImg{
  width: 40px;
  height: 40px;
}
.host-name{
  // display: block;
  color: #595f69;
}
.host-desc{
  
}
.tabel-resource{
  width: 100%;
  color: #9ba3af;
  border: 1px solid #e4e7ed;
  border-radius: 3px;
  text-align: left;
  margin: 0;
  width: 100%;
  overflow: visible;
  margin-bottom: 20px;
  tr{
    display: flex;
    flex: 1;
    border-color: #e4e7ed;
    border-bottom: 1px solid #f1f3f6;
    td{
      width: 0;
      padding: 10px 10px;
      // height: 40px;
      line-height: 40px;
      font-weight: 400;
      font-size: 14px;
      color: #595f69;
      border-color: #e4e7ed;
      word-break: break-all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
      flex: 1 1 auto;
      flex-basis: auto!important;
      position: relative;
      margin: auto;
    }
  }
  tr:last-child {
  border-bottom: none!important;
  }
}
.detail-info{
  li{
    width: 25%;
    display: flex;
    margin-bottom: 20px;
    // color: #9ba3af;
    font-size: 13px;
    span{
      &:nth-child(2){
        flex: 1;
      }
    }
  }
}

  .menulists{
  font-size: 14px;
  margin-bottom: 10px;
  padding: 0;
  list-style-type: none;
  border-radius: 4px;
   font-weight: bold;
  // box-shadow: 0 1px 4px 0 rgba(204,209,217,.3);
  li{
    line-height: 40px;
    position: relative;
    height: 40px;
    // padding: 0 10px;
    cursor: pointer;
    color: #9ba3af;
    // border: 1px solid #e4e7ed;
    border-bottom: 1px solid #e4e7ed;
    // background-color: #f5f7fa;
    // text-shadow: 0 1px 0 hsla(0,0%,100%,.9);

  }
  .active{
    color: #000;
    background-color: #fff;   
  }
}
</style>