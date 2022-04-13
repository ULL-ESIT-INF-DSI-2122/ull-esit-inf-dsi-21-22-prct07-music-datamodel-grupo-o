/* eslint-disable indent */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
import inquirer from 'inquirer';
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
// import {PlaylistCollection} from './gestor';
// import {Cancion} from './cancion';
// import {Playlist} from './playlist';

enum appComandos {
  album = 'Operacion con albumes',
  cancion = 'Operacion con canciones',
  genero = 'Operacion con generos',
  grupo = 'Operacion con grupos',
  artista = 'Operacion con artistas',
  playlist = 'Operacion con playlists',
  salir = 'Salir del programa'
}

enum operacionComandos {
  visualiza = 'Visualizar',
  añadir = 'Añadir',
  borrar = 'Borrar',
  modificar = 'Modificar'
}

/**
 * Clase Gestora de la aplicación
 */
export class App {
  private low = require('lowdb');
  private database = this.low(new FileSync('./src/json/jsonDatabase.json')); 
  constructor() {
  }
  
  userMenu():void {
    console.log(`===========================Bienvenido al XNSA Music==============================`);
    console.clear();
    inquirer.prompt(
        {
          name: 'option',
          type: 'list',
          message: 'Que Operacion quieres hacer:',
          choices: Object.values(appComandos),
        }).then((answers) => {
      switch (answers['option']) {
        case appComandos.album:
          this.operacion('alumnes');
          break;
        case appComandos.cancion:
          this.operacion('canciones');
          break;
        case appComandos.genero:
          this.operacion('generos');
          break;
        case appComandos.grupo:
          this.operacion('grupos');
          break;
        case appComandos.artista:
          this.operacion('artistas');
          break;
        case appComandos.playlist:
          this.operacion('playlist');
          break;
        case appComandos.salir:
          console.log('Thank you for using our application');
          return;
        }
      });
    }

  // Para hacer operacion con géneros, canciones, álbumes, grupos y artistas.
  operacion(option: string):void {
    console.clear();
    console.log(`opcion + ` + option);
    inquirer.prompt({
      name: 'operacion',
      type: 'list',
      message: 'Que operacion quieres hacer con' + option,
      choices: Object.values(operacionComandos),
    }).then((answers) => {
      console.log(answers['operacion'] + ` ` + option);
      switch (answers['operacion']) {
        case operacionComandos.visualiza:
          // Visualizar 
          switch (option) {
            case 'alumnes':
              console.log(JSON.stringify(this.database.get('albumes').values(), null, "\t"));
              break;

            case 'canciones':
              console.log(JSON.stringify(this.database.get('canciones').values(), null, "\t"));
              break;

            case 'generos':
              console.log(JSON.stringify(this.database.get('generos').values(), null, "\t"));
              break;

            case 'grupos':
              console.log(JSON.stringify(this.database.get('grupos').values(), null, "\t"));
              break;

            case 'artista':
              console.log(JSON.stringify(this.database.get('artista').values(), null, "\t"));
              break;

            case 'playlist':
              console.log(JSON.stringify(this.database.get('playlist').values(), null, "\t"));
              break;
            }

            // this.userMenu();
        case operacionComandos.añadir:
          switch (option) {
            case 'alumnes':
              this.addAlbum();
              break;

            case 'canciones':
              this.addAlbum();
              break;

            case 'generos':
              this.addAlbum();
              break;

            case 'grupos':
              this.addAlbum();
              break;

            case 'playlist':
              this.addAlbum();
              break;
            
          }
      }
    });
  }
  addAlbum():void {
    console.clear();
    console.log(`=================Proceso de añadir un album==================`);
    inquirer.prompt([
      {
      type: 'input',
      name: 'nombreAlbum',
      message: 'Nombre de album:',
      }, {
      type: 'input',
      name: 'artistaAlbum',
      message: 'Artista de album:',
      }, {
      type: 'input',
      name: 'generosAlbum',
      message: 'generos de Album:',
      }, {
      type: 'input',
      name: 'fechaAlbum',
      message: 'Fecha de album:',
      }, {
      type: 'input',
      name: 'cancionesAlbum',
      message: 'Canciones de album que tiene:',
      },
    ]).then((answers) => {
      // Falta la comprobacion
      console.log(`mi nuevo album se llama +` + answers['nombreAlbum']);
      console.log('Successfully created album');
      inquirer.prompt([{
        type: 'list',
        name: 'continue',
        message: 'Quieres agregar otro album:',
        choices: ['Yes', 'No'],
      }]).then((answers) => {
        if (answers['continue'] == 'Yes') this.addAlbum();
        else this.userMenu();
      });
    });
  }

}

const app = new App();
app.userMenu();
