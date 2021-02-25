<template>
  <div>
   
        <div class="application-store">
          <div class="flex-inline-between">
            <el-dropdown style="font-size:18px">
              <el-button class="el-dropdown-link div-pointer" size="medium">导入模板</el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="handleVer('',false)">上传文件</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!-- 查询部分 -->
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="所有分类">
                <el-select v-model="formInline.region" @change="changeclick" placeholder>
                  <el-option label="名称" value="name"></el-option>
                  <el-option label="更新时间" value="time"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="mr0">
                <el-input v-model="formInline.user" placeholder="请输入应用名称" />
              </el-form-item>
              <el-form-item>
                <el-button inline="true" type="info" plain @click="onSubmit">搜索</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="flex-wrap">
            <el-card
              style="width:30%"
              class="product-item m-b-30"
              shadow="hover"
              v-for="item in productData"
            >
              <el-row>
                <el-col :span="12">
                  <img :src="item.img" alt :style="{width:item.width +'px'}" />
                </el-col>
                <el-col :span="12" style="text-align:right">
                  <div
                    @click="onClickItem(item)"
                    class="font-20 txt-blue bold div-pointer"
                  >{{item.productName}}</div>
                  <div class="txt-grey m-t-10">{{item.versionNum}}</div>
                </el-col>
              </el-row>
              <el-row class="m-t-30">
                <el-col :span="24">
                  <div class="font-14 cont">{{item.disc}}</div>
                </el-col>
              </el-row>
              <el-divider class="divider-t-b"></el-divider>
              <el-row>
                <el-col :span="24" class="font-14">
                  <div>
                    {{item.time}}
                    <div style="float:right;font-size:18px">
                      <el-tooltip class="item" effect="dark" content="部署" placement="top">
                        <i
                          style="color:#606266;margin-right:8px"
                          @click="addTemp(item)"
                          class="el-icon-upload div-pointer"
                        ></i>
                      </el-tooltip>
                      <el-tooltip class="item" effect="dark" content="添加版本" placement="top">
                        <i
                          class="el-icon-circle-plus div-pointer"
                          @click="handleVer(item,true)"
                          style="color:#606266;margin-right:8px"
                        ></i>
                      </el-tooltip>
                      <el-dropdown style="font-size:18px">
                        <i class="el-dropdown-link el-icon-more div-pointer"></i>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item @click.native="handleExput(item)">导出</el-dropdown-item>
                          <el-dropdown-item @click.native="handleIcon(item)">设置</el-dropdown-item>
                          <el-dropdown-item @click.native="handledel(item)">删除</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </div>
          <!-- 分页 -->
          <div class="block">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="1"
              :page-sizes="[9, 18, 27, 45]"
              :page-size="9"
              layout="total, sizes, prev, pager, next, jumper"
              :total="9"
            ></el-pagination>
          </div>
        </div>
        <!-- <div class="flex-inline-between">
          <el-button type="primary" size="medium" @click="addTep">创建模板空间</el-button>
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item class="mr0">
              <el-input v-model="formInline.user" placeholder="请输入模板空间名称" />
            </el-form-item>
            <el-form-item>
              <el-button inline="true" type="info" plain @click="onSubmit">搜索</el-button>
            </el-form-item>
          </el-form>
        </div> -->
        <!-- <el-table
          :data="tableData"
          style="width: 99%"
          stripe
          :cell-style="rowClass"
          :header-cell-style="headClass"
          :default-sort="{prop: 'date', order: 'descending'}"
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
        </el-table> -->
        <!-- 分页 -->
        <!-- <div class="block">
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
        </div> -->
      <!-- </el-tab-pane> -->
    <!-- </el-tabs> -->
 

    <el-dialog class="deepdialog" title="定制图标" :visible.sync="dialogIconVisible">
      <div class="type-content">
        <!-- <el-row :gutter="20" style="height:20px">
          <el-col :span="20">
            <el-radio v-model="radio" label="1">
              <div class="radio-box">
                <i class="el-icon-s-operation iconstyle" />
                <div class="radio-title">
                  <p>定制文字图标</p>
                  <p class="subtitle">你可以快速创建一个简单的图标，并在图标上显示应用名缩写。</p>
                </div>
              </div>
            </el-radio>
          </el-col>
        </el-row>
        <el-divider />
        <el-row :gutter="20" style="height:20px">
          <el-col :span="20">
            <el-radio v-model="radio" label="2">
              <div class="radio-box">
                <i class="el-icon-data-line iconstyle" />
                <div class="radio-title">
                  <p>从图标库选择...</p>
                  <p class="subtitle">如果你的图标很常见，系统附带的图标库中可以已有所需的图标。</p>
                </div>
              </div>
            </el-radio>
          </el-col>
        </el-row>
        <el-divider />-->
        <el-row :gutter="20" style="height:20px">
          <el-col :span="20">
            <el-radio v-model="radio" label="3">
              <div class="radio-box">
                <i class="el-icon-receiving iconstyle" />
                <div class="radio-title">
                  <p>上传图片</p>
                  <p class="subtitle">你可以快速上传并剪裁一个自定义图标。</p>
                </div>
              </div>
            </el-radio>
          </el-col>
        </el-row>
        <el-divider />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogIconVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogIconVisible = false ,dialogAddPic=true">下一页</el-button>
      </div>
    </el-dialog>

    <el-dialog class="deepdialog" title="添加版本" :visible.sync="dialogAddVer">
      <el-form ref="verform" :model="verform" label-width="80px">
        <el-form-item label="所属空间">
          <el-select
            style="width:100%"
            :disabled="addDisbled"
            v-model="verform.region"
            placeholder="请选择所属空间"
          >
            <el-option label="stable" value="stable"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传文件">
          <!-- 
          -->
          <el-upload action>
            <el-input v-model="verform.fliePath" readonly>
              <el-button slot="append" size="small" type="primary">浏览</el-button>
            </el-input>
          </el-upload>
        </el-form-item>
        <div class="el-upload__tip m-l-15 m-b-20">请上传模板压缩包，支持包含多个模板的 tgz 或 zip 压缩包</div>
        <el-form-item label="覆盖模板">
          <el-switch v-model="verform.delivery"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVer = false">取消</el-button>
        <el-button type="primary" @click="dialogAddVer = false">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog class="deepdialog" title="上传图片" :visible.sync="dialogAddPic">
      <el-form ref="picform" :model="picform" label-width="80px">
        <el-form-item label="上传文件">
          <el-upload action>
            <el-input v-model="picform.fliePath" readonly>
              <el-button slot="append" size="small" type="primary">浏览</el-button>
            </el-input>
          </el-upload>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "index",

  data() {
    return {
      dialogFormVisible: false,
      dialogIconVisible: false,
      dialogAddVer: false,
      addDisbled: false,
      dialogAddPic: false,
      radio: '1',
      activeName: 'appTemp',
      formInline: {
        user: "",
        region: ''
      },
      productData: [
        {
          img: require('../../assets/RabbitMQ.png'),
          productName: 'rabbitmq',
          versionNum: '0.1.2',
          disc: 'RabbitMQ is the most widely deployed open source message broker. It supports multiple messaging protocols.',
          width: '100',
          time: '2020-04-01 13:39:06'
        },
        {
          img: require('../../assets/tomcat.png'),
          productName: 'tomcat',
          versionNum: '0.4.0',
          disc: 'Deploy a basic tomcat application server with sidecar as web archive container',
          width: '50',
          time: '2020-05-12 13:21:06'
        },
        {
          img: require('../../assets/Redis.svg'),
          productName: 'redis',
          versionNum: '0.1.2',
          disc: 'Redis is an open source (BSD licensed), in-memory data structure store, used as a database, cache and message broker.',
          width: '100',
          time: '2020-09-12 09:11:06'
        },
        {
          img: require('../../assets/PostgreSQL.svg'),
          productName: 'postgresql',
          versionNum: '0.1.1',
          disc: 'PostgreSQL is a powerful, open source object-relational database system with over 30 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance.',
          width: '50',
          time: '2020-04-21 09:37:45'
        },
        {
          img: require('../../assets/harbor.png'),
          productName: 'harbor',
          versionNum: '1.2.1',
          disc: 'An open source trusted cloud native registry that stores, signs, and scans content',
          width: '100',
          time: '2020-06-19 14:09:56'
        },
        {
          img: require('../../assets/MongoDB.png'),
          productName: 'mongodb',
          versionNum: '0.1.2',
          disc: 'MongoDB is a general purpose, document-based, distributed database built for modern application developers and for the cloud era.',
          width: '100',
          time: '2020-08-01 19:39:06'
        },
        {
          img: require('../../assets/Memcached.png'),
          productName: 'memcached',
          versionNum: '3.1.0',
          disc: 'Free & open source, high-performance, distributed memory object caching system.',
          width: '50',
          time: '2020-04-01 13:14:06'
        },
        {
          img: require('../../assets/mysql.png'),
          productName: 'mysql',
          versionNum: '1.4.0',
          disc: 'Fast, reliable, scalable, and easy to use open-source relational database system.',
          width: '70',
          time: '2020-04-18 13:39:06'
        },
        {
          img: require('../../assets/Nginx.png'),
          productName: 'nginx',
          versionNum: '1.2.0',
          disc: 'nginx is an HTTP and reverse proxy server, a mail proxy server, and a generic TCP/UDP proxy server, originally written by Igor Sysoev.',
          width: '70',
          time: '2020-07-01 13:18:06'
        },

      ],
      tableData: [
        {
          name: "textTable",
          des: "此空间下的模板仅供技术预览使用",
          type: "公开空间",
          sum: "59/不限制",
          time: "2020-09-09 10:00:35"
        }
      ],
      formLabelWidth: '120px',
      form: {
        id: '',
        type: '1',
        sum: 0
      },
      //版本表单
      verform: {
        region: 'stable',
        delivery: false,
        fliePath: ''
      },
      //图片
      picform: {
        fliePath: ''
      },
      isTeps: false,
    };
  },

  methods: {

    addProject() {
    },
    addTemp(item) {
      this.$router.push({ path: "appNewTemp", query: { rows: item } });
    },
    handleClick() {

    },
    handleCommand(item, name) {
      console.log(item);
      console.log(name);
    },
    handleVer
      //升级版本
      (item, dis) {
      this.addDisbled = dis;
      this.dialogAddVer = true;
    },
    //导出
    handleExput(item) {
      this.$confirm('您确定导出应用模板 ' + item.productName + ' ？', '导出模板', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '导出成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    //设置图标
    handleIcon(item) {
      this.dialogIconVisible = true;
    },
    //删除
    handledel(item) {
      this.$confirm('您确定要删除 ' + item.productName + ' 模板吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
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
    //详情
    onClickItem(item) {
      this.$router.push({ path: "applicationDetails", query: { rows: item } });
    },
    onClickIcon(item) {
      console.log(item);
    },
    //创建模板空间
    addTep() {
      this.dialogFormVisible = true;
      this.isTeps = false;
    },
    headClass() {
      return "text-align: center;background:#eef1f6;";
    },
    rowClass() {
      return "text-align: center;";
    },
    onSubmit() {
      console.log("submit!");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    format1(percentage) {
      // return percentage === 100 ? "满" : `${percentage}%`;
      return "";
    },
    format2(percentage) {
      // return percentage === 100 ? "满" : `${percentage}%`;
      return ``;
    },
    changeclick(event, item) {
      if (event == "name") {
        this.productData.sort(function (s, t) {
          let a = s.disc.toLowerCase();
          let b = t.disc.toLowerCase();
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        })
      } else {
        this.productData.sort(function (a, b) {
          return b.time < a.time ? -1 : 1
        })
      }
    },
    // 编辑表格跳转
    editRow() {
      //   this.$router.replace("/infrastructure/modify");
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
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/common.scss";
.application-store {
  .product-item {
    height: 200px;
    // padding-bottom: 20px;
  }
  .product-desc {
    max-height: 80px;
    overflow-y: scroll;
    line-height: 1.5;
  }

  form.el-form {
    float: right;
  }
}
.block {
  float: right;
  margin: 12px;
}
.cont {
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  white-space: pre-wrap;
  height: 35px;
}
.divider-t-b {
  margin: 15px 0 !important;
}
.div-pointer {
  cursor: pointer;
}
.type-content {
  border: 1px solid #eee;
  padding: 20px;
}
.type-content {
  p {
    margin: 0;
  }
  .radio-box {
    height: 40px;
    line-height: 20px;
    display: inline-block;
    i.iconstyle {
      font-size: 24px;
      color: #9ba3af;
      padding: 10px;
    }
    .radio-title {
      display: inline-block;
      .subtitle {
        color: #9ba3af;
      }
    }
  }
}
/deep/ .el-upload {
  width: 100% !important;
}
</style>

