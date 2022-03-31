import {GenerosMusicales} from "./generosMusical";
// import { Libreria } from "./Libreria";

// Andrea
// export class Cancion extends Libreria<> {

/**
 * Implementación de la clase cancion para almacenar todas las canciones
 */
export class Cancion {
  constructor(private readonly nombre:string, private readonly autor:string, private readonly duracion:number, 
    private readonly generos:GenerosMusicales[], private readonly single:boolean, private numeroReproducciones:number) {
  }

  /**
   * Función que retorna el nombre de una canción
   * @returns Nombre de la canción
   */
  getNombre():string { 
    return this.nombre; 
  }

  /**
   * Función que retorna el nombre del autor de la canción
   * @returns Autor de la canción
   */
  getAutor():string { 
    return this.autor; 
  }
  
  /**
   * Función que retorna la duración de una canción
   * @returns Duración de la canción
   */
  getDuracion():number { 
    return this.duracion; 
  }

  /**
   * Función que obtiene los géneros de una canción
   * @returns Retorna los géneros de la canción
   */
  getGeneros(): GenerosMusicales[] { 
    return this.generos; 
  }

  /**
   * Función que indica con un Flag si la canción es un single o no
   * @returns Verdadero o falso según si la canción es un single o no
   */
  getSingle():boolean { 
    return this.single; 
  }

  /**
   * Función que calcula el número de reproducciones de una canción
   * @returns Número total de reproducciones
   */
  getNumeroReproducciones(): number { 
    return this.numeroReproducciones;
  }

  /**
   * Función que modifica el número de reproducciones de una canción
   * @param numero Número de reproducciones nuevo
   */
  setNumeroReproducciones(numero: number): void {
    this.numeroReproducciones = numero;
  }
}