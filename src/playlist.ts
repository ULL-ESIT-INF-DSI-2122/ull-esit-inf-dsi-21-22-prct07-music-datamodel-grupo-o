import { Cancion } from "./cancion";
import { cancionColecction } from "./cancionColletion";
// import { GenerosMusicales } from "./generosMusical";
// import { Libreria } from "./Libreria";


/**
 * _Clase Playlist_
 */
export class Playlist {
    /**
     * _Constructor de la clase Playlist, una lista de produccion_
     * @param nombre nombre de Playlist
     * @param canciones canciones que contiene un Playlist
     */
    constructor(private nombre:string, private cancionesColeccion:Cancion[]) {
        // Nombre de la playlist.
        // Canciones incluidas dentro de la playlist.
        // Duración en horas y minutos.         //private duracion:number, 
        // Género(s) musicales que se incluyen dentro de la playlist.
    }

    /* Getters */
    /**
     * _Getter para obtener nombre de la lista_
     * @returns 
     */
    getNombre():string { return this.nombre; }

    /**
     * _Getter para obtener canciones_
     * @returns retorna canciones
     */
    getCanciones():Cancion[] { return this.cancionesColeccion; }    


    /**
     * _Getter para obtener duracion de la lista de produccion_
     * @returns tiempo en total
     */
    getDuracion():number { 

        let tiempo = 0;

        this.cancionesColeccion.forEach(element => {
            tiempo += element.getDuracion();
        });

        return tiempo;
    }    

    /**
     * _Getter para obtener generos de la lista_
     * @returns retorna un string, donde contiene todos los generos de la lista
     */
    // getGenerosMusicales():string[] {
    //     let generosPlayList!:string[];

    //     this.cancionesColeccion.forEach(element => {
    //         // element.getGeneros
    //         let genero = "";
    //         element.getGeneros().forEach(value => {
    //             console.log(`genero = ${value}`);
    //             genero = value;
    //         });
    //         generosPlayList.push(genero);
    //         console.log(`genero = ${generosPlayList}`);
    //     });
    //     const dataArr = new Set(generosPlayList);
    //     console.log(`${dataArr}`);
    //     const result = [...dataArr];

    //     console.log(`${result}`);
    //     return result;
    // }
    
    /* Setters */
    /**
     * _Setter para añadir nueva cancion_
     * @param newCancion cancion para añadir a la lista
     */
    setCanciones(newCancion:Cancion):void {
        this.cancionesColeccion.push(newCancion);
    }
}
  