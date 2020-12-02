class VueProfil {
  constructor() {
    this.html = document.getElementById("html-vue-profil").innerHTML;
    this.actionDeconnecter = null;
    this.actionMettreAJourInformationPersonnelle = null;
    this.actionMettreAJourGenreAime = null;
    this.listeGenreDonnee = null;
  }

  // Initialise la liste des genres
  initialiserListeGenre(listeGenreDonnee) {
    this.listeGenreDonnee = listeGenreDonnee;
    }

  // Initialise la fonction actionMettreAJourInformationPersonnelle
  initialiserActionMettreAJourInformationPersonnelle(actionMettreAJourInformationPersonnelle) {
    this.actionMettreAJourInformationPersonnelle = actionMettreAJourInformationPersonnelle;
  }

  // Initialise la fonction actionMettreAJourGenreAime
  initialiserActionMettreAJourGenreAime(actionMettreAJourGenreAime) {
    this.actionMettreAJourGenreAime = actionMettreAJourGenreAime;
  }

  // Initialise la fonction actionDeconnecter
  initialiserActionDeconnecter(actionDeconnecter) {
    this.actionDeconnecter = actionDeconnecter;
  }

  // Gère l'affichage de la vue
  afficher() {
    console.log("VueProfil->afficher()");
    document.getElementsByTagName("contenu")[0].innerHTML = this.html;
    document.getElementById("deconnexion").addEventListener("click",
    evenement => this.deconnecter(evenement));

    // Ecouteur du formulaire des informations personnelles
    document.getElementById("formulaire-information-personnelle").addEventListener("submit",
    evenement => this.mettreAJourInformationPersonnelle(evenement));

    // Ecouteur du formulaire des genres aimés
    document.getElementById("formulaire-genre-aime").addEventListener("submit",
    evenement => this.mettreAJourGenreAime(evenement));

    // Affichage dynamique du pseudo
    document.getElementById("pseudo").value = firebase.auth().currentUser.displayName;

    // Affichage dynamique de l'adresse email
    document.getElementById("email").value = firebase.auth().currentUser.email;

    // Affichage dynamique des genres
    let formulaireGenre = document.getElementById("genre");
    const formulaireGenreItemHtml = formulaireGenre.innerHTML;
    let formulaireGenreHtmlRemplacement = "";
    for(var genre in this.listeGenreDonnee) {
      let formulaireGenreItemHtmlRemplacement = formulaireGenreItemHtml;
      formulaireGenreItemHtmlRemplacement =
        formulaireGenreItemHtmlRemplacement.replace("{Genre.id}",
        this.listeGenreDonnee[genre].id)
      formulaireGenreItemHtmlRemplacement =
        formulaireGenreItemHtmlRemplacement.replace("{Genre.id}",
        this.listeGenreDonnee[genre].id)
      formulaireGenreItemHtmlRemplacement =
        formulaireGenreItemHtmlRemplacement.replace("{Genre.id}",
        this.listeGenreDonnee[genre].id)
      formulaireGenreItemHtmlRemplacement =
          formulaireGenreItemHtmlRemplacement.replace("{Genre.id}",
          this.listeGenreDonnee[genre].id)
      formulaireGenreItemHtmlRemplacement =
        formulaireGenreItemHtmlRemplacement.replace("{Genre.nom}",
        this.listeGenreDonnee[genre].nom)
     formulaireGenreHtmlRemplacement += formulaireGenreItemHtmlRemplacement;
    }
    formulaireGenre.innerHTML = formulaireGenreHtmlRemplacement;
  }

  async mettreAJourInformationPersonnelle(evenement) {
    console.log("VueProfil->mettreAJourInformationPersonnelle()");
    evenement.preventDefault();

    var idUtilisateur = firebase.auth().currentUser.uid;
    // Récupérer les valeurs des champs
    var pseudo = document.getElementById("pseudo").value;
    var email = document.getElementById("email").value;
    var motDePasseActuel = document.getElementById("mot-de-passe-actuel").value;
    var nouveauMotDePasse = document.getElementById("nouveau-mot-de-passe").value;
    // Effectuer la mise à jour des informations personnelles
    var resultat = await this.actionMettreAJourInformationPersonnelle(idUtilisateur,
      pseudo, email, motDePasseActuel, nouveauMotDePasse);
    if(resultat != "true") {
      choixAlerte(resultat);
    }
  }

  async mettreAJourGenreAime(evenement) {
    console.log("VueProfil->mettreAJourGenreAime()");
    evenement.preventDefault();
    
    var idUtilisateur = firebase.auth().currentUser.uid;
    // Récupérer les champs cochés
    var listeGenreAime = []
    for(var index in this.listeGenreDonnee) {
      let checkbox = document.getElementById(this.listeGenreDonnee[index].id);
      if(checkbox.checked) {
            listeGenreAime.push(this.listeGenreDonnee[index].id);
      }
    }
    // Enregistrer les genres aimés
    var resultat = await this.actionMettreAJourGenreAime(idUtilisateur, listeGenreAime);
    if(resultat != "true") {
      choixAlerte(resultat);
    }
  }

  deconnecter(evenement) {
    console.log("VueProfil->deconnecter()");
    evenement.preventDefault();
    this.actionDeconnecter();
  }
}
