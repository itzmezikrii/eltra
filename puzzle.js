const board = document.getElementById("puzzleBoard");
const statusText = document.getElementById("puzzleStatus");

const size = 4;
let pieces = [];
let correctOrder = [];
let selected = null;

for(let i=0;i<size*size;i++){
  pieces.push(i);
  correctOrder.push(i);
}

function shuffle(array){
  return array.sort(()=>Math.random()-0.5);
}

function createPuzzle(){
  board.innerHTML = "";
  shuffle(pieces);

  pieces.forEach((num)=>{
    let piece = document.createElement("div");
    piece.className = "piece";
    piece.dataset.value = num;

    let x = (num % size) * -80;
    let y = Math.floor(num / size) * -80;

    piece.style.backgroundImage = "url('puzzle.jpeg')";
    piece.style.backgroundPosition = `${x}px ${y}px`;

    piece.onclick = function(){
      if(selected === null){
        selected = piece;
        piece.style.opacity = "0.6";
      } else {
        swapPieces(selected, piece);
        selected.style.opacity = "1";
        selected = null;
        checkWin();
      }
    };

    board.appendChild(piece);
  });
}

function swapPieces(p1, p2){
  let temp = p1.dataset.value;
  p1.dataset.value = p2.dataset.value;
  p2.dataset.value = temp;

  updatePiece(p1);
  updatePiece(p2);
}

function updatePiece(piece){
  let num = piece.dataset.value;
  let x = (num % size) * -80;
  let y = Math.floor(num / size) * -80;
  piece.style.backgroundPosition = `${x}px ${y}px`;
}

function checkWin(){
  let current = [...board.children].map(p=>Number(p.dataset.value));

  if(JSON.stringify(current) === JSON.stringify(correctOrder)){
    statusText.innerText = "Perfect 🤍";
    confettiExplosion();

    setTimeout(() => {
      go('s5');
    }, 1500);
  }
}


createPuzzle();

