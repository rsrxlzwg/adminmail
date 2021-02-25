<template>
  <div class="alarm-container">
    <el-form :inline="true" :model="formInline" class="form-inline">
      <el-form-item>
        <el-button type="primary">添加分组</el-button>
        <el-button type="primary">添加规则</el-button>
      </el-form-item>
      <el-form-item label="集群">
        <el-select v-model="formInline.region" placeholder="项目 default">
          <el-option label="81-test" value="81-test"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        region: "81-test"
      }
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.alarm-container {
  padding: 10px 15px;
}
.form-inline {
  display: flex;
  justify-content: space-between;
}
</style>