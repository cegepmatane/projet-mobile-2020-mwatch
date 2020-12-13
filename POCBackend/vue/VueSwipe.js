class VueSwipe {
    constructor() {
        this.html = document.getElementById("html-vue-swipe").innerHTML;
        /** Film à swiper */
        this.filmASwiper = null;
        // Fonctions prêtées par le controleur
        this.actionGererSwipe = null;
        this.actionObtenirFilmASwiper = null;
    }

    /** Initialise la fonction actionObtenirFilmASwiper */
    initialiserActionObtenirFilmASwiper(actionObtenirFilmASwiper) {
        this.actionObtenirFilmASwiper = actionObtenirFilmASwiper;
    }

    /** Initialise la fonction actionGererSwipe */
    initialiserActionGererSwipe(actionGererSwipe) {
        this.actionGererSwipe = actionGererSwipe;
    }

    /** Gère l'affichage de la vue */
    async afficher() {
        console.log("VueSwipe->afficher()");
        document.getElementsByTagName("contenu")[0].innerHTML = this.html;

        await this.afficherFilmASwiper();

        // Ajout d'un écouteur pour chaque bouton de la vue
        let listeBouton = document.getElementsByTagName("button");
        for (let i=0; i<listeBouton.length; i++) {
            let valeurBouton = listeBouton[i].value;
            listeBouton[i].addEventListener("click",
                evenement => this.gererSwipe(evenement, valeurBouton));
        }
    }

    /** Affiche un film à swiper */
    async afficherFilmASwiper() {
        console.log("VueSwipe->afficherFilmASwiper()");
        // Récupérer le film à swiper
        this.filmASwiper = await this.actionObtenirFilmASwiper();
        // Affichage de l'affiche
        document.getElementById("affiche").src = this.filmASwiper.affiche;
        // Affichage des détails du film
        let detailsFilmHtml = document.getElementById("detailsFilm").innerHTML;
        detailsFilmHtml = detailsFilmHtml.replace("{Film.titre}", this.filmASwiper.titre);
        detailsFilmHtml = detailsFilmHtml.replace("{Film.annee}", this.filmASwiper.annee);
        detailsFilmHtml = detailsFilmHtml.replace("{Film.description}", this.filmASwiper.description);
        document.getElementById("detailsFilm").innerHTML = detailsFilmHtml;

        document.getElementById("detailsFilm").style.display = "none";

        document.getElementById("affiche").addEventListener("click",
            evenement => this.afficherDetailsFilm(evenement));
    }

    afficherDetailsFilm(evenement) {
        console.log("VueSwipe->afficherDetailsFilm");
        evenement.preventDefault();

        let style = window.getComputedStyle(document.getElementById("detailsFilm")).display;
        if (style === "none") {
            document.getElementById("detailsFilm").style.display = "block";
        } else {
            document.getElementById("detailsFilm").style.display = "none";
        }
    }

    async gererSwipe(evenement, reponse) {
        console.log("VueSwipe->gererSwipe");
        evenement.preventDefault();
        let resultat = await this.actionGererSwipe(this.filmASwiper, reponse);
        if (resultat !== "true") {
            choixAlerte(resultat);
        } else {
            await this.afficherFilmASwiper();
        }
    }
}