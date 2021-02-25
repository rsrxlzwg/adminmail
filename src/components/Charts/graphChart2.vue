<template>
  <div>
    <div
      ref="echart"
      :class="className"
      :style="{height:height,width:width}"
    />
    <ul
      v-if="show"
      class="positon"
      :style="{'left':left,'top':top}"
    >
      <li
        v-for="item in [{name:'启动',icon:'el-icon-video-play',type:'success'},{name:'停止',icon:'el-icon-video-pause',type:'danger'},{name:'重启',icon:'el-icon-refresh',type:'warning'}]"
      >
        <el-button
          style="width:100px"
          size="mini"
          :type='item.type'
          :icon="item.icon"
          @click="clickonde"
        >{{item.name}}</el-button>
      </li>

    </ul>
  </div>

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
      default: '100%'
    },
    chartData: {
      type: Object
      //   required: true
    }
  },
  data() {
    return {
      chart: null,
      left: '',
      top: '',
      show: false,
      output: ''
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
    window.addEventListener('click', _ => this.show = false)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null,
      document.oncontextmenu = function (ev) {
        return true
      }
  },
  methods: {
    clickonde() {
      this.show = false
      this.$message({
        message: this.output,
        type: 'success'
      })
    },
    initChart() {
      const masterImg = require("../../assets/host.png")
      const nodeImg = require("../../assets/node.png")
      const sentinelImg = require("../../assets/shaobing.png")

      // const masterPath='<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1600679573393" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9020" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M511.6 511.6m-445 0a445 445 0 1 0 890 0 445 445 0 1 0-890 0Z" fill="#EBF2FF" p-id="9021"></path><path d="M284.3 313.4v98.3h454.5v-98.3H284.3z m82 75.4h-52.4v-52.4h52.4v52.4z m76.1 0H390v-52.4h52.4v52.4z m74.7 0h-52.4v-52.4h52.4v52.4zM284.3 462.4v98.3h454.5v-98.3H284.3z m82 75.4h-52.4v-52.4h52.4v52.4z m76.1 0H390v-52.4h52.4v52.4z m74.7 0h-52.4v-52.4h52.4v52.4zM284.3 611.5v98.3h454.5v-98.3H284.3z m82 75.4h-52.4v-52.4h52.4v52.4z m76.1 0H390v-52.4h52.4v52.4z m74.7 0h-52.4v-52.4h52.4v52.4z" fill="#377FFC" p-id="9022"></path></svg>'
      this.chart = echarts.init(this.$refs.echart, 'macarons')
      var datas = this.chartData
      const total = 6343 + 7019
      this.chart.on('contextmenu', params => {
        document.oncontextmenu = function (ev) {
          return false
        }
            // console.log('333',params.data)
        this.output = params.data
        let { offsetX, offsetY } = params.event
        this.left = offsetX + 'px'
        this.top = offsetY + 'px'
        let filters = [ 1, 21, 22, 7, 9, 11, 13, 33, 34, 35, 36, 43, 44, 45, 46 ]
        if (params.data.category==1||params.data.category==2||params.data.category==5) {
          this.show = true
          // console.log('222')
        } else {
          this.show = false
        }

      })
      this.chart.setOption(
        {
          tooltip: {
            show: false,
            trigger: 'item'
          },
          animationEasingUpdate: 'quarticInOut',
          series: [
            {
              type: 'graph',
              layout: 'none',
              force: {
                edgeLength: 1000,
                repulsion: 10,
                gravity: 0.3
              },
              animation: false,
              tooltip: {
                show:false
                // formatter: function (params) {
                //   let str = `<div>${params.value.name}</div>`
                //   return str
                // },
                // backgroundColor: 'rgba(73, 132, 230, 0.7)'
              },
              grid: {
                left: '5%',
                top: '10%',
                bottom: '30%',
                right: '10%',
              },
              itemStyle: {
                color: 'rgba(73, 132, 230, 0.4)',
              },
              label: {
                normal: {
                  show: true,
                  fontSize: 14,
                  lineHeight:20,
                  color: '#303133',
                  formatter: function (params) {
                    let str =
                      ` ${params.value.name}\n\ip: ${params.value.ip} \n PORT: ${params.value.port}  `
                     if (params.name !== '网格') {
                      return str
                    } else {
                      return '  '
                    }
                  },
                  borderColor: 'rgba(73, 132, 230, 1)',
                  borderWidth: 1,
                  // borderType:'dotted',
                  padding: [ 7, 15],
                }
              },
              lineStyle: {
                normal: {
                  width: 1,
                  shadowColor: 'none',
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [ {
                      offset: 0, color: 'rgba(64, 158, 255,0.1)' // 0% 处的颜色
                    }, {
                      offset: 1, color: 'rgba(64, 158, 255,0.7)' // 100% 处的颜色
                    } ],
                    global: false // 缺省为 false
                  },
                }
              },
              categories: [
                { // 节点分类
                  name: '主节点',
                  symbol: `rect`,
                  symbolSize: [ 150, 40 ],
                  itemStyle: {
                    normal: {
                      color: '#157eff'
                    }
                  },
                  label: {
                    // position:'bottom',
                    formatter: function (params) {
                      let str = '' + params.name
                      return str
                    },
                    fontSize: 16,
                    color: '#fff',
                    borderWidth: 0,
                  },
                },
                {
                  name: '正常节点',
                  symbol: `react`,
                  symbolSize: [ 150, 200 ],
                  itemStyle: {
                    color: 'transparent',
                  },
                    z :5

                },
                {
                  name: '异常节点',
                  symbol: `react`,
                  symbolSize: [ 150, 200 ],
                  itemStyle: {
                    color: 'transparent',
                  },
                  label: {
                    borderColor: 'rgb(249, 89, 89,1)',
                  },
                    z :5

                }, 
                { // 节点分类
                  name: '系统分类',
                  symbol: `rect`,
                  symbolSize: [ 150, 40 ],
                  itemStyle: {
                    normal: {
                      color: '#ccc'
                    }
                  },
                  label: {
                    // position:'bottom',
                    formatter: function (params) {
                      let str = '' + params.name
                      return str
                    },
                    fontSize: 16,
                    color: '#000',
                    borderWidth: 0,
                  },
                    z :1

                }, 
                { // 节点分类
                  name: '角',
                  symbol: 'path://d="M512 995.552l398.224-568.88H739.544V312.888H284.44v113.784H113.776L512 995.552zM739.544 142.216H284.44V256h455.104V142.216z m0-113.768H284.44v56.88h455.104v-56.88z',
                  symbolSize: [ 20, 30 ],
                  itemStyle: {
                    normal: {
                      color: '#ccc'
                    }
                  },
                  label: {
                    // position:'bottom',
                    formatter: function (params) {
                      let str = '' + params.name
                      return ''
                    },
                    fontSize: 12,
                    color: '#000',
                    borderWidth: 0,
                  },
                    z :1

                },
                 {
                  name: '网格',
                  symbol: `rect`,
                  symbolSize: [ 180, 190 ],
                  itemStyle: {
                    normal:{
                      borderWidth:0,
                      color: 'rgba(73, 132, 230, .3)',
                      opacity:.3
                    }
                  },

                  label: {
                    normal:{
                      show: false,
                       borderWidth: 0
                    }
                  },
                    z :0

                },
                {
                  name: '应用实例',
                  symbol: `react`,
                  symbolSize: [ 150, 40 ],
                  itemStyle: {
                    color: 'rgb(73, 132, 230, .7)',
                  },
                 
                  label: {

                      normal: {
                        color:'#fff',
                        borderWidth:0,
                        borderColor: 'transparent',
                         formatter: function (params) {
                           return  `${params.value.name}`
                         }
                      }
                  },
                    z :5

                },
                 ],
              data: this.chartData.data,
              links: this.chartData.links
            } ]
        }
      )
      this.chart.on('click', (params) => {
            //  console.log('1111')
        // this.$emit('shownodelist', params)
          this.show = false
      })
    }
  }
}
</script>
<style lang="scss" scope>
.positon {
  position: absolute;
}
</style>
 