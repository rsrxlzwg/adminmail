<template>
      <div>
        <div class="m-b-20 bold">基础镜像</div>
        <el-table
          ref="basicImagePackage"
          :data="baseClusterData"
          style="width: 100%"
          :header-cell-style="headerCellStyle"
          :default-sort="{prop: 'date', order: 'descending'}" 
          @selection-change="baseClusterChange">
          <el-table-column
            type="selection"
            width="55" /> 
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="配置项1">
                   <el-input v-model="props.row.mirrorConfig.logger"  ></el-input>
                </el-form-item>
                <el-form-item label="配置项2">
                   <el-input v-model="props.row.mirrorConfig.assemblyLine"  ></el-input>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>     
          <el-table-column
            align="center"
            label="名称"
            prop="name"
            sortable
            width="80" >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                @click="handleName(scope.$index, scope.row)"
              >{{ scope.row.name }}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="描述"
            prop="desc" >
            <template slot-scope="scope">
              <span>{{ scope.row.desc }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="当前版本"
            prop="edition">
            <template slot-scope="scope">
              <span>{{ scope.row.edition }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="创建时间"
            prop="date"
            sortable
            width="180">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
        
        </el-table>
        <!-- <div class="m-tb-20 bold">应用镜像</div> -->
        <!-- <el-table
          ref="basicImagePackage"
          :data="appClusterData"
          style="width: 100%"
          :header-cell-style="headerCellStyle"
          :default-sort="{prop: 'date', order: 'descending'}"
          @selection-change="appClusterChange">
          <el-table-column
            type="selection"
            width="55"/>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="配置项1">
                   <el-input v-model="props.row.mirrorConfig.logger"  ></el-input>
                </el-form-item>
                <el-form-item label="配置项2">
                   <el-input v-model="props.row.mirrorConfig.assemblyLine"  ></el-input>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column> 
          <el-table-column
            align="center"
            label="名称"
            prop="name"
            sortable
            width="80"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                @click="handleName(scope.$index, scope.row)"
              >{{ scope.row.name }}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="描述"
            prop="desc"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.desc }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="当前版本"
            prop="edition"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.edition }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="创建时间"
            prop="date"
            sortable
            width="180"
          >
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
        
        </el-table> -->
      </div>
</template>

<script>
import BaseInfo from './baseInfo'
const auto=['基本信息','配置网络','配置存储','其它设置','完成']
const  handle=['基本信息','配置节点','配置镜像','配置网络','配置存储','其它设置','完成']

export default {
 
  data(){
    return{
      mirrorConfig:{ 
        baseClusterSelection:'',
        appClusterSelection:''
      },    
       baseClusterData:[
        {
          date: '2020-05-02 15:33:33',
          name: ' K8s版本',
          desc: ' K8s版本',
          edition: '1.0.0', 
          mirrorConfig:{
            logger:'',
            assemblyLine:'',
          },

        },
      ],
       appClusterData:[
        {
          date: '2016-05-02 15:33:33',
          name: 'test-001',
          desc: '测试名称长度',
          edition: '5.0.4',
          status: 'Aderedd',
          mirrorConfig:{
            logger:'',
            assemblyLine:'',
          },
        },
        {
          date: '2016-05-02 15:33:32',
          name: 'test-007',
          desc: '后段',
          edition: '5.0.4',
          status: 'Aderedd',
          mirrorConfig:{
            logger:'',
            assemblyLine:'',
          },
        },
        {
          date: '2016-05-02 15:34:33',
          name: 'test-009',
          desc: '',
          edition: '5.0.4',
          status: 'Aderedd',
          mirrorConfig:{
            logger:'',
            assemblyLine:'',
          },
        }
      ]  
    
    }
  },
    methods:{
      baseClusterChange(val){
        console.log('base',val)
        this.mirrorConfig.baseClusterSelection=val
      },
      appClusterChange(val){
        console.log('app',val)
        this.mirrorConfig.appClusterSelection=val
      },
     headerCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: #f7f9fc;color:#303133'
      }
    },
    }
  }
</script>

<style lang="scss" scoped>
@import '../../../styles/common.scss';

</style>