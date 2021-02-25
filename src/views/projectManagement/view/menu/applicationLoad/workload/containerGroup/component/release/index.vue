<template>
  <div>
    <el-row
      v-for="(item,key) in baselist"
      style="margin-bottom:5px"
      :key="key"
    >
      <el-card>
        <span
          style="fontSize:14px"
          slot="header"
        >
          {{item.name}}
        </span>
        <el-row class="innerstyle">
          <el-col :span="24">
            <p style="fontSize:14px; wordWrap:break-word;overflow: hidden">
              qwerqwewrqeqwerwqewqwqewqerwqewqewqerwqasdsadsaqwerqwewrqeqwerwqewqwqewqerwqewqewqerwqasdsadsaqwerqwewrqeqwerwqewqwqewqerwqewqewqerwqasdsadsaqwerqwewrqeqwerwqewqwqewqerwqewqewqerwqasdsadsaqwerqwewrqeqwerwqewqwqewqerwqewqewqerwqasdsadsa
            </p>
          </el-col>
        </el-row>
        <el-row gutter="20">
          <el-col
            v-for="(items,key) in item.list"
            :span="12"
            :key="key"
          >
            <el-row
              type="flex"
              align="middle"
            >
              <el-col :span="12">
                <span style="fontSize:14px">{{items.name}}</span>
              </el-col>
              <el-col :span="12">
                <el-input
                  size="mini"
                  :placeholder="'例:'+items.placehovder"
                ></el-input>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import renderdate from '@/views/projectManagement/components/table'
export default {
  data() {
    return {
      advancedsettings: true,
      baselist: [
        {
          name: '远程发布',
          list: [
            {
              name: '镜像全名',
              placehovder: 'qwerwqewqe_2020'
            },
            {
              name: '发布容器',
              placehovder: 'qwerwqewqe_2020'
            }
          ]
        }
      ]
    }
  },
  components: {
    renderdate
  },
  created() {

  },
}
</script>

<style scoped lang="scss">
.innerstyle {
  background-color: #f5f7fa;
  border: 1px solid #dfe2e8;
  padding: 8px;
  .el-col {
    background-color: #ffffff;
  }
}
.el-row {
  margin-bottom: 14px;
}
</style>
