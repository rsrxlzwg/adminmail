<template>
  <div>
    <el-card>
     <el-row>
       <!-- <el-col :span="6">
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
        </el-col> -->
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
import graphChart from '@/components/Charts/graphChart3'

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
            id: "0",
            name: "网关SDK",
            value: 28.685715,
            label:{
              name:'网关SDK-A001',
              ip:'192.168.1.3',
              port:'8001'
            }
          },
          {
            id: "1",
            name: "网关SDK",
            value: 28.685715,
            label:{
              name:'网关SDK-A001',
              ip:'192.168.1.3',
              port:'8002'
            }
          },
           {
            id: "2",
            name: "网关SDK",
            value: 28.685715,
            label:{
              name:'网关SDK-A001',
              ip:'192.168.1.3',
              port:'8003'
            }
          },
           {
            id: "3",
            name: "网关SDK",
            value: 28.685715,
            label:{
              name:'网关SDK-A001',
              ip:'192.168.1.3',
              port:'8001'
            }
          },
           {
            id: "4",
            name: "网关SDK",
            value: 28.685715,
            label:{
              name:'网关SDK-A001',
              ip:'192.168.1.3',
              port:'8001'
            }
          },
           {
            id: "5",
            name: "网关SDK",
            value: 28.685715,
            label:{
              name:'网关SDK-A001',
              ip:'192.168.1.3',
              port:'8001'
            }
          },
            {
            id: "6",
            name: "网关SDK",
            value: 28.685715,
            label:{
              name:'网关SDK-A001',
              ip:'192.168.1.3',
              port:'8001'
            }
          },
            {
            id: "7",
            name: "网关SDK",
            value: 28.685715,
            label:{
              name:'网关SDK-A001',
              ip:'192.168.1.3',
              port:'8001'
            }
          },
            {
            id: "9",
            name: "网关SDK",
            value: 28.685715,
            label:{
              name:'网关SDK-A001',
              ip:'192.168.1.3',
              port:'8001'
            }
          },
            {
            id: "10",
            name: "网关SDK",
            value: 28.685715,
            label:{
              name:'网关SDK-A001',
              ip:'192.168.1.3',
              port:'8001'
            }
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