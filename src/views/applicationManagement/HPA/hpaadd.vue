<template>
  <div>

    <div>
      <el-row>
        <el-col>
          <el-card>
            <div
              slot="header"
              class="clearfix"
            >
              <span>基本信息</span>
            </div>
            <el-row :gutter="20">
              <el-col :span="11">
                <div>
                  <el-form
                    ref="ruleForm"
                    :model="ruleForm"
                    :rules="rules"
                    label-width="100px"
                    class="demo-ruleForm"
                  >
                    <el-form-item
                      label="名称"
                      prop="gitAddress"
                    >
                      <el-input
                        v-model="ruleForm.gitAddress"
                        placeholder="请填写工作负载名称"
                      />
                    </el-form-item>
                    <el-form-item
                      label="描述"
                      prop="Branch"
                    >
                      <el-input
                        v-model="ruleForm.Branch"
                        placeholder="请填写工作负载描述"
                      />
                    </el-form-item>
                    <el-form-item
                      label="命名空间"
                      prop="account"
                    >
                      <el-input
                        v-model="ruleForm.account"
                        placeholder="请填写/选择镜像"
                      />
                    </el-form-item>
                  </el-form>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        </el-card>
      </el-row>
      </el-card>
      </el-col>

      </el-row>
      <el-row>
        <el-col>
          <el-card class="box-card">
            <div
              slot="header"
              class="clearfix"
            >
              <span>端口映射</span>

              <div style="float: right; padding: 3px 0;font-size:10px;color:#F48383">
                <i class="el-icon-delete" />
                <span>删除规则</span>
              </div>
            </div>
            <div>
              <el-form
                ref="ruleForm"
                :model="ruleForm"
                :rules="rules"
                label-width="100px"
                class="demo-ruleForm"
              >
                <el-row :gutter="20">
                  <el-col :span="11">
                    <el-form-item
                      label="访问域名"
                      prop="gitAddress"
                    >
                      <el-input
                        v-model="ruleForm.gitAddress"
                        placeholder="请填写工作负载名称"
                      />
                    </el-form-item>
                    <el-form-item
                      label="访问路径"
                      prop="Branch"
                    >
                      <el-input
                        v-model="ruleForm.Branch"
                        placeholder="请填写工作负载描述"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item
                      label="服务"
                      prop="account"
                    >
                      <el-input
                        v-model="ruleForm.account"
                        placeholder="请填写/选择镜像"
                      />
                    </el-form-item>
                    <el-form-item
                      label="容器端口"
                      prop="password"
                    >
                      <el-input v-model="ruleForm.password" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span style="line-height: 40px;">SSL/TLS证书</span>
      </div>
      <div>
        <el-button type="primary">添加证书</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'AssemblyLineEdit',
  data() {
    return {
      radio: '',
      value: 0,
      ruleForm: {
        gitAddress: '',
        Branch: '',
        account: '',
        password: 'aa-active'
      },
      model: 'springBoot项目部署',
      rules: {
        gitAddress: [
          { required: true, message: '请输入git地址', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        Branch: [ { required: true, message: '请输入分支', trigger: 'change' } ],
        account: [ { required: true, message: '请输入账号', trigger: 'change' } ],
        password: [ { required: true, message: '请输入密码', trigger: 'change' } ]
      }
    }
  },
  beforeMount() {
    this.$route.meta.title = `HPA${this.$route.params.title}`
  }
}
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
.portMapping {
  display: flex;
  align-self: center;
  justify-content: center;
}
</style>
