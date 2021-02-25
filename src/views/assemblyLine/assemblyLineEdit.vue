<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>配置信息</span>
      </div>
      <div>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card>
              <div slot="header" class="clearfix">
                <span>代码源</span>
              </div>
              <div>
                <el-form
                  :model="ruleForm"
                  :rules="rules"
                  ref="ruleForm"
                  label-width="100px"
                  class="demo-ruleForm"
                >
                  <el-form-item label="git地址" prop="gitAddress">
                    <el-input v-model="ruleForm.gitAddress"></el-input>
                  </el-form-item>
                  <el-form-item label="分支" prop="Branch">
                    <el-input v-model="ruleForm.Branch"></el-input>
                  </el-form-item>
                  <el-form-item label="账号" prop="account">
                    <el-input v-model="ruleForm.account"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card>
              <div slot="header" class="clearfix">
                <span>镜像仓库</span>
              </div>
              <div>
                <el-form
                  :model="ruleForm"
                  :rules="rules"
                  ref="ruleForm"
                  label-width="100px"
                  class="demo-ruleForm"
                >
                  <el-form-item label="仓库地址" prop="gitAddress">
                    <el-input v-model="ruleForm.gitAddress"></el-input>
                  </el-form-item>
                  <el-form-item label="镜像地址" prop="Branch">
                    <el-input v-model="ruleForm.Branch"></el-input>
                  </el-form-item>
                  <el-form-item label="账号" prop="account">
                    <el-input v-model="ruleForm.account"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="line-height: 40px;">流程编辑</span>
        <span style="float:right;">
          <span style="margin-right:4px;">模版选择</span>
          <el-select v-model="model" placeholder="请选择活动区域">
            <el-option label="springBoot项目部署" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </span>
      </div>
      <div>
        <el-row :gutter="10">
          <el-col :span="6">
            <el-row :gutter="10">
              <el-col :span="20">
                <el-card>
                  <div slot="header" class="clearfix">
                    <label style="line-height:20px">clone</label>
                  </div>
                  <div>代码加载</div>
                </el-card>
              </el-col>
              <el-col :span="4" class="arrow">
                <svg-icon icon-class="rarrow"></svg-icon>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-row :gutter="10">
              <el-col :span="20">
                <el-card>
                  <div slot="header" class="clearfix">
                    <label>build-mvn-package</label>
                    <el-button
                      size="mini"
                      style="float: right; padding: 3px 0"
                      class="el-icon-more"
                    ></el-button>
                  </div>
                  <div>通过mvn打包</div>
                </el-card>
              </el-col>
              <el-col :span="4" class="arrow">
                <svg-icon icon-class="rarrow"></svg-icon>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-row :gutter="10">
              <el-col :span="20">
                <el-card>
                  <div slot="header" class="clearfix">
                    <label>build-image</label>
                    <el-button
                      size="mini"
                      style="float: right; padding: 3px 0"
                      class="el-icon-more"
                    ></el-button>
                  </div>
                  <div>将jar包打成docker镜像</div>
                </el-card>
              </el-col>
              <el-col :span="4" class="arrow">
                <svg-icon icon-class="rarrow"></svg-icon>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-row :gutter="10">
              <el-col :span="20">
                <el-card>
                  <div slot="header" class="clearfix">
                    <label>deploy-app</label>
                    <el-button
                      size="mini"
                      style="float: right; padding: 3px 0"
                      class="el-icon-more"
                    ></el-button>
                  </div>
                  <div>将docker镜像部署成应用</div>
                </el-card>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
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
  name: "assemblyLineEdit",
  data() {
    return {
      ruleForm: {
        gitAddress: "http://",
        Branch: "dev",
        account: "222",
        password: "222"
      },
      model: "springBoot项目部署",
      rules: {
        gitAddress: [
          { required: true, message: "请输入git地址", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        Branch: [{ required: true, message: "请输入分支", trigger: "change" }],
        account: [{ required: true, message: "请输入账号", trigger: "change" }],
        password: [{ required: true, message: "请输入密码", trigger: "change" }]
      }
    };
  },
  methods:{
    back(){
      this.$router.back(-1)
    }
  }
};
</script>

<style lang="scss" scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.box-card {
  margin: 15px 0;
}
.arrow {
  text-align: center;
  line-height: 134px;
  font-size: 46px;
}
.btn {
  text-align: center;
}
</style>