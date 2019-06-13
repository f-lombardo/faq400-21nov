mycomponent.loadBundle("y2bjqyxe",["exports","./chunk-1c6f0faf.js"],function(e,t){var i=window.mycomponent.h,a=function(){function e(){this.label="",this.direction="horizontal",this.displayedField="id",this.initialValue={label:"",value:""},this.items=[],this.radioName="",this.valueField="id",this.selectedRadio=null}return e.prototype.checkDirection=function(e){if(!/horizontal|vertical/.test(e))throw new Error("ketchup-radio: direction must be horizontal or vertical.")},e.prototype.componentWillLoad=function(){this.reflectInitialValue(this.initialValue)},e.prototype.reflectInitialValue=function(e,t){t&&e[this.valueField]===t[this.valueField]||this.onRadioChanged(e)},e.prototype.onRadioChanged=function(e){this.ketchupRadioChanged.emit({value:e,oldValue:this.selectedRadio}),this.selectedRadio=e},e.prototype.radioElementsComposer=function(){var e=this;return this.items.map(function(a){var l=t.generateUniqueId(a[e.valueField]);return i("li",{class:"ketchup-radio__item"+(e.selectedRadio&&e.selectedRadio[e.valueField]===a[e.valueField]?" ketchup-radio__item--selected":"")},i("div",null,i("input",{id:l,type:"radio",name:e.radioName,value:a[e.valueField],onChange:e.onRadioChanged.bind(e,a)})),i("label",{htmlFor:l},a[e.displayedField]))})},e.prototype.render=function(){var e="ketchup-radio__group";return"horizontal"===this.direction&&(e+=" ketchup-radio__group--horizontal"),i("div",null,this.label?i("p",null,this.label):null,i("ul",{class:e},this.radioElementsComposer()))},Object.defineProperty(e,"is",{get:function(){return"ketchup-radio"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{direction:{type:String,attr:"direction",watchCallbacks:["checkDirection"]},displayedField:{type:String,attr:"displayed-field"},initialValue:{type:"Any",attr:"initial-value",watchCallbacks:["reflectInitialValue"]},items:{type:"Any",attr:"items"},label:{type:String,attr:"label"},radioName:{type:String,attr:"radio-name"},selectedRadio:{state:!0},valueField:{type:String,attr:"value-field"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"events",{get:function(){return[{name:"ketchupRadioChanged",method:"ketchupRadioChanged",bubbles:!0,cancelable:!1,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return".sc-ketchup-radio-h{--rad_font-size:var(--kup-radio_font-size,14px);--rad_border-color:var(--kup-radio_border-color,grey);--rad_border-color--selected:var(--kup-radio_border-color,#676767);--rad_color:var(--kup-radio_color,#4e908f);--rad_tr-duration:var(--kup-radio_transition-duration,0.6s)}.ketchup-radio__group.sc-ketchup-radio{list-style-type:none;margin:0;padding:0;position:relative;z-index:0}.ketchup-radio__group.ketchup-radio__group--horizontal.sc-ketchup-radio{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.ketchup-radio__item.sc-ketchup-radio{margin:10px 12px}.ketchup-radio__item.sc-ketchup-radio, .ketchup-radio__item.sc-ketchup-radio > div.sc-ketchup-radio{-ms-flex-align:center;align-items:center;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-pack:center;justify-content:center;position:relative;z-index:0}.ketchup-radio__item.sc-ketchup-radio > div.sc-ketchup-radio{height:calc(var(--rad_font-size) * 1.4);width:calc(var(--rad_font-size) * 1.4)}.ketchup-radio__item.sc-ketchup-radio > div.sc-ketchup-radio:after, .ketchup-radio__item.sc-ketchup-radio > div.sc-ketchup-radio:before{border-radius:50%;-webkit-box-sizing:border-box;box-sizing:border-box;content:\"\"}.ketchup-radio__item.sc-ketchup-radio > div.sc-ketchup-radio:before{border:1px solid var(--rad_border-color);height:100%;left:0;position:absolute;top:0;-webkit-transition:border-color var(--rad_tr-duration);transition:border-color var(--rad_tr-duration);width:100%;z-index:0}.ketchup-radio__item.sc-ketchup-radio > div.sc-ketchup-radio:after{background-color:var(--rad_color);height:calc(100% - 6px);position:relative;opacity:0;-webkit-transition:opacity var(--rad_tr-duration);transition:opacity var(--rad_tr-duration);width:calc(100% - 6px);z-index:1}.ketchup-radio__item.sc-ketchup-radio > div.sc-ketchup-radio > input.sc-ketchup-radio{cursor:pointer;height:100%;left:0;margin:0;opacity:0;position:absolute;top:0;width:100%;z-index:2}.ketchup-radio__item--selected.sc-ketchup-radio   div.sc-ketchup-radio:before{border-color:var(--rad_border-color--selected)}.ketchup-radio__item--selected.sc-ketchup-radio   div.sc-ketchup-radio:after{opacity:1}.ketchup-radio__item.sc-ketchup-radio   label.sc-ketchup-radio{cursor:pointer;font-size:var(--rad_font-size);margin-left:10px}"},enumerable:!0,configurable:!0}),e}();e.KetchupRadio=a,Object.defineProperty(e,"__esModule",{value:!0})});