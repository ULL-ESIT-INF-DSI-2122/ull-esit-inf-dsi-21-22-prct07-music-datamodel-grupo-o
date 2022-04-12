import {Cancion} from "./cancion";

/**
 * _Clase Playlist_
 */
export class Playlist {
  /**
     * _Constructor de la clase Playlist, una lista de produccion_
     * @param nombre nombre de Playlist
     * @param canciones canciones que contiene un Playlist
     * @param duracion duración total de la playlist
     * @param generos generos que tiene la playlist
     */
  private duracion: number = 0;
  private generos: string[] = [];
  constructor(private nombre:string, private cancionesColeccion:Cancion[]) {
  }

  /**
   * Método que añade canciones a la playlist
   * @param newCancion Canción nueva que se quiere añadir
   */
  addCanciones(newCancion:Cancion):void {
    this.cancionesColeccion.push(newCancion);
  }

  /* Getters */
  /**
     * _Getter para obtener nombre de la lista_
     * @returns
     */
  getNombre():string {
    return this.nombre;
  }

  /**
     * _Getter para obtener canciones_
     * @returns retorna canciones
     */
  getCanciones():Cancion[] {
    return this.cancionesColeccion;
  }


  /**
     * _Getter para obtener duracion de la lista de produccion_
     * @returns tiempo en total
     */
  getDuracion():number {
    this.duracion = 0;
    this.cancionesColeccion.forEach((element) => {
      this.duracion += element.getDuracion();
    });
    return parseFloat(this.duracion.toFixed(2));
  }

  /**
     * _Getter para obtener generos de la lista_
     * @returns retorna un string, donde contiene todos los generos de la lista
     */
  getGenerosMusicales():string[] {
    this.cancionesColeccion.forEach((element) => {
      element.getGeneros().forEach((value) => {
        let genero = '';
        genero = value;
        this.generos.push(genero);
      });
    });
    const dataArr = new Set(this.generos);
    this.generos = [...dataArr];

    return this.generos;
  }
}

