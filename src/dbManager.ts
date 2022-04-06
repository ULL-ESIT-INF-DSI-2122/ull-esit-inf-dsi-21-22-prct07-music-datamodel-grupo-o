import { Album } from './album'
import {Cancion} from './cancion';
import { Playlist } from './playlist';
// import { Low, JSONFile } from 'lowdb';
// import {LowSync} from 'lowdb';
// import FileSync from 'lowdb/adapters/FileSync';
// import { join } from 'path/posix';

import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

type schemaType = {
    //canciones: Cancion[],
    userOptions: {
      albumes: Album[];
      playlist: Playlist[]
    }
}

// const file = join('../bbdd/canciones.json' ,'canciones.json');
// let adapter = new JSONFile(file);
// const db = new Low(adapter);
// db.get

const db: lowdb.LowdbSync<schemaType> = lowdb(new FileSync("song.json"));
const serializedSong = db.get("song").value();

//const mySong = Song.deserialize(serializedSong);
//console.log(mySong.getName());
//console.log(mySong.getBand().getName());

// db.get('Cancion')
//   .push({nombre: "Love", cantantes : ["Tom Odell"], duracion: 4.04, generos: ["Folk pop", "indie pop"], single: true, numeroReproducciones: 757088750
//   })
//   .write()
