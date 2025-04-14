import 'leaflet/dist/leaflet.css'
import leaflet from 'leaflet'
import { useEffect, useState } from 'react'
import chinaJson from './china.json'
import pic from '/fac.jpg'
import MapShadow from './ShadowLayer'
import { LOCAL_ENV } from '@/common/localData'
function init(setMap) {
  const map = L.map('map', {
    center: L.latLng(34.322700, 108.552500),
    zoom: 4,
    preferCanvas: true,
    zoomControl: false,
  });
  setMap(map)
  var canvasLayer = L.layerGroup().addTo(map);
  // 这里需要在env里自己配一个maptoken，来自于mapbox的token
  const key = LOCAL_ENV.VITE_MAP_TOKEN;
  L.tileLayer(`https://api.mapbox.com/styles/v1/185975315/clv9cnd4d00ol01rj8tcadqm0/tiles/256/{z}/{x}/{y}@2x?access_token=${key}`, {
      minZoom: 4,
      maxZoom: 4,
      // zoom: 14,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  const jsonLayer = L.geoJSON(chinaJson)
  jsonLayer.addTo(canvasLayer);
}

function Map () {
  const [map, setMap] = useState(null)
  useEffect(() => {
    init(setMap)
  }, [])
  return (
    <div id='map' style={{
      height: '100%',
      position: 'relative',
    }}>
      <MapShadow map={map}></MapShadow>
    </div>
    
  )
}

export default Map