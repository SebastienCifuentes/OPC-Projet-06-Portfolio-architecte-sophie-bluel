const form = document.querySelector('form');
console.log(form);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  //form data
  //recuperer les valeurs des input
  //envoyer avec fetch (http) avec post
  //Si reponse ok 200 : stocker token dans le localStorage
  //Si erreur 403 : Afficher message d'erreur
});
