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
      default: '250px'
    },
    lineData:{
      type:Object,
      default:()=> {
        return {       
          name: 'cpu使用情况',
          xAxisData:["2020-05-11", "2020-05-12", "2020-05-13", "2020-05-14", "2020-05-15", "2020-05-16", "2020-05-17", "2020-05-18", "2020-05-19", "2020-05-20", "2020-05-21", "2020-05-22", "2020-05-23", "2020-05-24", "2020-05-25", "2020-05-26", "2020-05-27", "2020-05-28", "2020-05-29", "2020-05-30", "2020-05-31", "2020-06-01", "2020-06-02", "2020-06-03", "2020-06-04", "2020-06-05", "2020-06-06", "2020-06-07", "2020-06-08", "2020-06-09", "2020-06-10"],
          data: [43, 58, 195, 229, 320, 211, 124, 131, 124, 360, 124, 78, 160, 604, 17, 0, 0, 0, 2, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],        
          color:'rgba(18,61,172,0.5)',
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
    // var colors=[['#57bbf7', '#f4f4f7'],['#ffc969', '#f4f4f7'],['#f38b97', '#f4f4f7'], ['#b1d882', '#f4f4f7'],['#c0acf9', '#f4f4f7']]
    // const color= ["#123dac", "#73e2e2", "#ff7e85", "#9b52ff", "#fac524", "#46caff", "#a1e867", "#10b2b2", "#ec87f7", "#f4905a", "#00baba", "#facf24", "#e89d67", "#23c6c6", "#fa8699", "#40b7fc", "#006d75", "#595959", "#f4764f", "#a640fc", "#fda23f", "#2d7ae4", "#5092ff", "#9351ed", "#8a89fe", "#df89e8", "#2797ff", "#6ad089", "#7c92e8 "]
const xAxisData =this.lineData. xAxisData 
var  option = {
    "textStyle": {
        "fontFamily": "Din-Light"
    },
    "color": ["#123dac", "#73e2e2", "#ff7e85", "#9b52ff", "#fac524", "#46caff", "#a1e867", "#10b2b2", "#ec87f7", "#f4905a", "#00baba", "#facf24", "#e89d67", "#23c6c6", "#fa8699", "#40b7fc", "#006d75", "#595959", "#f4764f", "#a640fc", "#fda23f", "#2d7ae4", "#5092ff", "#9351ed", "#8a89fe", "#df89e8", "#2797ff", "#6ad089", "#7c92e8 "],
    "title": {
        "text": "",
        "left": "47%",
        "textStyle": {
            "fontSize": 24
        }
    },
    "tooltip": {
        "backgroundColor": "#fff",
        "trigger": "axis",
        "axisPointer": {
            "type": "none"
        },
        "textStyle": {
            "color": "#565656",
            "lineHeight": 28
        },
        "confine": true,
        "padding": 12,
        "extraCssText": "box-shadow: 0px 2px 8px 0px #cacaca;border-radius: 4px;opacity: 0.9;max-height: 100%;",
        "formatter": {
            "_custom": {
                "type": "function",
                "display": "<span>ƒ</span> (params)"
            }
        }
    }, 
    // "grid": {
    //     "left": 0,
    //     "right": 0,
    //     "top": 0,
    //     "bottom": 0
    // },
    "xAxis": {
        "type": "category",
        "boundaryGap": true,
        "data": xAxisData,
        "axisLabel": {
            "color": "#a0a9bc",
            //X轴标签 label 做了特殊处理，防止左右溢出
           formatter: (value, index) => {
              if (index === 0 || index === xAxisData.length - 1) {
                return "";
              }
              return value;
            }
        },
        "axisLine": {
            "show": false
        },
        "axisTick": {
            "show": false
        }
    },
    "yAxis": {
        "name": this.lineData.name,
        "nameTextStyle": {
            "color": "#242e42",
            fontWeight:'bold',
            fontSize:14,
            lineHeight:30
        },
        "type": "value",
        "axisLabel": {
            "color": "#a0a9bc",
            "inside": true,
            "margin": 0,
            "verticalAlign": "bottom"
        },
        "splitLine": {
            "lineStyle": {
                "type": "dashed"
            }
        },
        "minInterval": 1,
        "axisLine": {
            "show": false
        },
        "axisTick": {
            "show": false
        }
    },
    "series": [{
        "name": this.lineData.name,
        "data":this.lineData.data,
        "type": "line",
        "smooth": true,
        "smoothMonotone": "x",
        "cursor": "pointer",
        "showSymbol": false,
        "lineStyle": {
            "color": this.lineData.color,
            "shadowColor": this.lineData.color,
            "shadowBlur": 30
        },
        areaStyle: { 
						color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
							offset: 1,
							color: this.lineData.color
						}, {
							offset: 0,
							color: 'rgba(255,255,255,0.4)'
						}]),
        }
    }]
}
      this.chart.setOption(option)
    }
  }
}
</script>
<style lang="scss" scoped> 

</style>
