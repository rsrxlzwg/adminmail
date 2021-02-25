<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      console.log('approute',this.$route.path)
      return this.$route.path
    }
  },
  methods:{
    
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  background-color: #fff;
  height: calc(100vh - 100px);
  width: 100%;
  position: relative;
  margin-top: 2px;
  overflow: hidden;
  padding: 15px;
  overflow-y: scroll;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
