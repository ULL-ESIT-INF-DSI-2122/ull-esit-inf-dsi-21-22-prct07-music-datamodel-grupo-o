
// Andrea
/**
 * Implementación de la clase cancion para almacenar todas las canciones
 */
export class Cancion {
  constructor(private nombre:string, private cantantes:string[], private duracion:number, 
    private generos: string[], private single:boolean, private numeroReproducciones:number) {
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