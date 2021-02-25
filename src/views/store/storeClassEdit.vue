<template>
  <!-- 存储类编辑  -->
  <div class="storeClass-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-col :span="12">
          <el-form-item label="名称" required>
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="卷插件" required>
            <el-select v-model="form.plug" placeholder="类型" class="size-full">
              <el-option label="虚拟机" value="vis"></el-option>
              <el-option label="物理机" value="mach"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>参数</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-col :span="11">
          <el-form-item label="键" required>
            <el-input v-model="form.key"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item label required>
            <span>=</span>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="值" required>
            <el-input v-model="form.val"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>自定义</span>
      </div>
      <div class="selectStyle modelStyle">
        <el-form ref="form" :rules="rules" :model="form" label-width="100px">
          <el-row>
            <el-form-item label="回收策略">
              <el-radio-group v-model="form.strategy">
                <el-radio label="删除底层卷和数据"></el-radio>
                <el-radio label="保留数据，手动删除"></el-radio>
              </el-radio-group>
            </el-form-item>
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
  name: "Culster-Modify",
  data() {
    return {
      form: {
        name: "cluster205",
        plug: "NFS Share",
        key: "provider",
        val: "nfs-provider",
        strategy: "删除底层卷和数据",
        select: [
          {
            val: "1x"
          }
        ]
      },
      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }]
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
      this.$router.replace("/store/storeClass");
    },
    cancel() {
      this.$router.replace("/store/storeClass");
    }
  }
};
</script>

<style lang="scss" scoped>
.storeClass-container {
  .el-card {
    margin-bottom: 20px;
  }
  .alignC {
    text-align: center;
  }
  .size-full.el-select {
    width: 100%;
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
  .title {
    font-size: 18px;
    font-weight: 600;
    display: block;
    line-height: 30px;
    padding: 10px;
  }
}
</style>
