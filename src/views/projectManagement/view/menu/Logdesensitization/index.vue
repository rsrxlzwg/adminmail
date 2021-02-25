<template>
  <div>
    <headercontener>
      <el-row
        type="flex"
        align="middle"
        :gutter="12"
      >
        <el-col :span="2">
          <span style="fontSize:'5px'">字段名称</span>
        </el-col>
        <el-col :span="3">
          <el-input
            placeholder="请输入"
            size="small"
          ></el-input>
        </el-col>
        <el-col :span="2">
          <span style="fontSize:'5px'">字段代码</span>
        </el-col>
        <el-col :span="3">
          <el-input
            placeholder="请输入"
            size="mini"
          ></el-input>
        </el-col>
        <el-col :span="2">
          <span style="fontSize:'5px'">字段长度</span>
        </el-col>
        <el-col :span="3">
          <el-input
            placeholder="请输入"
            size="mini"
          ></el-input>
        </el-col>
        <el-col :span="2">
          <span style="fontSize:'5px'">数据类型</span>
        </el-col>
        <el-col :span="3">
          <el-input
            placeholder="请输入"
            size="mini"
          ></el-input>
        </el-col>
        <el-col :span="2">
          <span style="fontSize:'5px'">主题</span>
        </el-col>
        <el-col :span="3">
          <el-input
            placeholder="请输入"
            size="mini"
          ></el-input>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="7">
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
        //   width: 50
        // },
        {
          prop: 'Startitemclassname',
          label: '字段名称'
        },
        {
          prop: 'Startupsequence',
          label: '字段代码',
        },
        {
          prop: 'Systemid',
          label: '数据类型'
        },
        {
          prop: 'Systemtype',
          label: '字段长度'
        },
        {
          prop: 'state',
          label: '字段精度',

        },
        {
          prop: 'Desensitization',
          label: '是否脱敏',
          render: (h, { row }) => {
            return h('el-switch', {
              attrs: {
                size: 'mini',
                value: row[ 'Desensitization' ]
              },
              on: {
                change: (e) => {
                  row[ 'Desensitization' ] = e
                }
              }
            })
          }
        },
        {
          prop: 'sysname',
          label: '主题',

        }
      ],
      renderdata: [
        {
          Startitemclassname: '用户名',
          Startupsequence: 'userName',
          Systemid: 'String',
          Systemtype: '1',
          state: '1',
          Desensitization: true,
          sysname: '用户信息',
          status: '已注册',
          filename: 'service_65468744awqeqwe.xml',
          Operatingtime: new Date().getFullYear()
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
                  // this.dialogVisible = true
                  // this.selectid = 1
                }
              }
            }, '文件脱敏')
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
                  // this.dialogVisible = true,
                  //   this.selectid = 1
                }
              }
            }, '文件移除')
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
