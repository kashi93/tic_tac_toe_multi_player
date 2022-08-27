$(function () {
    let gameActive = true;
    const player1 = "X";
    const player2 = "0";
    let currentPlayer = player1;
    let gameState = ["", "", "", "", "", "", "", "", ""];
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const cells = $(".cell");

    for (const c of cells) {
        $(c).on("click", function () {
            const index = $(this).data("cell-index");
            if ($(this).html() == "") {
                if (gameActive) {
                    $(this).html(currentPlayer);
                    gameState[index] = currentPlayer;
                }

                let roundWon = false;
                for (const winCondition of winningConditions) {
                    let a = gameState[winCondition[0]];
                    let b = gameState[winCondition[1]];
                    let c = gameState[winCondition[2]];

                    if (a === "" || b === "" || c === "") {
                        continue;
                    }

                    if (a === b && b === c) {
                        roundWon = true;
                        break;
                    }
                }

                if (roundWon) {
                    $(".game--status").html(`Player ${currentPlayer} has won!`);
                    gameActive = false;
                } else {
                    if (gameActive) {
                        currentPlayer =
                            currentPlayer == player1 ? player2 : player1;
                    }
                }
            }
        });
    }

    $(".game--restart").on("click", function () {
        currentPlayer = player1;
        gameState = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;

        const cells = $(".cell");

        for (const c of cells) {
            $(c).html("");
        }

        $(".game--status").html("");
    });
});
