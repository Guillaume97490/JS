let resultat = 0;
let chiffre1 = "";
let chiffre2 = "";
let operateur = "";
let separateur = "";

// function resetChiffre(){

// }
function reset(i) {
    resultat = 0;
    chiffre1 = "";
    chiffre2 = "";
    operateur = "";
    separateur = "";
    document.getElementById("text").innerHTML = "Pret";
}

function ope(i) {
    operateur = i
    document.getElementById("text").innerHTML = "" +
                    chiffre1 + " " + operateur+" " + chiffre2
}

function chiffre(i) {
    if (operateur === "")
    chiffre1 += i;
    else{
    chiffre2 += i;
    }
    document.getElementById("text").innerHTML = "" +
                    chiffre1 + " " + operateur+" " + chiffre2
};

function egal(i){

    if (operateur === "+" ){
        resultat = Number(chiffre1) + Number(chiffre2);
        //alert(resultat)
    } else if (operateur === "-") {
        resultat = Number(chiffre1) - Number(chiffre2);
        //alert(resultat)
        
    } else if (operateur === "/") {
        resultat = Number(chiffre1) / Number(chiffre2);
        //alert(resultat)
        
    } else if (operateur === "*") {
        resultat = Number(chiffre1) * Number(chiffre2);
        //alert(resultat)
        
    } else {alert("Erreur...")}
    
    document.getElementById("text").innerHTML = "" +
                    chiffre1 + " " + operateur+" " + chiffre2 + "<br><br>" + "= \n"+ resultat;
}

