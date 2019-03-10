var scoreOrdi = 0;
var scoreJoueur = 0;

var mancheJoueur = 0
var mancheIa = 0


function recommencer() {
    scoreOrdi = 0;
    scoreJoueur = 0;
    mancheIa = 0;
    mancheJoueur = 0;
    
    
}

function selectChoixJoueur(i) { //fonction des boutons


    choixJoueur = i;
    shifumi()
};

function manche() {


    if (mancheIa >= 3) { //fonction en 3 manches gagnante
        scoreOrdi++;
        mancheIa = 0;
        mancheJoueur = 0;
        //alert("joueur" + scoreJoueur + "et ordi " + scoreOrdi)
    } else if (mancheJoueur >= 3) {
        scoreJoueur++;
        mancheIa = 0;
        mancheJoueur = 0;
        //alert("joueur" + scoreJoueur + "et ordi " + scoreOrdi)

    }

}

function shifumi() { //fonction principal

    var pierrepPapierCiseaux = ["pierre", "papier", "ciseaux"];
    var choixOrdi = pierrepPapierCiseaux[Math.floor(Math.random() * pierrepPapierCiseaux.length)];


    if (choixJoueur === choixOrdi) { // Si égal, alors

        document.getElementById("verif").innerHTML = "Egalité !";
        document.getElementById("verif").style.color = "unset";
        document.getElementById("choixJoueur").innerHTML = choixJoueur;
        document.getElementById("choixOrdi").innerHTML = choixOrdi;

    } else if ((choixJoueur === "pierre" && choixOrdi === "ciseaux") ||
        (choixJoueur === "papier" && choixOrdi === "pierre") ||
        (choixJoueur === "ciseaux" && choixOrdi === "papier")) { //Si le joueur gagne, alors

        document.getElementById("verif").innerHTML = "Gagné !";
        document.getElementById("verif").style.color = "#58AA6F";
        document.getElementById("choixJoueur").innerHTML = choixJoueur;
        document.getElementById("choixOrdi").innerHTML = choixOrdi;

        mancheJoueur++;
        manche();


        //scoreJoueur++;
    } else { //Sinon

        document.getElementById("verif").innerHTML = "Perdu !";
        document.getElementById("verif").style.color = "#EF4747";
        document.getElementById("choixJoueur").innerHTML = choixJoueur;
        document.getElementById("choixOrdi").innerHTML = choixOrdi;
        mancheIa++
        manche();
        //scoreOrdi++;
    }
    //compteur de score


    
    document.getElementById("compteurMancheOrdi").innerHTML = mancheIa;
    document.getElementById("compteurMancheJoueur").innerHTML = mancheJoueur;
    document.getElementById("compteurOrdi").innerHTML = scoreOrdi;
    document.getElementById("compteurJoueur").innerHTML = scoreJoueur;
}