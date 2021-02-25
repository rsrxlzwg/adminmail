<template>
  <div>
    <el-card>
      <div
        slot="header"
        class="clearfix"
      >
        <span style="fontSize:14px">基本信息</span>

      </div>
      <el-row v-for="item in listdata">
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
      </el-row>
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
import renderdate from '@/views/projectManagement/components/table'
export default {
  components: {
  },
  data() {
    return {
      tableHeader: [
        // {
        //   prop: 'name',
        //   label: '名称'
        // },
        // {
        //   prop: 'rpro',
        //   label: '容器组端口'
        // },
        // {
        //   prop: 'fpro',
        //   label: '负载均衡端口'
        // },
        // {
        //   prop: 'zpro',
        //   label: '主机端口'
        // },
        // {
        //   prop: 'protocol',
        //   label: '协议'
        // }
      ],
      tableData: [
        // {
        //   name: 'app-wds-dwadaw=2515',
        //   rpro: '80',
        //   fpro: '80',
        //   zpro: '33700',
        //   protocol: 'TCP'
        // }
      ],
      listdata: [
        {
          name: '访问方式',
          value: '通过主机端口外部访问',
          type: 'text'
        },
        {
          name: '端口',
          value: {
            tableHeader: [
              {
                prop: 'name',
                label: '名称'
              },
              {
                prop: 'rpro',
                label: '容器组端口'
              },
              {
                prop: 'fpro',
                label: '负载均衡端口'
              },
              {
                prop: 'zpro',
                label: '主机端口'
              },
              {
                prop: 'protocol',
                label: '协议'
              }
            ],
            tableData: [ {
              name: 'NodePort',
              rpro: '80',
              fpro: '80',
              zpro: '33700',
              protocol: 'TCP'
            } ]
          },
          type: 'table'
        },
        {
          name: '选择器',
          value: {
            tableHeader: [
              {
                prop: 'key',
                label: '键'
              },
              {
                prop: 'value',
                label: '值'
              }
            ],
            tableData: [
              {
                key: 'app',
                value: 'nginx'
              }
            ]
          },
          type: 'table'
        },
        {
          name: '会话保持',
          value: '无',
          type: 'text'
        }, {
          name: '标签',
          value: '',
          type: 'text'
        }
      ]
    }
  },
  components: {
    renderdate
  }
}
</script>

<style scoped lang="scss">
.lincol {
  border-bottom: 1px solid #f1f3f5;
  padding: 14px 0;
}
</style>
