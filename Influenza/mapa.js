var mapa = L.map('mapa', {
    zoom: 9,
    center: [20, -98],
    timeDimension: true,
    timeDimensionControl: true,
    timeDimensionOptions: {
        period: "P1M"
    },
    timeDimensionControl: true,
});


L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(mapa);


influenza = influenza_datos

influenza.features.forEach(feature => {
    feature.properties.time = feature.properties.Fecha + "T00:00:00Z"; 
});


const influenza_capa = L.geoJson(influenza, {
    pointToLayer: function (feature, latlng) {
        const casos = feature.properties.Casos;

        if (casos <= 0) { return; }

        const radio = Math.sqrt(casos) * 2;
        return L.circleMarker(latlng, {
            radius: radio,
            fillColor: "red",
            color: "darkred",
            weight: 1,
            opacity: 1,
        });
    },
    onEachFeature: function (feature, layer) {
        const popupContent = `
            <strong>Fecha:</strong> ${feature.properties.Fecha}<br/>
            <strong>Entidad:</strong> ${feature.properties.Estado}<br/>
            <strong>Casos:</strong> ${feature.properties.Casos}<br/>
            `;
        layer.bindPopup(popupContent);
    }
});

const influenza_timedim = L.timeDimension.layer.geoJson(influenza_capa, {
    updateTimeDimension: true,
    addLastPoint: false,
    duration: "PT0S"
});

influenza_timedim.addTo(mapa);
