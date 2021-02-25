<template>
  <div>

    <el-card>
      <div>
        <el-row
          type="flex"
          align="middle"
          justify="center"
          style="backgroundColor:#EEF1F6;height:30px;borderBottom:1px solid #E2E2E2"
        >
          <el-col :span="5"/>
          <el-col :span="4" style="borderRight:1px solid #ccc">接口信息</el-col>
          <el-col :span="6"/>
          <el-col :span="6">元数据信息</el-col>
        </el-row>
        <rendertable
          :table-data="this.defineData"
          :table-header="defineHeader"
          cloumalign="left"
        />
      </div>
      <div style="width: 300px;margin: 30px auto;">
        <el-button type="primary" @click="$router.go(-1)">返 回</el-button>
      </div>
    </el-card>
    <el-dialog title="接口字段"
               :visible.sync="fieldVisible"
               width="40%"
    >
      <el-form
        ref="fieldForm"
        :model="fieldForm"
        label-width="80px"
        label-position="left"
      >
        <el-form-item label="字段名称">
          <el-input
            v-model="fieldForm.fieldKey"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="字段别名">
          <el-input
            v-model="fieldForm.fieldName"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="是否必输">
          <el-select
            v-model="fieldForm.required"
            size="mini"
            style="width:100%"
            placeholder=""
          >
            <el-option
              v-for="item in requiredList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="元数据">
          <el-select
            v-model="fieldForm.metadataId"
            size="mini"
            style="width:100%"
            placeholder=""
          >
            <el-option
              v-for="item in metadataList"
              :key="item.id"
              :label="item.metadataKey"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="字段描述">
          <el-input
            v-model="fieldForm.description"
            type="textarea"
          />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="mini"
          type="primary"
          @click="submitFieldHandle"
        >确 定</el-button>
        <el-button
          size="mini"
          @click="fieldVisible = false"
        >取 消</el-button>

      </span>
    </el-dialog>
    <el-dialog title="字段属性"
               :visible.sync="fieldItemVisible"
               width="50%"
               append-to-body
    >
      <el-card style="marginTop:20px">
        <el-col :span="24">
          <rendertable
            :table-header="itemHeader"
            :table-data="itemData"
            :showpagination=false
          />
        </el-col>
      </el-card>

      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="mini"
          type="primary"
          @click="submitFieldItemHandle"
        >确 定</el-button>
        <el-button
          size="mini"
          @click="fieldItemVisible = false"
        >取 消</el-button>

      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import rendertable from '@/views/projectManagement/components/table'
  import headercontener from '@/views/projectManagement/components/fieldset'
  import moudlelist from './moudle'
  import {
    getFields,
    addField,
    editField,
    deleteField,
    getFieldItems,
    editFieldItems,
    getMetadataList
  } from '@/api/serviceManagement/offlineManagement/interfaceManage'

  export default {
    components: {
      rendertable,
      headercontener
    },
    filters: {
      filterRequired(type) {
        const statusMap = {
          '0': '非必输',
          '1': '必输'
        }
        return statusMap[type]
      },
      filterDataType(type) {
        const statusMap = {
          '1': 'String',
          '2': 'Integer',
          '3': 'Long',
          '4': 'Double',
          '5': 'BigDecimal',
          '6': 'Boolean',
          '7': 'Date',
          '8': 'List',
          '9': 'Object'
        }
        return statusMap[type]
      }
    },
    data() {
      return {
        moudlelist,
        selectid: '',
        requiredList: [{
          label: '非必输',
          value: '0'
        }, {
          label: '必输',
          value: '1'
        }],
        metadataList: [],
        mainParam: {},
        fieldVisible: false,
        fieldOpsType: '',
        fieldAddType: '',
        fieldItemVisible: false,
        fieldForm: {
          id: '',
          interfaceId: '',
          fieldKey: '',
          fieldName: '',
          fieldType: '',
          required: '',
          metadataId: '',
          description: ''
        },
        defineData: [],
        defineHeader: [
          {
            prop: 'fieldKey',
            label: '字段名称',
            width: 200
          },
          {
            prop: 'fieldName',
            label: '字段别名'
          },
          {
            prop: 'required',
            label: '是否必输入',
            render: (h, {row}) => {
              return h('span', this.$options.filters.filterRequired(row.required))
            }
          },
          {
            prop: 'description',
            label: '备注'
          },
          {
            prop: 'metadataKey',
            label: '元数据名'
          },
          {
            prop: 'metadataName',
            label: '属性名称'
          },
          {
            prop: 'metadataType',
            label: '数据类型',
            render: (h, {row}) => {
              return h('span', this.$options.filters.filterDataType(row.required))
            }
          },
          {
            prop: 'metadataLength',
            label: '数据长度'
          },
          {
            prop: 'edit',
            label: '操作',
            render: (h, params) => {
              const {row} = params
              return h('span', row.fieldKey === 'root' ? []
                : row.children ? [h('el-button', {
                  attrs: {
                    size: 'mini',
                    icon: 'el-icon-plus',
                    circle: true
                  },
                  on: {
                    click: () => {
                      this.openFieldAdd(row)
                    }
                  }
                })] : [
                  h('el-button', {
                    attrs: {
                      size: 'mini',
                      icon: 'el-icon-edit',
                      circle: true
                    },
                    on: {
                      click: () => {
                        this.openFieldEdit(row)
                      }
                    }
                  }),
                  h('el-button', {
                    attrs: {
                      size: 'mini',
                      icon: 'el-icon-set-up',
                      circle: true
                    },
                    on: {
                      click: () => {
                        this.openFieldItemEdit(row)
                      }
                    }
                  }),
                  h('el-button', {
                    attrs: {
                      size: 'mini',
                      icon: 'el-icon-delete',
                      circle: true
                    },
                    on: {
                      click: () => {
                        this.openFieldDelete(row.id)
                      }
                    }
                  })
                ])
            }
          }
        ],
        itemData: [],
        itemHeader: [
          {
            width: 100,
            prop: 'itemName',
            label: '处理项'
          },
          {
            width: 100,
            prop: 'enabled',
            label: '是否启用',
            render: (h, {row}) => {
              return h('el-switch', {
                attrs: {
                  value: (row['enabled'] === '1')
                },
                on: {
                  change: e => {
                    row['enabled'] = (e ? '1' : '0')
                  }
                }
              })
            }
          },
          {
            prop: 'itemConfig',
            label: '规则配置',
            render: (h, {row}) => {
              return h('el-input', {
                attrs: {
                  type:'textarea',
                  size: 'mini',
                  value: row[ 'itemConfig' ]
                },
                on: {
                  input: (e) => {
                    row['itemConfig'] = e
                  }
                }
              })
            }
          }
        ]
      }
    },
    mounted() {
      this.getList()
      this.getSelected()
    },
    methods: {
      getList() {
        const tableData = [{
          id: 'ROOT',
          fieldKey: 'root',
          fieldName: '根节点',
          children: [{
            id: 'REQUEST',
            fieldKey: 'request',
            fieldName: '请求报文体',
            fieldType: '1',
            children: []
          }, {
            id: 'RESPONSE',
            fieldKey: 'response',
            fieldName: '响应报文体',
            fieldType: '2',
            children: []
          }]
        }]
        this.mainParam = this.$route.query
        getFields(this.mainParam.interfaceId).then(res => {
          let fieldList = res.data
          for (let i in fieldList) {
            let field = fieldList[i]
            // 请求
            if (field.fieldType === '1') {
              tableData[0].children[0].children.push(field)
            }
            // 响应
            else {
              tableData[0].children[1].children.push(field)
            }
          }
          this.defineData = tableData
        })
      },
      getSelected() {
        getMetadataList().then(res => {
          if (res.code === 200) {
            this.metadataList = res.data
          } else {
            this.$message({
              type: 'error',
              message: res.message
            })
          }
        })
      },
      openFieldAdd(row) {
        this.getSelected()
        Object.keys(this.fieldForm).map(key => this.fieldForm[key] = '')
        this.fieldAddType = row.fieldType
        this.fieldOpsType = 'add'
        this.fieldVisible = true
      },
      openFieldEdit(row) {
        this.getSelected()
        let refFieldForm = this.fieldForm
        Object.keys(row).map(key => {
          refFieldForm[key] = row[key]
        })
        this.fieldOpsType = 'edit'
        this.fieldVisible = true
      },
      openFieldItemEdit(row) {
        getFieldItems(row.id).then(res => {
          if (res.code === 200) {
            this.itemData = res.data
            this.fieldItemVisible = true
          } else {
            this.$message({
              type: 'error',
              message: res.message
            })
          }
        })
      },
      submitFieldHandle() {
        const params = this.fieldForm
        if (this.fieldOpsType === 'add') {
          this.addFieldFun(params)
        } else if (this.fieldOpsType === 'edit') {
          this.editFieldFun(params)
        }
      },
      addFieldFun(params) {
        params.fieldType = this.fieldAddType
        params.interfaceId = this.mainParam.interfaceId
        addField(params).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '新增成功'
            })
            this.fieldVisible = false
            this.getList()
          } else {
            this.$message({
              type: 'error',
              message: res.message
            })
          }
        })
      },
      editFieldFun(params) {
        editField(params).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '编辑成功'
            })
            this.fieldVisible = false
            this.getList()
          } else {
            this.$message({
              type: 'error',
              message: res.message
            })
          }
        })
      },
      submitFieldItemHandle() {
        editFieldItems(this.itemData).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '编辑成功'
            })
            this.fieldItemVisible = false
          } else {
            this.$message({
              type: 'error',
              message: res.message
            })
          }
        })
      },
      openFieldDelete(params) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteField(params).then(res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getList()
            } else {
              this.$message({
                type: 'error',
                message: res.message
              })
            }
          })
        })
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
