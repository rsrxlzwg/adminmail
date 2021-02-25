<template>
  <div class="subject-items ">
    <img src="../../../assets/homePage/icon-application.png" alt="" style="width:30px">
    <div class="flex-column m-l-15">
      <span class="txt-grey">{{subData.name}}</span>
     <span class="bold">{{subData.num}}</span>
    </div>
  </div>
</template>

<script>
  export default {
     props: {
        subData:{
          type: Object,
          // required: true
        }
      }
  }
</script>

<style lang="scss" scoped>
@import '../../../styles/common.scss';
.subject-items{
  width: 100%;
  background:rgba(243,244,245,0.8);
  padding: 10px;
  border-radius: 5px;
  display: flex;
  font-size: 14px;

}
</style>