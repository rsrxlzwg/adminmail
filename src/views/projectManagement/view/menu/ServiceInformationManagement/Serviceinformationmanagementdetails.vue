<template>
  <div>
    <el-row :gutter="5">
      <el-col :span="5">
        <el-card style="marginBottom:10px">
          <el-input
            v-model="filterText"
            size="mini"
            placeholder="输入关键字进行过滤"
          />
        </el-card>
        <el-card>
          <div @mouseleave="enterleave">
            <el-tree
              ref="tree"
              :filter-node-method="filterNode"
              :expand-on-click-node="false"
              :render-content="renderContent"
              :data="treeData"
              :props="defaultProps"
              :default-expand-all="true"
              @node-click="handleNodeClick"
            />
          </div>
        </el-card>
      </el-col>
      <el-col :span="19">
        <el-card>
          <headersearch :searchModel=searchModel @onSearch="onSearch"></headersearch>
          <el-card>
            <rendertable
              ref="multipleTable"
              :table-data="renderdata"
              :table-header="renderheader"
              :actionlinedata="actionlinedata"
              :pagination="pagination"
              @currentChange="currentChange"
              @sizeChange="sizeChange"
              :showselect='true'
            />
          </el-card>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import rendertable from '@/views/projectManagement/components/table'
  import headersearch from '@/views/components/search'
  import {
    getServiceTree,
    getServices
  } from '@/api/serviceManagement/offlineManagement/serviceInfoManage'

  export default {
    components: {
      rendertable,
      headersearch
    },
    filters: {
      filterStatus(status) {
        const statusMap = {
          '0': '未发布',
          '1': '已发布'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        checknode: '',
        filterText: '',
        from: {},
        checked: false,
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'catalogName'
        },
        searchModel: {
          btnSpan:5,
          formModel: {
            serviceCode: '',
            serviceName: ''
          },
          searchFild: [{
            type: 'input',
            label: '服务编码',
            prop: 'serviceCode',
            span:8
          }, {
            type: 'input',
            label: '服务名称',
            prop: 'serviceName',
            span:8
          }]
        },
        renderheader: [
          {
            prop: 'serviceCode',
            label: '服务编码'
          },
          {
            prop: 'serviceName',
            label: '服务名称'
          },
          {
            prop: 'cosuAppName',
            label: '消费方'

          },
          {
            prop: 'appName',
            label: '提供方'

          },
          {
            prop: 'version',
            label: '版本号'

          },
          {
            prop: 'updateDate',
            label: '更新时间'

          },
          {
            prop: 'status',
            label: '状态',
            render: (h, {row}) => {
              return h('el-tag', this.$options.filters.filterStatus(row.status))
            }

          },
          {
            prop: 'Jump',
            label: '详情信息',
            render: (h, {row}) => {
              return h('el-button', {
                attrs: {
                  size: 'mini'
                },
                on: {
                  click: () => {
                    this.$router.push({
                      path: '/serviceGovernance/Offlinegovernance/Serviceinformationmanagementdetails',
                      query: {serviceId: row.id}
                    })
                    sessionStorage['currentSubRouter'] = '/serviceGovernance/Offlinegovernance/Serviceinformationmanagementdetails'
                  }
                }
              }, '详情信息')
            }
          }
        ],
        renderdata: [],
        actionlinedata: [],
        pagination: {
          currentPage: 1,
          pagesize: 10,
          total: 0,
          show: true
        },
        pageType: ''
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val)
      }
    },
    mounted() {
      this.getTree()
      this.getList()
    },
    methods: {
      getTree() {
        getServiceTree().then(res => {
          if (res.code === 200) {
            this.treeData = res.data
          } else {
            this.$message({
              type: 'error',
              message: res.message
            })
          }
        })
      },
      getList() {
        const params = {
          'requestObject': {
            ...this.searchModel.formModel
          },
          'pageNo': this.pagination.currentPage,
          'pageSize': this.pagination.pagesize
        }
        getServices(params).then(res => {
          if (res.code === 200) {
            this.renderdata = res.data.data
          } else {
            this.$message({
              type: 'error',
              message: res.message
            })
          }
        })
      },
      enterleave() {
        this.checknode = ''
      },
      handleNodeClick({label}) {
        //   this.checknode = label
      },
      filterNode(value, data) {
        if (!value) return true
        return data.catalogName.indexOf(value) !== -1
      },
      renderContent(h, {node, data, store}) {
        return h('span', {
          style: {
            lineHeight: '100%',
            width: '100%'
          },
          on: {
            mouseenter: () => {
              this.checknode = data.label
            }
          }
        }, [h('el-row', {
          style: {
            width: '80%'
          },
          attrs: {
            type: 'flex'

          }
        }, [
          data.children ? h('i', {
            attrs: {
              class: 'el-icon-folder-opened'
            }
          }) : h('i', {
            attrs: {
              class: 'el-icon-tickets'
            }
          }),
          h('el-col', {
            attrs: {
              span: 17
            }
          }, node.label),
          h('el-col', {
              attrs: {
                span: 4
                // offset: 15
              }
            }
          )
        ])])
      },
      onSearch() {
        this.getList()
      },
      sizeChange(val) {
        this.pagination.pagesize = val
        this.getList()
      },
      currentChange(val) {
        this.pagination.currentPage = val
        this.getList()
      }
    }
  }
</script>

<style scoped lang="scss">
  fieldset {
    border-radius: 3px;
    padding: 20px 10px;
    border-color: #f2f2f2;
    border-width: 1px;
    margin-bottom: 20px;
  }
</style>
