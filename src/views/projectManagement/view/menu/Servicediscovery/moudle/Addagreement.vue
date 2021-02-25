<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      label-width="130px"
      label-position="left"
    >
      <el-form-item
        v-for="(item,key) in ['负载均衡名称','策略解析类']"
        :label="item"
      >
        <el-input
          v-model="form['name' + key]"
          size="mini"
        />
      </el-form-item>
      <el-form-item
        v-for="item in [{name:'策略',model:'region',option:['轮询','权重','随机']}]"
        :label="item.name"
      >
        <el-select
          v-model="form[item.model]"
          size="mini"
          style="width:100%"
          placeholder=""
        >
          <el-option
            v-for="items in item.option"
            :label="items"
            :value="items"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        v-for="(item,key) in ['描述']"
        :label="item"
      >
        <el-input
          type="textarea"
          v-model="form['name1' + key]"
          size="mini"
        />
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
        //   },
        //   width: 50
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
        },
        {
          servicename: 'flowloginserver',
          Enforce: 'true'
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
