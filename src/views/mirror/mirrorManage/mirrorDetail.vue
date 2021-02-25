<template>
  <!-- 镜像详情 -->
  <div class="mirror-detail">
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="镜像版本"
        name="version">
        <div class="flex-inline-between">
          <div>
            <el-button
              type="primary"
              size="medium"
              :disabled="disableButton"
              @click="upload"
            >下载</el-button>
            <el-button
              type="primary"
              size="medium"
              :disabled="disableButton"
              @click="handleDelete"
            >删除</el-button>
             <el-button
              type="primary"
              size="medium"
              @click="addVersion"
            >添加版本</el-button>
          </div>
          <!-- 查询部分 -->
          <el-form
            :inline="true"
            :model="searchData"
            class="demo-form-inline"
          >
            <el-form-item label>
              <el-input placeholder="请输入版本名称">
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
        <div v-if="multipleSelection.length === 0">
          <!-- 表格 -->
          <el-table
            size="mini"
            :data="tableData"
            style="width: 99%"
            stripe
            :cell-style="rowClass"
            :header-cell-style="headClass"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column
              prop="name"
              label="版本名称"
              sortable
            />
            <el-table-column
              prop="id"
              label="版本 ID"
            />
            <el-table-column
              prop="size"
              label="大小"
            />
            <el-table-column
              prop="time"
              label="创建时间"
            />
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
        <div v-if="multipleSelection.length !== 0">
          <el-card class="box-card">
            <!-- 卡片 头部 -->
            <div
              slot="header"
              class="clearfix"
            >
              <span>版本信息</span>
              <el-button
                class="pull-right"
                size="mini"
                icon="el-icon-close"
                type="text"
                @click="close"
              />
            </div>
            <!-- 卡片内容 -->
            <p>概览</p>
            <el-card class="box-card">
              <el-row :gutter="20">
                <el-col :span="6">
                  版本 ID
                </el-col>
                <el-col :span="18">
                  {{ multipleSelection[0].name }}
                </el-col>
              </el-row>
              <el-divider />
              <el-row :gutter="20">
                <el-col :span="6">
                  镜像 ID
                </el-col>
                <el-col :span="18">
                  {{ multipleSelection[0].name }}
                </el-col>
              </el-row>
              <el-divider />
              <el-row :gutter="20">
                <el-col :span="6">
                  操作系统
                </el-col>
                <el-col :span="18">
                  Linux
                </el-col>
              </el-row>
              <el-divider />
              <el-row :gutter="20">
                <el-col :span="6">
                  架构
                </el-col>
                <el-col :span="18">
                  amd64
                </el-col>
              </el-row>
              <el-divider />
              <el-row :gutter="20">
                <el-col :span="6">
                  命令
                </el-col>
                <el-col :span="18">
                  <ul
                    style="overflow:auto"
                    class="pushUlStyle"
                  >
                    <li>rsync -avz &lt;node_ip&gt;:/var/local/kube-agent/registry /data/imgBackup
                      <i
                        slot="suffix"
                        class="el-icon-document-copy"
                      />
                    </li>
                  </ul>
                </el-col>
              </el-row>
              <el-divider />
              <el-row :gutter="20">
                <el-col :span="6">
                  健康检查命令
                </el-col>
                <el-col :span="18">
                  无
                </el-col>
              </el-row>
              <el-divider />
              <el-row :gutter="20">
                <el-col :span="6">
                  用户
                </el-col>
                <el-col :span="18">
                  无
                </el-col>
              </el-row>
              <el-divider />
              <el-row :gutter="20">
                <el-col :span="6">
                  作者
                </el-col>
                <el-col :span="18">
                  Quintin Lee "qlee@google.com"
                </el-col>
              </el-row>
              <el-divider />
              <el-row :gutter="20">
                <el-col :span="6">
                  Docker
                </el-col>
                <el-col :span="18">
                  1.12.6
                </el-col>
              </el-row>
              <el-divider />
              <el-row :gutter="20">
                <el-col :span="6">
                  标签
                </el-col>
                <el-col :span="18">
                  无
                </el-col>
              </el-row>
              <el-divider />
              <el-row :gutter="20">
                <el-col :span="6">
                  环境变量
                </el-col>
                <el-col :span="18">
                  <!-- 表格 -->
                  <el-table
                    size="mini"
                    :data="tableData"
                    style="width: 99%"
                    border
                    :cell-style="rowClass"
                    :header-cell-style="headClass"
                  >
                    <el-table-column
                      prop="id"
                      label="键"
                    />
                    <el-table-column
                      prop="name"
                      label="值"
                    />
                  </el-table>
                </el-col>
              </el-row>
            </el-card>
            <p>镜像层级</p>
            <el-card class="box-card">
              <!-- 表格 -->
              <el-table
                size="mini"
                :data="tableData"
                style="width: 99%"
                border
                :cell-style="rowClass"
                :header-cell-style="headClass"
              >
                <el-table-column
                  prop="id"
                  label="镜像层级"
                />
                <el-table-column
                  prop="created_at"
                  label="创建时间"
                />
                <el-table-column
                  prop="type"
                  label="命令"
                />
                <el-table-column
                  prop="username"
                  label="命令参数"
                />
              </el-table>
            </el-card>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane
        label="镜像描述"
        name="des" >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>概述</span>
          </div>
          <h3>使用说明</h3>
          <p>可以在这里用 Markdown 编辑概述，默认会自动从代码中获得 readme.md。</p>
        </el-card>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getList } from '../../../api/base/setUpCredentials'

export default {
  data() {
    return {
      activeName: 'version',
      tableData: [
        {
          name:'2.1',
          id:'0e6a091ec51434f8733da7e1223f92935da8e70ba37f4030029e9d0767aeeb50',
          size:'7.0M',
          time:'2020-10.15'
        }
      ],
      searchData: {
        mirrorRoom: ''
      },
      multipleSelection: [],
      disableButton: true
    }
  },
  mounted() {
    // this.getList()
  },
  methods: {
    addVersion(){
      this.$router.replace('/mirror/addVerison')

        // this.$router.push({path:'/mirror/addVersion',query:{type:'2'}})
    },
    // 获取列表数据
    getList() {
      getList().then((res) => {
        this.tableData = res.data
      })
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    upload() {
       this.$alert(`<div>
       <p>此操作会下载镜像包 addon-resizer.tar。下载完成后可以通过镜像包上传功能，上传至指定的镜像仓库，或通过以下命令导入到任意节点：</p>
       <blockquote>tar xvf addon-resizer.tar | xargs docker load -i</blockquote>
       </div>`, '下载', {
          dangerouslyUseHTMLString: true
        });
   
    },
    handleDelete() {
      this.$confirm('确认删除吗？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    onSubmit() {
      // 搜索
      // console.log('submit!')
    },
    close() {
      this.multipleSelection = []
      if (this.multipleSelection.length === 0) {
        this.disableButton = true
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.disableButton = false
      console.log(val)
    },
    headClass() {
      return 'text-align: center;background:#eef1f6;'
    },
    rowClass() {
      return 'text-align: center;'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../styles/common.scss";
.block{
  float: right;
  margin: 12px;
}
.mirror-detail {
  .block {
    float: right;
    margin: 12px;
  }
  .pull-right {
    float: right;
  }
  .pushUlStyle {
    li:nth-of-type(even) {
      color: #909399;
      padding: 4px;
    }
    li:nth-of-type(odd) {
      background-color: #f4f4f5;
      padding: 4px;
      border: 1px solid #d3d4d6;
    }
    li i {
      float: right;
    }
  }
}
</style>
