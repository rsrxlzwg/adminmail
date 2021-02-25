<template>
  <div>
        <div class="flex-inline-between">
          <el-button type="primary" size="medium" @click="addTep">创建模板空间</el-button>
          <!-- 查询部分 -->
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item class="mr0">
              <el-input v-model="formInline.user" placeholder="请输入模板空间名称" />
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
        >
          <el-table-column label="模板空间名称" prop="name">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="handleName(scope.$index, scope.row)"
              >{{ scope.row.name }}</el-button>
            </template>
          </el-table-column>

          <el-table-column prop="des" label="描述" />
          <el-table-column prop="type" label="空间类型" />
          <el-table-column prop="sum" label="当前模板数/最大模板数" />
          <el-table-column prop="time" label="更新时间" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleSpaceClick()">配置</el-button>
              <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      <el-dialog class="deepdialog" title="创建模板空间" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="空间名称" :label-width="formLabelWidth">
            <el-input v-model="form.id" autocomplete="off" />
          </el-form-item>
          <el-form-item label="模板数" :label-width="formLabelWidth" v-show="isTeps">
            <el-input v-model="form.sum" autocomplete="off" />
            <span>限制该模板空间下允许存在的最大应用模板数量，设置为 0 代表不限制</span>
          </el-form-item>

          <el-form-item label="空间类型" :label-width="formLabelWidth">
            <el-radio v-model="form.type" label="1">公开空间</el-radio>
            <el-radio v-model="form.type" label="2">私有空间</el-radio>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
    </el-dialog>

  </div>
</template>

<script>

  export default {
    data(){
      return{
      dialogFormVisible: false,
      formLabelWidth: '120px',

      formInline: {
        user: "",
        region: ''
      },
      form: {
        id: '',
        type: '1',
        sum: 0
      },
      tableData: [
            {
              name: "textTable",
              des: "此空间下的模板仅供技术预览使用",
              type: "公开空间",
              sum: "59/不限制",
              time: "2020-09-09 10:00:35"
            }
      ],
      isTeps: false,

       }
    },
    methods:{
       //模板详情
    handleName(index, row) {
      this.$router.push({ path: "templateauth", query: { rows: row } });
    },
       //创建模板空间
      addTep() {
        this.dialogFormVisible = true;
        this.isTeps = false;
      },
      onSubmit() {
        console.log("submit!");
      },
       //模板空间配置
      handleSpaceClick() {
        this.isTeps = true;
        this.dialogFormVisible = true

      },
      //模板空间删除
      handleDelete(index, row) {
        console.log(index, row);
        this.$confirm('您确定要删除 ' + row.name + ' 空间吗？', '提示', {
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    }
    
  }
</script>

<style lang="scss" scoped>
@import "../../styles/common.scss";
.block{
  float: right;
}
</style>