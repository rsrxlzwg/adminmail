<template>
  <div>
      <el-form ref="form" :model="form" label-width="200px">
          <el-form-item label="最大连接数" >
            <el-input size="small" v-model="form.connections" placeholder="" type="number" ></el-input>
          </el-form-item>
            <el-form-item label="最大请求重试数" >
            <el-input size="small" v-model="form.retry" placeholder="" type="number" ></el-input>
          </el-form-item>
            <el-form-item label="每连接最大请求数" >
            <el-input size="small" v-model="form.connect" placeholder="" type="number" ></el-input>
          </el-form-item>
        <h4>HTTP</h4>
          <el-form-item label="最大等待请求数" >
            <el-input size="small" v-model="form.wait" placeholder="" type="number" ></el-input>
          </el-form-item>
        <h4>HTTP2</h4>
         <el-form-item label="最大请求数" >
            <el-input size="small" v-model="form.request" placeholder="" type="number" >
            </el-input>
          </el-form-item>
         
              
      </el-form>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        form: {
            connections:'',
            retry:'',
            connect:'',
            wait:'',
            request:''
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