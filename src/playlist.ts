import {Cancion} from "./cancion";

/**
 * @type {playlistType} Tipo de dato de una playlist
 */
export type playlistType = {
  name: string;
  canciones: Cancion[];
  duracion: number;
  generos: string[];
}

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
    this.getDuracion();
    this.getGenerosMusicales();
  }

  /**
   * Método que imprime por pantalla los datos de una playlist
   */
  printInformacion():void {
    console.log(`Nombre de Playlist: ` + this.nombre, `Canciones: ` + this.cancionesColeccion,
        `Duracion:` + this.getDuracion(), `Generos` + this.getGenerosMusicales());
  }
  /**
   * Método que añade canciones a la playlist
   * @param newCancion Canción nueva que se quiere añadir
   */
  addCanciones(newCancion:Cancion):void {
    this.cancionesColeccion.push(newCancion);
  }

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
    return this.duracion;
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

