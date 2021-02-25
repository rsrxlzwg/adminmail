
<template>
  <div class="store-sync">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="镜像仓库设置" name="seeting">
        <!-- 镜像列表 -->
        <div class="flex-inline-between">
          <el-button
            type="primary"
            size="medium"
            @click="onAdd"
          >创建目标</el-button>
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
          stripe
          :cell-style="rowClass"
          :header-cell-style="headClass"
          :default-sort="{prop: 'date', order: 'descending'}">
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
        <el-dialog class="deepdialog" :title="title" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="目标名称" :label-width="formLabelWidth">
              <el-input v-model="form.id" autocomplete="off" />
            </el-form-item>
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
      </el-tab-pane>
      <el-tab-pane label="镜像仓库同步" name="sync">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>同步规则</span>
          </div>
          <div class="manage-content">
            <!-- 列表上部分 -->
            <div class="flex-inline-between">
              <el-button
                type="primary"
                size="medium"
                @click="createRule"
              >创建规则</el-button>
              <!-- 查询部分 -->
              <el-form
                :inline="true"
                :model="searchData"
                class="demo-form-inline">
                <el-form-item label>
                  <el-input placeholder="请输入规则名称">
                    <el-button slot="append">搜索</el-button>
                  </el-input>
                </el-form-item>
              </el-form>
            </div>
            <!-- 列表展示 -->
            <el-table
              class="sync-table"
              :data="tableDatasync"
              style="width: 99%"
              size="mini"
              :header-cell-style="headClass">
              <el-table-column
                prop="id"
                label="规则名称"
                sortable
              />
              <el-table-column
                prop="name"
                label="目标"
              />
              <el-table-column
                prop="username"
                label="镜像"
              />
              <el-table-column
                prop="type"
                label="触发模式"
              >1111</el-table-column>
              <el-table-column
                prop="created_at"
                label="同步状态"
              />
              <el-table-column label="操作" >
                <template slot-scope="scope">
                  <el-button 
                   type="text"
                  size="small" @click="editRule(scope.$index, scope.row)">
                  编辑
                  </el-button>
                   <el-button 
                   type="text"
                  size="small" @click="synchronize(scope.$index, scope.row)">
                  开始同步
                  </el-button>
                    <el-button 
                   type="text"
                  size="small" @click="synDetail(scope.$index, scope.row)">
                  同步详情
                  </el-button>
                  <el-button 
                   type="text"
                  size="small"
                   @click.native.prevent="delRule(scope.$index, scope.row)" >
                  删除
                  </el-button>
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
                :total="tableDatasync.length"
              />
            </div>
            <!-- 新增和编辑规则 -->
            <el-dialog class="deepdialog" title="创建镜像同步规则" :visible.sync="ruleFormVisible">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <el-steps :active="ruleActive" simple>
                    <el-step title="基本信息" icon="el-icon-info" />
                    <el-step title="目标" icon="el-icon-finished" />
                    <el-step title="触发模式" icon="el-icon-monitor" />
                  </el-steps>
                </div>
                <!-- 基本信息 -->
                <el-form v-if="ruleActive === 1" :model="form">
                  <el-form-item label="规则名称" :label-width="formLabelWidth">
                    <el-input v-model="form.id" autocomplete="off" />
                  </el-form-item>
                  <el-form-item label="筛选镜像" :label-width="formLabelWidth">
                    <!-- 表格 -->
                    <el-table
                      size="mini"
                      :data="ruleTableData"
                      style="width: 99%"
                      border
                      :cell-style="rowClass"
                      :header-cell-style="headClass"
                    >
                      <el-table-column
                        prop="id"
                        label="镜像空间"
                      >
                        <template scope="scope">
                          <el-select v-model="scope.row.id" placeholder="请选择">
                            <el-option
                              v-for="item in roomOptions"
                              :key="item"
                              :label="item"
                              :value="item"
                            />
                          </el-select>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        label="镜像名称"
                      >
                        <template scope="scope">
                          <el-input v-model="scope.row.name" />
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="num"
                        label="版本号"
                      >
                        <template scope="scope">
                          <el-input v-model="scope.row.num" />
                        </template>
                      </el-table-column>
                    </el-table>
                    <el-button type="text" icon="el-icon-circle-plus" @click="ruleAdd">添加</el-button>
                  </el-form-item>
                </el-form>
                <!-- 目标 -->
                <div v-if="ruleActive === 2">
                  <!-- 列表上部分 -->
                  <div class="flex-inline-between">
                    <el-form
                      :inline="true"
                      :model="searchData"
                      class="demo-form-inline"
                    >
                      <el-form-item label>
                        <el-input placeholder="请输入目标名称">
                          <el-button slot="append">搜索</el-button>
                        </el-input>
                      </el-form-item>
                    </el-form>
                  </div>
                  <!-- 列表展示 -->
                  <el-table
                    class="sync-table"
                    :data="tableData"
                    style="width: 99%"
                    size="mini"
                    :header-cell-style="headClass"
                    border
                  >
                    <el-table-column
                      type="selection"
                      width="55"
                    />
                    <el-table-column
                      prop="id"
                      label="目标名称"
                      sortable
                    />
                    <el-table-column
                      prop="name"
                      label="目标地址"
                    />
                    <el-table-column
                      prop="username"
                      label="用户名"
                    />
                    <el-table-column
                      prop="type"
                      label="远程验证证书"
                    >1111</el-table-column>
                  </el-table>
                </div>
                <!-- 触发模式 -->
                <el-form
                  v-if="ruleActive === 3"
                  ref="form"
                  label-width="140px"
                  label-position="left"
                >
                  <el-form-item label="触发模式">
                    <el-radio v-model="modalRadio" label="1">手动</el-radio>
                    <el-radio v-model="modalRadio" label="2">定时</el-radio>
                  </el-form-item>
                  <el-divider />
                  <el-form-item label="立即同步">
                    <el-checkbox v-model="checked">创建同步规则后，立即使用本规则同步镜像版本</el-checkbox>
                  </el-form-item>
                </el-form>
              </el-card>
              <!-- 底部操作按钮 -->
              <div slot="footer" class="dialog-footer">
                <el-row :gutter="20">
                  <el-col :span="4">
                    <el-button
                      type="info"
                      plain
                      @click="ruleActive = 1;ruleFormVisible = false; "
                    >取消</el-button>
                  </el-col>
                  <el-col
                    :span="8"
                    :offset="12"
                  >
                    <el-button
                      type="info"
                      plain
                      :disabled="backDisabled"
                      @click="backStep"
                    >返回</el-button>
                    <el-button
                      type="primary"
                      @click="nextStep"
                    >{{ ruleActive === 3 ? "完成" : "继续" }}</el-button>
                  </el-col>
                </el-row>
              </div>
            </el-dialog>
          </div>
        </el-card>
        <el-divider />
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>同步目标</span>
          </div>
          <div class="target">
            <!-- 列表上部分 -->
            <div class="top">
              <el-row>
                <el-col
                  :span="6"
                  :offset="18"
                >
                  <el-form
                    :inline="true"
                    :model="searchData"
                    class="demo-form-inline"
                  >
                    <el-form-item label>
                      <el-input placeholder="请输入目标名称">
                        <el-button slot="append">搜索</el-button>
                      </el-input>
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-row>

            </div>
            <!-- 列表展示 -->
            <el-table
              class="sync-table"
              :data="tableData"
              style="width: 99%"
              size="mini"
              :header-cell-style="headClass"
              border
            >
              <el-table-column
                prop="id"
                label="目标名称"
                sortable
              />
              <el-table-column
                prop="name"
                label="目标地址"
              />
              <el-table-column
                prop="username"
                label="用户名"
              />
              <el-table-column
                prop="type"
                label="远程验证证书"
              >1111</el-table-column>
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
        </el-card>
      </el-tab-pane>
    </el-tabs>
    <el-dialog class="deepdialog" title="同步详情" :visible.sync="syncVisible">
         
          <el-input v-model="detailName" placeholder="请搜索" autocomplete="off" size="mini" style="width:30%;margin-bottom:20px" />
           <el-table
                    class="sync-table"
                    :data="syncTable"
                    style="width: 99%"
                    size="mini"
                    :header-cell-style="headClass"
                    border>
                    <el-table-column
                    prop="name"
                    label="镜像名称"/>
                      <el-table-column
                    prop="public"
                    label="版本"/>
                      <el-table-column
                    prop="target"
                    label="目标"/>
                      <el-table-column
                    prop="status"
                    label="状态"/>
                     <el-table-column
                    prop="created"
                    label="创建时间"/>
                      <el-table-column
                    prop="finished"
                    label="完成时间"/>
            </el-table>
          
          <div slot="footer" class="dialog-footer">
            <el-button @click="syncVisible = false">取 消</el-button>
            <el-button type="primary" @click="syncVisible = false">确 定</el-button>
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
      tableDatasync:[
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
      // 规则表格数据
      ruleTableData: [
        {
          id: '1cloud',
          name: 'nginx',
          num: 'v1'
        }
      ],
      roomOptions: ['1cloud', '2cloud'],
      searchData: {
        id: ''
      },
      title: '',
      form: {
        id: '',
        type: '1'
      },
      romoteCertificate: true,
      formLabelWidth: '120px',
      dialogFormVisible: false,
      ruleFormVisible: false
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
    // 创建规则
    createRule() {
      this.ruleFormVisible = true
    },
    editRule(i,row){
      console.log('row',row)
      this.ruleFormVisible = true
      this.form=row
      
    },
    synchronize(i,row){
       this.$message({
          message: '同步成功',
          type: 'success'
        });
    },
    synDetail(i,row){
      this.syncVisible=true
    },
    delRule(i,row){
       this.$confirm('确认删除吗？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    //
    backStep() {
      if (this.ruleActive === 2) {
        this.ruleActive = 1
      } else if (this.ruleActive === 3) {
        this.ruleActive = 2
      }
      if (this.ruleActive === 1) {
        this.backDisabled = true
      } else {
        this.backDisabled = false
      }
    },
    nextStep() {
      if (this.ruleActive === 3) {
        this.ruleActive = 1
        console.log(this.ruleActive)
        this.ruleFormVisible = false
      } else if (this.ruleActive === 1) {
        this.ruleActive = 2
      } else if (this.ruleActive === 2) {
        this.ruleActive = 3
      }
      this.backDisabled = false
    },
    ruleAdd() {
      var obj = {
        id: '',
        name: '',
        num: ''
      }
      this.ruleTableData.push(obj)
    },
   
    handleClick(tab, event) {
      console.log(tab, event)
    },
    onAdd() {
      this.title = '新增'
      this.dialogFormVisible = true
      for (var i in this.form) {
        this.form[i] = ''
      }
    },
  
    // 编辑操作
    handleEdit(index, row) {
      this.title = '编辑'
      this.dialogFormVisible = true
      this.form = row
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
.store-sync{
   .block {
    float: right;
    margin: 12px;
  }
}
</style>
