export default function bot({ history, memory }) {
    if (history.length === 0) {
        return ["C", memory];
    }
    const lastMove = history[history.length - 1].opponent;

    return [lastMove, memory];
}