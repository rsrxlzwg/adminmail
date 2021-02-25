<template>
  <div>
    <el-form
      ref="form"
      :model="formData"
      label-width="120px"
      label-position="left"
    >
      <el-form-item label="部署模式">
        <el-radio v-model="formData.deployModel" label="1">边车式</el-radio>
        <el-radio v-model="formData.deployModel" label="2">集中式</el-radio>
      </el-form-item>
      <el-form-item label="所属应用" v-show="formData.deployModel == 1">
        <el-select
          v-model="formData.appId"
          size="mini"
          style="width: 100%"
          placeholder=""
          @change="getGroupList"
        >
          <el-option
            v-for="item in applist"
            :label="item.appName"
            :value="item.id"
            :key="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="SDK组">
        <el-select
          v-model="formData.groupId"
          size="mini"
          style="width: 100%"
          placeholder=""
        >
          <el-option
            v-for="item in grouplist"
            :label="item.groupName"
            :value="item.id"
            :key="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="SDK编码">
        <el-input v-model="formData.terminalCode" size="mini" />
      </el-form-item>
      <el-form-item label="SDK端地址">
        <el-input v-model="formData.terminalHost" size="mini" />
      </el-form-item>
      <el-form-item label="SDK管理端口">
        <el-input v-model="formData.terminalPort" size="mini" />
      </el-form-item>
      <el-form-item label="Agent终端端口">
        <el-input v-model="formData.agentPort" size="mini" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
import rendertable from "@/views/projectManagement/components/table";
import { getApp, getGroup } from "@/api/serviceManagement/appManage/sdkgroup";
export default {
  components: {
    rendertable,
  },
  props: {
    formData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    grouplist: {
      type: Array,
      default: () => {
        return {};
      },
    },
  },

  data() {
    return {
      activeName: "first",
      applist: [],
    };
  },
  mounted() {
    getApp().then((res) => {
      if (res.code === 200) {
        this.$nextTick(() => {
          this.applist = res.data;
        });
      } else {
        this.$message({
          type: "error",
          message: res.message,
        });
      }
    });


  },
  methods: {
    getGroupList() {
      this.$emit("getGroupList");
    },
  },
};
</script>

<style scoped lang="scss">
.el-form-item {
  margin-bottom: 0;
}
.overflow {
  overflow: auto;
  height: 400px;
}
</style>
