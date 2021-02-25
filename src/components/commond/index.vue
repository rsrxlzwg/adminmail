<template>
  <div ref="terminal" />
</template>

<script type="text/ecmascript-6">
import 'xterm/css/xterm.css'
import Exter from '@/utils/xterm'
export default {
  components: {

  },
  data() {
    return {
      exterobj: ''
    }
  },
  mounted() {
    /**
     * *       @params dom 需要托管得dom对象
            *  @params isattach 是否可与docker交互
            *  @params httpURI
            *  @params socketURI
       */
    this.exterobj = new Exter({
      dom: this.$refs[ 'terminal' ],
      isattach: false
    })
    this.exterobj.init()
  },
  destroyed() {
    this.exterobj.close()
  }
}
</script>

<style scoped lang="scss">
div {
  padding: 30px 0;
  height: 100%;
  width: 100%;
}
</style>
