const t=window.mycomponent.h;class e{constructor(){this.buttonClass="",this.fillspace=!1,this.showtext=!0,this.showicon=!0,this.horizontal=!0,this.rounded=!1,this.flat=!1,this.transparent=!1,this.showSelection=!1,this.btnStyle={}}onShowSelectionChanged(t){!t&&this.buttons&&(this.selectedBtnIndex=-1)}onBtnClicked(t){this.showSelection&&(this.selectedBtnIndex=parseInt(t.target.dataset.id))}render(){let e=[];this.columns&&this.columns>0?this.buttons.forEach((t,n)=>{0==n%this.columns&&e.push([]),e[e.length-1].push(t)}):this.horizontal?e[0]=this.buttons:e=this.buttons.map(t=>{const e=[];return e.push(t),e});let n=null,s=0;e.length>0&&(n=e.map(e=>{const n=e.map(e=>{let n=this.buttonClass||"";return s===this.selectedBtnIndex&&(n+=" btn-selected"),t("td",null,t("ketchup-button",{iconUrl:this.iconUrl,label:e.value,iconClass:e.iconClass,fillspace:this.fillspace,showtext:this.showtext,showicon:this.showicon,rounded:this.rounded,textmode:this.textmode,transparent:this.transparent,borderColor:this.borderColor,buttonClass:n,flat:this.flat,"data-id":s++,onKetchupButtonClicked:t=>this.onBtnClicked(t),align:this.align,class:this.fillspace?"fillspace":"",btnStyle:this.btnStyle}))});return t("tr",null,n)}));let o="btn-container";return this.fillspace&&(o+=" fillspace"),this.horizontal||(o+=" vertical"),t("table",{class:o},t("tbody",null,n))}static get is(){return"ketchup-btn"}static get encapsulation(){return"shadow"}static get properties(){return{align:{type:String,attr:"align"},borderColor:{type:String,attr:"border-color"},btnStyle:{type:"Any",attr:"btn-style"},buttonClass:{type:String,attr:"button-class"},buttons:{type:"Any",attr:"buttons"},columns:{type:Number,attr:"columns"},fillspace:{type:Boolean,attr:"fillspace"},flat:{type:Boolean,attr:"flat"},horizontal:{type:Boolean,attr:"horizontal"},iconUrl:{type:String,attr:"icon-url"},rounded:{type:Boolean,attr:"rounded"},selectedBtnIndex:{state:!0},showicon:{type:Boolean,attr:"showicon"},showSelection:{type:Boolean,attr:"show-selection",watchCallbacks:["onShowSelectionChanged"]},showtext:{type:Boolean,attr:"showtext"},textmode:{type:String,attr:"textmode"},transparent:{type:Boolean,attr:"transparent"}}}static get style(){return".btn-container{border-collapse:collapse}.btn-container.fillspace{width:100%}.btn-container tbody tr td{padding:3px}"}}export{e as KetchupBtn};