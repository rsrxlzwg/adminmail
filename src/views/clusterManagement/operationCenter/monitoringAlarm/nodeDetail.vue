<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <div class="flex-inline-between center">
            <span>
              <svg-icon class-name="hostImg" icon-class="hostImg" />            
               <span class="data-name">local</span>
            </span>
            <!-- <el-button size="mini">查看配置文件</el-button> -->
          </div>
          <div class="m-t-60">
            <h3>详情</h3>
            <ul class="detain-info">
              <li>
                <span>状态：</span>
                <span>运行中</span>
              </li>
               <li>
                <span>IP:</span>
                <span>192.168.12.12</span>
              </li>
               <li>
                <span>无法调度:</span>
                <span>false</span>
              </li>
               <li>
                <span>角色:</span>
                <span>worker</span>
              </li>
               <li>
                <span>操作系统:</span>
                <span>Ubuntu 16.04.6 LTS</span>
              </li>
                <li>
                <span>操作系统类型:</span>
                <span>linux</span>
              </li>
               <li>
                <span>内核版本:</span>
                <span>4.4.0-142-generic</span>
              </li>
                <li>
                <span>容器版本:</span>
                <span>docker://19.3.8</span>
              </li>
                <li>
                <span>Kubelet 版本:</span>
                <span>v1.17.9</span>
              </li>
               <li>
                <span>Kube-Proxy 版本:</span>
                <span>v1.17.9</span>
              </li>
                <li>
                <span>系统架构:</span>
                <span>amd64</span>
              </li>
               <li>
                <span>创建时间:</span>
                <span>2020-09-03 15:18:12</span>
              </li>
            </ul>
          </div>

         
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card>
           <div slot="header" class="clearfix">
              <span>容器组</span>
            </div>
            <el-table
              :data="tableData"
              style="width: 99%"
              stripe>
              <el-table-column label="名称" sortable>
                <template slot-scope="scope">
                  <el-link style="color:#409EFF" @click="$router.push('/applicationLoad/workload/containerGroup')">{{ scope.row.name }}</el-link>
                </template>
              </el-table-column>
              <el-table-column prop="status" label="节点" >
                <template slot-scope="scope">
                  <span >{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="containerIP" label="容器组IP" />
              <el-table-column  label="cpu" >
                <template slot-scope="scope">
                  <template v-if="scope.row.cpu !== 'NaN' ">
                    <el-progress :percentage="scope.row.cpu" :stroke-width="10" :format="format1" :show-text="false" />
                  </template>
                  <span style="font-size:10px">{{ scope.row.cpu }}M</span>
                </template>
              </el-table-column>
              <el-table-column prop="item" label="内存" >
                 <template slot-scope="scope">
                  <template v-if="scope.row.store !== 'NaN' ">
                    <el-progress :percentage="scope.row.store" :stroke-width="10" :format="format2" :show-text="false"/>
                  </template>
                  <span style="font-size:10px">{{ scope.row.store }}Mi</span>
                </template>
              </el-table-column>
            </el-table>
        </el-card>
      </el-col>  
    </el-row>
    
  </div>
</template>

<script>
  export default {
    data(){
      return{
        tableData:[
           {
            name:'postgre-gao54n-postgresql-0',
            node:'node2(192.168.12.12)',
            containerIP:'10.233.96.79',
            cpu:0,
            store:29.63
          },
           {
            name:'tomcat-onsgn1-6549c45f7-jwbpq',
            node:'node2(192.168.12.12)',
            containerIP:'10.233.96.79',
            cpu:0,
            store:29.63
          },
           {
            name:'data-redis',
            node:'node2(192.168.12.12)',
            containerIP:'10.233.96.79',
            cpu:0,
            store:29.63
          },
          {
            name:'postgre-iwo3v5-postgresql-0',
            node:'node2(192.168.12.12)',
            containerIP:'10.233.96.79',
            cpu:0,
            store:29.63
          },
          {
            name:'tomcat-l1l4tu-7558bd6687-8gkcj',
            node:'node2(192.168.12.12)',
            containerIP:'10.233.96.79',
            cpu:0,
            store:29.63
          }
        ]
      }
    },
    methods:{
       format1(percentage) {
      // return percentage === 100 ? "满" : `${percentage}%`;
        return `${percentage}M`;
      },
       format2(percentage) {
      // return percentage === 100 ? "满" : `${percentage}%`;
        return `${percentage}Mi`;
      },
    }
    
  }
</script>

<style lang="scss" scoped>
@import "../../../../styles/common.scss";

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
        width: 60%;  
      }
    }
   
  }
 
}
</style>