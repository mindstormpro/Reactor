// SUBMIT: GradualAdaptive â NEW matrix (CC=10). Gradual punish + AllD vs pure-D/random; never farm alwaysC.
export default function bot(state) {
  try {
    var history = (state && state.history) || [];
    var memory = state && state.memory;
    var mem =
      memory && typeof memory === "object"
        ? memory
        : { punishLeft: 0, betrayals: 0, calmLeft: 0, allD: 0, randomCnt: 0 };
    if (typeof mem.punishLeft !== "number") mem.punishLeft = 0;
    if (typeof mem.betrayals !== "number") mem.betrayals = 0;
    if (typeof mem.calmLeft !== "number") mem.calmLeft = 0;
    if (typeof mem.allD !== "number") mem.allD = 0;
    if (typeof mem.randomCnt !== "number") mem.randomCnt = 0;

    var n = history.length;
    if (!n) return ["C", mem];

    if (n >= 2) {
      var o1 = history[n - 1] && history[n - 1].opponent;
      var o2 = history[n - 2] && history[n - 2].opponent;
      if (o2 === "C" && o1 === "C") mem.randomCnt -= 1;
      if (o2 !== o1) mem.randomCnt += 1;
      if (history[n - 1] && history[n - 1].you !== o1) mem.randomCnt += 1;
      if (mem.randomCnt < 0) mem.randomCnt = 0;
      if (mem.randomCnt >= 8) mem.allD = 1;
    }

    if (n >= 20 && mem.allD === 0) {
      var oppC = 0;
      var tftH = 0;
      var i;
      for (i = 0; i < n; i++) {
        if (history[i] && history[i].opponent === "C") oppC++;
        if (i > 0 && history[i] && history[i - 1] && history[i].opponent === history[i - 1].you) tftH++;
      }
      var coop = oppC / n;
      var tft = n > 1 ? tftH / (n - 1) : 0;
      if (coop < 0.22 || (coop < 0.32 && tft < 0.55)) mem.allD = 1;
    }
    if (mem.allD) return ["D", mem];

    if (mem.punishLeft > 0) {
      mem.punishLeft--;
      if (mem.punishLeft === 0) mem.calmLeft = 2;
      return ["D", mem];
    }
    if (mem.calmLeft > 0) {
      mem.calmLeft--;
      return ["C", mem];
    }
    if (history[n - 1] && history[n - 1].opponent === "D") {
      mem.betrayals++;
      mem.punishLeft = Math.max(0, Math.min(mem.betrayals, 8) - 1);
      if (mem.punishLeft === 0) mem.calmLeft = 2;
      return ["D", mem];
    }
    return ["C", mem];
  } catch (e) {
    return ["C", null];
  }
}