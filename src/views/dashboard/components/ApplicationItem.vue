<template>
  <div class="application-items flex-inline">
    <div class="flex-column">
      <img :src="appData.img" alt="" style="width:60px">
      <p class="text-center">{{appData.name}}</p>
    </div>
    <div class="text-center flex-column">
      <span class="font-32 txt-blue bold">{{appData.narmal.number}}</span>
      <span class="m-tb-10">正常</span>
      <span class="txt-grey">{{appData.narmal.percentage}}</span>
    </div>
    <div class="text-center flex-column">
      <span class="font-32 txt-red bold">{{appData.abnormals.number}}</span>
      <span class="m-tb-10">异常</span>
      <span class="txt-grey">{{appData.abnormals.percentage}}</span>
    </div>
  </div>
</template>

<script>
  export default {
      props: {
        appData:{
          type: Object,
          // required: true
        }
      }
  }
</script>

<style lang="scss" scoped>
@import '../../../styles/common.scss';
.application-items{
  width: 100%;

}
</style>