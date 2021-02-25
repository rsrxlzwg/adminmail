<template>
  <!-- 镜像管理 -->
  <div class="mirror-room">
    <!-- 镜像列表 -->
    <div class="flex-inline-between">
      <el-button
        type="primary"
        size="medium"
        @click="onAdd"
      >创建镜像</el-button>
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
        label="镜像名称"
      >
        <template scope="scope">
          <el-link type="primary" @click="mirrorDetail">
            {{ scope.row.id }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="镜像空间"
        sortable
      />
      <el-table-column
        prop="username"
        label="镜像地址"
      />
      <el-table-column
        prop="type"
        label="最新版本"
      />
      <el-table-column
        prop="created_at"
        label="更新时间"
      />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="addVersion"
          >添加版本</el-button>
          <el-button
            type="text"
            size="small"
            @click.native.prevent="handleEdit(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        background
        :current-page="1"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      />
    </div>
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
            username:'10.0.5.161/kube-system/add',
            type:'2.1',
            created_at:'2020-09-28 14:55:11',
          }
      ],
      searchData: {
        mirrorRoom: ''
      }
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
      this.$router.push({path:'/mirror/create',query:{type:'1'}})
    },
    // 镜像详情
    mirrorDetail() {
      this.$router.replace('/mirror/mirrorDetail')
    },
    // 添加版本
    addVersion() {
      this.$router.replace('/mirror/addVerison')
    },
    // 编辑操作
    handleEdit(index, row) {
      // console.log(index, row);
      this.$confirm('确认删除吗？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    // 删除
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

