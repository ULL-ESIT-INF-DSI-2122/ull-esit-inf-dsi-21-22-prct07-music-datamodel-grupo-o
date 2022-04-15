/* eslint-disable no-multiple-empty-lines */
/* eslint-disable indent */
/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable eol-last */
/* eslint-disable no-unused-vars */
import inquirer from 'inquirer';
// import input from '@inquirer/input';
// import { Low, JSONFile } from 'lowdb';
// import { join } from 'path';
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import {Cancion} from './cancion';
import {Playlist} from "./playlist";
import {Collection} from "./collection";
import {JsonPlaylist} from './jsonPlaylistCollection';

/**
 * Variable global que almanacena una playlist específica
 */
const myPlaylist: Playlist = new Playlist('', []);

/**
 * Enumeración de las opciones del menú para realizar sobre las canciones de una playlist
 * @enum
 */
enum Consulta {
  titulo = "Visualizar por título de la canción",
  nombre = "Visualizar por nombre del grupo/artista",
  year = "Visualizar por año de lanzamiento",
  genero = "Visualizar por género musical",
  duracion = "Visualizar por duración de la canción",
  reproducciones = "Visualizar por número de reproducciones totales"
}

/**
 * Enumeración de las opciones del menú para realizar sobre las playlists
 * @enum
 */
 enum playlistCommands {
  visualizar = "Visualizar todas las playlist",
  navegar = "Navegar una playlist",
  crear = "Crear una playlist",
  borrar = "Borrar una playlist",
  salir = "Salir del programa"
}

/**
 * Clase Gestora de la aplicación
 */
export class Gestor {
  
  private colection: JsonPlaylist;
  itemMapPlaylist: any;

  constructor() {
    this.colection = new JsonPlaylist();
  }

  visualizar():void {
    console.log(`visualizar`);
    this.colection.getPlaylistPrint();
    this.promptPlalistMenu();
  }

  async navegar():Promise<void> {
    console.clear();
    const answersNavegar = await inquirer.prompt([{
      name: 'nombre',
      type: 'input',
      message: 'Elige un playlist existente para navegar: ',
    }]);
    const answers = await inquirer.prompt({
      type: 'list',
      name: 'command',
      message: 'Elige una opción para mostrar canciones',
      choices: Object.values(Consulta),
    });
    const orden = await inquirer.prompt({
      type: 'list',
      name: 'option',
      message: 'De manera ascendente o descendente',
      choices: ['ascendente', 'descendente'],
    });
    this.getPlaylistByName(answersNavegar['nombre'], answers['command'], orden['option']);
    inquirer.prompt([
      {
        type: 'list',
        name: 'continue',
        message: 'Desea visualizar otro playlist?:',
        choices: ['Yes', 'No'],
      },
    ]).then((answers) => {
      if (answers['continue'] == 'Yes') this.navegar();
      else this.promptPlalistMenu();
    });
  }

  getPlaylistByName(nombre: string, optionCancion:string, orden:string) {
    if (this.colection.getPlaylistMap().get(nombre) !== undefined) {
      const cancionesMap = new Map<string, Cancion>();
      
      switch (optionCancion) {
        case "Visualizar por título de la canción":
          this.colection.getPlaylistMap().forEach((element) => {
            element.getCanciones().forEach((canciones) => {
              cancionesMap.set(canciones.getNombre(), canciones);
            });
          });
          const unsortArray = [...cancionesMap];
          switch (orden) {
            case "ascendente":
              unsortArray.sort();
              unsortArray.forEach((element) => {
                console.log(element);
              });
              break;
              
            case "descendente":
              unsortArray.sort().reverse();
              unsortArray.forEach((element) => {
                console.log(element);
              });
              break;
          };
          break;
  
        case "Visualizar por nombre del grupo/artista":
          this.colection.getPlaylistMap().forEach((element) => {
            element.getCanciones().forEach((cancion) => {
              cancionesMap.set(cancion.getAutor(), cancion);
            });
          });
          const unSArray = [...cancionesMap];
          switch (orden) {
            case "ascendente":
              unSArray.sort();
              unSArray.forEach((element) => {
                console.log(element);
              });
              break;
              
            case "descendente":
              unSArray.sort().reverse();
              unSArray.forEach((element) => {
                console.log(element);
              });
              break;
          };
          break;
        break;

        case "Visualizar por año de lanzamiento":
          const cancionesNumMap = new Map<number, Cancion>();
          this.colection.getPlaylistMap().forEach((element) => {
            element.getCanciones().forEach((cancion) => {
              cancionesNumMap.set(cancion.getFecha(), cancion);
            });
          });
          const playlistArray = [...cancionesNumMap];
          switch (orden) {
            case "ascendente":
              playlistArray.sort();
              playlistArray.forEach((element) => {
                console.log(element);
              });
              break;
              
            case "descendente":
              playlistArray.sort().reverse();
              playlistArray.forEach((element) => {
                console.log(element);
              });
              break;
          };
          break;
        break;

        case "Visualizar por género musical":
          this.colection.getPlaylistMap().forEach((element) => {
            element.getCanciones().forEach((cancion) => {
              cancionesMap.set(cancion.getGenero(), cancion);
            });
          });
          const playlistGeneroArray = [...cancionesMap];
          switch (orden) {
            case "ascendente":
              playlistGeneroArray.sort();
              playlistGeneroArray.forEach((element) => {
                console.log(element);
              });
              break;
              
            case "descendente":
              playlistGeneroArray.sort().reverse();
              playlistGeneroArray.forEach((element) => {
                console.log(element);
              });
              break;
          };
          break;
        break;
        
        case "Visualizar por duración de la canción":
          const cancionesNum2Map = new Map<number, Cancion>();
          this.colection.getPlaylistMap().forEach((element) => {
            element.getCanciones().forEach((cancion) => {
              cancionesNum2Map.set(cancion.getDuracion(), cancion);
            });
          });
          const playlistDuracionArray = [...cancionesNum2Map];
          switch (orden) {
            case "ascendente":
              playlistDuracionArray.sort();
              playlistDuracionArray.forEach((element) => {
                console.log(element);
              });
              break;
              
            case "descendente":
              playlistDuracionArray.sort().reverse();
              playlistDuracionArray.forEach((element) => {
                console.log(element);
              });
              break;
          };
          break;
        break;

        case "Visualizar por número de reproducciones totales":
          const cancionesNum3Map = new Map<number, Cancion>();
          this.colection.getPlaylistMap().forEach((element) => {
            element.getCanciones().forEach((cancion) => {
              cancionesNum3Map.set(cancion.getNumeroReproducciones(), cancion);
            });
          });
          const playlistReproArray = [...cancionesNum3Map];
          switch (orden) {
            case "ascendente":
              playlistReproArray.sort();
              playlistReproArray.forEach((element) => {
                console.log(element);
              });
              break;
              
            case "descendente":
              playlistReproArray.sort().reverse();
              playlistReproArray.forEach((element) => {
                console.log(element);
              });
              break;
          };
          break;
        break;
      }
    } else {
      console.log(`No existe dicho playlist`);
    }
  }

  promptPlalistMenu() {
    inquirer.prompt({
      name: 'optionPlaylist',
      type: 'list',
      message: 'Qué operacion deseas hacer con playlist',
      choices: Object.values(playlistCommands),
    }).then((answers) => {
      switch (answers['optionPlaylist']) {
        case playlistCommands.visualizar:
          console.clear();
          this.visualizar();
        break;
        case playlistCommands.navegar:
          this.navegar();
        case playlistCommands.crear:
        
        case playlistCommands.borrar:
        

      }

    });
  }

}

const a = new Gestor();
a.promptPlalistMenu();
