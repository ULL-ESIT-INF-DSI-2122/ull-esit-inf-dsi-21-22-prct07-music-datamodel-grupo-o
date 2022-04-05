import {Cancion} from "./cancion";
import {Gestor} from "./gestor";
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
  private duracion: number = 0;
  private generos: string[] = [];
  constructor(private nombre:string, private cancionesColeccion:Cancion[]) {
    // Nombre de la playlist.
    // Canciones incluidas dentro de la playlist.
    // Duración en horas y minutos.         //private duracion:number,
    // Género(s) musicales que se incluyen dentro de la playlist.
  }

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
      let genero = '';
      element.getGeneros().forEach((value) => {
        genero = value;
      });
      this.generos.push(genero);
    });
    const dataArr = new Set(this.generos);
    this.generos = [...dataArr];

    return this.generos;
  }

  /* Setters */
  /**
     * _Setter para añadir nueva cancion_
     * @param newCancion cancion para añadir a la lista
     */
  setCanciones(newCancion:Cancion):void {
    this.cancionesColeccion.push(newCancion);
  }
}

