mycomponent.loadBundle("tjoqrsp0",["exports"],function(t){var n=window.mycomponent.h,o=function(){function t(){this.config={}}return t.prototype.onBtnClicked=function(t){this.config.showSelection&&(this.selectedBtnIndex=parseInt(t.target.dataset.id))},t.prototype.render=function(){var t=this,o=[];this.buttons&&(this.config.columns&&this.config.columns>0?this.buttons.forEach(function(n,e){0==e%t.config.columns&&o.push([]),o[o.length-1].push(n)}):this.config.horizontal?o[0]=this.buttons:o=this.buttons.map(function(t){var n=[];return n.push(t),n}));var e=null,i=0;o.length>0&&(e=o.map(function(o){var e=o.map(function(o){var e=t.config.buttonClass||"";return i===t.selectedBtnIndex&&(e+=" btn-selected"),n("td",null,n("kup-button",{iconUrl:t.config.iconUrl,label:o.value,iconClass:o.iconClass,fillspace:t.config.fillspace,showtext:t.config.showtext,showicon:t.config.showicon,rounded:t.config.rounded,textmode:t.config.textmode,transparent:t.config.transparent,buttonClass:e,flat:t.config.flat,"data-id":i++,onKupButtonClicked:function(n){return t.onBtnClicked(n)},align:t.config.align,class:t.config.fillspace||!t.config.horizontal?"fillspace":""}))});return n("tr",null,e)}));var l="btn-container";this.config.fillspace&&(l+=" fillspace"),this.config.horizontal||(l+=" vertical");var c={};return this.config.btnStyle&&(this.config.btnStyle.fontColor&&(c["--kup-button_text-color"]=this.config.btnStyle.fontColor),this.config.btnStyle.underline&&(c["--kup-button_text-decoration"]="underline"),this.config.btnStyle.fontName&&(c["--kup-button_font-family"]=this.config.btnStyle.fontName),this.config.btnStyle.fontSize&&(c["--kup-button_font-size"]=this.config.btnStyle.fontSize),this.config.btnStyle.bold&&(c["--kup-button_font-weight"]=700),this.config.btnStyle.bckColor&&(c["--kup-button_main-color"]=this.config.btnStyle.bckColor),this.config.btnStyle.italic&&(c["--kup-button_font-style"]="italic"),this.config.borderColor&&(c["--kup-button_border-color"]=this.config.borderColor)),n("table",{class:l,style:c},n("tbody",null,e))},Object.defineProperty(t,"is",{get:function(){return"kup-btn"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{buttons:{type:"Any",attr:"buttons"},config:{type:"Any",attr:"config"},selectedBtnIndex:{state:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return".btn-container{border-collapse:collapse}.btn-container.fillspace{width:100%}.btn-container tbody tr td{padding:3px}"},enumerable:!0,configurable:!0}),t}();t.KupBtn=o,Object.defineProperty(t,"__esModule",{value:!0})});