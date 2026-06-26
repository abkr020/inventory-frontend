import Node from "./components/Node";
import Edge from "./components/Edge";

const nodes = [
  {
    id: "1",
    x: 100,
    y: 150,
    label: "Start",
  },
  {
    id: "2",
    x: 600,
    y: 250,
    label: "End",
  },
];

const edges = [
  {
    source: "1",
    target: "2",
  },
];

export default function Flow() {
  const getNode = (id) => nodes.find((n) => n.id === id);

  return (
    <div className="flow-container">
      {edges.map((edge) => {
        const source = getNode(edge.source);
        const target = getNode(edge.target);

        return (
          <Edge
            key={`${edge.source}-${edge.target}`}
            startX={source.x + 80}
            startY={source.y + 30}
            endX={target.x}
            endY={target.y + 30}
          />
        );
      })}

      {nodes.map((node) => (
        <Node key={node.id} {...node} />
      ))}
    </div>
  );
}
