var config = { // Configuration de FireBase
    apiKey: "AIzaSyDF2n20lla-H4CfU26iv2eVpXPDtdWx-X0",
    authDomain: "chat-js-c9afa.firebaseapp.com",
    databaseURL: "https://chat-js-c9afa.firebaseio.com",
    projectId: "chat-js-c9afa",
    storageBucket: "chat-js-c9afa.appspot.com",
    messagingSenderId: "1091280558423",
};
firebase.initializeApp(config);


Vue.directive('focus', { // Enregistrer une directive globale appelée `v-focus`
    inserted: function (el) { // Quand l'élément lié est inséré dans le DOM...
        el.focus() // L'élément prend le focus
    }
})

var chatJs = new Vue({
    el: "#app",
    data: {
        message: "",
        msgEdit: "",
        salon: "salon2",
        user: "",
        editPseudoInput: true,
        listUsers: [],
        chats: [],
        salon2s: [],
        database: firebase.database(),
    },
    created() { // a la création de l'instance Vue JS ...
        const refSalons2s = firebase.database().ref('salon2'); // ...On récupère les données de Firebase
        refSalons2s.on('value', (snapshot) => {
            this.salon2s = snapshot.val();
        });
        const refChats = firebase.database().ref('chats');
        refChats.on('value', (snapshot) => {
            this.chats = snapshot.val();
        });

    },
    mounted() {

        // Met le focus sur input ajout de tâche
        // let input = document.querySelector('[autofocus]');
        // if (input) {
        //     input.focus();
        // };


        //  // Si il y a des données locales, elles seront chargées
        // if (localStorage.getItem('dataLocal')) {
        //     try {
        //         this.listUsers = JSON.parse(localStorage.getItem('dataLocal'));
        //     } catch (e) {
        //         localStorage.removeItem('dataLocal');
        //     }
        // };
        //     if (localStorage.getItem('dataLocalChats')) {
        //         try {
        //             this.chats = JSON.parse(localStorage.getItem('dataLocalChats'));
        //         } catch (e) {
        //             localStorage.removeItem('dataLocalChats');
        //         }
        //     };
        //     if (localStorage.getItem('dataLocalSalon2s')) {
        //         try {
        //             this.salon2s = JSON.parse(localStorage.getItem('dataLocalSalon2s'));
        //         } catch (e) {
        //             localStorage.removeItem('dataLocalSalon2s');
        //         }
        //     };

    },


    methods: {
        envoyerMessage: function () {
            moment.locale('fr');
            if (this.editPseudoInput == true) {

                this.listUsers.push({
                    user: this.user,
                });
                this.editPseudoInput = false;
            }
            this.editPseudoInput = false;


            if (this.salon == "chats") {
                this.database.ref('chats').push({ // Envoie de données sur FireBase
                    value: this.message,
                    edit: '',
                    date: moment().local('fr').format("[Le] DD MMMM YYYY, à HH:mm:ss"),
                    pseudo: this.user,
                });

            }
            if (this.salon == "salon2") {


                this.database.ref('salon2').push({ // Envoie de données sur FireBase
                    value: this.message,
                    edit: '',
                    date: moment().local('fr').format("[Le] DD MMMM YYYY, à HH:mm:ss"),
                    pseudo: this.user,

                });

            }
            this.message = ""; // remet à zéro la zonne de texte "message"
            this.saveOnLocal();
        },
        editMessage: function (chat , salon2) {

            if (this.salon == "chats") {
                chat.edit = true;
                this.msgEdit = chat.value; // à l'édition de message, place le précédent contenu dans l'input

            };
            if (this.salon == "salon2") {
                salon2.edit = true;
                this.msgEdit = salon2.value;

            };


        },
        editInputMessage(index , chat , salon2) {

            const postKey = firebase.database().ref().child(index).key; // Récupère la clé de l'élément,


            if (this.salon == "chats") {
                firebase.database().ref('chats/' + postKey).child('value').set(this.msgEdit); // Et met à jour la value de cet élément.
            };
            if (this.salon == "salon2") {
                alert("test")
                firebase.database().ref('salon2/' + postKey).child('value').set(this.msgEdit); // Et met à jour la value de cet élément.
            };
            
            chat.edit = false;
            salon2.edit = false;

        },
        goChats: function () {
            this.salon = "chats";
        },
        goSalon2: function () {

            this.salon = "salon2";
        },
        deleteMessage: function (index) {
            // alert("test")
            if (this.salon == "chats") {
                firebase.database().ref('chats').child(index).remove(); // Suppresion de message sur FireBase

            };
            if (this.salon == "salon2") {
                firebase.database().ref('salon2').child(index).remove();
            };
        },
        changePseudo: function () {
            this.listUsers.push({
                user: this.user,
            });
            this.editPseudoInput = false;
            this.saveOnLocal();
        },
        // Sauvegarde des nouvelles données locales
        saveOnLocal() {
            const parsedListUsers = JSON.stringify(this.listUsers);
            localStorage.setItem('dataLocal', parsedListUsers);

            const parsedChats = JSON.stringify(this.chats);
            localStorage.setItem('dataLocalChats', parsedChats);

            const parsedSalon2s = JSON.stringify(this.salon2s);
            localStorage.setItem('dataLocalSalon2s', parsedSalon2s);
        },
        // Lecture des données locales sauvegardés


    },

})