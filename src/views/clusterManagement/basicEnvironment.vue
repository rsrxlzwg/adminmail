<template>
  <div>
    <el-card>
      <div class="flex">
        <svg-icon class-name="hostImg" icon-class="hostImg" />            
        <div class="flex-1 m-l-15 flex-column-center">
          <div>
            <span class="host-name m-r-10">主机1</span>
            <el-tag  
              size="mini"       
              type="warning"
              effect="dark">
              host集群
            </el-tag>
          </div>
          <span class="host-desc">集群描述</span>
        </div>
      </div>
      
    </el-card>

  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
@import "../../styles/common.scss";

.hostImg{
  width: 50px;
  height: 50px;
}
.host-name{
  // display: block;
}
.host-desc{
  
}
</style>