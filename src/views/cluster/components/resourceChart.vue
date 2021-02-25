<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '230px'
    },
    pieData:{
      type:Object,
      default:()=> {
        return {       
          name: 'CPU core',
          max:12,
          value: 1.34 ,
          color:'rgba(36, 209, 209, 1)',
          title:'在线节点状态'       
      }
      }
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')  
    var colors=[['#57bbf7', '#f4f4f7'],['#ffc969', '#f4f4f7'],['#f38b97', '#f4f4f7'], ['#b1d882', '#f4f4f7'],['#c0acf9', '#f4f4f7']]

var titleData = {
        text:  this.pieData.value + '/'+ this.pieData.max,
        left:'60%',
        top: '18%',
        textAlign: 'center',
        textStyle: {
            fontSize: '16',
            color: '#404e68',
            fontWeight: '500',
        },
        subtext: this.pieData.name,
        subtextStyle:{
            fontSize: '14',
            color: 'rgba(0,0,0,0.5)',
            fontWeight: '400',
        },
    }
var seriesData = {
        type: 'pie',
        radius: ['20', '26'],
        center: ['30%', '27%'],
        hoverAnimation: false,
        label: {
            normal: {
                position: 'center'
            },
        },
        data: [{
                value: this.pieData.value,
                name: this.pieData.name,
                itemStyle: {
                    normal: {
                        color: this.pieData.color,
                    }
                },
                label: {
                    normal: {
                        show: false,
                    }
                }
            },
            {
                value: 100 - this.pieData.value,
                name: '',
                tooltip: {
                    show: false
                },
                itemStyle: {
                    normal: {
                        color: this.pieData.color,
                        opacity:0.1
                    }
                },
                label: {
                    normal: {
                        formatter: this.pieData.value,
                        textStyle: {
                            fontSize: 18,
                            color: 'rgba(0,0,0,1)',
                        }
                    },

                }
            }
        ]
    }




// let value = data.value || 0
var  option = {
    backgroundColor: 'transparent',
    title: titleData,
    series: seriesData,
    // grid: {
    //     top: "30%",
    //     left: "-45%",
    //     right: "0",
    //     bottom: "39%"
    // }
}
      this.chart.setOption(option)
    }
  }
}
</script>
<style lang="scss" scoped> 

</style>
