function predict() {
  let current = Number(document.getElementById("current").value);
  let target = Number(document.getElementById("target").value);

  let needed = target - current;
  document.getElementById("predictResult").innerText =
    needed <= 0 ? "Target already achieved" : "You need " + needed + " marks in end-term";
}
