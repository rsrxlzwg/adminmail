<template>
  <div
    :class="className"
    :style="{height:height,width:width}"
  />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [ resize ],
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
      default: '350px'
    },
    chartData: {
      type: Object,
      //   required: true
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
      var datas = this.chartData
      const total = 6343 + 7019;
      this.chart.setOption(
        {
          tooltip: {},
          animationEasingUpdate: 'quarticInOut',
          legend: {
            // data: [‘’],
            textStyle: {
              color: '#000'
            },
            // icon: 'circle',
            type: 'scroll',
            // orient: 'vertical',
            left: '30%',
            top: 1,
            bottom: 20,
            itemWidth: 10,
            itemHeight: 10
          },
          series: [ {
            type: 'graph',
            layout: 'force',
            force: {
              repulsion: 1200,
            },
            animation: true,
            // roam: true,
            label: {
              normal: {
                show: true,
                position: 'inside',
                formatter: '{b}',
                fontSize: 12,
              },
            },
            categories: [
              { // 节点分类
                name: '节点',
                label: {
                  formatter: '{b}',
                  fontSize: 14,
                  color: '#ffec19'
                },

                itemStyle: {
                  color: {
                    type: 'radial',
                    r: 0.9,
                    colorStops: [ {
                      offset: 0,
                      color: '#0c1746'
                    }, {
                      offset: 1,
                      color: '#ffec19'
                    } ]
                  },
                  borderColor: '#ffec19',
                  borderWidth: 1
                }
              },
              {
                name: '节点类型',
                label: {
                  formatter: '{b}',
                  fontSize: 12,
                  color: '#69a1ff'
                },
                itemStyle: {
                  color: {
                    type: 'radial',
                    r: 0.9,
                    colorStops: [ {
                      offset: 0,
                      color: '#0c1746'
                    }, {
                      offset: 1,
                      color: '#69a1ff'
                    } ]
                  },
                  borderColor: '#69a1ff',
                  borderWidth: 1
                }
              },
              {
                name: '正常节点',
                label: {
                  formatter: '{b}',
                  fontSize: 16,
                  color: '#54f7ff'
                },
                itemStyle: {
                  color: {
                    type: 'radial',
                    r: 0.9,
                    colorStops: [ {
                      offset: 0,
                      color: '#0c1746'
                    }, {
                      offset: 1,
                      color: '#54f7ff'
                    } ]
                  },
                  borderColor: '#54f7ff',
                  borderWidth: 1
                }
              }, {
                name: '异常节点',
                label: {
                  formatter: '{b}',
                  fontSize: 12,
                  color: '#69a1ff'
                },

                itemStyle: {
                  color: {
                    type: 'radial',
                    r: 0.9,
                    colorStops: [ {
                      offset: 0,
                      color: '#F56C6C'
                    }, {
                      offset: 1,
                      color: '#F56C6C'
                    } ]
                  },
                  borderColor: '#F56C6C',
                  borderWidth: 1
                }
              } ],
            data: [
              {
                name: '节点:8',
                id: 1,
                x: 0,
                y: 0,
                symbolSize: 50,
                category: 0,
                draggable: true,
                tooltip: {
                  show: false,
                },

              },
              {
                name: 'Worker',
                id: 2,
                category: 1,
                value: 4,
                x: 500,
                y: 4,
                category: 1,
                tooltip: {
                  formatter: 'Worker总数:{c}',
                  backgroundColor: 'rgba(141, 127, 255, 0.7)',
                },
                symbolSize: 70 * 0.8,
                draggable: true,

              },
              {
                name: 'Master',
                id: 3,
                value: 4,
                category: 1,
                x: 0,
                y: 0,
                tooltip: {
                  formatter: 'Master总数:{c}',
                  backgroundColor: 'rgba(73, 132, 230, 0.7)',
                },
                symbolSize: 70 * 0.8,
                draggable: true,

              }, {
                name: 'W',
                id: 4,
                value: '',
                category: 2,
                symbolSize: 80 * (6343 / total),
                x: 0,
                y: 0,
                tooltip: {
                  show: false,
                  // formatter: '{b}:{c}',
                  // backgroundColor: 'rgba(99, 173, 252, 0.7)',
                },
                draggable: true,

              }, {
                name: 'W',
                id: 5,
                value: '',
                category: 2,
                x: 0,
                y: 0,
                tooltip: {
                  show: false,
                  // formatter: '{b}:{c}',
                  // backgroundColor: 'rgba(252, 150, 157, 0.7)',
                },
                symbolSize: 80 * (7019 / total),
                draggable: true,

              },
              {
                name: 'M',
                id: 6,
                x: 0,
                y: 0,
                category: 3,
                symbolSize: 40,
                draggable: true,
                tooltip: {
                  show: false,
                },

              },
              {
                name: 'M',
                id: 7,
                x: 0,
                y: 0,
                symbolSize: 40,
                category: 2,
                draggable: true,
                tooltip: {
                  show: false,
                },

              },

            ],
            links: [ {
              source: '1',
              target: '2',
            },
            {
              source: '1',
              target: '3',
            },
            {
              source: '2',
              target: '4',
            },
            {
              source: '2',
              target: '5',
            },
            {
              source: '3',
              target: '6',
            },
            {
              source: '3',
              target: '7',
            }
            ],
          } ],
        }
      )
    },

  }
}
</script>
