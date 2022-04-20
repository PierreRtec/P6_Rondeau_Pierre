// Récup url main de l'api
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
                <div class="item">
                    <div class="item__image"><img src="${movie.image_url}" alt="${movie.title}"></div>
                </div>
            `
        }
    })
    .then(() => {
        new Carousel(document.querySelector("#best-movies-carousel"),{
            slidesToScroll: 1,
            slidesVisible: 4,
            loop: false,
        })
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
                <div class="item__image"><img src="${movie.image_url}" alt="${movie.title}"></div>
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
                    <div class="item__image"><img src="${movie.image_url}" alt="${movie.title}"></div>
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
                    <div class="item__image"><img src="${movie.image_url}" alt="${movie.title}"></div>
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
}



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
    getBestMoviesComedie()
    getBestMoviesSciFi()
    getBestMoviesAventure()
};

main();