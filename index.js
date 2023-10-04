// GAMEBOARD ARRAY (WE USE THIS SOLEY TO DETERMINE WINNER)
const gameBoard = (() => {
  const array = ["", "", "", "", "", "", "", "", "","Tie"];

  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const checkForWin = () => {
    return returnedIndex();
  };

  function returnedIndex() {
    for (let j = 0; j < winCombos.length; j++) {
      let combo = winCombos[j];

      if (combo[0] !== "" && combo[0] === combo[1] && combo[0] === combo[2]) {
        return combo[0]; // Return the winning marker
      }
    }
    return 9; // Return null if no winner is found after checking all combos
  }

  return { array, checkForWin: checkForWin };
})();

    

// PLAYER FACTORY FUNCTION
function Player(xo) {
  let marker = xo; 

  const markerElement = () => {
    if (marker === "x") {
      const x = document.createElement("h3");
      x.classList.add("purple");
      x.textContent = "x";
      return x;
    } else if (marker === "o") {
      const o = document.createElement("h3");
      o.classList.add("pink");
      o.textContent = "o";
      return o;
    }
  };

  const getMarker=()=>{
    return marker;
  }

  const setMarker = (newMarker) => {
    marker = newMarker;
  };

  return {
    markerElement:markerElement,
    getMarker: getMarker,
    setMarker: setMarker
  };
}


// GAME MODULE PATTERN
const Game = (() => {
  
  const player1 = Player("x");
  const player2 = Player("o");
  let activePlayer = player1; 

  // THIS PIECE OF CODE STARTS AND BASICALLY RUNS THE WHOLE GAME
  const run = () => {
    const gameboard = document.getElementById("game-board");
    Screen.updatePlayer(activePlayer);

    gameboard.addEventListener("click", (e) => {
      const target = e.target;
      if (target.innerHTML === "") {
        target.appendChild(activePlayer.markerElement());
        updateArray(target,activePlayer);
        toggleActivePlayer();
        Screen.updateWinner();
      }
    });
  };

  // THIS UPDATES THE ARRAY TO MATCH THE SCREEN
  const updateArray = (target,activePlayer) => {
    const index=target.getAttribute("data-index");
    gameBoard[index]=activePlayer.getMarker();
  }

  // THIS CHANGES THE PLAYER AFTER EVERY TURN FONTEND AND BACKEND
  const toggleActivePlayer = () => {
    activePlayer = activePlayer === player1 ? player2 : player1;
    Screen.updatePlayer(activePlayer);
  };


  // THIS RESTARTS THE GAME
  const restart = ()=>{
    const newGameboard= document.querySelectorAll(".cell");

    newGameboard.forEach((cell)=>{
    cell.innerHTML="";
    activePlayer=player1;
    Screen.updatePlayer(activePlayer);
    });
  };

  return { activePlayer, run:run, restart:restart};
})();


// THIS HANDLES UPDATING SCREEN I.E WINNER AND PLAYER
const Screen = (()=>{

  const updatePlayer =(activePlayer)=>{

    const player= document.getElementById("player-marker");

    if(activePlayer.getMarker()==="x"){
      player.classList.add("purple");
      player.textContent="x";  
    }else {
      player.classList.remove("purple");
      player.textContent="o";
    };    
  };

  const updateWinner=()=>{
    const fullBoard=!gameBoard.array.includes("")
    const winner=document.getElementById("winner-marker");

    if((gameBoard.checkForWin()==="x")){
      winner.classList.add("purple");
      winner.textContent="x";  
    }else if(gameBoard.checkForWin()==="o"){
      winner.textContent="o";
    }else if (fullBoard && gameBoard.checkForWin()==="Tie"){
      winner.classList.add("blue");
      winner.textContent="Tie"; 
    }
  }

  return{updatePlayer:updatePlayer, updateWinner:updateWinner};
})();


Game.run();

restartBtn=document.getElementById("restart");
restartBtn.addEventListener("click",()=>{
  Game.restart();
})