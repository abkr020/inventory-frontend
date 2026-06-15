export default function Node({
    id,
    x,
    y,
    label,
    actions = [],
}) {
    return (
        <div
            id={`node-${id}`}
            className="node"
            style={{
                left: x,
                top: y,
            }}
        >
            <div className="node-title">
                {label}
            </div>

            <div className="actions">
                {actions.map(
                    (
                        action,
                        index
                    ) => (
                        <div
                            id={`${id}-${index}`}
                            key={
                                index
                            }
                            className="action"
                        >
                            {
                                action.lable
                            }
                        </div>
                    )
                )}
            </div>
        </div>
    );
}