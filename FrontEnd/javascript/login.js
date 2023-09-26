const form = document.querySelector('form');
console.log(form);

let formData;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  formData = new FormData(form);
  // on ajoute l'email et le mdp dans le formData
  formData.append('email', document.querySelector('input[type=email]').value)
  formData.append('password', document.querySelector('input[type=password]').value)

  // on créé un objet login avec l'email et le mdp 
  const login = {
    email : formData.getAll('email')[0],
    password : formData.getAll('password')[0]
  }

  postLogin(login)

  //const reponse = await fetch('http://localhost:5678/api/users/login')
  
  //form data
  //recuperer les valeurs des input
  //envoyer avec fetch (http) avec post
  //Si reponse ok 200 : stocker token dans le localStorage
  //Si erreur 403 : Afficher message d'erreur
});

async function postLogin(login) {
  console.log(login)

  await fetch("http://localhost:5678/api/users/login", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify(login)
  }).then((rep) => {
    if(rep.ok) {
      console.log(rep.json()) 
    }
  })

  //let repText = await rep.json()
  //console.log(repText)
  //console.log(rep)
  
}