<template>
  <div>
    <el-card>
     <el-row>
       <el-col :span="6">
         <span style="margin-right:5px">所属应用 </span>
           <el-select
        v-model="type"
        size="small"
     
        @change="handleChange"
      >
        <el-option
          label="账户查询服务"
          :value="1"
        />
        <el-option
          label="转账服务"
          :value="2"
        />
        <el-option
          label="信息修改"
          :value="3"
        />
      </el-select>
        </el-col >
         <el-col :span="6">
         <span style="margin-right:5px">所属服务</span>
           <el-select
        v-model="type"
        size="small"
   
        @change="handleChange"
      >
        <el-option
          label="交易明细查询"
          :value="1"
        />
      </el-select>
        </el-col>
     </el-row>

   
    
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
import graphChart from '@/components/Charts/graphChart2'

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
            name: '负载均衡',
            id: 1,
            x: 20,
            y: 19,
            symbolSize: [ 800, 30 ],
            symbolOffset: [ '15%', 0 ],
            value: {
              name: '负载均衡',
              ip: '192.168.1.3',
              port: '8001'
            },
            category: 0,
          },
          {
            name: '网格',
            id:22,
            value: {
              name: '网格'
            },
            category: 5,
            x: 10,
            y: 10.5,
          },
          {
            name: '网格',
            id:32,
            value: {
              name: '网格'
            },
            category: 5,
            x: 25,
            y: 10.5,
          },
          {
            name: '网格',
            id:52,
            value: {
              name: '网格'
            },
            category: 5,
            x: 40,
            y: 10.5,
          },
          {
            name: '网格',
            id: 70,
            value: {
              name: '网格'
            },
            category: 5,
            x: 10,
            y: 27.5,
          }, 
          {
            name: '网格',
            id: 110,
            value: {
              name: '网格'
            },
            category: 5,
            x: 25,
            y: 27.5,
          },
           {
            name: '网格',
            id: 130,
            value: {
              name: '网格'
            },
            category: 5,
            x: 40,
            y: 27.5,
          },
          {
            name: '从1',
            id: 2,
            value: {
              name: '消费方SDK',
              ip: '192.168.1.110',
              port: '8001'
            },
            category: 1,
            x: 10,
            y: 12,

          },
          {
            name: '消费方实例1',
            id: 21,
            value: {
              name: '消费方实例1',
              ip: '192.168.1.3',
              port: '9003'
            },
            category: 6,
            x: 10,
            y: 8,
          },
           
         
          {
            name: '从1',
            id: 3,
            value: {
              name: '消费方SDK',
              ip: '192.168.1.111',
              port: '8001'
            },
            category: 2,
            x: 25,
            y: 12,
          },
           {
            name: '消费方实例2',
            id: 31,
            value: {
              name: '消费方实例2',
              ip: '192.168.1.3',
              port: '9003'
            },
            category: 6,
            x: 25,
            y: 8,
          },
           
        
          {
            name: '从1',
            id: 5,
            value: {
              name: '消费方SDK',
              ip: '192.168.1.112',
              port: '8001'
            },
            category: 1,
            x: 40,
            y: 12,
          },
           {
            name: '消费方实例1',
            id: 51,
            value: {
              name: '消费方实例1',
              ip: '192.168.1.3',
              port: '9003'
            },
            category: 6,
            x: 40,
            y: 8,
          },
           
          {
            name: '从2',
            id: 6,
            value: {
              name: '服务方SDK',
              ip: '192.168.1.210',
              port: '8001'
            },
            category: 1,
            x: 10,
            y: 26,
          },
          {
            name: '服务方实例1',
            id: 7,
            value: {
              name: '服务方实例1',
              ip: '192.168.1.3',
              port: '8002'
            },
            category: 6,
            x: 10,
            y: 30,
          },
              
          {
            name: '从2',
            id: 10,
            value: {
              name: '服务方SDK',
              ip: '192.168.1.211',
              port: '8001'
            },
            category: 2,
            x: 25,
            y: 26,
          },
          {
            name: '服务方实例1',
            id: 11,
            value: {
              name: '服务方实例3',
              ip: '192.168.1.3',
              port: '9003'
            },
            category: 6,
            x: 25,
            y: 30,
          },
           
          {
            name: '从2',
            id: 12,
            value: {
              name: '服务方SDK',
              ip: '192.168.1.212',
              port: '8001'
            },
            category: 1,
            x: 40,
            y: 26,
          },
          {
            name: '从2',
            id: 13,
            value: {
              name: '服务方实例4',
              ip: '192.168.1.6',
              port: '9003'
            },
            category: 6,
            x: 40,
            y: 30,
          },
          
          {
            name: '消费放系统A',
            id: 20,
            x: 0,
            y: 10,
            value: {
              name: '系统模块',
              ip: '192.168.1.3',
              port: '8001'
            },
            category: 3,
          },
          {
            name: '服务方系统B',
            id: 30,
            x: 0,
            y: 28,
            value: {
              name: '系统模块',
              ip: '192.168.1.3',
              port: '8001'
            },
            category: 3,
          },
          ...Array(3).fill({}).map((e, i) => {
            return {
              name: '指引',
              id: 33 + i,
              x: 10 + 15 * i,
              y: 17,
              value: {
                name: '引导'
              },
              category: 4,
            }
          }),
          ...Array(3).fill({}).map((e, i) => {
            return {
              name: '指引',
              id: 43 + i,
              x: 10 + 15 * i,
              y: 22,
              value: {
                name: '引导'
              },
              category: 4,
            }
          })

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