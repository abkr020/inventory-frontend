import { forwardRef } from "react";

const Node = forwardRef(
  ({ id, x, y, label, actions,startResize,style, registerActionRef, onDragStart }, ref) => {
    return (
      <div
        ref={ref}
        className="node"
        style={{
          left: x,
          top: y,

          width: style?.width,
          height: style?.height,
        }}
      >
        <div
 className="resize-handle"
 onMouseDown={(e)=>
   startResize(
     "node",
     id,
     null,
     e
   )
 }
/>
        {/* Drag Handle */}
        <div
          className="drag-handle"
          onMouseDown={(e) => onDragStart("node", id, e)}
        >
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
              style={{
                left: action.x,
                top: action.y,
                 width:action.style?.width,
 height:action.style?.height
              }}
            >
                <div
 className="resize-handle"
 onMouseDown={(e)=>
   startResize(
     "action",
     id,
     action.id,
     e
   )
 }
/>
              <div
                className="drag-handle"
                onMouseDown={(e) => onDragStart("action", action.id, e)}
              >
                ⠿
              </div>

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
