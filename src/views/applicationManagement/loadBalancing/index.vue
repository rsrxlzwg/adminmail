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
        >添加负载</el-button>
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
        <el-form-item label="应用状态">
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
            placeholder="负载均衡名称"
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
              <el-button
                type="text"
                size="mini"
                @click="handleName(scope.$index, scope.row)"
              >{{ scope.row.name }}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="目标"
            prop="desc"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.desc }}</span>
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            label="创建时间"
            prop="date"
            sortable
            width="180"
          >
            <template slot-scope="scope">{{ scope.row.date }}</template>
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
    <div class="table-templet">
      <h3>81-test-default</h3>
      <div class="table-border">
        <el-table
          :data="tableData1"
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
              <el-tag type="success">{{ scope.row.status }}</el-tag>
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
              <el-button
                type="text"
                size="mini"
                @click="handleName(scope.$index, scope.row)"
              >{{ scope.row.name }}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="目标"
            prop="desc"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.desc }}</span>
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            label="创建时间"
            prop="date"
            sortable
            width="180"
          >
            <template slot-scope="scope">{{ scope.row.date }}</template>
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
        },
        {
          date: '2016-05-02 15:13:33',
          name: 'test-000',
          desc: '前端',
          edition: '5.0.4',
          status: 'Aderedd'
        },
        {
          date: '2016-05-02 15:43:33',
          name: 'test-004',
          desc: '',
          edition: '5.0.4',
          status: 'Aderedd'
        },
        {
          date: '2016-05-02 15:53:33',
          name: 'test-003',
          desc: '',
          edition: '5.0.4',
          status: 'Aderedd'
        }
      ]
    }
  },
  methods: {
    onAdd() {
      // console.log("submit!");
      this.$router.push({ name: 'balenceadd', params: { title: '添加', type: 'add' } })
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
      this.$router.push({ name: 'balenceadd', params: { title: '编辑', type: 'edit' } })
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
