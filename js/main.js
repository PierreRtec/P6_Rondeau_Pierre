// Récup url main de l'api
const mainUrl = "http://127.0.0.1:8000/api/v1/titles/";


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

// Récup de l'url du meilleur film pour obtenir ses informations
function renderBestMovie() {
    fetch(mainUrl + "?sort_by=-imdb_score")
    .then(res_movies => res_movies.json())
    .then(res => {
        console.log(res);
        // insertion des éléments dans le HTML
        let highest_rated_url = res.results[0].url // url du premier film de la liste
        fetch(highest_rated_url)
        .then(res_movies => res_movies.json())
        .then(res => {
            let movieDescription = document.getElementById("best-movie-description")
            movieDescription.innerHTML = res.description
        })
    })
}

// Récup les films les mieux notés


// Récup les films de la catégorie "Action"



// Récup les films de la catégorie "Science-Fiction"



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
    renderBestMovie()
};

main();