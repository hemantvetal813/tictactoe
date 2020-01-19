let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];
// let board = [
//   ["O", "X", "O"],
//   ["O", "O", "X"],
//   ["X", "O", "X"]
// ];
let players = ["X", "O"];

let currentPlayer;
let available = [];

function setup() {
  createCanvas(400, 400);
  frameRate(10);
  currentPlayer = floor(random(players.length));
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      available.push([i, j]);
    }
  }
}
function checkWinner() {
  let winner = { result: null, by: null };

  // horizontal
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner.result = board[i][0];
      stroke(255, 204, 100);
      line(10, (i + 0.5) * (height / 3), width - 10, (i + 0.5) * (height / 3));
    }
  }

  // vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner.result = board[0][i];
      stroke(255, 204, 100);
      line((i + 0.5) * (width / 3), 10, (i + 0.5) * (width / 3), height - 10);
    }
  }

  // diagonal
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner.result = board[0][0];
    stroke(255, 204, 100);
    line(10, 10, width - 10, height - 10);
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    winner.result = board[2][0];
    stroke(255, 204, 100);
    line(width - 10, 10, 10, height - 10);
  }

  if (winner.result == null && available.length == 0) {
    winner.result = "tie";
    return winner;
  } else {
    return winner;
  }
}
function nextTurn() {
  let index = floor(random(available.length));
  let spot = available.splice(index, 1)[0];
  let i = spot[0];
  let j = spot[1];
  board[i][j] = players[currentPlayer];
  //next player turn formula or looping between same numbers
  currentPlayer = (currentPlayer + 1) % players.length;
}
function equals3(a, b, c) {
  return a == b && b == c && a != "";
}
function mousePressed() {
  if (currentPlayer == human) {
    // Human make turn
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    // If valid turn
    if (board[i][j] == "") {
      board[i][j] = human;
      currentPlayer = ai;
      bestMove();
    }
  }
}
function draw() {
  background(255);
  let w = width / 3;
  let h = height / 3;
  strokeWeight(4);

  line(w, 10, w, height - 10);
  line(w * 2, 10, w * 2, height - 10);
  line(10, h, width - 10, h);
  line(10, h * 2, width - 10, h * 2);

  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let spot = board[i][j];
      let xr = w / 4;
      let yr = h / 4;
      let x = w * j;
      let y = h * i;
      let r = w / 4;
      if (spot == "X") {
        line(x + xr, y + yr, x + w - xr, y + h - yr);
        line(x - xr + w, y + yr, x + xr, y + h - yr);
      }
      if (spot == "O") {
        noFill();
        ellipse(x + w / 2, y + h / 2, r * 2);
      }
    }
  }
  let result = checkWinner();
  if (result.result != null) {
    noLoop();
    let resultP = createP("");
    resultP.style("font-size", "32pt");
    if (result.result == "tie") {
      resultP.html("Tie!");
    } else {
      resultP.html(`${result.result} wins!`);
    }
  } else {
    nextTurn();
  }
}
