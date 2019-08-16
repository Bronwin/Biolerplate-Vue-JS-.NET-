import Vue from 'vue'
import { mount } from '@vue/test-utils'
import Overview from '../../src/components/SystemSetup/Overview.vue'
import Templates from '../../src/components/SystemSetup/Templates.vue'
import TemplatePreview from '../../src/components/SystemSetup/TemplatePreview.vue'
import Steps from '../../src/components/SystemSetup/Steps.vue'

var dragMock = require('drag-mock');

Vue.component(Overview);
Vue.component(Steps);
Vue.component(Templates);
Vue.component(TemplatePreview);
//Vue.component(draggable);

describe('TemplatesComponent', function() {
  it('creates a new step when template is dragged to steps', function () {
    
    var wrapper = mount(Overview);

    expect(wrapper.find(Steps).exists()).toBe(true);
    expect(wrapper.find(Templates).exists()).toBe(true);

    var aListItem = [{ GID: 2, DisplayName: 'Template 2' }];
    wrapper.find(Templates).setData({ templates: aListItem })
    expect(wrapper.find(Templates).find('.itemTemplate').exists()).toBe(true);

    wrapper.find(Steps).setData({ steps: [] });
    expect(wrapper.find(Steps).find('.itemStep').exists()).toBe(false);
    expect(wrapper.find(Steps).find('.nosteps').exists()).toBe(true);

    //expect steps to contain 0 object and templates to contain 1 object
    expect(wrapper.find(Steps).vm.steps.length).toBe(0);
    expect(wrapper.find(Templates).vm.templates.length).toBe(1);

    console.log("----BEFORE drag--------------------------------------");

    var dropSource = wrapper.find(Templates).findAll('.itemTemplate').at(0).element;
    var dropTarget = wrapper.find(Steps).findAll('.draggablesteps').at(0).element;

    console.log(".......drag mock gonna happen next.........");

    dragMock
      .dragStart(dropSource, function (dragStartEvent, eventName) {
        console.log("starting drag ---------------");
        wrapper.find(Templates).setData({ templates: [] })
        wrapper.find(Steps).setData({ steps: aListItem })
      })
      .delay(500)
      .dragLeave(dropSource, function () {
        console.log("leaving drag ---------------")
      })
      .delay(500)
      .drop(dropTarget)
      

    console.log("----AFTER drag--------------------------------------");
    console.log(wrapper.find(Steps).vm.steps.length);
    console.log(wrapper.find(Templates).vm.templates.length);

    //expect steps to contain 0 object and templates to contain 2 objects
    expect(wrapper.find(Steps).vm.steps.length).toBe(1);
    expect(wrapper.find(Templates).vm.templates.length).toBe(0);
    expect(wrapper.find(Templates).find('.itemTemplate').exists()).toBe(false);
    expect(wrapper.find(Steps).find('.itemStep').exists()).toBe(true);
  })
})

describe('StepsComponent', function () {
  it('removes a step when clicking on the x icon', function () {

    var wrapper = mount(Overview);

    expect(wrapper.find(Steps).exists()).toBe(true);
    expect(wrapper.find(Templates).exists()).toBe(true);

    var aListItem = [{ GID: 2, DisplayName: 'Template 2' }];
    wrapper.find(Templates).setData({ templates: aListItem })
    expect(wrapper.find(Templates).find('.itemTemplate').exists()).toBe(true);

    var aStepItem = [{ GID: 1, DisplayName: 'Template 1'}];
    wrapper.find(Steps).setData({ steps: aStepItem });
    expect(wrapper.find(Steps).find('.itemStep').exists()).toBe(true);

    //expect steps and templates to contain 1 object
    expect(wrapper.find(Steps).vm.steps.length).toBe(1);
    expect(wrapper.find(Templates).vm.templates.length).toBe(1);

    //click the delete icon
    wrapper.find(Steps).find('i').trigger('click');

    //expect steps to contain 0 object and templates to contain 2 objects
    expect(wrapper.find(Steps).vm.steps.length).toBe(0);
    expect(wrapper.find(Templates).vm.templates.length).toBe(2);

  })
  it('removes a step and adds it to templates when step is dragged back to templates', function () {

    var wrapper = mount(Overview);

    expect(wrapper.find(Steps).exists()).toBe(true);
    expect(wrapper.find(Templates).exists()).toBe(true);

    var aStepItem = [{ GID: 1, DisplayName: 'Template 1', link: "https://demos.creative-tim.com/vue-light-bootstrap-dashboard/#/admin/user" }];
    wrapper.find(Steps).setData({ steps: aStepItem })
    expect(wrapper.find(Steps).find('.itemStep').exists()).toBe(true);

    wrapper.find(Templates).setData({ templates: [] });
    expect(wrapper.find(Steps).find('.itemTemplate').exists()).toBe(false);

    //expect steps to contain 1 object and templates to contain 0 object
    expect(wrapper.find(Steps).vm.steps.length).toBe(1);
    expect(wrapper.find(Templates).vm.templates.length).toBe(0);

    console.log("----BEFORE drag--------------------------------------");

    var dropSource = wrapper.find(Steps).findAll('.itemStep').at(0).element;
    var dropTarget = wrapper.find(Templates).findAll('.draggabletemplates').at(0).element;

    console.log(".......drag mock gonna happen next.........");

    dragMock
      .dragStart(dropSource, function (dragStartEvent, eventName) {
        console.log("starting drag ---------------");
        wrapper.find(Templates).setData({ templates: aStepItem })
        wrapper.find(Steps).setData({ steps: [] })
      })
      .delay(500)
      .dragLeave(dropSource, function () {
        console.log("leaving drag ---------------")
      })
      .delay(500)
      .drop(dropTarget)

    console.log("----AFTER drag--------------------------------------");

    //expect steps to contain 0 object and templates to contain 2 objects
    expect(wrapper.find(Steps).vm.steps.length).toBe(0);
    expect(wrapper.find(Templates).vm.templates.length).toBe(1);
    expect(wrapper.find(Templates).find('.itemTemplate').exists()).toBe(true);
    expect(wrapper.find(Steps).find('.itemStep').exists()).toBe(false);
  })
})

describe('TemplatePreviewComponent', function () {
  it('displays template preview when template is clicked', function () {

    var wrapper = mount(Overview);
    expect(wrapper.find(Templates).exists()).toBe(true);
    expect(wrapper.find(TemplatePreview).exists()).toBe(true);

		var aListItem = [{ GID: 10, DisplayName: 'Step 1', TemplateName: 'Step 1' }];
    wrapper.find(Templates).setData({ templates: aListItem })
    expect(wrapper.find(Templates).find('.itemTemplate').exists()).toBe(true);

		//expect template preview to be empty
		expect(wrapper.find(TemplatePreview).vm.template.length).toBe(0);
    expect(wrapper.find(TemplatePreview).vm.template.DisplayName).toBe(undefined);
    //expect(wrapper.find(TemplatePreview).vm.template.link).toBe(undefined);
    expect(wrapper.find(TemplatePreview).find('.spanTemplateSelected').element.innerHTML).toBe("()");
    expect(wrapper.find(TemplatePreview).find('iframe').element.hasAttribute('src')).toBe(true);
		expect(wrapper.find(TemplatePreview).vm.previewURL.length).toEqual(0);

    //now click on template
    wrapper.find(Templates).findAll('.itemTemplate').at(0).trigger('click');

    //expect template preview to be selected template
    console.log("----TEMPLATE PREVIEW--------------------------------------");
		expect(wrapper.find(TemplatePreview).vm.template.DisplayName).toBe('Step 1');
		//expect(wrapper.find(TemplatePreview).vm.previewURL.length).toBeGreaterThan(0);

    //expect(wrapper.find(TemplatePreview).find('.spanTemplateSelected').element.innerHTML).toBe("(Template 1)");
    //expect(wrapper.find(TemplatePreview).find('iframe').element.hasAttribute('src')).toBe(true);
  })
  it('displays template preview when step is clicked', function () {

    var wrapper = mount(Overview);
    expect(wrapper.find(Steps).exists()).toBe(true);
    expect(wrapper.find(TemplatePreview).exists()).toBe(true);

		var aListItem = [{ GID: 10, DisplayName: 'Step 1', TemplateName: 'Step 1' }];
    wrapper.find(Steps).setData({ steps: aListItem })
    expect(wrapper.find(Steps).find('.itemStep').exists()).toBe(true);

    //expect template preview to be empty
    expect(wrapper.find(TemplatePreview).vm.template.length).toBe(0);
    expect(wrapper.find(TemplatePreview).vm.template.DisplayName).toBe(undefined);
    expect(wrapper.find(TemplatePreview).vm.template.link).toBe(undefined);
    expect(wrapper.find(TemplatePreview).find('.spanTemplateSelected').element.innerHTML).toBe("()");
		expect(wrapper.find(TemplatePreview).find('iframe').element.hasAttribute('src')).toBe(true);
		expect(wrapper.find(TemplatePreview).vm.previewURL.length).toEqual(0);

    //now click on template
    wrapper.find(Steps).findAll('.itemStep').at(0).trigger('click');

    //expect template preview to be selected template
    console.log("----STEP PREVIEW--------------------------------------");
    console.log(wrapper.find(TemplatePreview).vm.template);
		console.log('previewURL', wrapper.find(TemplatePreview).vm.previewURL);

		expect(wrapper.find(TemplatePreview).vm.template.DisplayName).toBe('Step 1');
		//expect(wrapper.find(TemplatePreview).vm.previewURL.length).toBeGreaterThan(0);

  })
})


