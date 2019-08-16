<template>
  <div class="sidebar"
       :style="sidebarStyle"
       :data-color="backgroundColor"
       :data-image="backgroundImage">
    <div class="sidebar-wrapper">
      <div class="logo">
        <a href="#" class="simple-text">
            <div class="logo-img">
                <img src="static/img/silverbridgeLogo.png" alt="">
            </div>
          {{title}}
        </a>
      </div>

      <slot name="content"></slot>
      <ul class="nav">
        <!--By default vue-router adds an active class to each route link. This way the links are colored when clicked-->
        <slot>
          <sidebar-link v-for="(link,index) in sidebarLinks"
                        :key="link.name + index"
                        :to="link.path"
                        @click="closeNavbar"
                        :link="link">
            <i :class="link.icon"></i>
            <p>{{link.name}}</p>
          </sidebar-link>
        </slot>
      </ul>
    </div>
  </div>
</template>
<script>
  import SidebarLink from './SidebarLink.vue'

  export default {
    components: {
      SidebarLink
    },
    props: {
      title: {
        type: String,
        default: 'Quotes Setup'
      },
      backgroundColor: {
        type: String,
        default: 'primary',
        validator: function(value){
          let acceptedValues = ['', 'blue', 'azure', 'green', 'orange', 'red', 'purple', 'black', 'primary']
          return acceptedValues.indexOf(value) !== -1
        }
      },
      backgroundImage: {
        type: String,
        default: 'static/img/sidebar-5.jpg'
      },
      activeColor: {
        type: String,
        default: 'success',
        validator: function(value) {
          let acceptedValues = ['primary', 'info', 'success', 'warning', 'danger']
          return acceptedValues.indexOf(value) !== -1
        }
      },
      sidebarLinks: {
        type: Array,
        default: function () { return [] }
      },
      autoClose: {
        type: Boolean,
        default: true
      }
    },
    provide: function() {
      return {
        autoClose: this.autoClose
      }
    },
    computed: {
      sidebarStyle: function () {
        var _this = this;
        return {
          backgroundImage: 'url(' + _this.backgroundImage + ')'
        }
      }
    }
  }

</script>
<style>

</style>
