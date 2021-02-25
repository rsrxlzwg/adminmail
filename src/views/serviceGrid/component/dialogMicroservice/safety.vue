<template>
  <div>
      <el-form ref="form" :model="form" label-width="200px">
          <el-form-item label="最大连接数" >
            <el-checkbox-group v-model="form.check">
              <el-checkbox label="兼容模式(this和text)"></el-checkbox>
              <el-checkbox label="严格模式(this)"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
         
         
              
      </el-form>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        form: {
            check:['严格模式(this)']
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