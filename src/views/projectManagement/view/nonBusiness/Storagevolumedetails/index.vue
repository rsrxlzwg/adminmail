<template>
  <div>
    <el-row>
      <ul>
        <li
          v-for="(item,key) in lilist"
          @click="nowclick=item.id"
          :class="[nowclick == item.id?'addstyle':'']"
          :key="key"
        >
          <span style="fontSize:14px;color:#fff">
            {{item.name}}
          </span>
        </li>
      </ul>
    </el-row>
    <el-row>
      <el-card>
        <span
          style="fontSize:14px"
          slot="header"
        >存储卷</span>
        <el-row>
          <el-alert
            :closable='false'
            title="采集存储卷设备数据为挂在采集不到"
            type="warning"
            show-icon
          >
          </el-alert>
        </el-row>
        <el-row
          type="flex"
          align="middle"
        >
          <el-col :span="3">
            <svg-icon
              class-name="icon-common"
              icon-class='Resourcebackground'
            ></svg-icon>
          </el-col>
          <el-col :span="3">
            <el-row>
              <el-col :span="24">
                <span style="fontSize:30px;fontWeight:600">4.07GB</span>
              </el-col>
              <el-col :span="24">
                <span style="fontSize:14px;fontWeight:600;color:#ccc">剩余存储</span>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="3">
            <el-row>
              <el-col :span="24">
                <span style="fontSize:30px;fontWeight:600">19.56GB</span>
              </el-col>
              <el-col :span="24">
                <span style="fontSize:14px;fontWeight:600;color:#ccc">存储器容量</span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <echartsmodule
            :options=item
            :conternheight=100
            :showX='false'
          />
        </el-row>
      </el-card>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import echartsmodule from '@/views/projectManagement/view/menu/projectOverview/applicationResourceQuota/component/echartsmodule'
export default {
  data() {
    return {
      nowclick: '1',
      item: {
        bgccolor: '#2A354B',
        title: 'INCODE使用率(%)',
        bottom: '1',
      },
      lilist: [
        {
          name: '资源状态',
          id: '1'
        },
        {
          name: '元数据',
          id: '2'
        },
        {
          name: '事件',
          id: '3'
        },
        {
          name: '快照信息',
          id: '4'
        }
      ]
    }
  },
  components: {
    echartsmodule
  }
}
</script>

<style scoped lang="scss">
ul li {
  display: inline-block;
}
ul {
  width: 100%;
  background-color: #242e42;
  border-radius: 5px;
  padding: 3px 5px;
  li {
    padding: 6px 16px;
    border-radius: 5px;
    cursor: pointer;
  }
}
.addstyle {
  background-color: #55bc8a;
}
.el-row {
  margin-bottom: 14px;
}
.icon-common {
  width: 100px !important;
  height: 100px !important;
}
</style>
