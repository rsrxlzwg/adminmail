<template>
  <div>
    <rendertable
      :tableData='tableData'
      :tableHeader='tableHeader'
      :showselect='true'
    />
  </div>
</template>

<script type="text/ecmascript-6">
import rendertable from '@/views/projectManagement/components/table'
export default {
  data() {
    return {
      tableHeader: [
        // {
        //   prop: 'secection',
        //   width: 80,
        //   label: '选择',
        //   render: (h, { row }) => {
        //     return h('el-checkbox')
        //   }
        // },
        {
          prop: 'key',
          label: '可授权终端'
        },
        {
          prop: 'state',
          label: '状态',
          width: 80
        }
      ],
      tableData: [
        {
          key: 'ESC004[9.1.8.215]',
          state: '未授权'
        }
      ],
    }
  },
  components: {
    rendertable
  }
}
</script>

<style scoped lang="scss">
</style>
