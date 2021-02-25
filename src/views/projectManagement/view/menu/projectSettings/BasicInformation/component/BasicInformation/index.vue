<template>
  <div>
    <el-card>
      <div
        slot="header"
        class="clearfix"
      >
        <span style="fontSize:14px">资源</span>

      </div>
      <el-row>
        <renderdate
          :tableHeader='tableHeader'
          :tableData='tableData'
          :showpagination='false'
        />
      </el-row>

    </el-card>
    <el-card>
      <div
        slot="header"
        class="clearfix"
      >
        <span style="fontSize:14px">配额用量</span>

      </div>
      <el-row>
        <el-row>
          <el-col :span="12">
            <crchart
              :conternheight='100'
              :options="{value:[20],title:'CPU'}"
            />
          </el-col>
          <el-col :span="12">
            <crchart
              :conternheight='100'
              :options="{value:[10],title:'内存'}"
            />
          </el-col>
        </el-row>
      </el-row>

    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
import crchart from '../echartsmodule.vue'
import renderdate from '@/views/projectManagement/components/table'
export default {
  data() {
    return {
      tableHeader: [
        {
          prop: 'name',
          label: '名称'
        },
        {
          prop: 'rpro',
          label: '值'
        }
      ],
      tableData: [
        {
          name: 'app-wds-dwadaw=2515',
          rpro: '80'
        },
        {
          name: 'app-wds-dwadaw=2515',
          rpro: '80'
        }, {
          name: 'app-wds-dwadaw=2515',
          rpro: '80'
        }

      ],
    }
  },
  components: {
    renderdate,
    crchart
  }
}
</script>

<style scoped lang="scss">
.lincol {
  border-bottom: 1px solid #f1f3f5;
  padding: 14px 0;
}
.el-card {
  margin-bottom: 20px;
}
</style>
