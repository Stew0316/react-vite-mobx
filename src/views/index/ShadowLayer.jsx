import { useState, useRef, useEffect } from "react";
import { latlngs2Str, base2Latlngs } from "./mapOptions";
import chinaJson from "./china.json";
const com = {
  light: {
    color: "red",
    blur: 20,
    x: 0,
    y: 0,
  },
};
function MapShadow({ map, ...props }) {
  const [size, setSize] = useState({
    x: 0,
    y: 0,
  });
  const shadowRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [newPos, setNewPos] = useState({
    x: 0,
    y: 0,
  });
  const draw = () => {
    let arr = [];
    arr = latlngs2Str(chinaJson.features, map);
    ctx.clearRect(0, 0, size.x, size.y);
    ctx.save();
    ctx.shadowColor = com.light.color;
    ctx.shadowBlur = com.light.blur;
    ctx.shadowOffsetX = com.light.x;
    ctx.shadowOffsetY = com.light.y;
    path(ctx, arr)
    ctx.fillStyle = com.light.color;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
    ctx.save();
    // ctx.translate(this.newPos.x,this.newPos.y)
    ctx.globalCompositeOperation = "destination-out";
    path(ctx, arr)
    ctx.fillStyle = com.light.color;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
    const img = new Image();
    img.src = "https://p3-sdbk2-media.byteimg.com/tos-cn-i-xv4ileqgde/5ba62088fc4048d69cbf62b990333aa4~tplv-xv4ileqgde-resize-w:750.image"; // 图片URL，替换成你需要的图片
    img.onload = () => {
        // 绘制多边形背景
        path(ctx, arr)
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, 0, 0, size.x, size.y);
    };
  };
  const path = (ctx, arr) => {
    ctx.beginPath();
    for (let i = 0; i < arr.length; i++) {
      let item = arr[i];
      let str = item.substring(0, item.length - 1);
      let data = str.split(" ");
      for (let j = 0; j < data.length; j++) {
        let [x, y] = data[j].split(",");
        if (j == 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
    }
  }
  useEffect(() => {
    setCtx(shadowRef.current.getContext("2d"));
  }, []);
  useEffect(() => {
    if (!map) return;
    setSize(prevUser => ({...prevUser,...map.getSize()}));
    map.on("moveend", (data) => {
      setNewPos(data.target.dragging._lastPos || { x: 0, y: 0 });
    });
  }, [map]);
  useEffect(() => {
    if (!size.x || !size.y) return; // 确保 size 已更新
    draw();  // 依赖于 size 更新
    
  }, [size]);  // size 变化时重新触发 draw
  return (
    <div
      className="map-shadow"
      style={{
        position: "absolute",
        zIndex: 1000,
        width: "100%",
        transform: `translate3d(${newPos.x}px,${newPos.y}px,0)`,
        transition: "all 0.3s",
      }}
    >
      <canvas ref={shadowRef} width={size.x} height={size.y}></canvas>
    </div>
  );
}

export default MapShadow;
