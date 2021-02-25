<template>
  <div>
    <el-row v-for="item in listdata">
      <el-col
        class="lincol"
        :span="24"
      >
        <el-row
          type="flex"
          justify="space-between"
          align="middle"
        >
          <el-col :span="4">
            <span style="fontSize:14px">{{item.name}}</span>
          </el-col>
          <el-col
            style="fontSize:14px"
            :span="20"
          >
            <el-row>
              <el-col :span="24">
                <span v-if="item.type==='text'">{{item.value}}</span>
                <span v-if="item.type==='table'">
                  <renderdate
                    :tableHeader='item.value.tableHeader'
                    :tableData='item.value.tableData'
                    :showpagination='false'
                  />
                </span>
              </el-col>
            </el-row>
            <el-row
              v-for="(items,key) in item.children"
              :key="key"
              v-if="'children' in item"
            >
              <el-col
                :span="24"
                style="margin:5px 0"
              >
                <span v-if="items.type==='text'">{{items.value}}</span>
                <span v-if="items.type==='table'&&items.show">
                  <renderdate
                    :tableHeader='items.value.tableHeader'
                    :tableData='items.value.tableData'
                    :showpagination='false'
                  />
                  <el-button
                    size="mini"
                    type="primary"
                    icon="el-icon-plus"
                    circle
                    @click="items.value.tableData.push({name:'app',value:'app-wds-dwadaw=2515'})"
                  ></el-button>
                </span>
                <span
                  style="margin:55px 0"
                  v-if="items.type==='table'&&!items.show"
                >
                  <el-select
                    size="small"
                    v-model="value"
                    placeholder="请选择"
                  >

                  </el-select>
                </span>
                <span v-if="items.type==='radio'">
                  <el-radio
                    v-model="radio"
                    :label="key + 1"
                    style="fontSize:14px"
                  >{{items.value}}</el-radio>
                </span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import renderdate from '@/views/projectManagement/components/table'
export default {
  data() {
    return {
      radio: 2,
      listdata: [
        {
          name: '选择器',
          value: '',
          type: 'text',
          children: [
            {
              name: '',
              value: '一个服务',
              type: 'radio'
            },
            {
              name: '',
              value: '指定标签下的容器组',
              type: 'radio'
            },

            {
              name: '端口',
              value: {
                tableHeader: [
                  {
                    prop: 'name',
                    label: '键'
                  },
                  {
                    prop: 'value',
                    label: '值'
                  },
                  {
                    prop: 'edit',
                    label: '编辑',
                    render: (h, params) => {
                      return h('i', {
                        attrs: {
                          class: 'el-icon-remove-outline',
                        },
                        style: {
                          color: '#ccc',
                          fontSize: '14px',
                          cursor: 'pointer'
                        }
                      })
                    }
                  }
                ],
                tableData: [ {
                  name: 'app',
                  value: 'app-wds-dwadaw=2515'
                } ]
              },
              type: 'table',
              show: true
            },
            // {
            //   name: 'add',
            //   value: '',
            //   type: 'button',
            //   callback: () => {
            //     let a = this.listdata.find(e => e.name === '选择器')
            //     a.children.find(e => e.type === 'table').value.tableData.push({
            //       name: 'app',
            //       value: 'app-wds-dwadaw=2515'
            //     })

            //   }
            // },
            {
              value: '通过选择器选择对应得后端服务',
              type: 'text'
            }
          ]
        },
        {
          name: '端口',
          value: '',
          type: 'text',
          children: [
            {
              name: '端口',
              value: {
                tableHeader: [
                  {
                    prop: 'name',
                    label: '容器组端口'
                  },
                  {
                    prop: 'value',
                    label: '集群ip端口'
                  },
                  {
                    prop: 'value1',
                    label: '负载均衡端口'
                  },
                  {
                    prop: 'edit',
                    label: '编辑',
                    render: (h, params) => {
                      return h('i', {
                        attrs: {
                          class: 'el-icon-remove-outline',
                        },
                        style: {
                          color: '#ccc',
                          fontSize: '14px',
                          cursor: 'pointer'
                        }
                      })
                    }
                  }
                ],
                tableData: [ {
                  name: '80',
                  value: '80',
                  value1: '33014'
                } ]
              },
              type: 'table',
              show: true
            },
            {
              name: 'add',
              value: '',
              type: 'button',
              callback: () => {
                let a = this.listdata.find(e => e.name === '端口')
                a.children.find(e => e.type === 'table').value.tableData.push({
                  name: 'app',
                  value: 'app-wds-dwadaw=2515'
                })

              }
            },
            {
              value: '通过选择器选择对应得后端服务',
              type: 'text'
            }
          ]
        }
      ]
    }
  },
  watch: {
    radio(value) {
      if (value == 1) {
        this.listdata[ 0 ].children[ 2 ].show = false
      } else {
        this.listdata[ 0 ].children[ 2 ].show = true
      }
    }
  },
  methods: {
    addlist(fun) {
      fun && fun()
    }
  },
  components: {
    renderdate
  }
}
</script>

<style scoped lang="scss">
.lincol {
  border-bottom: 1px solid #f1f3f5;
  padding: 14px 0;
}
/deep/ .el-radio span {
  font-size: 14px;
}
</style>
