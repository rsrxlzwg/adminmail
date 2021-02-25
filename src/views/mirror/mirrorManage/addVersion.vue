<template>
  <!-- 添加版本 -->
  <div class="add-version">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-steps
          direction="vertical"
          :active="stepActive"
             style="height: 150px;"
        >
          <el-step title="添加版本方式"  description="添加版本方式"/>
          <el-step title="设置" description="版本设置"/>
        </el-steps>
      </el-col>
      <el-col :span="20">
        <div class="mirror-content">
          <p class="title">{{ title }}</p>
          <!-- 添加版本方式 -->
          <div
            class="type-content"
            :class="{'display':title!=='添加版本方式'}"
          >
            <el-row
              :gutter="20"
              style="height:20px"
            >
              <el-col :span="20">
                <el-radio
                  v-model="radio"
                  label="1"
                >
                  <div class="radio-box">
                    <i class="el-icon-s-operation iconstyle" />
                    <div class="radio-title">
                      <p>镜像包</p>
                      <p class="subtitle">直接推送镜像包推送镜像。</p>
                    </div>
                  </div>
                </el-radio>
              </el-col>
            </el-row>
            <el-divider />
            <el-row
              :gutter="20"
              style="height:20px"
            >
              <el-col :span="20">
                <el-radio
                  v-model="radio"
                  label="2"
                >
                  <div class="radio-box">
                    <i class="el-icon-data-line iconstyle" />
                    <div class="radio-title">
                      <p>远程镜像</p>
                      <p class="subtitle">支持从其他镜像仓库获取镜像。</p>
                    </div>
                  </div>
                </el-radio>
              </el-col>
            </el-row>
            <el-divider />
            <el-row
              :gutter="20"
              style="height:20px"
            >
              <el-col :span="20">
                <el-radio
                  v-model="radio"
                  label="3"
                >
                  <div class="radio-box">
                    <i class="el-icon-receiving iconstyle" />
                    <div class="radio-title">
                      <p>推送镜像</p>
                      <p class="subtitle">使用远程构建镜像命令来触发镜像构建，可以与第三方 CI/CD 工具配合使用。</p>
                    </div>
                  </div>
                </el-radio>
              </el-col>
            </el-row>
            <el-divider />
          </div>
          <!-- 设置 -->
          <div
            class="setting-content"
            :class="{'display':title!=='设置'}"
          >
            <!-- 镜像包创建方式---设置 -->
            <el-form
              :class="{'display':radio !== '1'}"
              :model="form"
              label-width="140px"
              label-position="left"
            >
              <el-form-item label="上传镜像包">
                <el-radio
                  v-model="uploadRadio"
                  label="1"
                >上传文件</el-radio>
                <el-radio
                  v-model="uploadRadio"
                  label="2"
                >粘贴url</el-radio>
                <!-- 上传 -->
                <el-upload
                  v-if="uploadRadio === '1'"
                  class="upload-demo"
                  action=""
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="1"
                  :on-exceed="handleExceed"
                  :file-list="fileList"
                >
                  <el-button
                    size="small"
                    type="primary"
                  >点击上传</el-button>
                  <div
                    slot="tip"
                    class="el-upload__tip"
                  >支持docker save 得到的.tar包 <el-link type="primary">下载示例</el-link>
                  </div>
                </el-upload>
                <!-- 粘贴url -->
                <div
                  v-if="uploadRadio ==='2'"
                  class="url"
                >
                  <p>镜像包url</p>
                  <el-input placeholder="例：xxxx.tar" />
                </div>
              </el-form-item>
              <el-form-item label="镜像版本">
                <el-input v-model="form.version" />
              </el-form-item>
            </el-form>
            <!-- 远程镜像创建方式---设置 -->
            <el-form
              :class="{'display':radio !== '2'}"
              :model="form"
              label-width="140px"
              label-position="left"
            >
              <el-form-item label="镜像">
                <el-input
                  v-model="form.mirror"
                  style="width:50%"
                />
              </el-form-item>
              <el-form-item label="版本号">
                <el-select
                  v-model="form.version"
                  placeholder="请选择版本号"
                  style="width:50%"
                >
                  <el-option
                    label="1"
                    value="1"
                  />
                  <el-option
                    label="2"
                    value="2"
                  />
                </el-select>
              </el-form-item>
            </el-form>
            <!-- 推送镜像创建方式---设置 -->
            <div :class="{'display':radio !== '3'}">
              <!-- <P>1.请使用服务账号Token或用户名密码登录到镜像仓库</P> -->
              <ul
                style="overflow:auto"
                class="pushUlStyle"
              >
                <li>1.请使用服务账号Token或用户名密码登录到镜像仓库</li>
                <li>docker login 10.0.15.161
                  <i
                    slot="suffix"
                    class="el-icon-document-copy"
                    @click=""
                  />
                </li>
                <li>2.修改镜像版本名称</li>
                <li>docker tag &lt;local-image&gt; 10.0.15.161/k8s/image-001:&lt;tag&gt;
                  <i
                    slot="suffix"
                    class="el-icon-document-copy"
                    @click=""
                  />
                </li>
                <li>3.推送镜像到镜像仓库</li>
                <li>docker push 10.0.15.161/k8s/image-001:&lt;tag&gt;
                  <i
                    slot="suffix"
                    class="el-icon-document-copy"
                    @click=""
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-divider />
    <!-- 底部操作按钮 -->
    <el-row :gutter="20">
      <el-col :span="6">
        <el-button
          type="info"
          plain
          @click="cancel"
        >取消</el-button>
      </el-col>
      <el-col
        :span="4"
        :offset="14"
      >
        <el-button
          type="info"
          plain
          :disabled="backDisabled"
          @click="backStep"
        >返回</el-button>
        <el-button
          type="primary"
          @click="nextStep"
        >{{ title ==="设置" ? "完成" : "继续" }}</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'AddVersion',
  data() {
    return {
      title: '添加版本方式',
      backDisabled: true,
      radio: '',
      uploadRadio: '1',
      fileList: [],
      stepActive: 1,
      form: {
        mirror: '',
        version: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    backStep() {
      if (this.title === '添加版本方式' || this.title === '设置') {
        this.title = '添加版本方式'
        this.stepActive = 1
      }
      if (this.title === '添加版本方式') {
        this.backDisabled = true
      } else {
        this.backDisabled = false
      }
    },
    nextStep() {
      if (!this.radio) {
        return
      } else if (this.title === '设置') {
        this.$router.replace('/mirror/mirrorManage')
      } else if (this.title === '添加版本方式' || this.title === '设置') {
        this.title = '设置'
        this.stepActive = 2
      }
      if (this.title === '添加版本方式') {
        this.backDisabled = true
      } else {
        this.backDisabled = false
      }
    },
    cancel() {
      this.$router.replace('/mirror/mirrorManage')
    },
    // 上传的相关操作
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      )
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>

<style lang="scss" scoped>
.mirror-content {
  margin: 0;
  .title {
    font-size: 20px;
    margin-top: 0px;
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
}

.display {
  display: none;
}
</style>
