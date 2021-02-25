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
          prop: 'name',
          label: '名称'
        },
        {
          prop: 'rpro',
          label: '值'
        }
      ],
      tableData: [
        {
          name: 'app-wds-dwadaw=2515',
          rpro: '80'
        },
        {
          name: 'app-wds-dwadaw=2515',
          rpro: '80'
        }, {
          name: 'app-wds-dwadaw=2515',
          rpro: '80'
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
