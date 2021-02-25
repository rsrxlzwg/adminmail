<template>
  <div class="assem-container">
    <el-form
      :inline="true"
      :model="formInline"
      class="form-inline"
    >
      <el-form-item>
        <el-button
          type="primary"
          @click="onAdd"
        >添加服务</el-button>
      </el-form-item>
      <div>
        <el-form-item label="集群">
          <el-select
            v-model="formInline.region"
            placeholder="项目 default"
          >
            <el-option
              label="区域一"
              value="shanghai"
            />
            <el-option
              label="区域二"
              value="beijing"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="formInline.region"
            placeholder="全部"
          >
            <el-option
              label="区域一"
              value="shanghai"
            />
            <el-option
              label="区域二"
              value="beijing"
            />
          </el-select>
        </el-form-item>
        <el-form-item label>
          <el-input
            v-model="formInline.input2"
            placeholder="服务名称"
          >
            <el-button slot="append">搜索</el-button>
          </el-input>
        </el-form-item>
      </div>
    </el-form>
    <div class="table-templet">
      <h3>81-test-bobfttest</h3>
      <div class="table-border">
        <el-table
          :data="tableData"
          style="width: 100%"
          :header-cell-style="headerCellStyle"
          :default-sort="{prop: 'date', order: 'descending'}"
        >
          <el-table-column
            label="状态"
            prop="status"
            align="center"
            width="80"
          >
            <template slot-scope="scope">
              <el-tag
                v-if="scope.row.status === 'Aderedd'"
                type="success"
              >{{ scope.row.status }}</el-tag>
              <el-tag
                v-else
                type="danger"
              >{{ scope.row.status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="名称"
            prop="name"
            sortable
            width="80"
          >
            <template slot-scope="scope">
              <el-row>
                <el-button
                  type="text"
                  size="mini"
                  @click="handleName(scope.$index, scope.row)"
                >{{ scope.row.name }}</el-button>
              </el-row>
              <el-row>
                <span style="color:#30B978;font-size:10px">{{ scope.row.nameDescription }}</span>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="集群IP"
            prop="desc"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.desc }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="类型"
            prop="edition"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.edition }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="目标"
            prop="edition"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.copy }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="80"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                class="el-icon-more"
                @click="handleEdit(scope.$index, scope.row)"
              />
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
        region: '',
        input2: ''
      },
      tableData: [
        {
          date: '2016-05-02 15:33:33',
          name: 'test-001',
          desc: 'appliaca_cwdadaww',
          copy: '5',
          edition: 'cpu平均利用率:12%',
          status: 'Aderedd',
          nameDescription: '30058|tpc'
        },
        {
          date: '2016-05-02 15:33:33',
          name: 'test-002',
          desc: 'appliaca_cwdadaww',
          copy: '5',
          edition: 'cpu平均利用率:12%',
          status: 'Aderedd'
        },
        {
          date: '2016-05-02 15:33:33',
          name: 'test-003',
          desc: 'appliaca_cwdadaww',
          copy: '5',
          edition: 'cpu平均利用率:12%',
          status: 'failed'
        }
      ]
    }
  },
  methods: {
    onAdd() {
      // console.log("submit!");
      this.$router.push({
        name: 'serviceEditing', params: { title: '新增', type: 'add' }
      })
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
      this.$router.push({ name: 'serviceEditing', params: { title: '编辑', type: 'edit' } })
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
</style>
