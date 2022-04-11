import {Cancion} from './cancion';
import {Playlist} from './playlist';
import {Gestor} from './gestor';
import {jsonPlaylist} from './jsonPlaylistCollection';



const cancion = new Cancion('Cesde mis Ojos', ['Chris Lebron'], 1.8, ['Reggaeton', 'trap'], false, 5237187);
const cancion2 = new Cancion('Ajos', ['Lebron', 'Max'], 2.49, ['Hip'], false, 15537187);
const newPlay = new Playlist("hola", [cancion, cancion2]);
const newPlay2 = new Playlist("mundo", [cancion2]);

const cancion3 = new Cancion('Desde', ['Chris Lebron'], 2.49, ['Reggaeton'], false, 5237187);
const cancion4 = new Cancion('Prueba', ['Lebron'], 2.49, ['Hip'], false, 5237187);
const newPlay3 = new Playlist("pruebaplay3", [cancion3, cancion2]);
const newPlay4 = new Playlist("pruebaplay4", [cancion4]);

const main = async() => {
    console.log(`--MENU--`);

    const gestor = new Gestor([newPlay, newPlay2, newPlay3, newPlay4]);
    // const json = new jsonPlaylist();
    const db = new jsonPlaylist("playlist1", [newPlay, newPlay2, newPlay3, newPlay4]);
    gestor.menuUser();
    
    // Opciones..
    //gestor.borrar();
}


main();