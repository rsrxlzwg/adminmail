<template>
  <div>
    <renderdate
      :tableHeader='tableHeader'
      :tableData='tableData'
      :showpagination='false'
    />
  </div>
</template>

<script type="text/ecmascript-6">
import renderdate from '@/views/projectManagement/components/table'
export default {
  data() {
    return {
      tableHeader: [
        {
          prop: '策略名称',
          label: '策略名称'
        },
        {
          prop: 'CPUlimit',
          label: 'CPU限制/请求比例'
        },
        {
          prop: 'CPUlimitq',
          label: 'CPU限制/请求比例'
        },
        {
          prop: 'CPURestrictedrange',
          label: 'CPU限制范围'
        },
        {
          prop: 'ramlimit',
          label: '内存限制范围'
        },
        {
          prop: 'creattime',
          label: '创建时间'
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
</style>
