import Vuex from 'vuex'
import VueMaterial from 'vue-material'

import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Links from '@/components/Links'
import db from '../../data/db'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueMaterial)

const store = {
  getters: {
    responseBody: db.books
  }
}

describe('Links.vue', () => {
  it('should render correct contents', () => {
    const wrapper = shallowMount(Links, {
      mocks: {
        $store: store
      },
      localVue
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  });

  it('should format curies links', () => {
    const wrapper = shallowMount(Links, {
      mocks: {
        $store: store
      },
      localVue
    })
    // const wrapper = mount(Links);

    // console.log('wrapper', wrapper);
    // console.log('wrapper', wrapper.props);
    console.log('wrapper', wrapper.vm.testComponent);
    console.log('wrapper', wrapper.vm.testComponent());
    // console.log('wrapper', typeof wrapper);
    // console.log('wrapper', Object.keys(wrapper));
    expect(wrapper.isVueInstance()).toBeTruthy()
    // const Constructor = Vue.extend(Links)
    // console.log('cons', Constructor)
    // const vm = new Constructor().$mount()
    // console.log('vm', vm)
    // expect(vm.$el.querySelector('.hello h1').textContent)
    //   .toEqual('Welcome to Your Vue.js App')
  })
})
