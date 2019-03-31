var config = { // Configuration de FireBase
    apiKey: "AIzaSyDF2n20lla-H4CfU26iv2eVpXPDtdWx-X0",
    authDomain: "chat-js-c9afa.firebaseapp.com",
    databaseURL: "https://chat-js-c9afa.firebaseio.com",
    projectId: "chat-js-c9afa",
    storageBucket: "chat-js-c9afa.appspot.com",
    messagingSenderId: "1091280558423",
};
firebase.initializeApp(config);

Vue.directive('focus', {      // Enregistrer une directive globale appelée `v-focus`.
    inserted: function (el) { // Quand l'élément lié est inséré dans le DOM,
        el.focus()            // l'élément prend le focus.
    }
})

var chatJs = new Vue({
    el: '#app',
    data: {
        pseudo: "",
        msg: "",
        dateMsg: "",
        salon: "Salon1", // Salon actuel, par défaut est positioné sur le premier.
        listSalon: ["Salon1", "Salon2", "Salon3"],
        listMessages: [],
        database: firebase.database(),
    },
    created() {
        this.loadMsg();
    },
    mounted() {

    },
    methods: {
        loadMsg: function () {                                   // Récupère les donnée FireBase,
            let message = firebase.database().ref('listMessages')
            message.on('value', (msg) => {
                this.listMessages = []
                msg.forEach((data) => {
                    this.listMessages.push({                     // et les ajoutent à la liste des messages.
                        salon: data.child('salon').val(),
                        pseudo: data.child('pseudo').val(),
                        msg: data.child('msg').val(),
                        dateMsg: data.child('dateMsg').val(),
                    })
                })
            })
            /* index = this.listSalon[index];
            let message = firebase.database().ref('listMessages').orderByChild('salon').equalTo(e); */
        },
        filtreSalon: function (listMessages, salon) { // Filtre les messages selon le salon choisi.
            return listMessages.filter(function (u) {
                return u.salon === salon
            });
        },
        changeSalon: function (index) {
            this.salon = this.listSalon[index];
        },
        addMessage: function () {
            moment.locale('fr');
            if (this.pseudo !== '' && this.msg !== '') { // Verifie que le Peuso et le message ne soit pas vide,
                this.database.ref('listMessages').push({ // et les envoient les données vers FireBase.
                    salon: this.salon,
                    edit: '',
                    dateMsg: moment().local('fr').format("[Le] DD MMMM YYYY, à HH:mm:ss"),
                    pseudo: this.pseudo,
                    msg: this.msg,
                });
            };
            this.msg = "";
        },
        deleteMessage: function(index){
            // firebase.database().ref('listMessages').child(index).remove()
            
            const ref = this.database.ref('listMessages').val;
            // const z = firebase.database().ref('listmessages' + postKey).child('msg');
            // alert(postKey)
            // firebase.database().ref('listMessages').child(index).remove();
            alert(ref);
            console.log(ref)

        },
        editMessage: function(){

        },

    }
});