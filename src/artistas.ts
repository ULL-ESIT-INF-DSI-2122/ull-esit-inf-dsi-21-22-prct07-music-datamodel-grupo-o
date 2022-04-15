import {Album} from "./album";
import {Cancion} from "./cancion";
import {Grupos} from "./grupos";

/**
 * Clase Artista para identificar artistas que forman parte de grupos y además tienen carreras en solitario o que están en varios grupos.
 */
export class Artistas {
  /**
     * Constructor con los siguientes parámetros
     * @param nombreArtista Nombre del artista
     * @param gruposArtista Grupos a los que pertenece (opcional)
     * @param generosArtista Género(s) músicales relacionados
     * @param albumesArtista Álbumes en los que ha participado
     * @param cancionesArtista Canciones publicadas
     * @param oyentesArtista Cantidad de oyentes mensuales
     */
  constructor(private nombreArtista: string,
        private generosArtista: string[], private albumesArtista: Album[],
        private cancionesArtista: Cancion[], private oyentesArtista: number,
        private gruposArtista?: Grupos[]) {}

  /**
     * Método que devuelve el nombre de un artista
     * @returns nombre artista
     */
  getNombreArtista(): string {
    return this.nombreArtista;
  }

  /**
     * Método que devuelve los grupos a los que pertenece un artista
     * @returns grupos a los que pertenece un artista o undefined si no pertenece a ninguno
     */
  getGruposArtista(): Grupos[] | undefined {
    return this.gruposArtista;
  }

  /**
     * Método que devuelve los géneros relacionados con un artista
     * @returns géneros relacionados
     */
  getGenerosArtista(): string[] {
    return this.generosArtista;
  }


  /**
   * Método que añade un género relacionado con un artistas
   * @param newGenero Genero que se quiere añadir
   */
  setGenerosArtista(newGenero: string): void {
    this.generosArtista.push(newGenero);
  }

  /**
     * Método que devuelve los albumes en los que ha participado un artista
     * @returns albumes en los que ha participado
     */
  getAlbumesArtista(): Album[] {
    return this.albumesArtista;
  }

  /**
     * Método que devuelve las canciones de un artista
     * @returns canciones de un artista
     */
  getCancionesArtista(): Cancion[] {
    return this.cancionesArtista;
  }

  /**
     * Método que devuelve los oyentes mensuales de un artista
     * @returns oyentes mensuales
     */
  getOyentesArtista(): number {
    return this.oyentesArtista;
  }

  /**
     * Método que calcula los oyentes mensuales de un artista
     * tanto de su trabajo individual como de ssu trabajo en grupo si es que lo han hecho
     */
  calcularOyentes():number {
    let oyentesMensuales = 0;
    if (this.gruposArtista) {
      for (let i = 0; i < this.gruposArtista.length; i++) {
        oyentesMensuales += this.gruposArtista[i].getOyentes();
      }
    }
    for (let i = 0; i < this.cancionesArtista.length; i++) {
      oyentesMensuales += this.cancionesArtista[i].getNumeroReproducciones();
    }
    oyentesMensuales /= 12;
    return parseFloat(oyentesMensuales.toFixed(2));
  }
}
