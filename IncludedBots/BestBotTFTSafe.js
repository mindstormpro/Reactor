// SUBMIT NAME: BestBot TFT Safe
// Short, crash-proof TFT + mild forgiveness. try/catch so one bug never 0.000-forfeits.
export default function bot(state) {
  try {
    var history = (state && state.history) || [];
    var memory = state && state.memory;
    var mem = memory && typeof memory === "object" ? memory : { seed: 1 };
    if (typeof mem.seed !== "number") mem.seed = 1;
    if (!history.length) return ["C", mem];
    var last = history[history.length - 1];
    if (!last || last.opponent === "C") return ["C", mem];
    mem.seed = (mem.seed * 1664525 + 1013904223) % 4294967296;
    if (mem.seed / 4294967296 < 0.08) return ["C", mem];
    return ["D", mem];
  } catch (e) {
    return ["C", null];
  }
}