/* eslint-disable no-trailing-spaces */
/* eslint-disable spaced-comment */
/* eslint-disable new-cap */
import {Cancion} from './cancion';
import {Playlist} from './playlist';
import {Gestor} from './gestor';
import {jsonPlaylist} from './jsonPlaylistCollection';
//import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
//import inquirer from 'inquirer';

const cancion = new Cancion('Cesde mis Ojos', ['Chris Lebron'], 1.8, ['Reggaeton', 'trap'], false, 5237187, 2000);
const cancion2 = new Cancion('Ajos', ['Lebron', 'Max'], 2.49, ['Hip'], false, 15537187, 2020);
const newPlay = new Playlist("hola", [cancion, cancion2]);
const newPlay2 = new Playlist("mundo", [cancion2]);

const cancion3 = new Cancion('Desde', ['Chris Lebron'], 2.49, ['Reggaeton'], false, 5237187, 2000);
const cancion4 = new Cancion('Prueba', ['Lebron'], 2.49, ['Hip'], false, 5237187, 1999);
const newPlay3 = new Playlist("pruebaplay3", [cancion3, cancion2]);
const newPlay4 = new Playlist("pruebaplay4", [cancion4]);

const main = async () => {
  console.log(`===========================Bienvenido al XNSA Music==============================`);
  console.log(`Lista de canciones dispinibles:`);
  const low = require('lowdb');
  const database = low(new FileSync('./src/json/canciones.json'));

  const show = JSON.stringify(database, null, "\t");
  console.log(show);

  const gestor = new Gestor([newPlay, newPlay2, newPlay3, newPlay4]);
  // const json = new jsonPlaylist();
  const db = new jsonPlaylist("playlist1", [newPlay, newPlay2, newPlay3, newPlay4]);
  console.log(`print db`);
  db.imprimir();
  gestor.menuUser();
  // Opciones..
  // Borrar playlist
  /*
  deletePlaylistJSON(playlistB: Playlist) {
    playlistB.forEach((element) => {
      super.borrar(element);
    });
  }*/ 
};

main();
