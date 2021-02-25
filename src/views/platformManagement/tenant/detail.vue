<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4">
        <el-card>
          <ul class="menulists">
            <li v-for="item in menus" :class="item.id===active?'active':'' " @click="changeMenu(item.id)">{{item.label}}</li>
          </ul>
        </el-card>
      </el-col>
      <el-col :span="20" >
        <div v-show="active===1">
          <el-card style="height:500px " > 
             <div slot="header" class="clearfix" >
              <span>资源</span>
            </div>
            <table class="tabel-resource">
              <tr v-for="tr in tables">
                <td>{{tr.label}}</td>
                <td>{{tr.value}}</td>
              </tr>
            </table>
          </el-card>
          <el-card  style="margin-top:20px">
            <div slot="header" class="clearfix">
              <span>配额用量</span>
            </div>
            <el-row :gutter="40">
              <el-col :span="12">
                 <div class="chart-box">
                  <resource-chart :pie-data="cpuData" />
                </div>
              </el-col>
              <el-col :span="12">
                <div class="chart-box">
                  <resource-chart :pie-data="memoryData" />
                </div>
              </el-col>

            </el-row>
            </el-card>

        </div>
        <el-card  v-show="active===2">
          <div slot="header" class="clearfix" >
          <span>资源配额</span>
          <el-button type="text" style="float:right" @click="editVisible=true">修改</el-button>
        </div>
            <table class="tabel-resource">
              <tr v-for="tr in resourceData">
                <td>{{tr.label}}</td>
                <td>{{tr.value}}</td>
              </tr>
            </table>
            <table class="tabel-resource">
              <tr v-for="tr in resourceData2">
                <td>{{tr.label}}</td>
                <td>{{tr.value}}</td>
              </tr>
            </table>
            <table class="tabel-resource">
              <tr v-for="tr in resourceData3">
                <td>{{tr.label}}</td>
                <td>{{tr.value}}</td>
              </tr>
            </table>
            <table class="tabel-resource">
              <tr v-for="tr in resourceData4">
                <td>{{tr.label}}</td>
                <td>{{tr.value}}</td>
              </tr>
            </table>
        </el-card>
        <el-card style="height:500px " v-show="active===3">
           <div slot="header" class="clearfix">
          <span>使用情况</span>
        </div>
            <table class="tabel-resource">
              <tr v-for="tr in usedData">
                <td>{{tr.label}}</td>
                <td>{{tr.value}}</td>
              </tr>
            </table>
        </el-card>

        <el-card style="height:500px " v-show="active===4">
          <el-button type="primary" @click="addData">添加授权</el-button>
           <el-table
            :data="tableData"
            style="width: 99%"
            highlight-current-row>
              <el-table-column prop="team" label="群组名称" />
              <el-table-column prop="role" label="角色名称" />
              <el-table-column prop="width" label="范围" />
            </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog class="deepdialog" title="添加" :visible.sync="visables" width="30%">
      <el-form :model="form" label-width="100px">
        <el-form-item label="群组" >
          <el-select  v-model="form.team" size="mini" >
              <el-option label="项目测试" value="项目测试" key="value">项目测试</el-option>
          </el-select> 
        </el-form-item>     
        <el-form-item label="角色名称" >
           <el-select  v-model="form.role" size="mini" >
              <el-option label="集群管理" value="集群管理" key="value">集群管理</el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visables = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </div>
    </el-dialog>
     <el-dialog class="deepdialog" title="修改" :visible.sync="editVisible" >
      <el-form :model="resourceForm" label-width="180px" size="small">
        <el-form-item label="CPU限制" >
          <el-input placeholder="请输入" v-model="resourceForm.cpu" style="width:500px" type="number" >
            <template slot="append">核</template>
          </el-input>
        </el-form-item>
         <el-form-item label="CPU申请" >
          <el-input placeholder="请输入" v-model="resourceForm.cpuapply" style="width:500px" type="number" >
            <template slot="append">核</template>
          </el-input>
        </el-form-item>
        <el-form-item label="内存限制" >
          <el-input placeholder="请输入" v-model="resourceForm.memory" style="width:500px" type="number" >
            <template slot="append">G</template>
          </el-input>
        </el-form-item>
         <el-form-item label="内存申请" >
          <el-input placeholder="请输入" v-model="resourceForm.memoryapply" style="width:500px" type="number" >
            <template slot="append">G</template>
          </el-input>
        </el-form-item>
        <el-divider></el-divider>
         <el-form-item label="所有容器组最大数量" >
          <el-input placeholder="请输入" v-model="resourceForm.maxall" style="width:500px" type="number" >
            <template slot="append">个</template>
          </el-input>
        </el-form-item>
         <el-form-item label="无资源限制的容器组最大数" >
          <el-input placeholder="请输入" v-model="resourceForm.max" style="width:500px" type="number" >
            <template slot="append">个</template>
          </el-input>
        </el-form-item>
         <el-divider></el-divider>
           <el-form-item label="存储容量预留" >
          <el-input placeholder="请输入" v-model="resourceForm.store" style="width:500px" type="number" >
            <template slot="append">G</template>
          </el-input>
        </el-form-item>
         <el-form-item label="存储卷最大数量" >
          <el-input placeholder="请输入" v-model="resourceForm.storemax" style="width:500px" type="number" >
            <template slot="append">个</template>
          </el-input>
        </el-form-item>
          <el-form-item label="四层负载均衡最大数量" >
          <el-input placeholder="请输入" v-model="resourceForm.four" style="width:500px" type="number" >
            <template slot="append">个</template>
          </el-input>
        </el-form-item>
         <el-form-item label="主机端口最大数量" >
          <el-input placeholder="请输入" v-model="resourceForm.hostmax" style="width:500px" type="number" >
            <template slot="append">个</template>
          </el-input>
        </el-form-item>
          <el-form-item label="配置项最大数量" >
          <el-input placeholder="请输入" v-model="resourceForm.itemall" style="width:500px" type="number" >
            <template slot="append">个</template>
          </el-input>
        </el-form-item>
         <el-form-item label="加密文件最大数量" >
          <el-input placeholder="请输入" v-model="resourceForm.filemax" style="width:500px" type="number" >
            <template slot="append">个</template>
          </el-input>
        </el-form-item>
      </el-form>
       <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="editVisible=false">确 定</el-button>
      </div>
      </el-dialog>
  </div>
</template>

<script>
import ResourceChart from '../../cluster/components/resourceChart'

  export default {
    components: {
      ResourceChart,
    },
     data() {
      return {
        resourceForm:{
          cpu:'',
          cpuapply:'',
          memory:'',
          memoryapply:'',
          maxall:'',
          max:'',
          store:'',
          storemax:'',
          four:'',
          hostmax:'',
          itemall:'',
          filemax:''
        },
        editVisible:false,
        resourceData:[
          {
             label:'CPU 限制',
            value:'不限'
          },
          {
             label:'CPU 申请',
            value:'不限'
          },
          {
             label:'内存限制',
            value:'不限'
          },
          {
             label:'内存申请',
            value:'不限'
          },
        ],
          resourceData2:[
          {
             label:'所有容器组最大数量',
            value:'不限'
          },
          {
             label:'无资源限制的容器组最大数',
            value:'0个'
          }
        ],
          resourceData3:[
          {
             label:'存储容量预留',
            value:'不限'
          },
          {
             label:'存储卷最大数量',
            value:'不限'
          }
        ],
         resourceData4:[
          {
             label:'四层负载均衡最大数量',
            value:'不限'
          },
          {
             label:'主机端口最大数量',
            value:'不限'
          },
          {
             label:'配置项最大数量',
            value:'不限'
          },
          {
             label:'加密文件最大数量',
            value:'不限'
          }

        ],
        usedData:[
          {
             label:'CPU 限制用量',
            value:'不限'
          },
           {
             label:'CPU 申请用量',
            value:'不限'
          }, {
             label:'内存限制用量',
            value:'不限'
          },
           {
             label:'内存申请用量',
            value:'不限'
          },
           {
             label:'无资源限制的容器组用量',
            value:'0/0个'
          }
        ],
         cpuData:{       
          name: 'CPU core',
          max:12,
          value: 1.34 ,
          color:'rgba(36, 209, 209, 1)',
          title:'在线节点状态'       
      },
       memoryData: {
        name: '内存 GiB',
        max: 46.54,
        value: 70.73,
        color: 'rgba(252, 142, 108, 1)'
      },
        visables:false,
        tables:[
          {
            label:'应用',
            value:0
          },
           {
            label:'无状态(Deployment)',
            value:1
          },
           {
            label:'有状态(StatefulSet)',
            value:0
          },
           {
            label:'守护进程(DaemonSet)',
            value:0
          },
           {
            label:'负载均衡',
            value:1
          },
           {
            label:'容器组',
            value:2
          },
           {
            label:'配置项',
            value:1
          },
           {
            label:'加密文件',
            value:9
          },
        ],
        menus:[
          {
             label:'概览',
             id:1
          },
          {
             label:'配额',
             id:2
          },
          {
             label:'使用情况',
             id:3
          },
          {
             label:'授权',
             id:4
          }
        ],
         tableData: [
          {
            team: "team1",
            role:'超级管理员',
            width:''
          }
        ],
        form:{
          role:'',
          team:''
        },
        active:1,
      }
    },
    methods:{
      addData(){
        this.visables=true
         this.form={
          role:'',
          team:''
        }
      },
      addRole(){
        this.tableData.push(this.form)
        this.visables=false
      },
      changeMenu(id){
        this.active=id
      }

    }
  }
</script>

<style lang="scss" scoped>

.flex-inline{
  // display: flex;
  
}
.chart-box {
  background: #f9fbfd;
  border-radius: 4px;
  width: 100%;
  height: 160px;
  padding: 20px;
  
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
      padding: 0 10px;
      height: 40px;
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
.menulists{
  font-size: 14px;
  margin-bottom: 10px;
  padding: 0;
  list-style-type: none;
  border-radius: 4px;
  // box-shadow: 0 1px 4px 0 rgba(204,209,217,.3);
   font-weight: bold;
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