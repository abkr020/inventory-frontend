import { forwardRef } from "react";

const Node = forwardRef(
  ({ id, x, y, label, actions, registerActionRef, onDragStart }, ref) => {
    return (
      <div
        ref={ref}
        className="node"
        style={{
          left: x,
          top: y,
        }}
      >
        {/* Drag Handle */}
        <div className="drag-handle" onMouseDown={(e) => onDragStart(id, e)}>
          ⠿
        </div>

        <div>id : {id}</div>
        <div>{label}</div>

        <div className="actions">
          {actions?.map((action) => (
            <div
              key={action.id}
              ref={(el) => registerActionRef(action.id, el)}
              className="action"
            >
              <div>id : {action.id}</div>
              {action.label}
            </div>
          ))}
        </div>
      </div>
    );
  },
);

export default Node;
