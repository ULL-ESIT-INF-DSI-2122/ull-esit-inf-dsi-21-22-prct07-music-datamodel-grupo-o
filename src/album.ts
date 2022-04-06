import {Cancion} from "./cancion";

// steph
/**
 * Implementación clase álbum para almacenar todos los álbumes de la
 * Colección
 */
export class Album {
  private artista:string;
  private generos:string[] = [];
  constructor(private nombre:string,
      private year:number, private canciones:Cancion[]) {
    this.artista = canciones[0].getAutor();
  }

  /**
     * Método que retorna el nombre del álbum
     * @returns nombre del álbum
     */

  public getNombre():string {
    return this.nombre;
  }
  /**
     * Método que retorna el nombre del artista o grupo del álbum
     * @returns nombre del artista o grupo
     */

  public getArtista():string {
    return this.artista;
  }
  /**
     * Método que retorna el año de lanzamiento del álbum
     * @returns año del álbum
     */

  public getYear():number {
    return this.year;
  }
  /**
     * Método que retorna las canciones del álbum
     * @returns canciones que pertenecen al álbum
     */

  public getCanciones():Cancion[] {
    return this.canciones;
  }
  /**
     * Método que retorna los géneros de un álbum en concreto
     * @returns géneros del álbum
     */

  public getGeneros():string[] {
    return this.generos;
  }
  /**
     * Método que añade una nueva canción al array de canciones
     * del álbum
     */
  public addCancion(cancion:Cancion):void {
    this.canciones.push(cancion);
  }
  /**
     * Método que añade el/los géneros de una canción al
     * álbum
     */
  public setGeneros(cancion:Cancion):void {
    const arrayGeneros:string[] = cancion.getGeneros();
    for (let i = 0; i < arrayGeneros.length; i++) {
      if (this.generos.indexOf(arrayGeneros[i]) == -1) {
        this.generos.push(arrayGeneros[i]);
      }
    }
  }
  /**
     * Método que añade los géneros de todas las canciones
     * pertenecientes al álbum
     */
  public addGenerosAllSongs():void {
    this.generos.pop;
    for (let i = 0; i < this.canciones.length; i++) {
      this.setGeneros(this.canciones[i]);
    }
  }
}
