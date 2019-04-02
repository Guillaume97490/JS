var config = { // Configuration de FireBase
    apiKey: "AIzaSyDF2n20lla-H4CfU26iv2eVpXPDtdWx-X0",
    authDomain: "chat-js-c9afa.firebaseapp.com",
    databaseURL: "https://chat-js-c9afa.firebaseio.com",
    projectId: "chat-js-c9afa",
    storageBucket: "chat-js-c9afa.appspot.com",
    messagingSenderId: "1091280558423",
};
firebase.initializeApp(config);

Vue.directive('focus', { // Enregistrer une directive globale appelée `v-focus`.
    inserted: function (el) { // Quand l'élément lié est inséré dans le DOM,
        el.focus() // l'élément prend le focus.
    },
});

var chatJs = new Vue({
    el: '#app',
    data: {
        pseudo: "",
        pseudoEdit: "",
        msg: "",
        msgEdit: "",
        dateMsg: "",
        salon: "Salon1", // Salon actuel, par défaut est positioné sur le premier.
        listSalon: ["Salon1", "Salon2", "Salon3"],
        listMessages: [],
        listUsers: [],
        database: firebase.database(),
    },

    created() {
        this.loadMsg();
        this.loadUsers();
    },

    methods: {
        loadMsg: function () { // Récupère les donnée FireBase,
            let message = firebase.database().ref('listMessages')
            message.on('value', (msg) => {
                this.listMessages = []
                msg.forEach((data) => {
                    this.listMessages.push({ // et les ajoutent à la liste des messages.
                        idMsg: data.child('idMsg').val(),
                        salon: data.child('salon').val(),
                        pseudo: data.child('pseudo').val(),
                        msg: data.child('msg').val(),
                        edit: data.child('edit').val(),
                        dateMsg: data.child('dateMsg').val(),
                    });
                });
            });

        },
        loadUsers: function () {
            let user = firebase.database().ref('listUsers')
            user.on('value', (pseudo) => {
                this.listUsers = []
                pseudo.forEach((data) => {
                    this.listUsers.push({ // et les ajoutent à la liste des messages.
                        idUser: data.child('idUser').val(),
                        pseudo: data.child('pseudo').val(),
                    });
                });
            });
        },

        filtreSalon: function (listMessages, salon) { // Filtre les messages selon le salon choisi.
            return listMessages.filter(function (u) {
                return u.salon === salon
            });
        },

        changeSalon: function (index) {
            this.salon = this.listSalon[index];
        },

        loginUser: function () { 

            // A voir : vérifier que le pseudo n'existe pas déja dans FireBase

            if (this.pseudoEdit !== '') {
                this.pseudo = this.pseudoEdit;
                var myRef = firebase.database().ref().push(); // génère un ID unique,
                var key = myRef.key;
                this.database.ref('listUsers').push({ //  et envoient les données vers FireBase.
                    idUser: key,
                    pseudo: this.pseudo,
                });
            };
            this.pseudoEdit = "";
        },
        logoutUser: function (pseudo) {
            pseudo = this.pseudo;
            var ref = firebase.database().ref('listUsers');
            ref.orderByChild('pseudo').equalTo(pseudo).on("value", function (snapshot) { // Récupère l'ID unique FireBase.
                snapshot.forEach((function (child) {
                    firebase.database().ref('listUsers').child(child.key).remove(); // Supprime d'apres l'ID unique.
                }));
            });
            this.pseudo = "";
        },
        privateSalon: function(idUser){ // A FINIR
            
            // alert(idUser)


            // var ref = firebase.database().ref('listUsers');
            // ref.orderByChild('pseudo').equalTo(pseudo).on("value", function (snapshot) { // Récupère l'ID unique FireBase.
            //     snapshot.forEach((function (child) {
            //         console.log(child.key)
            //         // firebase.database().ref('listUsers').child(child.key).remove(); // Supprime d'apres l'ID unique.
            //     }));
            // });


        },

        addMessage: function () {
            moment.locale('fr');
            if (this.pseudo !== '' && this.msg !== '') { // Verifie que le Peuso et le message ne soit pas vide,
                var myRef = firebase.database().ref().push(); // génère un ID unique,
                var key = myRef.key;

                this.database.ref('listMessages').push({ //  et envoient les données vers FireBase.
                    idMsg: key,
                    salon: this.salon,
                    edit: '',
                    dateMsg: moment().local('fr').format("[Le] DD MMMM YYYY, à HH:mm:ss"),
                    pseudo: this.pseudo,
                    msg: this.msg,
                });
            };
            this.msg = "";
        },

        deleteMessage: function (idMsg) {
            var ref = firebase.database().ref('listMessages');
            ref.orderByChild('idMsg').equalTo(idMsg).on("value", function (snapshot) { // Récupère l'ID unique FireBase.
                snapshot.forEach((function (child) {
                    firebase.database().ref('listMessages').child(child.key).remove(); // Supprime le message d'apres l'ID unique.
                }));
            });
        },

        editMessage: function (idMsg, msg) {
            this.msgEdit = msg;
            var ref = firebase.database().ref('listMessages');
            ref.orderByChild('idMsg').equalTo(idMsg).once("value", function (snapshot) {
                snapshot.forEach((function (child) {
                    firebase.database().ref('listMessages').child(child.key).update({ // Modifie la valeur sur FireBase
                        edit: true
                    });
                }));
            });
        },

        validInputEditMessage: function (idMsg) {
            var editedMsg = this.msgEdit
            var ref = firebase.database().ref('listMessages');
            ref.orderByChild('idMsg').equalTo(idMsg).once("value", function (snapshot) {
                snapshot.forEach((function (child) {
                    firebase.database().ref('listMessages').child(child.key).update({
                        msg: editedMsg
                    });
                    firebase.database().ref('listMessages').child(child.key).update({
                        edit: false
                    });
                }));
            });
        },
    },
});