var __awaiter=this&&this.__awaiter||function(t,e,n,a){return new(n||(n=Promise))(function(i,o){function u(t){try{l(a.next(t))}catch(t){o(t)}}function r(t){try{l(a.throw(t))}catch(t){o(t)}}function l(t){t.done?i(t.value):new n(function(e){e(t.value)}).then(u,r)}l((a=a.apply(t,e||[])).next())})},__generator=this&&this.__generator||function(t,e){var n,a,i,o,u={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:r(0),throw:r(1),return:r(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function r(o){return function(r){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;u;)try{if(n=1,a&&(i=2&o[0]?a.return:o[0]?a.throw||((i=a.return)&&i.call(a),0):a.next)&&!(i=i.call(a,o[1])).done)return i;switch(a=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return u.label++,{value:o[1],done:!1};case 5:u.label++,a=o[1],o=[0];continue;case 7:o=u.ops.pop(),u.trys.pop();continue;default:if(!(i=(i=u.trys).length>0&&i[i.length-1])&&(6===o[0]||2===o[0])){u=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){u.label=o[1];break}if(6===o[0]&&u.label<i[1]){u.label=i[1],i=o;break}if(i&&u.label<i[2]){u.label=i[2],u.ops.push(o);break}i[2]&&u.ops.pop(),u.trys.pop();continue}o=e.call(t,u)}catch(t){o=[6,t],a=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,r])}}};mycomponent.loadBundle("t1qpph8j",["exports","./chunk-1c6f0faf.js"],function(t,e){var n=window.mycomponent.h,a=function(){function t(){this.config="",this.showSubmit=!1,this.submitLabel="",this.submitPos="right",this.label="",this.labelPos="left",this.propagate={},this.extensions={},this.radioGeneratedName=e.generateUniqueId("value"),this.currentValue=null,this.onChangeInstance=this.onChange.bind(this),this.onSubmitInstance=this.onSubmit.bind(this)}return t.prototype.updateInternalState=function(){var t,e=this;t="string"==typeof this.config&&this.config?JSON.parse(this.config):this.config;var n=Object.keys(t),a={};n.forEach(function(n){n in e?e[n]=t[n]:a[n]=t[n]}),this.propagate=a},t.prototype.componentWillLoad=function(){this.updateInternalState()},t.prototype.onChange=function(t){var e=t.detail.value;this.ketchupFldChanged.emit({originalEvent:t,oldValue:this.currentValue,value:e}),this.currentValue=e},t.prototype.onSubmit=function(t){this.ketchupFldSubmit.emit({originalEvent:t,value:this.currentValue})},t.prototype.getCurrentValue=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return[2,this.currentValue]})})},t.prototype.render=function(){var t=[],e=null,a=null;this.label.trim().length&&(e=n("label",{class:"ketchup-fld__label ketchup-fld--"+this.labelPos},this.label)),this.showSubmit&&(a=n("kup-button",{class:"ketchup-fld__submit ketchup-fld--"+this.submitPos,label:this.submitLabel,onKetchupButtonClicked:this.onSubmitInstance}));var i="top"===this.labelPos,o="top"===this.submitPos;(i||o)&&t.push(n("div",{class:"ketchup-fld__top-container"},i&&e?e:null,o&&a?a:null)),!i&&e&&t.push(e);var u="",r={};switch(this.type){case"cmb":r.displayedField="value",r.valueField="value",r.onKetchupComboSelected=this.onChangeInstance,u="combo";break;case"rad":r.valueField="obj",r.radioName=this.radioGeneratedName,r.onKetchupRadioChanged=this.onChangeInstance,u="radio";break;case"itx":case"Itx":r.onKetchupTextInputUpdated=this.onChangeInstance,r.onKetchupTextInputSubmit=this.onSubmitInstance,u="kup-text-input"}var l=(u.indexOf("kup")<0?"ketchup-":"")+u;return t.push(n(l,Object.assign({class:"ketchup-fld__component",items:this.data},r,this.propagate))),!o&&a&&t.push(a),t},Object.defineProperty(t,"is",{get:function(){return"ketchup-fld"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{config:{type:String,attr:"config",watchCallbacks:["updateInternalState"]},data:{type:"Any",attr:"data"},extensions:{state:!0},getCurrentValue:{method:!0},label:{state:!0},labelPos:{state:!0},propagate:{state:!0},showSubmit:{state:!0},submitLabel:{state:!0},submitPos:{state:!0},type:{state:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"events",{get:function(){return[{name:"ketchupFldChanged",method:"ketchupFldChanged",bubbles:!0,cancelable:!1,composed:!0},{name:"ketchupFldSubmit",method:"ketchupFldSubmit",bubbles:!0,cancelable:!1,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return":host{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;--fld_comp-margin:var(--kup-fld_component-margin,8px)}.ketchup-fld__top-container{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;-ms-flex-order:0;order:0;width:100%}.ketchup-fld__label{margin:var(--fld_comp-margin);-ms-flex-order:1;order:1}.ketchup-fld__label.ketchup-fld--right{-ms-flex-order:4;order:4}.ketchup-fld__component{margin:var(--fld_comp-margin);-ms-flex-order:3;order:3}.ketchup-fld__submit{margin:var(--fld_comp-margin);-ms-flex-order:2;order:2}.ketchup-fld__submit.ketchup-fld--right{-ms-flex-order:5;order:5}"},enumerable:!0,configurable:!0}),t}();t.KetchupFld=a,Object.defineProperty(t,"__esModule",{value:!0})});