<template>
  <div>
    <div v-show="active==1" style="width:50%;margin:0 auto">
      <el-form
        ref="form"
        :model="issuedForm"
        label-width="100px"
        label-position="left"
      >
        <el-form-item label="版本名称">
           <el-select
              v-model="issuedForm.versionName"
              size="mini"
              style="width:100%"
              @change="versionChange"
              placeholder="">
              <el-option
                :label="item"
                :value="item"
                v-for="item in formSelectList.versionNameList"
              />
            </el-select>
        </el-form-item>
        <el-form-item label="版本号">
          <el-select
              v-model="issuedForm.sendVersionId"
              size="mini"
              style="width:100%"
              placeholder="">
              <el-option
                :label="item.versionNum"
                :value="item.id"
                 v-for="item in formSelectList.versionList"
              />
            </el-select>
        </el-form-item>
        <el-form-item label="下发应用">
            <el-select
              v-model="issuedForm.sendAppId"
              size="mini"
              style="width:100%"
              @change="appChange"
              placeholder="">
              <el-option
                :label="item.appName"
                :value="item.id"
                 v-for="item in formSelectList.appFormList"
              />
            </el-select>
        </el-form-item>
          <el-form-item label="参数配置">
             <el-radio-group v-model="issuedForm.paramConfigEnabled" @change="changeRadio">
                <el-radio :label="1" >是</el-radio>
                <el-radio :label="2">否</el-radio>
             </el-radio-group>
        </el-form-item>
        <el-form-item label="模板SDK" v-show='issuedForm.paramConfigEnabled==1'>
           <el-select
              v-model="issuedForm.terminalId"
              size="mini"
              style="width:100%"
              placeholder="">
              <el-option
                :label="item.terminalCode"
                :value="item.id"
                 v-for="item in formSelectList.sdkTmpList"
              />
            </el-select>
        </el-form-item>
      </el-form>
    </div>
    <el-row :gutter="10" v-show="active==2" >
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
    'active':{
      type:Number
    },
    'issuedForm':{
      type:Object,
      default:()=>{
         return {}
       }
    },
    'formSelectList':{
      type:Object,
       default:()=>{
         return {
           versionNameList:[],
           versionList:[],
           appFormList:[],
           sdkTmpList:[]
         }
       }
    }
  },
  data() {
    return {
      searchData:{
        commonName:'',
        name:''
      },
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
  created(){
    
  },
  mounted(){
  },
  methods:{
  
    versionChange(val){
      this.$emit('versionChange',val)
    },
    appChange(val){
      this.$emit('appChange',val)
    },
    changeRadio(val){
      this.$emit('showBtn',val)
    },
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
  
    
    // next(){
    //   this.active=2
    // },
    // upStep(){
    //   this.active=1
    // }
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
