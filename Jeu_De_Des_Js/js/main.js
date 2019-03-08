var scoreGlobalPlayer1 = 0;
var scoreGlobalPlayer2 = 0;

var currentScore1 = 0;
var currentScore2 = 0;

var main = 1

document.getElementById("circle1").style.visibility = "visible";
document.getElementById("circle2").style.visibility = "hidden";


function newgame() {// On remet a zéros tout les scores
    scoreGlobalPlayer1 = 0;
    scoreGlobalPlayer2 = 0;
    currentScore1 = 0;
    currentScore2 = 0;
    main = 1
    document.getElementById("ScorePlayer1").innerHTML = scoreGlobalPlayer1;
    document.getElementById("ScoreCurrent1").innerHTML = currentScore1;
    document.getElementById("ScorePlayer2").innerHTML = scoreGlobalPlayer2;
    document.getElementById("ScoreCurrent2").innerHTML = currentScore2;

    document.getElementById("circle1").style.visibility = "visible";
    document.getElementById("circle2").style.visibility = "hidden";


}

function relance() {// la variable main vaut 1, alors le player 1 joue, sinon le player 2 joue
    if (main === 1) {
        jeuDes1();
        document.getElementById("ScoreCurrent1").innerHTML = currentScore1;
    } else {
        jeuDes2();
        document.getElementById("ScoreCurrent2").innerHTML = currentScore2;
    }

}

function garder() {//ajoute le current score au globalscore et termine le tour du player en cours
    if (main === 1) {

        scoreGlobalPlayer1 += currentScore1;
        //alert("le joueur  1 garde " + scoreGlobalPlayer1 + "points") 
        currentScore1 = 0;
        document.getElementById("ScorePlayer1").innerHTML = scoreGlobalPlayer1;
        document.getElementById("ScoreCurrent1").innerHTML = currentScore1;
        main = 2

        document.getElementById("circle1").style.visibility = "hidden";
        document.getElementById("circle2").style.visibility = "visible";


        if (scoreGlobalPlayer1 >= 100) {
            alert("Player 1 à gagner : ")
        }



    } else {
        scoreGlobalPlayer2 += currentScore2;
        //alert("le joueur  1 garde " + scoreGlobalPlayer1 + "points") 
        currentScore2 = 0;
        document.getElementById("ScorePlayer2").innerHTML = scoreGlobalPlayer2;
        document.getElementById("ScoreCurrent2").innerHTML = currentScore2;
        main = 1


        document.getElementById("circle1").style.visibility = "visible";
        document.getElementById("circle2").style.visibility = "hidden";


        if (scoreGlobalPlayer2 >= 100) {
            alert("Player 2 à gagner : ")
        }
    }
}

function jeuDes1() {//fonction principal du player 1
    var des6 = [1, 2, 3, 4, 5, 6];
    var desNouvLancer = des6[Math.floor(Math.random() * des6.length)];

    document.getElementById("diceFace").src = "images/dice-" + desNouvLancer + ".png"

    if (desNouvLancer === 1) {
        currentScore1 = 0;
        main = 2;
        
        document.getElementById("circle1").style.visibility = "hidden";
        document.getElementById("circle2").style.visibility = "visible";

    } else {

        currentScore1 += desNouvLancer;
    }
}

function jeuDes2() {//fonction principal du player 2
    var des6 = [1, 2, 3, 4, 5, 6];
    var desNouvLancer = des6[Math.floor(Math.random() * des6.length)];

    document.getElementById("diceFace").src = "images/dice-" + desNouvLancer + ".png"

    if (desNouvLancer === 1) {
        currentScore2 = 0;
        main = 1;

        document.getElementById("circle1").style.visibility = "visible";
        document.getElementById("circle2").style.visibility = "hidden";

    } else {

        currentScore2 += desNouvLancer;
    }
}