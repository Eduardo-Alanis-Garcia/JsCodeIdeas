// Crear el mapa con TimeDimension activado
var map = L.map('map', {
  center: [40.0, -3.5],  // latitud, longitud de ejemplo
  zoom: 5,
  timeDimension: true,
  timeDimensionOptions: {
    timeInterval: "2025-09-01/2025-09-30",
    period: "P1D"   // intervalo de 1 día
  },
  timeDimensionControl: true,
  timeDimensionControlOptions: {
    position: 'bottomleft',
    autoPlay: false,
    timeSliderDragUpdate: true
  }
});

// Capa WMS que tiene dimensión temporal
var wmsUrl = 'https://mi-servidor/mi_wms';   // reemplaza con tu WMS
var wmsLayer = L.tileLayer.wms(wmsUrl, {
  layers: 'nombre_de_la_capa_temporal',   // tu capa
  format: 'image/png',
  transparent: true,
  attribution: 'Datos temporales'
});

// Enlazar la capa WMS con TimeDimension
var tdWmsLayer = L.timeDimension.layer.wms(wmsLayer, {
  // opciones adicionales si las necesitas
  updateTimeDimension: true,  // para que TimeDimension use los tiempos proporcionados por el WMS
  cache: 2
});

// Agregar la capa al mapa
tdWmsLayer.addTo(map);

// Opcional: escuchar eventos de cambio de tiempo
map.timeDimension.on('timeload', function(e) {
  console.log("Se cargó el tiempo:", new Date(e.time));  
});
