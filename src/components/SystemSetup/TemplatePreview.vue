<template>
  <div>
    <v-toolbar color="secondary">
      <v-toolbar-title>Template Preview <span class="spanTemplateSelected" v-show="template.DisplayName">({{template.DisplayName}})</span></v-toolbar-title>
    </v-toolbar>
    <v-card class="embed-responsive embed-responsive-16by9">
      <iframe class="embed-responsive-item" :src="previewURL" allowfullscreen></iframe>
    </v-card>
  </div>
</template>
<style>
  iframe {
    pointer-events: none;
  }
</style>
<script>
  import { eventBus } from '../../main'
  import JQuery from 'jquery'

  export default {
    data: function () {
      return {
				template: [],
				previewURL: "",
        myEnvironment: {}
      }
    },
    created: function() {
      var _this = this;      
      eventBus.$on('environmentLoaded', function (product) {
        _this.myEnvironment = _this.$parent.myEnvironment;
      });
      eventBus.$on('stepPreviewWasChanged', function (step) {        
        if (step) {
          _this.template = step;
          _this.previewURL = _this.myEnvironment.DirectQuotesWeb + "/" + step.TemplateName + "/?LivePreview=False"
        }
        JQuery(".itemTemplate").removeClass("secondary");
      });
      eventBus.$on('templatePreviewWasChanged', function (template) {
        if (template) {
          _this.template = template;
          _this.previewURL = _this.myEnvironment.DirectQuotesWeb + "/" + template.TemplateName + "/?LivePreview=False";
        }
        JQuery(".itemStep").removeClass("secondary");
      })
    }
  }
</script>