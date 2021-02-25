<template>
  <div class="name-container">
    <!-- 表格 -->
    <el-card class="m-t-10">
      <!-- <div class="tableHeight"> -->
      <el-button
        type=""
        @click="addsetup(btn)"
        v-for="btn in searchModel.btnGroup"
        :icon="choseIcon(btn)"
        size="small"
      >{{btn.label}}</el-button>
      <el-table
        ref="commonTable"
        class="m-t-10"
        row-key="id"
        :default-expand-all="tableModel.defaultExpand"
        :data="tableModel.tableData"
        :row-style="{'font-size': '14px',color: 'rgb(32, 45, 64)','font-family': 'sans-serif;'}"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        style="width: 99%"
        stripe
        :cell-style="rowClass"
        :header-cell-style="headClass"
        @selection-change="handleSelectionChange"
        :default-sort="{prop: 'date', order: 'descending'}"

      >
        <el-table-column
          type="selection"
          width="55"
        >
        </el-table-column>
        <el-table-column
          v-for="(col, index) in tableModel.rowData"
          :key="index"
          :prop="col.prop"
          :show-overflow-tooltip="true"
          :label="col.label">
          <template slot-scope="scope">
            <z-slot
              v-if="col.render"
              :render="col.render"
              :row="scope.row"
              :index="scope.$index"
              :column="col"
            />
            <span v-else>
              {{scope.row[col.prop]}}
            </span>
          </template>
        </el-table-column>

        <el-table-column
          label="操作"
          v-if="tableModel.operateData&&tableModel.operateData.length>0"
        >
          <template slot-scope="scope">
            <div v-show="tableModel.operateData&&tableModel.operateData.length<=2">
              <el-button
                type="text"
                size="small"
                v-for="item in tableModel.operateData"
                @click.native.prevent="handleEdit(item,scope.row)"
              >{{item.label}}</el-button>
            </div>
            <el-dropdown
              @command="handleCommand"
              v-show="tableModel.operateData&&tableModel.operateData.length>2"
            >
              <span class="el-dropdown-link">.....</span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  :command="beforeHandleCommand(item,scope.row)"
                  v-for="item in tableModel.operateData"
                >{{item.label}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <!-- </div> -->

      <!-- 分页 -->
      <div
        class="block"
        v-show="tableModel.pagination.currentPage"
      >
        <el-pagination
          background
          :current-page="tableModel.pagination.currentPage"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="tableModel.pagination.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableModel.pagination.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    <el-dialog
      class="deepdialog"
      :title="title"
      :visible.sync="dialogFormVisible"
      :width="formModel.dialogWidth?formModel.dialogWidth:'40%'"
    >
      <el-form
        :model="formModel.formData"
        label-position="right"
        ref="ruleForm"
        :rules="formModel.rules"
        :label-width="formModel.formLabelWidth?formModel.formLabelWidth:'100px' "
      >
        <el-form-item
          :prop="item.prop"
          :label='item.label'
          v-for="item in formModel.formFilds"
          :key='item.prop'
        >
          <!-- 输入框 -->
          <el-input
            v-model="formModel.formData[item.prop]"
            size="mini"
            :disabled="item.disabled"
            :placeholder=' "请输入"+ item.label'
            v-if="item.type==='input' "
          />
          <!-- 输入框 -按钮 -->
          <el-row
            v-if="item.type==='inputBtn' "
            :gutter="20"
          >
            <el-col :span="10">
              <el-input
                v-model="formModel.formData[item.prop]"
                size="mini"
                :disabled="item.disabled"
                :placeholder=' "请输入"+ item.label'
              />
            </el-col>
            <el-col :span="2">
              <el-button size="small">{{item.btnName}}</el-button>
            </el-col>
          </el-row>

          <!-- 数字 -->
          <el-input
            v-model="formModel.formData[item.prop]"
            size="mini"
            type="number"
            :disabled="item.disabled"
            :placeholder=' "请输入"+ item.label'
            v-if="item.type==='number' "
          />
          <!-- 密码 -->
          <el-input
            v-model="formModel.formData[item.prop]"
            size="mini"
            :disabled="item.disabled"
            :placeholder=' "请输入"+ item.label'
            type="password"
            v-if="item.type==='password' "
          >
            <i
              slot="suffix"
              class="el-icon-view "
              style="fontSize:18px;cursor:pointer"
            />
          </el-input>
          <!-- textarea -->
          <el-input
            v-model="formModel.formData[item.prop]"
            size="mini"
            type="textarea"
            :disabled="item.disabled"
            :placeholder=' "请输入"+ item.label'
            v-if="item.type==='textarea' "
          />
          <!-- 下拉框 -->
          <el-select
            v-if="item.type==='select'"
            v-model="formModel.formData[item.prop]"
            size="mini"
          >
            <el-option
              v-for="op in item.options"
              :label="op.label"
              :value="op.value"
              :key="op.value"
            ></el-option>
          </el-select>
            <!-- 树形下拉 -->
            <treeselect
             v-if="item.type==='selectTree'"
            v-model="formModel.formData[item.prop]"
            :multiple="item.multiple"
            :options="item.options"
            :normalizer="item.normalizer?item.normalizer:[]"
            />
          <!-- 单选 -->
          <el-radio-group
            v-if="item.type==='radio'"
            v-model="formModel.formData[item.prop]"
          >
            <el-radio
              v-for="ra in item.options"
              :label="ra.value"
              :key="ra.value"
            >{{ra.label}}</el-radio>
          </el-radio-group>
          <!-- 复选框 -->
          <el-checkbox-group
            v-if="item.type==='checkbox'"
            v-model="formModel.formData[item.prop]"
          >
            <el-checkbox
              v-for="ch in item.options"
              :label="ch.value"
              :key="ch.value"
            >{{ch.label}}</el-checkbox>
          </el-checkbox-group>
          <div v-if="item.type==='other'">
            <el-button
              type="primary"
              size="mini"
              @click="addTag(formModel.formData[item.prop])"
            >添加</el-button>
            <el-table
              :data="formModel.formData[item.prop]"
              style="width: 100%"
            >
              <el-table-column
                v-for="fild in item.tabelFild"
                :prop="fild.prop"
                :label="fild.label"
              >
                <template slot-scope="scope">
                  <el-input
                    type="text"
                    v-model="scope.row[fild.prop]"
                    size="mini"
                    v-show="fild.type=='input'"
                  />
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="100"
              >
                <template slot-scope="scope">
                  <el-button
                    @click="tagDel(scope.$index,formModel.formData[item.prop])"
                    type="text"
                    size="small"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
        v-if="formModel.btnData"
      >
        <el-button
          v-for="btn in formModel.btnData"
          @click="handleClick(btn)"
          :type="btn.style"
          size="mini"
        >{{btn.label}}</el-button>

      </div>
    </el-dialog>

  </div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

// 自定义内容的组件
var zSlot = {
  functional: true,
  props: {
    row: Object,
    render: Function,
    index: Number,
    column: {
      type: Object,
      default: null
    }
  },
  render: (h, data) => {
    // console.log({h,data})
    const params = {
      row: data.props.row,
      index: data.props.index
    }
    if (data.props.column) params.column = data.props.column
    return data.props.render(h, params)
  }
}


let copyFormData = ''
export default {
  name: 'NameSpace',
  components: {
    zSlot,
    Treeselect,
  },
  props: {
    tableModel: {
      type: Object,
      default: () => {
        return {}
      }
    },
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    },
    searchModel: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  data() {
    return {
      dialogFormVisible: false,
      title: '',
      formInline: {
        user: ''
      },
      dialogType: 'add',
      copyFormData: ""
    }
  },
  mounted() {

    copyFormData = this.formModel.formData ? JSON.parse(JSON.stringify(this.formModel.formData)) : ""
    // this.copyFormData=this.formModel.formData
    console.log('formdata', copyFormData)

  },
  methods: {
    handleRowClick(row) {
      this.$emit('rowClick', row)
    },
    choseIcon(btn) {
      let icon = ''
      switch (btn.type) {
        case 'add':
          icon = "el-icon-zoom-in"
          break
        case 'issue':
          icon = "el-icon-sold-out"
          break
        case 'edit':
          icon = "el-icon-edit"
          break
        case 'delete':
          icon = "el-icon-delete"
          break
        case 'search':
          icon = "el-icon-search"
          break
        default:
          icon = "el-icon-edit"
          break
      }
      return icon
    },
    addTag(tabel) {
      tabel.push({

      })
    },
    tagDel(i, tabel) {
      tabel.splice(i, 1)
    },
    handleSelectionChange(val) {
      // this.multipleSelection = val;
    },
    handleCommand(command) {
      this.handleEdit(command.command, command.row)
    },
    beforeHandleCommand(command, row) {
      return {
        'row': row,
        'command': command
      }
    },
    hideDialog() {
      this.dialogFormVisible = false
    },

    addsetup(item) {
      const selectData = this.$refs.commonTable.selection
      console.log({selectData})
      const haveData = selectData.length > 0
      const isOneData = selectData.length == 1
      if (item.type === 'add' && !item.url) {
        this.title = '添加'
        this.dialogType = 'add'
        this.dialogFormVisible = true
        this.clearData()
      } else if (item.type === 'add' && item.url) {
        this.$router.push({ path: item.url });
      } else if (item.type === 'edit') {
        if (haveData && isOneData) {
          this.dialogType = 'edit'
          this.dialogFormVisible = true
          Object.keys(this.formModel.formData).forEach(key => { this.formModel.formData[ key ] = selectData[ 0 ][ key ] })
        } else {
          this.$message({
            message: '请选择一条数据',
            type: 'warning'
          });
        }
      } else if (item.type === 'detail') {
        if (haveData && isOneData) {
          this.$router.push({ path: item.url, query: { rows: selectData[ 0 ] } });
        } else {
          this.$message({
            message: '请选择一条数据',
            type: 'warning'
          });
        }
      } else if (item.type === 'delete') {
        let ids=[]
          selectData.forEach(e => {
            ids.push(e.id)
          });
        if (haveData) {
          this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$emit('delInfo', ids);
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        } else {
          this.$message({
            message: '请选择一条数据',
            type: 'warning'
          });
        }

        // this.$router.push({path:item.url});
      } else {
        this.$emit(item.funName, selectData);
      }
    },
    clearData() {
      this.formModel.formData = JSON.parse(JSON.stringify(copyFormData))
      // this.formData=this.copyFormData
      // Object.keys(this.formModel.formData).map(key => this.formModel.formData[key] = "")
      // this.formModel.formData.type=  'password'
    },
    handleClick(btn) {
      const { type }=btn
      if (type === 'submit' && this.dialogType === 'add') {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.$emit('submitHandle', this.formModel.formData);
          } else {
            this.$message.error('请输入必填信息');
            return false;
          }
        })
      } else if (type === 'submit' && this.dialogType === 'edit') {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.$emit('editHandle', this.formModel.formData);
          } else {
            this.$message.error('请输入必填信息');
            return false;
          }
        })
      } else if (type === 'cancle') {
        this.dialogFormVisible = false
      }else{
         this.$emit(type.funName, this.formModel.formData);
      }
    },
    handleEdit(item, row) {
      console.log('hhhh', item.type, row)
      this.title = '编辑'
      if (item.type === 'edit') {
        this.dialogType = 'edit'
        this.dialogFormVisible = true
        Object.keys(this.formModel.formData).forEach(key => { this.formModel.formData[ key ] = row[ key ] })
      } else if (item.type === 'detail') {
        this.$router.push({ path: item.url, query: { rows: row } });
      } else if (item.type === 'delete') {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('delInfo', row.id);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
        // this.$router.push({path:item.url});
      } else {
        this.$emit(item.funName, row);
      }

    },
    headClass() {
      return 'text-align: center;background:#eef1f6;'
    },
    rowClass() {
      return 'text-align: center;'
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
        this.$emit('sizeChange', val);
    },
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.$emit('currentChange', val);
    },

  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/common.scss";
.tableHeight {
  min-height: 560px;
}
/deep/.el-zoom-in-top {
  padding: 0 !important;
}
fieldset {
  border-radius: 3px;
  padding: 20px 10px;
  border-color: #f2f2f2;
  border-width: 1px;
  margin-bottom: 20px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.name-container {
  // &-container {
  // }
  .mr0 {
    margin-right: 0 !important;
  }
  // form.el-form {
  //   float: right;
  // }
  .block {
    float: right;
    margin: 12px;
  }
}
// .row-bg {
//   margin-bottom: 20px;
// }
</style>
