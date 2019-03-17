// Enregistrer une directive globale appelée `v-focus`
Vue.directive('focus', {
  // Quand l'élément lié est inséré dans le DOM...
  inserted: function (el) {
    // L'élément prend le focus
    el.focus()
  }
})

new Vue({
  el: "#app",
  data: {
    task: "",
    todos: [],
  },

  // Lecture des données locales sauvegardés
  mounted() {

    // Met le focus sur input ajout de tâche
    let input = document.querySelector('[autofocus]');
    if (input) {
      input.focus();
    };

    // Si il y a des données locales, elles seront chargées
    if (localStorage.getItem('dataLocal')) {
      try {
        this.todos = JSON.parse(localStorage.getItem('dataLocal'));
      } catch (e) {
        localStorage.removeItem('dataLocal');
      }
    }
  },

  methods: {
    addTask: function (task) {
      if (task !== "") {
        this.todos.push({
          value: task,
          edit: '',
          termine: ''
        });
        this.task = "";
        this.saveOnLocal();
      }
    },

    editTask: function (todo) {
      todo.edit = true;
    },

    editInputTask: function (todo) {
      todo.edit = false;
      this.saveOnLocal();
      // refocus sur l'input nouvelle tâche
      let input = document.querySelector('[autofocus]');
      if (input) {
        input.focus();
      };
    },

    termineTask: function (todo) {
      if (todo.termine == true) {
        todo.termine = false;
      } else {
        todo.termine = true;
      }
      this.saveOnLocal();
    },

    // confirmation de la suppresion
    deleteTask: function (index) {
      // affiche le nom de la tache à supprimer
      if (confirm('Etes-vous sur de vouloir supprimer la tâche ' + '" ' + this.todos[index].value + ' "' + ' ?')) {
        this.todos.splice(index, 1)
        this.saveOnLocal();
      }
    },

    // Suppresion de toutes les tâches
    deleteAllTask: function () {
      if (confirm("Etes-vous sur de vouloir supprimer l'ensemble des tâches ?")) {
        this.todos = [];
        this.saveOnLocal();
      }
    },

    // Sauvegarde des nouvelles données locales
    saveOnLocal() {
      const parsed = JSON.stringify(this.todos);
      localStorage.setItem('dataLocal', parsed);
    },
  }
})