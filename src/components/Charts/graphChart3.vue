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
      const sentinelImg = require("../../assets/loadBalancing.png")
      // const masterPath='<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1600679573393" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9020" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M511.6 511.6m-445 0a445 445 0 1 0 890 0 445 445 0 1 0-890 0Z" fill="#EBF2FF" p-id="9021"></path><path d="M284.3 313.4v98.3h454.5v-98.3H284.3z m82 75.4h-52.4v-52.4h52.4v52.4z m76.1 0H390v-52.4h52.4v52.4z m74.7 0h-52.4v-52.4h52.4v52.4zM284.3 462.4v98.3h454.5v-98.3H284.3z m82 75.4h-52.4v-52.4h52.4v52.4z m76.1 0H390v-52.4h52.4v52.4z m74.7 0h-52.4v-52.4h52.4v52.4zM284.3 611.5v98.3h454.5v-98.3H284.3z m82 75.4h-52.4v-52.4h52.4v52.4z m76.1 0H390v-52.4h52.4v52.4z m74.7 0h-52.4v-52.4h52.4v52.4z" fill="#377FFC" p-id="9022"></path></svg>'
      this.chart = echarts.init(this.$refs.echart, 'macarons')
      var datas = this.chartData
    this.chart.on('contextmenu', params => {
        document.oncontextmenu = function (ev) {
          return false
        }
            // console.log('333',params.data)
        this.output = params.data
        let { offsetX, offsetY } = params.event
        this.left = offsetX +65+ 'px'
        this.top = offsetY +10 +'px'
        if (params.data.id=='000') {
          this.show = false
          // console.log('222')
        } else {
          this.show = true
        }

      })
    let options = {
        title: {
            text: '',
            subtext: '',
            top: 'bottom',
            left: 'right'
        },
        tooltip: {
          formatter:(params)=>{
            // console.log({params})
            let str
            if(params.data.id=='000'){
                str='负载均衡'
            }else{
             str=`${params.data.label.name} <br /> ip: ${params.data.label.ip} <br /> port: ${params.data.label.port}`
            }
            return str
          }
        },
        roam:false,
        series: [
            {
              type: 'graph',
              symbol:`image://${sentinelImg}`,
              symbolSize: 200,
              layout: 'circular',
              width: '60%',
              height: '10%',
              left:'22%',
              label:{
                show:false
              },
              z:0,
              legendHoverLink:false,
               hoverAnimation:false,
              itemStyle:{
                normal:{
                    label: {
                    show: false,
                    }
                 },
                  emphasis: {
                      label: {
                          show: false,
                      }
                  }
              },
              data:[
                {
                  id:'000',
                  name:'负载均衡'
                }
              ]
            },
            {
                name: '',
                type: 'graph',
                 z:2,
                layout: 'circular',
                  width: '60%',
                height: '60%',
                circular: {
                    rotateLabel: true,
                },
                force:{
                  repulsion:10,
                   gravity:0.9,
                    edgeLength:1000
                },
                symbolSize: 30,
                data: datas.data,
                // links: datas.links,
                // categories: categories,
                roam: false,
                label: {
                    color:'#ccc',
                    position: 'right',
                    formatter: '{b}'
                },
                itemStyle:{
                  normal:{
                    shadowBlur: 5,
                    shadowColor: 'rgba(25, 100, 150, 0.5)',
                    shadowOffsetY: 3,
                    shadowOffsetX: 3,
                    color:'rgba(73, 132, 230,.7)',
                    label: {
                      show: true,
                      formatter: '{b}',
                      color: 'rgb(73, 132, 230)',
                    },
                  },
                   emphasis: {
                      label: {
                          show: false,
                      }
                  }
                },
                lineStyle: {
                     width:0,
                }
            }
        ]
    };
     
      this.chart.setOption(options)
      this.chart.on('click', (params) => {
            //  console.log('1111')
        // this.$emit('shownodelist', params)
          // this.show = false
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
 