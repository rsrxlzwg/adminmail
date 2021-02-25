<template>
  <div>
    <headercontener>
      <el-row
        type="flex"
        align="middle"
        :gutter="12"
      >
        <el-col :span="2">
          <span style="fontSize:'5px'">所属系统</span>
        </el-col>
        <el-col :span="3">
          <el-input
            placeholder="请输入"
            size="small"
          ></el-input>
        </el-col>
        <el-col :span="2">
          <span style="fontSize:'5px'">服务代码</span>
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
            <el-col :span="12">
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
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <component
        v-for="item in moudlelist.filter(e => e.id == selectid)"
        :is="item.component"
      ></component>

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
import rendertable from '@/views/projectManagement/components/table'
import headercontener from '@/views/projectManagement/components/fieldset'
import moudlelist from './moudle'
export default {
  data() {
    return {
      moudlelist,
      selectid: '',
      dialogVisible: false,

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
          label: '服务代码'
        },
        {
          prop: 'Startupsequence',
          label: '服务版本',
        },
        {
          prop: 'Systemid',
          label: '服务名称'
        },
        {
          prop: 'Systemtype',
          label: '所属系统简称'
        },
        {
          prop: 'state',
          label: '所属系统名称',

        },
        {
          prop: 'sysname',
          label: '报文类型',

        },
        {
          prop: 'status',
          label: '状态',

        },

        {
          prop: 'Servicedescription',
          label: '服务描述',

        }
      ],
      renderdata: [
        {
          Startitemclassname: '20002015220',
          Startupsequence: 'V1',
          Systemid: '对私客户信息查询',
          Systemtype: 'ECIF',
          state: '统一客户信息服务平台',
          sysname: 'XML',
          status: '未注册',
          Caller: 'BSMP,IFM,IBP',
          Servicedescription: ''
        }
      ],
      actionlinedata: [
        {
          render: (h) => {
            return h('el-button', {
              attrs: {
                size: 'mini',
                icon: "el-icon-zoom-in"
              },
              on: {
                click: () => {
                  this.dialogVisible = true
                  this.selectid = 1
                }
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
              },
              on: {
                click: () => {
                  this.dialogVisible = true,
                    this.selectid = 1
                }
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
        }
        ,
        {
          render: (h) => {
            return h('el-button', {
              attrs: {
                size: 'mini',
                icon: 'el-icon-sold-out'
              },
              on: {
                click: () => {
                  this.dialogVisible = true
                  this.selectid = 2
                }
              }
            }, '注册')
          }
        }

        ,
        {
          render: (h) => {
            return h('el-button', {
              attrs: {
                size: 'mini',
                icon: 'el-icon-video-pause'
              }
            }, '注销')
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
