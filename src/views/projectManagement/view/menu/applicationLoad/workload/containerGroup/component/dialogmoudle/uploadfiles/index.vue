<template>
  <div>
    <el-row
      v-for="(item,key) in maplist"
      type="flex"
      align="middle"
      style="lineHeight:60px;borderBottom:1px solid #E4E7ED;padding:10px 0"
      :key="key"
    >
      <el-col :span="4">
        <span>{{item.name}}</span>
      </el-col>
      <el-col :span="20">
        <span v-if="key == 0">
          <el-input
            style="width:60%"
            size="small"
          ></el-input>
        </span>
        <span v-if="key == 1">
          <el-upload
            class="upload-demo"
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false"
          >
            <el-button
              slot="trigger"
              size="small"
              type="primary"
            >选取文件</el-button>

          </el-upload>
        </span>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      maplist: [
        {
          name: '容器路径'
        },
        {
          name: '文件'
        }
      ]
    }
  },
  components: {

  }
}
</script>

<style scoped lang="scss">
</style>
