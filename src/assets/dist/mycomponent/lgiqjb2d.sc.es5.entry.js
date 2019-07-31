mycomponent.loadBundle("lgiqjb2d",["exports","./chunk-2a6f2324.js"],function(e,t){var i=window.mycomponent.h,a=function(){function e(){this.label="",this.direction="horizontal",this.displayedField="id",this.initialValue={label:"",value:""},this.items=[],this.radioName="",this.valueField="id",this.selectedRadio=null}return e.prototype.checkDirection=function(e){if(!/horizontal|vertical/.test(e))throw new Error("kup-radio: direction must be horizontal or vertical.")},e.prototype.componentWillLoad=function(){this.reflectInitialValue(this.initialValue)},e.prototype.reflectInitialValue=function(e,t){t&&e[this.valueField]===t[this.valueField]||this.onRadioChanged(e)},e.prototype.onRadioChanged=function(e){this.ketchupRadioChanged.emit({value:e,oldValue:this.selectedRadio,info:{}}),this.selectedRadio=e},e.prototype.radioElementsComposer=function(){var e=this;return this.items.map(function(a){var n=t.generateUniqueId(a[e.valueField]);return i("li",{class:"kup-radio__item"+(e.selectedRadio&&e.selectedRadio[e.valueField]===a[e.valueField]?" kup-radio__item--selected":"")},i("div",null,i("input",{id:n,type:"radio",name:e.radioName,value:a[e.valueField],onChange:e.onRadioChanged.bind(e,a)})),i("label",{htmlFor:n},a[e.displayedField]))})},e.prototype.render=function(){var e="kup-radio__group";return"horizontal"===this.direction&&(e+=" kup-radio__group--horizontal"),i("div",null,this.label?i("p",null,this.label):null,i("ul",{class:e},this.radioElementsComposer()))},Object.defineProperty(e,"is",{get:function(){return"kup-radio"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{direction:{type:String,attr:"direction",watchCallbacks:["checkDirection"]},displayedField:{type:String,attr:"displayed-field"},initialValue:{type:"Any",attr:"initial-value",watchCallbacks:["reflectInitialValue"]},items:{type:"Any",attr:"items"},label:{type:String,attr:"label"},radioName:{type:String,attr:"radio-name"},selectedRadio:{state:!0},valueField:{type:String,attr:"value-field"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"events",{get:function(){return[{name:"ketchupRadioChanged",method:"ketchupRadioChanged",bubbles:!0,cancelable:!1,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return".sc-kup-radio-h{--rad_font-size:var(--kup-radio_font-size,14px);--rad_border-color:var(--kup-radio_border-color,grey);--rad_border-color--selected:var(--kup-radio_border-color,#676767);--rad_color:var(--kup-radio_color,#4e908f);--rad_tr-duration:var(--kup-radio_transition-duration,0.6s)}.kup-radio__group.sc-kup-radio{list-style-type:none;margin:0;padding:0;position:relative;z-index:0}.kup-radio__group.kup-radio__group--horizontal.sc-kup-radio{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.kup-radio__item.sc-kup-radio{display:-ms-flexbox;display:flex;margin:10px 12px}.kup-radio__item.sc-kup-radio, .kup-radio__item.sc-kup-radio > div.sc-kup-radio{-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;position:relative;z-index:0}.kup-radio__item.sc-kup-radio > div.sc-kup-radio{display:-ms-inline-flexbox;display:inline-flex;height:calc(var(--rad_font-size) * 1.4);width:calc(var(--rad_font-size) * 1.4)}.kup-radio__item.sc-kup-radio > div.sc-kup-radio:after, .kup-radio__item.sc-kup-radio > div.sc-kup-radio:before{border-radius:50%;-webkit-box-sizing:border-box;box-sizing:border-box;content:\"\"}.kup-radio__item.sc-kup-radio > div.sc-kup-radio:before{border:1px solid var(--rad_border-color);height:100%;left:0;position:absolute;top:0;-webkit-transition:border-color var(--rad_tr-duration);transition:border-color var(--rad_tr-duration);width:100%;z-index:0}.kup-radio__item.sc-kup-radio > div.sc-kup-radio:after{background-color:var(--rad_color);height:calc(100% - 6px);position:relative;opacity:0;-webkit-transition:opacity var(--rad_tr-duration);transition:opacity var(--rad_tr-duration);width:calc(100% - 6px);z-index:1}.kup-radio__item.sc-kup-radio > div.sc-kup-radio > input.sc-kup-radio{cursor:pointer;height:100%;left:0;margin:0;opacity:0;position:absolute;top:0;width:100%;z-index:2}.kup-radio__item--selected.sc-kup-radio   div.sc-kup-radio:before{border-color:var(--rad_border-color--selected)}.kup-radio__item--selected.sc-kup-radio   div.sc-kup-radio:after{opacity:1}.kup-radio__item.sc-kup-radio   label.sc-kup-radio{cursor:pointer;font-size:var(--rad_font-size);margin-left:10px}"},enumerable:!0,configurable:!0}),e}();e.KupRadio=a,Object.defineProperty(e,"__esModule",{value:!0})});