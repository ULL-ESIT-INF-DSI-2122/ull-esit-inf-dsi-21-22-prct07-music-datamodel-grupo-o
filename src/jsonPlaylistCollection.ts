import {Cancion} from './cancion';
import {Playlist} from './playlist';
import {Gestor} from './gestor';
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';


type schemaType = {
  playlistJ:{
    nombre: string;
    canciones: Cancion[];
    duracion: number;
    generos: string[];
  }[];
}

export class jsonPlaylist extends Gestor {
  // Crear base de datos
  private database: lowdb.LowdbSync<schemaType>;

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
    this.database.set("playlist", [...this.itemMap.values()]).write();
  }

  // const low = require('lowdb');
  // const FileSync = require('lowdb/adapters/FileSync');
  // const adapter = new FileSync('./src/json/Playlist.json');
  // const db = low(adapter);
  // console.log(`adapter`);
  // db.defaults({
  //   nombre: ' ',
  //   canciones: [],
  //   duracion: 0,
  //   generos: [],
  // }).write();

  // this.playlists.forEach((element) => {
  //   // Comproba que si json esta vacio
  //   if (db !== null) {
  //     console.log(`--------------------------------` + `${element.getNombre()}`);
  //     db.set('nombre', element.getNombre()).write();
  //     db.set('canciones', element.getCanciones()).write();
  //     db.set('duracion', element.getDuracion()).write();
  //     db.set('geneneros', element.getGenerosMusicales());
  //     const dbitem = db.get('nombre').value();
  //     console.log(`es ` + dbitem);
  //     db.set(dbitem);
  //     // const item = db.get('nombre').value();
  //     // console.log(`zheli + ${item}`);
  //   } else {
  //   }
  // });
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


// const cancion = new Cancion('Cesde mis Ojos', ['Chris Lebron'], 1.8, ['Reggaeton', 'trap'], false, 5237187); // pensar cómo agregar las canciones
// const cancion2 = new Cancion('Ajos', ['Lebron', 'Max'], 2.49, ['Hip'], false, 15537187); // pensar cómo agregar las canciones
// const newPlay1 = new Playlist("hola", [cancion, cancion2]); // se crea una playlist pero luego hay que agregarla a la base de datos con algún método
// const newPlay2 = new Playlist("pruebaplay4", [cancion]);

// const newPlay = [newPlay1, newPlay2];
// // eslint-disable-next-line new-cap
// const db = new jsonPlaylist("playlist1", newPlay);
// // console.log(db);
// db.borrar();
// console.log(JSON.stringify(db));