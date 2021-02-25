<template>
  <div class="cluster-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <div>
        <el-form :rules="rules" :model="formInline" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="名称" prop="name">
                <el-input v-model="formInline.user" placeholder="审批人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="类型" prop="region">
                <el-select v-model="formInline.region" disabled placeholder="活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="描述">
                <el-input type="textarea" v-model="formInline.desc"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>监控配置</span>
      </div>
      <div>
        <el-form :rules="rules" :model="formInline" label-width="180px" class="demo-form-inline">
          <el-row>
            <el-col :span="12">
              <el-form-item label="Grafana" prop="name">
                <el-input v-model="formInline.user" placeholder="审批人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Grafana Token" prop="region">
                <el-input v-model="formInline.region" placeholder="审批人"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="prometheus地址" prop="region">
                <el-input v-model="formInline.region" placeholder="审批人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Tiller地址" prop="region">
                <el-input v-model="formInline.region" placeholder="审批人"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>集群配置</span>
      </div>
      <div>
        <el-form :rules="rules" :model="formInline" label-width="180px" class="demo-form-inline">
          <el-form-item label="配置" prop="desc">
            <el-input type="textarea" v-model="formInline.desc"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <div class="btn">
      <el-button @click="back">取消</el-button>
      <el-button type="primary">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: "虚拟机",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  methods: {
    back() {
      this.$router.back(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.cluster-container {
  padding: 10px 15px;
  /deep/ .el-form-item {
    // width: 50%;
  }
  /deep/ .el-select {
    display: block;
  }
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.box-card {
  margin-bottom: 20px;
}
.btn {
  text-align: center;
}
</style>