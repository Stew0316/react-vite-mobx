import 'leaflet/dist/leaflet.css'
import leaflet from 'leaflet'
import { useEffect } from 'react'
function Map () {
  useEffect(() => {
    // console.log(111)
    const map = L.map('map', {
      center: L.latLng(25.431, 119.008),
      zoom: 14,
    });
    
    const key = import.meta.env.VITE_MAP_TOKEN;
    // mapbox://styles/185975315/clv9cnd4d00ol01rj8tcadqm0
    // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //     maxZoom: 19,
    //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    // }).addTo(map);
    L.tileLayer(`https://api.mapbox.com/styles/v1/185975315/clv9cnd4d00ol01rj8tcadqm0/tiles/256/{z}/{x}/{y}@2x?access_token=${key}`, {
        maxZoom: 19,
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