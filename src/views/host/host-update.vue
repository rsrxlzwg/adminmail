<template>
  <!-- 主机更新  -->
  <div class="host-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <el-form ref="form" :model="form" label-width="140px">
        <el-col :span="24">
          <el-form-item label="主机名称" required>
            <div>{{ form.name }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="描述">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>标签</span>
      </div>
      <el-form ref="form" :model="form" label-width="40px">
        <el-col :span="12">
          <el-form-item label="键" required></el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="值"></el-form-item>
        </el-col>
        <template v-for="(item,index) in form.keyVal">
          <el-col :key="index">
            <el-col :span="9">
              <el-form-item>
                <el-input v-model="item.key"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item>
                <span>=</span>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item>
                <el-input v-model="item.val"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label>
                <el-button type size="mini" icon="el-icon-plus" class="borderBlue" @click="add"></el-button>
                <el-button
                  type
                  size="mini"
                  icon="el-icon-minus"
                  class="borderRed"
                  @click.prevent="remove(item)"
                ></el-button>
              </el-form-item>
            </el-col>
          </el-col>
        </template>
      </el-form>
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
  name: "Host-Modify",
  data() {
    return {
      form: {
        name: "172.16.5.50",
        desc: "请填写描述",
        keyVal: [
          {
            key: "http://xxx1",
            val: "xxxxx1"
          },
          {
            key: "http://xxx2",
            val: "xxxxx2"
          }
        ]
      }
    };
  },
  methods: {
    remove(item) {
      var index = this.form.keyVal.indexOf(item);
      if (index !== -1) {
        this.form.keyVal.splice(index, 1);
      }
    },
    add() {
      this.form.keyVal.push({
        key: "",
        val: ""
      });
    },
    onSubmit() {
      this.$router.replace('/infrastructure/host');
    },
    cancel() {
      this.$router.replace('/infrastructure/host');
    }
  }
};
</script>

<style lang="scss" scoped>
.host-container {
  .el-card {
    margin-bottom: 20px;
  }
  .alignC {
    text-align: center;
  }
  .el-button--mini,
  .el-button--mini.is-round {
    padding: 7px 7px !important;
  }
  .borderRed {
    border-color: #f56c6c;
  }
  .borderBlue {
    border-color: #409eff;
  }
  .borderNone input.el-input__inner {
    border: none !important;
  }
}
</style>
