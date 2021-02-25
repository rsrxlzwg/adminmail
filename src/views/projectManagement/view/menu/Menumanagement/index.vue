<template>
  <div>
    <el-row :gutter="5">
      <el-col :span="5">
        <el-tree :expand-on-click-node="false" :render-content="renderContent" :data="data" :props="defaultProps" :default-expand-all="true" @node-click="handleNodeClick" />
      </el-col>
      <el-col :span="19">
        <el-card>
          <el-row v-for="item in [['父菜单名称','父菜单编码'],['菜单名称','菜单编码'],['显示序号','菜单图标']]" style="marginBottom:20px">
            <el-col :span="12">
              <el-row type="flex" align="middle">
                <el-col :span="5">
                  <span style="fontSize:'5px'">{{ item[0] }}</span>
                </el-col>
                <el-col :span="15">
                  <el-input
                    placeholder="请输入"
                    size="small"
                  />
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">

              <el-row type="flex" align="middle">
                <el-col :span="5">
                  <span style="fontSize:'5px'">{{ item[1] }}</span>
                </el-col>
                <el-col :span="15">
                  <el-input
                    placeholder="请输入"
                    size="small"
                  />
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row style="marginBottom:20px">
            <el-col :span="12">
              <el-row type="flex" align="middle">
                <el-col :span="5">
                  <span style="fontSize:'5px'">是否可见</span>
                </el-col>
                <el-col :span="15">
                  <el-checkbox v-model="checked" />
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">

              <el-row type="flex" align="middle">
                <el-col :span="5">
                  <span style="fontSize:'5px'">菜单级别</span>
                </el-col>
                <el-col :span="15">
                  <el-select v-model="from.value" size="mini" style="width:100%" placeholder="请选择">
                    <el-option
                      v-for="item in [1,2,3]"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row style="marginBottom:20px">
            <el-col :span="12">
              <el-row type="flex" align="middle">
                <el-col :span="5">
                  <span style="fontSize:'5px'">公共模块</span>
                </el-col>
                <el-col :span="15">
                  <el-checkbox v-model="checked1" />
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">

              <el-row type="flex" align="middle">
                <el-col :span="5">
                  <span style="fontSize:'5px'">是否有效</span>
                </el-col>
                <el-col :span="15">
                  <el-checkbox v-model="checked2" />
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row type="flex" align="middle" style="marginBottom:40px">
            <el-col :span="3">
              <span style="fontSize:'5px'">字段名称</span>
            </el-col>
            <el-col :span="15">
              <el-input
                placeholder="请输入"
                size="small"
              />
            </el-col>
          </el-row>
          <el-row type="flex" align="middle" justify="center" style="marginBottom:20px">
            <el-col :span="3">
              <el-button size="mini">保存</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {

  },
  data() {
    return {
      checknode: '',
      from: {},
      checked: false,
      data: [{
        label: '系统管理',
        children: [{
          label: '系统配置',
          children: [{
            label: '菜单管理'
          }]
        }]
      }, {
        label: '服务治理',
        children: [{
          label: '线下治理',
          children: [{
            label: '协议管理'
          }]
        }, {
          label: '线上治理',
          children: [{
            label: '链路追踪'
          }]
        }]
      }, {
        label: '网关管理',
        children: [{
          label: '协议类型'
        }, {
          label: '报文类型'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleNodeClick({label}) {
      this.checknode = label
    },
    renderContent(h, { node, data, store }) {
      return h('el-row', {
        style: {
          width: '80%'
        },
        attrs: {
          type: 'flex',
          justify: 'space-between'
        }
      }, [
        h('el-col', {
          attrs: {
            span: 2
          }
        }, node.label),
        h('el-col', {
          attrs: {
            span: 4
          }
        }, this.checknode === node.label ? ['el-icon-circle-plus-outline', 'el-icon-circle-close'].map(e => {
          return h('i', {
            attrs: {
              class: e
            },
            style: {
              marginRight: '5px'
            },
            on: {
              click: () => {
                if (e === 'el-icon-circle-plus-outline') {
                  this.$message({
                    type: 'success',
                    message: `新增${JSON.stringify(data)}`
                  })
                } else {
                  this.$message({
                    type: 'error',
                    message: '删除'
                  })
                }
              }
            }
          })
        }) : [])
      ])
    }
  }
}
</script>

<style scoped lang="scss">
</style>
