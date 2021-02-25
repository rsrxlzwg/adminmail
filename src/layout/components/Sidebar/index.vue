<template>
  <div :class="{'has-logo':showLogo}">
    <logo
      v-if="showLogo"
      :collapse="isCollapse"
    />
    <!-- <el-scrollbar wrap-class="scrollbar-wrapper"> -->
      <!-- <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu> -->
      <div class="sidebar">
        <div class="menu-container">
          <div class="menu-panel">
            <div class="menus">
              <section
                class="menu-section"
                v-for="route in routes"
                :key="route.path"
                v-show="!route.hidden&&route.meta.title"
              >
                <!-- <h6 class="menu-section-name hasName">看板{{route.meta.title?route.meta.title:route.children[0].meta.title}}</h6> -->
                <!-- <h6 class="menu-section-name hasName">{{!route.hidden?route.meta.title:''}}</h6> -->
                 <div class="menu-header"  @click="expandFirst(route)">
                  <h6 class="menu-section-name hasName">
                    {{ !route.hidden ? route.meta.title : "" }}
                  </h6>
                  <span class="expand-arrow">
                 
                    <svg-icon
                      :class-name="
                        ['icon-common', route.expand ? 'down' : ''].join(' ')
                      "
                      icon-class="arrows"
                    />
                  </span>
                </div>
              <div :class="['children', route.expand ? 'show' : '']">
                <menu
                  class="menu-inline"
                  v-for="item in route.children"
                  v-show="!item.hidden"
                  :key="item.path"
                >
                  <span
                    :class="['menu-info',currentRouter===item.path ?'active':'']"
                    @click="handleMenuClick(item)"
                  >
                    <span class="expand-arrow"></span>
                    <!-- <span class="menu-icon">
                      <svg-icon
                        class-name="icon-common"
                        :icon-class="item.meta.icon"
                      /> -->
                    <!-- </span> -->
                    <span class="name">{{item.meta.title}}</span>
                    <div
                      class="pull-right"
                      v-show="item.children"
                    >
                      <svg-icon
                        class-name="icon-common"
                        icon-class="right"
                      />
                    </div>
                  </span>

                </menu>
                </div>
              </section>
              <div class="munu-footer"></div>
            </div>
          </div>
          <div
            class="submenu-panel"
            :style="{ left: sidebar.menuPanel === 'left' ? '210px' : '0px' }"
          >
            <div class="menus">
              <div
                class="submenu-header"
                @click="packUp()"
              >
                <svg-icon
                  class-name="icon-common"
                  icon-class="left"
                />
                <span class="back-text">返回主菜单</span>
              </div>
              <section class="menu-section">
                <h6
                  class="menu-section-name hasName"
                  v-show="false"
                ></h6>
                <menu
                  class="menu-inline"
                  v-for="subs in subMenu"
                  v-show="!subs.hidden"
                  :key="subs.path"
                >
                  <span :class="['menu-info',currentSubRouter===subs.path ?'active':'']">
                    <span
                      class="expand-arrow"
                      @click="expandArrow(subs)"
                    >
                      <svg-icon
                        :class-name="['icon-common',subs.expand?'':'down'].join(' ')"
                        icon-class="arrows"
                        v-if="subs.children"
                      />
                    </span>

                    <div @click="subHandle(subs)">
                      <!-- <span class="menu-icon">
                        <svg-icon
                          class-name="icon-common"
                          :icon-class="subs.meta.icon"
                        />
                      </span> -->
                      <span class="name">{{subs.meta.title}} {{subs.meta.subTitle?subs.meta.subTitle:''}}</span>
                    </div>

                    <!-- <div class="pull-right" v-show="item.children">
                      <svg-icon class-name="icon-common" icon-class="right" />            
                    </div> -->
                  </span>
                  <ul
                    :class="['children', subs.expand?'':'show']"
                    v-if="subs.children"
                  >
                    <li
                      v-for="item in subs.children"
                      @click=lastMenuHandle(subs,item)
                      v-show="!item.hidden"
                    >
                      <span :class="['menu-info' ,lastCurrenrRouter===item.path ? 'active':'']">
                        <span class="menu-info">
                          <span class="expand-arrow">
                            <svg-icon
                              class-name="icon-common"
                              icon-class="arrows"
                              v-show="false"
                            />
                          </span>
                          <span class="menu-icon">
                            <svg-icon
                              class-name="icon-common"
                              :icon-class="item.meta.icon"
                            />
                          </span>
                          <span class="name">{{item.meta.title}} {{item.meta.subTitle?item.meta.subTitle:''}}</span>
                          <!-- <span class="subName" v-if="item.meta.subTitle">{{item.meta.subTitle}}</span> -->
                        </span>
                      </span>
                    </li>
                  </ul>
                </menu>
              </section>
            </div>
          </div>
        </div>
      </div>
    <!-- </el-scrollbar> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import Item from './Item'
import Vue from "vue"

export default {
  components: { SidebarItem, Logo, Item },
  data() {
    return {
      subMenu: sessionStorage['subMenu']?JSON.parse(sessionStorage['subMenu']):[],
      subLeft: '200px',
      currentRouter: '',
      currentSubRouter: '',
      lastCurrenrRouter: '',
      expand: false,
      currentMenu: 0,
      currentSub: 0,
       menuList: this.$router.options.routes
    }
  },
  mounted(){
    this.currentRouter=sessionStorage['currentRouter']? sessionStorage['currentRouter']:""
    this.currentSubRouter= sessionStorage['currentSubRouter']? sessionStorage['currentSubRouter']:""
  },
  methods: {
     expandFirst(route) {
      // console.log({route})
      //   route.expand=!route.expand
       let currRoute= this.routes.filter(i=>{
          i.path==route.path
        })
      //   currRoute.expand=!currRoute.expand
       Vue.set(route,"expand",!route.expand)
    },
    expandArrow(subs) {
      subs.expand = !subs.expand
    },

    handleMenuClick(item) {
      
      if(item.children){
        this.expansion(item.children)
        this.$router.push(item.children[0].path)
       
        this.currentSubRouter=item.children[0].path
         this.$store.dispatch("app/setPanel", "right");
        sessionStorage['currentSubRouter']=item.children[0].path
      }else{
        this.$router.push(item.path)
      }
       this.currentRouter=item.path
       sessionStorage['currentRouter']=item.path

    },
  
    subHandle(item) {
        this.$router.push(item.path)
         this.currentSubRouter=item.path
          sessionStorage['currentSubRouter']=item.path
    },
    lastMenuHandle(subs, item) {
    },
    expansion(children) {
      this.subLeft = "0"
      children.forEach(e => {
        e.expand = false
      });
      this.subMenu = children
      sessionStorage['subMenu']=JSON.stringify(children) 

    },
    packUp() {
      this.subLeft = "210px"
       this.$store.dispatch("app/setPanel", "left");
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      console.log('router', this.$router.options.routes)
      return this.$router.options.routes
    },

    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },

}
</script>
<style lang="scss" scoped>
/deep/ .el-scrollbar__view {
  height: 100%;
}
/deep/ .el-scrollbar {
  // background-color: #373b41;
}
.icon-common {
  width: 16px !important;
  height: 16px !important;
  color: rgb(51, 51, 51);
}
.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px 0 0;
  cursor: pointer;
  &:hover{
    background-color: rgba(155,163,175,0.2);
    color: #409eff;
  }
}
h6 {
  margin: 0;
  padding: 0;
}
.sidebar {
  width: 210px;
  height: 100%;
  // overflow-y: scroll;
  // background-color: #373b41;
  display: flex;
  flex-direction: column;
  position: relative;
  .menu-container {
    height: 0;
    flex: 1 1 auto;
    position: relative;
    // overflow-y: scroll;
  }
  .menu-panel {
    background-color: #eaedf1;
    height: 100%;
    width: 100%;
     overflow-y: scroll;
     .menus{
        // overflow-y: scroll;
        .munu-footer{
          height: 100px;

        }
     }
  }
  .submenu-panel {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    transition: left 0.3s;
    background-color: #eaedf1;
      overflow-y: scroll;
  }
  .submenu-header {
    text-transform: capitalize;
    display: flex;
    align-items: center;
    width: 200px;
    height: 30px;
    padding-left: 18px;
    margin-top: 10px;
    color: #ccd1d9;
    cursor: pointer;
    line-height: 30px;
    .back-text {
      display: inline-block;
      font-size: 14px;
      color: #9ba3af;
    }
  }
  .menu-section {
    // overflow-y: scroll;
    .children {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.5s;
    }
    .down {
      transform: rotate(90deg);
    }
    &:not(:first-child) {
      margin-top: 4px;
    }
    .menu-section-name {
      text-transform: uppercase;
      height: 28px;
      line-height: 34px;
      font-size: 14px;
      color: #9ba3af;
      padding-left: 10px;
      margin-bottom: 5px;
    }
    .children {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s;
      li {
        margin-bottom: 5px;
        &:nth-last-child() {
          margin-bottom: 0;
        }
      }
    }
    .show {
      max-height: 500px;
      overflow: visible;
    }
    .menu-inline {
      margin: 0;
      padding: 0;
      margin-bottom: 10px;
      // &:hover{
      //   background-color:#fff ;
      // }
    }
    .menu-info {
      color: rgb(51, 51, 51);
      display: flex;
      align-items: center;
      height: 30px;
      width: 200px;
      line-height: 30px;
      position: relative;
      cursor: pointer;

      span {
        height: 30px;
        vertical-align: middle;
      }
      .expand-arrow {
        display: inline-block;
        width: 16px;
        // height: 16px;
        margin: 0 4px;
      }
      .menu-icon {
        width: 16px;
        margin-right: 6px;
        vertical-align: middle;
      }
      .name {
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 14px;
      }
      .subName {
      }
      .pull-right {
        position: absolute;
        right: 8px;
        top: 1px;
      }
      svg {
        height: 16px;
        width: 16px;
        fill: currentColor;
        vertical-align: middle;
        // margin-right: 6px;
        transition: transform 0.2s linear;
      }
      .down {
        transform: rotate(90deg);
      }
    }
   
  }
}
 .active {
      background-color: rgba(155, 163, 175, 0.2) ;
      color: #409eff !important;
      .menu-info {
        color: #409eff !important;
      }
    }
</style>