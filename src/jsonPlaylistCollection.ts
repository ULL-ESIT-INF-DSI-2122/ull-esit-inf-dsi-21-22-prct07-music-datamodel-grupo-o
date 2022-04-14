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

  /**
   * Método que añade una playlist a la base de datos
   * @param nombrePlaylist Nombre de la playlist
   * @param playlist Array con todos los nombres de las canciones de la playlist
   */
  addPlaylist(nombrePlaylist:string, playlist:string[]):void {
    super.addPlaylist(nombrePlaylist, playlist);
    this.store('playlist');
  }

  /**
   * Método que elimina un album de la base de datos
   * @param nombreAlbum Nombre del album a eliminar
   */
  removeAlbumm(nombreAlbum:string):void {
    super.eliminarAlbum(nombreAlbum);
    this.store('album');
  }

  /**
   * Método que elimina una cancion de la base de datos
   * @param nombreCancion Nombre de la canción a eliminar
   */
  removeCancion(nombreCancion:string):void {
    super.eliminarCancion(nombreCancion);
    this.store('cancion');
  }

  /**
   * Método que elimina un grupo de la base de datos
   * @param nombreGrupo Nombre del grupo a eliminar
   */
  removeGrupo(nombreGrupo:string):void {
    super.eliminarGrupo(nombreGrupo);
    this.store('grupo');
  }

  /**
   * Método que elimina un genero de la base de datos
   * @param nombreGenero Nombre del genero a eliminar
   */
  removeGenero(nombreGenero:string):void {
    super.eliminarGenero(nombreGenero);
    this.store('genero');
  }

  /**
   * Método que elimina un artista de la base de datos
   * @param nombreArtista Nombre del artista a eliminar
   */
  removeArtista(nombreArtista:string):void {
    super.eliminarArtista(nombreArtista);
    this.store('artista');
  }

  /**
   * Método que elimina una playlist de la base de datos
   * @param nombrePlaylist Nombre de la playlist a eliminar
   */
  removePlaylist(nombrePlaylist:string):void {
    super.eliminarPlaylist(nombrePlaylist);
    this.store('playlist');
  }

  /**
   * Método que accede a todas las playlists existentes en la base de datos
   * @returns Todas las playlists existentes
   */
  getAllPlaylist() {
    return this.database;
  }

  /**
   * Método que almacena en la base de datos
   * @param type Tipo a almacenar
   */
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
