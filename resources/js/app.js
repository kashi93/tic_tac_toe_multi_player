const { default: axios } = require("axios");

require("./bootstrap");

const key = {
    player1: "X",
    player2: "O",
};
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
let myTurn = false;
let playerName = "";
let player1 = "";
let player2 = "";
let session = "";
let myKey = "X";
let roundWon = false;

window.Echo.channel("session").listen("SessionList", function (e) {
    const mySession = e.session_list.filter((s) => s.session == session);
    if (mySession.length > 0) {
        let iwon = false;
        const game_state = mySession[0].game_state;
        const last_player_turn = mySession[0].last_player_turn;
        player1 = mySession[0].player_1 || "";
        player2 = mySession[0].player_2 || "";

        for (let index = 0; index < game_state.length; index++) {
            $(".cell").eq(index).html(game_state[index]);
        }

        for (const winCondition of winningConditions) {
            let a = game_state[winCondition[0]];
            let b = game_state[winCondition[1]];
            let c = game_state[winCondition[2]];

            if (a === "" || b === "" || c === "") {
                continue;
            }

            if (a === b && b === c) {
                if (a == myKey && b == myKey && c == myKey) {
                    iwon = true;
                }
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            if (iwon) {
                $(".game--status").html(`You Win!`);
            } else {
                $(".game--status").html(`You Lose!`);
            }
            myTurn = false;
        } else {
            if (myKey != last_player_turn) {
                $(".game--status").html(`Your Turn`);
                myTurn = true;
            } else {
                if (playerName != player1) {
                    $(".game--status").html(`${player1} Turn`);
                } else {
                    $(".game--status").html(`${player2} Turn`);
                }
            }
        }
    }
});

$(async function () {
    playerName = prompt("Please enter your name?");

    if (playerName != "" && playerName != null) {
        const res = await axios.post(`${window.location.origin}/open-session`, {
            player_name: playerName,
        });

        if (res != null && res.data != null) {
            player1 = res.data.session.player_1 || "";
            player2 = res.data.session.player_2 || "";
            session = res.data.session.session;
            myTurn = true;
            if (player2 == "") {
                myKey = key.player1;
                $(".game--status").html(`Waiting another player`);
            } else {
                myKey = key.player2;
                $(".game--status").html(`Your Turn`);
            }
        }
    }

    const cells = $(".cell");

    for (const c of cells) {
        $(c).on("click", async function () {
            const index = $(this).data("cell-index");
            if (myTurn && roundWon == false) {
                myTurn = false;
                const res = await axios.post(
                    `${window.location.origin}/player-move`,
                    {
                        session,
                        index,
                        myKey,
                    }
                );
            }
        });
    }
});
