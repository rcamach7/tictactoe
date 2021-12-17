
const Gameboard = (() => {
    let currentBoard = ["", "", "", "", "", "", "", "", ""];
    let currentPlayerSymbol = "X";
    let activeGame = true;

    const copyOfBoard = () => {
        return currentBoard;
    }
    const move = (location) => {
        // Invalid Move
        if (currentBoard[location] !== "") {
            return;
        }
        // Update board and store value to mark on board
        currentBoard[location] = currentPlayerSymbol;
        let symbolToMark = currentPlayerSymbol;

        // Switch Players
        if (currentPlayerSymbol === "X") {
            currentPlayerSymbol = "O"
        } else {
            currentPlayerSymbol = "X";
        }

        return symbolToMark;
    }
    const checkForWinner = () => {
        // Horizontal Check
        if (currentBoard[0] !== "" && currentBoard[0] === currentBoard[1] && currentBoard[2] === currentBoard[0]) {
            alert(`Winner! Player ${currentBoard[0]} has won the game!`);
            activeGame = false;
            return;
        } else if(currentBoard[3] !== "" && currentBoard[3] === currentBoard[4] && currentBoard[5] === currentBoard[3]) {
            alert(`Winner! Player ${currentBoard[3]} has won the game!`);
            return;
        } else if(currentBoard[6] !== "" && currentBoard[6] === currentBoard[7] && currentBoard[8] === currentBoard[6]) {
            alert(`Winner! Player ${currentBoard[6]} has won the game!`);
            activeGame = false;
            return;
        }

        // Vertical Check
        if (currentBoard[0] !== "" && currentBoard[0] === currentBoard[3] && currentBoard[0] === currentBoard[6]) {
            alert(`Winner! Player ${currentBoard[0]} has won the game!`);
            activeGame = false;
            return;
        } else if (currentBoard[1] !== "" && currentBoard[1] === currentBoard[4] && currentBoard[1] === currentBoard[7]) {
            alert(`Winner! Player ${currentBoard[1]} has won the game!`);
            activeGame = false;
            return;
        } else if (currentBoard[2] !== "" && currentBoard[2] === currentBoard[5] && currentBoard[2] === currentBoard[8]) {
            alert(`Winner! Player ${currentBoard[2]} has won the game!`);
            activeGame = false;
            return;
        }

        // Cross Check
        if (currentBoard[0] !== "" && currentBoard[0] === currentBoard[4] && currentBoard[0] === currentBoard[8]) {
            alert(`Winner! Player ${currentBoard[0]} has won the game!`);
            activeGame = false;
            return;
        } else if (currentBoard[2] !== "" && currentBoard[2] === currentBoard[4] && currentBoard[2] === currentBoard[6]) {
            alert(`Winner! Player ${currentBoard[2]} has won the game!`);
            activeGame = false;
            return;
        }

        // Check to see if the board is full - if so -declare a tie and reset board.
        let fullBoard = true;
        currentBoard.map((item) => {
            if (item === "") {
                fullBoard = false;
            }
        });
        if (fullBoard) {
            alert("Tie! Board will be reset");
            resetBoard();
        }
    }
    const resetBoard = () => {
        currentBoard = ["", "", "", "", "", "", "", "", ""];
        const root1 = document.getElementById("row1");
        root1.innerHTML = '';
        const root2 = document.getElementById("row2");
        root2.innerHTML = '';
        const root3 = document.getElementById("row3");
        root3.innerHTML = '';
        activeGame = true;
        displayBoard();
    }
    const isGameActive = () => {
        return activeGame;
    }
    const getPlayer = () => {
        return currentPlayerSymbol;
    }
    return {
        copyOfBoard,
        move,
        checkForWinner,
        isGameActive,
        resetBoard,
        getPlayer
    }
})();

function displayBoard() {
    const currBoard = Gameboard.copyOfBoard();

    for (let i = 0; i < currBoard.length; i++) {
        // Create box element to store value of board index
        const box = document.createElement("div");
        box.textContent = currBoard[i];
        // For reference and styling
        box.id = "b" + i;
        box.classList.add("box");

        // Toggle
        box.addEventListener("click", () => {
            // Valid Move
            if (box.textContent === "" && Gameboard.isGameActive()) {
                let location = parseInt(box.id.substring(1));
                box.textContent = Gameboard.move(location);
                
                // Player Turn
                const turn = document.getElementById("playerTurn");
                turn.textContent = `Turn: ${Gameboard.getPlayer()}`

                // Check For Winner
                Gameboard.checkForWinner();
            }
        })

        if (i > 2 && i < 6) {
            const root = document.getElementById("row2");
            root.appendChild(box);
        } else if (i >= 6) {
            const root = document.getElementById("row3");
            root.appendChild(box);
        } else {
            const root = document.getElementById("row1");
            root.appendChild(box);
        }
    }
}

const resetBtn = document.getElementById("resetGame");
resetBtn.addEventListener("click", () => {
    Gameboard.resetBoard();
})

displayBoard();

