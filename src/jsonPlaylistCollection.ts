import {Cancion} from './cancion';
import {Playlist} from './playlist';
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import {Collection} from './collection';
import {Album} from './album';
import {GenerosMusicales} from './generosMusical';
import {Grupos} from './grupos';
import {Artistas} from './artistas';

/**
 * @type {schemaType} Tipo de datos de un array de playlists
 */
type schemaType = {
  album: Album[],
  generos: GenerosMusicales[],
  grupos: Grupos[],
  cancion: Cancion[],
  artista: Artistas[],
  playlist: Playlist[],

  // playlistJ:{
  //   nombre: string;
  //   canciones: Cancion[];
  //   duracion: number;
  //   generos: string[];
  // }[];
}

/**
 * Clase jsonPlaylist que extiende de Gestor
 */
export class jsonPlaylist extends Collection {
  private database: lowdb.LowdbSync<schemaType>;
  /**
   * Constructor de la clase
   * @param username Nombre del usuario que utiliza la aplicación
   * @param playlists Array de todas las playlists de la aplicación
   */
  constructor(public username:string, playlists: Playlist[]) {
    super();

    const low = require('lowdb');
    this.database = low(new FileSync('./src/json/Playlist.json'));

    // Comproba que si la bbdd json esta vacio
    // if (this.database.has('playlistJ').value()) {
    //   // Si ya existe el valor playlistJ, entonces lo guardamos en el map
    //   const dbItem = this.database.get('playlistJ').value();
    //   dbItem.forEach((item) =>{
    //     this.itemMap.set(item.nombre,
    //         {canciones: item.canciones, duracion: item.duracion, generos: item.generos});
    //   });
    // } else {
    //   this.database.set('playlistJ', this.playlists).write();
    //   this.playlists.forEach((ele) =>{
    //     this.itemMap.set(ele.getNombre(), {canciones: ele.getCanciones(),
    //       duracion: ele.getDuracion(), generos: ele.getGenerosMusicales()});
    //   });
    // }
  }

  addPlaylist(nombrePlaylist:string, playlist:string[]):void {
    super.addPlaylist(nombrePlaylist, playlist);
    this.store('playlist');
  }

  removeAlbumm(nombreAlbum:string):void {
    super.eliminarAlbum(nombreAlbum);
    this.store('album');
  }
  removeCancion(nombreCancion:string):void {
    super.eliminarCancion(nombreCancion);
    this.store('cancion');
  }
  removeGrupo(nombreGrupo:string):void {
    super.eliminarGrupo(nombreGrupo);
    this.store('grupo');
  }
  removeGenero(nombreGenero:string):void {
    super.eliminarGenero(nombreGenero);
    this.store('genero');
  }
  removeArtista(nombreArtista:string):void {
    super.eliminarArtista(nombreArtista);
    this.store('artista');
  }
  removePlaylist(nombrePlaylist:string):void {
    super.eliminarPlaylist(nombrePlaylist);
    this.store('playlist');
  }

  getAllPlaylist() {
    return this.database;
  }

  private store(type:string) {
    switch (type) {
      case 'album':
        this.database.set("albumnes", this.getAlbum()).write();
      case 'cancion':
      case 'grupo':
      case 'genero':
      case 'artista':
      case 'playlist':
    }
  }
}
