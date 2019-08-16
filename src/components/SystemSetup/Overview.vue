<template>
  <div class="container-fluid">
    <br />
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <p>
              In order to create your desired workflow, please select the appropriate step in the template screen and drag it into the step section in your desired order.
            </p>
            <p>Previews are available when a template/step is selected.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <steps></steps>
      </div>
      <div class="col">
        <templates></templates>
      </div>
    </div>
    <br />
    <div class="row">
      <div class="col">
        <template-preview></template-preview>
      </div>
    </div>
    <br />
    <div class="row">
      <div class="col">
        <v-btn v-on:click="showLivePreview()" color="primary" class="float-right" id="btnLivePreview">Live Preview</v-btn>
      </div>
    </div>
    <br />
  </div>
</template>
<script>
	import axios from "axios";
  import Steps from './Steps.vue'
  import Templates from './Templates.vue'
  import TemplatePreview from './TemplatePreview.vue'
	import { eventBus } from '../../main'

	export default {
		data: function () {
			return {
				steps: [],
				products: [],
				templates: [],
				previewURL: "",
        myEnvironment: {}
			}
		},
    components: {
      Steps,
      Templates,
      TemplatePreview
		},
		
    methods: {
      getEnvironment: function () {
        var _this = this;
        axios({
          method: "GET", "url": "/api/Settings/Get/"
        }).then(result => {
          if (result.data) {
            _this.myEnvironment  = result.data;
            eventBus.$emit('environmentLoaded', this.steps);
          }
        }, error => {
          this.displayError(error);
        });
      },
			displayError: function (errorMessage) {
				this.$store.commit('push', errorMessage);
			},
			displaySuccess: function (successMessage) {
				this.$store.commit('push', successMessage);
			},
			getSteps: function () {
				axios({
					method: "GET", "url": this.myEnvironment.DirectQuotesAPI + "/v1/Products/" + this.products[0].ContractTypeID + "/Steps", headers: { APIKey: this.myEnvironment.APIKey }
				}).then(result => {
          this.steps = result.data.ResponseField;
          
					eventBus.$emit('stepsLoaded', this.steps);
					this.getTemplates();
				}, error => {
					console.error(error);
				});
			},
			getProducts: function () {
				axios({
					method: "GET", "url": this.myEnvironment.DirectQuotesAPI + "/v1/Products", headers: { APIKey: this.myEnvironment.APIKey }
				}).then(result => {
					this.products = result.data.ResponseField;
					eventBus.$emit('selectedProductChanged', this.products[0].ContractTypeID);
					this.getSteps();
				}, error => {
					console.error(error);
				});
			},
			getTemplates: function () {
				axios({
					method: "GET", "url": this.myEnvironment.DirectQuotesAPI + "/v1/Templates", headers: { APIKey: this.myEnvironment.APIKey }
        }).then(result => {
					this.templates = result.data.ResponseField;
					this.displaySuccess("Templates Loaded succesfully!");
					eventBus.$emit('templatesLoaded', this.templates);
				}, error => {
					this.displayError(error);
				});
			},
      showLivePreview: function () {
        window.open(this.myEnvironment.DirectQuotesWeb + "/v1/Quote?key=" + this.myEnvironment.APIKey + "", '_blank');
			},
		},
    created: function () {
      var _this = this;
      _this.getEnvironment();
      eventBus.$on('environmentLoaded', function (product) {
        _this.getProducts();
      });
			eventBus.$on('selectedProductChanged', function (product) {
        _this.selectedProduct = product;
			});

		}
  }
</script>