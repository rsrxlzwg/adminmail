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
          prop: 'terminalCode',
          label: 'SDK编码'
        },
        {
          prop: 'terminalHost',
          label: 'SDK地址'
        },
        {
          prop: 'deployModel',
          label: 'SDK部署类型'
        },
        {
          prop: 'versionNum',
          label: '版本号'
        },
         {
          prop: 'groupName',
          label: 'SDK组'
        },
        {
          prop: 'thresholdValue',
          label: '阈值',
          // render: (h, { row }) => {
          //   return h('el-input', {
          //     attrs: {
          //       size: 'mini',
          //       value: row[ 'Threshold' ]
          //     },
          //     on: {
          //       input: e => {
          //         row[ 'Threshold' ] = e
          //       }
          //     }
          //   })
          // }
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
