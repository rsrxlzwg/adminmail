<template>
  <div>
      <el-form ref="form" :model="form" label-width="200px">
        <h4>阈值</h4>
          <el-form-item label="连续错误响应数" >
            <el-input size="small" v-model="form.errornum" placeholder="" type="number" ></el-input>
          </el-form-item>
        <h4>规则</h4>
         <el-form-item label="检查周期" >
            <el-input size="small" v-model="form.round" placeholder="" type="number" >
                 <template slot="append">
                    <el-select v-model="form.roundUnit" size="small" >
                      <el-option  label="s" :value="1" />
                      <el-option  label="m" :value="2" />
                      <el-option  label="h" :value="3" />
                    </el-select>
                 </template>
            </el-input>
          </el-form-item>
             <el-form-item label="实例最短隔离时间" >
            <el-input size="small" v-model="form.mintime" placeholder="" type="number" >
                 <template slot="append">
                    <el-select v-model="form.minUnit" size="small" >
                      <el-option  label="s" :value="1" />
                      <el-option  label="m" :value="2" />
                      <el-option  label="h" :value="3" />
                    </el-select>
                 </template>
            </el-input>
          </el-form-item>
             <el-form-item label="实例最大隔离比例" >
            <el-input size="small" v-model="form.maxtime" placeholder="" type="number" >
                 <template slot="append">% </template>
            </el-input>
          </el-form-item>
              
      </el-form>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        form:{
          errornum:1,
          round:'',
          roundUnit:1,
          mintime:'',
          minUnit:1,
          maxtime:''
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