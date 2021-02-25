<template>
  <div>
    <el-card>
      <div
        slot="header"
        class="clearfix"
      >
        <span style="fontSize:14px">事件</span>

      </div>
      <el-row>
        <!-- <renderdate
          :tableHeader='tableHeader'
          :tableData='tableData'
        /> -->
        <codemirror :entercode='entercode' />
      </el-row>
      <!-- <el-row v-for="item in listdata">
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
        </el-col>
      </el-row> -->
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
import renderdate from '@/views/projectManagement/components/table'
import codemirror from '@/views/projectManagement/components/codemirror'
export default {
  data() {
    return {
      entercode:
        `
I1028 02:19:25.235648       1 main.go:518] Determining IP address of default interface
I1028 02:19:25.236270       1 main.go:531] Using interface with name ens33 and address 192.168.169.4
I1028 02:19:25.236293       1 main.go:548] Defaulting external address to interface address (192.168.169.4)
W1028 02:19:25.236326       1 client_config.go:517] Neither --kubeconfig nor --master was specified.  Using the inClusterConfig.  This might not work.
`,
      tableHeader: [
        // 去掉勾选框
        // {
        //   type: 'selection',
        //   width: '10',
        //   render: (h, params) => {
        //     return h('el-checkbox')
        //   }

        // },
        {
          prop: 'name',
          label: '事件',
          routlink: true
        },
        {
          prop: 'rpro',
          label: '类型'
        },
        {
          prop: 'fpro',
          label: '名称'
        },
        {
          prop: 'zpro',
          label: '目标'
        },
        {
          prop: '',
          label: '描述',
          render: (h, params) => {
            return h('span', [
              h('span', {
                style: {
                  backgroundColor: '#22C36A',
                  padding: '0px 6px',
                  borderRadius: '20px',
                  marginRight: '5px'
                }
              }),
              h('span', params.row[ 'protocol' ] === '1' ? '进行中' : '停止中')
            ])
          }
        },
        {
          prop: 'sstarttime',
          label: '次数'
        }
      ],
      tableData: [
        {
          name: {
            name: 'app-wds-dwadaw=2515',
            path: '/applicationLoad/workload/containerGroup/detail'
          },
          rpro: '192.168.1.1',
          fpro: 'node30',
          zpro: '1/1',
          protocol: '1',
          sstarttime: '2020/10/1'
        },
        {
          name: {
            name: 'app-wds-dwadaw=2515',
            path: '/'
          },
          rpro: '192.168.1.1',
          fpro: 'node30',
          zpro: '1/1',
          protocol: '1',
          sstarttime: '2020/10/1'
        }
      ]
    }
  },
  components: {
    renderdate,
    codemirror
  }
}
</script>

<style scoped lang="scss">
.lincol {
  border-bottom: 1px solid #f1f3f5;
  padding: 14px 0;
}
.textline {
  letter-spacing: 2px;
}
/deep/ .el-button {
  padding: 6px;
}
.el-row {
  margin-bottom: 14px;
}
</style>
