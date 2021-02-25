<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <div class="flex-inline-between center">
            <span>
              <svg-icon class-name="hostImg" icon-class="hostImg" />            
               <span class="data-name">local</span>
            </span>
            <el-button size="mini" @click="visible=true">查看配置文件</el-button>
          </div>
          <div class="m-t-60">
            <h3>详情</h3>
            <ul class="detain-info">
              <li>
                <span>存储源名字</span>
                <span>nfs-pv</span>
              </li>
               <li>
                <span>容量大小</span>
                <span>1G</span>
              </li>
               <li>
                <span>卷类型</span>
                <span>filesystem</span>
              </li>
               <li>
                <span>访问模式</span>
                <span>独享</span>
              </li>
               <li>
                <span>回收策略</span>
                <span>Delete</span>
              </li>
                <li>
                <span>状态绑定</span>
                <span>成功</span>
              </li>
              <li>
                <span>绑定卷名字</span>
                <span>default</span>
              </li>
                <li>
                <span>存储服务器</span>
                <span>10.6.188.1</span>
              </li>
               <li>
                <span>存储路径</span>
                <span>/var/data</span>
              </li>
             
               <li>
                <span>创建时间</span>
                <span>2020-10-09</span>
              </li>
            </ul>
          </div>

         
        </el-card>
      </el-col>
       <el-col :span="18">
        <el-card>
           <div slot="header" class="clearfix">
              <span>资源分配情况</span>
            </div>
            <el-table
              :data="tableData"
              style="width: 99%"
              stripe>
              <el-table-column label="名称" sortable>
                <template slot-scope="scope">
                  <el-link style="color:#409EFF" @click="$router.push('/storageResources/storageVolumeManagement/Storagevolumelist')">{{ scope.row.name }}</el-link>
                </template>
              </el-table-column>
              <el-table-column prop="status" label="状态" />
              <el-table-column prop="container" label="容量" />
              <el-table-column prop="mountStatus" label="挂载状态" />
              <el-table-column prop="item" label="项目" />
              <el-table-column prop="time" label="创建时间" />             
              <!-- <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    @click.native.prevent="detailRow(scope.row)"
                    type="text"
                    size="small">详情</el-button>
                </template>
              </el-table-column> -->
            </el-table>
        </el-card>
      </el-col> 
     
    </el-row>
     <el-dialog class="deepdialog" title="配置文件" :visible.sync="visible" width="60%">
      <component is="advanced" :entercode='entercode'></component>
  </el-dialog>
  </div>
</template>

<script>
import advanced from '../../components/advanced'


  export default {
     components:{
      advanced
    },
    data(){
      return{
        visible:false,
        entercode:`
        apiVersion: v1
        items:
        - apiVersion: v1
          kind: PersistentVolume
          metadata:
            annotations:
              pv.kubernetes.io/provisioned-by: nfs.io/local
            creationTimestamp: "2020-10-12T06:37:34Z"
            finalizers:
            - kubernetes.io/pv-protection
            managedFields:
            - apiVersion: v1
              fieldsType: FieldsV1
              fieldsV1:
                f:status:
                  f:phase: {}
              manager: kube-controller-manager
              operation: Update
              time: "2020-10-12T06:37:34Z"
            - apiVersion: v1
              fieldsType: FieldsV1
              fieldsV1:
                f:metadata:
                  f:annotations:
                    .: {}
                    f:pv.kubernetes.io/provisioned-by: {}
                f:spec:
                  f:accessModes: {}
                  f:capacity:
                    .: {}
                    f:storage: {}
                  f:claimRef:
                    .: {}
                    f:apiVersion: {}
                    f:kind: {}
                    f:name: {}
                    f:namespace: {}
                    f:resourceVersion: {}
                    f:uid: {}
                  f:nfs:
                    .: {}
                    f:path: {}
                    f:server: {}
                  f:persistentVolumeReclaimPolicy: {}
                  f:storageClassName: {}
                  f:volumeMode: {}
              manager: nfs-client-provisioner
              operation: Update
              time: "2020-10-12T06:37:34Z"
            name: pvc-ad17cc53-eea5-47c7-b27e-4fd44bdcc1d4
            resourceVersion: "1142"
            selfLink: /api/v1/persistentvolumes/pvc-ad17cc53-eea5-47c7-b27e-4fd44bdcc1d4
            uid: 9feba915-87d5-49ea-9bee-dc4ac9293d62
          spec:
            accessModes:
            - ReadWriteMany
            capacity:
              storage: 500Mi
            claimRef:
              apiVersion: v1
              kind: PersistentVolumeClaim
              name: grafana-pvc
              namespace: monitoring-system
              resourceVersion: "840"
              uid: ad17cc53-eea5-47c7-b27e-4fd44bdcc1d4
            nfs:
              path: /opt/data/monitoring-system-grafana-pvc-pvc-ad17cc53-eea5-47c7-b27e-4fd44bdcc1d4
              server: 192.168.169.6
            persistentVolumeReclaimPolicy: Delete
            storageClassName: local-nfs-storage
            volumeMode: Filesystem
          status:
            phase: Bound
        kind: List
        metadata:
          resourceVersion: ""
          selfLink: ""
        `,
        tableData:[
          {
            name:'data-redis',
            status:'准备就绪',
            container:'5G',
            mountStatus:'已挂载',
            item:'demo1',
            time:'2020-10.15'
          },
          {
            name:'data-redis',
            status:'准备就绪',
            container:'5G',
            mountStatus:'已挂载',
            item:'demo1',
            time:'2020-10.15'
          },
          {
            name:'data-redis',
            status:'准备就绪',
            container:'5G',
            mountStatus:'已挂载',
            item:'demo1',
            time:'2020-10.15'
          },
          {
            name:'data-redis',
            status:'准备就绪',
            container:'5G',
            mountStatus:'已挂载',
            item:'demo1',
            time:'2020-10.15'
          },
          {
            name:'data-redis',
            status:'准备就绪',
            container:'5G',
            mountStatus:'已挂载',
            item:'demo1',
            time:'2020-10.15'
          },
        ]
      }
    }
    
  }
</script>

<style lang="scss" scoped>
@import "../../../styles/common.scss";

.hostImg{
  width: 30px;
  height: 30px;
}
.data-name{
  color: #595f69;
  margin-left: 10px;
  font-weight: bold;
}
.detain-info{
  color: rgb(95, 112, 138);
  li{
    margin-bottom: 20px;
    span{
      display: inline-block;
      &:nth-child(1){
        width: 69%;  
      }
    }
   
  }
 
}
</style>