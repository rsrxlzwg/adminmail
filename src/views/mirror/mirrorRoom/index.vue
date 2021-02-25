<template>
  <!-- 镜像空间 -->
  <div class="mirror-room">
    <!-- 镜像列表 -->
    <div class="flex-inline-between">
      <el-button
        type="primary"
        size="medium"
        @click="onAdd"
      >创建镜像空间</el-button>
      <!-- 查询部分 -->
      <el-form
        :inline="true"
        :model="searchData"
        class="demo-form-inline"
      >
        <el-form-item label>
          <el-select
            v-model="searchData.mirrorRoom"
            placeholder="请选择镜像空间"
          >
            <el-option
              label="全部镜像"
              value="all"
            />
            <el-option
              label="dcsregistry"
              value="dcsregistry"
            />
          </el-select>
          <el-button
            type="info"
            plain
            @click="onSubmit"
          >搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      style="width: 99%"
      stripe
      :cell-style="rowClass"
      :header-cell-style="headClass"
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <el-table-column
        prop="id"
        label="镜像空间名称"
      >
        <template scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="访问类型"
        sortable
      />
      <el-table-column
        prop="num"
        label="镜像数量"
      />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            type="text"
            size="small"
            @click.native.prevent="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block right">
      <el-pagination
        background
        :current-page="1"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      />
    </div>
    <el-dialog class="deepdialog" :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="镜像空间名称" :label-width="formLabelWidth">
          <el-input v-model="form.id" autocomplete="off" />
          <span>
            镜像空间可以方便的组织和管理镜像
          </span>
        </el-form-item>
        <el-form-item label="访问类型" :label-width="formLabelWidth">
          <el-radio
            v-model="type"
            label="1"
          >公开</el-radio>
          <el-radio
            v-model="type"
            label="2"
          >私有</el-radio>
        </el-form-item>
         <el-form-item label="镜像数量" :label-width="formLabelWidth">
          <el-input v-model="form.num" autocomplete="off" type="number" />
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
import { getList } from '../../../api/base/setUpCredentials'

export default {
  name: 'MirrorRoom',
  data() {
    return {
      tableData: [
         {
            id:'addon-resizer',
            name:'addon-resizer',
            num:1,
            type:'2.1',
            created_at:'2020-09-28 14:55:11',
          }
      ],
      searchData: {
        mirrorRoom: ''
      },
      dialogFormVisible: false,
      title: '',
      form: {
        id: '',
        type: '1',
        num:''
      },
      type: '1',
      formLabelWidth: '120px'
    }
  },
  mounted() {
    // this.getList()
  },
  methods: {
    // 获取列表数据
    getList() {
      getList().then((res) => {
        this.tableData = res.data
      })
    },
    // 创建镜像
    onAdd() {
      this.title = '新增'
      this.dialogFormVisible = true
      this.form={
        id: '',
        type: '1'
      }
    },
    // 编辑操作
    handleEdit(index, row) {
      this.title = '编辑'
      this.dialogFormVisible = true
      this.form = row
    },
    // 详情
    detail() {
      console.log('111')
    },
    handleDelete() {
      // console.log(index, row);
      this.$confirm('确认删除吗？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    headClass() {
      return 'text-align: center;background:#eef1f6;'
    },
    rowClass() {
      return 'text-align: center;'
    },
    onSubmit() {
      // 搜索
      // console.log('submit!')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../styles/common.scss';
.mirror-room {
  .block {
    float: right;
    margin: 12px;
  }
}
</style>
