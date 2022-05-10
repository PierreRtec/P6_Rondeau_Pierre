// Définition des constantes
const mainUrl = "http://127.0.0.1:8000/api/v1/titles/";
const movies_max_page = 8;
const page_size = '&page_size=8';
const page_size_category = '&page_size=7';
const sci_fi = "?genre=Sci-Fi";
const comedie = "?genre=Comedy";
const imdb_score =  "&sort_by=-imdb_score";
const aventure = "?genre=Adventure";
const category_url = "http://127.0.0.1:8000/api/v1/genres/"
 
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
        let btn_test = document.getElementById("btn-play")
        btn_test.dataset.id = highest_rated.id // définit l'id sur le btn qui ouvre la modale (pour ce film)
        let modalImage = document.getElementById("modal-image")
        modalImage.src = highest_rated.image_url
        let highest_rated_url = res.results[0].url // url du premier film de la liste
        fetch(highest_rated_url)
        .then(res_movies => res_movies.json())
        .then(res => {
            let movieDescription = document.getElementById("best-movie-description")
            movieDescription.innerHTML = res.description
        })
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
                <div class="item">
                <div class="item__image"><img src="${movie.image_url}" alt="${movie.title}"
                    data-target="#modal" class="openmodal" data-id="${movie.id}"></div>
                </div>
            `
        }
    })
    // création du carousel grâce à la classe carousel.js
    .then(() => {
        new Carousel(document.querySelector("#best-movies-carousel"),{
            slidesToScroll: 1,
            slidesVisible: 4,
            loop: true,
        })
    })
    .then(() => {
        modales()
    })
}

// Récup les films de la catégorie "Comédie"
function getBestMoviesComedie() {
    fetch(mainUrl + comedie + imdb_score + page_size)
    .then(res_movies => res_movies.json())
    .then(res => {
        console.log(res);
        res.results.shift();
        let bestMoviesComedy = document.getElementById("best-movies-carousel-comedy")
        for (let movie of res.results) {
            bestMoviesComedy.innerHTML += `
                <div class="item">
                <div class="item__image"><img src="${movie.image_url}" alt="${movie.title}"
                    data-target="#modal" data-id="${movie.id}" class="openmodal"></div>
                </div>
            `
        }
    })
    .then(() => {
        new Carousel(document.querySelector("#best-movies-carousel-comedy"),{
            slidesToScroll: 1,
            slidesVisible: 4,
            loop: false,
        })
    })
    .then(() => {
        modales()
    })
}


// Récup les films de la catégorie "Science-Fiction"
function getBestMoviesSciFi() {
    fetch(mainUrl + sci_fi + imdb_score + page_size_category)
    .then(res_movies => res_movies.json())
    .then(res => {
        console.log(res);
        res.results
        let bestMoviesSciFi = document.getElementById("best-movies-carousel-sci-fi")
        for (let movie of res.results) {
            bestMoviesSciFi.innerHTML += `
                <div class="item">
                <div class="item__image"><img src="${movie.image_url}" alt="${movie.title}"
                    data-target="#modal" data-id="${movie.id}" class="openmodal"></div>
                </div>
            `
        }
    })
    .then(() => {
        new Carousel(document.querySelector("#best-movies-carousel-sci-fi"),{
            slidesToScroll: 1,
            slidesVisible: 4,
            loop: false,
        })
    })
    .then(() => {
        modales()
    })
}


// Récup les films de la catégorie "Aventure"
function getBestMoviesAventure() {
    fetch(mainUrl + aventure + imdb_score + page_size_category)
    .then(res_movies => res_movies.json())
    .then(res => {
        console.log(res);
        res.results
        let bestMoviesAdventure = document.getElementById("best-movies-carousel-aventure")
        for (let movie of res.results) {
            bestMoviesAdventure.innerHTML += `
                <div class="item">
                <div class="item__image"><img src="${movie.image_url}" alt="${movie.title}"
                    data-target="#modal" data-id="${movie.id}" class="openmodal"></div>
                </div>
            `
        }
    })
    .then(() => {
        new Carousel(document.querySelector("#best-movies-carousel-aventure"),{
            slidesToScroll: 1,
            slidesVisible: 4,
            loop: false,
        })
    })
    .then(() => {
        modales()
    })
}



// Gestion des modales générale
async function modales() {
    // On récupère tous les boutons d'ouverture de modale
    const modalButtons = document.querySelectorAll(".openmodal");
    // On récupère la modale
    for(let button of modalButtons){
        button.addEventListener("click", function(e){
            // On empêche la navigation
            e.preventDefault();
            // On récupère le data-target
            let target = this.dataset.target
            // On récupère les infos du film sur lequel l'user clique 
            const id = button.dataset.id
            fetch(mainUrl + id)
            .then(res_movies => res_movies.json())
            .then(res => {
                console.log(res);
                // Image du film
                let modalImg = document.getElementById("modal-img")
                modalImg.src = res.image_url
                // Titre du film
                let modalTitle = document.getElementById("modal-title")
                modalTitle.innerHTML = res.title
                // Le genre complet du film
                let modalGenres = document.getElementById("modal-genres")
                modalGenres.innerHTML = `
                    <div class="t-genres-container">Catégorie(s)&ensp;:&emsp;
                        <div id="t-genres">${res.genres.join(', ')}&ensp;</div>
                    </div>
                `
                // Sa date de sortie
                let modalYear = document.getElementById("modal-year")
                modalYear.innerHTML = `
                    <div class="t-year-container">Année&ensp;:&emsp;
                        <div id="t-year">${res.year}&ensp;</div>
                    </div>
                `
                // Son Rated
                let modalRated = document.getElementById("modal-rated")
                if (res.rated != 'Not rated or unkown rating' && res.rated != 'Unrated') {
                    modalRated.innerHTML = `
                    <div class="t-rated-container">Classement&ensp;:&emsp;
                        <div id="t-rated">${res.rated}&ensp;</div>
                    </div>
                    `
                }
                else {
                    modalRated.innerHTML = `
                        <div class="t-rated-container">Classement&ensp;:&emsp;
                            <div id="t-rated">Inconnu&ensp;</div>
                        </div>
                    `  
                }
                // Son score Imdb
                let modalImdbScore = document.getElementById("modal-imdb-score")
                modalImdbScore.innerHTML = `
                    <div class="t-imdb-score-container">imdb_score&ensp;:&emsp;
                        <div id="t-imdb-score">${res.imdb_score}/10&ensp;</div>
                    </div>
                `
                // Son réalisateur
                let modalDirectors = document.getElementById("modal-directors")
                if(res.directors != 'Unknown') {
                    modalDirectors.innerHTML = `
                    <div class="t-directors-container">Directeurs&ensp;:&emsp;
                        <div id="t-directors">${res.directors.join(', ')}&ensp;</div>
                    </div>
                `
                }
                else {
                    modalRated.innerHTML = `
                        <div class="t-directors-container">Directeurs&ensp;:&emsp;
                            <div id="t-directors">Inconnus&ensp;</div>
                        </div>
                    `
                }
                // La liste des acteurs
                let modalActors = document.getElementById("modal-actors")
                modalActors.innerHTML = `
                <div class="t-actors-container">Distribution&emsp;:</div>
                <div id="t-actors">&ensp;${res.actors.join(', ')}&ensp;</div>
                `
                // Sa durée
                let modalDuration = document.getElementById("modal-duration")
                modalDuration.innerHTML = `
                    <div class="t-duration-container">Durée&ensp;:&emsp;
                        <div id="t-duration">${res.duration}&ensp;minutes</div>
                    </div>
                `
                // Le pays d’origine
                let modalCountries = document.getElementById("modal-countries")
                modalCountries.innerHTML = `
                    <div class="t-countries-container">Pays d’origine&ensp;:&emsp;
                        <div id="t-countries">${res.countries.join(', ')}</div>
                    </div>
                `
                // Le résultat au Box Office
                let modalWorldwidegrossincome = document.getElementById("modal-worldwide-gross-income")
                if(res.worldwide_gross_income != null || res.worldwide_gross_income != 'N/A') {
                    modalWorldwidegrossincome.innerHTML = `
                        <div class="t-modal-wwgi-container">Box Office&ensp;:&emsp;
                            <div id="t-wwgi">${res.worldwide_gross_income}&ensp;entrées</div>
                        </div>
                    `
                }
                if (res.worldwide_gross_income === null || res.worldwide_gross_income != 'null') {
                    modalWorldwidegrossincome.innerHTML = `
                        <div class="t-modal-wwgi-container">Box Office&ensp;:&emsp;
                            <div id="t-wwgi">Nombre d'entrées inconnu</div>
                        </div>
                    `
                }
                else {
                    modalRated.innerHTML = `
                        <div class="t-modal-wwgi-container">Box office&ensp;:&emsp;
                            <div id="t-wwgi">Nombre d'entrées inconnu</div>
                        </div>
                    `
                }
                // La description longue du film
                let modalLongDescription = document.getElementById("modal-long-description")
                modalLongDescription.innerHTML = `
                    <div id="t-description">Description du film&ensp;:<br></div>
                    <div id="modal-t-description">${res.long_description}</div>
                `
            })

            // On récupère la bonne modale
            let modal = document.querySelector(target);
            // On affiche la modale
            modal.classList.add("show");
            overflowHidden();

            // On ferme la modale sur la zone out
            modal.addEventListener("click", function(){
                this.classList.remove("show");
                overflowAuto();
            })
            if (modal.addEventListener("click", function(){
                this.classList.remove("show");
                overflowAuto();
            }));

            // On récupère les boutons de fermeture
            const modalClose = modal.querySelectorAll("[data-dismiss=dialog]");
            // On ferme la modale sur les boutons de fermeture
            for(let close of modalClose){
                close.addEventListener("click", () => {
                    modal.classList.remove("show");
                    overflowAuto();
                });
            }

            // On gère la fermeture lors du clic sur la zone grise
            modal.addEventListener("click", function(){
                this.classList.remove("show");
                overflowAuto();
            });
            // On évite la propagation du clic d'un enfant à son parent
            modal.children[0].addEventListener("click", function(e){
                e.stopPropagation();
            })
        });
    }
}

/**
 * Fonctions qui permettent de gérer l'overflow de la page
 * overflowAuto
 * overflowHidden
 */
async function overflowAuto() {
    document.querySelector("html").style.overflowY = "auto";
}

async function overflowHidden() {
    document.querySelector("html").style.overflowY = "hidden";
}

/* Fonction bouton retour haut page  */
(function() {
    'use strict';
    // On récupère le scroll
    function trackScroll() {
        // on stock la valeur du scroll de la page dans une var
        var scrolled = window.pageYOffset;
        // on stock la valeur de la hauteur de la page dans une var
        var coords = document.documentElement.clientHeight;
        // si le scroll est supérieur à la hauteur de la page
        if (scrolled > coords) {
            goTopBtn.classList.add('back_to_top-show');
        }
        // l'inverse
        if (scrolled < coords) {
            goTopBtn.classList.remove('back_to_top-show');
        }
    }
    // retourne en haut de la page
    function backToTop() {
        if (window.pageYOffset > 0) {
            window.scrollBy(0, -80);
            setTimeout(backToTop, 0);
        }
    }
    // on récupère le bouton
    var goTopBtn = document.querySelector('.back_to_top');
    // on ajoute un écouteur d'évènement au scroll
    window.addEventListener('scroll', trackScroll);
    // on ajoute un écouteur d'évènement au clic sur le bouton
    goTopBtn.addEventListener('click', backToTop);
  })();
  /* fin de la fonction bout haut de page  */


//////////
// Run //
////////
function main() {
    getHighestRatedMovie()
    getBestMovies()
    getBestMoviesComedie()
    getBestMoviesSciFi()
    getBestMoviesAventure()
    modales()
};

main();