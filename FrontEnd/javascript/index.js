//Récupération des travaux depuis l'API : fetch GET
fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((works) => displayWorks(works))
    .catch((error) => {
        alert(`Erreur: ` + error);
});

function displayWorks(works) {
    for (let i = 0; i < works.length; i++) {
        const worksIndex = works[i];
        // Récupération de la section du Dom pour afficher la galerie
        const sectionGallery = document.querySelector(".gallery");
        // Création de la balise figure qui affichera les travaux
        const worksElement = document.createElement("figure");
        // Création des balises interne qui affichera images et titres
        const imageElement = document.createElement("img");
        imageElement.src = worksIndex.imageUrl;
        imageElement.alt = worksIndex.title;
        const titleElement = document.createElement("h3");
        titleElement.innerHTML = worksIndex.title;

        // Rattachement de la balise figure à la section gallery
        sectionGallery.appendChild(worksElement);
        // Rattachement des balises img et h3 à la balise figure
        worksElement.appendChild(imageElement);
        worksElement.appendChild(titleElement);
    }
}


//Récupération des catégories depuis l'API : fetch GET
fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((categories) => displayCategory(categories))
    .catch((error) => {
        alert(`Erreur: ` + error);
});

function displayCategory(categories) {
    // Récupération de la section du Dom pour insérer les filtres
    const sectionFilters = document.querySelector(".filters");
    
    //Création du bouton "Tous"
    const buttonAll = document.createElement("button");
    buttonAll.textContent = "Tous";
    buttonAll.classList.add("btnFilter");
    sectionFilters.appendChild(buttonAll);
    //Création du bouton "Objets"
    const buttonObjects = document.createElement("button");
    buttonObjects.textContent = "Objets";
    buttonObjects.classList.add("btnFilter");
    sectionFilters.appendChild(buttonObjects);
    //Création du bouton "Appartements"
    const buttonAppartements = document.createElement("button");
    buttonAppartements.textContent = "Appartements";
    buttonAppartements.classList.add("btnFilter");
    sectionFilters.appendChild(buttonAppartements);
    //Création du bouton "Hôtel & restaurants"
    const buttonHotelrestos = document.createElement("button");
    buttonHotelrestos.textContent = "Hôtels & restaurants";
    buttonHotelrestos.classList.add("btnFilter");
    sectionFilters.appendChild(buttonHotelrestos);
}