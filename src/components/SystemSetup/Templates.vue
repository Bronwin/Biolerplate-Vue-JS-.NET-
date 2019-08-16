<template>
  <div>
    <v-toolbar color="primary">
      <v-toolbar-title>Templates</v-toolbar-title>
    </v-toolbar>
    <v-card>
      <v-list fluid id="lstTemplates">
        <draggable id="draggabletemplates" class="draggabletemplates" v-model="templates" :options="{group:draggableGroup}" @start="drag=true" @end="drag=false">
          <v-list-tile v-for="(template, key) in templates" v-bind:id="template.TemplateName" class="itemTemplate" v-bind:class="{secondary : activeTemplate == template.GID}" :key="template.GID" avatar @click="showPreview(template)">
            <v-list-tile-avatar></v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="template.DisplayName"></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action></v-list-tile-action>
          </v-list-tile>
          <v-card-text class="notemplates text-center" v-show="templates.length === 0 ">
            <i>Drag and drop step here to remove step</i>
          </v-card-text>
        </draggable>
      </v-list>
    </v-card>
  </div>
</template>
<script>
	import axios from "axios";
  import draggable from 'vuedraggable'
  import { eventBus } from '../../main'

  export default {
    data: function(){
      return {
        templates: this.$parent.templates,
        steps: this.$parent.steps,
        draggableGroup: {
          name: "steptemplate",
          put: true,
          pull: true
        },
				activeTemplate: 0,
				selectedProduct: 0,
				emptysteps: [],
        myEnvironment: {}
      }
		},
    components: {
      draggable,
    },
    methods: {
      showPreview: function (template) {
				this.activeTemplate = template.GID;
        eventBus.$emit("templatePreviewWasChanged", template);
			},
			displayError: function(errorMessage) {
				this.$store.commit('push', errorMessage);
			},
			displaySuccess: function (successMessage) {
				this.$store.commit('push', successMessage);
			},
			spliceTemplates: function (tmp) {
        
				var _this = this;
        
        if (_this.templates.length > 0) {
          for (let index = 0; index < _this.templates.length; index++) {

            _this.steps.forEach(function (item) {
              if (_this.templates[index]) {
                if (_this.templates[index].GID == item.TemplateGID) {
                  _this.templates.splice(index, 1);
                }
              }
            });
          }
        }
			},
      saveSteps: function () {
				axios({
					method: "POST", "url": this.myEnvironment.DirectQuotesAPI + "/v1/Products/" + this.selectedProduct + "/Steps?Steps=" + JSON.stringify(this.emptysteps), headers: { APIKey: this.myEnvironment.APIKey }
				}).then(result => {

				}, error => {
					console.error(error);
					});

			},
    },
		created: function () {			
      var _this = this;
      eventBus.$on('environmentLoaded', function (product) {
        _this.myEnvironment = _this.$parent.myEnvironment;
      });
      eventBus.$on('templateWasChanged', function (removedstep) {
				_this.templates.push(removedstep);				
			})
      eventBus.$on('templatesLoaded', function (templates) {
				_this.templates = templates;
				//remove item from the templates
				_this.spliceTemplates();
			})
			eventBus.$on('stepsLoaded', function (steps) {
				_this.steps = steps;

				//remove item from the templates
				_this.spliceTemplates();
			})
			eventBus.$on('selectedProductChanged', function (product) {
				_this.selectedProduct = product;
			});
    }
  }
</script>