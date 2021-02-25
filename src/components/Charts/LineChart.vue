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
      default: '240px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
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
      this.setOptions(this.chartData)
    },
    setOptions({ expectedData, actualData } = {}) {
    

const hexToRgba = (hex, opacity) => {
    let rgbaColor = "";
    let reg = /^#[\da-f]{6}$/i;
    if (reg.test(hex)) {
        rgbaColor = `rgba(${parseInt("0x" + hex.slice(1, 3))},${parseInt(
      "0x" + hex.slice(3, 5)
    )},${parseInt("0x" + hex.slice(5, 7))},${opacity})`;
    }
    return rgbaColor;
}
let color = [
    "#0090FF",
    "#36CE9E",
    "#FFC005",
    "#FF515A",
    "#8B5CFF",
    "#00CA69"
];
const option = {
    backgroundColor: '#fff',
    color: this.chartData.color,
    legend: {
      left: '50%',
      top: 30,
      // data:this.chartData.legends
    },
    tooltip: {
        trigger: "axis",
        formatter: function(params) {
            let html = '';
            params.forEach(v => {
               
                html += `<div style="color: #666;font-size: 14px;line-height: 24px">
                <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${color[v.componentIndex]};"></span>
                ${v.seriesName}.${v.name}
                <span style="color:${color[v.componentIndex]};font-weight:700;font-size: 18px">${v.value}</span>
                `;
            })
            
    

            return html
        },
        extraCssText: 'background: #fff; border-radius: 0;box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);color: #333;',
        axisPointer: {
            type: 'shadow',
            shadowStyle: {
                color: '#ffffff',
                shadowColor: 'rgba(225,225,225,1)',
                shadowBlur: 5
            }
        }
    },
    grid: {
        // right:60,
        // top: 80,
        containLabel: true
    },
    xAxis: [{
        type: "category",
        boundaryGap: false,
        axisLabel: {
            formatter: '{value}',
            textStyle: {
                color: "#333"
            }
        },
        axisLine: {
          // show:false,
            lineStyle: {
                color: "#D9D9D9"
            }
        },
        axisTick: {
            show: false
        },
        data: this.chartData.xAxisData
    }],
    yAxis: [{
        type: "value",
        name: '',
        splitNumber:1,
        axisLabel: {
            textStyle: {
                color: "#666"
            }
        },
        nameTextStyle: {
            color: "#666",
            fontSize: 12,
            lineHeight: 40
        },
        splitLine: {
            lineStyle: {
                type: "dashed",
                color: "#E9E9E9"
            }
        },
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        }
    }],
    series: [{
        name: "2018",
        type: "line",
        smooth: true,
        name:this.chartData.legends,
        // showSymbol: false,/
        symbolSize: 4,
        zlevel: 3,
        lineStyle: {
            normal: {
                color: this.chartData.color,
                shadowBlur: 3,
                shadowColor: hexToRgba(this.chartData.color, 0.5),
                shadowOffsetY: 8
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [{
                            offset: 0,
                            color: hexToRgba(this.chartData.color, 0.3)
                        },
                        {
                            offset: 1,
                            color: hexToRgba(this.chartData.color, 0.1)
                        }
                    ],
                    false
                ),
                shadowColor: hexToRgba(this.chartData.color, 0.1),
                shadowBlur: 10
            }
        },
        data: this.chartData.yAxisData
    }, 
    ]
}
      this.chart.setOption(
       option
      )
    }
  }
}
</script>
