mycomponent.loadBundle("y9kye7tn",["exports","./chunk-3459fe5a.js"],function(t,e){var n=window.mycomponent.h,u=function(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)},i="object"==typeof e.commonjsGlobal&&e.commonjsGlobal&&e.commonjsGlobal.Object===Object&&e.commonjsGlobal,o="object"==typeof self&&self&&self.Object===Object&&self,r=i||o||Function("return this")(),a=function(){return r.Date.now()},l=r.Symbol,c=Object.prototype,s=c.hasOwnProperty,p=c.toString,b=l?l.toStringTag:void 0,h=Object.prototype.toString,d=l?l.toStringTag:void 0,f=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":d&&d in Object(t)?function(t){var e=s.call(t,b),n=t[b];try{t[b]=void 0;var u=!0}catch(t){}var i=p.call(t);return u&&(e?t[b]=n:delete t[b]),i}(t):function(t){return h.call(t)}(t)},m=/^\s+|\s+$/g,v=/^[-+]0x[0-9a-f]+$/i,y=/^0b[01]+$/i,g=/^0o[0-7]+$/i,x=parseInt,I=function(t){if("number"==typeof t)return t;if(function(t){return"symbol"==typeof t||function(t){return null!=t&&"object"==typeof t}(t)&&"[object Symbol]"==f(t)}(t))return NaN;if(u(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=u(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(m,"");var n=y.test(t);return n||g.test(t)?x(t.slice(2),n?2:8):v.test(t)?NaN:+t},j=Math.max,T=Math.min,k=function(t,e,n){var i,o,r,l,c,s,p=0,b=!1,h=!1,d=!0;if("function"!=typeof t)throw new TypeError("Expected a function");function f(e){var n=i,u=o;return i=o=void 0,p=e,l=t.apply(u,n)}function m(t){var n=t-s;return void 0===s||n>=e||n<0||h&&t-p>=r}function v(){var t=a();if(m(t))return y(t);c=setTimeout(v,function(t){var n=e-(t-s);return h?T(n,r-(t-p)):n}(t))}function y(t){return c=void 0,d&&i?f(t):(i=o=void 0,l)}function g(){var t=a(),n=m(t);if(i=arguments,o=this,s=t,n){if(void 0===c)return function(t){return p=t,c=setTimeout(v,e),b?f(t):l}(s);if(h)return c=setTimeout(v,e),f(s)}return void 0===c&&(c=setTimeout(v,e)),l}return e=I(e)||0,u(n)&&(b=!!n.leading,r=(h="maxWait"in n)?j(I(n.maxWait)||0,e):r,d="trailing"in n?!!n.trailing:d),g.cancel=function(){void 0!==c&&clearTimeout(c),p=0,i=s=o=c=void 0},g.flush=function(){return void 0===c?l:y(a())},g},L=function(){function t(){this.initialValue="",this.isClearable=!1,this.label="",this.maxLength=524288,this.debounce=400,this.value="",this.classInputText="ketchup-input-text"}return t.prototype.debounceChanged=function(){var t,e,n;this.ketchupTextInputUpdated=(e=this.debounce,{_original:t=this.ketchupTextInputUpdated,emit:k((n=t._original||t).emit.bind(n),e)})},t.prototype.componentWillLoad=function(){this.value=this.initialValue},t.prototype.componentDidLoad=function(){this.debounceChanged()},t.prototype.triggerFocus=function(){this.inputEl.focus(),this.textInput.focus()},t.prototype.onClearClick=function(){var t=this;this.value="",setTimeout(function(){return t.triggerFocus()},10)},t.prototype.onKeyDown=function(t){"Enter"===t.key&&(t.preventDefault(),this.ketchupTextInputSubmit.emit({value:this.value}))},t.prototype.onInputBlurred=function(t){var e=t.target;this.inputBlur.emit({value:e.value,oldValue:this.value}),this.value=e.value},t.prototype.onInputFocused=function(t){var e=t.target;this.inputFocused.emit({value:e.value,oldValue:this.value}),this.value=e.value},t.prototype.onInputUpdated=function(t){var e=t.target;this.ketchupTextInputUpdated.emit({value:e.value,oldValue:this.value}),this.value=e.value},t.prototype.render=function(){var t=this,e=this.classInputText+"__container",u=null;return this.label&&(u=n("label",{htmlFor:"ketchup-input"},this.label)),n("div",{class:e+(this.isClearable?" "+e+"--clearable":"")},u,n("input",{id:"ketchup-input",class:this.classInputText+(this.isClearable?" "+this.classInputText+"--clearable":""),maxlength:this.maxLength,ref:function(e){return t.textInput=e},tabindex:"0",value:this.value,onBlur:this.onInputBlurred.bind(this),onInput:this.onInputUpdated.bind(this),onFocus:this.onInputFocused.bind(this),onKeyDown:this.onKeyDown.bind(this)}),this.isClearable?n("button",{"aria-label":"Close",class:this.classInputText+"__clear",role:"button",onClick:this.onClearClick.bind(this)},n("svg",{viewBox:"0 0 24 24"},n("path",{d:"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}))):null)},Object.defineProperty(t,"is",{get:function(){return"kup-text-input"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{debounce:{type:Number,attr:"debounce",watchCallbacks:["debounceChanged"]},initialValue:{type:String,attr:"initial-value"},inputEl:{elementRef:!0},isClearable:{type:Boolean,attr:"is-clearable"},label:{type:String,attr:"label"},maxLength:{type:Number,attr:"max-length"},triggerFocus:{method:!0},value:{state:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"events",{get:function(){return[{name:"ketchupTextInputBlurred",method:"inputBlur",bubbles:!0,cancelable:!1,composed:!0},{name:"ketchupTextInputFocused",method:"inputFocused",bubbles:!0,cancelable:!1,composed:!0},{name:"ketchupTextInputSubmit",method:"ketchupTextInputSubmit",bubbles:!0,cancelable:!1,composed:!0},{name:"ketchupTextInputUpdated",method:"ketchupTextInputUpdated",bubbles:!0,cancelable:!1,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return".sc-kup-text-input-h{--int_color:var(--kup-text-input_color,#000);--int_font-size:var(--kup-text-input_font-size,14px);--int_border-color:var(--kup-text-input_border-color,grey);--int_border-color--selected:var(--kup-text-input_border-color--selected,#4e908f);--int_tr-duration:var(--kup-text-input_transition-duration,0.6s);--int_icon-color:var(--kup-text-input_icon-color,grey);--int_icon-color--hover:var(--kup-text-input_icon-color--hover,#676767);display:inline-block}label.sc-kup-text-input{margin-right:.5rem}.ketchup-input-text.sc-kup-text-input{color:var(--int_color);background-color:#fff;border:1px solid var(--int_border-color);border-radius:2px;-webkit-box-sizing:border-box;box-sizing:border-box;outline:none;padding:4px 6px;position:relative;-webkit-transition:background-color var(--int_tr-duration);transition:background-color var(--int_tr-duration);z-index:0}.ketchup-input-text__container.sc-kup-text-input{display:inline-block;position:relative;z-index:0}.ketchup-input-text.sc-kup-text-input:focus, .ketchup-input-text.sc-kup-text-input:hover{border-color:var(--int_border-color--selected)}.ketchup-input-text--clearable.sc-kup-text-input{padding-right:calc(6px + 4px * 2 + var(--int_font-size))}.ketchup-input-text__clear.sc-kup-text-input{-ms-flex-align:center;align-items:center;background-color:transparent;border:none;cursor:pointer;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-pack:center;justify-content:center;margin:0;outline:none;padding:4px;position:absolute;right:6px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);z-index:1}.ketchup-input-text__clear.sc-kup-text-input > svg.sc-kup-text-input{fill:var(--int_icon-color);height:var(--int_font-size);-webkit-transition:fill var(--int_tr-duration);transition:fill var(--int_tr-duration);width:var(--int_font-size)}.ketchup-input-text__clear.sc-kup-text-input:hover > svg.sc-kup-text-input{fill:var(--int_icon-color--hover)}"},enumerable:!0,configurable:!0}),t}();t.KupTextInput=L,Object.defineProperty(t,"__esModule",{value:!0})});