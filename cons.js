let autos = require("./autos");

const concesionaria = {
   autos : autos,

   buscarAuto : function(patente){
      for(let i = 0; i < this.autos.length ; i++) {
         if(patente == this.autos[i].patente){
            return autos[i];
         }
      }
      return null
   },

    venderAuto : function(patente){
        let variable = this.buscarAuto(patente);
        if(variable != null){
            variable.vendido = true;
            return variable;
        }
        console.log('No se encontró la patente.')
    },

   autosParaLaVenta : function(){
      return this.autos.filter(function(elemento){
         return elemento.vendido == false;
      })
   },

   autosNuevos : function(){
      let arrayDeAutosParaLaVenta = this.autosParaLaVenta()
      return arrayDeAutosParaLaVenta.filter(function(elemento){
         return elemento.km < 100
      })
   },
   
   listaDeVentas : function(){
      let arrayDeAutosVendidos = this.autos.filter(function(elemento){
         return elemento.vendido == true;
      })
      let arrayDePrecios = [];
      for(let i = 0; i < arrayDeAutosVendidos.length; i++){
         arrayDePrecios[i] = (arrayDeAutosVendidos[i].precio);
      }
      return arrayDePrecios;
   },


   totalDeVentas : function(){
      let arrayDePrecios = this.listaDeVentas();
      if(arrayDePrecios.length != 0){
         return arrayDePrecios.reduce(function(acumulador, elemento){
            return (acumulador + elemento);
         })

      } return 0
   },


   puedeComprar : function(patenteAuto, persona){
      let autoAConsultar = this.buscarAuto(patenteAuto);
      let montoPorCuota = autoAConsultar.precio / autoAConsultar.cuotas;

      if(persona.capacidadDePagoTotal >= autoAConsultar.precio && persona.capacidadDePagoEnCuotas >= montoPorCuota){
         return true;
      } return false;
   },



   autosQuePuedeComprar : function(persona){
      let autosParaLaVenta = this.autosParaLaVenta();
      let unArray = [];
      for(let i = 0; i < autosParaLaVenta.length; i++){
         if(this.puedeComprar(autosParaLaVenta[i].patente, persona) == true){
            unArray[i] = autosParaLaVenta[i];
         }
      }
      return unArray.filter(function(elemento){
         return elemento != null;
      });
   }

};


let juan = {
   nombre: 'Juan',
   capacidadDePagoEnCuotas: 20,
   capacidadDePagoTotal:10,
}



console.log("Listado de autos")
console.log(concesionaria.autosParaLaVenta());
console.log("Comprando el auto de la patente 'JJK116'")
console.log(concesionaria.venderAuto('JJK116'));
console.log("Autos disponibles")
console.log(concesionaria.autosParaLaVenta());