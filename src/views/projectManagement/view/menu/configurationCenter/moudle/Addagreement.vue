<template>
  <div>
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="协议基本信息"
        name="first"
      >
        <div class="overflow">
          <el-card style="marginBottom:20px">
            <span slot="header">基本信息</span>
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
          <el-card style="marginBottom:20px">
            <span slot="header">请求参数</span>
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
          <el-card style="marginBottom:20px">
            <span slot="header">响应参数</span>
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
          <el-card style="marginBottom:20px">
            <span slot="header">高级参数</span>
            <el-row :gutter="5">
              <el-col :span="2">
                <el-button
                  size="mini"
                  icon="el-icon-plus"
                  circle
                  @click="tableData.push({ key: '',
          value: ''})"
                ></el-button>
              </el-col>
              <el-col :span="2">
                <el-button
                  size="mini"
                  icon="el-icon-delete"
                  circle
                ></el-button>
              </el-col>
            </el-row>
            <rendertable
              :tableHeader='tableHeader'
              :tableData='tableData'
              :showselect='true'
            />
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane
        label="适配流程"
        name="second"
      >
        <div style="marginBottom:20px">
          <span style="marginRight:10px">适配流程</span>
          <el-input
            style="width:80%"
            size="mini"
          >
          </el-input>
        </div>
        <rendertable
          :tableHeader='tableHeader1'
          :tableData='tableData1'
        />
      </el-tab-pane>

    </el-tabs>

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
