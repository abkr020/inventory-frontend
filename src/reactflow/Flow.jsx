import Node from "./components/Node";
import Edge from "./components/Edge";
import { LIBRARY_ISSUE_WORKFLOW } from "../constants/workflow";
// import {
//     LIBRARY_ISSUE_WORKFLOW,
// } from "./workflow";

const nodes =
    LIBRARY_ISSUE_WORKFLOW.sequence.map(
        (
            step,
            index
        ) => ({
            id:
                String(
                    step.id
                ),

            x:
                index %
                    2 ===
                0
                    ? 100
                    : 600,

            y:
                index *
                    250 +
                100,

            label:
                step.step,

            actions:
                step.actions,
        })
    );

const edges = [];

LIBRARY_ISSUE_WORKFLOW.sequence.forEach(
    (
        step
    ) => {
        step.actions?.forEach(
            (
                action,
                index
            ) => {
                edges.push({
                    source:
                        `${step.id}-${index}`,

                    target:
                        String(
                            action.nextId
                        ),
                });
            }
        );
    }
);

export default function Flow() {
    const getNode =
        (
            id
        ) =>
            nodes.find(
                (
                    n
                ) =>
                    n.id ===
                    id
            );

    return (
        <div className="flow-container">

            {edges.map(
                (
                    edge,
                    i
                ) => {
                    const source =
                        document.getElementById(
                            edge.source
                        );

                    const target =
                        getNode(
                            edge.target
                        );

                    if (
                        !source ||
                        !target
                    )
                        return null;

                    const rect =
                        source.getBoundingClientRect();

                    return (
                        <Edge
                            key={
                                i
                            }
                            startX={
                                rect.left +
                                60
                            }
                            startY={
                                rect.top +
                                20
                            }
                            endX={
                                target.x
                            }
                            endY={
                                target.y +
                                50
                            }
                        />
                    );
                }
            )}

            {nodes.map(
                (
                    node
                ) => (
                    <Node
                        key={
                            node.id
                        }
                        {...node}
                    />
                )
            )}
        </div>
    );
}