import{r as e,c as s,h as t}from"./p-df6a2f70.js";class i{constructor(t){e(this,t),this.images=[],this.size=64,this.showDescription=!1,this.allowMultiSelection=!1,this.selectedImages=[],this.kupImageButtonSelected=s(this,"kupImageButtonSelected",7)}onImageClick(e){const s=this.selectedImages.indexOf(e);this.allowMultiSelection?(s>=0?this.selectedImages.splice(s,1):this.selectedImages.push(e),this.selectedImages=[...this.selectedImages]):this.selectedImages=s>=0?[]:[e],this.kupImageButtonSelected.emit({selectedImages:this.selectedImages})}render(){let e=null;return this.images.length>0&&(e=this.images.map(e=>{const s={selected:this.selectedImages.includes(e)};return t("div",{class:s,onClick:()=>this.onImageClick(e),style:{width:`${this.size}px`}},t("img",{src:e.src,title:e.description}),this.showDescription?e.description:null,t("div",{class:"overlay"}))})),t("div",{id:"container"},e)}static get style(){return":host{--imb_color:var(--kup-imb_color,#545454)}#container{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-align:center;align-items:center;color:var(--imb_color)}#container>div{margin:0 3px;position:relative;text-align:center;padding:5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#container>div>img{display:block;width:100%;height:100%}#container>div>.overlay{position:absolute;top:0;left:0;opacity:0;-webkit-transition:opacity .25s linear;transition:opacity .25s linear;background-color:#000;width:100%;height:100%}#container>div.selected>.overlay,#container>div:hover>.overlay{-webkit-transition:opacity .25s linear;transition:opacity .25s linear;opacity:.6}"}}export{i as kup_image_button};