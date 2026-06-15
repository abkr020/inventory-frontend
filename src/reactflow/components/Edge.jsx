export default function Edge({
    startX,
    startY,
    endX,
    endY,
}) {
    const curve =
        Math.abs(
            endX -
                startX
        ) * 0.35;

    return (
        <path
            d={`
                M ${startX} ${startY}

                C
                ${startX + curve}
                ${startY},

                ${endX - curve}
                ${endY},

                ${endX}
                ${endY}
            `}
            fill="none"
            stroke="#555"
            strokeWidth="3"
        />
    );
}