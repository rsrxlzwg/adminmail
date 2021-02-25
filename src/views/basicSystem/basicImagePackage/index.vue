<template>
  <div class="assem-container">
    <!-- <excter /> -->
    <el-form
      :inline="true"
      :model="formInline"
      class="form-inline"
    >
      <el-form-item>
        <!-- <el-popover
          placement="bottom"
          title=""
          width="110"
          trigger="click"
          content=""
        >
          <upload />
          <el-button
            slot="reference"
            type="primary"
          >新增基础镜像包</el-button>
        </el-popover> -->
        <el-button
          type="primary"
          @click="updatacom"
        >新增基础镜像包</el-button>
        <el-button
          style="margin-left:20px"
          type="primary"
          @click="updatacom"
        >删除基础镜像包</el-button>
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
            placeholder="输入基础镜像包名称"
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
            type="selection"
            width="55"
          />
          <el-table-column
            label="状态"
            prop="status"
            align="center"
            width="80"
          >
            <template slot-scope="scope">
              <el-tag
                v-if="scope.row.status === 'using'"
                type="success"
              >{{ scope.row.status }}</el-tag>
              <el-tag
                v-else-if="scope.row.status === 'failed'"
                type="danger"
              >{{ scope.row.status }}</el-tag>
              <i
                v-else-if="scope.row.status === 'upload'"
                class="el-icon-loading"
              />
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="安装包名称"
            prop="name"
            sortable
            width="120"
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
            label="版本"
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
            label="副本"
            prop="edition"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.copy }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="部署时间"
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
import upload from '@/components/uploadcom'
import minins from '../mixins/updatabar'
export default {
  components: {
    upload
  },
  mixins: [ minins ],
  data() {
    return {
      filedom: '',
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
          status: 'failed'
        },
        {
          date: '2016-05-02 15:33:33',
          name: 'test-002',
          desc: 'appliaca_cwdadaww',
          copy: '5',
          edition: 'cpu平均利用率:12%',
          status: 'failed'
        },
        {
          date: '2016-05-02 15:33:33',
          name: 'test-003',
          desc: 'appliaca_cwdadaww',
          copy: '5',
          edition: 'cpu平均利用率:12%',
          status: 'using'
        }

      ]
    }
  },
  methods: {
    onAdd() {
      // this.$router.push({ name: 'HPAEditing', params: { title: '新增', type: 'add' } })
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
      // this.$router.push({ name: 'HPAEditing', params: { title: '编辑', type: 'edit' } })
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
.el-icon-loading {
  font-size: 20px;
  color: #93b719;
}
</style>
