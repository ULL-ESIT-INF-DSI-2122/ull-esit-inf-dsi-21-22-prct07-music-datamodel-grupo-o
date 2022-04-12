import {Cancion} from './cancion';
import {Playlist} from './playlist';
import {Gestor} from './gestor';
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

/**
 * @type {schemaType} Tipo de datos de un array de playlists
 */
type schemaType = {
  playlistJ:{
    nombre: string;
    canciones: Cancion[];
    duracion: number;
    generos: string[];
  }[];
}

/**
 * Clase jsonPlaylist que extiende de Gestor
 */
export class jsonPlaylist extends Gestor {
  private database: lowdb.LowdbSync<schemaType>;
  /**
   * Constructor de la clase
   * @param username Nombre del usuario que utiliza la aplicación
   * @param playlists Array de todas las playlists de la aplicación
   */
  constructor(public username:string, playlists: Playlist[]) {
    super(playlists);

    const low = require('lowdb');
    this.database = low(new FileSync('./src/json/Playlist.json'));

    // Comproba que si la bbdd json esta vacio
    if (this.database.has('playlistJ').value()) {
      // Si ya existe el valor playlistJ, entonces lo guardamos en el map
      const dbItem = this.database.get('playlistJ').value();
      dbItem.forEach((item) =>{
        this.itemMap.set(item.nombre,
            {canciones: item.canciones, duracion: item.duracion, generos: item.generos});
      });
    } else {
      this.database.set('playlistJ', this.playlists).write();
      this.playlists.forEach((ele) =>{
        this.itemMap.set(ele.getNombre(), {canciones: ele.getCanciones(),
          duracion: ele.getDuracion(), generos: ele.getGenerosMusicales()});
      });
    }
  }

  addPlaylist():void {
    super.crear();
    this.storePlaylist();
  }

  removePlaylist():void {
    console.log(`entrando`);
    super.borrar();
    this.storePlaylist();
  }

  getAllPlaylist() {
    return this.database;
  }

  private storePlaylist() {
    this.database.set("playlistJ", [...this.itemMap.values()]).write();
  }
}
