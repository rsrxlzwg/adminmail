<template>
  <div>
    <el-row
      type="flex"
      justify="space-around"
      align="middle"
    >
      <el-col :span="10">
        <div>
          当前容器组
        </div>
        <el-input size="mini"></el-input>
      </el-col>
      <el-col :span="1">
        <i class="el-icon-right"></i>
      </el-col>
      <el-col :span="10">
        <div>
          目标容器组
        </div>
        <el-input size="mini"></el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {

    }
  },
  components: {

  }
}
</script>

<style scoped lang="scss">
</style>
