<template>
  <div>
    <el-row
      v-for="(item,key) in listmap"
      class="rowline"
      :key="key"
    >
      <el-col :span="4">
        <span style="fontSize:14px">{{item.name}}</span>
        <i :class="item.icon"></i>
      </el-col>
      <el-col :span="20">
        <span v-if="item.id == 1">
          <el-input size="mini"></el-input>
        </span>
        <span v-if="item.id == 2">
          <i
            style="color:#409EFF;fontSize:20px"
            class="el-icon-circle-plus"
          ></i>
          <span style="fontSize:14px">添加</span>
        </span>
        <span v-if="item.id == 3">
          <el-row style="lineHeight:40px">
            <el-col :span="24">
              <el-radio
                v-model="radio"
                label="1"
              >存储源</el-radio>
              <el-radio
                v-model="radio"
                label="2"
              >存储类型</el-radio>
            </el-col>
            <el-col :span="24">
              <el-card
                style="backgroundColor:#F5F7FA"
                shadow='never'
              >
                <el-row>
                  <cl-col :span='24'>
                    <span>选择器（必填）</span>
                  </cl-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-radio
                      v-model="radio"
                      label="1"
                    >存储源</el-radio>
                    <el-radio
                      v-model="radio"
                      label="2"
                    >存储类型</el-radio>
                  </el-col>
                  <el-col :span="24">
                    <el-button
                      style="display:Block"
                      size="mini"
                    >请选择</el-button>
                    <span style="fontSize:14px;color:#ccc">清联系平台管理员</span>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </span>
        <span v-if="item.id == 4">
          <el-input
            v-model="addnumber"
            size="mini"
            :disabled='true'
          >
            <template slot="append">
              <el-row>
                <el-col :span="24">
                  <i
                    @click="addiconclick"
                    class="el-icon-arrow-up"
                  ></i>
                </el-col>
                <el-col :span="24">
                  <i
                    @click="reduceiconclick"
                    class="el-icon-arrow-down"
                  ></i>
                </el-col>
              </el-row>
            </template>
          </el-input>
        </span>
        <span v-if="item.id == 5">
          <el-switch
            v-model="value"
            active-text="启用节点独享"
          >
          </el-switch>
        </span>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      value: '1',
      radio: '1',
      addnumber: '1',
      listmap: [
        {
          name: '卷名称',
          icon: 'el-icon-warning-outline',
          id: 1
        },
        {
          name: '标签',
          icon: 'el-icon-warning-outline',
          id: 2

        },
        {
          name: '存储整理',
          icon: 'el-icon-warning-outline',
          id: 3
        },
        {
          name: '容量',
          icon: 'el-icon-warning-outline',
          id: 4
        },
        {
          name: '节点独享',
          icon: 'el-icon-warning-outline',
          id: 5
        }
      ]
    }
  },
  methods: {
    addiconclick() {
      this.addnumber++
    },
    reduceiconclick() {
      if (this.addnumber > 0) {
        this.addnumber--
      }
    }
  },
  components: {

  }
}
</script>

<style scoped lang="scss">
.rowline {
  line-height: 80px;
  border-bottom: 1px solid #ebeef5;
}
</style>