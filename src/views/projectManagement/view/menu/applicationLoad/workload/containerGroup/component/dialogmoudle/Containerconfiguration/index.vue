<template>
  <div>
    <el-tabs
      v-model="activeName"
      type="card"
      @tab-click=""
    >
      <el-tab-pane
        v-for="(item,key) in maplist"
        :label="item.name"
        :name="key"
        :key="key"
      >
        <span v-if="key == 0">
          <el-row
            type="flex"
            align="middle"
            :gutter="10"
            style="lineHeight:50px"
          >
            <el-col :span="4">命令</el-col>
            <el-col :span="8">
              <el-input
                placeholder="默认会使用镜像里面的 entrypoint"
                size="small"
              ></el-input>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            align="middle"
            :gutter="10"
            style="lineHeight:50px;borderBottom:1px solid #E4E7ED"
          >
            <el-col :span="4">命令参数</el-col>
            <el-col :span="8">
              <el-input
                placeholder="用空格隔开，默认会使用镜像里面的 cmd"
                size="small"
              ></el-input>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            align="middle"
            :gutter="10"
            style="lineHeight:50px;borderBottom:1px solid #E4E7ED"
          >
            <el-col :span="4">工作目录</el-col>
            <el-col :span="8">
              <el-input
                placeholder=""
                size="small"
              ></el-input>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            align="middle"
            :gutter="10"
            style="lineHeight:50px;borderBottom:1px solid #E4E7ED"
          >
            <el-col :span="4">工作目录</el-col>
            <el-col :span="8">
              <el-switch
                v-model="value1"
                active-text="不分配伪 TTY"
              >
              </el-switch>
            </el-col>
          </el-row>
        </span>
        <span v-if="key == 1">
          <el-row :gutter="20">
            <el-col :span="6">
              <ul class="ullist">
                <li
                  v-for="(item,key) in ullist"
                  @click="checked = key"
                  :key="key"
                  :class="checked == key?'checkedstyle':''"
                >
                  {{item.value}}
                </li>
              </ul>
              <el-row :gutter="10">
                <el-col :span="5">
                  <i
                    @click="add"
                    style="fontSize:30px;cursor:pointer"
                    class="el-icon-circle-plus-outline"
                  ></i>
                </el-col>
                <el-col :span="5">
                  <i
                    @click="reduce"
                    style="fontSize:30px;cursor:pointer"
                    class="el-icon-remove-outline"
                  ></i>
                </el-col>
              </el-row>
            </el-col>
            <el-col
              :span="15"
              offset="1"
            >
              <ul>
                <li
                  v-for="(item,key) in radiolist"
                  :key="key"
                  style="lineHeight:20px"
                >
                  <el-radio
                    v-model="radio"
                    :label="key+1"
                  >{{item.name}}</el-radio>
                </li>
              </ul>
            </el-col>
          </el-row>
        </span>
        <span v-if="key == 2">
          <renderdate
            :tableHeader='tableHeader'
            :tableData='tableData'
            :option="{ headerfontsize: 12,lineHeight: 30}"
            :showpagination='false'
            style="marginBottom:20px"
          />
          <div>
            <el-button
              type="primary"
              size="small"
              @click="dialogVisible=true"
            >添加配置项</el-button>
          </div>
        </span>
        <span v-if="key == 3">
          <el-row
            v-for="(item,key) in healthlist"
            type="flex"
            align="middle"
            :key="key"
            style="borderBottom:1px solid #E4E7ED;lineHeight:60px"
          >
            <el-col :span="4">
              <span>{{item.name}}</span>
            </el-col>
            <el-col :span="20">
              <ul class="rowul">
                <li
                  class="rowli"
                  v-for="(items,keys) in item.radiolist"
                >
                  <el-radio
                    v-model="item.model"
                    :label="keys + 1"
                  >{{items.name}}</el-radio>
                </li>
              </ul>
            </el-col>
          </el-row>
        </span>
        <span v-if="key == 4">
          <el-row
            v-for="(item,key) in leftlist"
            type="flex"
            align="middle"
            :key="key"
            style="borderBottom:1px solid #E4E7ED;lineHeight:60px"
          >
            <el-col :span="4">
              <span>{{item.name}}</span>
            </el-col>
            <el-col :span="20">
              <ul class="rowul">
                <li
                  class="rowli"
                  v-for="(items,keys) in item.radiolist"
                >
                  <el-radio
                    v-model="item.model"
                    :label="keys + 1"
                  >{{items.name}}</el-radio>
                </li>
              </ul>
            </el-col>
          </el-row>
        </span>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      title="添加配置项"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      append-to-body
    >
      <el-row
        style="marginBottom:10px"
        type="flex"
        align="middle"
      >
        <el-col :span="4">
          类型
        </el-col>
        <el-col :span="20">
          <el-select
            size="small"
            v-model="value"
            placeholder="配置项，秘钥"
          >

          </el-select>
        </el-col>
      </el-row>
      <el-row
        style="marginBottom:10px"
        type="flex"
        align="middle"
      >
        <el-col :span="4">
          配置项名称
        </el-col>
        <el-col :span="20">
          <el-row
            :gutter="10"
            type="flex"
            align="middle"
          >
            <el-col :span="8">
              <el-select
                size="small"
                v-model="value"
                placeholder="请选择配置项类型"
              >

              </el-select>
            </el-col>
            <el-col :span="1">/</el-col>
            <el-col :span="8">
              <el-select
                size="small"
                v-model="value"
                placeholder="全部"
              >

              </el-select>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row
        style="marginBottom:10px"
        type="flex"
        align="middle"
      >
        <el-col :span="4">
          容器路径
        </el-col>
        <el-col :span="7">
          <el-input
            size="small"
            placeholder="必填"
          ></el-input>
        </el-col>
      </el-row>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>

      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import renderdate from '@/views/projectManagement/components/table'
export default {
  data() {
    return {
      radio1: '',
      radio2: '',
      dialogVisible: false,
      radio: '',
      checked: '',
      value1: '',
      activeName: 0,
      tableHeader: [
        {
          prop: 'Configuration',
          label: '配置'
        },
        {
          prop: 'type',
          label: '类型'
        },
        {
          prop: 'path',
          label: '路径'
        },
        {
          prop: 'edit',
          label: '操作',
          render: (h, params) => {
            return h('span', [
              h('i', {
                style: {
                  cursor: 'pointer'
                },
                attrs: {
                  class: 'el-icon-edit'
                },
                on: {
                  click: () => {
                    this.dialogVisible = true
                  }
                }
              }),
              h('i', {
                style: {
                  marginLeft: '10px',
                  cursor: 'pointer'
                },
                attrs: {
                  class: 'el-icon-delete'
                }
              })
            ])
          }
        }
      ],
      tableData: [
        {
          Configuration: 'basecontrol7-10.6.150.50',
          type: '加密配置文件',
          path: '/'
        }
      ],
      leftlist: [
        {
          name: '容器启动后操作',
          radiolist: [
            {
              name: '执行命令'
            },
            {
              name: '发送 GET 请求'
            },

            {
              name: '不检查'
            }
          ],
          model: 'radio1'
        },
        {
          name: '容器停止前操作',
          radiolist: [
            {
              name: '执行命令'
            },
            {
              name: '发送 GET 请求'
            },

            {
              name: '不检查'
            }
          ],
          model: 'radio2'
        }
      ],
      healthlist: [
        {
          name: '存活检查',
          radiolist: [
            {
              name: '执行命令'
            },
            {
              name: '发送 GET 请求'
            },
            {
              name: '测试 TCP Socket 连接'
            },
            {
              name: '不检查'
            }
          ],
          model: 'radio1'
        },
        {
          name: '就绪检查',
          radiolist: [
            {
              name: '执行命令'
            },
            {
              name: '发送 GET 请求'
            },
            {
              name: '测试 TCP Socket 连接'
            },
            {
              name: '不检查'
            }
          ],
          model: 'radio2'
        }
      ],
      maplist: [
        {
          name: '基本设置'
        },
        {
          name: '环境变量'
        },
        {
          name: '配置文件'
        },
        {
          name: '健康检查'
        },
        {
          name: '生命周期'
        }
      ],
      radiolist: [
        {
          name: '普通环境变量'
        },
        {
          name: '选择单个配置项值'
        },
        {
          name: '选择整个配置项'
        },
        {
          name: '选择单个加密文件值'
        },
        {
          name: '选择整个加密文件'
        }
      ],
      ullist: Array(8).fill({
        value: '未设置'
      })
    }
  },
  methods: {
    add() {
      this.ullist.push({
        value: '未设置'
      })
    },
    reduce() {
      this.ullist.pop()
    }
  },
  components: {
    renderdate
  }
}
</script>

<style scoped lang="scss">
.rowul .rowli {
  display: inline-block;
  padding: 0 10px;
}
.ullist {
  height: 320px;
  overflow: auto;
  width: 100%;
  :nth-child(odd) {
    background-color: #f1f7fe;
  }
  li {
    line-height: 36px;
    align-items: center;
  }
}
.checkedstyle {
  background-color: #3890ff !important;
  color: #fff;
}
</style>
