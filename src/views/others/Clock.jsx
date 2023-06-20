//此处来源于mdn的canvas案例
import { useEffect, useRef } from "react"
function Clock() {
  const domRef = useRef()
  let ctx = null
  let ani = null
  const width = window.innerWidth
  const height = window.innerHeight - 1
  const canvasStyle = {
    width: `${width}px`,
    height: `${height}px`,
    display: 'block',
    background: 'transparent'
  }
  function render_clock() {
    var now = new Date();
    ctx.save();
    ctx.clearRect(0, 0, width, height);
    ctx.translate(width / 2, height / 2);
    // ctx.scale(0.4,0.4);
    // ctx.rotate(-Math.PI/2);
    ctx.strokeStyle = "#2F4F4F";
    ctx.fillStyle = "white";
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    // Hour marks
    ctx.save();
    for (var i = 0; i < 12; i++) {
      ctx.beginPath();
      ctx.rotate(Math.PI / 6);
      ctx.moveTo(100, 0);
      ctx.lineTo(120, 0);
      ctx.stroke();
    }
    ctx.restore();
    // Minute marks
    ctx.save();
    ctx.lineWidth = 5;
    for (i = 0; i < 60; i++) {
      if (i % 5 != 0) {
        ctx.beginPath();
        ctx.moveTo(117, 0);
        ctx.lineTo(120, 0);
        ctx.stroke();
      }
      ctx.rotate(Math.PI / 30);
    }
    ctx.restore();

    var sec = now.getSeconds();
    var min = now.getMinutes();
    var hr = now.getHours();
    hr = hr >= 12 ? hr - 12 : hr;

    ctx.fillStyle = "#2F4F4F";

    // write Hours
    ctx.save();
    ctx.rotate(hr * (Math.PI / 6) + (Math.PI / 360) * min + (Math.PI / 21600) * sec - Math.PI / 2)
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(-20, 0);
    ctx.lineTo(80, 0);
    ctx.stroke();
    ctx.restore();

    // write Minutes
    ctx.save();
    ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec - Math.PI / 2)
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(-28, 0);
    ctx.lineTo(105, 0);
    ctx.stroke();
    ctx.restore();

    // Write seconds
    ctx.save();
    ctx.rotate(sec * Math.PI / 30);
    ctx.strokeStyle = "#D40000";
    ctx.fillStyle = "#D40000";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(-30, 0);
    ctx.lineTo(83, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.arc(0, 0, 3, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.restore();

    ctx.beginPath();
    ctx.lineWidth = 12;
    ctx.strokeStyle = '#325FA2';
    ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.font = "48px serif";
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.direction = 'ltr'
    ctx.fillText("CLOCK", 0, -260);
    ctx.fillStyle = '#000';
    ctx.font = "34px serif";
    ctx.fillText("III", 180, 0);
    ctx.fillText("VI", 0, 180);
    ctx.fillText("IX", -180, 0);
    ctx.fillText("XII", 0, -180);
    ctx.restore();

    ani = window.requestAnimationFrame(render_clock);
  }
  useEffect(() => {
    ctx = domRef.current.getContext('2d')
    render_clock()
    return function cleanup() {
      // 需要在 componentWillUnmount 执行的内容    
      // console.log(22222) 
      cancelAnimationFrame(ani) 
    }
  })
  return (
    <>
      <canvas style={canvasStyle} ref={domRef} width={width} height={height} />
    </>
  )
}

export default Clock