const t=window.mycomponent.h;class n{constructor(){this.config={}}onBtnClicked(t){this.config.showSelection&&(this.selectedBtnIndex=parseInt(t.target.dataset.id))}render(){let n=[];this.buttons&&(this.config.columns&&this.config.columns>0?this.buttons.forEach((t,o)=>{0==o%this.config.columns&&n.push([]),n[n.length-1].push(t)}):this.config.horizontal?n[0]=this.buttons:n=this.buttons.map(t=>{const n=[];return n.push(t),n}));let o=null,i=0;n.length>0&&(o=n.map(n=>{const o=n.map(n=>{let o=this.config.buttonClass||"";return i===this.selectedBtnIndex&&(o+=" btn-selected"),t("td",null,t("kup-button",{iconUrl:this.config.iconUrl,label:n.value,iconClass:n.iconClass,fillspace:this.config.fillspace,showtext:this.config.showtext,showicon:this.config.showicon,rounded:this.config.rounded,textmode:this.config.textmode,transparent:this.config.transparent,buttonClass:o,flat:this.config.flat,"data-id":i++,onKupButtonClicked:t=>this.onBtnClicked(t),align:this.config.align,class:this.config.fillspace||!this.config.horizontal?"fillspace":""}))});return t("tr",null,o)}));let e="btn-container";this.config.fillspace&&(e+=" fillspace"),this.config.horizontal||(e+=" vertical");const s={};return this.config.btnStyle&&(this.config.btnStyle.fontColor&&(s["--kup-button_text-color"]=this.config.btnStyle.fontColor),this.config.btnStyle.underline&&(s["--kup-button_text-decoration"]="underline"),this.config.btnStyle.fontName&&(s["--kup-button_font-family"]=this.config.btnStyle.fontName),this.config.btnStyle.fontSize&&(s["--kup-button_font-size"]=this.config.btnStyle.fontSize),this.config.btnStyle.bold&&(s["--kup-button_font-weight"]=700),this.config.btnStyle.bckColor&&(s["--kup-button_main-color"]=this.config.btnStyle.bckColor),this.config.btnStyle.italic&&(s["--kup-button_font-style"]="italic"),this.config.borderColor&&(s["--kup-button_border-color"]=this.config.borderColor)),t("table",{class:e,style:s},t("tbody",null,o))}static get is(){return"kup-btn"}static get encapsulation(){return"shadow"}static get properties(){return{buttons:{type:"Any",attr:"buttons"},config:{type:"Any",attr:"config"},selectedBtnIndex:{state:!0}}}static get style(){return".btn-container{border-collapse:collapse}.btn-container.fillspace{width:100%}.btn-container tbody tr td{padding:3px}"}}export{n as KupBtn};