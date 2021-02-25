<template>
  <div>
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="基本参数"
        name="first"
      >
        <div>
          <el-form
            ref="form"
            :model="form"
            label-width="120px"
            label-position="left"
          >
            <el-form-item
              v-for="item in [{name:'服务代码',model:'region',option:['2000122021']},{name:'所属系统名称',model:'region1',option:['ECIF']}]"
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
            <!-- <el-form-item label="提供方IP">
              <el-input
                size="mini"
                type="textarea"
                v-model="form.desc"
              ></el-input>
            </el-form-item> -->
            <el-form-item label="服务描述">
              <el-input
                size="mini"
                type="textarea"
                v-model="form.desc"
              ></el-input>
            </el-form-item>
          </el-form>

        </div>
      </el-tab-pane>
      <!-- <el-tab-pane
        label="适配流程"
        name="Adaptationprocess"
      >
        <div style="marginBottom:20px">
          <span style="marginRight:10px">适配流程</span>
          <el-select
            size="mini"
            style="width:80%"
            v-model="form.region"
            placeholder=""
          >
            <el-option
              label="default_fo_200019"
              value="shanghai"
            ></el-option>

          </el-select>

        </div>
        <rendertable
          :tableHeader='tableHeader1'
          :tableData='tableData1'
        />
      </el-tab-pane> -->
      <el-tab-pane
        label="协议配置"
        name="second"
      >
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
        >
          <el-form-item label="关联c端接触协议">
            <el-input
              size="mini"
              v-model="formInline.user"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="P端接入协议">
            <el-select
              size="mini"
              v-model="formInline.region"
              placeholder="请选择"
            >
              <el-option
                label="psECIFContener "
                value="shanghai"
              ></el-option>

            </el-select>
          </el-form-item>
          <el-form-item label="P端接出协议">
            <el-select
              size="mini"
              v-model="formInline.region2"
              placeholder="请选择"
            >
              <el-option
                label="psECIFAdpater "
                value="shanghai"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
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
      formInline: {
        user: '',
        region: ''
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
        },
        {
          servicename: 'logedefaultserver',
          Enforce: 'true'
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
