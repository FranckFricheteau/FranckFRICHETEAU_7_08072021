<template>
  <img
    :src="avatar"
    alt="avatar"
  />
</template>

<script>

export default {
  name: 'Avatar',
  props: {
    user: {
      type: Object
    }
  },
  computed: {
    avatar() { //photo de l'utilisateur
    if (this.user.profilPic == '' || this.user.profilPic == null) { // compare tous types de photos OU pas de photo de l'utilisateur
      return '/profile_utilisator.png' // retourne une image en particulier (profile_utilisator.png)
      }
      return 'http://localhost:3000/images/' + this.user.profilPic // retourne sur le dossier images du port 3000 avec la photo de profil de l'utilisateur
    }
  },
}
</script>