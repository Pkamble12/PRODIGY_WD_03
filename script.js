console.log("Welcome to Tic Tac Toe");
let music = new Audio("music.mp3")
let audioTurn = new Audio("ting.mp3")
let gameover = new Audio("gameover.mp3")

// Variables
let turn = "X";
let isGameOver = false;
let isAIEnabled = false;

// Change Turn Function
const changeTurn = () => (turn === "X" ? "O" : "X");
// Check Win Function
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 5, 0],    
        [3, 4, 5, 5, 15, 0],   
        [6, 7, 8, 5, 25, 0],   
        [0, 3, 6, -5, 15, 90], 
        [1, 4, 7, 5, 15, 90],  
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],  
        [2, 4, 6, 5, 15, 135]  
    ];
    let hasWinner = false;

    wins.forEach(e => {
        if (
            (boxtext[e[0]].innerText === boxtext[e[1]].innerText) &&
            (boxtext[e[1]].innerText === boxtext[e[2]].innerText) &&
            (boxtext[e[0]].innerText !== '')
        ) {
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won!";
            isGameOver = true;
            hasWinner = true;

            // Draw the winning line
            let line = document.querySelector('.line');
            line.style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            line.style.width = "20vw";
            gameover.play();
        }
    });

    // Check for Tie
    if (!hasWinner && Array.from(boxtext).every(box => box.innerText !== '')) {
        document.querySelector('.info').innerText = "The game is a tie!";
        isGameOver = true;
    }
};




// AI Move Function
const makeAIMove = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let emptyBoxes = [];
    Array.from(boxtext).forEach((box, index) => {
        if (box.innerText === '') {
            emptyBoxes.push(index);
        }
    });

    if (emptyBoxes.length > 0) {
        let randomIndex = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
        boxtext[randomIndex].innerText = turn;
        checkWin();
        turn = changeTurn();
        if (!isGameOver) {
            document.querySelector('.info').innerText = "Turn for " + turn;
        }
    }
};

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === '' && !isGameOver) {
            boxtext.innerText = turn;
            audioTurn.play();
            checkWin();
            if (!isGameOver) {
                turn = changeTurn();
                document.querySelector('.info').innerText = "Turn for " + turn;
                if (isAIEnabled && turn === "O") {
                    setTimeout(makeAIMove, 500);
                }
            }
        }
    });
});
// Reset Button Logic
document.querySelector('.reset').addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    isGameOver = false;
    document.querySelector('.info').innerText = "Turn for " + turn;

    
         // Reset winning line
         let line = document.querySelector('.line');
         line.style.width = "0";
         line.style.transform = "none";
     
         document.querySelector('.info').innerText = "Turn for " + turn;
     
});

        
     
// Toggle AI Button Logic
document.querySelector('.toggle-ai').addEventListener('click', () => {
    isAIEnabled = !isAIEnabled;
    document.querySelector('.info').innerText = isAIEnabled
        ? "AI Enabled. Turn for " + turn
        : "AI Disabled. Turn for " + turn;
});