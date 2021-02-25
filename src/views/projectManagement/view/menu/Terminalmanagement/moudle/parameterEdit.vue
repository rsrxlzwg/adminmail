<template>
  <div>
    <el-card style="marginBottom:20px">
      <el-row>
        <el-col :span="3">
          修改范围:
        </el-col>
        <el-col :span="15">
          <el-radio
            v-model="paramsType"
            label="1"
          >当前终端</el-radio>
          <el-radio
            v-model="paramsType"
            label="2"
          >所属应用</el-radio>
        </el-col>
      </el-row>
    </el-card>
    <el-row :gutter="10"  >
      <el-col :span="11">
        <el-card>
          <span slot="header" >公共参数</span>
          <el-row :gutter="10" style="margin:10px 0">
            <el-col :span="5" style="margin-top:5px">
                <span >参数名称</span>
            </el-col>
            <el-col :span="10">
              <el-input  v-model="searchData.commonName" size="mini" ></el-input>
            </el-col>
          </el-row>
         <el-table
          ref="commonTable"
          :data="publicParameters"
          :row-style="{'font-size': '14px',color: 'rgb(32, 45, 64)','font-family': 'sans-serif;'}"
          stripe
          max-height="250"
          :cell-style="rowClass"
          :header-cell-style="headClass"
          :default-sort="{prop: 'date', order: 'descending'}">
              <el-table-column
              prop="paramName" 
              label="参数名称"/>
               <el-table-column
              prop="publicParamType" 
              label="参数类型">
                 <template slot-scope="scope">
                    <span>{{scope.row.publicParamType ==="0"?'不可编辑':'可编辑'}}</span>
                </template>
               </el-table-column>
            <el-table-column
              prop="paramValue"
              label="参数值">
              <template slot-scope="scope">
                  <el-input size="mini" v-model="scope.row.paramsDesc"  v-show="scope.row.publicParamType==='1' " />
                  <span  v-show="scope.row.publicParamType==='0'">{{scope.row.paramValue}}</span>
              </template>
            </el-table-column>
               <el-table-column
              prop="paramDesc"
              label="参数描述"
            />
        </el-table>
        </el-card>
      </el-col>
      <el-col :span="13">
         <el-card>
          <span slot="header" >私有参数</span>
          <el-row :gutter="10" style="margin:10px 0">
            <el-col :span="5" style="margin-top:5px">
                <span >参数名称</span>
            </el-col>
            <el-col :span="10">
                <el-input  v-model="searchData.name" size="mini" ></el-input>
            </el-col>
              <el-col :span="4">
              <el-button size="mini" @click="addData">添加</el-button>
            </el-col>
          </el-row>
         <el-table
          ref="commonTable"
          :data="privateParameters"
           max-height="250"
          :row-style="{'font-size': '14px',color: 'rgb(32, 45, 64)','font-family': 'sans-serif;'}"
          stripe
          :cell-style="rowClass"
          :header-cell-style="headClass"
          :default-sort="{prop: 'date', order: 'descending'}">
              <el-table-column
              prop="name" 
              label="参数名称">
               <template slot-scope="scope">
                  <el-input size="mini" v-model="scope.row.paramName" />
                </template>
              </el-table-column>
               <el-table-column
              prop="value" 
              label="参数值">
                 <template slot-scope="scope">
                  <el-input size="mini" v-model="scope.row.paramValue" />
                </template>
              </el-table-column>
              <el-table-column
              prop="desc" 
              label="参数描述">
                <template slot-scope="scope">
                  <el-input size="mini" v-model="scope.row.paramDesc" />
                </template>
              </el-table-column>
              <el-table-column
              label="操作">
                <template slot-scope="scope">
                  <el-button
                  type="text"
                  size="small"
                  @click.native.prevent="handleEdit(scope.row,scope.$index)"
                >删除</el-button>
                </template>
              </el-table-column>
        </el-table>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {
  },
  props:{
    // 'paramsType':{
    //   type:String,
    //   default:'1'
    // },
    'issuedForm':{
      type:Object,
      default:()=>{
         return {}
       }
    },
  },
  data() {
    return {
      paramsType:'1',
      from: {
        commonName: '',
        name: ''
      },
      searchData:{
        commonName:'',
        name:''
      },
      commonData: [ 
        {
          paramsName: 'esc.domain.id',
          paramsValue: '可编辑',
          paramsDesc: '',
          edit:true,
          paramsDefault:'ESC远端属性的id'
        },
         {
          paramsName: 'esc.domain.ip',
          paramsValue: '不可编辑',
          paramsDesc: '127.0.0.1',
          edit:false,
          paramsDefault:'ESC远端属性的ip'
        },
       ],
      data: [ {
        name: '',
        value: '',
        desc: '',
      } ],

    }
  },
   computed:{
    publicParameters(){
      const value=this.searchData.commonName
      if(value){
        return  this.issuedForm.params.filter(e=>(e.paramName.indexOf(value)>-1)&& (e.paramType==='1'))
      }
      return this.issuedForm.params.filter(e=>e.paramType==='1')
    },
    privateParameters(){
       const value=this.searchData.name
      if(value){
        return  this.issuedForm.params.filter(e=>(e.paramName.indexOf(value)>-1)&& (e.paramType==='2'))
      }
      return this.issuedForm.params.filter(e=>e.paramType==='2')
    }
  },
  methods: {
     addData(){
      this.$emit('addPrivateParams')
    },
    handleEdit(row,index){
      this.$emit('delPrivateParams',index)
    },
    headClass() {
      return 'text-align: center;background:#eef1f6;'
    },
    rowClass() {
      return 'text-align: center;'
    },
  }
}
</script>

<style scoped lang="scss">
.el-form-item {
  margin-bottom: 0;
}
.overflow {
  overflow: auto;
  height: 400px;
}
</style>
