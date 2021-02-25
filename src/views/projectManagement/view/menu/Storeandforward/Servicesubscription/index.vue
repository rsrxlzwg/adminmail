<template>
  <div>
    <headercontener>
      <el-row
        type="flex"
        align="middle"
        :gutter="12"
      >
        <el-col :span="2">
          <span style="fontSize:'5px'">服务ID</span>
        </el-col>
        <el-col :span="3">
          <el-input
            placeholder="请输入"
            size="small"
          />
        </el-col>
        <el-col :span="2">
          <span style="fontSize:'5px'">消息订阅方</span>
        </el-col>
        <el-col :span="3">
          <el-input
            placeholder="请输入"
            size="mini"
          />
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
        :table-data="renderdata"
        :table-header="renderheader"
        :actionlinedata="actionlinedata"
        :showselect='true'
      />
    </el-card>
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <component
        :is="item.component"
        v-for="item in moudlelist.filter(e => e.id == selectid)"
      />

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
  components: {
    rendertable,
    headercontener
  },
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
          label: '服务ID'
        },
        {
          prop: 'Startupsequence',
          label: '服务订阅方'
        },
        {
          prop: 'Systemid',
          label: '订阅服务ID'
        }
      ],
      renderdata: [
        {
          Startitemclassname: '11',
          Startupsequence: '11',
          Systemid: '11'

        }
      ],
      actionlinedata: [
        {
          render: (h) => {
            return h('el-button', {
              attrs: {
                size: 'mini',
                icon: 'el-icon-zoom-in'
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

      ]
    }
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
