import Vue from 'vue';

import Page from '@/components/EXD.vue';
import Label from '@/components/LAB.vue';
import Matrix from '@/components/MAT.vue';
import Field from '@/components/FLD.vue';
import { defineCustomElements } from './assets/dist/loader';

Vue.config.productionTip = false;
Vue.config.ignoredElements = [/ketchup-\w*/];

defineCustomElements(window);

Vue.component('EXD', Page);
Vue.component('LAB', Label);
Vue.component('MAT', Matrix);
Vue.component('FLD', Field);
