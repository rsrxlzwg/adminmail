<template>
  <div>
    <!-- 镜像列表 -->
        <div class="flex-inline-between">
          <el-button
            type="primary"
            size="medium"
            @click="onAdd"
          >创建仓库</el-button>
          <!-- 查询部分 -->
          <el-form
            :inline="true"
            :model="searchData"
            class="demo-form-inline"
          >
            <el-form-item label>
              <el-input
                v-model="searchData.id"
                placeholder="请输入目标名称"
              >
                <template slot="append">
                  <el-button
                    type="info"
                    plain
                    @click="onSubmit"
                  >搜索</el-button>
                </template>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <!-- 表格 -->
        <el-table
          :data="tableData"
          style="width: 99%"
          stripe>
          <el-table-column
            prop="id"
            label="目标名称"
          />
          <el-table-column
            prop="name"
            label="目标地址"
            sortable
          />
          <el-table-column
            prop="username"
            label="用户名"
          />
          <el-table-column
            prop="type"
            label="密码"
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
        <div class="block ">
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
            <!-- <el-form-item label="目标名称" :label-width="formLabelWidth">
              <el-input v-model="form.id" autocomplete="off" />
            </el-form-item> -->
            <el-form-item label="目标地址" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="用户名" :label-width="formLabelWidth">
              <el-input v-model="form.username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
              <el-input v-model="form.type" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="远程验证证书" :label-width="formLabelWidth">
              <el-checkbox v-model="romoteCertificate">启用</el-checkbox>
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
    data() {
    return {
      syncTable:[{
        name:'镜像1',
        public:'1.0.1',
        target:'fhs',
        status:'完成',
        created:'2020.9.10',
        finished:'2020.9.10'
      },
      {
        name:'镜像2',
        public:'1.0.1',
        target:'fhs',
        status:'失败',
        created:'2020.9.11',
        finished:'2020.9.11'
      },],
      title: '',
      form: {
        id: '',
        type: '1'
      },
       formLabelWidth: '120px',
      dialogFormVisible:false,
      romoteCertificate: true,
      syncVisible:false,
      detailName:'',
      activeName: 'seeting',
      ruleActive: 1,
      backDisabled: true,
       tableData: [
         {
            id:'addon-resizer',
            name:'addon-resizer',
            username:'10.0.5.161/kube-system/add',
            type:'2.1',
            created_at:'2020-09-28 14:55:11',
          }
      ],
      modalRadio: '1',
      checked: '',
      searchData: {
        id: ''
      },
      }
    },
    mounted() {
    // this.getList()
  },
    methods:{
      // 编辑操作
    handleEdit(index, row) {
      this.title = '编辑'
      this.dialogFormVisible = true
      this.form = row
    },
      // 获取列表数据
      getList() {
        getList().then((res) => {
          this.tableData = res.data
        })
      },
      onAdd() {
        this.title = '新增'
        this.dialogFormVisible = true
        for (var i in this.form) {
          this.form[i] = ''
        }
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
 .block {
    float: right;
    margin: 12px;
  }
</style>