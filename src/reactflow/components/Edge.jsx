export default function Edge({ startX, startY, endX, endY }) {
  return (
    <svg className="edge-layer">
      <line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke="#555"
        strokeWidth="3"
      />
    </svg>
  );
}
