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
          value: [ 10 ],
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
          text: this.options.value + '% ' + '\n' + this.options.title,
          textStyle: {
            color: '#28BCFE',
            fontSize: 14
          },
          itemGap: 20,
          left: 'center',
          top: 'center'
        },


        tooltip: {
          show: true,
          formatter: (params) => {
            return '<span style="color: #fff;">已使用' + this.options.value + '%</span>';
          }
        },
        angleAxis: {
          max: 100,
          clockwise: true, // 逆时针
          // 隐藏刻度线
          show: false
        },
        radiusAxis: {
          type: 'category',
          show: true,
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,

          },
          axisTick: {
            show: false
          },
        },
        polar: {
          center: [ '50%', '50%' ],
          radius: '160%' //图形大小
        },
        series: [ {
          type: 'bar',
          data: this.options.value,
          showBackground: true,
          backgroundStyle: {
            color: '#BDEBFF',
          },
          coordinateSystem: 'polar',
          roundCap: true,
          barWidth: 10,
          itemStyle: {
            normal: {
              opacity: 1,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [ {
                offset: 0,
                color: '#25BFFF'
              }, {
                offset: 1,
                color: '#5284DE'
              } ]),
              shadowBlur: 5,
              shadowColor: '#2A95F9',
            }
          },
        } ]
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
