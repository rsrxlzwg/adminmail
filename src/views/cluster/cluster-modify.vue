<template>
  <!-- 集群编辑  -->
  <div class="culster-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <el-form ref="form" :rules="rules" :model="form" label-width="140px">
        <el-col :span="12">
          <el-form-item label="名称" required>
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类型" required>
            <el-select v-model="form.region" placeholder="类型" class="size-full">
              <el-option label="虚拟机" value="vis"></el-option>
              <el-option label="物理机" value="mach"></el-option>
            </el-select>
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
        <span>监控配置</span>
      </div>
      <el-form ref="form" :rules="rules" :model="form" label-width="140px">
        <el-col :span="12">
          <el-form-item label="Grafana地址" required>
            <el-input v-model="form.grafanaAddr"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Grafana Token" required>
            <el-input v-model="form.token"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Prometheus地址" required>
            <el-input v-model="form.PromeAddr"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Tiller地址" required>
            <el-input v-model="form.tiller"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>集群配置</span>
      </div>
      <el-form ref="form" :rules="rules" :model="form" label-width="140px">
        <el-col :span="20">
          <el-form-item label="配置" required>
            <el-input type="textarea" :rows="2" v-model="form.config"></el-input>
          </el-form-item>
        </el-col>
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
  name: "Culster-Modify",
  data() {
    return {
      form: {
        name: "cluster205",
        type: "vis",
        desc: "供能力平台测试使用",
        grafanaAddr: "http://xxxxx",
        token: "xxxxx",
        PromeAddr: "xxxx",
        tiller: "xxxx",
        config: "xxx"
      },
      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }]
      }
    };
  },
  methods: {
     onSubmit() {
      this.$router.replace("/infrastructure");
    },
    cancel() {
      this.$router.replace("/infrastructure");
    }
  }
};
</script>

<style lang="scss" scoped>
.culster-container {
  .el-card {
    margin-bottom: 20px;
  }
  .alignC {
    text-align: center;
  }
  .size-full.el-select{
    width: 100%;
  }
}
</style>
