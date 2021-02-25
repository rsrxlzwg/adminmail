<template>
  <div>
    <div class="overflow">
      <el-card style="marginBottom:20px">
        <span slot="header">服务定义管理</span>
        <el-form
          ref="form"
          :model="form"
          label-width="80px"
        >
          <el-form-item label="系统简称">
            <el-input
              size="mini"
              v-model="form.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="系统ID">
            <el-input
              size="mini"
              v-model="form.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="系统名称">
            <el-input
              size="mini"
              v-model="form.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="系统类型">
            <el-select
              size="mini"
              style="width:100%"
              v-model="form.region"
              placeholder=""
            >
              <el-option
                label="区域一"
                value="shanghai"
              ></el-option>
              <el-option
                label="区域二"
                value="beijing"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="系统描述">
            <el-input
              size="mini"
              type="textarea"
              v-model="form.desc"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-card>

    </div>

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
}
</style>
