

var scoreDefJoueurA = 0;
var scoreDefJoueurB = 0;

var currentScoreA = 0;
var currentScoreB = 0;


function jeuDes(){
var des6 = [1, 2, 3, 4, 5, 6];
var desNouvLancer = des6[Math.floor(Math.random() * des6.length)];

document.getElementById("diceFace").src= "images/dice-" + desNouvLancer + ".png"

if(desNouvLancer === 1){
    currentScoreA = 0;
    //alert("Le des a fait : " + desNouvLancer +"\nScore du JoueurA : " + currentScoreA)

} else{
    
    currentScoreA += desNouvLancer;
    //alert("Le des a fait : " + desNouvLancer +"\nScore du JoueurA : " + currentScoreA)

}

}

function newgame(){
scoreDefJoueurA = 0;
scoreDefJoueurB = 0;

currentScoreA = 0;
currentScoreB = 0;
document.getElementById("ScorePlayer1").innerHTML = scoreDefJoueurA;
document.getElementById("ScoreCurrent1").innerHTML = currentScoreA;


}

function relance(){
    jeuDes()
    document.getElementById("ScoreCurrent1").innerHTML = currentScoreA;
}

function garderA(){
    scoreDefJoueurA += currentScoreA;
    //alert("le joueur A garde " + scoreDefJoueurA + "points") 
    currentScoreA = 0;
    document.getElementById("ScorePlayer1").innerHTML = scoreDefJoueurA;
    document.getElementById("ScoreCurrent1").innerHTML = currentScoreA;
    if(scoreDefJoueurA >= 100){
        alert("Player 1 à gagner : ")
    }

}

