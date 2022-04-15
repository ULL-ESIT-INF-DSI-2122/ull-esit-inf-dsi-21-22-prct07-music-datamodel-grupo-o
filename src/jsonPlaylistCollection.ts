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
 * Tipo de datos de un array de playlists
 * @type {schemaType}
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
    // console.log(`loadcancion`);
    this.loadCancion();

    // console.log(`loadAlbum`);
    this.loadAlbum();

    // console.log(`loadartista`);
    this.loadArtista();

    // console.log(`loadGenero`);
    this.loadGenero();

    // console.log(`loadGrupo`);
    this.loadGrupo();

    // console.log(`loadPlaylist`);
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

  /**
   * Método que retorna los playlist de la colección
   * @returns playlist de la colección
   */
  getPlaylistMap(): Map<string, Playlist> {
    return this.itemMapPlaylist;
  }

  /**
   * Método que imprime las playlists
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

  /**
   * Método que carga una canción en la base de datos
   */
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
      });
    }
  }

  /**
   * Método que carga un album en la base de datos
   */
  loadAlbum() {
    if (this.database.has('albumes').value()) {
      const dbItem = this.database.get('albumes').value();
      let aux: Album;
      let auxCanciones: Cancion[];
      dbItem.forEach((element: any) => {
        auxCanciones = [];

        element.canciones.forEach((cancion: any) => {
          auxCanciones.push(this.itemMapCancion.get(cancion.nombre) as Cancion);
        });
        // console.log(auxCanciones);

        aux = new Album(element.nombre, element.year, auxCanciones, element.artista);
        this.itemMapAlbum.set(aux.getNombre(), aux);
      });
      // console.log(this.itemMapAlbum);
    }
  }

  /**
   * Método que carga una playlist en la base de datos
   */
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
      });
    }
  }

  /**
   * Método que carga un artista en la base de datos
   */
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

        element.generosArtista.forEach((genero:any) => {
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
      });
    }
  }

  /**
   * Método que carga un genero en la base de datos
   */
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

        aux = new GenerosMusicales(element.genero, auxArtistasGeneros, auxAlbumGeneros, auxCancionesGeneros);
        this.itemMapGenero.set(aux.getGenero(), aux);
      });
    }
  }

  /**
   * Método que carga un grupo en la base de datos
   */
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
          auxAlbum.push(this.itemMapAlbum.get(album.nombre) as Album);
        });

        element.generos.forEach((genero:any) => {
          auxGeneros.push(genero);
        });

        aux = new Grupos(element.nombre, auxArtistas, element.year, auxGeneros, auxAlbum, element.oyentes);
        this.itemMapGrupo.set(aux.getNombre(), aux);
      });
    }
  }


  /**
   * Método que añade una playlist a la base de datos
   * @param nombrePlaylist Nombre de la playlist
   * @param playlist Array con todos los nombres de las canciones de la playlist
   */
  addPlaylist(nombrePlaylist:string, playlist:Cancion[]):void {
    super.addPlaylist(nombrePlaylist, playlist);
    this.store('playlist');
  }

  /**
   * Método que añade un album a la coleccion
   * @param nombreAlbum Nombre del album
   * @param year Fecha de publicacion
   * @param canciones Canciones que tiene el album
   */
  addAlbum(nombreAlbum:string, year:number, cancion:string, artista:string):void {
    super.addAlbum(nombreAlbum, year, cancion, artista);
    this.store('album');
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
    super.addCancion(nombreCancion, cantantesCancion, duracion,
        generos, single, numeroReproducciones, fecha);
    this.store('cancion');
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
  addArtista(nombreArtista: string, generosArtista: string[],
      albumesArtista: string[], cancionesArtista: string[],
      oyentesArtista: number, gruposArtista?: string[]): void {
    super.addArtista(nombreArtista, generosArtista,
        albumesArtista, cancionesArtista, oyentesArtista, gruposArtista = []);
    this.store('artista');
  }

  /**
   * Método que añade un genero musical a la coleccion
   * @param nombreGenero Nombre del genero musical
   * @param gruposArtistas Grupos o Artistas que hacen música de ese genero
   * @param generoAlbumes Albumes que tienen ese género musical
   * @param cancionGenero Canciones que tienen ese género musical
   */
  addGenero(nombreGenero: string, gruposArtistas: string[],
      generoAlbumes: string[], cancionGenero: string[]): void {
    super.addGenero(nombreGenero, gruposArtistas,
        generoAlbumes, cancionGenero);
    this.store('genero');
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
  addGrupo(nombreGrupo: string, artistas: string[], year: number,
      generos: string[], albumes: string[], oyentes: number): void {
    super.addGrupo(nombreGrupo, artistas, year,
        generos, albumes, oyentes);
    this.store('grupo');
  }

  /**
   * Método que elimina un album de la base de datos
   * @param nombreAlbum Nombre del album a eliminar
   */
  removeAlbumm(nombreAlbum:string):void {
    super.eliminarAlbum(nombreAlbum);
    // console.log(this.itemMapAlbum.values());
    console.log(`Modificar DataBase...`);
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
        this.database.set("albumes", [...this.itemMapAlbum.values()]).write();
        break;
      case 'cancion':
        this.database.set("canciones", [...this.itemMapCancion.values()]).write();
        break;
      case 'grupo':
        this.database.set("grupos", [...this.itemMapGrupo.values()]).write();
        break;
      case 'genero':
        this.database.set("generos", [...this.itemMapGenero.values()]).write();
        break;
      case 'artista':
        this.database.set("artistas", [...this.itemMapArtista.values()]).write();
        break;
      case 'playlist':
        this.database.set("playlists", [...this.itemMapPlaylist.values()]).write();
        break;
    }
  }
}
