const s=window.mycomponent.h;class e{constructor(){this.layout="1",this.fontsize=""}onDshClickedHandler(){this.ketchupDashClicked.emit()}render(){let e=null;switch(this.layout){case"2":e=s("div",null,s("div",{class:"icon"},s("slot",{name:"icon"})),s("div",{class:"value-int"},s("slot",{name:"value-int"})),s("div",{class:"value-dec"},s("slot",{name:"value-dec"})),s("div",{class:"unit"},s("slot",{name:"unit"})));break;case"3":e=s("div",null,s("div",{class:"value"},s("slot",{name:"value"})),s("div",{class:"descr"},s("slot",{name:"descr"})));break;case"4":e=s("div",null,s("div",{class:"icon"},s("slot",{name:"icon"})),s("div",{class:"value-and-unit"},s("div",{class:"value-int"},s("slot",{name:"value-int"})),s("div",{class:"value-dec"},s("slot",{name:"value-dec"})),s("div",{class:"unit"},s("slot",{name:"unit"}))),s("div",null),s("div",{class:"descr"},s("slot",{name:"descr"})));break;case"5":e=s("div",null,s("div",null,s("div",{class:"descr"},s("slot",{name:"descr"})),s("div",{class:"value"},s("slot",{name:"value"}))),s("div",{class:"icon"},s("slot",{name:"icon"})));break;case"6":e=s("div",null,s("div",{class:"icon"},s("slot",{name:"icon"})),s("div",null,s("div",{class:"value"},s("slot",{name:"value"})),s("div",{class:"descr"},s("slot",{name:"descr"}))));break;case"7":e=s("div",null,s("div",null,s("div",{class:"value"},s("slot",{name:"value"})),s("div",{class:"descr"},s("slot",{name:"descr"}))),s("div",{class:"icon"},s("slot",{name:"icon"})));break;case"8":e=s("div",null,s("div",{class:"icon"},s("slot",{name:"icon"})),s("div",{class:"value"},s("slot",{name:"value"})),s("div",{class:"descr"},s("slot",{name:"descr"})));break;default:e=s("div",null,s("div",{class:"descr"},s("slot",{name:"descr"})),s("div",{class:"value"},s("slot",{name:"value"})))}return s("div",{id:"dash",style:{fontSize:this.fontsize},onClick:()=>this.onDshClickedHandler()},s("div",{id:"content",class:`layout-${this.layout}`},e))}static get is(){return"kup-dash"}static get encapsulation(){return"shadow"}static get properties(){return{fontsize:{type:String,attr:"fontsize"},layout:{type:String,attr:"layout"}}}static get events(){return[{name:"ketchupDashClicked",method:"ketchupDashClicked",bubbles:!0,cancelable:!0,composed:!0}]}static get style(){return":host{--dash_bkg-color:var(--kup-dash_background-color,transparent);--dash_color:var(--kup-dash_color,#fff);--dash_border-color:var(--kup-dash_border-color,transparent)}#dash{background-color:var(--dash_bkg-color);border:1px solid var(--dash_border-color);min-height:170px;font-size:2vw;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;text-align:center;position:relative;word-break:normal}#dash #content .icon{margin:auto;font-size:90%}#dash #content.layout-1,#dash #content.layout-3{text-align:center}#dash #content.layout-1 .descr,#dash #content.layout-3 .descr{font-size:70%;width:100%}#dash #content.layout-1 .value,#dash #content.layout-3 .value{font-size:220%;padding:2% 0}#dash #content.layout-2>div{display:-ms-flexbox;display:flex}#dash #content.layout-2>div .icon{margin:auto;font-size:100%;margin-right:10%}#dash #content.layout-2>div .value-int{font-size:250%}#dash #content.layout-2>div .unit,#dash #content.layout-2>div .value-dec{font-size:130%;margin-top:auto;margin-bottom:4%}#dash #content.layout-2>div .unit{margin-left:4%}#dash #content.layout-4>div{display:grid;grid-template-columns:2fr 5fr}#dash #content.layout-4>div .icon{margin:auto;font-size:100%;margin-right:10%}#dash #content.layout-4>div .value-and-unit{display:-ms-flexbox;display:flex}#dash #content.layout-4>div .value-and-unit .value-int{font-size:250%}#dash #content.layout-4>div .value-and-unit .unit,#dash #content.layout-4>div .value-and-unit .value-dec{font-size:130%;margin-top:auto;margin-bottom:4%}#dash #content.layout-4>div .descr{margin-left:4%;text-align:left;font-size:80%;width:100%;min-width:-webkit-max-content;min-width:-moz-max-content;min-width:max-content}#dash #content.layout-5>div,#dash #content.layout-7>div{display:-ms-flexbox;display:flex}#dash #content.layout-5>div .icon,#dash #content.layout-7>div .icon{font-size:150%;margin:auto;margin-left:10%}#dash #content.layout-5>div .value,#dash #content.layout-7>div .value{font-size:200%}#dash #content.layout-5>div .descr,#dash #content.layout-7>div .descr{text-align:right;font-size:65%;width:100%;min-width:-webkit-max-content;min-width:-moz-max-content;min-width:max-content}#dash #content.layout-6>div{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}#dash #content.layout-6>div .icon{font-size:150%;margin-right:10%}#dash #content.layout-6>div .value{font-size:220%;text-align:right}#dash #content.layout-6>div .descr{font-size:80%;text-align:right;width:100%;min-width:-webkit-max-content;min-width:-moz-max-content;min-width:max-content}#dash #content.layout-8>div{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}#dash #content.layout-8>div .icon{margin-right:4%;font-size:75%}#dash #content.layout-8>div .value{margin-right:4%;font-size:250%}#dash #content.layout-8>div .descr{font-size:60%;text-align:left;word-spacing:10000px}"}}export{e as KupDash};