import{h}from"../mycomponent.core.js";import{b as generateUniqueId}from"./chunk-b080c327.js";var KetchupFld=function(){function t(){this.json="",this.showSubmit=!1,this.submitLabel="",this.submitPos="right",this.label="",this.labelPos="left",this.propagate={},this.extensions={},this.radioGeneratedName=generateUniqueId("value")}return t.prototype.updateInternalState=function(){var t,e=this;t="string"==typeof this.json&&this.json?JSON.parse(this.json):this.json;var s=Object.keys(t),a={};s.forEach(function(s){s in e?e[s]=t[s]:a[s]=t[s]}),this.propagate=a},t.prototype.componentWillLoad=function(){this.updateInternalState()},t.prototype.onSubmitClicked=function(){this.ketchupFldSubmit.emit()},t.prototype.render=function(){var t=[],e=null,s=null;this.label.trim().length&&(e=h("label",{class:"ketchup-fld__label ketchup-fld--"+this.labelPos},this.label)),this.showSubmit&&(s=h("ketchup-button",{class:"ketchup-fld__submit ketchup-fld--"+this.submitPos,label:this.submitLabel,onKetchupButtonClicked:this.onSubmitClicked.bind(this)}));var a="top"===this.labelPos,i="top"===this.submitPos;(a||i)&&t.push(h("div",{class:"ketchup-fld__top-container"},a&&e?e:null,i&&s?s:null)),!a&&e&&t.push(e);var n="",o={};switch(this.type){case"cmb":o.displayedField="value",n="combo";break;case"rad":o.displayedField="value",o.valueField="obj",o.radioName=this.radioGeneratedName,n="radio"}return t.push(h("ketchup-"+n,Object.assign({class:"ketchup-fld__component",items:this.data},o,this.propagate))),!i&&s&&t.push(s),t},Object.defineProperty(t,"is",{get:function(){return"ketchup-fld"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{data:{type:"Any",attr:"data"},extensions:{state:!0},json:{type:String,attr:"json",watchCallbacks:["updateInternalState"]},label:{state:!0},labelPos:{state:!0},propagate:{state:!0},showSubmit:{state:!0},submitLabel:{state:!0},submitPos:{state:!0},type:{state:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"events",{get:function(){return[{name:"ketchupFldSubmit",method:"ketchupFldSubmit",bubbles:!0,cancelable:!1,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return".sc-ketchup-fld-h{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;--fld_comp-margin:var(--kup-fld_component-margin,8px)}.ketchup-fld__top-container.sc-ketchup-fld{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;-ms-flex-order:0;order:0;width:100%}.ketchup-fld__label.sc-ketchup-fld{margin:var(--fld_comp-margin);-ms-flex-order:1;order:1}.ketchup-fld__label.ketchup-fld--right.sc-ketchup-fld{-ms-flex-order:4;order:4}.ketchup-fld__component.sc-ketchup-fld{margin:var(--fld_comp-margin);-ms-flex-order:3;order:3}.ketchup-fld__submit.sc-ketchup-fld{margin:var(--fld_comp-margin);-ms-flex-order:2;order:2}.ketchup-fld__submit.ketchup-fld--right.sc-ketchup-fld{-ms-flex-order:5;order:5}"},enumerable:!0,configurable:!0}),t}();export{KetchupFld};