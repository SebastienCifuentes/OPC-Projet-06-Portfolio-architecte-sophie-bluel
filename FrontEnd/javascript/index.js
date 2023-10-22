let works;
let filteredWorks;

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

//Afficher la galerie depuis l'API
function displayWorks(works) {
  document.querySelector('.gallery').innerHTML = '';

  for (let i = 0; i < works.length; i++) {
    const worksIndex = works[i];
    // Récupération de la section du Dom pour afficher la galerie
    const sectionGallery = document.querySelector('.gallery');
    // Création de la balise figure qui affichera les travaux
    const worksElement = document.createElement('figure');
    // Création des balises interne qui affichera images et titres
    const imageElement = document.createElement('img');
    imageElement.src = worksIndex.imageUrl;
    imageElement.alt = worksIndex.title;
    const titleElement = document.createElement('h3');
    titleElement.innerHTML = worksIndex.title;
    // Rattachement de la balise figure à la section gallery
    sectionGallery.appendChild(worksElement);
    // Rattachement des balises img et h3 à la balise figure
    worksElement.appendChild(imageElement);
    worksElement.appendChild(titleElement);
  }
}

//Récupération des catégories depuis l'API : fetch GET
fetch('http://localhost:5678/api/categories')
  .then((response) => response.json())
  .then((categories) => displayCategory(categories))
  .catch((error) => {
    alert(`Erreur: ` + error);
  });

function displayCategory(categories) {
  // Récupération de la section du Dom pour insérer les filtres
  const sectionFilters = document.querySelector('.filters');

  //Création du button "Tous", puis des button category
  const buttonAll = document.createElement('button');
  buttonAll.textContent = 'Tous';
  buttonAll.setAttribute('data-id', 0);
  buttonAll.classList.add('btnFilter');
  buttonAll.classList.add('activated');
  sectionFilters.appendChild(buttonAll);

  for (const element of categories) {
    const buttonCategory = document.createElement('button');
    buttonCategory.textContent = element.name;
    buttonCategory.setAttribute('data-id', element.id);
    buttonCategory.classList.add('btnFilter');
    sectionFilters.appendChild(buttonCategory);

    document.querySelectorAll('.btnFilter').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        document.querySelector('.activated').classList.remove('activated');
        e.target.classList.add('activated');

        filteredWorks = works.filter(
          (el) => el.categoryId == btn.getAttribute('data-id')
        );

        if (filteredWorks.length !== 0) {
          displayWorks(filteredWorks);
        } else {
          displayWorks(works);
        }
      });
    });
  }
}

