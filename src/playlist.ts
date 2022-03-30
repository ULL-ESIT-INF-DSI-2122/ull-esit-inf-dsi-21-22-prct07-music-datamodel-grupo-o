import { Cancion } from "./cancion";
import { GenerosMusicales } from "./generosMusical";
// import { Libreria } from "./Libreria";

// XUE
// export class Playlist extends Libreria<playlist> {
export class Playlist {
    constructor(private nombre:string, private canciones:Cancion [] ) {
        // super();

        // Nombre de la playlist.
        // Canciones incluidas dentro de la playlist.
        // Duración en horas y minutos.         //private duracion:number, 
        // Género(s) musicales que se incluyen dentro de la playlist.
        this.nombre = nombre;
        this.canciones = canciones;
        // this.duracion = duracion;
        // this.generos = generos;     //private generos:GenerosMusicales
    }

    getNombre():string { return this.nombre }

    getCanciones():Cancion[] { return this.canciones; }    

    getDuracion():number { 

        let tiempo = 0;

        this.canciones.forEach(element => {
            tiempo += element.getDuracion();
        });

        return tiempo;
    }    

    getGenerosMusicales():string[] {
        let generosPlayList!:string[];
        // let data = [1,2,6,1,2,5,9,'33','33'];

        // const dataArr = new Set(data);
    
        // let result = [...dataArr];
        this.canciones.forEach(element => {
            let genero = "";
            element.getGeneros().forEach(function(item) {
                genero = item;
            });
            generosPlayList.push(genero);
        });
         
        const dataArr = new Set(generosPlayList);

        const result = [...dataArr];

        return result;
    }
    
}
  