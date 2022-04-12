import {Artistas} from './artistas';
import {Album} from './album';

/**
 * Implementación de la clase Grupos que contiene toda la información asociada a un grupo musical
 */
export class Grupos {
  constructor(private nombre: string, private artistas: Artistas[], private year: number,
    private generos: string[], private albumes: Album[], private oyentes: number) {
  }

  /**
   * Función que obtiene el nombre de un grupo
   * @returns Retorna el nombre del grupo
   */
  getNombre(): string {
    return this.nombre;
  }

  /**
   * Función que obtiene el nombre de los artistas del grupo
   * @returns Retorna todos los artistas
   */
  getArtistas(): Artistas[] {
    return this.artistas;
  }

  /**
   * Función que obtiene el año de creación del grupo
   * @returns Retorna el año de creación
   */
  getYear(): number {
    return this.year;
  }

  /**
   * Función que obtiene los géneros musicales del grupo
   * @returns Retorna todos los géneros musicales que tiene el grupo
   */
  getGeneroMusical(): string[] {
    return this.generos;
  }

  /**
   * Función que obtiene todos los albumes de un grupo
   * @returns Retorna todos los albumes
   */
  getAlbumes(): Album[] {
    return this.albumes;
  }

  /**
   * Función que obtiene el número de oyentes del grupo
   * @returns Retorna el número de oyentes
   */
  getOyentes(): number {
    return this.oyentes;
  }

  /**
   * Función que modifica el número de oyentes
   * @param numero Número nuevo de oyentes
   */
  setOyentes(numero: number): void {
    this.oyentes = numero;
  }

  /**
   * Función que añade un artista nuevo al grupo
   * @param artista Artista nuevo a añadir
   */
  addArtistas(artista: Artistas): void {
    this.artistas.push(artista);
  }

  /**
   * Función que añade un album nuevo al grupo
   * @param album Album que se quiere añadir
   */
  addAlbum(album: Album) {
    this.albumes.push(album);
  }

  /**
   * Función que añade un nuevo género musical al grupo
   * @param genero Nombre del genero a añadir
   */
  addGeneroMusical(genero: string) {
    this.generos.push(genero);
  }
}
