<template>
  <div class="bg-gray-900" id="app"> <!--Application-->
    <header-top 
    :is-connected="isConnected"
    ></header-top>
    <router-view></router-view>
  </div>
</template>

<script>
// dans la version complète, des fonctions utilitaires sont exposées telles que `Vuex.mapState`
import { mapState } from 'vuex';
//Importation du header depuis components
import Header from './components/Header'

//exportation par défaut - Nom : App ; composant : header
export default {
  name: 'App',
  components: {
    'header-top': Header
  },
  //cycle de vie d'une instance
  mounted() {
    this.check();
  },
  methods: {
    check() { // cherche si l'utilisateur n'est pas connecté par rapport au router
      if (this.user.id == 0 &&
      this.$router.currentRoute.path != '/') {
      this.$router.push('/');
      }
    }
  },
  //propriétés calculées 
  computed: {
    ...mapState(['user']),

    isConnected() { // quand l'utilisateur est connecté
      return (this.user.id > 0); // retourne utilisateur connecté
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style> 