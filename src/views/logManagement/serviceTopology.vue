<template>
  <div>
    <el-card>
      <span>所属应用 </span>
      <el-select
        v-model="type"
        size="small"
        style="width:20%"
        @change="handleChange"
      >
        <el-option
          label="同一客户信息平台"
          :value="1"
        />
        <el-option
          label="客户信息"
          :value="2"
        />
      </el-select>
      <div>
        <graph-chart
          :chartData="chartData"
          ref="child"
          height="75vh"
        />

      </div>
    </el-card>

  </div>
</template>

<script>
import graphChart from '@/components/Charts/graphChart1'

export default {
  components: {
    graphChart,
  },
  data() {
    return {
      type: 1,
      chartData: {
        data: [
          {
            name: '统一客户信息平台',
            id: 1,
            x: 25,
            y: 20,
            value: {
              name: '网关SDK-A001',
              ip: '192.168.1.3',
              port: '8001'
            },
            category: 0,
          },
          {
            name: '网格',
            id: 40,
            value: {
              name: '网格'
            },
            category: 3,
            x: 10,
            y: 31,
            // z :0,

          },
          {
            name: '网格',
            id: 41,
            value: {
              name: '网格'
            },
            category: 3,
            x: 20,
            y: 31,
            // zlevel:0,

          },
          {
            name: '网格',
            id: 42,
            value: {
              name: '网格'
            },
            category: 3,
            x: 30,
            y: 31,
            // zlevel:0,

          },
          {
            name: '网格',
            id: 43,
            value: {
              name: '网格'
            },
            category: 3,
            x: 40,
            y: 31,
            // zlevel:0,

          },
          {
            name: '从2',
            id: 6,
            value: {
              name: '网关SDK-A001',
              ip: '192.168.1.3',
              port: '8001'
            },
            category: 1,
            x: 10,
            y: 30,
            // zlevel:5,

         
          },
          {
            name: '从2',
            id: 7,
            value: {
              name: '应用实例1',
              ip: '192.168.1.3',
              port: '8002'
            },
            category: 4,
            x: 10,
            y: 32.5,
                // zlevel:5,
         
          },
          {
            name: '从2',
            id: 8,
            value: {
              name: '网关SDK-A001',
              ip: '192.168.1.3',
              port: '8002'
            },
            category: 1,
            x: 20,
            y: 30,
                // zlevel:5,
          },
          {
            name: '从2',
            id: 9,
            value: {
              name: '应用实例2',
              ip: '192.168.1.3',
              port: '8004'
            },
            category: 4,
            x: 20,
            y: 32.5,
                // zlevel:5,
          },
          {
            name: '从2',
            id: 10,
            value: {
              name: '网关SDK-A001',
              ip: '192.168.1.4',
              port: '8001'
            },
            category: 2,
            x: 30,
            y: 30,
                // zlevel:5,
          },
          {
            name: '从2',
            id: 11,
            value: {
              name: '应用实例3',
              ip: '192.168.1.3',
              port: '9003'
            },
            category: 4,
            x: 30,
            y: 32.5,
                // zlevel:5,
          },
          {
            name: '从2',
            id: 12,
            value: {
              name: '网关SDK-A001',
              ip: '192.168.1.5',
              port: '8001'
            },
            category: 1,
            x: 40,
            y: 30,
                // zlevel:5,
          },
          {
            name: '从2',
            id: 13,
            value: {
              name: '应用实例4',
              ip: '192.168.1.6',
              port: '9003'
            },
            category: 4,
            x: 40,
            y: 32.5,
                // zlevel:5,
          }

        ],
        links: [
          {
            source: '1',
            target: '2'
          },
          {
            source: '1',
            target: '3'
          },
          {
            source: '1',
            target: '4'
          },
          {
            source: '1',
            target: '5'
          },
          {
            source: '1',
            target: '6'
          },
          {
            source: '1',
            target: '8'
          },
          {
            source: '1',
            target: '10'
          },
          {
            source: '1',
            target: '12'
          },


        ],
      },
    }
  },
  methods: {
    handleChange(val) {
      console.log({ val })
      if (val == 1) {
        this.chartData.data[ 0 ].name = '统一客户信息平台'
        this.chartData.data.map(i => {
          if (i.id == 2 || i == 6) {
            i.category = 1
          }
        })
      } else {
        this.chartData.data[ 0 ].name = '客户信息'
        this.chartData.data.map(i => {
          if (i.id == 2 || i == 6) {
            i.category = 2
          }
        })
      }
      this.$refs.child.initChart()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>