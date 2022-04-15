import {Album} from './album';
import {Artistas} from './artistas';
import {Cancion} from './cancion';
import {GenerosMusicales} from './generosMusical';
import {Grupos} from './grupos';
import {Playlist} from "./playlist";

/**
 * Clase Colecction de la aplicación
 */
export class Collection {
  protected itemMapAlbum = new Map<string, Album>();
  protected itemMapCancion = new Map<string, Cancion>();
  protected itemMapGrupo = new Map<string, Grupos>();
  protected itemMapGenero = new Map<string, GenerosMusicales>();
  protected itemMapArtista = new Map<string, Artistas>();
  protected itemMapPlaylist = new Map<string, Playlist>();

  /**
   * Constructor de la clase Colecction
   */
  constructor() {
    this.itemMapAlbum = new Map<string, Album>();
    this.itemMapCancion = new Map<string, Cancion>();
    this.itemMapGrupo = new Map<string, Grupos>();
    this.itemMapGenero = new Map<string, GenerosMusicales>();
    this.itemMapArtista = new Map<string, Artistas>();
    this.itemMapPlaylist = new Map<string, Playlist>();
  }

  /**
   * Método que añade un album a la coleccion
   * @param nombreAlbum Nombre del album
   * @param year Fecha de publicacion
   * @param canciones Canciones que tiene el album
   */
  addAlbum(nombreAlbum:string, year:number, cancion:string, artista:string) {
    const cancionesAlbum:Cancion[] = [];
    // canciones.forEach((cancion) => {
    cancionesAlbum.push(this.itemMapCancion.get(cancion) as Cancion);
    // });
    console.log(cancionesAlbum);
    const nuevoAlbum = new Album(nombreAlbum, year, cancionesAlbum, artista);
    this.itemMapAlbum.set(nombreAlbum, nuevoAlbum);
  }

  /**
   * Método que añade una cancion a la coleccion
   * @param nombreCancion Nombre de la canción
   * @param cantantesCancion Artistas de la canción
   * @param duracion Tiempo que dura la cancion
   * @param generos Generos musicales de la canción
   * @param single Si la canción es un single o no
   * @param numeroReproducciones Número de reproducciones total
   * @param fecha Fecha de publicación de la canción
   */
  addCancion(nombreCancion:string, cantantesCancion:string[], duracion:number,
      generos:string[], single:boolean, numeroReproducciones:number, fecha:number) {
    const nuevaCancion = new Cancion(nombreCancion, cantantesCancion, duracion,
        generos, single, numeroReproducciones, fecha);
    this.itemMapCancion.set(nombreCancion, nuevaCancion);
  }


  /**
   * Método que añade un grupo a la coleccion
   * @param nombreGrupo Nombre del grupo
   * @param artistas Artistas que pertenecen al grupo
   * @param year Año de creación del grupo
   * @param generos Generos musicales que publica el grupo
   * @param albumes Albumes publicados por el grupo
   * @param oyentes Oyentes mensuales
   */
  addGrupo(nombreGrupo:string, artistas:string[], year:number,
      generos:string[], albumes:string[], oyentes:number) {
    const artistaGrupo:Artistas[] = [];
    artistas.forEach((artista) => {
      artistaGrupo.push(this.itemMapArtista.get(artista) as Artistas);
    });

    const albumGrupo:Album[] = [];
    albumes.forEach((album) => {
      albumGrupo.push(this.itemMapAlbum.get(album) as Album);
    });

    const nuevoGrupo = new Grupos(nombreGrupo, artistaGrupo, year, generos, albumGrupo, oyentes);
    this.itemMapGrupo.set(nombreGrupo, nuevoGrupo);
  }


  /**
   * Método que añade un genero musical a la coleccion
   * @param nombreGenero Nombre del genero musical
   * @param gruposArtistas Grupos o Artistas que hacen música de ese genero
   * @param generoAlbumes Albumes que tienen ese género musical
   * @param cancionGenero Canciones que tienen ese género musical
   */
  addGenero(nombreGenero:string, gruposArtistas:string[], generoAlbumes:string[], cancionGenero:string[]) {
    const albumGenero:Album[] = [];
    generoAlbumes.forEach((album) => {
      albumGenero.push(this.itemMapAlbum.get(album) as Album);
    });

    const canciones:Cancion[] = [];
    cancionGenero.forEach((cancion) => {
      canciones.push(this.itemMapCancion.get(cancion) as Cancion);
    });

    const nuevoGenero = new GenerosMusicales(nombreGenero, gruposArtistas, albumGenero, canciones);
    this.itemMapGenero.set(nombreGenero, nuevoGenero);
  }


  /**
   * Método que añade un artista a la colección
   * @param nombreArtista Nombre del artista
   * @param generosArtista Generos musicales del artista
   * @param albumesArtista Albumes en los que aparece el artista
   * @param cancionesArtista Canciones del artista
   * @param oyentesArtista Oyentes mensuales del artista
   * @param gruposArtista Grupos en los que aparece el artista
   */
  addArtista(nombreArtista:string, generosArtista:string[],
      albumesArtista:string[], cancionesArtista:string[], oyentesArtista:number,
      gruposArtista?:string[]) {
    const albumArtista:Album[] = [];
    albumesArtista.forEach((album) => {
      albumArtista.push(this.itemMapAlbum.get(album) as Album);
    });

    const cancionArtista:Cancion[] = [];
    cancionesArtista.forEach((cancion) => {
      cancionArtista.push(this.itemMapCancion.get(cancion) as Cancion);
    });

    const grupoArtista:Grupos[] = [];
    const nuevoArtista = new Artistas(nombreArtista, generosArtista,
        albumArtista, cancionArtista, oyentesArtista, grupoArtista);
    this.itemMapArtista.set(nombreArtista, nuevoArtista);
  }

  /**
   * Método que añade una playlist a la colección
   * @param nombrePlaylist Nombre de la playlist
   * @param nombreCancion Nombre de todas las canciones de la playlist
   */
  addPlaylist(nombrePlaylist: string, nombreCancion:Cancion[]) {
    const nuevoPlaylist = new Playlist(nombrePlaylist, nombreCancion);
    this.itemMapPlaylist.set(nuevoPlaylist.getNombre(), nuevoPlaylist);
  }


  /**
   * Método que obtiene una playlist de la colección
   * @param playlistName Nombre de la playlist a buscar
   * @returns Retorna la playlist si la encontró y sino retorna undefined
   */
  getPlaylist(playlistName:string): Playlist | undefined {
    return this.itemMapPlaylist.get(playlistName);
  }

  /**
   * Método que elimina una playlist de la colección
   * @param nombrePlaylist Nombre de la playlist a eliminar
   */
  eliminarPlaylist(nombrePlaylist: string) {
    this.itemMapPlaylist.delete(nombrePlaylist);
  }

  /**
   * Método que elimina un album de la colección
   * @param nombreAlbum Nombre del album a eliminar
   */
  eliminarAlbum(nombreAlbum: string) {
    this.itemMapAlbum.delete(nombreAlbum);
  }

  /**
   * Método que elimina una canción de la colección
   * @param nombreCancion Nombre de la canción a eliminar
   */
  eliminarCancion(nombreCancion: string) {
    this.itemMapCancion.delete(nombreCancion);
  }

  /**
   * Método que elimina un genero de la colección
   * @param nombreGenero Nombre del genero a eliminar
   */
  eliminarGenero(nombreGenero: string) {
    this.itemMapGenero.delete(nombreGenero);
  }

  /**
   * Método que elimina un grupo de la colección
   * @param nombreGrupo Nombre del grupo a eliminar
   */
  eliminarGrupo(nombreGrupo: string) {
    this.itemMapGrupo.delete(nombreGrupo);
  }

  /**
   * Método que elimina un artista de la colección
   * @param nombreArtista Nombre del artista a eliminar
   */
  eliminarArtista(nombreArtista: string) {
    this.itemMapArtista.delete(nombreArtista);
  }
}
