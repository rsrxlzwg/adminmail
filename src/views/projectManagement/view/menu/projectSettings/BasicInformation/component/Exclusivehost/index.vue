<template>
  <div>
    <el-card>
      <span slot="header">
        <div style="fontSize:15px;marginBottom:15px;fontWeight:600">
          专享主机
        </div>
        <span style="fontSize:14px;fontWeight:600;color:#ccc">
          命名空该间的应用只会被调度在满足条件的机器上使用，对不同空间的主机可以实现隔离
        </span>
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
            <div>
              <el-radio
                size="mini"
                v-model="radio"
                label="1"
              >所有主机</el-radio>

            </div>
            <div>
              <el-radio
                size="mini"
                v-model="radio"
                label="2"
              >使用以下标签</el-radio>
            </div>
            <div
              v-if="radio == 2"
              style="marginTop:10px"
            >
              <el-select
                v-model="value"
                placeholder="beta.kubernetes.io/arch=amd64"
                size="small"
              >

              </el-select>
            </div>
            <p style="color:#ccc">选定主机标签后对不同空间的主机可以实现隔离</p>
          </span>
          <span v-if="item.id == 2">
            <renderdate
              :tableHeader='tableHeader'
              :tableData='tableData'
              :showpagination='false'
            />
          </span>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
import renderdate from '@/views/projectManagement/components/table'
export default {
  data() {
    return {
      tableHeader: [
        {
          prop: 'name',
          label: '主机名称'
        },
        {
          prop: 'rpro',
          label: 'IP'
        },
        {
          prop: 'Roles',
          label: '角色'
        }
      ],
      tableData: [
        {
          name: 'master01',
          rpro: '10.1.0.150',
          Roles: '控制节点'
        },
        {
          name: 'master02',
          rpro: '10.1.0.151',
          Roles: '控制节点'
        }, {
          name: 'master03',
          rpro: '10.1.0.152',
          Roles: '控制节点'
        }

      ],
      radio: '1',
      rowlist: [
        {
          name: '主机策略',
          id: 1
        },
        {
          name: '满足策略的主机',
          id: 2
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
