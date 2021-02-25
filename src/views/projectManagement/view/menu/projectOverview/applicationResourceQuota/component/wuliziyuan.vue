<template>
  <div>
    <el-row
      class="main"
      v-for="(item,key) in litemlist"
      :key="key"
    >
      <echartsdom
        :options=item
        :conternheight=100
        :showX='false'
      />
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import echartsdom from './echartsmodule'
export default {
  data() {
    return {
      litemlist: [
        {
          bgccolor: '#2A354B',
          title: 'CPU耗电量(最近12小时)',
          bottom: '1',

        },
        {
          bgccolor: '#2A354B',
          title: '内存使用量(最近12小时)',
          bottom: '1',

        }
      ],
      option: {
        bgccolor: '#2A354B',
        title: 'CPU耗电量',
        bottom: '1',

      }
    }
  },
  components: {
    echartsdom
  }
}
</script>

<style scoped lang="scss">
.main {
  border-radius: 14px;
  overflow: hidden;
  margin-top: 20px;
}
</style>
