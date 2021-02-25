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
        v-for="item in [{name:'启动',icon:'el-icon-video-play',type:'success'},{name:'停止',icon:'el-icon-video-pause',type:'danger'},{name:'重启',icon:'el-icon-refresh',type:'warning'},{name:'关联服务',icon:'el-icon-video-play',type:'success'}]"
      >
        <el-button
          style="width:100px"
          size="mini"
          :type='item.type'
          :icon="item.icon"
          @click="clickonde(item)"
        >{{item.name}}</el-button>
      </li>

    </ul>
    <el-dialog
      title="关联服务"
      :visible.sync="dialogVisible"
      width="60%"
    >
      <el-card style="marginBottom:20px">
        <el-row
          type="flex"
          align="middle"
          :gutter="12"
        >
          <el-col :span="3">
            <span style="fontSize:'5px'">服务代码</span>
          </el-col>
          <el-col :span="5">
            <el-input
              placeholder="请输入"
              size="small"
            />
          </el-col>
          <el-col :span="3">
            <span style="fontSize:'5px'">服务名称</span>
          </el-col>
          <el-col :span="5">
            <el-input
              placeholder="请输入"
              size="small"
            />
          </el-col>

          <!-- <el-col :span="1">
          <span style="fontSize:'5px'">策略</span>
        </el-col>
        <el-col :span="3">
          <el-select
            v-model="form.value1"
            size="mini"
            placeholder="请选择"
          >
            <el-option
              v-for="item in ['黑白名单','百分比','限制频次','限制等待']"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-col> -->

          <el-col :span="6">
            <el-row>
              <el-col :span="12">
                <el-button
                  size="mini"
                  icon="el-icon-search"
                >搜索</el-button>
              </el-col>
              <el-col :span="12">
                <el-button
                  size="mini"
                  icon="el-icon-delete"
                >重置</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
      <el-card>
        <rendertable
          :tableHeader='tableHeader'
          :tableData='tableData'
        />
      </el-card>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import rendertable from '@/views/projectManagement/components/table'
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  components: {
    rendertable
  },
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
      dialogVisible: false,
      chart: null,
      left: '',
      top: '',
      show: false,
      output: '',
      tableHeader: [
        {
          prop: 'index',
          label: '序号',
          render: (h, { index }) => {
            return h('span', index + 1)
          }
        },
        {
          prop: 'Servicecode',
          label: '服务代码'
        }
        , {
          prop: 'accountname',
          label: '账户名称'
        }, {
          prop: 'servicestatus',
          label: '服务状态'
        }
      ],
      tableData: [
        {
          Servicecode: '300023234',
          accountname: '账户查询服务',
          servicestatus: '已授权'
        }
      ]
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
    clickonde(item) {
      this.show = false
      switch (item.name) {
        case '关联服务':
          this.dialogVisible = true
          break;

        default:
          this.$message({
            message: this.output,
            type: 'success'
          })
          break;
      }

    },
    initChart() {
      const masterImg = require("../../assets/host.png")
      const nodeImg = require("../../assets/node.png")
      const sentinelImg = require("../../assets/shaobing.png")

      // const masterPath='<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1600679573393" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9020" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M511.6 511.6m-445 0a445 445 0 1 0 890 0 445 445 0 1 0-890 0Z" fill="#EBF2FF" p-id="9021"></path><path d="M284.3 313.4v98.3h454.5v-98.3H284.3z m82 75.4h-52.4v-52.4h52.4v52.4z m76.1 0H390v-52.4h52.4v52.4z m74.7 0h-52.4v-52.4h52.4v52.4zM284.3 462.4v98.3h454.5v-98.3H284.3z m82 75.4h-52.4v-52.4h52.4v52.4z m76.1 0H390v-52.4h52.4v52.4z m74.7 0h-52.4v-52.4h52.4v52.4zM284.3 611.5v98.3h454.5v-98.3H284.3z m82 75.4h-52.4v-52.4h52.4v52.4z m76.1 0H390v-52.4h52.4v52.4z m74.7 0h-52.4v-52.4h52.4v52.4z" fill="#377FFC" p-id="9022"></path></svg>'
      this.chart = echarts.init(this.$refs.echart, 'macarons')
      var datas = this.chartData
      this.chart.on('contextmenu', params => {
        console.log({params})
        if (this.show) return
        document.oncontextmenu = function (ev) {
          return false
        }
        this.output = params.data
        let { offsetX, offsetY } = params.event
        this.left = offsetX + 'px'
        this.top = offsetY + 'px'
        let filters = [ 1, 40, 41, 42, 43, 7, 9, 11, 13 ]

        if (params.data.category==1||params.data.category==2) {
          // console.log( '22222222222')
          this.show = true
        }

      })
      this.chart.setOption(
        {
          tooltip: {
            show: true,
            trigger: 'item'
          },
          animationEasingUpdate: 'quarticInOut',
          legendHoverLink :false,

          series: [
            {
              type: 'graph',
              layout: 'none',
              force: {
                edgeLength: 10000,
                repulsion: 10,
                gravity: 0.1
              },
              // symbolOffset :[0,'33%'],
              animation: false,
              tooltip: {
                show:false
                // formatter: function (params) {
                //   let str ='' 
                //   if(params.category==3||params.category==4){
                //     str= ''
                //   }else{
                //       str=`<div>${params.name}</div>`
                //   }
                //    return str
                // },
                // backgroundColor: 'rgba(73, 132, 230, 0.7)'
              },
              grid: {
                left: '20%',
                top: '5%',
                bottom: '30%',
                right: '20%',
              },
              itemStyle: {
                normal: {
                  color: 'rgba(73, 132, 230, 0.4)'
                }
              },
              label: {
                normal: {
                  show: true,
                  fontSize: 14,
                  color: '#303133',
                  lineHeight:22,
                  formatter: function (params) {
                    let str =
                      ` ${params.value.name}\n ip: ${params.value.ip} \n PORT: ${params.value.port}  `
                    if (params.name !== '网格') {
                      return str
                    } else {
                      return '  '
                    }
                  },
                  borderColor: 'rgba(73, 132, 230, 1)',
                  borderWidth: 1,
                  // borderType:'dotted',
                  padding: [ 10, 20 ],
                }
              },
              lineStyle: {
                normal: {
                  width: 3,
                  shadowColor: 'none',
                  // color:'rgba(64, 158, 255,1)',
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [ {
                      offset: 0, color: 'rgba(64, 158, 255,0.7)' // 0% 处的颜色
                    }, {
                      offset: 1, color: 'rgba(156, 204, 252,0.1)' // 100% 处的颜色
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
                    normal:{
                    // position:'bottom',
                    formatter: function (params) {
                      let str = '' + params.name
                      return str
                    },
                    fontSize: 16,
                   fontWeight:700,
                    color: '#fff',
                    borderWidth: 0,
                    }
                  },
                    z :5
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
                  name: '异常接电',
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
                {
                  name: '网格',
                  symbol: `rect`,
                  symbolSize: [ 200, 200 ],
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
          this.show = false
        // this.$emit('shownodelist', params)
          // console.log({params})
      })
      // this.chart.on('contextmenu',(params)=>{
      //   console.log('右键单击');
      // });
    }
  }
}
</script>
<style lang="scss" scope>
.positon {
  position: absolute;
}
</style>
 