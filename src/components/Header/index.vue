<template>
  <div class="header-section">
    <div class="left-menu">
      <div class="header-logo"></div>
      <div class="header-title">ESB网格平台</div>
    </div>
    <div class="right-menu">
      <el-dropdown
        class="avatar-container"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <svg-icon icon-class="user"></svg-icon>
          超级管理员
        </div>
        <el-dropdown-menu
          slot="dropdown"
          class="user-dropdown"
        >
          <router-link to="/">
            <el-dropdown-item>Home</el-dropdown-item>
          </router-link>
          <el-dropdown-item
            divided
            @click.native="logout"
          >
            <span style="display:block;">登出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters([ "sidebar", "avatar" ])
  },
  methods: {
    async logout() {
       await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
       
    }
  }
};
</script>

<style lang="scss" scoped>
.header-section {
  height: 50px !important;
  background: linear-gradient(to right, #1745fb, #33a2ef); //#304156 33a2ef
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left-menu {
    display: flex;
    .header-logo {
      width: 130px;
      height: 50px;
      background-image: url("../../assets/wslogo1.png");
      background-repeat: no-repeat;
      background-size: 90% 60%;
      background-position: center;
    }
    .header-title {
      margin-left: 10px;
      height: 50px;
      line-height: 50px;
      color: #fff;
      font-weight: bold;
    }
  }
  .right-menu {
    .avatar-container {
      margin-right: 30px;
      cursor: pointer;
      .avatar-wrapper {
        color: #fff;
      }
    }
  }
}
</style>