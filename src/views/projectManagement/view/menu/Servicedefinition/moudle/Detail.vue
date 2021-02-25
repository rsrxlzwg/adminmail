
<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="审批选项">
        <el-radio v-model="form.approvalChoices" label="1">通过</el-radio>
        <el-radio v-model="form.approvalChoices" label="2">不通过</el-radio>
      </el-form-item>
  
  <el-form-item label="审批意见" >
    <el-input type="textarea" v-model="form.approvalOptions"></el-input>
  </el-form-item>
</el-form>
  
</template>

<script>
  export default {
    props: {
      form: {
      type: Object,
      default: () => {
        return {};
      },
    }
  },
    data() {
      return {
        
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>