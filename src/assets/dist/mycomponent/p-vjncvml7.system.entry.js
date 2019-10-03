System.register(["./p-a690b875.system.js","./p-2877f8e8.system.js","./p-2cdd5564.system.js"],function(e){"use strict";var t,n,i,s,r,o,a,l,d,c;return{setters:[function(e){t=e.r;n=e.c;i=e.h},function(){},function(e){s=e.i;r=e.b;o=e.e;a=e.h;l=e.j;d=e.m;c=e.q}],execute:function(){var h="isExpanded";var u=function(){function e(e){t(this,e);this.data=[];this.expanded=false;this.showColumns=false;this.showHeader=false;this.showIcons=true;this.selectedNode=[];this.showObjectNavigation=false;this.useDynamicExpansion=false;this.dynamicExpansionCallback=undefined;this.visibleColumns=[];this.selectedNodeString="";this.stateSwitcher=false;this.kupOptionClicked=n(this,"kupOptionClicked",6);this.kupTreeNodeCollapse=n(this,"kupTreeNodeCollapse",6);this.kupTreeNodeExpand=n(this,"kupTreeNodeExpand",6);this.kupTreeNodeSelected=n(this,"kupTreeNodeSelected",6)}e.prototype.componentWillLoad=function(){var e=this;if(this.data){this.data.forEach(function(t){e.enrichWithIsExpanded(t,e.expanded&&!e.useDynamicExpansion&&!t.disabled)})}if(Array.isArray(this.selectedNode)){this.selectedNodeString=this.selectedNode.toString()}};e.prototype.enrichDataWhenChanged=function(e,t){var n=this;if(e!==t){e.forEach(function(e){n.enrichWithIsExpanded(e,n.expanded&&!n.useDynamicExpansion&&!e.disabled)})}};e.prototype.selectedNodeToStr=function(e){if(Array.isArray(e)){this.selectedNodeString=e.toString()}};e.prototype.enrichWithIsExpanded=function(e,t){if(t===void 0){t=false}if(e.expandable){e[h]=e.hasOwnProperty(h)?e[h]||t:t;if(e.children&&e.children.length){for(var n=0;n<e.children.length;n++){if(e.children[n].expandable){this.enrichWithIsExpanded(e.children[n],t&&!e.children[n].disabled)}}}}};e.prototype.forceUpdate=function(){this.stateSwitcher=!this.stateSwitcher};e.prototype.hdlTreeNodeClicked=function(e,t){if(!e.disabled){this.kupTreeNodeSelected.emit({treeNodePath:t.split(",").map(function(e){return parseInt(e)}),treeNode:e})}};e.prototype.hdlTreeNodeExpanderClicked=function(e,t){var n=this;if(e.expandable){var i=t.split(",").map(function(e){return parseInt(e)});if(e.children&&e.children.length){e[h]=!e[h];this.forceUpdate();if(e[h]){this.kupTreeNodeExpand.emit({treeNodePath:i,treeNode:e,usesDynamicExpansion:this.useDynamicExpansion})}else{this.kupTreeNodeCollapse.emit({treeNodePath:i,treeNode:e})}}else if(this.useDynamicExpansion&&!this.expanded){if(this.dynamicExpansionCallback){this.dynamicExpansionCallback(e,i).then(function(t){e.children=t;e[h]=!e[h];n.forceUpdate();n.kupTreeNodeExpand.emit({treeNodePath:i,treeNode:e,usesDynamicExpansion:true})}).catch(function(t){console.error("KupTree: An error occurred when trying to fetch dynamicExpansion nodes data",t,e)})}else{this.kupTreeNodeExpand.emit({treeNode:e,treeNodePath:i,usesDynamicExpansion:true,dynamicExpansionRequireChildren:true})}}}};e.prototype.hdlOptionClicked=function(e,t,n,i){e.stopPropagation();this.kupOptionClicked.emit({cell:t,column:n,treeNode:i})};e.prototype.selectedNodeToString=function(e){var t="";if(e&&e.length){t=e[0].toString();for(var n=1;n<e.length;n++){t+=","+e[0]}}return t};e.prototype.renderOptionElement=function(e,t,n){var s=this;return i("span",{"aria-label":"Opzioni oggetto",class:"options mdi mdi-settings",role:"button",title:"Opzioni oggetto",onClick:function(i){return s.hdlOptionClicked(i,e,t,n)}})};e.prototype.renderCell=function(e,t,n){var h=n!==e.value?e.value:"";var u=h;if(s(e.obj)||r(e.obj)){u=i("span",{class:h})}else if(o(e.obj)){u=i("img",{src:h,alt:"",width:"64",height:"64"})}else if(a(e.obj)){u=i("a",{href:h,target:"_blank"},h)}else if(l(e.obj)){u=i("kup-checkbox",{checked:!!e.obj.k,disabled:t.treeNode.hasOwnProperty("readOnly")?t.treeNode.readOnly:true})}else if(d(e.obj)){var p={value:e.value};u=h?i("kup-graphic-cell",Object.assign({},p)):null}var f=[];f.push(i("span",{class:"cell-content",style:c(e)?e.style:null},u));if(!t.treeNode.disabled&&e.options&&this.showObjectNavigation){f.push(this.renderOptionElement(e,t.column,t.treeNode))}return i("td",{style:!c(e)?e.style:null},f)};e.prototype.renderHeader=function(){return this.visibleColumns.map(function(e){return i("th",null,i("span",{class:"column-title"},e.title))})};e.prototype.renderTreeNode=function(e,t,n){var s;var r=this;if(n===void 0){n=0}var o=n?i("span",{class:"kup-tree__indent",style:(s={},s["--tree-node_depth"]=n.toString(),s)}):null;var a=!!(e.expandable&&(e.children&&e.children.length||this.useDynamicExpansion));var l=i("span",{class:"kup-tree__icon kup-tree__node__expander"+(a?" mdi mdi-menu-down":""),onClick:a&&!e.disabled?function(){return r.hdlTreeNodeExpanderClicked(e,t)}:null});var d=this.showIcons?i("span",{class:"kup-tree__icon mdi mdi-"+e.iconClass}):null;var c={};if(e.hasOwnProperty(h)&&e[h]&&a){c["data-is-expanded"]=e[h]}var u=null;if(!e.disabled){c["onClick"]=function(){r.hdlTreeNodeClicked(e,t)};if(e.options&&this.showObjectNavigation){u=this.renderOptionElement({obj:e.obj,value:e.value},{name:"TreeNodeCell",title:"TreeNodeCell"},e)}}var p=null;if(this.showColumns&&this.visibleColumns&&this.visibleColumns.length){p=[];for(var f=0;f<this.visibleColumns.length;f++){var m=this.visibleColumns[f];p.push(this.renderCell(e.cells[m.name],{column:m,treeNode:e}))}}return i("tr",Object.assign({class:{"kup-tree__node":true,"kup-tree__node--disabled":e.disabled,"kup-tree__node--selected":!e.disabled&&t===this.selectedNodeString},"data-tree-path":t},c),i("td",{style:e.style||null},o,l,d,i("span",{class:"cell-content"},e.value),u),p)};e.prototype.renderTree=function(e,t,n){if(n===void 0){n=0}var i=[];if(e){i.push(this.renderTreeNode(e,t,n));if(e.expandable&&e.children&&e.children.length&&e[h]){for(var s=0;s<e.children.length;s++){i=i.concat(this.renderTree(e.children[s],t+","+s,n+1))}}}return i};e.prototype.render=function(){var e=this;if(this.showColumns&&this.columns){this.visibleColumns=this.columns.filter(function(e){return e.hasOwnProperty("visible")?e.visible:true})}var t=[];if(this.data&&this.data.length){this.data.forEach(function(n,i){t=t.concat(e.renderTree(n,i.toString()))})}else{t.push(i("tr",null,i("td",null,"Nessun elemento nell'albero")))}var n=this.showHeader&&this.showColumns;return[i("link",{href:"https://cdn.materialdesignicons.com/3.2.89/css/materialdesignicons.min.css",rel:"stylesheet",type:"text/css"}),i("table",{class:"kup-tree","data-show-columns":this.showColumns,"data-show-object-navigation":this.showObjectNavigation},i("thead",{class:{"header--is-visible":n}},i("tr",null,i("th",null),n?this.renderHeader():null)),i("tbody",null,t))]};Object.defineProperty(e,"watchers",{get:function(){return{data:["enrichDataWhenChanged"],selectedNode:["selectedNodeToStr"]}},enumerable:true,configurable:true});Object.defineProperty(e,"style",{get:function(){return":host{--tre_node-expander_background-color:var(--kup-tre_node-expander_background-color,#e0e0e0);--tre_node-expander_color:var(--kup-tre_node-expander_color,#545454);--tre_node_background-color--hover:var(--kup-tre_node_background-color--hover,#e6e6e6);--tre_node-icon_color:var(--kup-tre_node-icon_color,#545454);--tre_node-icon_size:var(--kup-tre_node-icon_size,16px);--tre_node-indent_width:var(--kup-tre_node-indent_width,16px);--tre_node--disabled_opacity:var(--kup-tre_node--disabled_opacity,.7);--tre_table_border-bottom-color:var(--kup-tre_table_border-bottom-color,#e0e0e0);--tre_table-header_background-color:var(--kup-tre_table-header_background-color,grey);--tre_table-header_color:var(--kup-tre_table-header_color,#fff);--tre_table-header_font-weight:var(--kup-tre_table-header_font-weight,400);display:block}.kup-tree{border-collapse:collapse;width:100%}.kup-tree thead{display:none}.kup-tree thead.header--is-visible{display:table-header-group}.kup-tree thead th{background-color:var(--tre_table-header_background-color);color:var(--tre_table-header_color);font-weight:var(--tre_table-header_font-weight);text-align:left}.kup-tree__indent{display:inline-block;width:calc(var(--tre_node-indent_width) * var(--tree-node_depth, 0))}.kup-tree .options,.kup-tree__icon{-ms-flex-align:center;align-items:center;color:var(--tre_node-icon_color);display:-ms-inline-flexbox;display:inline-flex;font-size:var(--tre_node-icon_size);height:var(--tre_node-icon_size);-ms-flex-pack:center;justify-content:center;width:var(--tre_node-icon_size)}.kup-tree__node>*{vertical-align:middle}.kup-tree__node--disabled{opacity:var(--tre_node--disabled_opacity)}.kup-tree__node--disabled .kup-tree__node__expander{cursor:auto;pointer-events:none}.kup-tree__node__expander{border-radius:50%;color:var(--tre_node-expander_color);cursor:pointer;-webkit-transition:background-color .4s,-webkit-box-shadow .4s,-webkit-transform .4s;transition:background-color .4s,-webkit-box-shadow .4s,-webkit-transform .4s;transition:background-color .4s,box-shadow .4s,transform .4s;transition:background-color .4s,box-shadow .4s,transform .4s,-webkit-box-shadow .4s,-webkit-transform .4s}.kup-tree__node__expander:hover{background-color:var(--tre_node-expander_background-color);-webkit-box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24)}.kup-tree__node[data-is-expanded] .kup-tree__node__expander{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.kup-tree__node[data-is-expanded] .kup-tree__node__expander:hover{-webkit-box-shadow:rgba(0,0,0,.12) 0 -1px 3px,rgba(0,0,0,.24) 0 -1px 2px;box-shadow:0 -1px 3px rgba(0,0,0,.12),0 -1px 2px rgba(0,0,0,.24)}.kup-tree__node .options{cursor:pointer;float:right;margin-left:8px;opacity:0;-webkit-transition:opacity .6s,visibility .6s;transition:opacity .6s,visibility .6s}.kup-tree__node .options:before{height:inherit;width:inherit}.kup-tree__node--selected>td,.kup-tree__node:hover>td{background-color:var(--tre_node_background-color--hover)}.kup-tree[data-show-columns] .kup-tree__node{border-bottom:solid 1px var(--tre_table_border-bottom-color)}.kup-tree[data-show-object-navigation] .kup-tree__node:hover .options{opacity:1;visibility:visible}.kup-tree[data-show-object-navigation] .kup-tree__node:hover .options:hover{opacity:.54}"},enumerable:true,configurable:true});return e}();e("kup_tree",u)}}});