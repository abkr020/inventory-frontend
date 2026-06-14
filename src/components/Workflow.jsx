import React, { useEffect, useState } from "react";

const Workflow = () => {
    const [workflow, setWorkflow] = useState(null);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/workflows/4`
        );

        const data = await res.json();
        setWorkflow(data);
    };

    if (!workflow) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ padding: 20 }}>
            <h2>{workflow.name}</h2>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    flexWrap: "wrap",
                }}
            >
                {workflow.sequence.map((item, index) => (
                    <React.Fragment key={item.id}>
                        <div
                            style={{
                                border: "1px solid #ddd",
                                padding: 16,
                                borderRadius: 10,
                                minWidth: 220,
                            }}
                        >

                            <h4>{item.step}</h4>

                            <div>
                                <b>Roles:</b>
                            </div>

                            <div>
                                {item.allowedRoles.join(", ")}
                            </div>

                            {item.nextId && (
                                <div style={{ marginTop: 8, fontSize: 12 }}>
                                    Next → {item.nextId}
                                </div>
                            )}
                        </div>

                        {index < workflow.sequence.length - 1 && (
                            <div style={{ fontSize: 24 }}>→</div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default Workflow;