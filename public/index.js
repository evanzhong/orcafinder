let MAP = null;
const DOMAIN = window.location.host;
const INIT_CENTER = [-122.3, 47.6];
const INIT_ZOOM = 12

function initMap() {
  fetch(`http://${DOMAIN}/map-styles`)
    .then((response) => response.json())
    .then((styles) => {
      MAP = new maplibregl.Map({
        container: "map",
        style: styles,
        center: INIT_CENTER,
        zoom: INIT_ZOOM,
      });
    });
}

initMap();
