<template>
  <div class="main">

    <fieldset>
      <legend>{{fltitle}}</legend>
      <transition name="el-fade-in">
        <!-- <el-collapse-transition> -->
        <div
          v-show="show"
          class="el-zoom-in-top"
        >
          <slot></slot>
        </div>
        <!-- </el-collapse-transition> -->
      </transition>
      <div
        class="hander"
        v-if="showhand"
      >
        <span @click="show=!show">
          <el-row
            type="flex"
            justify='center'
            align='middle'
          >
            <el-col :span="2">
              <i :class="[show?'el-icon-arrow-up':'el-icon-arrow-down']"></i>
            </el-col>
          </el-row>
        </span>
      </div>
    </fieldset>

  </div>
</template>

<script type="text/ecmascript-6">


export default {
  props: {
    fltitle: {
      type: String,
      default: '条件搜索'
    },
    showhand: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {

  },
  mounted() {
    if (!this.showhand) {
      this.show = true
    }
  },
  created() {

  },
  components: {

  }
}
</script>

<style scoped lang="scss">
span {
  border-radius: 5px;
  background-color: #eef1f6;
  display: block;
  padding: 2px 0;
  cursor: pointer;
  width: 20%;
}
fieldset {
  border-radius: 3px;
  padding: 20px 10px;
  border-color: #f2f2f2;
  border-width: 1px;
  margin-bottom: 20px;
}
.hander {
  display: flex;
  justify-content: center;
}
.el-zoom-in-top {
  padding: 10px 0;
}
</style>
