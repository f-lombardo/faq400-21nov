import{a as t}from"./chunk-b401efdc.js";class e{constructor(){this.isVisible=!1,this.mirroredCssVars=[],this.refOffset={},this.portalRootNode=document.body,this.instance=document.createElement("ketchup-portal-instance")}componentWillLoad(){this.portalRootNode.appendChild(this.instance)}componentWillUpdate(){this.instance.vNodes=this.nodes;const e=this.styleNode.cloneNode(!0);e.setAttribute("data-portal-style","true"),this.instance.styleNode=e,t(this.instance,this.refOffset),this.instance.isVisible=this.isVisible}componentDidUnload(){this.portalRootNode.removeChild(this.instance)}onPortalRootNodeChange(t){t.appendChild(this.instance)}computeCssVars(t,e){if(window){const s=window.getComputedStyle(t);e.forEach(t=>{this.instance.style.setProperty(t,s.getPropertyValue(t))})}}async getPortalInstance(){return this.instance}onFrameError(){this.ketchupHtmlError.emit()}onFrameLoaded(){this.ketchupHtmlLoaded.emit()}render(){return null}static get is(){return"ketchup-portal"}static get encapsulation(){return"shadow"}static get properties(){return{cssVarsRef:{type:"Any",attr:"css-vars-ref"},getPortalInstance:{method:!0},isVisible:{type:Boolean,attr:"is-visible"},mirroredCssVars:{type:"Any",attr:"mirrored-css-vars"},nodes:{type:"Any",attr:"nodes"},portalRootNode:{type:"Any",attr:"portal-root-node",watchCallbacks:["onPortalRootNodeChange"]},refOffset:{type:"Any",attr:"ref-offset"},styleNode:{type:"Any",attr:"style-node"}}}static get events(){return[{name:"ketchupHtmlError",method:"ketchupHtmlError",bubbles:!0,cancelable:!1,composed:!0},{name:"ketchupHtmlLoaded",method:"ketchupHtmlLoaded",bubbles:!0,cancelable:!1,composed:!0}]}}class s{constructor(){this.isVisible=!1,this.vNodes=null}componentWillUpdate(){this.port.shadowRoot.querySelector("style[data-portal-style]")||this.port.shadowRoot.insertBefore(this.styleNode,this.port.shadowRoot.querySelector("style"))}render(){return console.log("portal instance",this.vNodes),this.vNodes}static get is(){return"ketchup-portal-instance"}static get encapsulation(){return"shadow"}static get properties(){return{isVisible:{type:Boolean,attr:"is-visible",reflectToAttr:!0},port:{elementRef:!0},styleNode:{type:"Any",attr:"style-node"},vNodes:{type:"Any",attr:"v-nodes"}}}static get style(){return":host{display:none!important;position:absolute!important;z-index:99999!important}:host([is-visible]){display:inline-block!important}"}}export{e as KetchupPortal,s as KetchupPortalInstance};