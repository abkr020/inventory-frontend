import {
    useLayoutEffect,
    useRef,
    useState,
} from "react";

import Node from "./components/Node";
import Edge from "./components/Edge";

import {
    LIBRARY_ISSUE_WORKFLOW,
} from "../constants/workflow";

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

const rawEdges = [];

LIBRARY_ISSUE_WORKFLOW.sequence.forEach(
    (
        step
    ) => {
        step.actions?.forEach(
            (
                action,
                index
            ) => {
                rawEdges.push({
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
    const [
        edges,
        setEdges,
    ] =
        useState([]);

    const containerRef =
        useRef(
            null
        );

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

    useLayoutEffect(
        () => {
            const computed =
                [];

            rawEdges.forEach(
                (
                    edge
                ) => {
                    const source =
                        document.getElementById(
                            edge.source
                        );

                    const target =
                        document.getElementById(
                            `node-${edge.target}`
                        );

                    if (
                        !source ||
                        !target
                    )
                        return;

                    const container =
                        containerRef.current.getBoundingClientRect();

                    const s =
                        source.getBoundingClientRect();

                    const t =
                        target.getBoundingClientRect();

                    computed.push(
                        {
                            startX:
                                s.left -
                                container.left +
                                s.width,

                            startY:
                                s.top -
                                container.top +
                                s.height /
                                2,

                            endX:
                                t.left -
                                container.left,

                            endY:
                                t.top -
                                container.top +
                                40,
                        }
                    );
                }
            );

            setEdges(
                computed
            );
        },
        []
    );

    return (
        <div
            ref={
                containerRef
            }
            className="flow-container"
        >
            {edges.map(
                (
                    edge,
                    i
                ) => (
                    <Edge
                        key={
                            i
                        }
                        {...edge}
                    />
                )
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