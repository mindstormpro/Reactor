export default function bot({ history }) {
  const trust = 0.01; //1 = good, -1 = bad
  
  let currentTrust = history && history.length > 0 ? (history.at(-1)?.memory ?? trust) : trust;
  const lastOpMove = history && history.length > 0 ? history.at(-1)?.opponent : null;

  if (lastOpMove === "D") {
    currentTrust -= 0.5;
  } else if (lastOpMove === "C") {
    currentTrust += 0.1;
  }

  let move = "C";
  if (currentTrust > 0) {
    move = "C";
  } else {
    move = "D";
  }

  return[move,null];
}
