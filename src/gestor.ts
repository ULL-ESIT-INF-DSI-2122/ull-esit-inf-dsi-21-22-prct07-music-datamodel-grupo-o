/* eslint-disable no-unused-vars */
import inquirer from 'inquirer';
import {Cancion} from './cancion';
import {JsonPlaylist} from './jsonPlaylistCollection';


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
  salir = "Salir operaciones avanzadas de playlist"
}

/**
 * Clase Gestora de la aplicación
 */
export class Gestor {
  [x: string]: any;
  private colection: JsonPlaylist;

  /**
     * Constructor de la clase Gestor
     * Inicializa con un objeto JsonPlaylist
     */
  constructor() {
    this.colection = new JsonPlaylist();
  }

  /**
   * Método que visualiza todas las playlists
   */
  visualizar():void {
    console.log(`============================Visualizar Playlist===========================`);
    this.colection.getPlaylistPrint();
    this.promptPlalistMenu();
  }

  /**
   * Método que navega una playlist y visualiza de segun distintos tipos
   */
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

  /**
   * Método que muestra una playlist segun su nombre
   * @param nombre nombre de playlist que visualiza
   * @param optionCancion segun cancion
   * @param orden orden ascendente y descendente
   */
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
      }
    } else {
      console.log(`No existe dicho playlist`);
    }
  }

  /**
   * Método que añade un playlist a la colecion y la base de datos
   */
  async addPlaylist() {
    console.clear();
    console.log(`===========================Proceso de añadir Playlit============================`);
    process.stdout.write("Los playlists son los siguiente:\n");
    this.colection.getPlaylistPrint();
    process.stdout.write("Recomendacion: NO creas un playlist con el mismo nombre.\n");

    const answerAdd = await inquirer.prompt([
      {
        name: 'addPlaylist',
        type: 'input',
        message: 'Introduzca el nombre de playlist que desea crear:',
      },
    ]);
    if (this.colection.getPlaylistMap().get(answerAdd['addPlaylist']) == undefined) {
      const choise:string[] = [];
      this.colection.getCancionMap().forEach((cancion) => {
        choise.push(cancion.getNombre());
      });
      choise.sort();
      let ask:boolean = true;
      const cancionesAdd:Cancion[] = [];
      while (ask) {
        const addPlaylistCancion = await inquirer.prompt([{
          name: 'cancion',
          type: 'list',
          message: 'Que canciones quieres agregar:',
          choices: choise,
        }]);
        cancionesAdd.push(this.colection.getCancionMap().get(addPlaylistCancion['cancion']) as Cancion);

        console.log(`Cancion [${addPlaylistCancion['cancion']}] añadida. \n`);
        const stopOption = await inquirer.prompt([{
          name: 'decicion',
          type: 'list',
          message: 'Deseas agregar más?',
          choices: ['Yes', 'No'],
        }]);
        if (stopOption['decicion'] == 'No') {
          cancionesAdd.forEach((cancion) => {
            cancion.getDuracion();
          });
          this.colection.addPlaylist(answerAdd['addPlaylist'], cancionesAdd);
          this.colection.getPlaylistPrint();
          ask = false;
        }
      }
      const otherAddPlaylist = await inquirer.prompt([{
        name: 'decicion',
        type: 'list',
        message: 'Deseas agregar otro playlist nuevo?',
        choices: ['Yes', 'No'],
      }]);
      if (otherAddPlaylist['list'] == 'Yes') this.addPlaylist();
      else this.promptPlalistMenu();
    } else {
      console.log(`No puede crear un playlist con el mismo nombre`);
      inquirer.prompt([
        {
          type: 'list',
          name: 'continue',
          message: 'Desea volver a crear un nuevo playlist?:',
          choices: ['Yes', 'No'],
        },
      ]).then((answers) => {
        if (answers['continue'] == 'Yes') this.addPlaylist();
        else this.promptPlalistMenu();
      });
    }
  }

  /**
   * Método que elimina una playlist a la colecion y la base de datos
   */
  async borrarPlaylist() {
    console.clear();
    console.log(`===========================Proceso de eliminar Playlit============================`);
    process.stdout.write("Los playlists son los siguiente:\n");
    this.colection.getPlaylistPrint();
    process.stdout.write("Recomendacion: Eliges un playlist existente para borrar\n");

    const answerDetele = await inquirer.prompt([
      {
        name: 'deletePlaylist',
        type: 'input',
        message: 'Introduzca el nombre de playlist que desea borrar:',
      },
    ]);
    if (this.colection.getPlaylistMap().get(answerDetele['deletePlaylist']) !== undefined) {
      this.colection.removePlaylist(answerDetele['deletePlaylist']);
      this.colection.getPlaylistPrint();
      inquirer.prompt([
        {
          type: 'list',
          name: 'continue',
          message: 'Desea borrar otro playlist?:',
          choices: ['Yes', 'No'],
        },
      ]).then((answers) => {
        if (answers['continue'] == 'Yes') this.borrarPlaylist();
        else this.promptPlalistMenu();
      });
    } else {
      console.log(`Operacion denegada, No existe playlist llamado [${answerDetele['deletePlaylist']}]`);
      inquirer.prompt([
        {
          type: 'list',
          name: 'continue',
          message: 'Desea volver a borrar un playlist?:',
          choices: ['Yes', 'No'],
        },
      ]).then((answers) => {
        if (answers['continue'] == 'Yes') this.borrarPlaylist();
        else this.promptPlalistMenu();
      });
    }
  }

  /**
   * Método principal de la clase Gestor que inicializa operaciones avanzadas de playlists
   */
  promptPlalistMenu():void {
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
          break;

        case playlistCommands.crear:
          this.addPlaylist();
          break;

        case playlistCommands.borrar:
          this.borrarPlaylist();
          break;

        case playlistCommands.salir:
          break;
      }
    });
  }
}
