<template>
  <div>
    <div class="flex-inline-between">
      <el-button type="primary" size="medium" @click="showAuth">授权团队</el-button>
      <!-- 查询部分 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item class="mr0">
          <el-input v-model="formInline.region" placeholder="搜索" />
        </el-form-item>
        <el-form-item>
          <el-button inline="true" type="info" plain @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      style="width: 99%"
      stripe
      :cell-style="rowClass"
      :header-cell-style="headClass"
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <el-table-column prop="name" label="团队名称" />
      <el-table-column prop="name1" label="角色名称" />
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handleSpaceClick(scope.$index, scope.row)"
          >修改权限</el-button>
          <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">取消授权</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="1"
      ></el-pagination>
    </div>

    <el-dialog class="deepdialog" title="授权团队" :visible.sync="dialogauth">
      <el-form ref="verform" :model="verform" :rules="rules" label-width="80px">
        <el-form-item label="团队名称" prop="name">
          <el-input v-model="verform.name" placeholder="请填写团队名称"></el-input>
        </el-form-item>
        <el-form-item label="角色名称" prop="name1">
          <el-select style="width:100%" v-model="verform.name1" placeholder="请选择角色名称">
            <el-option label="空间管理" value="空间管理"></el-option>
            <el-option label="模板读写" value="模板读写"></el-option>
            <el-option label="模板只读" value="模板只读"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogauth = false">取消</el-button>
        <el-button type="primary" @click="addAuth('verform')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "templateauth",
  data() {
    return {
      isupdate: false,
      dialogauth: false,
      formInline: {
        region: ''
      },
      tableData: [
        {
          name: 'team1',
          name1: '空间管理',
        }],
      verform: {
        name: '',
        name1: ''
      },
      rules: {
        name: [
          { required: true, message: '请填写团队名称', trigger: 'blur' }
        ],
        name1: [
          { required: true, message: '请选择角色名称', trigger: 'change' }
        ],
      }
    }
  },
  methods: {
    showAuth() {
      this.verform = {
      }
      this.isupdate = false;
      this.dialogauth = true;
    },
    //授权
    addAuth(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false;
        }
        this.dialogauth = false;
        if (this.isupdate) {
        let form = this.verform;
          this.tableData.splice(this.index, form);
        } else {
          this.tableData.push(this.verform);
        }

      });

    },
    //搜索
    onSubmit() { },
    //修改权限
    handleSpaceClick(index, row) {
      this.index = index;
      this.dialogauth = true;
      this.isupdate = true;
      this.verform = row;
    },
    //取消权限
    handleDelete(index, row) {
      this.$confirm('您确定要取消 ' + row.name + ' 团队授权吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.tableData.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    handleSizeChange() { },
    handleCurrentChange() { },

    headClass() {
      return "text-align: center;background:#eef1f6;";
    },
    rowClass() {
      return "text-align: center;";
    },
  }
}
</script>
<style lang="scss" scoped>
@import "../../styles/common.scss";
.block {
  float: right;
  margin: 12px;
}
</style>