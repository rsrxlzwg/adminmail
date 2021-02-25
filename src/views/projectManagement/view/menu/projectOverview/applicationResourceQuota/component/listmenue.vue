<template>
  <div style="padding-top:15px">
    <el-row
      type="flex"
      justify="space-between"
      class="spaline"
      v-for="(item,key) in modulelist"
      align="middle"
      :key="key"
    >
      <el-col :span="4">
        <el-row
          type="flex"
          align="middle"
        >
          <el-col :span="10">
            <svg-icon
              class-name="icon-common"
              icon-class='Resourcebackground'
            ></svg-icon>
          </el-col>
          <el-col :span="2">
            <p>{{item.name}}</p>
            <p style="width:120px">{{item.type}}</p>
          </el-col>
        </el-row>

      </el-col>
      <el-col :span="8">
        <echartsdom></echartsdom>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import echartsdom from './echartsmodule'
export default {
  data() {
    return {
      modulelist: Array(9).fill({
        name: '102',
        type: '容器组'
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  components: {
    echartsdom
  }
}
</script>

<style scoped lang="scss">
.icon-common {
  width: 46px !important;
  height: 46px !important;
  color: rgb(50, 69, 88);
}
p {
  padding: 0;
  margin: 0;
  font-size: 14px;
}
.spaline {
  border-top: 1px solid #ccc;
}
</style>
