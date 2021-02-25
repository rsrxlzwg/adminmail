<template>
  <div>
    <div class="overflow">
      <el-form
        ref="form"
        :model="formData"
        label-width="100px"
        label-position="left"
      >
        <el-form-item label="所属分类编码">
          <el-input
            v-model="formData.cateCode"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="字典编码">
          <el-input
            v-model="formData.dicCode"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="字典名称">
          <el-input
            v-model="formData.dicName"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="字典描述">
          <el-input
            v-model="formData.dicDesc"
            size="mini"
            type="textarea"
          />
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
import rendertable from '@/views/projectManagement/components/table'
export default {
  components: {
    rendertable
  },
  props:{
    formData:{
      type:Object,
      default: () => {
        return {}
      }
    }
  },

  data() {
    return {
      activeName: 'first',
    }
  }
}
</script>

<style scoped lang="scss">
.el-form-item {
  margin-bottom: 0;
}
.overflow {
  overflow: auto;
}
</style>
