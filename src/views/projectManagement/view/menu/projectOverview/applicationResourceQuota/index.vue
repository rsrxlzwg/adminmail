<template>
  <div>
    <headercontener>
      <el-row
        type="flex"
        align="middle"
        :gutter="12"
      >
        <el-col :span="2">
          <span style="fontSize:'5px'">启动项类名</span>
        </el-col>
        <el-col :span="3">
          <el-input
            placeholder="请输入"
            size="mini"
          ></el-input>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="5">
              <el-button
                size="mini"
                icon="el-icon-search"
              >搜索</el-button>
            </el-col>
            <el-col :span="4">
              <el-button
                size="mini"
                icon="el-icon-delete"
              >清空</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </headercontener>

    <el-card>

      <rendertable
        :tableData='renderdata'
        :tableHeader='renderheader'
        :actionlinedata='actionlinedata'
        :showselect='true'
      />
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
import rendertable from '@/views/projectManagement/components/table'
import headercontener from '@/views/projectManagement/components/fieldset'
export default {
  data() {
    return {
      renderheader: [
        // {
        //   label: '选择',
        //   render: (h, params) => {
        //     return h('el-checkbox',
        //       {
        //         on: {
        //           change: () => { }
        //         }
        //       }
        //     )
        //   },
        //   width: '80'
        // },
        {
          prop: 'Startitemclassname',
          label: '启动项类名'
        },
        {
          prop: 'Startupsequence',
          label: '启动顺序',
          width: '120',
          render: (h, { row }) => {
            return h('span', {
              style: {
                display: 'flex',
                align: 'center'
              }
            }, [
              h('el-input', {
                style: {
                  width: '50px'
                },
                attrs: {
                  size: 'mini',
                  value: row[ 'Startupsequence' ]
                },
                on: {
                  input: (e) => {
                    row[ 'Startupsequence' ] = e
                  }
                }
              }),
              h('el-button', {
                attrs: {
                  size: 'mini',
                  circle: true,
                  icon: "el-icon-check"
                },
                style: {
                  width: '30px',
                  marginLeft: '10px',
                  fontSize: '3px'
                }
              })
            ])
          }
        },
        {
          prop: 'state',
          label: '状态',
          width: '80'
        }
      ],
      renderdata: [
        {
          Startitemclassname: 'ABS----uat4@/home/escu4/ESCTerminal/esc_conf/common/launcher:)vi preloader.xml',
          Startupsequence: '1',
          state: '已下发'
        },
        {
          Startitemclassname: 'ABS----uat4@/home/escu4/ESCTerminal/esc_conf/common/launcher:)vi preloader.xml',
          Startupsequence: '1',
          state: '已下发'
        },
        {
          Startitemclassname: 'ABS----uat4@/home/escu4/ESCTerminal/esc_conf/common/launcher:)vi preloader.xml',
          Startupsequence: '1',
          state: '已下发'
        }
      ],
      actionlinedata: [
        {
          render: (h) => {
            return h('el-button', {
              attrs: {
                size: 'mini',
                icon: "el-icon-zoom-in"
              }
            }, '新增')
          }
        },
        {
          render: (h) => {
            return h('el-button', {
              attrs: {
                size: 'mini',
                icon: 'el-icon-edit'
              }
            }, '修改')
          }
        },
        {
          render: (h) => {
            return h('el-button', {
              attrs: {
                size: 'mini',
                icon: 'el-icon-delete'
              }
            }, '删除')
          }
        },
        {
          render: (h) => {
            return h('el-button', {
              attrs: {
                size: 'mini',
                icon: 'el-icon-s-promotion'
              }
            }, '全量下发')
          }
        }
      ]
    }
  },
  components: {
    rendertable,
    headercontener
  }
}
</script>

<style scoped lang="scss">
fieldset {
  border-radius: 3px;
  padding: 20px 10px;
  border-color: #f2f2f2;
  border-width: 1px;
  margin-bottom: 20px;
}
</style>
