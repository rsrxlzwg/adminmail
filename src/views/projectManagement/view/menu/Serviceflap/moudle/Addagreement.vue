<template>
  <div>
    <el-form
      ref="addform"
      :model="formData"
      label-width="130px"
      label-position="left"
    >
      <el-form-item
        label="挡板名称">
        <el-input
          v-model="formData.baffleName"
          size="mini"
        />
      </el-form-item>
      <el-form-item
      style="margin-bottm:10px"
        label="报文内容">
        <el-input
          type="textarea"
          v-model="formData.bodyInfo"
          size="mini"
        />
      </el-form-item>
      <el-form-item
       label="挡板描述">
        <el-input
          type="textarea"
          v-model="formData.baffleDes"
          size="mini"
        />
      </el-form-item>
    </el-form>

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

.overflow {
  overflow: auto;
  height: 400px;
}
</style>
