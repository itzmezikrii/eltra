// ====== ELEMENT ======
const clawSystem = document.getElementById("clawSystem");
const cable = document.getElementById("cable");
const prize = document.getElementById("prize");
const resultText = document.getElementById("clawResult");

// ====== CONFIG ======
const machineWidth = 360;
const clawWidth = 80;

let posX = 0;
let direction = 1;
let speed = 10; // makin besar makin cepat
let dropping = false;

// ====== RANDOM PRIZE POSITION ======
function randomizePrize(){
  let min = 20;
  let max = machineWidth - 70;
  let randomX = Math.floor(Math.random() * (max - min)) + min;
  prize.style.left = randomX + "px";
}

// ====== AUTO MOVE ======
function autoMove(){
  if(!dropping){
    posX += speed * direction;

    if(posX <= 0 || posX >= machineWidth - clawWidth){
      direction *= -1;
    }

    clawSystem.style.left = posX + "px";
  }

  requestAnimationFrame(autoMove);
}

// ====== DROP CLAW ======
function dropClaw(){
  if(dropping) return;
  dropping = true;

  resultText.innerText = "";

  // tali memanjang
  cable.style.height = "250px";

  setTimeout(()=>{
    checkCatch();
  },600);
}

// ====== CHECK CATCH ======
function checkCatch(){
  let prizeCenter = prize.offsetLeft + 25;
  let clawCenter = posX + 40;

  if(Math.abs(prizeCenter - clawCenter) < 40){

    resultText.innerText = "Kenaa 🤍";

    if(typeof confettiExplosion === "function"){
      confettiExplosion();
    }

    setTimeout(()=>{
      if(typeof go === "function"){
        go('s6');
      }
    },1500);

  } else {

    resultText.innerText = "Gakenaa 😆 cobaa lagi...";

    setTimeout(()=>{
      resetGame();
    },1500);
  }
}

// ====== RESET GAME ======
function resetGame(){
  cable.style.height = "40px";
  prize.style.bottom = "40px";
  resultText.innerText = "";
  randomizePrize();
  dropping = false;
}

// ====== INIT ======
randomizePrize();
autoMove();
