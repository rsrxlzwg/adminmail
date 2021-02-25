<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      label-width="100px"
      label-position="left"
    >
      <el-form-item label="元数据编码">
        <el-input
          v-model="form.coding"
          size="mini"
        />
      </el-form-item>
      <el-form-item label="元数据名">
        <el-input
          v-model="form.name"
          size="mini"
        />
      </el-form-item>
      <el-form-item label="属性名称">
        <el-input
          v-model="form.name1"
          size="mini"
        />
      </el-form-item>
      <el-form-item label="数据类型">
        <el-select
          v-model="form.region"
          size="mini"
          style="width:100%"
          placeholder=""
        >
          <el-option
            v-for="item in ['Integer','Byte','Date','Double','BigDecimal','Object','List','String','Boolean']"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="数据长度">
        <el-input
          v-model="form.name2"
          size="mini"
        />
      </el-form-item>

      <el-form-item label="数据精度">
        <el-input
          v-model="form.name3"
          size="mini"
        />
      </el-form-item>
      <el-form-item label="敏感字段处理">
        <el-select
          v-model="form.region1"
          size="mini"
          style="width:100%"
          placeholder=""
        >
          <el-option
            label="是"
            value="true"
          />
          <el-option
            label="否"
            value="false"
          />
        </el-select>
      </el-form-item>
    </el-form>

  </div>
</template>

<script type="text/ecmascript-6">
import rendertable from '@/views/projectManagement/components/table'
export default {
  components: {
    rendertable
  },
  data() {
    return {
      activeName: 'first',
      form: {
        name: '',
        region: '',
        region1: '',
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
