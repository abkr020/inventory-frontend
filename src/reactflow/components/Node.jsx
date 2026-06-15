export default function Node({
    id,
    x,
    y,
    label,
    actions = [],
}) {
    return (
        <div
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
                            key={
                                index
                            }
                            id={`${id}-${index}`}
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