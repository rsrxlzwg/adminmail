<template>
  <div>
      <el-form ref="form" :model="form" label-width="140px">
          <el-form-item label="存储卷类型">
            <el-row :gutter="20">
              <el-col :span="6">
                 <el-select v-model="form.type" size="small">
                  <el-option  label="随机" :value="1" />
                  <el-option  label="轮询" :value="2" />
                  <el-option  label="最小请求负载" :value="3" />
                  <el-option  label="会话保持" :value="4" />
                </el-select>
              </el-col>
              <el-col :span="6">
                 <el-input 
                 size="small"
                 v-show="form.type===3"
                 v-model="form.min" placeholder="" 
                 type="number"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="会话保持属性" v-show="form.type===4">
             <el-row :gutter="20">
              <el-col :span="7">
                <el-radio-group v-model="form.conversation">
                  <el-radio :label="1">http header</el-radio>
                  <el-radio :label="2">http source ip</el-radio>
                  <el-radio :label="3">http cookie</el-radio>
                </el-radio-group>
              </el-col>
              <el-col :span="14">
                <el-input size="small" v-model="form.header" placeholder="" type="number"  v-show="form.type===4 && form.conversation==1"></el-input>
                <el-select v-model="form.source" size="small" v-show="form.type===4 && form.conversation==2">
                  <el-option  label="true" :value="1" />
                  <el-option  label="false" :value="2" />
                </el-select>
                <div v-show="form.type===4 && form.conversation==3">
                  <el-input placeholder="" v-model="form.cookiename"  size="small" >
                    <template slot="prepend">name</template>
                  </el-input>
                  <el-input placeholder="" v-model="form.cookiepath" size="small">
                    <template slot="prepend">path</template>
                  </el-input>
                  <el-input placeholder="" v-model="form.cookiettl"  size="small">
                    <template slot="prepend">ttl</template>
                    <template slot="append">s</template>
                  </el-input>
                </div>
                
              </el-col>
             </el-row>
          </el-form-item>
              
      </el-form>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        form:{
          type:1,
          min:'',
          conversation:1,
          header:'',
          source:'',
          cookiename:'',
          cookiepath:'',
          cookiettl:''
        }
      }

    }
  }
</script>

<style lang="scss" scoped>
/deep/ .el-radio{
  margin-bottom: 30px;
}

</style>