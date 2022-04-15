
/**
 * Tipo de datos que definen a una canción
 * @type {cancionType}
 */
export type cancionType = {
  name: string;
  cantantes: string[];
  duracion: number;
  generos: string[];
  single: boolean;
  numeroReproduccion: number;
}

/**
 * Implementación de la clase cancion para almacenar todas las canciones
 */
export class Cancion {
  /**
   * Constructor de la clase Cancion
   * @param nombre Nombre de la cancion
   * @param cantantes Array de cadenas con los cantantes de la canción
   * @param duracion Duracion de la cancion
   * @param generos Array de cadenas con los generos de la cancion
   * @param numeroReproducciones Nº de reproducciones de la cancion
   * @param fecha Año de lanzamiento de la cancion
   */
  constructor(private nombre:string, private cantantes:string[], private duracion:number,
    private generos: string[], private single:boolean, private numeroReproducciones:number, private fecha: number) {
  }

  /**
   * Función que retorna el nombre de una canción
   * @returns Nombre de la canción
   */
  getNombre():string {
    return this.nombre;
  }

  /**
   * Función que retorna todos los cantantes de la canción
   * @returns Cantantes de la canción
   */
  getCantantes(): string[] {
    return this.cantantes;
  }

  /**
   * Función que retorna el autor (dueño de la canción) de la canción
   * @returns Autor de la canción
   */
  getAutor(): string {
    return this.cantantes[0];
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
  getGeneros(): string[] {
    return this.generos;
  }

  /**
   * Función que retorna el genero principal de la canción
   * @returns Genero principal de la canción
   */
  getGenero(): string {
    return this.generos[0];
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
   * Función que devuelve el año de lanazamiento de una canción
   */
  getFecha(): number {
    return this.fecha;
  }

  /**
   * Función que modifica el número de reproducciones de una canción
   * @param numero Número de reproducciones nuevo
   */
  setNumeroReproducciones(numero: number): void {
    this.numeroReproducciones = numero;
  }
}
