mycomponent.loadBundle("naxaqnee",["exports"],function(t){var e,o=window.mycomponent.h;!function(t){t.Area="Area",t.Bubble="Bubble",t.Cal="Cal",t.Candlestick="Candlestick",t.Combo="Combo",t.Geo="Geo",t.Hbar="Hbar",t.Line="Line",t.Ohlc="Ohlc",t.Pie="Pie",t.Sankey="Sankey",t.Scatter="Scatter",t.Unk="Unk",t.Vbar="Vbar"}(e||(e={}));var i=function(){function t(){this.config={type:e.Hbar,axe:"Col1",series:["Col2","Col3"]}}return t.prototype.componentDidLoad=function(){if(this.config.axe&&this.config.series&&google)try{this._loadGoogleChart()}catch(t){console.log(t)}},t.prototype.componentWillUpdate=function(){this.gChart&&this.gChart.clearChart()},t.prototype.componentDidUpdate=function(){this._loadGoogleChart()},t.prototype._loadGoogleChart=function(){google.charts.setOnLoadCallback(this._createChart.bind(this))},t.prototype._createGoogleChart=function(){switch(this.config.type){case e.Area:return new google.visualization.AreaChart(this.chartContainer);case e.Bubble:return new google.visualization.BubbleChart(this.chartContainer);case e.Cal:return new google.visualization.Calendar(this.chartContainer);case e.Candlestick:return new google.visualization.CandlestickChart(this.chartContainer);case e.Combo:return new google.visualization.ComboChart(this.chartContainer);case e.Geo:return new google.visualization.GeoChart(this.chartContainer);case e.Hbar:return new google.visualization.BarChart(this.chartContainer);case e.Line:return new google.visualization.LineChart(this.chartContainer);case e.Pie:return new google.visualization.PieChart(this.chartContainer);case e.Sankey:return new google.visualization.Sankey(this.chartContainer);case e.Scatter:return new google.visualization.ScatterChart(this.chartContainer);default:return new google.visualization.ColumnChart(this.chartContainer)}},t.prototype._createGoogleChartOptions=function(){if(!this.config)return{};var t={};if(t.is3D="3D"===this.config.asp,this.config.colors&&(t.colors=this.config.colors),this.config.width)try{t.width=this.config.width}catch(t){console.error(t)}if(this.config.height)try{t.height=this.config.height}catch(t){console.error(t)}return this.config.hasOwnProperty("leg")&&!this.config.leg&&(t.legend={position:"none"}),!this.config.stacked||e.Hbar!==this.config.type&&e.Vbar!==this.config.type||(t.isStacked=!0),this.config.title&&(t.title=this.config.title,t.titleTextStyle={},this.config.titleColor&&(t.titleTextStyle.color=this.config.titleColor),this.config.titleSize&&(t.titleTextStyle.fontSize=this.config.titleSize)),t},t.prototype._createChart=function(){var t=function(t,e){if(!t||!e||!e.series)return[];var o=[];return o.push(e.axe),e.series.map(function(e){for(var i,n=0;n<t.columns.length;n++){var r=t.columns[n];if(e===r.name){i=r;break}}i&&o.push(i.name)}),o}(this.data,this.config),e=function(t,e){if(!t)return[];var o=[];return t.rows&&t.rows.forEach(function(t){var i=t.cells,n=[];e.forEach(function(t){var e=i[t];e&&e.obj&&n.push("NR"===e.obj.t?parseFloat(e.obj.k):e.obj.k)}),o.push(n)}),o}(this.data,t),o=new google.visualization.arrayToDataTable([t].concat(e));this.gChart=this._createGoogleChart();var i=this._createGoogleChartOptions();this.gChart.draw(o,i)},t.prototype.render=function(){var t=this;return o("div",{id:"chart",ref:function(e){return t.chartContainer=e}})},Object.defineProperty(t,"is",{get:function(){return"kup-chart"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{config:{type:"Any",attr:"config"},data:{type:"Any",attr:"data"}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return""},enumerable:!0,configurable:!0}),t}();t.KupChart=i,Object.defineProperty(t,"__esModule",{value:!0})});