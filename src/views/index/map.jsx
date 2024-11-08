import 'leaflet/dist/leaflet.css'
import leaflet from 'leaflet'
import { useEffect } from 'react'
import chinaJson from './china.json'
import pic from '/fac.jpg'
function init() {
  const canvasRenderer = L.canvas();
  const map = L.map('map', {
    center: L.latLng(28.431, 119.008),
    zoom: 4,
    preferCanvas: true
  });
  var canvasLayer = L.layerGroup().addTo(map);
  // 这里需要在env里自己配一个maptoken，来自于mapbox的token
  const key = import.meta.env.VITE_MAP_TOKEN;
  L.tileLayer(`https://api.mapbox.com/styles/v1/185975315/clv9cnd4d00ol01rj8tcadqm0/tiles/256/{z}/{x}/{y}@2x?access_token=${key}`, {
      minZoom: 4,
      // zoom: 14,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  const jsonLayer = L.geoJSON(chinaJson)
  jsonLayer.addTo(canvasLayer);
}

function Map () {
  
  useEffect(() => {
    init()
  }, [])
  return (
    <div id='map' style={{
      height: '100%',
      position: 'relative',
    }}></div>
  )
}

export default Map