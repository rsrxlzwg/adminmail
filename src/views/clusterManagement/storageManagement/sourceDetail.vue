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
                <span>供应者：</span>
                <span>open</span>
              </li>
               <li>
                <span>默认存储类型：</span>
                <span>是</span>
              </li>
               <li>
                <span>可扩容性：</span>
                <span>否</span>
              </li>
               <li>
                <span>回收机制：</span>
                <span>delete</span>
              </li>
               <li>
                <span>支持存储卷快照：</span>
                <span>否</span>
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
                  <el-link style="color:#409EFF"  @click="$router.push('/storageResources/storageVolumeManagement/Storagevolumelist')">{{ scope.row.name }}</el-link>
                  <!-- <span >{{ scope.row.name }}</span> -->
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
        visible:false,
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
        width: 70%;  
      }
    }
   
  }
 
}
</style>