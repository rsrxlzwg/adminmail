<template>
  <div>
    <fieldset>
      <legend>条件搜索</legend>
      <el-row
        type="flex"
        align="middle"
        :gutter="12"
      >
        <el-col :span="2">
          <span style="fontSize:'5px'">协议名称</span>
        </el-col>
        <el-col :span="3">
          <el-input
            placeholder="请输入"
            size="mini"
          ></el-input>
        </el-col>
        <el-col :span="2">
          <span style="fontSize:'5px'">下发状态</span>
        </el-col>
        <el-col :span="3">
          <el-input
            placeholder="请输入"
            size="mini"
          ></el-input>
        </el-col>
        <el-col :span="2">
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
    </fieldset>
    <el-card>
      <span slot="header">服务识别</span>
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
          label: '协议名称'
        },
        {
          prop: 'Startupsequence',
          label: '模式',
        },
        {
          prop: 'Systemid',
          label: '类型'
        },
        {
          prop: 'Systemtype',
          label: '识别条件'
        },
        {
          prop: 'state',
          label: '状态',

        },
        {
          prop: 'sysname',
          label: '操作者',

        }
      ],
      renderdata: [
        {
          Startitemclassname: 'ccCASaDapter',
          Startupsequence: 'XML',
          Systemid: '动态',
          Systemtype: '/server/sys/tran_code',
          state: '已下发',
          sysname: 'admin'
        },
        {
          Startitemclassname: 'ccCASaDapter',
          Startupsequence: 'XML',
          Systemid: '动态',
          Systemtype: '/server/sys/tran_code',
          state: '已下发',
          sysname: 'admin'
        },
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
            }, '下发')
          }
        }
        ,
        {
          render: (h) => {
            return h('el-button', {
              attrs: {
                size: 'mini',
                icon: 'el-icon-video-play'
              }
            }, '下发查询')
          }
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
fieldset {
  border-radius: 3px;
  padding: 20px 10px;
  border-color: #f2f2f2;
  border-width: 1px;
  margin-bottom: 20px;
}
</style>
