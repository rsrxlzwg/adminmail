<template>
  <div>
    <el-card style="marginBottom:20px">
      <span slot="header">基本信息</span>
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
      >

        <el-form-item
          v-for="item in [{name:'协议名称',model:'region',option:['CSAbbCONNECTOR']},{name:'识别类型',model:'region1',option:['动态识别']},{name:'识别模式',model:'region5',option:['xml']},{name:'字符集',model:'region2',option:['UTF-8']}]"
          :label="item.name"
        >
          <el-select
            size="mini"
            style="width:100%"
            v-model="form[item.model]"
            placeholder=""
          >
            <el-option
              v-for="items in item.option"
              :label="items"
              :value="items"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="识别条件">
          <el-input
            size="mini"
            v-model="form.name"
          ></el-input>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>

<script type="text/ecmascript-6">
import rendertable from '@/views/projectManagement/components/table'
export default {
  data() {
    return {
      activeName: 'first',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      tableHeader: [
        // {
        //   prop: 'secection',
        //   label: '选择',
        //   render: (h, { row }) => {
        //     return h('el-checkbox')
        //   }
        // },
        {
          prop: 'key',
          label: 'key',
          render: (h, { row }) => {
            return h('el-input', {
              attrs: {
                size: 'mini',
                value: row[ 'key' ]
              },
              on: {
                input: (e) => {
                  row[ 'key' ] = e
                }
              }
            })
          }
        },
        {
          prop: 'value',
          label: 'value',
          render: (h, { row }) => {
            return h('el-input', {
              attrs: {
                size: 'mini',
                value: row[ 'value' ]
              },
              on: {
                input: (e) => {
                  row[ 'value' ] = e
                }
              }
            })
          }
        }
      ],
      tableData: [
        {
          key: '',
          value: ''
        }
      ],
      tableHeader1: [
        {
          prop: 'servicename',
          label: '服务名称'
        },
        {
          prop: 'Enforce',
          label: '强制执行'
        }
      ],
      tableData1: [
        {
          servicename: 'serversditifineserver',
          Enforce: 'false'
        }
      ]
    }
  },
  components: {
    rendertable
  }
}
</script>

<style scoped lang="scss">
.el-form-item {
  margin-bottom: 0;
}
.overflow {
  overflow: auto;
  height: 400px;
}
</style>
