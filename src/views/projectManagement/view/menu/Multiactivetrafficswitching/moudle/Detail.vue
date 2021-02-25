<template>
  <div>

      <rendertable
        :tableHeader='tableHeader'
        :tableData='this.detaildata'
        :showpagination='false'
      />
  </div>
</template>

<script type="text/ecmascript-6">
import rendertable from '@/views/projectManagement/components/table'
export default {
  components: {
    rendertable
  },
  props:{
    detaildata:{
      type:Array,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {

      tableHeader: [
         {
          prop: 'groupName',
          label: 'SDK组'
        },
         {
          prop: 'groupDesc',
          label: 'SDK描述'
        },
        {
          prop: 'weightDistributeInfo',
          label: '权重',
        }
      ],
      tableData: [
      ]

    }
  },

}
</script>

<style scoped lang="scss">
.el-form-item {
  margin-bottom: 0;
}
.overflow {
  overflow: auto;
  height: 400px;
}
</style>
