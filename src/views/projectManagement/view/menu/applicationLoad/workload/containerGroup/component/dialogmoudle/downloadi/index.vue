<template>
  <div>
    <el-row
      v-for="(item,key) in maplist"
      type="flex"
      align="middle"
      style="lineHeight:60px;borderBottom:1px solid #E4E7ED;padding:10px 0"
      :key="key"
    >
      <el-col :span="4">
        <span>{{item.name}}</span>
      </el-col>
      <el-col :span="20">
        <span v-if="key == 0">
          <el-input
            style="width:80%"
            size="small"
          ></el-input>
        </span>

      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      maplist: [
        {
          name: '容器路径'
        }
      ]
    }
  },
  components: {

  }
}
</script>

<style scoped lang="scss">
</style>
