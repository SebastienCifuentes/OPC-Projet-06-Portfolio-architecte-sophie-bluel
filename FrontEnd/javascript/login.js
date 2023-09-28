const form = document.querySelector('form');

let formData;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  formData = new FormData(form);
  // on ajoute l'email et le mdp dans le formData
  formData.append('email', document.querySelector('input[type=email]').value);
  formData.append(
    'password',
    document.querySelector('input[type=password]').value
  );

  // on créé un objet login avec l'email et le mdp
  const login = {
    email: formData.getAll('email')[0],
    password: formData.getAll('password')[0],
  };

  postLogin(login); // Appel de la fonction qui gère le POST

  
});

async function postLogin(login) {
  try { // on essaye le post
    let reponse = await fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(login),
    });

    let resultat = await reponse.json();
    let statusRequete = reponse.status;

    if (statusRequete === 200) { // Si status reponse 200 (ok), alors on stock le token et redirection homepage
      localStorage.setItem('token', resultat.token);
      window.location = './index.html';
    } else { // Sinon message d'erreur
      document.querySelector('.errorMessage').classList.remove('hidden');
    }
  } catch (error) {
    console.log(error);
  }
}

