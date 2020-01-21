"use strict";


document.addEventListener('DOMContentLoaded', initialiserPage);

function initialiserPage() {
	
 
  let vExemple1 = new Vue(
    {
      el: '#exemple1',
	  
      data: {
		MIN_NIV_INSULTE : 1,
		MAX_NIV_INSULTE : 3,
		MIN_NB_MONSTRES : 1,
		MIN_DISTANCE : 0,
        niveauInsulte: 1,
  	    nombreMonstres: 1,
		nombreInsultes: 1,
        monstres : [
  	      { seuil: 0, distance: 0 },
  		  { seuil: 0, distance: 0 },
  		  { seuil: 0, distance: 0 }		
        ]
      },
	  
	  computed: {
		  
        pointsEnervementsBase : function () {
          return 2 ** this.niveauInsulte;
        },
		
		pointsEnervementsMonstres : function () {
          return this.monstres.map(x => 
		     Math.max(1, 
			          // Math.floor(this.pointsEnervementsBase / this.nombreMonstres) - x.distance
			          //Math.ceil((Math.floor(this.pointsEnervementsBase / this.nombreMonstres) - x.distance) * 1.25)
					  (Math.floor(this.pointsEnervementsBase / this.nombreMonstres) - x.distance) + Number(this.niveauInsulte)
					  ) 
				* this.nombreInsultes);
        },
		
		maxNbMonstres : function () {
          return this.MAX_NIV_INSULTE;
        },
		
		maxDistance : function () {
          return this.MAX_NIV_INSULTE;
        },
		
		evolutionEnervements : function () {
			
          function calculerEvolutionEnervement(seuil, enervement) {
			  let enervements = [];
			  let nouvelEnervement = enervement;
			  while (nouvelEnervement > seuil) { // à tester gameplay : >=
				  enervements.push(nouvelEnervement);
				  nouvelEnervement = Math.floor(nouvelEnervement / 1.25);
			  }
			  return enervements;
		  };
		  
		  return this.monstres.map((x, i) => calculerEvolutionEnervement(x.seuil, this.pointsEnervementsMonstres[i]));
		  
        },
		
		dureesInsultes : function () {
			return this.evolutionEnervements.map(x => (x.length > 1 ? x.length - 1 : 0));
		}
		
      },
	  
	  methods: {
	
	    changerNiveau : function () {
          if (this.niveauInsulte < this.nombreMonstres) this.nombreMonstres = this.niveauInsulte;
		  
		  for (const m of this.monstres) {
			  if (this.niveauInsulte < m.distance) m.distance = this.niveauInsulte;
		  }
        },
		
		changerNombreCibles : function () {
          if (this.niveauInsulte < this.nombreMonstres) this.niveauInsulte = this.nombreMonstres;
		  
        },
		
		changerDistance : function () {
		  const distanceMax = Math.max(...this.monstres.map(x => x.distance));
          if (this.niveauInsulte < distanceMax) this.niveauInsulte = distanceMax;
        }
		   
	  }
    }
  );
}
