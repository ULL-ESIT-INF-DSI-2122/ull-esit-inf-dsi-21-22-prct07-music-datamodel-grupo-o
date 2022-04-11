import {Cancion} from './cancion';
import {Playlist} from './playlist';
import {Gestor} from './gestor';

// import { Low, JSONFile } from 'lowdb';
// import {LowSync} from 'lowdb';
// import FileSync from 'lowdb/adapters/FileSync';
// import { join } from 'path/posix';

import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

type schemaType = {
  playlistJson:{
    nombre: string;
    canciones: Cancion[];
    duracion: number;
    generos: string[];
  }[];
};

type schemaType2 = {
  playlistJ: {
    nombre: string;
    canciones: Cancion[];
    // Playlist: Playlist;
    duracion: number;
    generos: string[];
  }[]
};

export class jsonPlaylist extends Gestor {
  private database: lowdb.LowdbSync<schemaType2>;
  private playlistMap = new Map<string, Playlist>();

  constructor(public username:string, playlists: Playlist[]) {
    super(playlists);

    const low = require('lowdb');
    // const FileSync = require('lowdb/adapters/FileSync');
    this.database = low(new FileSync('./src/json/Playlist.json'));
    // Comproba que si json esta vacio
    if (this.database.has('playlistJ').value()) {
      console.log(`check`);
      const dbItems = this.database.get('playlistJ').value();

      this.playlists.forEach((item) =>{
        console.log(`${item.getDuracion()}`);
        item.getDuracion();
      });

      dbItems.forEach((item) => {
        // console.log(`${(item)}`);

        this.playlistMap.set(
            item.nombre,
            new Playlist(item.nombre, item.canciones))});
    } else {
      // Si no está vacio, escribe directamente.
      this.database.set('playlistJ', playlists).write();
      playlists.forEach((item) => this.playlistMap.set(item.getNombre(), item));
    }

    // db.defaults().write();

    // this.database = lowdb(adapter);
    // this.database.defaults({
    //   userOptions: {
    //     albumes: [],
    //     playlist: [],
    //   },
    // }).write();
  }


  // exportData(playlists: Playlist[]) {
  //   const dbcanciones = playlists.forEach((item) => {
  //     item.getCanciones();
  //   });
  //   const dbgeneros = playlists.forEach((item) => {
  //     item.getGenerosMusicales();
  //   });

  //   const dbPlaylist: schemaType = [{nombre: '', canciones: dbcanciones, duracion: 0, generos: dbgeneros}];
  //   playlists.forEach((playlist) => {
  //     const nombre: string = playlist.getNombre();
  //     const canciones: Cancion[] = [];
  //     playlist.getCanciones().forEach((cancion) => {
  //       canciones.push(cancion);
  //     });
  //     const duracion: number = playlist.getDuracion();
  //     const generos: string[] = [];
  //     playlist.getGenerosMusicales().forEach((genero) => {
  //       generos.push(genero);
  //     });

  //     dbPlaylist.playlistJson.push({
  //       nombre: nombre,
  //       canciones: canciones,
  //       duracion: duracion,
  //       generos: generos,
  //     });
  //   });
  //   this.database.set('Playlists', dbPlaylist).write();
  // }
}

// const file = join('../bbdd/canciones.json' ,'canciones.json');
// let adapter = new JSONFile(file);
// const db = new Low(adapter);
// db.get

// const db: lowdb.LowdbSync<schemaType> = lowdb(new FileSync("song.json"));
// const serializedSong = db.get("song").value();

// const mySong = Cancion.deserialize(serializedSong);
// console.log(mySong.getName());
// console.log(mySong.getBand().getName());

// db.get('Cancion')
//   .push({nombre: "Love", cantantes : ["Tom Odell"], duracion: 4.04, generos: ["Folk pop", "indie pop"], single: true, numeroReproducciones: 757088750
//   })
//   .write()


const cancion = new Cancion('Cesde mis Ojos', ['Chris Lebron'], 1.8, ['Reggaeton', 'trap'], false, 5237187); // pensar cómo agregar las canciones
const cancion2 = new Cancion('Ajos', ['Lebron', 'Max'], 2.49, ['Hip'], false, 15537187); // pensar cómo agregar las canciones
const newPlay1 = new Playlist("hola", [cancion, cancion2]); // se crea una playlist pero luego hay que agregarla a la base de datos con algún método
const newPlay2 = new Playlist("pruebaplay4", [cancion]);

const newPlay = [newPlay1, newPlay2];
// eslint-disable-next-line new-cap
const db = new jsonPlaylist("playlist1", newPlay);
// console.log(db);
