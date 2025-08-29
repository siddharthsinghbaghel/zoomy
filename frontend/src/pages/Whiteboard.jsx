import React, { useEffect, useRef, useState } from "react";

const throttle = (fn, limit = 16) => {
  let inThrottle = false;
  let lastArgs = null;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
        if (lastArgs) {
          fn.apply(this, lastArgs);
          lastArgs = null;
        }
      }, limit);
    } else {
      lastArgs = args;
    }
  };
};

export default function Whiteboard({ socket, roomId, onClose }) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const drawing = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  const [tool, setTool] = useState("pen"); // 'pen' | 'eraser'
  const [color, setColor] = useState("#ff4757");
  const [size, setSize] = useState(4);

  // Resize canvas to fit parent (and keep content)
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const data = canvas.toDataURL();
    const parent = canvas.parentElement;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = parent.clientWidth * dpr;
    canvas.height = parent.clientHeight * dpr;
    canvas.style.width = parent.clientWidth + "px";
    canvas.style.height = parent.clientHeight + "px";

    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctxRef.current = ctx;

    // restore
    const img = new Image();
    img.onload = () => ctx.drawImage(img, 0, 0, parent.clientWidth, parent.clientHeight);
    img.src = data;
  };

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  useEffect(() => {
    if (!socket) return;

    const onRemoteDraw = (seg) => {
      const ctx = ctxRef.current;
      if (!ctx) return;
      drawSegment(ctx, seg);
    };
    const onRemoteClear = () => clearBoardLocal();
    socket.on("wb-draw", onRemoteDraw);
    socket.on("wb-clear", onRemoteClear);

    return () => {
      socket.off("wb-draw", onRemoteDraw);
      socket.off("wb-clear", onRemoteClear);
    };
  }, [socket]);

  const getPoint = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    return { x, y };
  };

  const start = (e) => {
    e.preventDefault();
    drawing.current = true;
    last.current = getPoint(e);
  };

  const move = throttle((e) => {
    if (!drawing.current) return;
    const ctx = ctxRef.current;
    if (!ctx) return;
    const p = getPoint(e);
    const seg = {
      x0: last.current.x,
      y0: last.current.y,
      x1: p.x,
      y1: p.y,
      color: tool === "eraser" ? "eraser" : color,
      size,
    };
    drawSegment(ctx, seg);
    last.current = p;
    if (socket && roomId) socket.emit("wb-draw", { roomId, seg });
  }, 8);

  const end = () => {
    drawing.current = false;
  };

  const drawSegment = (ctx, seg) => {
    ctx.save();
    if (seg.color === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.strokeStyle = "rgba(0,0,0,1)";
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = seg.color;
    }
    ctx.lineWidth = seg.size;
    ctx.beginPath();
    ctx.moveTo(seg.x0, seg.y0);
    ctx.lineTo(seg.x1, seg.y1);
    ctx.stroke();
    ctx.restore();
  };

  const clearBoardLocal = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const clearBoard = () => {
    clearBoardLocal();
    socket?.emit("wb-clear", { roomId });
  };

  const exportPNG = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = `whiteboard-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="wb-wrap">
      <div className="wb-toolbar">
        <button className={tool === "pen" ? "wb-btn active" : "wb-btn"} onClick={() => setTool("pen")}>✏️ Pen</button>
        <button className={tool === "eraser" ? "wb-btn active" : "wb-btn"} onClick={() => setTool("eraser")}>🧽 Eraser</button>

        <label className="wb-swatch">
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} disabled={tool === "eraser"} />
        </label>

        <input
          type="range"
          min={1}
          max={32}
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value, 10))}
          className="wb-range"
          title="Brush size"
        />

        <button className="wb-btn" onClick={clearBoard}>🗑️ Clear</button>
        <button className="wb-btn" onClick={exportPNG}>⬇️ Export</button>
        <button className="wb-btn close" onClick={onClose}>✖ Close</button>
      </div>

      <div className="wb-canvas-wrap">
        <canvas
          ref={canvasRef}
          onMouseDown={start}
          onMouseMove={move}
          onMouseUp={end}
          onMouseLeave={end}
          onTouchStart={start}
          onTouchMove={move}
          onTouchEnd={end}
        />
      </div>
    </div>
  );
}
