import { Libreria } from "./Libreria";
import { Cancion } from "./cancion";

// steph
export class Album extends Libreria {
    constructor(private nombre:string, private artista:string,
      private year:number, private canciones:Cancion) {
        super();
        this.nombre = nombre;
        this.artista = artista;
    }
    // Nombre del álbum.
    // Nombre del grupo o artista que lo publica.
    // Año de publicación.
    // Género(s) musicales con los que está relacionado.
    // Canciones.
  }