<template>
  <div>
    <el-row
      v-for="(item,key) in baselist"
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
        <el-row>
          <renderdate
            :tableHeader='item.tableHeader'
            :tableData='item.tableData'
            :showpagination='false'
          />
        </el-row>
      </el-card>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import renderdate from '@/views/projectManagement/components/table'
export default {
  data() {
    return {
      advancedsettings: true,
      baselist: [
        {
          name: '历史版本',
          tableHeader: [
            {
              prop: 'edit',
              label: '描述'
            },
            {
              prop: 'createdtime',
              label: '创建时间'
            },
            {
              prop: 'operating',
              label: '操作',
              width: '100',
              render: (h, params) => {
                return h('el-button', {
                  attrs: {
                    type: 'text',
                    size: 'mini'
                  },
                  on: {
                    click: () => {
                      this.$message({
                        message: '回滚操作',
                        type: 'success'
                      })
                    }
                  }
                }, '回滚')
              }
            }
          ],
          tableData: [
            {
              edit: 'qwerqwwq_2020',
              createdtime: '2020/10/10'
            }
          ]
        }
      ]
    }
  },
  components: {
    renderdate
  },
  created() {

  },
}
</script>

<style scoped lang="scss">
</style>
