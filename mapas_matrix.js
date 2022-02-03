///////////Creación variable mapa/////////// 
var map = L.map('map', {
		zoomControl: false,
		center: [42.4305,-8.4480],
		zoom: 10,
		maxZoom: 20,
		maxBounds: [
			[20, -50],
			[50, 50]
			],
	});



///////////Funcionalidades estructura del visor///////////

//Layers on top

map.createPane('límites');
// This pane is above markers but below popups
map.getPane('límites').style.zIndex = 650;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('límites').style.pointerEvents = 'none';
//Labels on top
map.createPane('labels');
// This pane is above markers but below popups
map.getPane('labels').style.zIndex = 800;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('labels').style.pointerEvents = 'none';
//bindTooltip on top
map.createPane('popups');
// el popup aparece al arrastar encima de todo pero debajo del popup que aparece al clicar
map.getPane('popups').style.zIndex = 1000;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('popups').style.pointerEvents = 'none';
//bindPopup on top
map.createPane('popups1');
// aparece por encima de todas las capas
map.getPane('popups1').style.zIndex = 1500;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('popups1').style.pointerEvents = 'none';



//Barra de interacción de capas	tantaas sildebar como grupos de capas


var sidebar = L.control.sidebar('sidebar', { closeButton:true, position: 'left' });
	map.addControl(sidebar);
	sidebar.hide();			
	sidebar.show();
	sidebar.toggle();
var visible = sidebar.isVisible();
var button = new L.Control.Button(L.DomUtil.get('helpbutton'), { toggleButton: 'active', position: 'topleft'});
	button.addTo(map);
	button.on('click', function () {
	 if (button.isToggled()) {
			sidebar.hide();
		} else {
			sidebar.show();
		}
	});
var sidebar2 = L.control.sidebar('sidebar2', { closeButton:true, position: 'right' });
	map.addControl(sidebar2);
	sidebar2.hide();			
	sidebar2.show();
	sidebar2.toggle();
var visible2 = sidebar.isVisible();

//Buscador
var geocoder = L.Control.geocoder({ position: 'topleft',
	//defaultMarkGeocode: false
	}).addTo(map);


///////////Diseño caracteriticas basicas del visor///////////
//Título
var title2 = L.control({position: 'topright'});
	title2.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info2');
	 div.innerHTML +=
	 'VISOR CARTOGRÁFICO<h3>Cambio climático - Parque Nacional Illas Atlánticas de Galicia e área de influencia';
	 return div;
	};
	title2.addTo(map);

//Logo Matrix	
var title1 = L.control({position: 'bottomright'});
	title1.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info1');
	 div.innerHTML +=
	 '<a href="https://www.fundacionmatrix.es"><img src="images/matrix_nuevo.png" width="115px" height="55px"></img></a>';
	 return div;
	};
	title1.addTo(map);
		
//Logo proyecto >>> PONER LOGO DE CLIMILLAT

var title2 = L.control({position: 'bottomright'});
	title2.onAdd = function (map) {
var div = L.DomUtil.create('div','info2');
	 div.innerHTML +=
	 '<a><img src="images/climillat.png" width="100px" height="75px" ></img></a>';
	 return div;
	};
	title2.addTo(map); 

	//Logo mayorsig
/*var title3 = L.control({position: 'bottomright'});
	title3.onAdd = function (map) {
var div = L.DomUtil.create('div','info3');
	 div.innerHTML +=
	 '<a><img src="images/MAYORSIG.jpg" width="90px" height="63px" ></img></a>';
	 return div;
	};
	title3.addTo(map);  
*/

///////////Cartografía de referencia///////////
var Mapa_fondo = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, opacity: 0.4, 
	attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap </a>| Map data © 2021 <a href="https://www.fundacionmatrix.es"><strong>Fundación Matrix</strong></a>',
	}).addTo(map);		
//			var positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
//			attribution: '©OpenStreetMap, ©CartoDB'
//			}).addTo(map);
//			var positronLabels = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
//			attribution: '©OpenStreetMap, ©CartoDB',
//			pane: 'labels'
//			}).addTo(map);
var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data &copy'
	});
var osm1 = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 18,
	opacity: 0,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	});
var osm2 = new L.TileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	minZoom: 0, 
	maxZoom: 13,
	});
var osm3 = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, opacity: 0.4, 
	attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap </a>| Map data © 2021 <a href="https://www.fundacionmatrix.es"><strong>Fundación Matrix</strong></a>',
	});


//Límites. METER LIMITES DE PROVINCIAS O MUNICIPIOS SI LO QUIERE
 
 /*var comunidades = L.geoJson(comunidades, {
	color: "#17202A", 
	weight: 1.4,
	opacity: 0.3,
	fillOpacity: 0,
		attribution: '| © <a href="http://www.ign.es">Instituto Geográfico Nacional |'			
	}).addTo(map);
*/


///////////Otras funcionalidades

//minimapa	
var miniMap = new L.Control.MiniMap(osm2, { toggleDisplay: true, position:"bottomright", width:100,height:100,}).addTo(map); 					
//zoomHome
var zoomHome = L.Control.zoomHome({ position: 'topleft', homeCoordinates:[40, -5], zoomHomeTitle:'Posición inicial'}).addTo(map);
//fullscreen						
var fsControl = new L.Control.FullScreen();
	map.addControl(fsControl);
	map.on('enterFullscreen', function(){
	if(window.console) window.console.log('enterFullscreen');
	});
	map.on('exitFullscreen', function(){
	if(window.console) window.console.log('exitFullscreen');
	});
	L.control.scale().addTo(map);

///////////Estilo de las capas especificas del visor///////////


//capas de limites

//prov_limit.js
/*
function styleprov(feature) {
	return {
		//fillColor: getColor1(feature.properties.), aqui relleno no se asocia a ningun valor
		weight: 0.3,
		opacity: 1,
		color: 'black',
		dashArray: '0',
		//fillOpacity: 0.8
	};

};

var prov = L.geoJson(prov_limit,{
	style: styleprov,
	
}).addTo(map);
*/
// CAPAS RASTER 

var rast_1 = L.imageOverlay('images/vs1d1.png',
        imageBounds = [[42.71902, -9.23921], [42.08066, -8.40114]]).setOpacity(0.6);

var rast_2 = L.imageOverlay('images/vs2d1.png',
        imageBounds = [[42.71902, -9.23921], [42.08066, -8.40114]]).setOpacity(0.6);
        
var rast_3 = L.imageOverlay('images/cdvd1.png',
        imageBounds = [[42.71902, -9.23921], [42.080066, -8.40114]]).setOpacity(0.6);
        
var rast_4 = L.imageOverlay('images/mp1d1.png',
        imageBounds = [[42.71902, -9.23921], [42.08066, -8.40114]]).setOpacity(0.6);
        
var rast_5 = L.imageOverlay('images/mp2d1.png',
        imageBounds = [[42.71902, -9.23921], [42.08066, -8.40114]]).setOpacity(0.6);
        
var rast_6 = L.imageOverlay('images/mmcd1.png',
        imageBounds = [[42.71902, -9.23921], [42.08066, -8.40114]]).setOpacity(0.6);
        

//estilo y popups islas atlanticas ver_set_1


/* >> es transparente

function getColor1(a) {
	return a < 150 ? '#fedb99' :
	a < 300  ? '#ffbf99' : 
	a <450 ? '#ffa998' :
	a <600 ? '#f63433': 
	a <750  ? '#d83232' :
	a <900 ? '#c23232' :
	a <1050 ? '#8f3433' : 
	a <1200  ? '#72004d' :
	a <1351  ? '#950076' :
		'YELLOW';
};

*/

function style1(feature) {
	return {
		fillColor: 'white',
		weight: 0,
		opacity: 0,
		color: 'black',
		dashArray: '0',
		fillOpacity: 0,
	};

};

function popup1(feature, layer) {

	if (feature.properties && feature.properties.ver_set_1) {
		layer.bindTooltip("<div id='custom'>"
		+"<strong></strong>"+feature.properties.muni+"<br>"

		+"<strong>Número de días de verano: </strong>"+feature.properties.ver_set_1.toFixed(1).toLocaleString().replace(".",",")+"<br>",
			
			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};

var geojson1 = L.geoJson(tabla,{
	style: style1,
	onEachFeature: popup1
});



/*
//estilos y pop up islas atlanticas ver_set_2

function getColor2(a) {
	return a < 150 ? '#fedb99' :
	a < 300  ? '#ffbf99' : 
	a <450 ? '#ffa998' :
	a <600 ? '#f63433': 
	a <750  ? '#d83232' :
	a <900 ? '#c23232' :
	a <1050 ? '#8f3433' : 
	a <1200  ? '#72004d' :
	a <1351  ? '#950076' :
		'YELLOW';
};

*/
function style2(feature) {
	return {
		fillColor: 'white',
		weight: 0,
		opacity: 0,
		color: 'black',
		dashArray: '0',
		fillOpacity: 0
	};

};
function popup2(feature, layer) {

	if (feature.properties && feature.properties.ver_set_2) {
		layer.bindTooltip("<div id='custom'>"
		+"<strong></strong>"+feature.properties.muni+"<br>"

		+"<strong>Número de días de verano: </strong>"+feature.properties.ver_set_2.toFixed(1).toLocaleString().replace(".",",")+"<br>",

			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};




var geojson2 = L.geoJson(tabla, {
	style: style2,
	onEachFeature: popup2
});

//estilos y pop ups islas atlanticas camb_dias_veran

/*
function getColor3(a) {
	return a <-80 ? '#33518f' :
	a <-50 ? '#356bc3' :
	a <-30 ? '#7990e0' :
	a <-10 ? '#c8c8d4': 
	a <10 ? '#feffed' :
	a <30 ? '#ffd2b5' :
	a <50 ? '#fea384': 
	a <80 ? '#eb3333' :
	a <86  ? '#b93332' :	
	'#C2523C';
};

*/
function style3(feature) {
	return {
		fillColor: 'white',
		weight: 0,
		opacity: 0,
		color: 'black',
		dashArray: '0',
		fillOpacity: 0
	};

};
function popup3(feature, layer) {

	if (feature.properties && feature.properties.camb_dias_) {
		layer.bindTooltip("<div id='custom'>"
             	+"<strong></strong>"+feature.properties.muni+"<br>"
             	
             	+"<strong>Número de días de verano: </strong>"+feature.properties.camb_dias_.toFixed(1).toLocaleString().replace(".",",")+"<br>",

			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};



var geojson3 = L.geoJson(tabla, {
	style: style3,
	onEachFeature: popup3
});


//estilos y pop ups islas atlanticas minimas_p1

/*
function getColor4(a) {
	return a <-35 ? '#33518f' :
	a <-25  ? '#356bc3' :
	a <-15 ? '#7990e0' :
	a <-5 ? '#c8c8d4': 
	a <5  ? '#feffed' :
	a <15 ? '#ffd2b5' :
	a <25 ? '#fea384': 
	a <35  ? '#eb3333' :
	a <48  ? '#b93332' :	
	'#C2523C';
};

*/

function style4(feature) {
	return {
		fillColor: 'white',
		weight: 0,
		opacity: 0,
		color: 'black',
		dashArray: '0',
		fillOpacity: 0
	};

};
function popup4(feature, layer) {

	if (feature.properties && feature.properties.minimas_p1) {
		layer.bindTooltip("<div id='custom'>"
             	+"<strong></strong>"+feature.properties.muni+"<br>"
             	
             	+"<strong>Temperatura: </strong>"+feature.properties.minimas_p1.toFixed(1).toLocaleString().replace(".",",")+"ºC"+"<br>",

			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};

var geojson4 = L.geoJson(tabla, {
	style: style4,
	onEachFeature: popup4
});

// estilos y pop ups islas atlanticas minimas_p2

/*
function getColor5(a) {
	return a <-35 ? '#33518f' :
	a <-25  ? '#356bc3' :
	a <-15 ? '#7990e0' :
	a <-5 ? '#c8c8d4': 
	a <5  ? '#feffed' :
	a <15 ? '#ffd2b5' :
	a <25 ? '#fea384': 
	a <35  ? '#eb3333' :
	a <48  ? '#b93332' :	
	'#C2523C';
};

*/

function style5(feature) {
	return {
		fillColor: 'white',
		weight: 0,
		opacity: 0,
		color: 'black',
		dashArray: '0',
		fillOpacity: 0
	};

};
function popup5(feature, layer) {

	if (feature.properties && feature.properties.minimas_p2) {
		layer.bindTooltip("<div id='custom'>"
             	+"<strong></strong>"+feature.properties.muni+"<br>"
             	
             	+"<strong>Temperatura: </strong>"+feature.properties.minimas_p2.toFixed(1).toLocaleString().replace(".",",")+"ºC"+"<br>",

			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};

var geojson5 = L.geoJson(tabla, {
	style: style5,
	onEachFeature: popup5
});

// estilos y pop ups islas atlanticas medio_min_cambio

/*
function getColor6(a) {
	return a <-35 ? '#33518f' :
	a <-25  ? '#356bc3' :
	a <-15 ? '#7990e0' :
	a <-5 ? '#c8c8d4': 
	a <5  ? '#feffed' :
	a <15 ? '#ffd2b5' :
	a <25 ? '#fea384': 
	a <35  ? '#eb3333' :
	a <48  ? '#b93332' :	
	'#C2523C';
};

*/

function style6(feature) {
	return {
		fillColor: 'white',
		weight: 0,
		opacity: 0,
		color: 'black',
		dashArray: '0',
		fillOpacity: 0
	};

};

function popup6(feature, layer) {

	if (feature.properties && feature.properties.media_min_) {
		layer.bindTooltip("<div id='custom'>"
             	+"<strong></strong>"+feature.properties.muni+"<br>"

             	+"<strong>Temperatura: </strong>"+feature.properties.media_min_.toFixed(2).toLocaleString().replace(".",",")+"ºC"+"<br>",

			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};

var geojson6 = L.geoJson(tabla, {
	style: style6,
	onEachFeature: popup6

});

//capas de limites. La última capa en declarar se ubica siempre encima de las demás.

// rios.js

/*
function stylerios(feature) {
	return {
		//fillColor: getColor1(feature.properties.), aqui relleno no se asocia a ningun valor
		weight: 3,
		opacity: 1,
		color: '#42f5ef',
		dashArray: '0',
		//fillOpacity: 0.8
	};

};

var rios = L.geoJson(rios,{
	style: stylerios,
	
}).addTo(map);

*/

//Renombrado y ordenado de capas mapas geojson


var mapa1 = L.layerGroup([geojson1,rast_1]).addTo(map);
var mapa2 = L.layerGroup([geojson2,rast_2]);
var mapa3 = L.layerGroup([geojson3,rast_3]);
var mapa4 = L.layerGroup([geojson4,rast_4]);
var mapa5 = L.layerGroup([geojson5,rast_5]);
var mapa6 = L.layerGroup([geojson6,rast_6]);



// LISTA DESPLEGABLE

var baseTree = [
	{ label: "<strong>Limpiar mapa", layer: osm3 },
	{
	label: '<strong>Visor cartográfico CLIMILLAT',
	children: [
	
	{ label: "Número medio de días de verán en setembro. Período 1961-1989",layer: mapa1},
	{ label: "Número medio de días de verán en setembro. Período 1991-2019" ,layer: mapa2},
	{ label: "Cambio no número medio de días de verán en setembro entre os períodos 1961-1989 e 1991-2019",layer: mapa3},
	{ label: "Temperatura media das mínimas anual. Período 1961-1989",layer: mapa4},
	{ label: "Temperatura media das mínimas anual. Período 1991-2019",layer: mapa5},
	{ label: "Cambio na temperatura media das mínimas anual entre os períodos 1961-1989 e 1991-2019",layer: mapa6}
		
		 ]
	},
	];
	
	
var overlayTree = {
	label: 'Mapas de referencia',
	children: [
	
		//{ label: "<b>Límites de Comunidades Autónomas", layer: comunidades},
		{ label: "OpenStreetMap", layer: osm},
		]
};	

// ver_set_1

var htmlLegend1 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h2>"+ 'Número medio de días de verán en setembro no Parque Nacional Marítimo-Terrestre das Illas Atlánticas de Galicia e a súa área de influencia socioeconómica. Período 1961-1989'+"<\h2>",
			style: style1,
			layer: geojson1,
			elements: [{


				label:"<h4>"+  '<br>Resolución 100 m<br> Día de verán: xornada coa temperatura máxima ≥ 25ºC <br><br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
		        	label:"<h3>"+  '<br> Días'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<strong><h3>"+  '4 - 5'+"</strong><\h15>",html: '',style: {'background-color': '#fbdf5c','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '5 - 6'+"</strong><\h15>",html: '',style: {'background-color': '#f6c000','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '6 - 7'+"</strong><\h15>",html: '',style: {'background-color': '#f1a000','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '7 - 8'+"</strong><\h15>",html: '',style: {'background-color': '#f79000','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '8 - 9'+"</strong><\h15>",html: '',style: {'background-color': '#fe8200','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '9 - 10'+"</strong><\h15>",html: '',style: {'background-color': '#fb3600','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '10 - 11'+"</strong><\h15>",html: '',style: {'background-color': '#e40300','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '11 - 12'+"</strong><\h15>",html: '',style: {'background-color': '#b70100','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '11 - 12'+"</strong><\h15>",html: '',style: {'background-color': '#960000','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				
				label: "<h5>" +'<BR><i>Fonte: CLIMILLAT, elaboración propia con datos da Axencia Estatal de Meteoroloxía (2021)<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend1);


// ver_set_2

var htmlLegend2 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h2>"+ 'Número medio de días de verán en setembro no Parque Nacional Marítimo-Terrestre das Illas Atlánticas de Galicia e a súa área de influencia socioeconómica. Período 1991-2019'+"<\h2>",
			style: style2,
			layer: geojson2,
			elements: [{


				label:"<h4>"+  '<br>Resolución 100 m<br> Día de verán: xornada coa temperatura máxima ≥ 25ºC <br><br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
		        	label:"<h3>"+  '<br> Días'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<strong><h3>"+  '4 - 5'+"</strong><\h15>",html: '',style: {'background-color': '#fbdf5c','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '5 - 6'+"</strong><\h15>",html: '',style: {'background-color': '#f6c000','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '6 - 7'+"</strong><\h15>",html: '',style: {'background-color': '#f1a000','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '7 - 8'+"</strong><\h15>",html: '',style: {'background-color': '#f79000','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '8 - 9'+"</strong><\h15>",html: '',style: {'background-color': '#fe8200','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '9 - 10'+"</strong><\h15>",html: '',style: {'background-color': '#fb3600','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '10 - 11'+"</strong><\h15>",html: '',style: {'background-color': '#e40300','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '11 - 12'+"</strong><\h15>",html: '',style: {'background-color': '#b70100','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '11 - 12'+"</strong><\h15>",html: '',style: {'background-color': '#960000','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				
				label: "<h5>" +'<BR><i>Fonte: CLIMILLAT, elaboración propia con datos da Axencia Estatal de Meteoroloxía (2021)<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend2);


// camb_dias_veran

var htmlLegend3 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h2>"+ 'Cambio no número medio de días de verán en setembro entre os períodos 1961-1989 e 1991-2019 no Parque Nacional Marítimo-Terrestre das Illas Atlánticas de Galicia e a súa área de influencia socioeconómica'+"<\h2>",
			style: style3,
			layer: geojson3,
			elements: [{


				label:"<h4>"+  '<br>Resolución 100 m<br> Día de verán: xornada coa temperatura máxima ≥ 25ºC <br><br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
		        	label:"<h3>"+  '<br> Días'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<strong><h3>"+  '0 ‒ 1'+"</strong><\h15>",html: '',style: {'background-color': '#ffffe7','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '1 ‒ 2'+"</strong><\h15>",html: '',style: {'background-color': '#ffccad','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '2 ‒ 3'+"</strong><\h15>",html: '',style: {'background-color': '#ffad98','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '3 ‒ 4'+"</strong><\h15>",html: '',style: {'background-color': '#fb8c88','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '4 ‒ 5'+"</strong><\h15>",html: '',style: {'background-color': '#ee4d45','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '5 ‒ 6'+"</strong><\h15>",html: '',style: {'background-color': '#cc3433','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '6 ‒ 7'+"</strong><\h15>",html: '',style: {'background-color': '#ad3332','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '7 ‒ 8'+"</strong><\h15>",html: '',style: {'background-color': '#8f3433','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
						
				
				label: "<h5>" +'<BR><i>Fonte: CLIMILLAT, elaboración propia con datos da Axencia Estatal de Meteoroloxía (2021)<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend3);



// minimas_p1

var htmlLegend4 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h2>"+ 'Temperatura media das mínimas anual no Parque Nacional Marítimo-Terrestre das Illas Atlánticas de Galicia e a súa área de influencia socioeconómica. Período 1961-1989'+"<\h2>",
			style: style4,
			layer: geojson4,
			elements: [{


				label:"<h4>"+  '<br>Resolución 100 m <br><br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
		        	label:"<h3>"+  '<br> ºC'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<strong><h3>"+  '6 ‒ 6,5'+"</strong><\h15>",html: '',style: {'background-color': '#ffb1c8','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '6,5 ‒ 7'+"</strong><\h15>",html: '',style: {'background-color': '#e600fb','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '7 ‒ 7,5'+"</strong><\h15>",html: '',style: {'background-color': '#610087','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '7,5 ‒ 8'+"</strong><\h15>",html: '',style: {'background-color': '#1f006d','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '8 ‒ 8,5'+"</strong><\h15>",html: '',style: {'background-color': '#0057ef','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '8,5 ‒ 9'+"</strong><\h15>",html: '',style: {'background-color': '#bbe9d9','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '9 ‒ 9,5'+"</strong><\h15>",html: '',style: {'background-color': '#068506','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '9,5 ‒ 10'+"</strong><\h15>",html: '',style: {'background-color': '#84b939','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '10 ‒ 10,5'+"</strong><\h15>",html: '',style: {'background-color': '#ffffc5','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '10,5 ‒ 11'+"</strong><\h15>",html: '',style: {'background-color': '#d98e00','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				

				label: "<h5>" +'<BR><i>Fonte: CLIMILLAT, elaboración propia con datos da Axencia Estatal de Meteoroloxía (2021)<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend4);

// minimas_p2

var htmlLegend5 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h2>"+ 'Temperatura media das mínimas anual no Parque Nacional Marítimo-Terrestre das Illas Atlánticas de Galicia e a súa área de influencia socioeconómica. Período 1991-2019'+"<\h2>",
			style: style5,
			layer: geojson5,
			elements: [{


				label:"<h4>"+  '<br>Resolución 100 m <br><br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
		        	label:"<h3>"+  '<br> ºC'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<strong><h3>"+  '6 ‒ 6,5'+"</strong><\h15>",html: '',style: {'background-color': '#ffb1c8','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '6,5 ‒ 7'+"</strong><\h15>",html: '',style: {'background-color': '#e600fb','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '7 ‒ 7,5'+"</strong><\h15>",html: '',style: {'background-color': '#610087','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '7,5 ‒ 8'+"</strong><\h15>",html: '',style: {'background-color': '#1f006d','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '8 ‒ 8,5'+"</strong><\h15>",html: '',style: {'background-color': '#0057ef','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '8,5 ‒ 9'+"</strong><\h15>",html: '',style: {'background-color': '#bbe9d9','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '9 ‒ 9,5'+"</strong><\h15>",html: '',style: {'background-color': '#068506','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '9,5 ‒ 10'+"</strong><\h15>",html: '',style: {'background-color': '#84b939','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '10 ‒ 10,5'+"</strong><\h15>",html: '',style: {'background-color': '#ffffc5','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '10,5 ‒ 11'+"</strong><\h15>",html: '',style: {'background-color': '#d98e00','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				

				label: "<h5>" +'<BR><i>Fonte: CLIMILLAT, elaboración propia con datos da Axencia Estatal de Meteoroloxía (2021)<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend5);

// medio_min_cambio

var htmlLegend6 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h2>"+ 'Cambio na temperatura media das mínimas anual entre os períodos 1961-1989 e 1991-2019 no Parque Nacional Marítimo-Terrestre das Illas Atlánticas de Galicia e a súa área de influencia socioeconómica'+"<\h2>",
			style: style6,
			layer: geojson6,
			elements: [{


				label:"<h4>"+  '<br>Resolución 100 m <br><br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
		        	label:"<h3>"+  '<br> ºC'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<strong><h3>"+  '0,6 ‒ 0,7'+"</strong><\h15>",html: '',style: {'background-color': '#ffffe7','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '0,7 ‒ 0,8'+"</strong><\h15>",html: '',style: {'background-color': '#ec6255','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '0,8 ‒ 0,9'+"</strong><\h15>",html: '',style: {'background-color': '#d50000','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				/*label:"<strong><h3>"+  '0,5 ‒ 0,6'+"</strong><\h15>",html: '',style: {'background-color': '#ffffe7','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '0,6 ‒ 0,7'+"</strong><\h15>",html: '',style: {'background-color': '#ffffe7','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '0,7 ‒ 0,8'+"</strong><\h15>",html: '',style: {'background-color': '#ec6255','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '0,8 ‒ 0,9'+"</strong><\h15>",html: '',style: {'background-color': '#d50000','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				/*label:"<strong><h3>"+  '9,5 ‒ 10'+"</strong><\h15>",html: '',style: {'background-color': '#84b939','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '10 ‒ 10,5'+"</strong><\h15>",html: '',style: {'background-color': '#ffffc5','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '10,5 ‒ 11'+"</strong><\h15>",html: '',style: {'background-color': '#d98e00','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				*/

				label: "<h5>" +'<BR><i>Fonte: CLIMILLAT, elaboración propia con datos da Axencia Estatal de Meteoroloxía (2021)<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend6);


//Visualizar capas
// L.control.layers(baseLayers, overlays,{collapsed:true, position: 'topright',}).addTo(map);
L.control.layers.tree(baseTree, overlayTree).addTo(map);

//boton de informacion 
var button2 = new L.Control.Button(L.DomUtil.get('helpbutton2'), { toggleButton: 'active', position: 'topright'});
	button2.addTo(map);
	button2.on('click', function () {
	 if (button2.isToggled()) {
			sidebar2.hide();
		} else {
			sidebar2.show();
		}
	});