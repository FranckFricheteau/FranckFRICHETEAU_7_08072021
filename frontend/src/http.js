import axios from "axios"; //Importation d'anxios - un client HTTP basé sur les Promesses

const http = axios.create({
    baseURL: "http://localhost:3000/api", // sur localhost port 3000
});

// Attribue le header Authorization avec le token à chaques requêtes axios
http.interceptors.request.use(function(config) {
    const token = localStorage.getItem('token'); //stockage des données côté client
    config.headers.Authorization = token ? `Bearer ${token}` : 'abc'; //JSON Web Token dont le rôle est d'indiquer que l'utilisateur qui accède aux ressources est bien authentifié de façon sécurisée "abc" de l'ahthentification forte
    return config;
});

export default http; // export adresse http