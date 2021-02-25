<template>
  <div class="assem-container">
    <el-form :inline="true" :model="formInline" class="form-inline">
      <el-form-item>
        <el-button type="primary" @click="onAdd">添加流水线</el-button>
      </el-form-item>
      <div>
        <el-form-item label="集群">
          <el-select v-model="formInline.region" placeholder="项目 default">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label>
          <el-input placeholder="流水线名称" v-model="formInline.input2">
            <el-button slot="append">搜索</el-button>
          </el-input>
        </el-form-item>
      </div>
    </el-form>
    <div class="table-templet">
      <h3>81-test-jhb-test</h3>
      <div class="table-border">
        <el-table
          :data="tableData"
          style="width: 100%"
          :header-cell-style="headerCellStyle"
          :default-sort="{prop: 'date', order: 'descending'}"
        >
          <el-table-column label="状态" prop="status" align="center" width="100">
            <template slot-scope="scope">
              <el-tag type="success">{{ scope.row.status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="名称" prop="name" sortable width="80">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                @click="handleName(scope.$index, scope.row)"
              >{{ scope.row.name }}</el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" label="描述" prop="desc">
            <template slot-scope="scope">
              <span>{{ scope.row.desc }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="最后执行时间" prop="date" sortable width="180">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column label="操作" width="80" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="table-templet">
      <h3>81-test-teton-test</h3>
      <div class="table-border">
        <el-table
          :data="tableData1"
          style="width: 100%"
          :header-cell-style="headerCellStyle"
          :default-sort="{prop: 'date', order: 'descending'}"
        >
          <el-table-column label="状态" prop="status" align="center" width="100">
            <template slot-scope="scope">
              <el-tag type="success">{{ scope.row.status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="名称" prop="name" sortable width="80">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                @click="handleName(scope.$index, scope.row)"
              >{{ scope.row.name }}</el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" label="描述" prop="desc">
            <template slot-scope="scope">
              <span>{{ scope.row.desc }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="最后执行时间" prop="date" sortable width="180">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column label="操作" width="80" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog class="deepdialog" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="right"
        label-width="120px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="类型" prop="type">
          <el-select v-model="temp.type" class="filter-item" placeholder="Please select">
            <el-option
              v-for="item in calendarTypeOptions"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="temp.status" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="等级">
          <el-rate
            v-model="temp.importance"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            :max="3"
            style="margin-top:8px;"
          />
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="temp.remark"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
const calendarTypeOptions = [
  { key: "CN", display_name: "China" },
  { key: "US", display_name: "USA" },
  { key: "JP", display_name: "Japan" },
  { key: "EU", display_name: "Eurozone" }
];
export default {
  data() {
    return {
      formInline: {
        region: "",
        input2: ""
      },
      textMap: {
        update: "编辑",
        create: "新增"
      },
      statusOptions: ["published", "draft", "deleted"],
      dialogFormVisible: false,
      dialogStatus: "",
      calendarTypeOptions,
      rules: {
        type: [
          { required: true, message: "type is required", trigger: "change" }
        ],
        title: [
          { required: true, message: "title is required", trigger: "blur" }
        ]
      },
      temp: {
        id: undefined,
        importance: 1,
        remark: "",
        title: "",
        type: "",
        status: "published"
      },
      tableData: [
        {
          date: "2016-05-02 15:33:33",
          name: "test-001",
          desc: "",
          status: "Aderedd"
        }
      ],
      tableData1: [
        {
          date: "2016-05-02 15:33:33",
          name: "test-001",
          desc: "测试名称长度",
          status: "Aderedd"
        },
        {
          date: "2016-05-02 15:33:32",
          name: "test-007",
          desc: "后段",
          status: "Aderedd"
        },
        {
          date: "2016-05-02 15:34:33",
          name: "test-009",
          desc: "",
          status: "Aderedd"
        },
        {
          date: "2016-05-02 15:13:33",
          name: "test-000",
          desc: "前端",
          status: "Aderedd"
        },
        {
          date: "2016-05-02 15:43:33",
          name: "test-004",
          desc: "",
          status: "Aderedd"
        },
        {
          date: "2016-05-02 15:53:33",
          name: "test-003",
          desc: "",
          status: "Aderedd"
        }
      ]
    };
  },
  methods: {
    onAdd() {
      // console.log("submit!");
      this.dialogStatus = "create";
      this.dialogFormVisible = true
    },
    headerCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: #f7f9fc;color:#303133";
      }
    },
    handleName(index, row) {
      // console.log(index, row);
      this.temp = Object.assign({}, row); // copy obj
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    handleEdit(index, row) {
      // console.log(index, row);
      this.$router.push({ path: "assemblyLineEdit" });
    },
    createData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024; // mock a id
          this.temp.author = "vue-element-admin";
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: "Success",
              message: "Created Successfully",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    },
    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          updateArticle(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id);
            this.list.splice(index, 1, this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: "Success",
              message: "Update Successfully",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    }
  }
};
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
.deepdialog{
  /deep/ .el-select{
    display: block;
  }
  /deep/ .el-input{
    display: block;
    width: 100%;
  }
}
</style>