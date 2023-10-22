// Sélectionne le formulaire dans le DOM.
const form = document.querySelector('form');

// Ajoute un événement 'submit' au formulaire.
form.addEventListener('submit', async (e) => {
  // Reset du formulaire.
  e.preventDefault();
  
  // Récupère les valeurs des email et mot de passe du formulaire.
  const email = document.querySelector('input[type=email]').value;
  const password = document.querySelector('input[type=password]').value;

  // Crée un objet login avec les valeurs récupérées.
  const login = { email, password };

  try {

    // Envoie une requête POST au serveur avec les données de login.
    const response = await fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(login),
    });

    // Attend que la réponse du serveur soit convertie en JSON.
    const result = await response.json();

    // Vérifie si la réponse du serveur est OK (code statut HTTP entre 200 et 299).
    if (response.ok) {
      // Si c'est OK, stocke le token reçu dans le localStorage.
      localStorage.setItem('token', result.token);
      // Redirige l'utilisateur vers la page d'accueil.
      window.location = './index.html';
    } else {
      // Si la réponse n'est pas OK, affiche un message d'erreur.
      document.querySelector('.errorMessage').classList.remove('hidden');
    }
  } catch (error) {
    // Si erreur lors de l'exécution du code dans le try, affiche l'erreur dans la console.
    console.log(error);
  }
});