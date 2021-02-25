<template>
  <div>
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="配置导出"
        name="first"
      >
        <actionline :actionlinedata='actionlinedata' />
        <renderlist />
      </el-tab-pane>
      <el-tab-pane
        label="配置下发回退"
        name="second"
      >
        <Configurationrollback />
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
import renderlist from './moudle'
import Configurationrollback from './moudle/component/Configurationrollback'
export default {
  data() {
    return {
      activeName: 'first',
      actionlinedata: [
        {
          render: (h) => {
            return h('el-button', {
              attrs: {
                size: 'mini',
                icon: "el-icon-zoom-in"
              },
              on: {
                click: () => {

                }
              }
            }, '导出')
          }
        },
        {
          render: (h) => {
            return h('el-button', {
              attrs: {
                size: 'mini',
                icon: 'el-icon-edit'
              },
              on: {
                click: () => {

                }
              }
            }, '一键清理')
          }
        },
        {
          render: (h) => {
            return h('el-button', {
              attrs: {
                size: 'mini',
                icon: 'el-icon-delete'
              }
            }, '备份')
          }
        }
      ]
    }
  },
  components: {
    renderlist,
    Configurationrollback,
    actionline: {
      props: {
        actionlinedata: Array
      },
      render(h) {
        return h('div', {
          style: {
            marginBottom: '20px'
          }
        }, this.$props.actionlinedata.map(e => e.render(h)))
      },
    }
  }
}
</script>

<style scoped lang="scss">
</style>
