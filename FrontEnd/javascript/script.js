// On récupère le token
const token = localStorage.getItem('token');

// Si token stocké, donc login ok
if (token) {
  let works;
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

  

  function displayWorks(works) {
    const thumbnailsModal = document.querySelector('.thumbnailsModal');
    const formModalTwo = document.querySelector('.formModalTwo');
    thumbnailsModal.innerHTML = '';
    const modalTitle = document.querySelector('.modalTitle');
    modalTitle.innerHTML = 'Galerie Photo';
    addPhotoButton.innerHTML = 'Ajouter une photo';
    addPhotoButton.classList.remove('disabled');
    addPhotoButton.classList.add('activated');
    backModalButton.classList.add('hidden');
    thumbnailsModal.classList.remove('hidden');
    formModalTwo.classList.add('hidden');


    for (let i = 0; i < works.length; i++) {
      const worksIndex = works[i];
      // Récupération de la section du Dom pour afficher la galerie
      const sectionGallery = document.querySelector('.thumbnailsModal');
      // Création Form pour les travaux
      const formElement = document.createElement('form');
      // Création de la balise figure qui affichera les travaux
      const worksElement = document.createElement('figure');
      worksElement.setAttribute('id', worksIndex.id);
      // Création des balises interne qui affichera images
      const imageElement = document.createElement('img');
      imageElement.src = worksIndex.imageUrl;
      // Création du boutton trash submit
      const trashButton = document.createElement('button');
      trashButton.setAttribute('type', 'submit');
      trashButton.setAttribute('data-id', worksIndex.id);
      const trash = document.createElement('i');
      trash.setAttribute('class', 'fa-solid fa-trash-can fa-xs trash');
      trashButton.appendChild(trash);
      // Rattachement de la balise figure à la section gallery
      sectionGallery.appendChild(formElement);
      // Rattachement du Form à la figure
      formElement.appendChild(worksElement);
      // Rattachement des balises img à la balise figure
      worksElement.appendChild(imageElement);
      // Rattachement du boutton au form
      worksElement.appendChild(trashButton);

      formElement.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(trashButton.getAttribute('data-id'));

        let reponse = fetch(
          `http://localhost:5678/api/works/${trashButton.getAttribute('data-id')}`,
          {
            method: 'delete',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (reponse.ok) {
          const updatedThumbnails = works.filter(
            (work) => work.id != trashButton.getAttribute('data-id')
          );
        }
      });
    }
  }

  const thumbnailsModal = document.querySelector('.thumbnailsModal');
  const formModalTwo = document.querySelector('.formModalTwo');
  const addPhotoButton = document.querySelector('.addPhotoButton');
  const backModalButton = document.querySelector('.back-modal');
  addPhotoButton.addEventListener('click', () => {
    switchModal2();
  });
  async function switchModal2() {
    thumbnailsModal.classList.add('hidden');
    formModalTwo.classList.remove('hidden');
    const modalTitle = document.querySelector('.modalTitle');
    modalTitle.innerHTML = 'Ajout Photo';
    addPhotoButton.innerHTML = 'Valider';
    addPhotoButton.classList.add('disabled');
    addPhotoButton.classList.remove('activated');
    backModalButton.classList.remove('hidden');

    const categories = document.querySelector('#categories');
    const allCategories = await getCategories();
    for (const element of allCategories) {
      const categoriesOption = document.createElement('option');
      categoriesOption.textContent = element.name;
      categories.appendChild(categoriesOption);
    }
  }

  async function getCategories() {
    let allCategories;
    await fetch('http://localhost:5678/api/categories')
    .then((response) => response.json())
    .then((categories) => allCategories = categories)
    .catch((error) => {
      alert(`Erreur: ` + error);
    });
    return allCategories
  }

  backModalButton.addEventListener('click', () => {
    displayWorks(works);
  });

  const toggleModal = () => {
    modalContainer.classList.toggle('active');

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
  };

  modalTriggers.forEach((trigger) =>
    trigger.addEventListener('click', toggleModal)
  );

  // Au clic sur logout on se délog (enlève le token) et on revient sur la page index
  loginBtn.href = '#';
  loginBtn.addEventListener('click', (event) => {
    event.preventDefault();
    window.localStorage.removeItem('token');
    window.location = 'index.html';
  });
}
