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
 * Clase Gestora de la aplicación
 */
export class Collection {
  protected itemMapAlbum = new Map<string, Album>();
  protected itemMapCancion = new Map<string, Cancion>();
  protected itemMapGrupo = new Map<string, Grupos>();
  protected itemMapGenero = new Map<string, GenerosMusicales>();
  protected itemMapArtista = new Map<string, Artistas>();
  protected itemMapPlaylist = new Map<string, Playlist>();

  /**
   * Constructor de la clase Gestor
   * @param playlists Array de playlists que contiene todas las playlist de la aplicación
   */
  constructor() {
    this.itemMapAlbum = new Map<string, Album>();
    this.itemMapCancion = new Map<string, Cancion>();
    this.itemMapGrupo = new Map<string, Grupos>();
    this.itemMapGenero = new Map<string, GenerosMusicales>();
    this.itemMapArtista = new Map<string, Artistas>();
    this.itemMapPlaylist = new Map<string, Playlist>();
  }
  //   private nombre:string,
  //   private year:number, private canciones:Cancion[]) {
  // this.artista = canciones[0].getAutor()
  addAlbum(nombreAlbum:string, year:number, canciones:string[]) {
    const cancionesAlbum:Cancion[] = [];
    canciones.forEach((cancion) => {
      cancionesAlbum.push(this.itemMapCancion.get(cancion) as Cancion);
    });

    const nuevoAlbum = new Album(nombreAlbum, year, cancionesAlbum);
    this.itemMapAlbum.set(nombreAlbum, nuevoAlbum);
  }


  addCancion(nombreCancion:string, cantantesCancion:string[], duracion:number,
      generos:string[], single:boolean, numeroReproducciones:number, fecha:number) {
    // const cantantes: Artistas[] = [];
    // cantantesCancion.forEach((artista) => {
    //   cantantes.push(this.itemMapArtista.get(artista) as Artistas);
    // });

    const nuevaCancion = new Cancion(nombreCancion, cantantesCancion, duracion,
        generos, single, numeroReproducciones, fecha);

    this.itemMapCancion.set(nombreCancion, nuevaCancion);
  }

  // private nombre: string, private artistas: Artistas[], private year: number,
  // private generos: string[], private albumes: Album[], private oyentes: number
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

  // private genero: string, private gruposArtistas: (Artistas | Grupos)[],
  // private generoAlbumes: Album[], private canciones: Cancion[]
  addGenero(nombreGenero:string, gruposArtistas:string[],
      generoAlbumes:string[], cancionGenero:string[]) {
    const artistaGenero:(Artistas|Grupos)[] = [];

    // cancionGenero.forEach((cancion) => {
    //   if (this.itemMapArtista.has(cancion)) {
    //     artistaGenero.push(this.itemMapArtista.get(cancion) as Artistas);
    //   } else if(this.itemMapGrupo.has(cancion)) {
    //     artistaGenero.push(this.itemMapGenero.get(cancion) as );
    //   }
    // });

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

  // private nombreArtista: string,
  // private generosArtista: string[], private albumesArtista: Album[],
  // private cancionesArtista: Cancion[], private oyentesArtista: number,
  // private gruposArtista?: Grupos[]
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
    // if(grupoArtista !== undefined) {
    //   gruposArtista.forEach((grupo) => {
    //     grupoArtista.push(this.itemMapGrupo.get(grupo) as Grupos);
    //   });
    // }

    const nuevoArtista = new Artistas(nombreArtista, generosArtista, albumArtista, cancionArtista, oyentesArtista, grupoArtista);
    this.itemMapArtista.set(nombreArtista, nuevoArtista);
  }


  addPlaylist(nombrePlaylist: string, nombreCancion:string[]) {
    const canciones:Cancion[] = [];
    nombreCancion.forEach((cancion) => {
      canciones.push(this.itemMapCancion.get(cancion) as Cancion);
    });
    const nuevoPlaylist = new Playlist(nombrePlaylist, canciones);
    this.itemMapPlaylist.set(nuevoPlaylist.getNombre(), nuevoPlaylist);
  }


  eliminarAlbum(nombreAlbum: string) {
    this.itemMapPlaylist.delete(nombreAlbum);
  }
  eliminarCancion(nombreCancion: string) {
    this.itemMapPlaylist.delete(nombreCancion);
  }
  eliminarGenero(nombreGenero: string) {
    this.itemMapPlaylist.delete(nombreGenero);
  }
  eliminarGrupo(nombreGrupo: string) {
    this.itemMapPlaylist.delete(nombreGrupo);
  }
  eliminarArtista(nombreArtista: string) {
    this.itemMapPlaylist.delete(nombreArtista);
  }
  eliminarPlaylist(nombrePlaylist: string) {
    this.itemMapPlaylist.delete(nombrePlaylist);
  }


  getAlbumMap(): Map<string, Album> {
    return this.itemMapAlbum;
  }
  getCancionMap(): Map<string, Cancion> {
    return this.itemMapCancion;
  }
  getGeneroMap(): Map<string, GenerosMusicales> {
    return this.itemMapGenero;
  }
  getGrupoMap(): Map<string, Grupos> {
    return this.itemMapGrupo;
  }
  getArtistaMap(): Map<string, Artistas> {
    return this.itemMapArtista;
  }
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
