<template>
  <div
    class="chartsdom"
    :style="{height: conternheight + 'px'}"
  >

  </div>
</template>

<script type="text/ecmascript-6">
import echarts from 'echarts'
export default {
  props: {
    options: {
      type: Object,
      default: () => {
        return {

        }
      }
    },
    conternheight: {
      type: Number,
      default: 50
    },
    showX: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      chart: ''
    }
  },
  methods: {
    initcharts() {
      this.chart = echarts.init(this.$el)
      this.chart.setOption(this.options)
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initcharts()
      window.addEventListener("resize", () => {
        this.chart.resize();
      });
    })
  },
  created() {

  },
  components: {

  }
}
</script>

<style scoped lang="scss">
.chartsdom {
  width: 100%;
}
</style>
