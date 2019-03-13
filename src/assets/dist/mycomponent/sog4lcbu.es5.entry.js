mycomponent.loadBundle("sog4lcbu",["exports","./chunk-99ece03a.js"],function(e,t){var i=window.mycomponent.h,r=function(){function e(){this.label="",this.direction="horizontal",this.displayedField="id",this.items=[],this.radioName="",this.valueField="id",this.selectedRadio=""}return e.prototype.checkDirection=function(e){if(!/horizontal|vertical/.test(e))throw new Error("ketchup-radio: direction must be horizontal or vertical.")},e.prototype.onRadioChanged=function(e){var t=e.target;this.radioChanged.emit({target:t,newValue:t.value,oldValue:this.selectedRadio}),this.selectedRadio=t.value},e.prototype.radioElementsComposer=function(){var e=this;return this.items.map(function(r){var n=t.generateUniqueId(r[e.valueField]);return i("li",{class:"ketchup-radio__item"+(e.selectedRadio===r[e.valueField]?" ketchup-radio__item--selected":"")},i("div",null,i("input",{id:n,type:"radio",name:e.radioName,value:r[e.valueField],onChange:e.onRadioChanged.bind(e)})),i("label",{htmlFor:n},r[e.displayedField]))})},e.prototype.render=function(){var e="ketchup-radio__group";return"horizontal"===this.direction&&(e+=" ketchup-radio__group--horizontal"),i("div",null,this.label?i("p",null,this.label):null,i("ul",{class:e},this.radioElementsComposer()))},Object.defineProperty(e,"is",{get:function(){return"ketchup-radio"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{direction:{type:String,attr:"direction",watchCallbacks:["checkDirection"]},displayedField:{type:String,attr:"displayed-field"},items:{type:"Any",attr:"items"},label:{type:String,attr:"label"},radioName:{type:String,attr:"radio-name"},selectedRadio:{state:!0},valueField:{type:String,attr:"value-field"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"events",{get:function(){return[{name:"ketchupRadioChanged",method:"radioChanged",bubbles:!0,cancelable:!1,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return":host{--rad_font-size:var(--kup-radio_font-size,14px);--rad_border-color:var(--kup-radio_border-color,grey);--rad_border-color--selected:var(--kup-radio_border-color,#676767);--rad_color:var(--kup-radio_color,#4e908f);--rad_tr-duration:var(--kup-radio_transition-duration,0.6s)}.ketchup-radio__group{list-style-type:none;margin:0;padding:0;position:relative;z-index:0}.ketchup-radio__group.ketchup-radio__group--horizontal{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.ketchup-radio__item{margin:10px 12px}.ketchup-radio__item,.ketchup-radio__item>div{-ms-flex-align:center;align-items:center;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-pack:center;justify-content:center;position:relative;z-index:0}.ketchup-radio__item>div{height:calc(var(--rad_font-size) * 1.4);width:calc(var(--rad_font-size) * 1.4)}.ketchup-radio__item>div:after,.ketchup-radio__item>div:before{border-radius:50%;-webkit-box-sizing:border-box;box-sizing:border-box;content:\"\"}.ketchup-radio__item>div:before{border:1px solid var(--rad_border-color);height:100%;left:0;position:absolute;top:0;width:100%;z-index:0}.ketchup-radio__item>div:after{background-color:var(--rad_color);height:calc(100% - 4px);position:relative;opacity:0;-webkit-transition:opacity var(--rad_tr-duration);transition:opacity var(--rad_tr-duration);width:calc(100% - 4px);z-index:1}.ketchup-radio__item>div>input{cursor:pointer;height:100%;left:0;margin:0;opacity:0;position:absolute;top:0;width:100%;z-index:2}.ketchup-radio__item--selected div:after{opacity:1}.ketchup-radio__item label{cursor:pointer;font-size:var(--rad_font-size);margin-left:10px}"},enumerable:!0,configurable:!0}),e}();e.KetchupRadio=r,Object.defineProperty(e,"__esModule",{value:!0})});