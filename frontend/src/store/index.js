import Vue from 'vue' //Importation de vue
import Vuex from 'vuex' //importation de vuex
import createPersistedState from 'vuex-persistedstate' // importation de createPersistedState - Gestion de l'état de l'appli

Vue.use(Vuex) // Utilisation de vuex

export default new Vuex.Store({
    state: {
        user: {
            id: 0,
            isAdmin: false,
            pseudo: '',
            profilPic: '',
        },
    },
    mutations: {
        initUser(state, data) { //Initialisation de l'utilisateur
            state.user.id = data.userId;
            state.user.isAdmin = data.isAdmin;
            state.user.pseudo = data.pseudo;
            state.user.profilPic = data.profilPic;
        },
        updatePseudo(state, newPseudo) { // Modification du pseudo
            state.user.pseudo = newPseudo;
        },
        updateProfilPic(state, newProfilPic) { // Modification de la photo de profil
            state.user.profilPic = newProfilPic;
        }
    },
    actions: {},
    plugins: [createPersistedState()],
})