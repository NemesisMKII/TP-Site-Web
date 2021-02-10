$(document).ready(function(){
//----------------------------------------------------



//FOOTER
slide = new slider("#carroussel");
//si j'en crée une deuxieme je remet -- slide = new slider("idDuNouveauCarroussel");






//-----------------------------------------------
});

var slider= function(id){
	 var self=this
	this.divCarrou = $(id); //recup la div carroussel
	this.slider=this.divCarrou.find(".slider") //je vaus rechercher mon slider
	this.largeurCarrou= this.divCarrou.width() //recup la largeur de la div carroussel pour savoir de combien on doit decaler les photos
	this.largeur=0
	this.divCarrou.find("a").each(function(){ //fonction qui nous retourne le nbr images
		self.largeur +=$(this).width() //on incrémente de la largeur de chaque images
		//on recup aprés les écarts entre les photos aussi pour avoir toute la largeur du contenu
		self.largeur +=parseInt($(this).css("padding-left")) //parseint pour recup un entier //on recup le padding left
		self.largeur +=parseInt($(this).css("padding-right"))
		self.largeur +=parseInt($(this).css("margin-left"))
		self.largeur +=parseInt($(this).css("margin-right")) 

	})
	this.prec = this.divCarrou.find(".prec")// on va rechercher le bouton précendent
	this.suiv= this.divCarrou.find(".suiv")
	this.saut= this.largeurCarrou/2 //variable saut qui permet de deplacer les image de la moitié du carousselle //on enleve le/2 si on veux decaler tout le contenu de la div et pas que la moitié
	this.nbEtapes =Math.ceil(this.largeur/this.saut -this.largeurCarrou/this.saut) //nombre etapes, donc de click sur suivant avant datteindre le bout //on soustrait le nb étapes en trop
	//Match.ceil permet d'arrondir au nb superieur
	this.courant=0 //permet si on l'incrément de savoir ou on est(si on a deplacé x fois ver la gauche)
	
	//le comportement au click des boutons 
	this.suiv.click(function(){ //fonction qui au click de la souris sur suivant va deplacer les images
		//on creer ici une verification afin que si ya plus d'image il ne puisse plus click sur suivant
		if (self.courant<=self.nbEtapes) {
			self.courant++
			self.slider.animate({
				left:-self.courant*self.saut //on anime la position par rapport à la gauche(on va rettiré le saut vers la gauche sur le css)
			},1000)
		}
	})
	this.prec.click(function(){ //fonction qui au click de la souris sur précedent va deplacer les images
		//on creer ici une verification afin que si ya plus d'image il ne puisse plus click sur suivant
		if (self.courant>0) {
			self.courant--
			self.slider.animate({
				left:-self.courant*self.saut //on anime la position par rapport à la gauche(on va rettiré le saut vers la gauche sur le css)
			},1000)
		}
	})
}
