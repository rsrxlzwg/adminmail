<template>
  <!-- 持久卷添加  -->
  <div class="lasting-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <el-form ref="form" :rules="rules" :model="form" label-width="140px">
        <el-col :span="12">
          <el-form-item label="卷插件" required>
            <el-select v-model="form.plug" placeholder="请选择卷插件" class="size-full">
              <el-option label="plug1" value="plug1"></el-option>
              <el-option label="plug2" value="plug2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>插件配置</span>
      </div>
      <!-- action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"-->
      <el-upload class="avatar-uploader">
        <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" /> -->
        <i class="el-icon-s-ticket avatar-uploader-icon"></i>
        <span class="spanStyle">需要选择卷插件</span>
      </el-upload>
    </el-card>
    <el-card class="box-card block">
      <div slot="header" class="clearfix">
        <span>持久卷配置</span>
      </div>
      <div class="selectStyle modelStyle">
        <el-form ref="form" :rules="rules" :model="form" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="访问模式">
                <el-radio-group v-model="form.selectmodel">
                  <el-radio label="单主机读写"></el-radio>
                  <el-radio label="多主机只读"></el-radio>
                  <el-radio label="多主机读写"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="分配给存储类">
                <el-select v-model="form.class" placeholder="请选择" class="size-full">
                  <el-option label="无" value="无"></el-option>
                  <el-option label="xxx" value="xxx"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="selectStyle borderStyle">
        <el-row>
          <span class="title">挂载选项</span>
        </el-row>
        <el-row>
          <el-col :span="12" v-for="(item,index) in form.select" :key="index">
            <el-col :span="20">
              <el-input v-model="item.val"></el-input>
            </el-col>
            <el-col :span="4">
              <i class="el-icon-plus iconStyle iconStylePlus" @click="add"></i>
              <i class="el-icon-minus iconStyle iconStyleMinus" @click.prevent="remove(item)"></i>
            </el-col>
          </el-col>
        </el-row>
      </div>
      <el-row class="addStyle">
        <i class="el-icon-plus">添加</i>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <div class="selectStyle">
        <el-row>
          <span class="title">节点亲和性</span>
        </el-row>
      </div>
    </el-card>
    <el-row :gutter="10">
      <el-col :xs="24" class="alignC">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "LastingEdit",
  data() {
    return {
      form: {
        plug: "",
        selectmodel: "单主机读写",
        class: "无",
        select: [
          {
            val: ""
          }
        ]
      },
      rules: {
        plug: [{ required: true, message: "请选择卷插件", trigger: "blur" }]
      }
    };
  },
  methods: {
    remove(item) {
      var index = this.form.select.indexOf(item);
      if (index !== -1) {
        this.form.select.splice(index, 1);
      }
    },
    add() {
      this.form.select.push({ val: "" });
    },
    onSubmit() {
      this.$router.replace("/store/storeIndex");
    },
    cancel() {
      this.$router.replace("/store/storeIndex");
    }
  }
};
</script>

<style lang="scss" scoped>
.lasting-container {
  .el-card {
    margin-bottom: 20px;
    .el-card__body {
      height: 100px;
      .avatar-uploader {
        text-align: center;
      }
      i.el-icon-s-ticket.avatar-uploader-icon {
        font-size: 40px;
        color: lightblue;
        line-height: 100px;
      }
      .spanStyle {
        display: inline-block;
        padding: 5px;
        color: #ccc;
        font-size: 12px;
      }
    }
  }
  .el-card.pad10 {
    padding: 10px;
  }
  .alignC {
    text-align: center;
  }
  .size-full.el-select {
    width: 100%;
  }
  .title {
    font-size: 18px;
    font-weight: 600;
    display: block;
    line-height: 30px;
    padding: 10px;
  }
  .iconStyle {
    font-size: 8px;
    font-weight: 600;
    padding: 4px;
    margin: 4px;
    margin-top: 8px;
  }
  .iconStylePlus {
    border: 2px solid #409eff;
    color: #409eff;
  }
  .iconStyleMinus {
    border: 2px solid #f56c6c;
    color: #f56c6c;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both;
  }
  .block .el-alert {
    margin-bottom: 20px;
  }
  .selectStyle {
    background: #f4f4f5;
    padding: 10px;
    margin-bottom: 20px;
  }
  .modelStyle {
    .el-form-item {
      margin-bottom: 0 !important;
    }
  }
  .borderStyle {
    border: 1px solid #eee;
  }
  .addStyle {
    background: rgb(255, 255, 255);
    border: 1px solid #eee;
    margin-top: -20px;
    padding: 10px;
    text-align: center;
  }
}
</style>
