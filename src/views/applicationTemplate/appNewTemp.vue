<template>
  <div class="cluster-container">
    <el-row class="m-t-20" :gutter="30">
      <el-col :span="4">
        <el-card class="flex-column box-one">
          <div style="height: 200px;">
            <el-steps direction="vertical" :active="stepActive">
              <el-step title="编辑设置" description="应用信息"></el-step>
              <el-step title="变量文件设置" description="变量文件"></el-step>
              <!-- <el-step title="应用配置"></el-step> -->
            </el-steps>
          </div>
        </el-card>
      </el-col>
      <el-col :span="20">
        <div class="mirror-content">
          <el-card>
            <p class="font-32 m-t-10 m-b-20">{{ title }}</p>
            <el-card shadow="never">
              <el-form :model="editForm">
                <div :class="{'display':title!=='基本信息'}">
                  <el-form-item label="应用模板" :label-width="formLabelWidth">
                    <el-col :span="24">
                      <div class="font-14 cont">{{editForm.productName}}</div>
                    </el-col>
                  </el-form-item>
                  <el-divider />
                  <el-form-item label="版本" :label-width="formLabelWidth">
                    <el-select v-model="editForm.versionNum" style="display:inline" placeholder>
                      <el-option  v-for="item in verList" :label="item" :value="item" :key="item"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-divider />
                  <el-form-item label="项目" :label-width="formLabelWidth">
                    <el-select v-model="editForm.name" placeholder style="display:inline">
                      <el-option label="defaut" value="defaut"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-divider />
                  <el-form-item label="应用名" :label-width="formLabelWidth">
                    <el-input
                      v-model="editForm.productName"
                      placeholder="请输入应用名"
                    />
                  </el-form-item>
                  <el-divider />
                </div>

                <div :class="{'display':title!=='变量文件'}">
                    <p class="font-42 m-b-20">
                        编辑变量文件以覆盖 values.yaml 内的参数（仅本次部署生效）：</p>
                    <el-input type="textarea" :rows="20" v-model="editForm.values"></el-input>
                </div>
                <!-- <div :class="{'display':title!=='应用配置'}">
                  <el-form-item label="数据持久化" :label-width="formLabelWidth">
                    <el-slider show-tooltip v-model="marksValue" show-input input-size="mini" />
                  </el-form-item>
                  <el-form-item label="密码" :label-width="formLabelWidth">
                      <el-input
                      v-model="editForm.productName" 
                      show-password
                      placeholder="请输入密码"
                    />
                  </el-form-item>
                </div> -->
              </el-form>
            </el-card>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <!-- 底部操作按钮 -->
    <el-row :gutter="20" class="m-t-20">
      <el-col :span="6">
        <el-button type="info" plain @click="cancel">取消</el-button>
      </el-col>
      <el-col :span="4" :offset="14">
        <el-button type="info" plain @click="backStep" :disabled="backDisabled">返回</el-button>
        <el-button type="primary" @click="nextStep">{{ title ==="变量文件" ? "完成" : "继续" }}</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "基本信息",
      stepActive: 1,
      backDisabled: true,
      formLabelWidth: '120px',
      reverse: true,
      marksValue: 0,
      marks: {
        0: '0',
        20: '20',
        40: '40',
        60: '60',
        80: '80',
        100: '100',
      },
      editForm: {
        disc: "描述",
        productName: "标题",
      },
      verList:[],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.editForm = this.$route.query.rows;
      let v = "annotations: {}";
      this.editForm.values = v;
      this.editForm.name = "defaut";
      this.verList = this.editForm.versionNum.split(',');
    },
    backStep() {
    //   if (this.title === '应用配置') {
    //     this.title = '变量文件';
    //     this.stepActive = 2;
    //   }else 
      if (this.title === '变量文件') {
        this.title = '基本信息';
        this.stepActive = 1;
      }
      if (this.title === '基本信息') {
        this.backDisabled = true
      } else {
        this.backDisabled = false
      }
    },
    nextStep() {
      if (this.title === "基本信息") {
        this.title = '变量文件';
        this.stepActive = 2;
      }
    //    else if (this.title === "变量文件") {
    //     this.title = '应用配置';
    //     this.stepActive = 3;
    //   }
      if (this.title === '基本信息') {
        this.backDisabled = true
      } else {
        this.backDisabled = false
      }
    },
    cancel() {
      this.$router.replace('/applicationTemplate/applicationTemplate')
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/common.scss";
.mirror-content {
  margin: 0;
  .title {
    font-size: 20px;
    margin-top: 0px;
  }
}
.display {
  display: none;
}
</style>