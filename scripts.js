const gboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];
    
    const setSquare = (id, value) => {
        if (id > 9 || id < 0) return;
        board[id] = value;
    };

    const getSquare = (id) => {
        if (id > 9 || id < 0) return;
        return board[id];
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
    const announcent = document.getElementById("announcement");
    const resetButton = document.getElementById("reset");

    elements.forEach((square) =>
        square.addEventListener("click", (e) => {
            if (gameController.gameOver() || e.target.textContent !== "") return;
            gameController.play(parseInt(e.target.id));
            updateGBoard();
        }) );

    resetButton.addEventListener("click", () => {
        gboard.resetBoard();
        gameController.reset();
        updateGBoard();
        setAnnouncement("Next player: X");
    });

    const updateGBoard = () => {
        elements.forEach((square) => {
            square.textContent = gboard.getSquare(parseInt(square.id));
        });
    };

    const setResult = (text) => {
        if (text === "DRAW") {
            setAnnouncement = "It's a draw!";
        }else{
            setAnnouncement('Player ' + text + ' wins!')
        }
    };

    const setAnnouncement = (text) => {
        announcent.textContent = text;
    };

    return { setResult, setAnnouncement };
})();