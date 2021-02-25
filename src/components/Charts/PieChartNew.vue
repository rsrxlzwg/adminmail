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
      default: '220px'
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

      var scaleData = [
        {
          'name': '正常集群',
          'value': 10
        },
        {
            'name': '异常集群',
            'value': 2
        },
       
    ];
      var rich = {
          white: {
              color: '#000',
              align: 'center',
              padding: [2, 0]
          }
      };
      var placeHolderStyle = {
          normal: {
              label: {
                  show: false
              },
              labelLine: {
                  show: false
              },
              color: 'rgba(0, 0, 0, 0)',
              borderColor: 'rgba(0, 0, 0, 0)',
              borderWidth: 0
          }
      };
    var data = [];
    for (var i = 0; i < scaleData.length; i++) {
        data.push({
            value: scaleData[i].value,
            name: scaleData[i].name,
            itemStyle: {
                normal: {
                    borderWidth: 5,
                    shadowBlur: 30,
                    borderColor: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
                        offset: 0,
                        color: '#7777eb'
                    }, {
                        offset: 1,
                        color: '#70ffac'
                    }]),
                    shadowColor: 'rgba(142, 152, 241, 0.6)'
                }
            }
        }, {
            value: 4,
            name: '',
            itemStyle: placeHolderStyle
        });
    }
     var total=scaleData.reduce((total,curr)=> {
        return total.value + curr.value;
    })
    var seriesObj = [{
        name: '',
        type: 'pie',
        clockWise: false,
        radius: [99, 100],
        hoverAnimation: false,
        itemStyle: {
            normal: {
                label: {
                    show: true,
                    position: 'outside',
                    color: '#909399',
                    formatter: function(params) {
                      
                        var percent = ((params.value / total) * 100).toFixed(0);
                        if(params.name !== '') {
                            return params.name + '\n{white|' + '' + params.value + '}';
                        }else {
                            return '';
                        }
                    },
                    rich: rich
                },
                labelLine: {
                    show: false
                }
            }
        },
        data: data
    }];
   
    console.log({total})
    var option = {
        backgroundColor: '#fff',
        title: {
          text: '集群总数',
          subtext: total,
          textStyle: {
              color: '#000',
              fontSize: 18,
              fontWeight:'bold',
              align:'center'
              
          },
          subtextStyle: {
              y: '50%',
              fontSize: 18,
              color: ['#85c7e3'],
              fontWeight:800,
              align:'center'
          },
          x: 'center',
          y: 'center',
        },
        tooltip: {
          show: true,
          trigger: 'item',
          formatter: function(params) {                  
              var percent = ((params.value / total) * 100).toFixed(0);
              if(params.name !== '') {
                  return params.name +':' + percent + '%';
              }else {
                  return '';
              }
                      
          },          
        },
       grid: {
        // left: '1%', // 与容器左侧的距离
        right: '1%', // 与容器右侧的距离
        top: '4%', // 与容器顶部的距离
        bottom: '5%', // 与容器底部的距离

    },
        toolbox: {
            show: false
        },
        series: seriesObj
    }

      this.chart.setOption(option)
    }
  }
}
</script>
