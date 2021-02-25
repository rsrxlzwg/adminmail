<template>
  <div>
    <el-row
      type="flex"
      justify="spaceBetween"
      :gutter="3"
      style="marginBottom:40px"
    >
      <el-col
        :span="5"
        v-for="item in toplist"
        style="display:flex;justifyContent:center"
      >
        <div
          class="bordershaw"
          :style="{height:'90px',width:'80%',backgroundColor:item.bgc,overflow:'hidden'}"
        >
          <el-row
            type='flex'
            justify='start'
            style="margin: 10px 0 30px 0;paddingLeft:10px"
          >
            <el-col
              :span="24"
              style="fontSize:8px"
            >{{item.tp}}</el-col>
          </el-row>
          <el-row style="float:right;paddingRight:10px">
            <el-col :span="14">{{item.bt}}</el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row
      gutter="3"
      style="paddingLeft:2%"
    >
      <el-col
        :span="9"
        offset=""
      >
        <el-card>
          <chart
            :conternheight='400'
            :options='options'
          ></chart>
        </el-card>
      </el-col>
      <el-col
        :span="13"
        offset="1"
      >
        <el-card>
          <chart
            :conternheight='400'
            :options='options1'
          ></chart>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import chart from './echartsmodule'
import { dateFormat } from '@/utils/index.js'
export default {
  components: {
    chart
  },
  data() {
    return {
      toplist: [
        {
          bgc: '#FFDF25',
          tp: 'Total Request',
          bt: '123,223,222'
        },
        {
          bgc: '#199ED8',
          tp: 'Success Request',
          bt: '123,223,200'
        },
        {
          bgc: '#CC3300',
          tp: 'Failed Request',
          bt: '22'
        },
        {
          bgc: '#D0E17D',
          tp: 'Log Size',
          bt: '22.02GB'
        },
        {
          bgc: '#666666',
          tp: 'Avg Request Time',
          bt: '15ms'
        }
      ],
      options: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: [ '总数', '成功', '失败' ]
        },
        grid: {
          left: '5%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            minInterval: 1,
            axisLabel: {
              interval: 0,
              rotate: 25
            },
            boundaryGap: true,
            data: Array(7).fill(1608186891015).map((e, i) => e - 1000 * 60 * 60 * i).map(e => dateFormat(new Date(e), 'yyyy-MM-dd h:m:s'))
          }
        ],
        yAxis: {
          type: 'value',
          name: '请求数',
          min: 0,
          max: 1000,
          interval: 100,
        },
        series: [
          {
            name: '失败',
            type: 'line',
            stack: '失败',
            data: [ 0, 60, 101, 134, 160, 230, 250 ]
          },
          {
            name: '成功',
            type: 'line',
            stack: '成功',
            data: [ 0, 72, 191, 234, 290, 330, 360 ]
          },
          {
            name: '总数',
            type: 'line',
            stack: '总数',
            data: [ 0, 132, 292, 337, 450, 550, 610 ]
          }
        ]
      },
      options1: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          data: [ '平均响应时间' ]
        },
        xAxis: [
          {
            type: 'category',
            data: Array(120).fill(1608186891015).map((e, i) => e - 1000 * 60 * i).map(e => dateFormat(new Date(e), 'yyyy-MM-dd h:m:s')),
            axisPointer: {
              type: ''
            },
            interval: 10
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '平均响应时间',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: '{value} ms'
            }
          }
        ],
        series: [
          {
            barWidth: 3,
            name: '平均响应时间',
            type: 'bar',
            data: [ 2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3 ]
          },
          // {
          //   barWidth: 3,
          //   name: '平均响应时间1',
          //   type: 'bar',
          //   data: [ 2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3 ]
          // },

        ]
      }
    }
  },
  created() {
    console.log(dateFormat(new Date(1608186891015), 'yyyy-MM-dd h:m:s'))
  },
}
</script>
<style lang="scss" scope>
.bordershaw {
  box-shadow: darkgrey 10px 10px 10px 0;
}
</style>