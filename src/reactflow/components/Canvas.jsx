import { useState } from "react";
import "./Canvas.css";

export default function Canvas({ children }) {
  const [zoom, setZoom] = useState(1);

  const [cursor, setCursor] = useState({
    x: 0,
    y: 0,
  });

  const rulerMarks = Array.from({ length: 80 }, (_, i) => i * 50);

  function handleMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
console.log("rect",rect);
console.log("clientX",e.clientX);
console.log("clientY",e.clientY);

    setCursor({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  return (
    <div className="canvas-wrapper">
      <div className="zoom-controls">
        <button onClick={() => setZoom((z) => z + 0.1)}>+</button>

        <button onClick={() => setZoom((z) => Math.max(0.2, z - 0.1))}>
          −
        </button>
      </div>

      {/* TOP RULER */}
      <div className="ruler-top">
        {rulerMarks.map((n) => (
          <div
            key={n}
            className="ruler-number-top"
            style={{
              left: `${n}px`,
            }}
          >
            {n}
          </div>
        ))}

        <div
          className="cursor-v"
          style={{
            left: cursor.x,
          }}
        />
      </div>

      <div className="canvas-body">
        {/* LEFT RULER */}

        <div className="ruler-left">
          {rulerMarks.map((n) => (
            <div
              key={n}
              className="ruler-number-left"
              style={{
                top: `${n}px`,
              }}
            >
              {n}
            </div>
          ))}

          <div
            className="cursor-h"
            style={{
              top: cursor.y,
            }}
          />
        </div>

        <div className="canvas-viewport" onMouseMove={handleMove}>
          <div
            className="cursor-v canvas-line"
            style={{
              left: cursor.x + 30,
            }}
          />

          <div
            className="cursor-h canvas-line"
            style={{
              top: cursor.y +30,
            }}
          />

          <div
            className="canvas-content"
            style={{
              transform: `scale(${zoom})`,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
