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
              label-width="100px"
            >
              <el-form-item label="协议名称">
                <el-input
                  v-model="form.name"
                  size="mini"
                />
              </el-form-item>
              <el-form-item
                v-for="item in [{name:'访问模式',model:'region',option:['c端接入','测试C端']},{name:'协议类型',model:'region1',option:['TCPserverICSERVER']},{name:'所属系统名称',model:'region2',option:['综合前端ABS']},{name:'报文类型',model:'region3',option:['testbaowen']},{name:'模式',model:'region4',option:['sysnchronus']},{name:'异常处理',model:'region5',option:['defaultexception']}]"
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
                  <!-- <el-option
                    label="区域二"
                    value="beijing"
                  ></el-option> -->
                </el-select>
              </el-form-item>
            </el-form>
          </el-card>
          <el-card style="marginBottom:20px">
            <span slot="header">请求参数</span>
            <el-form
              ref="form"
              :model="form"
              label-width="100px"
            >
              <el-form-item
                v-for="item in [{name:'地址',model:'parameter',option:['http:192.168.1.1']},{name:'请求方式',model:'parameter1',option:['post']},{name:'数据处理方式',model:'parameter2',option:['toBytes']},{name:'启动类型',model:'parameter3',option:['jetty']},{name:'请求编码',model:'parameter4',option:['UTF-8']},{name:'请求流程',model:'parameter5',option:['default_pllotst_dc']},{name:'线程池类型',model:'parameter6',option:['framePools']}]"
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
                  <!-- <el-option
                    label="区域二"
                    value="beijing"
                  ></el-option> -->
                </el-select>
              </el-form-item>
            </el-form>
          </el-card>
          <el-card style="marginBottom:20px">
            <span slot="header">响应参数</span>
            <el-form
              ref="form"
              :model="form"
              label-width="120px"
            >
              <el-form-item label="长度解析实现类">
                <el-input
                  v-model="form.name1"
                  size="mini"
                />
              </el-form-item>
              <el-form-item label="超时时间">
                <el-input
                  v-model="form.name2"
                  size="mini"
                />
              </el-form-item>
              <el-form-item label="响应策略">
                <el-input
                  v-model="form.name3"
                  size="mini"
                />
              </el-form-item>
              <el-form-item
                v-for="item in [{name:'响应编码',model:'response',option:['UTF-8']},{name:'响应流程',model:'response1',option:['default_pllotst_dc']},{name:'数据处理方式',model:'response2',option:['toBytes']}]"
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
                  <!-- <el-option
                    label="区域二"
                    value="beijing"
                  ></el-option> -->
                </el-select>
              </el-form-item>
            </el-form>
          </el-card>
          <el-card style="marginBottom:20px">
            <span slot="header">高级参数</span>
            <el-row
              :gutter="5"
              style="marginBottom:20px"
            >
              <el-col :span="2">
                <el-button
                  size="mini"
                  icon="el-icon-plus"
                  circle
                  @click="tableData.push({ key: '',value: ''})"
                />
              </el-col>
              <el-col :span="2">
                <el-button
                  size="mini"
                  icon="el-icon-delete"
                  circle
                />
              </el-col>
            </el-row>
            <rendertable
              :table-header="tableHeader"
              :table-data="tableData"
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
          <el-select
            v-model="form.region9"
            size="mini"
            style="width:80%"
            placeholder=""
          >
            <el-option
              label="default_pllotst_dc"
              value="shanghai"
            />
          </el-select>
        </div>
        <rendertable
          :table-header="tableHeader1"
          :table-data="tableData1"
        />
      </el-tab-pane>

    </el-tabs>

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
