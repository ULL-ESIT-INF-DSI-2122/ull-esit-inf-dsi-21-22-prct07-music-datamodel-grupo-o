import {Artista} from './artistas';
import {GenerosMusicales} from './generosMusical';
import {Album} from './album';

// Andrea
/**
 * Implementación de la clase Grupos que contiene toda la información asociada a un grupo musical
 */
export class Grupos {
  constructor(private readonly nombre: string, private readonly artistas: Artista[], private readonly year: number,
    private readonly generos: GenerosMusicales[], private readonly albumes: Album[], private oyentes: number) {
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
  getArtistas(): Artista[] {
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
  getGeneroMusical(): GenerosMusicales[] {
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
}