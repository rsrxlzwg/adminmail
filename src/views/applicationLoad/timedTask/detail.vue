<template>
  <div>
    <el-card>
      <div class="flex-inline-between">
        <div class="flex">
          <svg-icon class-name="hostImg" icon-class="hostImg" />
          <div class="flex-1 m-l-15 flex-column-center">
            <span class="host-name m-r-10 m-b-5  bold">elasticsearch-logging-curator</span>
             <!-- <el-tag
                size="mini"
                type="success"
                effect="dark">
                健康
              </el-tag> -->
          </div>
        </div>
        <!-- <el-button size="mini" @click="visible=true">查看配置文件</el-button> -->

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
          <span>定时计划：</span>
          <span>0 1 * * *</span>
        </li>
         <li>
          <span>启动 Job 的期限（秒）：</span>
          <span>-</span>
        </li>
         <li>
          <span>保留完成 Job 数：</span>
          <span>3</span>
        </li>
          <li>
          <span>保留失败 Job 数：</span>
          <span>1</span>
        </li>
           <li>
          <span>并发策略：</span>
          <span>Allow</span>
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
                <el-table-column prop="no" label="任务名称" >
                  <template slot-scope="scope">
                    <el-link @click="$router.replace('detail')">elasticsearch-logging-curator-elasticsearch-curator-1603040400</el-link>
                  </template>
                </el-table-column>
                <el-table-column prop="status" label="状态" />
                <el-table-column prop="start" label="开始时间" />
                <el-table-column prop="end" label="结束时间" />
            </el-table>
          </el-card>
        </div>
        <div v-show="active===2">
          <el-card  >
            <div slot="header" class="clearfix">
              <span>标签</span>
            </div>
            <el-tag class="m-r-10"><span>app|</span> elasticsearch-curator</el-tag>
            <el-tag><span>release|</span>   elasticsearch-logging-curator</el-tag>
            <el-tag><span>chart|</span>   elasticsearch-curator-1.3.3</el-tag>
            <el-tag><span>heritage|</span>   Helm</el-tag>
            <el-tag><span>release|</span>   elasticsearch-logging-curator</el-tag>
          </el-card>
           <el-card  class="m-t-20">
            <div slot="header" class="clearfix">
              <span>注解</span>
            </div>
            <el-row class="annotation">
              <el-col class="m-r-20" :span="6">meta.helm.sh/release-name</el-col>
              <el-col :span="18">elasticsearch-logging-curator</el-col>
            </el-row>
             <el-row class="annotation m-t-20">
              <el-col class="m-r-20" :span="6">meta.helm.sh/release-namespace</el-col>
              <el-col :span="18">k8s-logging-system</el-col>
            </el-row>


          </el-card>

        </div>

        <!-- <el-card v-if="active===3">
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
        <el-button @click="visible = false" size="mini" >取 消</el-button>
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
             label:'任务记录',
             id:1
          },
          {
             label:'元数据',
             id:2
          }
        ],
        active:1,
        entercode:`
          apiVersion: v1
          items:
        - apiVersion: storage.k8s.io/v1
          kind: StorageClass
          metadata:
            creationTimestamp: "2020-10-12T06:37:22Z"
            managedFields:
            - apiVersion: storage.k8s.io/v1
              fieldsType: FieldsV1
              fieldsV1:
                f:provisioner: {}
                f:reclaimPolicy: {}
                f:volumeBindingMode: {}
              manager: kubectl
              operation: Update
              time: "2020-10-12T06:37:22Z"
            name: local-nfs-storage
            resourceVersion: "554"
            selfLink: /apis/storage.k8s.io/v1/storageclasses/local-nfs-storage
            uid: 2f0da038-69d4-42b5-beb7-ded440c5da49
          provisioner: nfs.io/local
          reclaimPolicy: Delete
          volumeBindingMode: Immediate
        kind: List
        metadata:
          resourceVersion: ""
          selfLink: ""
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
