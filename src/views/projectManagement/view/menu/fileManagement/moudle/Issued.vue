<template>
  <div>
    <rendertable
      :table-data="tableData"
      :table-header="tableHeader"
      :actionlinedata="actionlinedata"
    />
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
      append-to-body
    >
      <el-form
        ref="form"
        :model="formData"
        label-width="100px"
        label-position="left"
      >
<!--        <el-form-item label="字典类别编码">-->
<!--          <el-input-->
<!--            v-model="form.name"-->
<!--            size="mini"-->
<!--          />-->
<!--        </el-form-item>-->
        <el-form-item label="字典编码">
          <el-input
            v-model="formData.dictId"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="字典项名称">
          <el-input
            v-model="formData.dicName"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="字典项值">
          <el-input
            v-model="formData.dicValue"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="字典描述">
          <el-input
            v-model="formData.dicDesc"
            size="mini"
            type="textarea"
          />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="mini"
          type="primary"
          @click="handleClose = false"
        >确 定</el-button>
        <el-button
          size="mini"
          @click="handleClose = false"
        >取 消</el-button>

      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import rendertable from '@/views/projectManagement/components/table'
export default {

  components: {
    rendertable
  },

  props:{
    formData:{
      type:Object,
      default: () => {
        return {}
      }
    }
  },

//   data() {
//     return {
//       activeName: 'first',
//     }
//   }
// },

  data() {
    return {
      selectid: 1,
      handleClose: false,
      form: {
        name
      },
      tableHeader: [
        {
          prop: 'name',
          label: '字典项名称'
        },
        {
          prop: 'key',
          label: '字典项值'
        },
        {
          prop: 'state',
          label: '字典项描述',
          width: 80
        },
        {
          label: '操作',
          render: (h, params) => {
            return h('span', [ 'el-icon-edit', 'el-icon-delete' ].map(e => {
              return h('el-button', {
                attrs: {
                  size: 'mini',
                  circle: true,
                  icon: e
                },
                on: {
                  click: () => {
                    if (e == 'el-icon-edit') {
                      this.handleClose = true
                    }
                  }
                }
              })
            }))
          }
        }
      ],
      tableData: [
        {
          name: '用户实名认证协议',
          key: '01'
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
                  this.handleClose = true
                  this.selectid = 1
                }
              }
            }, '新增字典项目')
          }
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
</style>
