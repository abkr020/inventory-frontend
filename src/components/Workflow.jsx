import React, { useState } from "react";
import { LIBRARY_ISSUE_WORKFLOW } from "../constants/workflow";

const Workflow = () => {
    const [workflow] = useState(LIBRARY_ISSUE_WORKFLOW);

    return (
        <div
            style={{
                padding: "24px",
            }}
        >
            <h2>{workflow.name}</h2>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    flexWrap: "wrap",
                }}
            >
                {workflow.sequence.map((item, index) => (
                    <React.Fragment key={item.id}>
                        <div
                            style={{
                                minWidth: "220px",
                                border: "1px solid #ddd",
                                borderRadius: "10px",
                                padding: "16px",
                            }}
                        >
                            <div
                                style={{
                                    fontWeight: 700,
                                    marginBottom: "8px",
                                }}
                            >
                                Step {item.id}
                            </div>

                            <div>{item.step}</div>

                            <div
                                style={{
                                    marginTop: "10px",
                                    fontSize: "14px",
                                    color: "#666",
                                }}
                            >
                                Allowed Roles:
                            </div>

                            <div>
                                {item.allowedRoles.join(", ")}
                            </div>
                        </div>

                        {index < workflow.sequence.length - 1 && (
                            <div
                                style={{
                                    fontSize: "28px",
                                }}
                            >
                                →
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default Workflow;