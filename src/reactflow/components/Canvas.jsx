import { useState } from "react";
import "./Canvas.css";

export default function Canvas({ children }) {
  const [zoom, setZoom] = useState(1);

  return (
    <div className="canvas-wrapper">
      <div className="zoom-controls">
        <button onClick={() => setZoom((z) => z + 0.1)}>+</button>

        <button onClick={() => setZoom((z) => Math.max(0.2, z - 0.1))}>
          −
        </button>
      </div>

      <div className="ruler-top"></div>

      <div className="canvas-body">
        <div className="ruler-left"></div>

        <div className="canvas-viewport">
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
