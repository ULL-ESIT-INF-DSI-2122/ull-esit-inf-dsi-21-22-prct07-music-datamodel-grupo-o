import {Album} from "./album";
import {Artistas} from "./artistas";
import {Cancion} from "./cancion";
// import { Libreria } from "./Libreria";

// Noe
export class GenerosMusicales {
  /**
     * Constructor
     * @param genero Nombre del género
     * @param gruposArtistas Grupos y/o artistas producen música de ese género
     * @param generoAlbumes Álbumes que hay dentro de la biblioteca relacionados con este género
     * @param canciones Canciones que hay dentro de la biblioteca de ese género
     */
  constructor(private genero: string, private gruposArtistas: Artistas[],
        private generoAlbumes: Album[], private canciones: Cancion[] ) {}

  /**
     * Método que devuelve el nombre del género
     * @returns genero
     */
  getGenero(): string {
    return this.genero;
  }

  /**
     * Método que devuelve los grupos y/o artistas que producen música de ese género
     * @returns grupos y/o artistas
     */
  getGruposArtistas(): Artistas[] {
    return this.gruposArtistas;
  }

  /**
     * Método que devuelve los albumes que pertenecen a ese género
     * @returns albumes pertenecientes a ese género
     */
  getGeneroAlbumes(): Album[] {
    return this.generoAlbumes;
  }

  /**
     * Método que devuelve las canciones que pertenecen a ese género
     * @returns canciones pertenecientes a ese género
     */
  getGeneroCanciones(): Cancion[] {
    return this.canciones;
  }
}
