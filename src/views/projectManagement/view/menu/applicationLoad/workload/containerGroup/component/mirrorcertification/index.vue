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
          name: '镜像认证',
          tableHeader: [
            {
              prop: 'edit',
              label: '仓库名'
            },
            {
              prop: 'createdtime',
              label: '服务名'
            },
            {
              prop: 'operating',
              label: '安全限制'
            }
          ],
          tableData: [
            {
              edit: 'qwerqwwq_2020',
              createdtime: '2020/10/10',
              operating: '公开'
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
