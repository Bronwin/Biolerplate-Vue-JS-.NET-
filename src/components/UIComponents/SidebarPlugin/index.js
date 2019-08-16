import Sidebar from './SideBar.vue'
import SidebarLink from './SidebarLink.vue'

var SidebarStore = {
  showSidebar: false,
  sidebarLinks: [
    {
      name: 'Dashboard',
      icon: 'ti-panel',
      path: '/admin/overview'
    }
  ],
  displaySidebar:function (value) {
    this.showSidebar = value
  }
}

var SidebarPlugin = {

  install: function(Vue) {
    Vue.mixin({
      data:function() {
        return {
          sidebarStore: SidebarStore
        }
      }
    })

    Object.defineProperty(Vue.prototype, '$sidebar', {
      get:function() {
        return this.$root.sidebarStore
      }
    })
    Vue.component('side-bar', Sidebar)
    Vue.component('sidebar-link', SidebarLink)
  }
}

export default SidebarPlugin
