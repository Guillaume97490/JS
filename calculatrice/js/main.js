let resultat = 0;
let chiffre1 = "";
let chiffre2 = "";
let operateur = "";
let separateur = "";
reset();

// function resetChiffre(){

// }
function reset(i) {
    resultat = 0;
    chiffre1 = "";
    chiffre2 = "";
    operateur = "";
    separateur = "";
    document.getElementById("text").innerHTML = "0";
}

function inverse() {
    if (resultat === 0 || resultat === "") {
        if (chiffre2 === "") { // on inverse le chiffre1
            chiffre1 = chiffre1 * -1;
            document.getElementById("text").innerHTML = "" +
                chiffre1 + " " + operateur + " " + chiffre2

        } else { //ou le chiffre2 
            chiffre2 = chiffre2 * -1;
            document.getElementById("text").innerHTML = "" +
                chiffre1 + " " + operateur + " " + chiffre2
        }
    } else { // ou encore le dernier résultat
        chiffre1 = resultat * -1;
        document.getElementById("text").innerHTML = "" +
            chiffre1 + " " + operateur + " " + chiffre2
    }
}
//fonction des touches d'opérations
function ope(i) {
    if (chiffre1 !== "" && chiffre2 !== "") { //Enchainer les opération plus rapidement sans devoir appuyer sur egal (15 + 17 + 19 + 12 ...)
        egal(i)

    }
    if (resultat === 0 || chiffre1 !== "") { //l'opérateur est choisis par les touches (+ - * /)
        operateur = i
        document.getElementById("text").innerHTML = "" +
            chiffre1 + " " + operateur + " " + chiffre2

    } else { //Appuyer sur un opérateur apres un résultat, déclanche une opération avec ce résultat
        operateur = i;
        chiffre1 = Math.round(resultat * 1000000) / 1000000;;
        document.getElementById("text").innerHTML = "" +
            chiffre1 + " " + operateur + " " + chiffre2

    }
}

//fonction des touche de chiffres
function chiffre(i) {
    if (operateur === "") { //C'est l'opérateur qui sépare le nombre 1 du nombre 2, tant qu'il ny en a pas, les chiffre font parti du nombre 1
        chiffre1 += i;

    } else {//des qu'il y a un opérateur, les chiffres saisis font parti du nombre 2

        resultat = ""
        chiffre2 += i;
    }
    document.getElementById("text").innerHTML = "" +
        chiffre1 + " " + operateur + " " + chiffre2
};

//fonction des calculs
function egal(i) { // converti la chaine de caractere en nombre et fait l'opération correspondant

    if (operateur === "+") {
        resultat = Number(chiffre1) + Number(chiffre2);


    } else if (operateur === "-") {
        resultat = Number(chiffre1) - Number(chiffre2);


    } else if (operateur === "/") {
        resultat = Number(chiffre1) / Number(chiffre2);


    } else if (operateur === "*") {
        resultat = Number(chiffre1) * Number(chiffre2);


    } else {
        document.getElementById("text").innerHTML = "ERREUR"
    }
    chiffre1 = ""
    chiffre2 = ""
    operateur = ""
    document.getElementById("text").innerHTML = Math.round(resultat * 1000000) / 1000000; //Arondi le resultat pour evité l'infinité de chiffres apres la virgule...
}