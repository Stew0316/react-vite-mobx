
import { useRef, useEffect } from 'react'



function Index() {
  const domRef = useRef()
  const ctx_width = window.innerWidth - 200
  const height = window.innerHeight - 60 - 1
  let ctx = null
  const canvasStyle = {
    width: `${ctx_width}px`,
    height: `${height}px`,
    display: 'block',
    background: 'skyblue'
  }
  const interval = 38
  let limit = 150
  let word_space = 30
  let lineWidth = 3
  let color = '#fff'
  let width = limit * 7 + word_space * 6
  let start = ctx_width / 2 - width / 2
  let half = height / 2;
  let line_one = height / 2 - limit * 1.5;
  let line_two = height / 2 - limit / 2;
  let line_three = height / 2 + limit / 2;
  let line_four = height / 2 + limit * 1.5;
  let w_x = start
  let w_y = line_two
  
  let w_mark = 1;
  let e_x = start + 180
  let e_y = height / 2
  let e_deg = 0;
  //l
  let l_x = start + 180 + 255;
  let l_y = line_one;
  //c
  let c_x = start + 180 + 255 + 180;
  let c_y = height / 2;
  let c_deg = 40;
  //o
  let o_x = start + 180 + 255 + 180 + 180;
  let o_y = height / 2;
  let o_deg = 2;
  //m
  let m_x = start + 180 + 255 + 180 + 180 + 105;
  let m_y = line_three;
  //e
  let e_x_end = start + 180 + 255 + 180 + 180 + 105 + 180
  let e_y_end = height / 2
  let e_deg_end = 0;
  function ctx_w() {
    let mark;
    if (w_mark % 2 != 0) {
      mark = 1
    } else {
      mark = -1
    }
    ctx_render(mark)
  }
  function ctx_render(mark) {
    ctx.beginPath();
    ctx.moveTo(w_x, w_y);
    w_y = w_y + 4 * mark;
    w_x = w_x + 1;
    ctx.lineTo(w_x, w_y);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth
    ctx.stroke();
    ctx.closePath();
    if (w_x != start + interval * w_mark) {
      requestAnimationFrame(() => {
        ctx_render(mark)
      });
    } else {
      if (w_mark == 4) {
        return
      };
      w_mark++;
      ctx_w()
    }
  }
  function init() {
    ctx_w();//画w
    ctx_e();//画第一个e
    ctx_l();//画l
    ctx_c();//画c
    ctx_o();//画o
    ctx_m_left();//画m
    ctx_e_end();//画第二个e
  }
  function ctx_e() {

    ctx.beginPath();
    ctx.moveTo(e_x, e_y);
    e_x += 1;
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineTo(e_x, e_y);
    ctx.stroke();
    ctx.closePath();
    if (e_x <= start + 180 + limit) {
      requestAnimationFrame(ctx_e)
    } else {
      ctx_e_round();
    }
  }
  //画l
  function ctx_l() {
    ctx.beginPath();
    ctx.lineWidth = lineWidth * 1.5;
    ctx.strokeStyle = color;
    ctx.moveTo(l_x, l_y);
    l_y += 1;
    ctx.lineTo(l_x, l_y);
    ctx.stroke();
    ctx.closePath();
    if (l_y <= line_three) {
      requestAnimationFrame(ctx_l)
    } else {
      ctx_e_round();
    }
  }
  //画c
  function ctx_c() {
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.arc(c_x, c_y, limit / 2, Math.PI / 180 * -40, Math.PI / 180 * -1 * c_deg, true);
    ctx.stroke();
    ctx.closePath();
    c_deg += 1;
    if (c_deg < 320) {
      requestAnimationFrame(ctx_c)
    }
  } 
  //画o
  function ctx_o() {
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.arc(o_x, o_y, limit / 2, 0, Math.PI / 180 * -1 * o_deg, true);
    ctx.stroke();
    ctx.closePath();
    o_deg += 1;
    if (o_deg <= 360) {
      requestAnimationFrame(ctx_o)
    }
  }
  //画m左边
  function ctx_m_left() {
    //y=ax2+bx+c 
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.moveTo(m_x, m_y);
    m_x = m_x + 0.5;
    m_y =  0.10666666666666667 * (m_x) * (m_x)  -211.30666666666667 * (m_x) + 104905.12666666666;
    ctx.lineTo(m_x, m_y);
    ctx.closePath();
    ctx.stroke();
    if (m_y <= line_three + 1) {
      requestAnimationFrame(ctx_m_left)
    } else {
      requestAnimationFrame(ctx_m_right)
    }
  }
  //画m的右边
  function ctx_m_right() {
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.moveTo(m_x, m_y);
    m_x = m_x + 0.5;
    m_y = 0.10666666666666667 * (m_x) * (m_x) -227.30666666666667 * (m_x) + 121353.12666666666;
    ctx.lineTo(m_x, m_y);
    ctx.closePath();
    ctx.stroke();
    if (m_y <= line_three) {
      requestAnimationFrame(ctx_m_right)
    }
  }
  function ctx_e_end() {
    ctx.beginPath();
    ctx.moveTo(e_x_end, e_y_end);
    e_x_end += 1;
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineTo(e_x_end, e_y);
    ctx.stroke();
    ctx.closePath();
    if (e_x_end <= start + 180 + 255 + 180 + 180 + 105 + 180 + 150) {
      requestAnimationFrame(ctx_e_end)
    } else {
      ctx_e_end_round();
    }
  }
  function ctx_e_end_round() {
    //画圆
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.arc(start + 180 + 255 + 180 + 180 + 105 + 105 + 150, line_two + 75, limit / 2, 0, Math.PI / 180 * e_deg_end * -1, true);
    ctx.stroke();
    ctx.closePath();
    e_deg_end += 2;
    if (e_deg_end < 320) {
      requestAnimationFrame(ctx_e_end_round)
    }
  }
  function ctx_e_round() {
    //画圆弧
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.arc(start + 255, line_two + 75, limit / 2, 0, Math.PI / 180 * e_deg * -1, true);
    ctx.stroke();
    ctx.closePath();
    e_deg += 2;
    if (e_deg < 320) {
      requestAnimationFrame(ctx_e_round)
    }
  }
  useEffect(() => {
    ctx = domRef.current.getContext('2d')
    init()
  })
  return (
    <>
      <canvas style={canvasStyle} ref={domRef} width={ctx_width} height={height}></canvas>
    </>
  )
}

export default Index