import Vue from 'vue' //Importation de vue
import App from './App.vue' //Importation d'App
import router from './router' // Importation du router
import store from './store' //Importation de store

Vue.config.productionTip = false

new Vue({
    router,
    store,
    //fonction de rendu
    render: h => h(App) // nom de balise
}).$mount('#app')

Vue.use(require('vue-moment')); // la vue utilisée