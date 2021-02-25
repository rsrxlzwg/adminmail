<template>
  <div>
    <el-form
      ref="fileData"
      :model="fileData"
      label-width="85px"
      label-position="left"
    >

      <el-form-item label="名称">
        <el-input
          size="small"
          v-model="fileData.registryName"
          placeholder=""
        ></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select
          style="width:100%"
          v-model="fileData.registryType"
          size="small"
        >
          <el-option
            label="Zookeeper"
            value="1"
          />
          <el-option
            label="Nacos"
            value="2"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="地址">
        <el-card>
          <rendertable
            :tableHeader='tableHeader'
            :tableData='fileData.addressTable'
            :showpagination='false'
          />
        </el-card>
        <!-- <el-input
              size="small"
              v-model="fileData.address"
              placeholder=""
            ></el-input> -->
        <!-- <el-select
              v-model="fileData.address"
              size="small"
              multiple
              placeholder="请选择"
            >
              <el-option
                v-for="item in ['10.182.33.19','10.182.33.20']"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select> -->

      </el-form-item>

      <el-form-item label="备注">
        <el-input
          type="textarea"
          size="small"
          v-model="fileData.registryComment"
          placeholder=""
        ></el-input>
      </el-form-item>
      <el-form-item
        label="测试信息"
      >
        <el-input
          :disabled="true"
          size="small"
          type="textarea"
          v-model="fileData.info"
          placeholder=""
        ></el-input>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import rendertable from '@/views/projectManagement/components/table'
export default {
  components: {
    rendertable
  },
  props: {
    fileData: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  data() {
    return {
      showInfo: false,
      tableHeader: [
        {
          prop: 'IPaddress',
          label: 'IP地址',
          render: (h, { row }) => {
            return h('el-input', {
              attrs: {
                size: 'mini',
                value: row[ 'IPaddress' ]
              },
              style: {
                width: '100%'
              },
              on: {
                input: e => {
                  row[ 'IPaddress' ] = e
                }
              }
            })
          }
        }, {
          prop: 'port',
          label: '端口',
          render: (h, { row }) => {
            return h('el-input', {
              attrs: {
                size: 'mini',
                value: row[ 'port' ]
              },
              style: {
                width: '100%'
              },
              on: {
                input: e => {
                  row[ 'port' ] = e
                }
              }
            })
          }
        }, {
          prop: 'edit',
          label: '操作',
          render: (h, { index, row }) => {
            return h('span', this.fileData.addressTable.length > 1 ? [ 'el-icon-circle-plus-outline', 'el-icon-remove-outline' ].map(e => {
              return h('i', {
                attrs: {
                  class: e
                },
                style: {
                  marginRight: '7px',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    if (e === 'el-icon-circle-plus-outline') {
                      this.$emit('addAddress')
                    } else {
                      // this.tableData.splice(index, 1)
                      this.$emit('delAddress',index)
                    }
                  }
                }
              })
            }) : [ 'el-icon-circle-plus-outline' ].map(e => {
              return h('i', {
                attrs: {
                  class: e
                },
                on: {
                  click: e => {
                    this.$emit('addAddress')
                    // this.tableData.push({
                    //   IPaddress: '',
                    //   port: ''
                    // })
                  }
                }
              })
            }))
          }
        }
      ],
      tableData: [
        {
          IPaddress: '',
          port: ''
        }
      ]

    }

  },
  methods: {
    showInfos() {
      this.showInfo = !this.showInfo
    }

  }
}

</script>

<style lang="scss" scoped>
/deep/ .el-radio {
  margin-bottom: 30px;
}
</style>