var __awaiter=this&&this.__awaiter||function(t,e,o,r){return new(o||(o=Promise))(function(n,i){function s(t){try{l(r.next(t))}catch(t){i(t)}}function a(t){try{l(r["throw"](t))}catch(t){i(t)}}function l(t){t.done?n(t.value):new o(function(e){e(t.value)}).then(s,a)}l((r=r.apply(t,e||[])).next())})};var __generator=this&&this.__generator||function(t,e){var o={label:0,sent:function(){if(i[0]&1)throw i[1];return i[1]},trys:[],ops:[]},r,n,i,s;return s={next:a(0),throw:a(1),return:a(2)},typeof Symbol==="function"&&(s[Symbol.iterator]=function(){return this}),s;function a(t){return function(e){return l([t,e])}}function l(s){if(r)throw new TypeError("Generator is already executing.");while(o)try{if(r=1,n&&(i=s[0]&2?n["return"]:s[0]?n["throw"]||((i=n["return"])&&i.call(n),0):n.next)&&!(i=i.call(n,s[1])).done)return i;if(n=0,i)s=[s[0]&2,i.value];switch(s[0]){case 0:case 1:i=s;break;case 4:o.label++;return{value:s[1],done:false};case 5:o.label++;n=s[1];s=[0];continue;case 7:s=o.ops.pop();o.trys.pop();continue;default:if(!(i=o.trys,i=i.length>0&&i[i.length-1])&&(s[0]===6||s[0]===2)){o=0;continue}if(s[0]===3&&(!i||s[1]>i[0]&&s[1]<i[3])){o.label=s[1];break}if(s[0]===6&&o.label<i[1]){o.label=i[1];i=s;break}if(i&&o.label<i[2]){o.label=i[2];o.ops.push(s);break}if(i[2])o.ops.pop();o.trys.pop();continue}s=e.call(t,o)}catch(t){s=[6,t];n=0}finally{r=i=0}if(s[0]&5)throw s[1];return{value:s[0]?s[1]:void 0,done:true}}};System.register(["./p-a690b875.system.js","./p-2877f8e8.system.js","./p-61a18256.system.js"],function(t){"use strict";var e,o,r,n,i,s,a,l,u,c,h,d,p,f,g,m,w,v,R,b,y,C;return{setters:[function(t){e=t.r;o=t.c;r=t.h},function(){},function(t){n=t.L;i=t.P;s=t.S;a=t.c;l=t.f;u=t.a;c=t.g;h=t.s;d=t.i;p=t.b;f=t.d;g=t.e;m=t.h;w=t.j;v=t.k;R=t.l;b=t.m;y=t.K;C=t.n}],execute:function(){var k=function(){function t(t){e(this,t);this.columnsWidth=[];this.enableSortableColumns=false;this.expandGroups=false;this.filters={};this.globalFilter=false;this.groups=[];this.headerIsPersistent=false;this.multiSelection=false;this.loadMoreLimit=1e3;this.loadMoreStep=60;this.loadMoreMode=n.PROGRESSIVE_THRESHOLD;this.paginatorPos=i.TOP;this.rowsPerPage=10;this.showHeader=true;this.showFilters=false;this.showGrid=s.COMPLETE;this.showLoadMore=false;this.sortEnabled=true;this.sort=[];this.sortableColumnsMutateData=true;this.globalFilterValue="";this.currentPage=1;this.currentRowsPerPage=10;this.selectedRows=[];this.groupState={};this.openedMenu=null;this.density="medium";this.renderedRows=[];this.loadMoreEventCounter=0;this.loadMoreEventPreviousQuantity=0;this.columnsAreBeingDragged=false;this.dragFlagAttribute="columns-dragging";this.dragOverAttribute="drag-over";this.dragStarterAttribute="drag-starter";this.kupAutoRowSelect=o(this,"kupAutoRowSelect",6);this.kupRowSelected=o(this,"kupRowSelected",6);this.kupOptionClicked=o(this,"kupOptionClicked",6);this.kupAddColumn=o(this,"kupAddColumn",6);this.kupRowActionClicked=o(this,"kupRowActionClicked",6);this.kupLoadMoreClicked=o(this,"kupLoadMoreClicked",6);this.kupCellButtonClicked=o(this,"kupCellButtonClicked",6);this.kupDataTableSortedColumn=o(this,"kupDataTableSortedColumn",6)}t.prototype.rowsPerPageHandler=function(t){this.currentRowsPerPage=t};t.prototype.expandGroupsHandler=function(){this.groupState={};this.forceGroupExpansion()};t.prototype.recalculateRows=function(){this.initRows()};t.prototype.componentWillLoad=function(){this.rowsPerPageHandler(this.rowsPerPage);this.initRows();if(this.expandGroups){this.forceGroupExpansion()}};t.prototype.componentDidLoad=function(){if(this.selectRow&&this.selectRow>0){if(this.selectRow<=this.renderedRows.length){this.selectedRows=[];this.selectedRows.push(this.renderedRows[this.selectRow-1]);this.kupAutoRowSelect.emit({selectedRow:this.selectedRows[0]})}}};t.prototype.getColumns=function(){return this.data&&this.data.columns?this.data.columns:[{title:"",name:"",size:0}]};t.prototype.getVisibleColumns=function(){var t=this;var e=this.getColumns().filter(function(t){if(t.hasOwnProperty("visible")){return t.visible}return true});if(this.isGrouping()){return e.filter(function(e){var o=null;for(var r=0,n=t.groups;r<n.length;r++){var i=n[r];if(i.column===e.name){o=i;break}}if(o){return!o.hasOwnProperty("visible")||o.visible}return true})}return e};t.prototype.getGroupByName=function(t){if(!this.isGrouping()){return null}for(var e=0,o=this.groups;e<o.length;e++){var r=o[e];if(r.column===t){return r}}return null};t.prototype.getRows=function(){return this.data&&this.data.rows?this.data.rows:[]};t.prototype.initRows=function(){this.filterRows();this.footer=a(this.rows,this.totals);this.groupRows();this.sortRows();this.paginatedRows=this.paginateRows(this.rows)};t.prototype.filterRows=function(){this.rows=l(this.getRows(),this.filters,this.globalFilterValue,this.getVisibleColumns().map(function(t){return t.name}))};t.prototype.isGrouping=function(){return this.groups&&this.groups.length>0};t.prototype.hasRowActions=function(){return this.rowActions!==undefined};t.prototype.removeGroup=function(t){this.groupState={};var e=this.groups.indexOf(t);if(e>=0){this.groups.splice(e,1);this.groups=this.groups.slice()}};t.prototype.hasTotals=function(){return this.totals&&Object.keys(this.totals).length>0};t.prototype.forceGroupExpansion=function(){var t=this;this.rows.forEach(function(e){return t.forceRowGroupExpansion(e)})};t.prototype.forceRowGroupExpansion=function(t){var e=this;if(!t.group){return}t.group.expanded=true;var o=this.groupState[t.group.id];if(!o){o={expanded:this.expandGroups}}else{o.expanded=this.expandGroups}this.groupState[t.group.id]=o;if(t.group.children){t.group.children.forEach(function(t){return e.forceRowGroupExpansion(t)})}};t.prototype.onColumnSort=function(t,e){var o=t.ctrlKey;var r=0;for(;r<this.sort.length;r++){var n=this.sort[r];if(n.column===e){break}}if(r<this.sort.length){var n=this.sort[r];var i=Object.assign({},n,{sortMode:n.sortMode===u.A?u.D:u.A});if(o){var s=this.sort.slice();s[r]=i;this.sort=s}else{this.sort=[i]}}else{var n={column:e,sortMode:u.A};if(o){this.sort=this.sort.concat([n])}else{this.sort=[n]}}};t.prototype.onFilterChange=function(t,e){var o=t.detail;this.currentPage=1;var r=Object.assign({},this.filters);if(o.value.length===0){delete r[e]}else{r[e]=o.value}this.filters=r};t.prototype.onGlobalFilterChange=function(t){var e=t.detail;this.currentPage=1;this.globalFilterValue=e.value};t.prototype.handlePageChanged=function(t){var e=t.detail;this.currentPage=e.newPage};t.prototype.handleRowsPerPageChanged=function(t){var e=t.detail;this.currentRowsPerPage=e.newRowsPerPage};t.prototype.onRowClick=function(t,e){this.handleRowSelect(e,t.ctrlKey);var o=t.target;var r=null;if(o instanceof HTMLElement){if(o.tagName!=="TR"){var n=o;while(n.tagName!=="TD"){n=n.parentElement}r=n.dataset.column}}this.kupRowSelected.emit({selectedRows:this.selectedRows,clickedColumn:r})};t.prototype.onDefaultRowActionClick=function(t,e){var o=e.action,r=e.row,n=e.type,i=e.index;t.stopPropagation();this.kupRowActionClicked.emit({action:o,index:i,row:r,type:n})};t.prototype.onRowActionExpanderClick=function(t,e){t.stopPropagation();this.kupRowActionClicked.emit({row:e,type:"expander"})};t.prototype.handleRowSelect=function(t,e){if(this.multiSelection){if(e&&this.selectedRows){var o=this.selectedRows.indexOf(t);if(o<0){this.selectedRows=this.selectedRows.concat([t])}else{this.selectedRows.splice(o,1);this.selectedRows=this.selectedRows.slice()}}else{this.selectedRows=[t]}}else{this.selectedRows=[t]}};t.prototype.onRowCheckboxSelection=function(t,e){var o=t.target;if(o.checked){if(this.selectedRows.length>0){this.selectedRows=this.selectedRows.concat([e])}else{this.selectedRows=[e]}}else{var r=this.selectedRows.indexOf(e);if(r>=0){this.selectedRows.splice(r,1);this.selectedRows=this.selectedRows.slice()}}this.kupRowSelected.emit({selectedRows:this.selectedRows,clickedColumn:null})};t.prototype.onRowExpand=function(t){t.group.expanded=!t.group.expanded;this.groupState[t.group.id].expanded=t.group.expanded;this.groupState=Object.assign({},this.groupState)};t.prototype.onSelectAll=function(t){var e=t.target;if(e.checked){this.selectedRows=this.renderedRows}else{this.selectedRows=[]}this.kupRowSelected.emit({selectedRows:this.selectedRows,clickedColumn:null})};t.prototype.onColumnMouseEnter=function(t){var e=this;this.columnOverTimeout=setTimeout(function(){e.openedMenu=t},500)};t.prototype.onColumnMouseLeave=function(t){clearTimeout(this.columnOverTimeout);if(this.openedMenu===t){this.openedMenu=null}};t.prototype.switchColumnGroup=function(t,e){this.openedMenu=null;this.groupState={};if(t!==null){var o=this.groups.indexOf(t);this.groups.splice(o,1);this.groups=this.groups.slice()}else{this.groups=this.groups.concat([{column:e,visible:true}])}};t.prototype.onOptionClicked=function(t,e){this.kupOptionClicked.emit({column:t,row:e})};t.prototype.onJ4btnClicked=function(t,e,o){var r=arguments[3];if(r){r.stopPropagation()}else{throw"kup-data-table error: missing event"}this.kupCellButtonClicked.emit({cell:o,column:e,row:t})};t.prototype.groupRows=function(){if(!this.isGrouping()){return}this.rows=c(this.getColumns(),this.rows,this.groups,this.totals);this.adjustGroupState()};t.prototype.onLoadMoreClick=function(){var t=0;switch(this.loadMoreMode){case n.CONSTANT:t=this.loadMoreStep;break;case n.CONSTANT_INCREMENT:t=this.loadMoreStep*(this.loadMoreEventCounter+1);break;case n.PROGRESSIVE_THRESHOLD:t=Math.max(this.loadMoreEventPreviousQuantity,this.loadMoreStep)*Math.min(this.loadMoreEventCounter+1,2);break}if(t>this.loadMoreLimit){t=this.loadMoreLimit}this.kupLoadMoreClicked.emit({loadItems:t});this.loadMoreEventPreviousQuantity=t;this.loadMoreEventCounter++};t.prototype.adjustGroupState=function(){var t=this;if(!this.rows||this.rows.length===0||!this.rows[0].hasOwnProperty("group")){return}this.rows.forEach(function(e){return t.adjustGroupStateFromRow(e)})};t.prototype.adjustGroupStateFromRow=function(t){var e=this;if(!t||!t.hasOwnProperty("group")){return}var o=t.group;var r=this.groupState[o.id];if(!r){this.groupState[o.id]=o}else{o.expanded=r.expanded}o.children.forEach(function(t){return e.adjustGroupStateFromRow(t)})};t.prototype.sortRows=function(){this.rows=h(this.rows,this.sort)};t.prototype.paginateRows=function(t){var e=this.currentPage*this.currentRowsPerPage-this.currentRowsPerPage;return t.slice(e,e+this.currentRowsPerPage)};t.prototype.getSortIcon=function(t){for(var e=0,o=this.sort;e<o.length;e++){var r=o[e];if(r.column===t){return"A"===r.sortMode?"mdi-sort-ascending":"mdi-sort-descending"}}return"mdi-sort"};t.prototype.calculateColspan=function(){var t=this.getVisibleColumns().length;if(this.multiSelection){t+=1}if(this.isGrouping()&&this.hasTotals()){t+=1}if(this.hasRowActions()){t+=1}return t};t.prototype.isGroupExpanded=function(t){var e=t.group;if(!e){return false}if(this.groupState[e.id]){return this.groupState[e.id].expanded}else{return false}};t.prototype.styleHasBorderRadius=function(t){if(t&&t.style&&t.style.borderRadius){return true}return false};t.prototype.handleColumnSort=function(t,e){var o=this.data.columns.findIndex(function(e){return e.name===t.name&&e.title===t.title});var r=this.data.columns.findIndex(function(t){return t.name===e.name&&t.title===e.title});if(this.sortableColumnsMutateData){this.moveSortedColumns(this.data.columns,o,r)}this.kupDataTableSortedColumn.emit({receivingColumnIndex:o,sortedColumnIndex:r})};t.prototype.moveSortedColumns=function(t,e,o){var r=t.splice(o,1);t.splice(e,0,r[0])};t.prototype.defaultSortingFunction=function(t,e,o,r){if(r===void 0){r=false}return __awaiter(this,void 0,void 0,function(){var n;return __generator(this,function(i){n=!r?t:t.slice();this.moveSortedColumns(n,e,o);return[2,n]})})};t.prototype.renderHeader=function(){var t=this;var e=this.columnsWidth.length>0;var o=this.getVisibleColumns().map(function(o){var n=null;if(t.showFilters){var i="";if(t.filters&&t.filters[o.name]){i=t.filters[o.name]}n=r("div",{onMouseEnter:function(){return t.onColumnMouseLeave(o.name)},onMouseLeave:function(){return t.onColumnMouseEnter(o.name)}},r("kup-text-input",{class:"datatable-filter",initialValue:i,"data-col":o.name,onKetchupTextInputUpdated:function(e){t.onFilterChange(e,o.name)}}))}var s=null;if(t.sortEnabled){s=r("span",{class:"column-sort",onMouseEnter:function(){return t.onColumnMouseLeave(o.name)},onMouseLeave:function(){return t.onColumnMouseEnter(o.name)}},r("span",{role:"button","aria-label":"Sort column",class:"mdi "+t.getSortIcon(o.name),onClick:function(e){return t.onColumnSort(e,o.name)}}))}var a=null;if(e){for(var l=0;l<t.columnsWidth.length;l++){var u=t.columnsWidth[l];if(u.column===o.name){var c=u.width.toString()+"px";a={width:c,minWidth:c,maxWidth:c};break}}}var h=[];var d=t.getGroupByName(o.name);var p=d!=null?"Disattiva raggruppamento":"Attiva raggruppamento";h.push(r("li",{role:"menuitem",onClick:function(){return t.switchColumnGroup(d,o.name)}},r("span",{class:"mdi mdi-book"}),p));h.push(r("li",{role:"menuitem",onClick:function(){return t.kupAddColumn.emit({column:o.name})}},r("span",{class:"mdi mdi-table-column-plus-after"}),"Aggiungi colonna"));var f=null;if(h.length!==0){var g=t.openedMenu===o.name?"open":"closed";f=r("div",{class:"column-menu "+g},r("ul",{role:"menubar"},h))}var m={};if(t.enableSortableColumns){m={draggable:true,onDragStart:function(e){e.dataTransfer.setData(y,JSON.stringify(o));e.dataTransfer.effectAllowed="move";e.target.setAttribute(t.dragStarterAttribute,"");t.theadRef.setAttribute(t.dragFlagAttribute,"");t.columnsAreBeingDragged=true},onDragLeave:function(e){if(e.dataTransfer.types.indexOf(y)>=0){e.target.removeAttribute(t.dragOverAttribute)}},onDragOver:function(e){if(e.dataTransfer.types.indexOf(y)>=0){var o=e.target;o.setAttribute(t.dragOverAttribute,"");if(!o.hasAttribute(t.dragStarterAttribute)&&t.columnsAreBeingDragged){e.preventDefault();e.dataTransfer.effectAllowed="move"}else{e.dataTransfer.effectAllowed="none"}}},onDragEnd:function(e){var o=e.target;if(o){o.removeAttribute(t.dragStarterAttribute)}t.theadRef.removeAttribute(t.dragFlagAttribute);t.columnsAreBeingDragged=false},onDrop:function(e){if(e.dataTransfer.types.indexOf(y)>=0){var r=JSON.parse(e.dataTransfer.getData(y));e.preventDefault();e.target.removeAttribute(t.dragOverAttribute);t.handleColumnSort(o,r)}}}}return r("th",Object.assign({style:a,onMouseEnter:function(){return t.onColumnMouseEnter(o.name)},onMouseLeave:function(){return t.onColumnMouseLeave(o.name)}},m),r("span",{class:"column-title"},o.title),s,n,f)});var n=null;if(this.multiSelection){var i={width:"30px",margin:"0 auto"};n=r("th",{style:i},r("input",{type:"checkbox",onChange:function(e){return t.onSelectAll(e)},title:"selectedRow: "+this.selectedRows.length+" - renderedRows: "+this.renderedRows.length,checked:this.selectedRows.length>0&&this.selectedRows.length===this.renderedRows.length}))}var s=null;if(this.isGrouping()&&this.hasTotals()){s=r("th",null)}var a=null;if(this.hasRowActions()){a=r("th",null)}return[n,s,a].concat(o)};t.prototype.renderFooter=function(){var t=this;if(!this.hasTotals()){return null}var e=this.getVisibleColumns().map(function(e){var o=e.name;return r("td",null,t.footer[o])});var o=null;if(this.multiSelection){o=r("td",null)}var n=null;if(this.isGrouping()&&this.hasTotals()){n=r("td",null)}var i=r("tfoot",null,r("tr",null,o,n,e));return i};t.prototype.renderRow=function(t,e,o){var n=this;if(e===void 0){e=0}var i=this.getVisibleColumns();if(t.group){if(t.group.children.length===0){return null}var s="mdi mdi-chevron-"+(t.group.expanded?"right":"down");var a=[];var l=[];for(var u=0;u<e;u++){l.push(r("span",{class:"indent"}))}if(this.hasTotals()){var c=[];var h=this.multiSelection?2:1;c.push(r("td",{colSpan:h},l,r("span",{role:"button","aria-label":"Row expander",class:s,onClick:function(e){e.stopPropagation();n.onRowExpand(t)}}),t.group.label));for(var d=0,p=i;d<p.length;d++){var f=p[d];c.push(r("td",{class:"total"},t.group.totals[f.name]))}a.push(r("tr",{class:"group",onClick:function(){return n.onRowExpand(t)}},c))}else{a.push(r("tr",{class:"group",onClick:function(){return n.onRowExpand(t)}},r("td",{colSpan:this.calculateColspan()},l,r("span",{role:"button","aria-label":"Row expander",class:"row-expander "+s,onClick:function(e){e.stopPropagation();n.onRowExpand(t)}}),t.group.label)))}if(this.isGroupExpanded(t)){t.group.children.map(function(t,o,r){return n.renderRow(t,e+1,o>0?r[o-1]:null)}).forEach(function(t){if(Array.isArray(t)){t.forEach(function(t){return a.push(t)})}else{a.push(t)}})}return a}else{var c=i.map(function(i,s){var a=i.name,l=i.hideValuesRepetitions;var u=[];if(s===0&&!(n.isGrouping()&&n.hasTotals())){for(var c=0;c<e;c++){u.push(r("span",{class:"indent"}))}}var h=t.cells[a];var d=null;if(h.options&&(!l||l&&(!o||o.cells[a].value!==h.value))){d=r("span",{class:"options",role:"button","aria-label":"Opzioni oggetto",title:"Opzioni oggetto",onClick:function(){return n.onOptionClicked(a,t)}},r("i",{class:"mdi mdi-settings"}))}var p=n.renderCell(h,a,{row:t,column:i},l&&o?o.cells[a].value:null);var f={number:C(h.obj)};var g=null;if(!n.styleHasBorderRadius(h)){g=h.style}return r("td",{"data-column":a,style:g,class:f},u,p,d)});var g=null;if(this.multiSelection){g=r("td",null,r("input",{type:"checkbox",checked:this.selectedRows.includes(t),onClick:function(t){return t.stopPropagation()},onChange:function(e){return n.onRowCheckboxSelection(e,t)}}))}var m=null;if(this.isGrouping()&&this.hasTotals()){m=r("td",null)}this.renderedRows.push(t);var w=null;if(this.hasRowActions()){var v=this.renderActions(this.rowActions,t,"default");var R=null;var b=null;if(t.actions){b=this.renderActions(t.actions,t,"variable")}else{R=r("span",{title:"Espandi voci",class:"row-action mdi mdi-chevron-right",onClick:function(e){return n.onRowActionExpanderClick(e,t)},role:"button","aria-label":"Espandi voci","aria-pressed":"false"})}w=r("td",null,v,R,b)}var y={selected:this.selectedRows.includes(t)};return r("tr",{class:y,onClick:function(e){return n.onRowClick(e,t)}},g,m,w,c)}};t.prototype.renderActions=function(t,e,o){var n=this;return t.map(function(t,i){return r("span",{title:t.text,class:"row-action "+t.icon,onClick:function(r){return n.onDefaultRowActionClick(r,{action:t,index:i,row:e,type:o})},role:"button","aria-label":t.text,"aria-pressed":"false"})})};t.prototype.renderCell=function(t,e,o,n){var i=n!==t.value?t.value:"";var s=i;if(d(t.obj)||p(t.obj)){s=r("span",{class:i})}else if(f(t.obj)){s=r("img",{src:i,alt:"",width:"64",height:"64"})}else if(g(t.obj)){s=r("a",{href:i,target:"_blank"},i)}else if(m(t.obj)){s=r("kup-checkbox",{checked:!!t.obj.k,disabled:o&&o.row&&o.row.hasOwnProperty("readOnly")?o.row.readOnly:true})}else if(w(t.obj)){s=r("kup-button",Object.assign({},v(t),{onKupButtonClicked:this.onJ4btnClicked.bind(this,o?o.row:null,o?o.column:null,t)}))}else if(R(t.obj)){var a={value:t.value};if(this.columnsWidth&&this.columnsWidth[e]){a.width=this.columnsWidth[e]}s=i?r("kup-graphic-cell",Object.assign({},a)):null}var l=null;if(this.styleHasBorderRadius(t)){l=t.style}return r("span",{class:"cell-content",style:l},s)};t.prototype.renderLoadMoreButton=function(t){var e=this;if(t===void 0){t=true}var o="Carica altri dati";return r("button",{"aria-label":o,class:"load-more-records mdi mdi-plus-circle",role:"button",slot:t?"more-results":null,tabindex:"0",title:o,onClick:function(){return e.onLoadMoreClick()}})};t.prototype.render=function(){var t=this;this.renderedRows=[];var e=null;if(this.paginatedRows.length===0){e=r("tr",null,r("td",{colSpan:this.calculateColspan()},"Empty data"))}else{e=[];this.paginatedRows.map(function(e,o,r){return t.renderRow(e,0,o>0?r[o-1]:null)}).forEach(function(t){if(Array.isArray(t)){t.forEach(function(t){return e.push(t)})}else{e.push(t)}})}var o=this.renderHeader();var n=this.renderFooter();var a=null;if(this.globalFilter){a=r("div",{id:"globalFilter"},r("kup-text-input",{label:"Global filter",onKetchupTextInputUpdated:function(e){return t.onGlobalFilterChange(e)}}))}var l=null;if(i.TOP===this.paginatorPos||i.BOTH===this.paginatorPos){l=r("kup-paginator",{id:"top-paginator",max:this.rows.length,perPage:this.rowsPerPage,selectedPerPage:this.currentRowsPerPage,currentPage:this.currentPage,onKupPageChanged:function(e){return t.handlePageChanged(e)},onKupRowsPerPageChanged:function(e){return t.handleRowsPerPageChanged(e)}},this.showLoadMore?this.renderLoadMoreButton():null)}var u=null;if(i.BOTTOM===this.paginatorPos||i.BOTH===this.paginatorPos){u=r("kup-paginator",{id:"bottom-paginator",max:this.rows.length,perPage:this.rowsPerPage,selectedPerPage:this.currentRowsPerPage,currentPage:this.currentPage,onKupPageChanged:function(e){return t.handlePageChanged(e)},onKupRowsPerPageChanged:function(e){return t.handleRowsPerPageChanged(e)}},this.showLoadMore?this.renderLoadMoreButton():null)}var c=null;if(this.isGrouping()){var h=this.groups.map(function(e){var o=b(t.getColumns(),e.column);if(o){return r("div",{class:"group-chip",tabIndex:0,onClick:function(){return t.removeGroup(e)}},r("span",{class:"mdi mdi-close-circle"}),o.title)}else{return null}});c=r("div",{id:"group-chips"},h)}var d=r("div",{id:"density-panel"},r("kup-button",{class:{active:this.density==="small"},iconClass:"mdi mdi-format-align-justify",onClick:function(){return t.density="small"}}),r("kup-button",{class:{active:this.density==="medium"},iconClass:"mdi mdi-menu",onClick:function(){return t.density="medium"}}),r("kup-button",{class:{active:this.density==="big"},iconClass:"mdi mdi-view-sequential",onClick:function(){return t.density="big"}}));var p={"column-separation":s.COMPLETE===this.showGrid||s.COL===this.showGrid,"row-separation":s.COMPLETE===this.showGrid||s.ROW===this.showGrid,"persistent-header":this.headerIsPersistent};p["density-"+this.density]=true;return r("div",{id:"data-table-wrapper"},r("div",{class:"above-wrapper"},l,a,d),r("div",{class:"below-wrapper"},c,r("table",{class:p},r("thead",{hidden:!this.showHeader,ref:function(e){return t.theadRef=e}},r("tr",null,o)),r("tbody",null,e),n)),u)};Object.defineProperty(t,"watchers",{get:function(){return{rowsPerPage:["rowsPerPageHandler","recalculateRows"],expandGroups:["expandGroupsHandler"],data:["recalculateRows"],sort:["recalculateRows"],filters:["recalculateRows"],globalFilterValue:["recalculateRows"],groups:["recalculateRows"],totals:["recalculateRows"],currentPage:["recalculateRows"],currentRowsPerPage:["recalculateRows"]}},enumerable:true,configurable:true});Object.defineProperty(t,"style",{get:function(){return"\@import url(https://cdn.materialdesignicons.com/3.6.95/css/materialdesignicons.min.css);:host{--int_background-color:var(--kup-data-table_background-color,#fff);--int_border-color:var(--kup-data-table_border-color,#000);--int_box-shadow:var(--kup-data-table_box-shadow,0px 0px 7.5px 0px hsla(0,0%,50.2%,0.5));--int_color:var(--kup-data-table_color,$mainTextColor);--int_drag-over--allowed:var(--kup-data-table_drag-over--allowed,rgba(78,144,143,0.24));--int_drag-over--forbidden:var(--kup-data-table_drag-over--forbidden,rgba(240,66,60,0.24));--int_filter-border-color:var(--kup-data-table_filter-border-color,#d0d0d0);--int_filter-background-color:var(--kup-data-table_filter-background-color,#fff);--int_group-background-color:var(--kup-data-table_group-background-color,#f9f9f9);--int_group-border-color:var(--kup-data-table_group-border-color,#6aaaa7);--int_hover-color:var(--kup-data-table_hover-color,$mainTextColor);--int_head-background-color:var(--kup-data-table_head-background-color,#f9f9f9);--int_header-offset:var(--kup-data-table_header-offset,50px);--int_hover-background-color:var(--kup-data-table_hover-background-color,#e0e0e0);--int_icons-color:var(--kup-data-table_icons-color,grey);--int_icons-hover-color:var(--kup-data-table_icons-hover-color,#a0a0a0);--int_font-size:var(--kup-data-table_font-size,1rem);--int_main-color:var(--kup-data-table_main-color,#6aaaa7);--int_stronger-color:var(--kup-data-table_stronger-color,#111);--int_text-on-main-color:var(--kup-data-table_text-on-main-color,#fff)}#data-table-wrapper{background-color:var(--int_background-color)}#data-table-wrapper table{color:var(--int_stronger-color);width:100%;min-width:intrinsic;min-width:-moz-max-content;min-width:-webkit-max-content;border-collapse:collapse;text-align:left;font-size:var(--int_font-size)}#data-table-wrapper table td,#data-table-wrapper table th{padding:.5rem 1rem}#data-table-wrapper table.row-separation tr{border-bottom:1px solid var(--int_border-color)}#data-table-wrapper table.column-separation td,#data-table-wrapper table.column-separation th{border-right:1px solid var(--int_border-color)}#data-table-wrapper table .column-sort{margin-left:.5rem;cursor:pointer}#data-table-wrapper table .column-sort .mdi{-webkit-transition:color .2s ease-in-out;transition:color .2s ease-in-out}#data-table-wrapper table .column-sort .mdi-sort-ascending,#data-table-wrapper table .column-sort .mdi-sort-descending{color:var(--int_main-color)}#data-table-wrapper table th kup-text-input.datatable-filter{--int_border-color:var(--int_filter-border-color);--int_background-color:var(--int_filter-background-color)}#data-table-wrapper table th input{display:block}#data-table-wrapper table thead{background:var(--int_head-background-color);border:1px solid var(--int_border-color);font-size:115%}#data-table-wrapper table thead th{position:relative}#data-table-wrapper table thead[columns-dragging] [drag-over]{background-color:var(--int_drag-over--allowed)}#data-table-wrapper table thead[columns-dragging] [drag-over]>*{pointer-events:none}#data-table-wrapper table thead[columns-dragging] [drag-over][drag-starter]{background-color:var(--int_drag-over--forbidden)}#data-table-wrapper table.persistent-header{border-top:1px solid var(--int_border-color);position:relative}#data-table-wrapper table.persistent-header thead{border-color:var(--int_border-color);border-style:solid;border-width:0 1px 0}#data-table-wrapper table.persistent-header thead th{background-color:var(--int_head-background-color);-webkit-box-shadow:var(--int_box-shadow);box-shadow:var(--int_box-shadow);position:-webkit-sticky;position:sticky;top:var(--int_header-offset);will-change:transform}#data-table-wrapper table.persistent-header tbody{border-top:3px solid var(--int_border-color)}#data-table-wrapper table tbody{border:1px solid var(--int_border-color);cursor:pointer;font-size:100%}#data-table-wrapper table tbody>tr.selected>td,#data-table-wrapper table tbody>tr:hover>td{color:var(--int_hover-color);background-color:var(--int_hover-background-color)}#data-table-wrapper table tbody>tr.group{background:var(--int_group-background-color);font-weight:700;border-top:1px solid var(--int_border-color)}#data-table-wrapper table tbody>tr.group td{padding:1rem 0}#data-table-wrapper table tbody>tr.group td.total{text-align:right;padding-right:1rem}#data-table-wrapper table tbody>tr.group icon{margin-right:.5rem}#data-table-wrapper table tbody>tr>td.number{text-align:right}#data-table-wrapper table tbody>tr>td .row-expander{margin-right:.5rem}#data-table-wrapper table tbody>tr>td .indent{display:inline-block;height:1rem;width:2rem}#data-table-wrapper table tbody>tr>td .options{font-size:100%;margin-left:.5rem;color:var(--int_icons-color)}#data-table-wrapper table tbody>tr>td .options:hover{color:var(--int_icons-hover-color)}#data-table-wrapper table tbody>tr>td .row-action{margin-right:.2rem}#data-table-wrapper table tfoot{font-size:110%}#data-table-wrapper table tfoot td{text-align:right}#data-table-wrapper table.noGrid,#data-table-wrapper table.noGrid td{border:none}#data-table-wrapper table.density-small tbody>tr>td{padding-top:.2rem;padding-bottom:.2rem}#data-table-wrapper table.density-small tbody>tr.group>td{padding-top:.75rem;padding-bottom:.75rem}#data-table-wrapper table.density-big tbody>tr>td{padding-top:1rem;padding-bottom:1rem}#data-table-wrapper table.density-big tbody>tr.group>td{padding-top:1.25rem;padding-bottom:1.25rem}#globalFilter{margin-bottom:.5rem;text-align:center}#group-chips{display:-ms-flexbox;display:flex;margin-bottom:.5rem}#group-chips>.group-chip{display:-ms-flexbox;display:flex;background-color:var(--int_main-color);padding:.5rem;color:var(--int_text-on-main-color);margin-right:.5rem;cursor:pointer;-webkit-transition:opacity .2s ease-in-out;transition:opacity .2s ease-in-out}#group-chips>.group-chip icon{margin-right:.5rem}#group-chips>.group-chip:hover{opacity:.75}.column-menu{background-color:var(--int_background-color);-webkit-box-shadow:var(--int_box-shadow);box-shadow:var(--int_box-shadow);color:var(--int_color);position:absolute;z-index:100;font-weight:400;-webkit-transition:opacity .2s ease-in-out;transition:opacity .2s ease-in-out;min-width:200px;min-width:-moz-max-content;min-width:-webkit-max-content}.column-menu.closed{display:none;opacity:0}.column-menu.open{display:block;opacity:1;-webkit-animation:display-none-transition .5s both;-webkit-animation-timing-function:cubic-bezier(.67,-.81,.89,.71);animation:display-none-transition .5s both;animation-timing-function:cubic-bezier(.67,-.81,.89,.71)}.column-menu ul{list-style-type:none;margin:0;padding:0}.column-menu ul>li{padding:.8rem;font-size:1rem;-webkit-transition:color .2s ease-in-out;transition:color .2s ease-in-out}.column-menu ul>li:hover{cursor:pointer;color:var(--int_main-color)}.column-menu ul>li .mdi{margin-right:.5rem}#density-panel{text-align:center}#density-panel kup-button{--kup-button_main-color:transparent;--kup-button_opacity:0.25;--kup-button_icon-color:var(--int_main-color);--kup-button_box-shadow:none}#density-panel kup-button:hover{--kup-button_opacity:0.75}#density-panel kup-button.active{--kup-button_opacity:1}\@-webkit-keyframes display-none-transition{0%{opacity:0}}\@keyframes display-none-transition{0%{opacity:0}}.load-more-records{background-color:transparent;border:0 none;color:var(--int_icons-color);cursor:pointer;display:inline-block;font-size:calc(var(--int_font-size) *1.2);height:calc(var(--int_font-size) *1.2);margin:0 6px;padding:0;-webkit-transition:color .3s;transition:color .3s;width:calc(var(--int_font-size) *1.2)}.load-more-records:hover{color:var(--int_icons-hover-color)}.load-more-records:before{height:inherit;width:inherit}"},enumerable:true,configurable:true});return t}();t("kup_data_table",k)}}});