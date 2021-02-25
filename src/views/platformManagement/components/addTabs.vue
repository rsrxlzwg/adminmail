<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="用户管理">
        <addBtn></addBtn>
      </el-tab-pane>
      <el-tab-pane label="配置管理">
          <addRule></addRule>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import addBtn from './addBtn'
import addRule from './addRule'

  export default {
    components:{
      addBtn,
      addRule
    },
    props:{
     
    }
  }
</script>

<style lang="scss" scoped>

</style>