<template>
  <div>
    <el-row
      v-for="(item,key) in testlist"
      style="margin-bottom:5px"
      :key="key"
    >
      <el-card>
        <span
          style="fontSize:14px"
          slot="header"
        >
          {{item.name}}
        </span>
        <el-row
          style="borderBottom: 1px solid #EFF1F4;lineHeight:50px"
          v-for="(items,key) in item.children"
          :key="key"
          type="flex"
          justify="space-bewtten"
        >
          <el-col :span="4">
            <span style="fontSize:14px">{{items.name}}</span>
          </el-col>
          <el-col :span="items.routerlink?18:20">
            <span v-if="'table' in items">
              <renderdate
                :tableHeader='items.value.tableHeader'
                :tableData='items.value.tableDate'
                :showpagination='false'
              />
            </span>
            <span
              v-else
              style="fontSize:14px"
            >{{items.value}}</span>
          </el-col>
          <el-col
            :span="2"
            v-if="items.routerlink"
          >
            <span
              style="fontSize:14px;color:#62A7FF"
              @click="$router.push(items.routerlink['path'])"
            >{{items.routerlink['name']}}</span>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
    <el-row>
      <i
        style="fontSize:14px;color:#5CA4FF"
        :class="[advancedsettings?'el-icon-arrow-down':'el-icon-arrow-up']"
      ></i>
      <span
        style="fontSize:14px;color:#5CA4FF"
        @click='advancedsettings=!advancedsettings'
      >{{advancedsettings?'展开高级设置':'收起高级设置'}}</span>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import renderdate from '@/views/projectManagement/components/table'
export default {
  data() {
    return {
      advancedsettings: true,
      testlist: [],
      baselist: [
        {
          name: '基本信息',
          children: [
            {
              name: '镜像',
              value: 'k8sio/k8s/app248',
              routerlink: {
                name: '更新镜像',
                path: '/mirror/mirrorManage'
              }
            },
            {
              name: '实例数',
              value: '1'
            }
          ]
        },
        {
          name: '计算资源',
          children: [
            {
              name: 'CPU限制',
              value: '0.128核心'
            },
            {
              name: '内存限制',
              value: '256MB',
            }
          ]
        },
        {
          name: '主机路径映射',
          children: [
            {
              name: 'CPU限制',
              value: {
                tableHeader: [
                  {
                    prop: 'rpath',
                    label: '容器路径'
                  },
                  {
                    prop: 'zpath',
                    label: '主机路径'
                  },
                  {
                    prop: 'canedit',
                    label: '是否可写'
                  }
                ],
                tableDate: [
                  {
                    rpath: 'ewarwae_werwaewae_2020',
                    zpath: 'ewarwae_werwaewae_2020',
                    canedit: '可写'
                  }
                ]
              },
              table: true
            }
          ]
        },
        {
          name: '数据卷',
          children: [
            {
              name: 'CPU扩展',
              value: {
                tableHeader: [
                  {
                    prop: 'rpath',
                    label: '数据路径'
                  },
                  {
                    prop: 'zpath',
                    label: '主机路径'
                  },
                  {
                    prop: 'canedit',
                    label: '是否可写'
                  }
                ],
                tableDate: [
                  {
                    rpath: 'ewarwae_werwaewae_2020',
                    zpath: 'ewarwae_werwaewae_2020',
                    canedit: '可写'
                  }
                ]
              },
              table: true
            }
          ]
        }
      ]
    }
  },
  components: {
    renderdate
  },
  beforeCreate() {
    this.testlist = this.baselist.slice(0, 2)
  },
  watch: {
    advancedsettings(newvalue) {
      if (!newvalue) {
        this.testlist = this.baselist
      } else {
        this.testlist = this.baselist.slice(0, 2)
      }
    }
  },
}
</script>

<style scoped lang="scss">
</style>
