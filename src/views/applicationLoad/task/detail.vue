<template>
  <div>
    <el-card>
      <div class="flex-inline-between">
        <div class="flex">
          <svg-icon class-name="hostImg" icon-class="hostImg" />            
          <div class="flex-1 m-l-15 flex-column-center">
            <span class="host-name m-r-10 m-b-5 bold">elasticsearch-logging-curator</span>            
             <!-- <el-tag  
                size="mini"       
                type="success"
                effect="dark">
                健康
              </el-tag> -->
          </div>
        </div>
        <el-button size="mini" @click="visible=true">查看配置文件</el-button>
        
      </div>
      <el-divider></el-divider>
      <ul class="flex-wrap detail-info">
        <li>
          <span>集群：</span>
          <span>host</span>
        </li>
         <li>
          <span>项目：</span>
          <span>k8s-logging-system</span>
        </li>
         <li>
          <span>状态：</span>
          <span>已完成</span>
        </li>
         <li>
          <span>容忍限制：</span>
          <span>6</span>
        </li>
         <li>
          <span>完成数：</span>   
          <span>1</span>
        </li>
         <li>
          <span>并发数：</span>   
          <span>1</span>
        </li>
          <li>
          <span>唤醒时间：</span>   
          <span>-</span>
        </li>
        <li>
          <span>创建时间：</span>   
          <span>2020-10-20 01:00:07</span>
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
              <span>执行记录</span>
            </div>
            <el-table
              :data="recordData"
              style="width: 99%"
              highlight-current-row>
                <el-table-column prop="no" label="序号" />
                <el-table-column prop="status" label="状态" />
                <el-table-column prop="msg" label="消息" />
                <el-table-column prop="start" label="开始时间" />
                <el-table-column prop="end" label="开始时间" />
            </el-table> 
          </el-card>
        </div>
        <!-- <div v-show="active===2">
          <el-card  > 
             <div slot="header" class="clearfix">
              <span>容器组</span>
            </div>
             <el-table
              :data="groupData"
              style="width: 99%"
              highlight-current-row>             
                <el-table-column prop="name" label="名称" />
                <el-table-column prop="node" label="节点" />
                <el-table-column prop="ip" label="容器组ip" />
            </el-table> 
          </el-card>
         
        </div> -->
        <div v-show="active===2">
          <el-card  >
            <div slot="header" class="clearfix">
              <span>标签</span>
            </div>
            <el-tag class="m-r-10"><span>app|</span> elasticsearch-curator</el-tag>
            <el-tag><span>release|</span>   elasticsearch-logging-curator</el-tag>
          </el-card>
           <el-card  class="m-t-20">
            <div slot="header" class="clearfix">
              <span>注解</span>
            </div>
            <el-row class="annotation">
              <el-col class="m-r-20" :span="3">revisions</el-col>
              <el-col :span="21">{"1":{"status":"completed","succeed":1,"desire":1,"uid":"8cc679ad-764c-4115-adbf-57eb35fa7119","start-time":"2020-10-20T01:00:07+08:00","completion-time":"2020-10-20T01:00:12+08:00"}}</el-col>
            </el-row>
           
                                             
          </el-card>
     
        </div>
        <div v-show="active===3">
          <el-card>
             <div slot="header" class="clearfix">
              <span>容器: elasticsearch-curator</span>
            </div>
          </el-card>
        </div>
        <!-- <el-card v-if="active===5">
          <div slot="header" class="clearfix">
              <span>事件</span>
            </div>
              <el-table
              :data="eventData"
              style="width: 99%"
              highlight-current-row>
                <el-table-column prop="type" label="类型" />
                <el-table-column prop="resion" label="原因" />
                <el-table-column prop="time" label="发生时间" />
                <el-table-column prop="origin" label="来源" />
                <el-table-column prop="msg" label="消息" />
            </el-table> 
            
        </el-card> -->
      </el-col>
    </el-row>

   <el-dialog class="deepdialog" title="控制台" :visible.sync="visible" width="60%">
      <component is="advanced" :entercode='entercode'></component>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="visible = false" size="mini">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import LineCharts from '@/components/Charts/lineCharts'
import advanced from '../../components/advanced'


  export default {
    components: {
      LineCharts,
      advanced
    },
    data(){
      return{
        visible:false,
        recordData:[
           {
              no:'1',
              status:'已完成 (1/1)',
              msg:'-',
              start:'2020-10-20 01:00:07',
              end:'2020-10-20 01:00:12'
            }
        ],
        groupData:[
          {
                name:'elasticsearch-logging-curator-elasticsear',
                node:'node2(192.168.12.12)',
                ip:'10.233.96.147'
              }
        ], 
        eventData:[
           {
                type:'',
                resion:'',
                time:'',
                origin:'',
                msg:''
              }
        ],   
        menus:[
          {
             label:'执行记录',
             id:1
          },
        
          {
             label:'元数据',
             id:2
          },
          {
             label:'环境变量',
             id:3
          }
        ],
        active:1,
        entercode:`
          apiVersion: batch/v1
          kind: Job
          metadata:
            annotations:
            creationTimestamp: "2020-10-12T06:37:30Z"
            labels:
              app.kubernetes.io/component: admission-webhook
              helm.sh/chart: ingress-nginx-2.9.0
            managedFields:
            - apiVersion: batch/v1
              fieldsType: FieldsV1
              manager: kubectl
              operation: Update
              time: "2020-10-12T06:37:30Z"
            - apiVersion: batch/v1
              fieldsType: FieldsV1
              fieldsV1:
                f:status:
                  f:startTime: {}
                  f:succeeded: {}
              manager: kube-controller-manager
              operation: Update
              time: "2020-10-12T06:37:49Z"
            name: ingress-nginx-admission-create
            namespace: ingress-nginx
            resourceVersion: "1419"
            selfLink: /apis/batch/v1/namespaces/ingress-nginx/jobs/ingress-nginx-admission-create
            uid: 3d2a115a-92b5-4d4d-ab5c-57141fe7e6e2
          spec:
            backoffLimit: 6
            completions: 1
            parallelism: 1
            selector:
              matchLabels:
                controller-uid: 3d2a115a-92b5-4d4d-ab5c-57141fe7e6e2
            template:
              metadata:
                creationTimestamp: null
                labels:
                  app.kubernetes.io/component: admission-webhook
                  job-name: ingress-nginx-admission-create
                name: ingress-nginx-admission-create
              spec:
                containers:
                - args:
                  - create
                  - --host=ingress-nginx-controller-admission,ingress-nginx-controller-admission.ingress-nginx.svc
                  - --namespace=ingress-nginx
                  - --secret-name=ingress-nginx-admission
                  image: docker.io/jettech/kube-webhook-certgen:v1.2.0
                  imagePullPolicy: IfNotPresent
                  name: create
                  resources: {}
                  terminationMessagePath: /dev/termination-log
                  terminationMessagePolicy: File
                dnsPolicy: ClusterFirst
                restartPolicy: OnFailure
                schedulerName: default-scheduler
                securityContext:
                  runAsNonRoot: true
                  runAsUser: 2000
                serviceAccount: ingress-nginx-admission
                serviceAccountName: ingress-nginx-admission
                terminationGracePeriodSeconds: 30
          status:
            completionTime: "2020-10-12T06:37:49Z"
            conditions:
            - lastProbeTime: "2020-10-12T06:37:49Z"
              lastTransitionTime: "2020-10-12T06:37:49Z"
              status: "True"
              type: Complete
            startTime: "2020-10-12T06:37:40Z"
            succeeded: 1
        `,
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
.annotation{
  background-color: #eff4f9;
  border: 1px solid #ccd3db;
  padding: 20px;
  border-radius: 10px;
  color:  #79879c;
  font-size:13px;
  
}
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