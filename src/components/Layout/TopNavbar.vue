<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <button type="button"
              class="navbar-toggler navbar-toggler-right"
              :class="{toggled: $sidebar.showSidebar}"
              aria-controls="navigation-index"
              aria-expanded="false"
              aria-label="Toggle navigation"
              @click="toggleSidebar">
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
      </button>
      <a class="navbar-brand" href="#">{{this.$route.name}}</a>
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item" style="display:none">
            <a href="#" class="nav-link" id="linkLogOut">
              Log out
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
  export default {
    computed: {
      routeName: function () {
        var name = this.$route
        return this.capitalizeFirstLetter(name)
      }
    },
    data:function () {
      return {
        activeNotifications: false
      }
    },
    methods: {
      capitalizeFirstLetter: function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      },
      toggleNotificationDropDown: function () {
        this.activeNotifications = !this.activeNotifications
      },
      closeDropDown: function () {
        this.activeNotifications = false
      },
      toggleSidebar: function () {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
      },
      hideSidebar: function () {
        this.$sidebar.displaySidebar(false)
      }
    }
  }

</script>
<style>

</style>
