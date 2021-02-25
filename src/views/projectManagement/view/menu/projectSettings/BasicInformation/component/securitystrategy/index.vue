<template>
  <div>
    <el-card>
      <span slot="header">
        <div style="fontSize:15px;marginBottom:15px;fontWeight:600">
          安全策略
        </div>

      </span>
      <el-row
        class="lincol"
        v-for="(item,key) in rowlist"
        :key="key"
      >
        <el-col :span="4">
          <span style="fontSize:14px">{{item.name}}</span>
        </el-col>
        <el-col :span="20">
          <span v-if="item.id == 1">
            <el-switch
              size='mini'
              v-model="value1"
              active-text="已启用"
            >
            </el-switch>
            <p style="color:#ccc">选定主机标签后对不同空间的主机可以实现隔离</p>
          </span>
          <span v-if="item.id == 2">
            <div>
              <el-radio
                size="mini"
                v-model="radio"
                label="1"
              >允许该命名空间内部容器相互访问</el-radio>

            </div>
            <div>
              <el-radio
                size="mini"
                v-model="radio"
                label="2"
              >允许来自指定命名空间的访问</el-radio>

            </div>
            <div>
              <el-radio
                size="mini"
                v-model="radio"
                label="3"
              >其他</el-radio>

            </div>
            <span v-if="radio ==2">
              <renderdate
                :tableHeader='tableHeader'
                :tableData='tableData'
                :showpagination='false'
                :showselect='true'
              />
            </span>
            <span v-if="radio ==3">
              <advancedconf />
            </span>
          </span>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
import renderdate from '@/views/projectManagement/components/table'
import advancedconf from '@/views/projectManagement/components/codemirror'
export default {
  data() {
    return {
      value1: '',
      tableHeader: [
        // {
        //   prop: 'check',
        //   label: '选择',
        //   width: 60,
        //   render: (h, params) => {
        //     return h('span', [
        //       h('el-checkbox'),
        //     ])
        //   }
        // },
        {
          prop: 'name',
          label: '名称'
        },
        {
          prop: 'rpro',
          label: '授权群组'
        }
      ],
      tableData: [
        {
          name: 'pactera-system',
          rpro: '4'
        },
        {
          name: 'default',
          rpro: '0'
        }, {
          name: 'kube-node-lease',
          rpro: '0'
        }

      ],
      radio: '1',
      rowlist: [
        {
          name: 'Calico网络安全策略',
          id: 1
        },
        {
          name: '允许通过流量',
          id: 2
        }
      ]
    }
  },
  components: {
    renderdate,
    advancedconf
  }
}
</script>

<style scoped lang="scss">
.lincol {
  border-bottom: 1px solid #f1f3f5;
  padding: 14px 0;
}
</style>
