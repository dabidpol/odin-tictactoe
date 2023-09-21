"use strict";

const gboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];
    
    const setSquare = (index, value) => {
        if (index > 9 || index < 0) return;
        board[index] = value;
    };

    const getSquare = (index) => {
        if (index > 9 || index < 0) return;
        return board[index];
    };

    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };

    return { setSquare, getSquare, resetBoard };
})();

const Tictactoer = (play) => {
    this.play = play;

    const getPlay = () => {
        return play;
    };

    return { getPlay };
};

const displayController = (() => {
    const elements = document.querySelectorAll(".square");
    const announcement = document.getElementById("announcement");
    const resetButton = document.getElementById("reset");

    elements.forEach((square) =>
        square.addEventListener("click", (e) => {
            if (gameController.gameOver() || e.target.textContent !== "") return;
            gameController.play(parseInt(e.target.dataset.index));
            updateGBoard();
        }) );

    resetButton.addEventListener("click", () => {
        gboard.resetBoard();
        gameController.reset();
        updateGBoard();
        setAnnouncement("Next player: X");
    });

    const updateGBoard = () => {
        for (let i=0; i<9; i++) {
            elements[i].textContent = gboard.getSquare(i);
        }
    };

    const setResult = (text) => {
        if (text === "Draw") {
            setAnnouncement("It's a draw!");
        }else{
            setAnnouncement(`Player ${text} wins!`);
        }
    };

    const setAnnouncement = (text) => {
        announcement.textContent = text;
    };

    return { setResult, setAnnouncement };
})();

const gameController = (() => { 
    const player1 = Tictactoer("X");
    const player2 = Tictactoer("O");
    
    let turn = 1;   
    let gameisOver = false;

    const play = (id) => {
        gboard.setSquare(id, getCurrentPlayer());
        if (checkWin(id)) {
            displayController.setResult(getCurrentPlayer());
            gameisOver = true;
            return;
        }
        if (turn === 9) {
            displayController.setResult("Draw");
            gameisOver = true;
            return;
        }
        turn++;
        displayController.setAnnouncement("Next player: " + getCurrentPlayer());
    };

    const getCurrentPlayer = () => {
        return turn % 2 === 1 ? player1.getPlay() : player2.getPlay();
    };

    const checkWin = (id) => {
        const winCons = [ 
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
            [0, 4, 8], [2, 4, 6]             // diagonal
        ];

        return winCons
            .filter((combi) => combi.includes(id))
            .some((poscombi) => poscombi.every((i) => gboard.getSquare(i) === getCurrentPlayer()));
    }

    const gameOver = () => {
        return gameisOver;
    };

    const reset = () => {
        turn = 1;
        gameisOver = false;
    }; 

    return { play, gameOver, reset };
})();