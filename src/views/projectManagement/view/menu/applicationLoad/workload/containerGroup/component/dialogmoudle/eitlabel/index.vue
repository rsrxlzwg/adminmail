<template>
  <div>
    <el-tabs
      v-model="activeName"
      type="card"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="服务标签"
        name="1"
      >
        <renderdate
          :tableHeader='tableHeader1'
          :tableData='tableData1'
          :option="{ headerfontsize: 12,lineHeight: 30}"
          :showpagination='false'
          style="marginBottom:20px"
        />
        <el-button
          @click="tableData1.push({name:'',value:''})"
          type="text"
          icon="el-icon-circle-plus"
        >添加</el-button>
      </el-tab-pane>
      <el-tab-pane
        label="容器组标签"
        name="2"
      >
        <renderdate
          :tableHeader='tableHeader1'
          :tableData='tableData2'
          :option="{ headerfontsize: 12,lineHeight: 30}"
          :showpagination='false'
          style="marginBottom:20px"
        />
        <el-button
          @click="tableData2.push({name:'',value:''})"
          type="text"
          icon="el-icon-circle-plus"
        >添加</el-button>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
import renderdate from '@/views/projectManagement/components/table'
export default {
  data() {
    return {
      input1: '',
      activeName: '1',
      tableHeader1: [
        {
          prop: 'key',
          label: '键',
          render: (h, params) => {
            return h('el-input', {
              attrs: {
                size: 'small',
                value: params.row.name
              },
              on: {
                input: (value) => {
                  params.row.name = value
                }
              },
              style: {
                padding: '10px'
              }
            }, params.row[ 'key' ])
          }
        },
        {
          prop: 'value',
          label: '值',
          render: (h, params) => {
            return h('el-input', {
              attrs: {
                size: 'small',
                value: params.row.value
              },
              on: {
                input: (value) => {
                  params.row.value = value
                }
              },
              style: {
                padding: '10px'
              }
            }, params.row[ 'key' ])
          }
        },
        {
          prop: 'edit',
          label: '操作',
          width: '50',
          render: (h, params) => {
            return h('i', {
              attrs: {
                class: 'el-icon-remove'
              },
              on: {
                click: () => {
                  if (this.activeName == 1) {
                    this.tableData1.splice(params.index, 1)
                  } else {
                    this.tableData2.splice(params.index, 1)
                  }
                }
              }
            })
          }
        }
      ],
      tableData1: [
        {
          name: 'app',
          value: 'app-2048'
        },
        {
          name: 'app.kubernetes.io/managed-by',
          value: 'Helm'
        }
      ], tableData2: [
        {
          name: 'app',
          value: 'app-2048'
        }
      ]
    }
  },
  components: {
    renderdate
  }
}
</script>

<style scoped lang="scss">
</style>
