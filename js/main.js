// Récup url main de l'api
const mainUrl = "http://127.0.0.1:8000/api/v1/titles/";
const movies_max_page = 8;
const page_size = '&page_size=8';
const page_size_category = '&page_size=7';


// Récup meilleur film
function getHighestRatedMovie() {
    fetch(mainUrl + "?sort_by=-imdb_score")
    .then(res_movies => res_movies.json())
    .then(res => {
        console.log(res);
        // insertion des éléments dans le HTML
        let highest_rated = res.results[0] // premier film de la liste
        let titleHtml = document.getElementById("highest-title")
        titleHtml.innerHTML = highest_rated.title // innerHTML sert à modif
        let btn_test = document.getElementById("btn-test")
        btn_test.dataset.id = highest_rated.id // définit l'id sur le btn qui ouvre la modale (pour ce film)
        let modalImage = document.getElementById("modal-image")
        modalImage.src = highest_rated.image_url
    })
}


// Récup des films les mieux notés
function getBestMovies() {
    fetch(mainUrl + "?sort_by=-imdb_score" + page_size)
    .then(res_movies => res_movies.json())
    .then(res => {
        console.log(res);
        res.results.shift() // supprime le premier film de la liste
        // liste des 7 meilleurs films
        let bestMovies = document.getElementById("best-movies-carousel")
        for (let movie of res.results) {
            bestMovies.innerHTML += `
                <img class="d-block w-100" src="${movie.image_url}" alt="${movie.title}">
            `
        }
    })
}

// 2 += 3 = 5

// Création du carousel avec boutons et eventListeners (modifier le DOM OC)


// Récup les films de la catégorie "Action"
function getBestMoviesAction() {
    fetch(mainUrl + "?genres=action" + "?sort_by=-imdb_score" + page_size_category)
    .then(res_movies => res_movies.json())
    .then(res => {
        console.log(res);
        res.results
        let bestMoviesAction = document.getElementById("best-movies-carousel-action")
        for (let movie of res.results) {
            bestMoviesAction.innerHTML += `
                <img class="d-block w-100" src="${movie.image_url}" alt="${movie.title}">
            `
        }
    })
}


// Récup les films de la catégorie "Science-Fiction"
// Récup les films de la catégorie "Action"
function getBestMoviesSciFi() {
    fetch(mainUrl + "?genres=sci-fi" + "?sort_by=-imdb_score" + page_size_category)
    .then(res_movies => res_movies.json())
    .then(res => {
        console.log(res);
        res.results
        let bestMoviesSciFi = document.getElementById("best-movies-carousel-sci-fi")
        for (let movie of res.results) {
            bestMoviesSciFi.innerHTML += `
                <img class="d-block w-100" src="${movie.image_url}" alt="${movie.title}">
            `
        }
    })
}


// Récup les films de la catégorie "Aventure"




window.onload = () => {

    // On récupère tous les boutons d'ouverture de modale
    const modalButtons = document.querySelectorAll(".openmodal");
    
    for(let button of modalButtons){
        button.addEventListener("click", function(e){
            // On empêche la navigation
            e.preventDefault();

            // On récupère le data-target
            let target = this.dataset.target
            // On récupère les infos du film sur lequel l'user clique 
            const id = button.dataset.id
            console.log(id);
            fetch(mainUrl + id)
            .then(res_movies => res_movies.json())
            .then(res => {
                console.log(res);
                // insertion des éléments dans le HTML
                let modalTitle = document.getElementById("modal-title")
                modalTitle.innerHTML = res.title
                // continuer à prendre les éléments 
                // après la gestion d'affichage des films
            })
            

            // On récupère la bonne modale
            let modal = document.querySelector(target);
            // On affiche la modale
            modal.classList.add("show");

            // On récupère les boutons de fermeture
            const modalClose = modal.querySelectorAll("[data-dismiss=dialog]");
            
            for(let close of modalClose){
                close.addEventListener("click", () => {
                    modal.classList.remove("show");
                });
            }

            // On gère la fermeture lors du clic sur la zone grise
            modal.addEventListener("click", function(){
                this.classList.remove("show");
            });
            // On évite la propagation du clic d'un enfant à son parent
            modal.children[0].addEventListener("click", function(e){
                e.stopPropagation();
            })
        });
    }

}


//////////
// Run //
////////
function main() {
    getHighestRatedMovie()
    getBestMovies()
    getBestMoviesAction()
    getBestMoviesSciFi()
};

main();