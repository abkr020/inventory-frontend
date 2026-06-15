export default function Edge({
    startX,
    startY,
    endX,
    endY,
}) {
    const mid =
        (
            startX +
            endX
        ) /
        2;

    return (
        <svg className="edge-layer">

            <path
                d={`
                M ${startX} ${startY}
                C ${mid} ${startY},
                  ${mid} ${endY},
                  ${endX} ${endY}
                `}
                fill="none"
                stroke="#444"
                strokeWidth="3"
            />

        </svg>
    );
}