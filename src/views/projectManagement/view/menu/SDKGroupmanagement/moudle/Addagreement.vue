<template>
  <div>
    <el-form
      ref="addForm"
      :model="formData"
      label-width="130px"
      label-position="left"
    >
      <el-form-item label="部署模式">
        <el-radio v-model="formData.deployModel" label="1">边车式</el-radio>
        <el-radio v-model="formData.deployModel" label="2">集中式</el-radio>
      </el-form-item>
      <el-form-item label="SDK组名称">
        <el-input v-model="formData.groupName" size="mini" />
      </el-form-item>
      <template v-if="formData.deployModel === '1'">
        <el-form-item label="所属应用">
          <el-select
            v-model="formData.appId"
            size="mini"
            style="width: 100%"
            placeholder=""
          >
            <el-option
              v-for="item in applist"
              :label="item.appName"
              :value="item.id"
              :key="item.id"
            />
          </el-select>
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item label="负载模式">
          <el-radio v-model="formData.loadModel" label="1">客户端</el-radio>
          <el-radio v-model="formData.loadModel" label="2">服务端负载</el-radio>
        </el-form-item>
      </template>
      <template
        v-if="formData.loadModel === '2' && formData.deployModel === '2'"
      >
        <el-form-item label="负载地址">
          <el-input v-model="formData.loadAddress" size="mini" />
        </el-form-item>
      </template>
      <el-form-item label="组描述">
        <el-input type="textarea" v-model="formData.groupDesc" size="mini" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
import rendertable from "@/views/projectManagement/components/table";
import { getApp } from "@/api/serviceManagement/appManage/sdkgroup";
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
