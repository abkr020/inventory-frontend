import { useEffect, useState } from "react";

const IssueInbox = () => {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadInbox();
    }, []);

    const loadInbox = async () => {
        const user = JSON.parse(localStorage.getItem("loggedInUser"));

        const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/issues/inbox?email=${user.email}`
        );

        const data = await res.json();
        setIssues(data);
        setLoading(false);
    };

    const getStepStatus = (stepId, currentStepId, workflow) => {
        const currentIndex = workflow.findIndex(s => s.id === currentStepId);
        const stepIndex = workflow.findIndex(s => s.id === stepId);

        if (stepIndex < currentIndex) return "completed";
        if (stepIndex === currentIndex) return "current";
        return "pending";
    };
const canExecuteStep = (userRole, step) => {
    return step.allowedRoles.includes(userRole);
};
const handleAction = async (issueId, stepId) => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/issues/advance`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                issueId,
                stepId,
                email: user.email,
            }),
        }
    );

    const data = await res.json();

    if (!res.ok) {
        alert(data.message);
        return;
    }

    alert("Step updated");
    loadInbox();
};
    if (loading) return <div style={{ padding: 20 }}>Loading...</div>;

    return (
        <div style={{ padding: 20 }}>
            <h2>Workflow Inbox</h2>

            {issues.map((issue) => (
                <div
                    key={issue.issue_id}
                    style={{
                        border: "1px solid #ddd",
                        padding: 16,
                        borderRadius: 10,
                        marginBottom: 20,
                    }}
                >
                    <h3>Issue #{issue.issue_id}</h3>

                    <p><b>Workflow:</b> {issue.workflow_name}</p>
                    <p><b>Status:</b> {issue.status}</p>

                    {/* 🚀 WORKFLOW VISUAL */}
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                        {issue.workflow.map((step) => {
                            const status = getStepStatus(
                                step.id,
                                issue.current_step_id,
                                issue.workflow
                            );
const user = JSON.parse(localStorage.getItem("loggedInUser"));
                            return (
                                <div
                                    key={step.id}
                                    style={{
                                        padding: 12,
                                        borderRadius: 8,
                                        minWidth: 180,
                                        border: "2px solid",
                                        borderColor:
                                            status === "completed"
                                                ? "green"
                                                : status === "current"
                                                ? "orange"
                                                : "#ccc",
                                        background:
                                            status === "completed"
                                                ? "#e6ffe6"
                                                : status === "current"
                                                ? "#fff3e0"
                                                : "#f5f5f5",
                                        opacity: status === "pending" ? 0.6 : 1,
                                    }}
                                >
                                    <div style={{ fontWeight: 600 }}>
                                        {step.step}
                                    </div>

                                    <div style={{ fontSize: 12 }}>
                                        {status.toUpperCase()}
                                    </div>
                                    {step.id === issue.current_step_id &&
    canExecuteStep(user.role, step) && (
        <button
            style={{
                marginTop: 8,
                padding: "6px 10px",
                background: "#4caf50",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
            }}
            onClick={() =>
                handleAction(issue.issue_id, step.id)
            }
        >
            Approve / Next
        </button>
)}
                                </div>
                            );
                        })}
                    </div>

                    {/* BOOKS */}
                    <div style={{ marginTop: 10 }}>
                        <b>Books:</b>
                        <ul>
                            {issue.books.map((b) => (
                                <li key={b.book_id}>
                                    {b.title} - {b.author}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default IssueInbox;