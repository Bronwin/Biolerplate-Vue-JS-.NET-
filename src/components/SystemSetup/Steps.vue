<template>
  <div>
    <v-toolbar color="primary">
      <v-toolbar-title>Steps</v-toolbar-title>
    </v-toolbar>
    <v-card>
      <v-list fluid id="lstSteps">
        <draggable id="draggablesteps" class="draggablesteps" v-model="steps" :options="{group:'steptemplate'}" @start="drag=true" @end="drag=false" @sort="saveOrder">
          <v-list-tile v-for="(step, key) in steps" v-bind:id="step.TemplateName" class="itemStep"  v-bind:class="{secondary : activeTemplate == step.GID}" :key="step.GID" avatar @click="showPreview(step)">
            <v-list-tile-avatar color="secondary">
              {{step.StepOrder}}
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="step.DisplayName"></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon v-on:click="removeStep(step,key)" class="removeStep" v-bind:id="'Remove' + key">clear</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-card-text class="nosteps text-center" v-show="steps.length === 0 ">
            <i>Drag and drop template here to add a new step</i>
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
    data: function () {
			return {
				steps: [],
				activeTemplate: 0,
				selectedProduct: 0,
				products: [
				],
        myEnvironment: {}
      }
    },
    components: {
      draggable
    },
    methods: {
      showPreview: function (step) {
				this.activeTemplate = step.GID;
        eventBus.$emit("stepPreviewWasChanged", step);
      },
      removeStep: function (step, index) {
        this.steps.splice(index, 1);
				eventBus.$emit("templateWasChanged", step);
				this.saveSteps();
      },
      saveOrder: function () {
        for (var i = 0; i < this.steps.length; i++) {
          this.steps[i].StepOrder = i + 1;
				}
				this.saveSteps();
			},
      saveSteps: function () {
				axios({
					method: "POST", "url": this.myEnvironment.DirectQuotesAPI + "/v1/Products/" + this.selectedProduct + "/Steps?Steps=" + JSON.stringify(this.steps), headers: { APIKey: this.myEnvironment.APIKey }
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
      eventBus.$on('stepsLoaded', function (steps) {
				_this.steps = steps;
				console.log('stepsLoaded', _this.steps);
			})
			eventBus.$on('selectedProductChanged', function (product) {
				_this.selectedProduct = product;
			});
		}
  }
</script>