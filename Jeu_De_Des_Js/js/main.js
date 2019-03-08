var scoreDefJoueur1 = 0;
var scoreDefJoueur2 = 0;

var currentScore1 = 0;
var currentScore2 = 0;

var main=1

/* function choixPlayer(){
    if 
} */


function newgame() {
    scoreDefJoueur1 = 0;
    scoreDefJoueur2 = 0;
    currentScore1 = 0;
    currentScore2 = 0;
    document.getElementById("ScorePlayer1").innerHTML = scoreDefJoueur1;
    document.getElementById("ScoreCurrent1").innerHTML = currentScore1;
}

function relance() {
    jeuDes()
    document.getElementById("ScoreCurrent1").innerHTML = currentScore1;
}

function garder() {
    scoreDefJoueur1 += currentScore1;
    //alert("le joueur  1 garde " + scoreDefJoueur1 + "points") 
    currentScore1 = 0;
    document.getElementById("ScorePlayer1").innerHTML = scoreDefJoueur1;
    document.getElementById("ScoreCurrent1").innerHTML = currentScore1;
    if (scoreDefJoueur1 >= 100) {
        alert("Player 1 à gagner : ")
    }
}

function jeuDes() {
    var des6 = [1, 2, 3, 4, 5, 6];
    var desNouvLancer = des6[Math.floor(Math.random() * des6.length)];

    document.getElementById("diceFace").src = "images/dice-" + desNouvLancer + ".png"

    if (desNouvLancer === 1) {
        currentScore1 = 0;

        //alert("Le des a fait : " + desNouvLancer +"\nScore du Joueur 1 : " + currentScore1)

    } else {

        currentScore1 += desNouvLancer;
        //alert("Le des a fait : " + desNouvLancer +"\nScore du Joueur 1 : " + currentScore1)

    }

}





