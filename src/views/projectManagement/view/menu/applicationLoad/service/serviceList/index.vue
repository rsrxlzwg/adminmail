<template>
  <div>
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
          v-for="item in comlist.filter(e => e.id ==  comid )"
          :is="item.component"
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
import comlist from './component'
import renderdate from '@/views/projectManagement/components/table'
export default {
  data() {
    return {
      comid: '',
      comlist,
      dialogtitle: '',
      dialogVisible: false,
      tableHeader: [
        {
          prop: 'name',
          label: '项目',
          width: '180',
          routlink: true
        },
        {
          prop: 'application',
          label: '服务名称',
          width: '180'
        },
        {
          prop: 'protocol',
          label: '访问类型',
          width: ''
        },
        {
          prop: 'Accessaddresstype',
          label: '集群IP',
          width: ''
        },
        {
          prop: 'Accesstype',
          label: '访问协议',
          width: ''
        },
        {
          prop: 'AccessPoint',
          label: '访问端口',
          width: ''
        },
        {
          prop: 'Creationtime',
          label: '创建时间',
          width: ''
        },
        {
          prop: 'operating',
          label: '配置',
          width: '80',
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
                      this.dialogVisible = true
                      this.dialogtitle = '配置'
                      this.comid = 11
                      break;
                    case '2':
                      this.dialogVisible = true
                      this.dialogtitle = '高级配置'
                      this.comid = 12
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
                    command: '1'
                  }
                }, '配置'),
                h('el-dropdown-item', {
                  attrs: {
                    command: '2'
                  }
                }, '高级配置'),
                h('el-dropdown-item', {
                  attrs: {
                    command: '3'
                  }
                }, '删除')
              ])
            ])
          }
        }
      ],
      tableData: [
        {
          name: {
            name: 'kube-system',
            path: '/Servicedetailsoverview'
          },
          application: 'kube-dns',
          protocol: 'ClusterIP',
          Accessaddresstype: '10.244.0.1',
          Accesstype: ' TCP',
          AccessPoint: '443',
          Creationtime: '六天前',
        },
        {
          name: {
            name: 'monitoring-system',
            path: '/Servicedetailsoverview'
          },
          application: 'prometheus',
          protocol: 'NodePort',
          Accessaddresstype: '10.244.230.157',
          Accesstype: 'TCP',
          AccessPoint: '32038:9090',
          Creationtime: '六天前',
        }
      ]
    }
  },
  methods: {
    handleClose(done) {
    }
  },
  components: {
    renderdate
  }
}
</script>

<style scoped lang="scss">
</style>
