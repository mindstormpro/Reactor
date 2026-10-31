export default function bot({ history, memory }) {
  const sigmoid = z => 1 / (1 + Math.exp(-z));
  const tanh = Math.tanh;

  // GRU parameters: update gate â 1, reset gate irrelevant, candidate = tanh(x)
  const Wz = 0, Uz = 0, bz = 10;   // z â 1 â immediate update
  const Wr = 0, Ur = 0, br = 10;   // r â 1 (no effect with Uh=0)
  const Wh = 1, Uh = 0, bh = 0;    // h_tilde = tanh(x)

  let h;
  if (memory === null) {
    h = 0.8; // start with a cooperative bias
  } else {
    h = memory.h;
  }

  let x;
  if (history.length === 0) {
    x = 1; // assume opponent cooperated on the first round
  } else {
    x = history[history.length - 1].opponent === "C" ? 1 : 0;
  }

  const z = sigmoid(Wz * x + Uz * h + bz);
  const r = sigmoid(Wr * x + Ur * h + br);
  const h_tilde = tanh(Wh * x + Uh * (r * h) + bh);
  const h_new = (1 - z) * h + z * h_tilde;

  // Decision rule: cooperate if hidden state says opponent is likely to cooperate
  const ourMove = h_new > 0.5 ? "C" : "D";

  return [ourMove, { h: h_new }];
}