// On récupère le token
const token = localStorage.getItem('token');

// Si token stocké, donc login ok
if (token) {
  // On joute la barre admin, on enlève les filtres
  document.querySelector('.blackBarAdmin').classList.remove('hidden');
  document.querySelector('.filters').classList.add('hidden');
  // On ajoute le bouton Modifier et modifie la margin du titre Mes Projets
  document.querySelector('.modal-btn').classList.remove('hidden');
  const titleProject = document.querySelector('.portfolioTitleLogged');
  titleProject.style.marginBottom = '92px';

  // On modifie la valeur du bouton login en logout
  const loginBtn = document.querySelector('.loginLogout');
  loginBtn.innerHTML = 'logout';

  // On dynamise la fermeture de la modale
  const modalContainer = document.querySelector('.modal-container');
  const modalTriggers = document.querySelectorAll('.modal-trigger');

  modalTriggers.forEach(trigger => trigger.addEventListener('click', toggleModal));

  function toggleModal() {
    modalContainer.classList.toggle('active');

    let works;

    //Récupération des travaux depuis l'API : fetch GET
    fetch('http://localhost:5678/api/works')
      .then((response) => response.json())
      .then((data) => {
        works = data;
        displayWorks(works);
      })
      .catch((error) => {
        alert(`Erreur: ` + error);
      });

      function displayWorks(works) {
        document.querySelector('.thumbnailsModal').innerHTML = '';
      
        for (let i = 0; i < works.length; i++) {
          const worksIndex = works[i];
          // Récupération de la section du Dom pour afficher la galerie
          const sectionGallery = document.querySelector('.thumbnailsModal');
          // Création de la balise figure qui affichera les travaux
          const worksElement = document.createElement('figure');
          // Création des balises interne qui affichera images
          const imageElement = document.createElement('img');
          imageElement.src = worksIndex.imageUrl;

          const trash = document.createElement("i");
          trash.setAttribute("class", "fa-solid fa-trash-can");
          trash.setAttribute("id", "trash");

          // Rattachement de la balise figure à la section gallery
          sectionGallery.appendChild(worksElement);
          // Rattachement des balises img à la balise figure
          worksElement.appendChild(imageElement);
          imageElement.appendChild(trash);
        }
      }
  }

  // Au clic sur logout on se délog (enlève le token) et on revient sur la page index
  loginBtn.href = '#';
  loginBtn.addEventListener('click', (event) => {
    event.preventDefault();
    window.localStorage.removeItem('token');
    window.location = 'index.html';
  });
}
