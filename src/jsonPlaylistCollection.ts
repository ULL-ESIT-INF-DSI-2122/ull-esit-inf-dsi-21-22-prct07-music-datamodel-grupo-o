/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-multi-spaces */
/* eslint-disable indent */
/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
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
export class JsonPlaylist extends Collection {
  private database: lowdb.LowdbSync<schemaType>;
  /**
   * Constructor de la clase
   * @param username Nombre del usuario que utiliza la aplicación
   * @param playlists Array de todas las playlists de la aplicación
   */
  constructor() {
    super();
    const low = require('lowdb');
    this.database = low(new FileSync('./src/json/jsonDatabase.json'));
    this.loadCancion();
    this.loadAlbum();
    this.loadArtista();
    this.loadGenero();
    this.loadGrupo();
    this.loadPlaylist();
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

  getPlaylistMap(): Map<string, Playlist> {
    return this.itemMapPlaylist;
  }

  /**
   * Método que retorna los albumes de la colección
   * @returns Albumes de la colección
   */
  getPlaylistPrint(): void {
    this.itemMapPlaylist.forEach((playlist: Playlist) => {
      console.log(
        `>> nombre: ` + playlist.getNombre(),
        `\n>> duracion: ` + playlist.getDuracion(),
        `\n>> generos: ` + playlist.getGenerosMusicales(),
        `\n>> canciones: `,
        );
        playlist.getCanciones().forEach((cancion: Cancion) => {
          console.log(`\t-` + cancion.getNombre());
        });
        process.stdout.write("\n");
    });
  }

  loadCancion() {
    if (this.database.has('canciones').value()) {
      const dbItem = this.database.get('canciones').value();
      let aux: Cancion;
      let cantantesDb: string[];
      let generosDb: string[];
      dbItem.forEach((element: any, index:number) => {
        cantantesDb = [];
        generosDb = [];
        element.cantantes.forEach((element:string) => {
          cantantesDb.push(element);
        });
        
        element.generos.forEach((element:string) => {
          generosDb.push(element);
        });

        aux = new Cancion(
          element.nombre as string, 
          cantantesDb, 
          element.duracion as number,
          generosDb, 
          element.single as boolean, 
          element.numeroReproducciones as number, 
          element.fecha as number);

        this.itemMapCancion.set(aux.getNombre(), aux);
        // console.log(this.itemMapCancion);
      });
    } else {
      this.database.set('canciones', []).write();
    }
  }


  loadAlbum() {
    if (this.database.has('albumes').value()) {
      const dbItem = this.database.get('albumes').value();
      let aux: Album;
      let auxCanciones: Cancion[];
      dbItem.forEach((element: any) => {
        // console.log(element.canciones);
        auxCanciones = [];
        element.canciones.forEach((cancion:any) => {
          auxCanciones.push(this.itemMapCancion.get(cancion) as Cancion);
        });

        aux = new Album(element.nombre, element.year, auxCanciones, element.artista);
        this.itemMapAlbum.set(aux.getNombre(), aux);   
        // console.log(this.itemMapAlbum);
      });
    } else {
      this.database.set('albumes', []).write();
    }
  }


  loadPlaylist() {
    if (this.database.has('playlists').value()) {
      const dbItem = this.database.get('playlists').value();
      let aux: Playlist;
      let auxCanciones: Cancion[];
      dbItem.forEach((element: any) => {
        auxCanciones = [];

        element.cancionesColeccion.forEach((playlist:any) => {
          auxCanciones.push(this.itemMapCancion.get(playlist.nombre) as Cancion);
        });

        aux = new Playlist(element.nombre, auxCanciones);
        this.itemMapPlaylist.set(aux.getNombre(), aux);      
        // console.log(this.itemMapPlaylist);
      });
    } else {
      this.database.set('playlists', []).write();
    }
  }


  loadArtista() {
    if (this.database.has('artistas').value()) {
      const dbItem = this.database.get('artistas').value();
      let aux: Artistas;
      let auxCanciones: Cancion[];
      let auxGeneros: string[];
      let auxAlbumes: Album[];

      dbItem.forEach((element: any) => {
        auxCanciones = [];
        auxAlbumes = [];
        auxGeneros = [];
        
        element.generosArtistas.forEach((genero:any) => {
          auxGeneros.push(genero as string);
        });

        element.cancionesArtista.forEach((artista:any) => {
          auxCanciones.push(this.itemMapCancion.get(artista) as Cancion);
        });
        
        element.albumesArtista.forEach((album:any) => {
          auxAlbumes.push(this.itemMapAlbum.get(album) as Album);
        });

        aux = new Artistas(element.nombre, auxGeneros, auxAlbumes, auxCanciones, element.oyentesArtista);
        this.itemMapArtista.set(aux.getNombreArtista(), aux);        
        // console.log(this.itemMapArtista);
      });
    } else {
      this.database.set('artistas', []).write();
    }
  }


  loadGenero() {
    if (this.database.has('generos').value()) {
      const dbItem = this.database.get('generos').value();
      let aux: GenerosMusicales;
      let auxCancionesGeneros: Cancion[];
      let auxAlbumGeneros: Album[];
      let auxArtistasGeneros: string[];
      dbItem.forEach((element: any) => {
        auxCancionesGeneros = [];
        auxAlbumGeneros = [];
        auxArtistasGeneros = [];

        element.canciones.forEach((cancion:any) => {
          auxCancionesGeneros.push(this.itemMapCancion.get(cancion) as Cancion);
        });
        
        element.generoAlbumes.forEach((album:any) => {
          auxAlbumGeneros.push(this.itemMapAlbum.get(album) as Album);
        });
        
        element.gruposArtistas.forEach((item:any) => {
          auxArtistasGeneros.push(item as string);
        });

        // console.log(auxAlbumGeneros);

        aux = new GenerosMusicales(element.genero, auxArtistasGeneros, auxAlbumGeneros, auxCancionesGeneros);
        this.itemMapGenero.set(aux.getGenero(), aux);
        // console.log(this.itemMapGenero);
      });
    } else {
      this.database.set('generos', []).write();
    }
  }


  loadGrupo() {
    if (this.database.has('grupos').value()) {
      const dbItem = this.database.get('grupos').value();
      let aux: Grupos;
      let auxArtistas: Artistas[];
      let auxGeneros: string[];
      let auxAlbum: Album[];
      
      dbItem.forEach((element: any) => {
        auxArtistas = [];
        auxGeneros = [];
        auxAlbum = [];

        element.albumnes.forEach((album:any) => {
          auxAlbum.push(this.itemMapAlbum.get(album) as Album);
        });
        // console.log(auxAlbum);

        element.generos.forEach((genero:any) => {
          auxGeneros.push(genero);
        });
        aux = new Grupos(element.nombre, auxArtistas, element.year, auxGeneros, auxAlbum, element.oyentes);
        this.itemMapGrupo.set(aux.getNombre(), aux);
        // console.log(this.itemMapGrupo);
      });
    } else {
      this.database.set('grupos', []).write();
    }
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
   * Método que almacena en la base de datos
   * @param type Tipo a almacenar
   */
  private store(type:string) {
    switch (type) {
      case 'album':
        // this.database.set("albumnes", this.getAlbum()).write();
      case 'cancion':
      case 'grupo':
      case 'genero':
      case 'artista':
      case 'playlist':
    }
  }
}


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
