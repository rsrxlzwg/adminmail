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
                      label="名称"
                      prop="gitAddress"
                    >
                      <el-input
                        v-model="ruleForm.gitAddress"
                        placeholder="请填写工作负载名称"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item
                      label="命名空间"
                      prop="Branch"
                    >
                      <el-input
                        v-model="ruleForm.Branch"
                        placeholder="请填写工作负载描述"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>

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
              <span>来源</span>

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
                  <el-col :offset="1">
                    <el-radio
                      v-model="radio"
                      label="1"
                    >使用存储类创建心得持久卷(PV)</el-radio>
                    <el-radio
                      v-model="radio"
                      label="2"
                    >使用现有持久卷(PV)</el-radio>
                  </el-col>
                </el-row>
                <el-row
                  :gutter="20"
                  type="flex"
                  align="bottom"
                >
                  <el-col
                    :span="11"
                    style="margin-top:30px"
                  >

                    <el-form-item
                      label="存储类"
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
                      label="容量"
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
        <span style="line-height: 40px;">PVC设置</span>
      </div>
      <div>
        <span style="margin-right:20px">访问模式</span>
        <el-radio
          v-model="radio"
          label="1"
        >单主机读写</el-radio>
        <el-radio
          v-model="radio"
          label="2"
        >多主机只读</el-radio>
        <el-radio
          v-model="radio"
          label="2"
        >多主机读写</el-radio>
      </div>
    </el-card>
    <div class="btnclass">
      <el-button>取消 </el-button>
      <el-button type="primary">创建 </el-button>
    </div>
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
    this.$route.meta.title = `PVC${this.$route.params.title}`
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
.btnclass {
  display: flex;
  justify-content: center;
}
</style>
