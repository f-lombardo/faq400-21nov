const t=window.mycomponent.h;var e;!function(t){t.Area="Area",t.Bubble="Bubble",t.Cal="Cal",t.Candlestick="Candlestick",t.Combo="Combo",t.Geo="Geo",t.Hbar="Hbar",t.Line="Line",t.Ohlc="Ohlc",t.Pie="Pie",t.Sankey="Sankey",t.Scatter="Scatter",t.Unk="Unk",t.Vbar="Vbar"}(e||(e={}));const i=(t,e)=>{if(!t||!e||!e.series)return[];const i=[];return i.push(e.axe),e.series.map(e=>{let o;for(let i=0;i<t.columns.length;i++){const a=t.columns[i];if(e===a.name){o=a;break}}o&&i.push(o.name)}),i},o=(t,e)=>{if(!t)return[];const i=[];return t.rows&&t.rows.forEach(t=>{const o=t.cells,a=[];e.forEach(t=>{const e=o[t];e&&e.obj&&a.push("NR"===e.obj.t?parseFloat(e.obj.k):e.obj.k)}),i.push(a)}),i};class a{constructor(){this.config={type:e.Hbar,axe:"Col1",series:["Col2","Col3"]}}componentDidLoad(){if(this.config.axe&&this.config.series&&google)try{this._loadGoogleChart()}catch(t){console.log(t)}}componentWillUpdate(){this.gChart&&this.gChart.clearChart()}componentDidUpdate(){this._loadGoogleChart()}_loadGoogleChart(){google.charts.setOnLoadCallback(this._createChart.bind(this))}_createGoogleChart(){switch(this.config.type){case e.Area:return new google.visualization.AreaChart(this.chartContainer);case e.Bubble:return new google.visualization.BubbleChart(this.chartContainer);case e.Cal:return new google.visualization.Calendar(this.chartContainer);case e.Candlestick:return new google.visualization.CandlestickChart(this.chartContainer);case e.Combo:return new google.visualization.ComboChart(this.chartContainer);case e.Geo:return new google.visualization.GeoChart(this.chartContainer);case e.Hbar:return new google.visualization.BarChart(this.chartContainer);case e.Line:return new google.visualization.LineChart(this.chartContainer);case e.Pie:return new google.visualization.PieChart(this.chartContainer);case e.Sankey:return new google.visualization.Sankey(this.chartContainer);case e.Scatter:return new google.visualization.ScatterChart(this.chartContainer);default:return new google.visualization.ColumnChart(this.chartContainer)}}_createGoogleChartOptions(){if(!this.config)return{};const t={};if(t.is3D="3D"===this.config.asp,this.config.colors&&(t.colors=this.config.colors),this.config.width)try{t.width=this.config.width}catch(t){console.error(t)}if(this.config.height)try{t.height=this.config.height}catch(t){console.error(t)}return this.config.hasOwnProperty("leg")&&!this.config.leg&&(t.legend={position:"none"}),!this.config.stacked||e.Hbar!==this.config.type&&e.Vbar!==this.config.type||(t.isStacked=!0),this.config.title&&(t.title=this.config.title,t.titleTextStyle={},this.config.titleColor&&(t.titleTextStyle.color=this.config.titleColor),this.config.titleSize&&(t.titleTextStyle.fontSize=this.config.titleSize)),t}_createChart(){const t=i(this.data,this.config),e=o(this.data,t),a=new google.visualization.arrayToDataTable([t,...e]);this.gChart=this._createGoogleChart();const r=this._createGoogleChartOptions();this.gChart.draw(a,r)}render(){return t("div",{id:"chart",ref:t=>this.chartContainer=t})}static get is(){return"ketchup-chart"}static get encapsulation(){return"shadow"}static get properties(){return{config:{type:"Any",attr:"config"},data:{type:"Any",attr:"data"}}}static get style(){return""}}export{a as KetchupChart};