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

  constructor() {
    this.colection = new JsonPlaylist();
  }

  visualizar():void {
    console.log(`visualizar`);
    console.log(this.colection.getAllPlaylist());
    if (this.nextPromt()) {
      this.promptPlalistMenu();
    }
  }
  
  promptPlalistMenu() {
    console.clear();

    inquirer.prompt({
      name: 'optionPlaylist',
      type: 'list',
      message: 'Qué operacion deseas hacer con playlist',
      choices: Object.values(playlistCommands),
    }).then((answers) => {
      switch (answers['optionPlaylist']) {
        case playlistCommands.visualizar:
          this.visualizar();
        break;
        case playlistCommands.navegar:
        
        case playlistCommands.crear:
        
        case playlistCommands.borrar:
        

      }

    });
  }

  nextPromt(): boolean {
    let option: boolean = false;
    inquirer.prompt([
      {
        type: 'list',
        name: 'continue',
        message: 'Desea hacer otra operacion canciones?:',
        choices: ['Yes', 'No'],
      },
    ]).then((answers) => {
      if (answers['continue'] == 'Yes') option = true;
      else option = false;
    });
    return option;
  }
}

const a = new Gestor();
a.promptPlalistMenu();
