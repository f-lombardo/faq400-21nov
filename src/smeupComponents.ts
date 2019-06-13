import Vue from "vue";

import Page from "@/components/smeup/EXD.vue";
import Label from "@/components/smeup/LAB.vue";
import Fld from "@/components/smeup/FLD.vue";
import Btn from "@/components/smeup/BTN.vue";
import Exb from "@/components/smeup/MAT.vue";
import Unk from "@/components/smeup/UNK.vue";

import { defineCustomElements } from "./assets/dist/loader";

Vue.config.productionTip = false;
Vue.config.ignoredElements = [/[ketchup|kup|app]-\w*/];
//Vue.config.ignoredElements = [/ketchup-\w*/];

defineCustomElements(window);

Vue.component("EXD", Page);
Vue.component("LAB", Label);
Vue.component("FLD", Fld);
Vue.component("BTN", Btn);
Vue.component("MAT", Exb);
Vue.component("UNK", Unk);
