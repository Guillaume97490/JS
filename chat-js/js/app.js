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
        msg: "",
        msgEdit: "",
        dateMsg: "",
        salon: "Salon1",
        listSalon: ["Salon1", "Salon2", "Salon3"],
        listMessages: [],
        listUsers: [],
        pseudoExist: "",
        database: firebase.database(),
    },

    created() {
        this.loadMsg();
        this.loadUsers();
    },
    mounted(){

    },

    methods: {
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
                    });
                });
            });
        },

        filtreSalon(listMessages, salon) { // Filtre les messages selon le salon choisi.

            return listMessages.filter(u => u.salon === salon);
        },

        changeSalon(index) {
            this.salon = this.listSalon[index];
            this.scrollAuto();
        },

        loginUser() {

            // vérifie que le pseudo n'existe pas déja dans FireBase.
            this.database.ref('listUsers').orderByChild('pseudo').equalTo(this.pseudoEdit).on("value", snapshot => {
                snapshot.forEach((child => {
                    firebase.database().ref('listUsers').child(child.key).child('pseudo');
                    this.pseudoExist = child.child('pseudo').val();
                }));

                if (this.pseudoExist == this.pseudoEdit) {
                    alert("ce pseudo éxiste déja !");
                    this.pseudoExist = ""

                } else if (this.pseudoEdit !== '') {
                    this.pseudoExist = ""
                    this.pseudo = this.pseudoEdit;
                    this.pseudoEdit = ""
                    const myRef = this.database.ref().push(); // génère un ID unique,
                    const key = myRef.key;
                    this.database.ref("listUsers").push({
                        idUser: key,
                        pseudo: this.pseudo,
                    });
                };

                this.pseudoEdit = "";
                this.scrollAuto();
            });
        },

        logoutUser(pseudo) {
            pseudo = this.pseudo;
            this.database.ref('listUsers').orderByChild('pseudo').equalTo(pseudo).on("value", snapshot => { // Récupère l'ID unique FireBase.
                snapshot.forEach((child => {
                    firebase.database().ref('listUsers').child(child.key).remove(); // Supprime d'apres l'ID unique.
                }));
            });
            this.pseudo = "";
            this.pseudoExist = "";
            this.pseudo = "";

            setTimeout(() => { // Attendre le rafraichissement du DOM pour l'autoscroll
                window.location.reload()
            }, 100);




        },

        privateSalon(idUser) {
            this.database.ref('listUsers').orderByChild('idUser').equalTo(idUser).on("value", snapshot => {
                snapshot.forEach((child => {
                    firebase.database().ref('listUsers').child(child.key).child('pseudo');
                    var userB = child.child('pseudo').val();

                    if (userB > this.pseudo) {
                        this.listSalon.push(this.pseudo + " et " + userB);
                        this.salon = this.pseudo + " et " + userB;
                        this.scrollAuto();
                    };

                    if (userB < this.pseudo) {
                        this.listSalon.push(userB + " et " + this.pseudo);
                        this.salon = userB + " et " + this.pseudo;
                        this.scrollAuto();
                    };
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
                        firebase.database().ref('listMessages').child(child.key).update({ // Modifie la valeur sur FireBase
                            edit: true
                        });
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
            if (this.pseudo !== "") {
                setTimeout(() => { // Attendre le rafraichissement du DOM pour l'autoscroll
                    var el = document.getElementById('listingMessage');
                    el.scrollTop = el.scrollHeight;
                }, 100);
            };
        },
    },
});