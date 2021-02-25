<template>
  <div>
    <el-row
      v-for="item in list"
      type="flex"
      align="middle"
    >
      <el-col :span="10">
        <span style="fontSize:14px">
          {{item.name}}
        </span>
      </el-col>
      <el-col :span="12">
        <span v-if="item.name ==='镜像'">
          <el-input size="mini">
            <template slot="append">
              <i class="el-icon-circle-close"></i>
            </template>
          </el-input>
        </span>
        <span v-else>
          <el-select
            style="width:100%;height:60%"
            v-model="value"
            placeholder="请选择"
          >
          </el-select>
        </span>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      list: [
        { name: '镜像' },
        { name: '版本号' }
      ]
    }
  },
  components: {

  }
}
</script>

<style scoped lang="scss">
.el-row {
  margin-bottom: 10px;
  line-height: 20px;
}
</style>
