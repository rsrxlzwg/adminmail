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
          bgccolor: '',
          title: '',
          bottom: 30
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
      let option = {
        title: {
          text: this.options.title,
          textStyle: {
            color: '#fff',
            fontSize: 10
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        // backgroundColor: '#242E42',
        backgroundColor: this.options.bgccolor,
        grid: {
          left: '1%',
          right: '6%',
          bottom: this.options.bottom,
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: [ '周一', '周二', '周三', '周四', '周五', '周六', '周日' ],
            show: this.showX
          }
        ],
        yAxis: [
          {
            type: 'value',
            show: false
          }
        ],
        series: [
          {
            name: '容器部署',
            type: 'line',
            stack: '数量',
            label: {
              normal: {
                show: false,
                position: 'top'
              }
            },
            itemStyle: {
              color: '#94D3B5'
            },
            lineStyle: {
              color: '#94D3B5'
            },
            areaStyle: {
              color: '#C9E8DB'
            },
            data: Array(7).fill(1).map(e => {
              return e + Math.ceil(Math.random() * 100) + 50
            })
          }
        ]
      }
      this.chart.setOption(option)
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
