<template>
  <div class="assem-container">
    <el-button
      type="primary"
      @click="addinstall"
    >新增组合</el-button>
    <div>
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="table-templet">
            <h3>分组</h3>
            <div class="table-border">
              <el-table
                :data="tableData"
                style="width: 100%"
              >
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form
                      label-position="left"
                      inline
                      class="demo-table-expand"
                    >
                      <el-form-item label="系统安装包">
                        <el-row><span>{{ props.row.name }}</span></el-row>
                        <el-row><span>{{ props.row.name }}</span></el-row>
                        <el-row><span>{{ props.row.name }}</span></el-row>
                        <el-row><span>{{ props.row.name }}</span></el-row>
                        <el-row>
                          <el-tag type="success">{{ props.row.name }}</el-tag>
                        </el-row>
                      </el-form-item>
                      <el-form-item label="基础镜像包">
                        <span>{{ props.row.shop }}</span>
                      </el-form-item>

                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column
                  label="组名"
                  prop="name"
                />
                <el-table-column
                  label="描述"
                  prop="desc"
                />
              </el-table>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div />
    <el-dialog
      :close-on-click-modal="false"
      title="正在安装"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
      top="2vh"
    >
      <el-row>
        <el-col :span="24">
          <el-steps
            :active="1"
            align-center
            finish-status="success"
          >
            <el-step
              title="配置操作系统"
              description="配置操作系统"
              icon="el-icon-s-platform"
            />
            <el-step
              title="准备安装环境"
              description="准备安装环境"
              icon="el-icon-s-home"
            />
            <el-step
              title="安装master"
              description="安装master"
              icon="el-icon-s-promotion"
            />
            <el-step
              title="安装worker"
              description="安装worker"
              icon="el-icon-s-shop"
            />
          </el-steps>
        </el-col>
      </el-row>
      <extir />
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import extir from '@/components/commond'
export default {
  components: {
    extir
  },
  data() {
    return {
      dialogVisible: false,
      formInline: {
        region: '',
        input2: ''
      },
      packetData: [

      ],
      tableData: [
        {
          date: '2016-05-02 15:33:33',
          name: 'test-001',
          desc: '',
          edition: '5.0.4',
          status: 'Aderedd'
        },
        {
          date: '2016-05-02 15:33:33',
          name: 'test-002',
          desc: '',
          edition: '5.0.4',
          status: 'Aderedd'
        },
        {
          date: '2016-05-02 15:33:33',
          name: 'test-003',
          desc: '',
          edition: '5.0.4',
          status: 'failed'
        }
      ],
      tableData1: [
        {
          date: '2016-05-02 15:33:33',
          name: 'test-001',
          desc: '测试名称长度',
          edition: '5.0.4',
          status: 'Aderedd'
        },
        {
          date: '2016-05-02 15:33:32',
          name: 'test-007',
          desc: '后段',
          edition: '5.0.4',
          status: 'Aderedd'
        },
        {
          date: '2016-05-02 15:34:33',
          name: 'test-009',
          desc: '',
          edition: '5.0.4',
          status: 'Aderedd'
        }
      ]
    }
  },
  methods: {
    addinstall() {
      this.$router.push({ name: 'addinstallation', params: {} })
    },
    submit() {
      this.$confirm('此操作将执行安装', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dialogVisible = true
        const a = this.$refs.systemInstallation.selection
        const b = this.$refs.basicImagePackage.selection
        console.log([ ...a, ...b ])
      })
    },
    onAdd() {
      // console.log("submit!");
    },
    headerCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: #f7f9fc;color:#303133'
      }
    },
    handleName(index, row) {
      // console.log(index, row);
    },
    handleEdit(index, row) {
      // console.log(index, row);
      // this.$router.push({ path: 'applicationEditing' })
    }
  }
}
</script>

<style lang="scss" scoped>
.assem-container {
  padding: 10px 15px;
}
.form-inline {
  display: flex;
  justify-content: space-between;
}
.table-border {
  border: 1px solid #e6e9f1;
}
.table-templet {
  margin-bottom: 30px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
