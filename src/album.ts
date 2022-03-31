import { Libreria } from "./Libreria";
import { Cancion } from "./cancion";

export type albumDatos = {
  year:number;
  nombre:string;
  artista:string;
  canciones:Cancion[];
}
// steph
/**
 * Implementación clase álbum para almacenar todos los álbumes de la
 * Colección
 */
export class Album extends Libreria<albumDatos>{
    constructor(private items:albumDatos[]) {
      super(items);
    }
    /**
     * Función que retorna el nombre de un álbum en concreto
     * @param index (índice del álbum a buscar)
     * @returns nombre del álbum
     */
    public getNombre(index:number):string{ return this.items[index].nombre; }
        /**
     * Función que retorna el nombre del artista un álbum en concreto
     * @param index (índice del álbum a buscar)
     * @returns nombre del artista o grupo
     */
    public getArtista(index:number):string{return this.items[index].artista; }
      /**
     * Función que retorna el año de un álbum en concreto
     * @param index (índice del álbum a buscar)
     * @returns año del álbum
     */
    public getYear(index:number):number{ return this.items[index].year; }
      /**
     * Función que retorna las canciones de un álbum en concreto
     * @param index (índice del álbum a buscar)
     * @returns canciones que pertenecen al álbum
     */
    public getCanciones(index:number):Cancion[] { return this.items[index].canciones; }
      /**
     * Función que retorna los géneros de un álbum en concreto
     * @param index (índice del álbum a buscar)
     * @returns géneros del álbum
     */
    public getGeneros(index:number):string{
    let genero:string = '';
      for(let i = 0; i < this.items[index].canciones.length; i++){
        genero += this.items[index].canciones[i].getGeneros();
        if(i != this.items[index].canciones.length - 1){
          genero += ', ';
        }
      }
      return genero;        
    }
  }