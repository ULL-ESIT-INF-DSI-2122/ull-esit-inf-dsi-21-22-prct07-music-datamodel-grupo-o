/* eslint-disable no-unused-vars */
import inquirer from 'inquirer';
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
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
  addAlbum(nombreAlbum:string, year:number, canciones:string[]) {
    const cancionesAlbum:Cancion[] = [];
    canciones.forEach((cancion) => {
      cancionesAlbum.push(this.itemMapCancion.get(cancion) as Cancion);
    });

    const nuevoAlbum = new Album(nombreAlbum, year, cancionesAlbum);
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
    const artistaGenero:(Artistas|Grupos)[] = [];
    const albumGenero:Album[] = [];
    generoAlbumes.forEach((album) => {
      albumGenero.push(this.itemMapAlbum.get(album) as Album);
    });

    const canciones:Cancion[] = [];
    cancionGenero.forEach((cancion) => {
      canciones.push(this.itemMapCancion.get(cancion) as Cancion);
    });

    const nuevoGenero = new GenerosMusicales(nombreGenero, artistaGenero, albumGenero, canciones);
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
    const nuevoArtista = new Artistas(nombreArtista, generosArtista, albumArtista, cancionArtista, oyentesArtista, grupoArtista);
    this.itemMapArtista.set(nombreArtista, nuevoArtista);
  }

  /**
   * Método que añade una playlist a la colección
   * @param nombrePlaylist Nombre de la playlist
   * @param nombreCancion Nombre de todas las canciones de la playlist
   */
  addPlaylist(nombrePlaylist: string, nombreCancion:string[]) {
    const canciones:Cancion[] = [];
    nombreCancion.forEach((cancion) => {
      canciones.push(this.itemMapCancion.get(cancion) as Cancion);
    });
    const nuevoPlaylist = new Playlist(nombrePlaylist, canciones);
    this.itemMapPlaylist.set(nuevoPlaylist.getNombre(), nuevoPlaylist);
  }


  /**
   * Método que elimina un album de la colección
   * @param nombreAlbum Nombre del album a eliminar
   */
  eliminarAlbum(nombreAlbum: string) {
    this.itemMapPlaylist.delete(nombreAlbum);
  }

  /**
   * Método que elimina una canción de la colección
   * @param nombreCancion Nombre de la canción a eliminar
   */
  eliminarCancion(nombreCancion: string) {
    this.itemMapPlaylist.delete(nombreCancion);
  }

  /**
   * Método que elimina un genero de la colección
   * @param nombreGenero Nombre del genero a eliminar
   */
  eliminarGenero(nombreGenero: string) {
    this.itemMapPlaylist.delete(nombreGenero);
  }

  /**
   * Método que elimina un grupo de la colección
   * @param nombreGrupo Nombre del grupo a eliminar
   */
  eliminarGrupo(nombreGrupo: string) {
    this.itemMapPlaylist.delete(nombreGrupo);
  }

  /**
   * Método que elimina un artista de la colección
   * @param nombreArtista Nombre del artista a eliminar
   */
  eliminarArtista(nombreArtista: string) {
    this.itemMapPlaylist.delete(nombreArtista);
  }

  /**
   * Método que elimina una playlist de la colección
   * @param nombrePlaylist Nombre de la playlist a eliminar
   */
  eliminarPlaylist(nombrePlaylist: string) {
    this.itemMapPlaylist.delete(nombrePlaylist);
  }


  /**
   * Método que retorna los albumes de la colección
   * @returns Albumes de la colección
   */
  getAlbumMap(): Map<string, Album> {
    return this.itemMapAlbum;
  }

  /**
   * Método que retorna las canciones de la colección
   * @returns Canciones de la colección
   */
  getCancionMap(): Map<string, Cancion> {
    return this.itemMapCancion;
  }

  /**
   * Método que retorna los generos de la colección
   * @returns Generos de la colección
   */
  getGeneroMap(): Map<string, GenerosMusicales> {
    return this.itemMapGenero;
  }

  /**
   * Método que retorna los grupos de la colección
   * @returns Grupos de la colección
   */
  getGrupoMap(): Map<string, Grupos> {
    return this.itemMapGrupo;
  }

  /**
   * Método que retorna los artistas de la colección
   * @returns Artistas de la colección
   */
  getArtistaMap(): Map<string, Artistas> {
    return this.itemMapArtista;
  }

  /**
   * Método que retorna las playlists de la colección
   * @returns Playlists de la colección
   */
  getPlaylistMap(): Map<string, Playlist> {
    return this.itemMapPlaylist;
  }


  getAlbum(): Album[] {
    return [...this.itemMapAlbum.values()];
  }
  getCancion(): Cancion[] {
    return [...this.itemMapCancion.values()];
  }
  getGrupo(): Grupos[] {
    return [...this.itemMapGrupo.values()];
  }
  getGenero(): GenerosMusicales[] {
    return [...this.itemMapGenero.values()];
  }
  getArtista(): Artistas[] {
    return [...this.itemMapArtista.values()];
  }
  getPlaylist(): Playlist[] {
    return [...this.itemMapPlaylist.values()];
  }
}
