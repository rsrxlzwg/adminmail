<template>
  <div>
    <rendertable
      :tableHeader='tableHeader'
      :tableData='tableData'
      cloumalign='left'
    />
  </div>
</template>

<script type="text/ecmascript-6">
import rendertable from '@/views/projectManagement/components/table'
export default {
  data() {
    return {
      tableHeader: [

        {
          prop: 'name',
          label: '名称'
        },
        {
          prop: 'description',
          label: '描述',
          width: 150
        }
      ],
      tableData: [
        {
          id: 1,
          name: '存款',
          description: '',
          children: [
            {
              id: 11,
              name: '查询类',
              description: '查询类',
              children: [
                {
                  id: 111,
                  name: '存款账户信息查询',
                  description: '本服务',
                  children: [
                    {
                      id: 1111,
                      name: '存款账户信息查询',
                      description: '本服务存款账户信息查询存款账户信息查询存款账户信息查询存款账户信息查询'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  components: {
    rendertable
  }
}
</script>

<style scoped lang="scss">
</style>
