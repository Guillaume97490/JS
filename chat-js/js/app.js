const config = { // Configuration de FireBase
    apiKey: "AIzaSyDF2n20lla-H4CfU26iv2eVpXPDtdWx-X0",
    authDomain: "chat-js-c9afa.firebaseapp.com",
    databaseURL: "https://chat-js-c9afa.firebaseio.com",
    projectId: "chat-js-c9afa",
    storageBucket: "chat-js-c9afa.appspot.com",
    messagingSenderId: "1091280558423",
};
firebase.initializeApp(config);
Vue.directive('focus', { // Enregistrer une directive globale appelée `v-focus`.
    inserted(el) { // Quand l'élément lié est inséré dans le DOM,
        el.focus() // l'élément prend le focus.
    },
});

const chatJs = new Vue({
    el: '#app',
    data: {
        pseudo: "",
        pseudoEdit: "",
        password: "",
        passwordEdit: "",
        msg: "",
        msgEdit: "",
        dateMsg: "",
        salon: "Salon1",
        listSalon: ["Salon1", "Salon2", "Salon3"],
        listMessages: [],
        listUsers: [],
        pseudoExist: "",
        passwordExist: "",
        switchFormLogin: true,
        database: firebase.database(),
    },

    created() {
        this.loadUsers();
        this.loadMsg();

    },

    methods: {

        resetLogin() {
            this.pseudoEdit = "";
            this.passwordExist = "";
            this.pseudoExist = "";
            this.passwordEdit = "";

        },
        connectUser() {
            this.database.ref('listUsers').orderByChild('pseudo').equalTo(this.pseudoEdit).on("value", snapshot => { // vérifie que le pseudo existe dans FireBase.
                snapshot.forEach((child => {
                    firebase.database().ref('listUsers').child(child.key).child('pseudo');
                    this.pseudoExist = child.child('pseudo').val();
                    this.passwordExist = CryptoJS.MD5(child.child('password').val().toString()); // Utilisation de CryptoJS pour le hashage des mots de passes
                }));

                var hash = CryptoJS.MD5(this.passwordEdit).toString();

                if (this.pseudoEdit) {
                    if (this.pseudoExist === this.pseudoEdit && this.passwordExist == hash) {
                        this.pseudoExist = ""
                        this.pseudo = this.pseudoEdit;
                        this.database.ref('listUsers').orderByChild('pseudo').equalTo(this.pseudoEdit).once("value", snapshot => {
                            snapshot.forEach((child => {
                                firebase.database().ref('listUsers').child(child.key).onDisconnect().update({
                                    enLigne: false
                                })
                                firebase.database().ref('listUsers').child(child.key).update({
                                    enLigne: true, // Change le statut de l'utilisateur à "En ligne"
                                });
                            }));
                        });
                        this.pseudoEdit = "";
                        
                    } else {
                        document.getElementById("errorConnect").innerHTML = "Identifiants incorrects. Merci de réessayer."
                        this.resetLogin();
                    };
                };
                this.scrollAuto();
            });
        },

        inscriptionUser() {
            this.database.ref('listUsers').orderByChild('pseudo').equalTo(this.pseudoEdit).on("value", snapshot => {
                snapshot.forEach((child => {
                    firebase.database().ref('listUsers').child(child.key).child('pseudo');
                    this.pseudoExist = child.child('pseudo').val();
                }));

                if (this.inscriptionSucces == true) {
                    this.connectUser();
                    this.resetLogin();

                } 
                else if (this.pseudoExist === this.pseudoEdit) {
                    this.resetLogin();
                    document.getElementById("errorInscription").innerHTML = "Nom d'utilisateur existant, merci d'en choisir un autre"

                } else if (this.pseudoEdit && this.passwordEdit) {
                    const myRef = this.database.ref().push(); // génère un ID unique,
                    const key = myRef.key;
                    this.inscriptionSucces = true
                    this.database.ref("listUsers").push({
                        idUser: key,
                        pseudo: this.pseudoEdit,
                        password: this.passwordEdit,
                        enLigne: false,
                    });
                };

            });
            this.database.ref('listUsers').orderByChild('pseudo').equalTo(this.pseudoEdit).once("value", snapshot => {
                snapshot.forEach((child => {
                    firebase.database().ref('listUsers').child(child.key).onDisconnect().update({
                        enLigne: false
                    });
                }));
            });
        },

        logoutUser(pseudo) {
            pseudo = this.pseudo;
            this.database.ref('listUsers').orderByChild('pseudo').equalTo(pseudo).once("value", snapshot => { // Récupère l'ID unique FireBase.
                snapshot.forEach((child => {
                    firebase.database().ref('listUsers').child(child.key).update({ // Déconnecte l'utilisateur 
                        enLigne: false
                    });
                }));
            });
            this.switchFormLogin = true;
            this.pseudo = "";
            this.pseudoExist = "";
            this.password = "";
            this.inscriptionSucces = "";
            this.resetLogin();
        },

        loadMsg() {
            this.database.ref("listMessages").on('value', (msg) => {
                this.listMessages = [];
                msg.forEach((data) => {
                    this.listMessages.push({
                        idMsg: data.child('idMsg').val(),
                        salon: data.child('salon').val(),
                        pseudo: data.child('pseudo').val(),
                        msg: data.child('msg').val(),
                        edit: data.child('edit').val(),
                        dateMsg: data.child('dateMsg').val(),
                    });
                    this.scrollAuto();
                });
            });
        },

        loadUsers() {
            this.database.ref("listUsers").on('value', (pseudo) => {
                this.listUsers = [];
                pseudo.forEach((data) => {
                    this.listUsers.push({
                        idUser: data.child('idUser').val(),
                        pseudo: data.child('pseudo').val(),
                        enLigne: data.child('enLigne').val(),
                    });
                });
            });

        },

        filtreSalon(listMessages, salon) { // Filtre les messages selon le salon choisi.
            return listMessages.filter(u => u.salon === salon);
        },

        filtreEnligne(listUsers, enLigne) {
            return listUsers.filter(v => v.enLigne === enLigne);
        },

        changeSalon(index) {
            this.salon = this.listSalon[index];
            this.scrollAuto();
        },

        privateSalon(idUser) {
            this.database.ref('listUsers').orderByChild('idUser').equalTo(idUser).on("value", snapshot => {
                snapshot.forEach((child => {
                    firebase.database().ref('listUsers').child(child.key).child('pseudo');
                    var userB = child.child('pseudo').val();
                    (userB > this.pseudo) ? this.salon = this.pseudo + " et " + userB: this.salon = userB + " et " + this.pseudo;
                    this.scrollAuto();
                }));
            });
        },

        addMessage() {
            moment.locale('fr');
            if (this.pseudo !== '' && this.msg !== '') { // Verifie que le Peuso et le message ne soit pas vide,
                const myRef = this.database.ref().push(); // génère un ID unique,
                const key = myRef.key;
                this.database.ref('listMessages').push({
                    idMsg: key,
                    salon: this.salon,
                    dateMsg: moment().local('fr').format("[Le] DD MMMM YYYY, à HH:mm:ss"),
                    pseudo: this.pseudo,
                    msg: this.msg,
                    edit: '',
                });
            };
            this.msg = "";
            this.scrollAuto();
        },

        deleteMessage(idMsg, pseudo) {
            if (pseudo === this.pseudo) {
                this.database.ref('listMessages').orderByChild('idMsg').equalTo(idMsg).on("value", snapshot => { // Récupère l'ID unique FireBase.
                    snapshot.forEach((child => {
                        firebase.database().ref('listMessages').child(child.key).remove();
                    }));
                });
            } else {
                alert("Désolé, seul l'auteur de ce message est en mesure de le supprimer")
            };
        },

        editMessage(idMsg, msg, pseudo) {
            if (pseudo == this.pseudo) {
                this.msgEdit = msg;

                this.database.ref('listMessages').orderByChild('idMsg').equalTo(idMsg).once("value", snapshot => {
                    snapshot.forEach((child => {
                        var idMsgEdit = child.child("idMsg").val()

                        var indexEdit = this.listMessages.map(e => e.idMsg).indexOf(idMsgEdit); // Recherche l'Id unique du message dans le tableau pout retrouver l'index
                        this.listMessages[indexEdit].edit = true;
                    }));
                });

            } else {
                alert("Désolé, seul l'auteur de ce message est en mesure de l'éditer")
            };
        },

        validInputEditMessage(idMsg) {
            const editedMsg = this.msgEdit;
            this.database.ref('listMessages').orderByChild('idMsg').equalTo(idMsg).once("value", snapshot => {
                snapshot.forEach((child => {
                    firebase.database().ref('listMessages').child(child.key).update({
                        msg: editedMsg
                    });
                    firebase.database().ref('listMessages').child(child.key).update({
                        edit: false
                    });
                }));
            });
        },

        scrollAuto() {
            this.pseudo ? setTimeout(() => { // Attendre le rafraichissement du DOM pour l'autoscroll
                var el = document.getElementById('listingMessage');
                el.scrollTop = el.scrollHeight;
            }, 100) : ""
        },
    },
});