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
          name: '在线节点',
          max:3,
          value: 1 ,
          color:'rgba(245, 184, 96,1)' ,
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
    var titles=  {
                text:this.pieData.title,
                left:'70%',
                top: '30%',
                textAlign: 'center',
                textStyle: {
                    fontWeight: 'bold',
                    fontSize: '14',
                    color: '#fff',
                    textAlign: 'center',
                },
                subtext: this.pieData.name+':'+this.pieData.value+'\n'+'全部节点:'+this.pieData.max,
                subtextStyle:{
                    fontSize: '12',
                    color: 'fff',
                    fontWeight: '400',
                    align: 'center',
                    lineHeight: 20
                },
            } 
    var unit = this.pieData.max        
    var series={
                name: this.pieData.name,
                type: 'pie',
                clockWise: false,
                radius: [30, 50],
                itemStyle:  {
                    normal: {
                        color: this.pieData.color,
                        shadowColor: this.pieData.color,
                        shadowBlur: 0,
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                    }
                },
                hoverAnimation: false,
                center: ['35%', "55%"],
                data: [{
                    value: this.pieData.value,
                    label: {
                        normal: {
                            formatter: function(params){                                
                                return params.value + '/'+ unit;
                            },
                            position: 'center',
                            show: true,
                            textStyle: {
                                fontSize: '14',
                                fontWeight: 'bold',
                                color: '#fff'  //跟随其他颜色
                            }
                        }
                    },
                }, {
                    value: this.pieData.max,
                    name: 'invisible',
                    itemStyle: {
                        normal: {
                            color: this.pieData.color,
                            opacity:0.1
                        },
                        emphasis: {
                            color: this.pieData.color,
                            opacity:0.1
                        }
                    }
                }]
            }
  
    var option = {
          backgroundColor: "transparent",
          title:titles,
          series: series
      }
      this.chart.setOption(option)
    }
  }
}
</script>
<style lang="scss" scoped> 

</style>
