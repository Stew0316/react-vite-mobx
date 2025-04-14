export const base2Latlngs = (base) => {
  let arr = []
  base.forEach(item=>{
    let loop = JSON.parse(JSON.stringify(item.geometry.coordinates))
    var polygon = L.polygon(loop)
    arr.push(polygon._latlngs)
  })
  return arr
}

export const latlngs2Str = (base, map) => {
  let res = base2Latlngs(base)
  let arr = []
  function loop(data) {
    let isArr = data.some(item=>{
      return Array.isArray(item)
    })
    if(isArr) {
      for(let i in data) {
        loop(data[i])
      }
    } else {
      let str = ''
      data.forEach(val=>{
        let { x,y } = map.latLngToContainerPoint([val.lng,val.lat])
        str+=`${x},${y} `
      })
      arr.push(str)
    }
  }
  loop(res)
  return arr
}