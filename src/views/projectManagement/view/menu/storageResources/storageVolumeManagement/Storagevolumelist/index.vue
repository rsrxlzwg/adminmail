<template>
  <div>
    <el-row
      type="flex"
      justify="space-bwetten"
    >
      <el-col :span="12">
        <el-row>
          <el-col :span="5">
            <el-button
              size="mini"
              type="primary"
              @click="opendialog"
            >创建存储器</el-button>
            <!-- <el-dropdown
              size="mini"
              @command="handleCommand"
            >
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-plus"
              >创建存储器</el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command='1'>管理员创建PV</el-dropdown-item>
                <el-dropdown-item command='2'>管理员创建SC</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown> -->
          </el-col>
          <!-- <el-col :span="4">
            <el-button size="mini">分配存储器</el-button>
          </el-col>
          <el-col :span="4">
            <el-button size="mini">解除分配</el-button>
          </el-col> -->
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row
          type="flex"
          justify="end"
          gutter="10"
        >
          <el-col :span="4">
            <el-input
              size="mini"
              placeholder="搜索"
            >
              <i
                class="el-icon-search el-input__icon"
                slot="prefix"
                @click=""
              >
              </i>
            </el-input>
          </el-col>
          <!-- <el-col :span="4">
            <el-dropdown>
              <el-button size="mini">
                更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item></el-dropdown-item>

              </el-dropdown-menu>
            </el-dropdown>
          </el-col> -->
          <!-- <el-col :span="3">
            <el-dropdown>
              <el-button size="mini">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item></el-dropdown-item>

              </el-dropdown-menu>
            </el-dropdown>
          </el-col> -->
        </el-row>
      </el-col>
    </el-row>
    <renderdate
      :tableHeader='tableHeader'
      :tableData='tableData'
    />
    <el-dialog
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <span
        slot="title"
        style="fontSize=14px"
      >{{dialogtitle}}</span>
      <div>
        <component
          v-for="(item,key) in dialoglist.filter(e => e.id ==  comid )"
          :is="item.component"
          :key="key"
        ></component>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="mini"
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
        <el-button
          size="mini"
          @click="dialogVisible = false"
        >取 消</el-button>

      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import dialoglist from './component'
import renderdate from '@/views/projectManagement/components/table'
export default {
  name: 'ss',
  data() {
    return {
      dialogtitle: '',
      comid: '',
      dialoglist,
      dialogVisible: false,
      tableHeader: [
        // {
        //   type: 'selection',
        //   label: '',
        //   render: (h, params) => {
        //     return h('el-checkbox')
        //   }
        // },
        {
          prop: 'Storagevolume',
          label: '存储卷',
          routlink: true
        },
        {
          prop: 'application',
          label: '应用'
        },
        {
          prop: 'status',
          label: '状态'
        },
        {
          prop: 'capacity',
          label: '容量'
        },
        {
          prop: 'nodeexclusive',
          label: '节点独享'
        },
        {
          prop: 'createtime',
          label: '创建时间'
        },
        {
          prop: 'edit',
          label: '',
          render: (h, params) => {
            return h('el-dropdown', {
              attrs: {
                slot: 'dropdown',
                trigger: 'click',
                placement: 'right',
                size: 'mini'
              },
              on: {
                command: (value) => {
                  switch (value) {
                    case '1':
                      break;
                    case '2':
                      break;
                    case '3':
                      this.$confirm('你确定要删除该项?', '删除', {
                        type: 'warning'
                      }).then(_ => { }).catch(_ => { })
                      break;
                  }
                }
              }
            }, [
              h('el-button', {
                attrs: {
                  type: 'text'
                }
              }, '.....'),
              h('el-dropdown-menu', {
                attrs: {
                  slot: "dropdown"
                }
              }, [
                h('el-dropdown-item', {
                  attrs: {
                    command: '11'
                  }
                }, '配置'),
                h('el-dropdown-item', {
                  attrs: {
                    command: '12'
                  }
                }, '高级配置'),
                h('el-dropdown-item', {
                  attrs: {
                    command: '13'
                  }
                }, '删除')
              ])
            ])
          }
        }
      ],
      tableData: [ 'pvc-nfs', 'pvc-local', 'pvc-cepth' ].map(e => {
        return {
          Storagevolume: {
            name: e,
            path: '/Storagevolumelistdetils'
          },
          application: '-',
          status: '闲置',
          capacity: '1G',
          nodeexclusive: '否',
          createtime: '2020/10/10'
        }
      })
    }
  },
  methods: {
    opendialog() {
      this.dialogtitle = '新增存储'
      this.dialogVisible = true
      this.comid = 1
    },
    handleCommand(command) {
      switch (command) {
        case '1':
          this.dialogVisible = true
          this.comid = 1
          break;
        case '2':
          this.dialogVisible = true
          this.comid = 2
          break;
        default:
          break;
      }
    }
  },
  components: {
    renderdate
  }
}
</script>

<style scoped lang="scss">
.el-row {
  margin-bottom: 14px;
}
</style>
