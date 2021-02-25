import Cookies from 'js-cookie'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    menuPanel:Cookies.get('menuPanel') ? Cookies.get('menuPanel') : 'left',
    withoutAnimation: false
  },
  device: 'desktop',
  menuLists:[]
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_PANEL: (state,data)=>{
    state.sidebar.menuPanel=data
    // if (state.sidebar.menuPanel) {
      Cookies.set('menuPanel', data)
    // } 
  },
  SET_MENULIST:(state,data)=>{
    state.menuLists=data
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  setPanel({ commit },data) {
    commit('SET_PANEL',data)
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setMenuList({commit},data){
    commit('SET_MENULIST',data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
