<template>
  <div>
    <el-row>
      <el-col>
        <el-card>
          <div class="flex-inline-between center">
            <span>
              <svg-icon
                class-name="hostImg"
                icon-class="hostImg"
              />
              <span class="data-name">local</span>
            </span>
            <!-- <el-button
              size="mini"
              @click="visible=true"
            >查看配置文件</el-button> -->
          </div>
          <div class="m-t-60">
            <h3>详情</h3>
            <ul class="detain-info">
              <li>
                <span>存储卷名字</span>
                <span>nfs-pv</span>
              </li>
              <li>
                <span>容量大小</span>
                <span>1G</span>
              </li>
              <li>
                <span>卷类型</span>
                <span>filesystem</span>
              </li>
              <li>
                <span>访问模式</span>
                <span>独享</span>
              </li>
              <li>
                <span>回收策略</span>
                <span>Delete</span>
              </li>
              <li>
                <span>状态绑定</span>
                <span>成功</span>
              </li>
              <li>
                <span>绑定卷名字</span>
                <span>default</span>
              </li>
              <li>
                <span>存储服务器</span>
                <span>10.6.188.1</span>
              </li>
              <li>
                <span>存储路径</span>
                <span>/var/data</span>
              </li>

              <li>
                <span>创建时间</span>
                <span>2020-10-09</span>
              </li>
            </ul>
          </div>

        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {

    }
  },
  components: {

  }
}
</script>

<style scoped lang="scss">
.hostImg {
  width: 30px;
  height: 30px;
}
.data-name {
  color: #595f69;
  margin-left: 10px;
  font-weight: bold;
}
.detain-info {
  color: rgb(95, 112, 138);
  li {
    margin-bottom: 20px;
    span {
      display: inline-block;
      &:nth-child(1) {
        width: 69%;
      }
    }
  }
}
</style>
