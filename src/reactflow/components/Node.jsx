export default function Node({ id, x, y, label }) {
  return (
    <div
      className="node"
      style={{
        left: x,
        top: y,
      }}
    >
      {label}
    </div>
  );
}