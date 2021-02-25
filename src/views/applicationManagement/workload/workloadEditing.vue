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
                      label="镜像"
                      prop="account"
                    >
                      <el-input
                        v-model="ruleForm.account"
                        placeholder="请填写/选择镜像"
                      />
                    </el-form-item>
                    <el-form-item
                      label="命名空间"
                      prop="password"
                    >
                      <el-input v-model="ruleForm.password" />
                    </el-form-item>
                  </el-form>
                </div>
              </el-col>
              <el-col :span="13">
                <el-card>
                  <div
                    slot="header"
                    class="clearfix"
                  >
                    <span>类型</span>
                  </div>
                  <el-row>
                    <el-col>
                      <el-radio
                        v-model="radio"
                        label="1"
                      >Deployment</el-radio>
                      <el-row>
                        <el-col :offset="2">
                          <span style="font-size:10px;color:#ccc">部署n个POD</span>
                        </el-col>
                      </el-row>
                      <el-row
                        type="flex"
                        align="middle"
                        justify="end"
                      >
                        <el-col :span="3">
                          <span style="font-size:10px">
                            部署POD数
                          </span>
                        </el-col>
                        <el-col :span="19">
                          <el-slider
                            v-model="value"
                            show-input
                            input-size="mini"
                          />
                        </el-col>
                      </el-row>
                    </el-col>
                    <el-col>
                      <el-row>
                        <el-col :span="24">
                          <el-radio
                            v-model="radio"
                            label="1"
                          >DaemonSet</el-radio>
                        </el-col>
                        <el-col
                          :span="12"
                          :offset="2"
                        >
                          <span style="font-size:10px;color:#ccc">
                            有状态部署n个POD
                          </span>
                        </el-col>
                      </el-row>
                    </el-col>
                    <el-col>
                      <el-row>
                        <el-col :span="24">
                          <el-radio
                            v-model="radio"
                            label="1"
                          >StatefulSet</el-radio>
                        </el-col>
                        <el-col
                          :span="12"
                          :offset="2"
                        >
                          <span style="font-size:10px;color:#ccc">
                            有状态部署n个POD
                          </span>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-card>
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
            </div>
            <div
              class="portMapping"
              style="aline-item:center;color:#387BFF"
            >
              <i class="el-icon-plus" />
              <span>添加规则</span>
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
        <span style="line-height: 40px;">命令</span>
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
                label="命令"
                prop="gitAddress"
              >
                <el-input
                  v-model="ruleForm.gitAddress"
                  placeholder="请填写命令"
                />
              </el-form-item>
              <el-form-item
                label="工作目录"
                prop="Branch"
              >
                <el-input
                  v-model="ruleForm.Branch"
                  placeholder="请填写工作目录"
                />
              </el-form-item>
              <el-form-item
                label="文件系统组"
                prop="account"
              >
                <el-input
                  v-model="ruleForm.account"
                  placeholder="文件系统组"
                />
              </el-form-item>
              <el-form-item
                label="控制台"
                prop="password"
                placeholder="交互"
              >
                <el-input v-model="ruleForm.password" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item
                label="参数"
                prop="gitAddress"
              >
                <el-input
                  v-model="ruleForm.gitAddress"
                  placeholder="请填写可执行参数"
                />
              </el-form-item>
              <el-form-item
                label="用户ID"
                prop="Branch"
              >
                <el-input
                  v-model="ruleForm.Branch"
                  placeholder="请填写用户id"
                />
              </el-form-item>
              <el-form-item
                label="停止超时"
                prop="account"
              >
                <el-input
                  v-model="ruleForm.account"
                  placeholder="请填写时间"
                />
              </el-form-item>

            </el-col>
          </el-row>
        </el-form>
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
