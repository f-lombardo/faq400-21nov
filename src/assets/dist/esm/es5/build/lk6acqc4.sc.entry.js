import{h}from"../mycomponent.core.js";var KetchupButton=function(){function t(){this.flat=!1,this.fillspace=!1,this.showtext=!0,this.showicon=!0,this.rounded=!1,this.transparent=!1,this.btnStyle={},this.iconUrl="https://cdn.materialdesignicons.com/3.2.89/css/materialdesignicons.min.css"}return t.prototype.onBorderColorChange=function(t,e){if(t!==e&&this.transparent&&this.borderColor){var n=this.ketchupButtonEl.querySelector("button").style;n.borderColor=this.borderColor,n.color=this.borderColor}},t.prototype.onStyleChanged=function(t,e){if(t!==e){var n=this.ketchupButtonEl.querySelector("button").style;n.fontFamily=t.fontName?t.fontName:"inherit",t.fontColor&&(n.color=t.fontColor),n.fontWeight=t.bold?"bold":"inherit"}},t.prototype.onBtnClickedHandler=function(){this.ketchupButtonClicked.emit({id:this.ketchupButtonEl.dataset.id})},t.prototype._isHint=function(){return"Hint"===this.textmode},t.prototype.render=function(){var t=this,e=null;(!this._isHint()||this._isHint()&&this.flat)&&this.showtext&&this.label&&(e=h("span",{class:"button-text"},this.label));var n=null;this.showicon&&this.iconClass&&(n=h("span",{class:"button-icon "+this.iconClass}));var o="";this.flat?o="flat-btn":(this.buttonClass&&(o+=this.buttonClass),this.rounded&&(o+=" rounded"),this.transparent&&(o+=" transparent")),this.fillspace&&(o+=" fillspace"),this.align&&("right"===this.align?o+=" align-right":"left"===this.align&&(o+=" align-left")),o=o.trim();var r="";return"Hint"===this.textmode&&(r=this.label),h("div",null,h("link",{href:this.iconUrl,rel:"stylesheet",type:"text/css"}),h("button",{class:o,title:r,onClick:function(){return t.onBtnClickedHandler()}},n,e))},Object.defineProperty(t,"is",{get:function(){return"ketchup-button"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{align:{type:String,attr:"align"},borderColor:{type:String,attr:"border-color",watchCallbacks:["onBorderColorChange"]},btnStyle:{type:"Any",attr:"btn-style",watchCallbacks:["onStyleChanged"]},buttonClass:{type:String,attr:"button-class"},fillspace:{type:Boolean,attr:"fillspace"},flat:{type:Boolean,attr:"flat"},iconClass:{type:String,attr:"icon-class"},iconUrl:{type:String,attr:"icon-url"},ketchupButtonEl:{elementRef:!0},label:{type:String,attr:"label"},rounded:{type:Boolean,attr:"rounded"},showicon:{type:Boolean,attr:"showicon"},showtext:{type:Boolean,attr:"showtext"},textmode:{type:String,attr:"textmode"},transparent:{type:Boolean,attr:"transparent"}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"events",{get:function(){return[{name:"ketchupButtonClicked",method:"ketchupButtonClicked",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return".fillspace.sc-ketchup-button-h{width:100%}button.sc-ketchup-button{background:#4e908f;border:none;color:#fff;border-radius:2px;-webkit-box-shadow:none;box-shadow:none;white-space:nowrap;padding:0 8px;line-height:30px;cursor:pointer;text-align:center}button.sc-ketchup-button:hover{-webkit-box-shadow:2px 2px 5px 1px hsla(0,0%,39.2%,.7);box-shadow:2px 2px 5px 1px hsla(0,0%,39.2%,.7)}button.sc-ketchup-button > .button-icon.sc-ketchup-button{float:left;display:block;width:18px}button.rounded.sc-ketchup-button{border-radius:50%}button.transparent.sc-ketchup-button{background-color:transparent;border:1px solid grey;color:grey}button.btn-info.sc-ketchup-button{background:#6a8fd1}button.btn-danger.sc-ketchup-button{background:#f0423c}button.btn-danger.sc-ketchup-button:hover{background:#d91e18}button.btn-warning.sc-ketchup-button{background:#ffd454}button.btn-selected.sc-ketchup-button{background:#ffc107}button.flat-btn.sc-ketchup-button{background:none;border:none;color:#4e908f}button.flat-btn.sc-ketchup-button:hover{-webkit-box-shadow:none;box-shadow:none}button.flat-btn.sc-ketchup-button   .button-text.sc-ketchup-button{text-decoration:underline}button.align-right.sc-ketchup-button{text-align:right}button.align-right.sc-ketchup-button > .button-icon.sc-ketchup-button{float:right}button.align-left.sc-ketchup-button{text-align:left}button.fillspace.sc-ketchup-button{width:100%}"},enumerable:!0,configurable:!0}),t}();export{KetchupButton};