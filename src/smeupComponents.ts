import Vue from 'vue';

import Page from '@/components/smeup/EXD.vue';
import { defineCustomElements } from './assets/dist/loader';

Vue.config.productionTip = false;
Vue.config.ignoredElements = [/ketchup-\w*/];

defineCustomElements(window);

Vue.component('EXD', Page);
