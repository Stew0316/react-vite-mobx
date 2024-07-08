import 'leaflet/dist/leaflet.css'
import leaflet from 'leaflet'
import { useEffect } from 'react'
function Map () {
  useEffect(() => {
    const map = L.map('map', {
      center: L.latLng(25.431, 119.008),
      zoom: 12,
    });
    // 这里需要在env里自己配一个maptoken，来自于mapbox的token
    const key = import.meta.env.VITE_MAP_TOKEN;
    L.tileLayer(`https://api.mapbox.com/styles/v1/185975315/clv9cnd4d00ol01rj8tcadqm0/tiles/256/{z}/{x}/{y}@2x?access_token=${key}`, {
        maxZoom: 22,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
  }, [])
  return (
    <div id='map' style={{
      height: '100%'
    }}>map</div>
  )
}

export default Map