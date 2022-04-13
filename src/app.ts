/* eslint-disable indent */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
import inquirer from 'inquirer';
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import {PlaylistCollection} from './gestor';
// import {PlaylistCollection} from './gestor';
// import {Cancion} from './cancion';
// import {Playlist} from './playlist';

enum appComandos {
  album = 'Operacion con albumes',
  cancion = 'Operacion con canciones',
  genero = 'Operacion con generos',
  grupo = 'Operacion con grupos',
  artista = 'Operacion con artistas',
  playlist = 'Operacion especial con playlists',
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
          this.operacion('albumes');
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
          // this.operacion('playlist');
          const playlistOperacion = new PlaylistCollection([]);
          playlistOperacion.menuUser();
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
      message: 'Que operacion quieres hacer con ' + option,
      choices: Object.values(operacionComandos),
    }).then((answers) => {
      console.log(answers['operacion'] + ` ` + option);
      switch (answers['operacion']) {
        case operacionComandos.visualiza:
          // Visualizar 
          switch (option) {
            case 'albumes':
              console.log(`visualizar albumes`);
              console.log(JSON.stringify(this.database.get('albumes').values(), null, "\t"));
              inquirer.prompt([
                {
                  type: 'list',
                  name: 'continue',
                  message: 'Desea hacer otra operacion albumes?:',
                  choices: ['Yes', 'No'],
                },
              ]).then((answers) => {
                if (answers['continue'] == 'Yes') this.operacion('albumes');
                else this.userMenu();
              });
              break;
              
            case 'canciones':
              console.log(JSON.stringify(this.database.get('canciones').values(), null, "\t"));
              inquirer.prompt([
                {
                  type: 'list',
                  name: 'continue',
                  message: 'Desea hacer otra operacion canciones?:',
                  choices: ['Yes', 'No'],
                },
              ]).then((answers) => {
                if (answers['continue'] == 'Yes') this.operacion('canciones');
                else this.userMenu();
              });
              break;
              
            case 'generos':
              console.log(JSON.stringify(this.database.get('generos').values(), null, "\t"));
              inquirer.prompt([
                {
                  type: 'list',
                  name: 'continue',
                  message: 'Desea hacer otra operacion generos?:',
                  choices: ['Yes', 'No'],
                },
              ]).then((answers) => {
                if (answers['continue'] == 'Yes') this.operacion('generos');
                else this.userMenu();
              });
            break;

            case 'grupos':
              console.log(JSON.stringify(this.database.get('grupos').values(), null, "\t"));
              inquirer.prompt([
                {
                  type: 'list',
                  name: 'continue',
                  message: 'Desea hacer otra operacion grupos?:',
                  choices: ['Yes', 'No'],
                },
              ]).then((answers) => {
                if (answers['continue'] == 'Yes') this.operacion('grupos');
                else this.userMenu();
              });
              break;

            case 'artista':
              console.log(JSON.stringify(this.database.get('artista').values(), null, "\t"));
              inquirer.prompt([
                {
                  type: 'list',
                  name: 'continue',
                  message: 'Desea hacer otra operacion artistas?:',
                  choices: ['Yes', 'No'],
                },
              ]).then((answers) => {
                if (answers['continue'] == 'Yes') this.operacion('artista');
                else this.userMenu();
              });
              break;

            case 'playlist':
              console.log(JSON.stringify(this.database.get('playlist').values(), null, "\t"));
              break;
            }
        break;

        case operacionComandos.añadir:
          switch (option) {
            case 'albumes':
              this.addAlbum();
              break;

            case 'canciones':
              this.addCancion();
              break;

            case 'generos':
              this.addGenero();
              break;

            case 'grupos':
              this.addGrupo();
              break;

            case 'artistas':
              this.addArtista();
              break;
          }
        break;

        case operacionComandos.borrar:
          switch (option) {
            case 'albumes':
              console.log(`Modificar albumes`);
              this.borrarAlbum();
              break;
            case 'canciones':
              console.log(`Modificar canciones`);
              this.borrarCancion();
              break;
            case 'generos':
              console.log(`Modificar generos`);
              this.borrarGenero();
              break;
            case 'artistas':
              console.log(`Modificar artistas`);
              this.borraArtista();
              break;
            case 'grupos':
              console.log(`Modificar grupos`);
              this.borrarGrupo();
              break;
          }
        break;

        case operacionComandos.modificar:
          switch (option) {
            case 'albumes':
              console.log(`Modificar albumes`);
              this.modificarAlbumes();
              break;
            case 'canciones':
              console.log(`Modificar canciones`);
              this.modificarCancion();
              break;
            case 'generos':
              console.log(`Modificar generos`);
              this.modificarGenero();
              break;
            case 'artistas':
              console.log(`Modificar artistas`);
              this.modificarArtista();
              break;
            case 'grupos':
              console.log(`Modificar grupos`);
              this.modificarGrupo();
              break;
          }
        break;
      }
    });
  }

  // Procesos de añadir
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

  addCancion():void {
    console.log(`=================Proceso de añadir una Cancion==================`);
    inquirer.prompt([
      {
        type: 'input',
        name: 'nombreCancion',
        message: 'Nombre de cancion:',
      },
      {
        type: 'input',
        name: 'cantantesCancion',
        message: 'Cantantes de cancion:',
      },
      {
        type: 'input',
        name: 'duracionCancion',
        message: 'Duracion de cancion:',
      },
      {
        type: 'input',
        name: 'generosCancion',
        message: 'Generos de cancion:',
      },
      {
        type: 'input',
        name: 'numeroProCancion',
        message: 'Nombre de cancion:',
      },
      {
        type: 'input',
        name: 'fechaCancion',
        message: 'Fecha de cancion:',
      },
    ]).then((answers) => {
      // Error
      if (/\d+/.test(answers['fechaCancion'])) {
        console.log(`Vuelve a introducir los datos con una fecha correcta`);
        this.addCancion();
      }
      // Falta la comprobacion
      console.log(`mi nuevo cancion se llama +` + answers['nombreCancion']);
      console.log('Successfully created Cancion');
      inquirer.prompt([{
        type: 'list',
        name: 'continue',
        message: 'Quieres agregar otro Cancion?:',
        choices: ['Yes', 'No'],
      }]).then((answers) => {
        if (answers['continue'] == 'Yes') this.addCancion();
        else this.userMenu();
      });
    });
  }

  addGrupo():void {
    console.log(`=================Proceso de añadir un Grupo==================`);
    inquirer.prompt([
      {
        type: 'input',
        name: 'nombreGrupo',
        message: 'Nombre de Grupo:',
      },
      {
        type: 'input',
        name: 'artistasGrupo',
        message: 'Artistas de Grupo:',
      },
      {
        type: 'input',
        name: 'fechaGrupo',
        message: 'Fecha de Grupo:',
      },
      {
        type: 'input',
        name: 'GenerosCancion',
        message: 'Generos de Grupo:',
      },
      {
        type: 'input',
        name: 'AlbumnesCancion',
        message: 'Nombre de Grupo:',
      },
      {
        type: 'input',
        name: 'oyenteCancion',
        message: 'Oyentes mensuales de Grupo:',
      },
    ]).then((answers) => {
      console.log(`fecha + ` + answers['fechaGrupo']);
      if (/^\d+/.test(answers['fechaGrupo'])) {
        console.log(`Vuelve a introducir los datos con una fecha correcta`);
        this.addCancion();
      }
      // Falta la comprobacion
      console.log(`mi nuevo cancion se llama +` + answers['nombreGrupo']);
      console.log('Successfully created Grupo');
      inquirer.prompt([{
        type: 'list',
        name: 'continue',
        message: 'Quieres agregar otro Grupo:',
        choices: ['Yes', 'No'],
      }]).then((answers) => {
        if (answers['continue'] == 'Yes') this.addGrupo();
        else this.userMenu();
      });
    });
  }

  addArtista():void {
    console.clear();
    console.log(`=================Proceso de añadir un/una Artista==================`);
    inquirer.prompt([
      {
        type: 'input',
        name: 'nombreArtista',
        message: 'Nombre del artista:', 
      }, {
        type: 'input',
        name: 'grupoArtista',
        message: 'Grupos del artista:',
      }, {
        type: 'input',
        name: 'generosArtista',
        message: 'Generos del artista:',
      }, {
        type: 'input',
        name: 'albumArtista',
        message: 'Albumes del artista:',
      }, {
        type: 'input',
        name: 'cancionesArtista',
        message: 'Canciones del artista:',
      }, {
        type: 'input',
        name: 'oyentesArtista',
        message: 'Oyentes del artista:',
      },
    ]).then((answers) => {
      // Falta la comprobacion
      console.log(`el nuevo artista se llama +` + answers['nombreArtista']);
      console.log('Successfully created artista');
      inquirer.prompt([{
        type: 'list',
        name: 'continue',
        message: 'Quieres agregar otro artista:',
        choices: ['Yes', 'No'],
      }]).then((answers) => {
        if (answers['continue'] == 'Yes') this.addArtista();
        else this.userMenu();
      });
    });

  }
  
  addGenero():void {
    console.clear();
    console.log(`=================Proceso de añadir un Genero==================`);
    inquirer.prompt([
      {
        type: 'input',
        name: 'nombreGenero',
        message: 'Tipo de genero:',
      }, {
        type: 'input',
        name: 'artistaGenero',
        message: 'Grupos de artistas:',
      }, {
        type: 'input',
        name: 'generosAlbum',
        message: 'generos Albumes :',
      }, {
        type: 'input',
        name: 'cancionesGeneros',
        message: 'Canciones de dicho genero',
      },
    ]).then((answers) => {
      // Falta la comprobacion
      // if (/^\d+/.test(answers['fechaAlbum'])) {

      // }
      console.log(`mi nuevo genero se llama +` + answers['nombreGenero']);
      console.log('Successfully created genero');
      inquirer.prompt([{
        type: 'list',
        name: 'continue',
        message: 'Quieres agregar otro Genero?:',
        choices: ['Yes', 'No'],
      }]).then((answers) => {
        if (answers['continue'] == 'Yes') this.addGenero();
        else this.userMenu();
      });
    });
  }


  // Procesos de borrar
  borrarAlbum() {
    console.log(`=====================Proceso de Eliminar Album=================`);
    inquirer.prompt([
      {
        type: 'input',
        name: 'albumEliminar',
        message: 'Qué album deseas eliminar:',
      },
    ]).then((answers) =>{
      const albumEliminar:string = answers['albumEliminar'];
      console.log(JSON.stringify(this.database.get('albumes').find({nombre: albumEliminar}).value()));
      if (this.database.get('albumes').find({nombre: albumEliminar}).value() !== undefined) {
        console.log(`Voy a borrar album`);

        this.database.get('albumes').remove({nombre: albumEliminar}).write();

      } else {
        console.log(`No existe dicho album`);
        this.borrarAlbum();
      }
      console.log(`eliminar album + ` + answers['albumMoficar']);
      // this.database.get('albumes')

      console.log('Successfully eliminar album');
      inquirer.prompt([{
        type: 'list',
        name: 'continue',
        message: 'Quieres eliminar otro album?:',
        choices: ['Yes', 'No'],
      }]).then((answers) => {
        if (answers['continue'] == 'Yes') this.borrarAlbum();
        else this.userMenu();
      });
    });
  }

  
  borrarCancion() {}
  borrarGrupo() {}


  // Noelia
  borraArtista() {}
  borrarGenero() {
    console.log(`=====================Proceso de Eliminar Genero=================`);
    
  }


  // Procesos de modificar
  modificarAlbumes():void {
    console.log(`=====================Proceso de Modificar Album=================`);
    inquirer.prompt([
      {
        type: 'input',
        name: 'albumMoficar',
        message: 'Cuál album deseas modificar:',
      },
      {
        type: 'list',
        name: 'tipoAlbumMoficiar',
        message: 'Qué datos de album quieres modificar:',
        choices: ['artista', 'generos', 'nombre', 'año', 'canciones'],
      },
      {
        type: 'input',
        name: 'dataAlbumModificar',
        message: 'Introduzca el dato que quieres actualizar:',
      },
    ]).then((answers) =>{
      const albumMoficar:string = answers['albumMoficar'];
      const tipoDatoMoficar:string = answers['tipoAlbumMoficiar'];
      const dataMoficar:string = answers['dataAlbumModificar'];
      console.log(JSON.stringify(this.database.get('albumes').find({nombre: albumMoficar}).value()));
      if (this.database.get('albumes').find({nombre: albumMoficar}).value() !== undefined) {
        console.log(`Voy a modificar album`);
        this.database.get('albumes').find({nombre: albumMoficar}).set(tipoDatoMoficar, dataMoficar).write();
      } else {
        console.log(`No existe dicho album`);
        this.modificarAlbumes();
      }
      console.log(`modificar album + ` + answers['albumMoficar']);
      // this.database.get('albumes')
      console.log('Successfully modify album');
      inquirer.prompt([{
        type: 'list',
        name: 'continue',
        message: 'Quieres Modificar otros datos de album?:',
        choices: ['Yes', 'No'],
      }]).then((answers) => {
        if (answers['continue'] == 'Yes') this.modificarAlbumes();
        else this.userMenu();
      });
    });
  }

  modificarCancion():void {
    console.log(`=====================Proceso de Modificar Cancion=================`);
    inquirer.prompt([
      {
        type: 'input',
        name: 'cancionModificar',
        message: 'Qué cancion deseas modificar:',
      },
      {
        type: 'list',
        name: 'tipoCancionModificar',
        message: 'Qué datos de la cancion quieres modificar:',
        choices: ['nombre', 'cantantes', 'duracion', 'generos', 'single', 'reproducciones', 'fecha'],
      },
      {
        type: 'input',
        name: 'dataCancionModificar',
        message: 'Introduzca el dato que quieres actualizar:',
      },
    ]).then((answers) =>{
      const cancionModificar:string = answers['cancionModificar'];
      const tipoDatoModificar:string = answers['tipoCancionModificar'];
      const dataModificar:string = answers['dataCancionModificar'];
      console.log(JSON.stringify(this.database.get('canciones').find({nombre: cancionModificar}).value()));
      if (this.database.get('canciones').find({nombre: cancionModificar}).value() !== undefined) {
        console.log(`Voy a modificar una cancion`);
        this.database.get('canciones').find({nombre: cancionModificar}).set(tipoDatoModificar, dataModificar).write();
      } else {
        console.log(`No existe dicha cancion`);
        this.modificarCancion();
      }
      console.log(`modificar cancion + ` + answers['cancionModificar']);
      // this.database.get('albumes')
      console.log('Successfully modify cancion');
      inquirer.prompt([{
        type: 'list',
        name: 'continue',
        message: 'Quieres modificar otros datos de la cancion?:',
        choices: ['Yes', 'No'],
      }]).then((answers) => {
        if (answers['continue'] == 'Yes') this.modificarCancion();
        else this.userMenu();
      });
    });
  }

  modificarGrupo():void {
    console.log(`=====================Proceso de Modificar Grupo=================`);
    inquirer.prompt([
      {
        type: 'input',
        name: 'grupoModificar',
        message: 'Qué grupo deseas modificar:',
      },
      {
        type: 'list',
        name: 'tipoGrupoModificar',
        message: 'Qué datos del grupo quieres modificar:',
        choices: ['nombre', 'artistas', 'año', 'generos', 'albumes', 'oyentes'],
      },
      {
        type: 'input',
        name: 'dataGrupoModificar',
        message: 'Introduzca el dato que quieres actualizar:',
      },
    ]).then((answers) =>{
      const grupoModificar:string = answers['grupoModificar'];
      const tipoDatoModificar:string = answers['tipoGrupoModificar'];
      const dataModificar:string = answers['dataGrupoModificar'];
      console.log(JSON.stringify(this.database.get('grupos').find({nombre: grupoModificar}).value()));
      if (this.database.get('canciones').find({nombre: grupoModificar}).value() !== undefined) {
        console.log(`Voy a modificar un grupo`);
        this.database.get('grupos').find({nombre: grupoModificar}).set(tipoDatoModificar, dataModificar).write();
      } else {
        console.log(`No existe dicho grupo`);
        this.modificarCancion();
      }
      console.log(`modificar grupo + ` + answers['grupoModificar']);
      // this.database.get('albumes')
      console.log('Successfully modify grupo');
      inquirer.prompt([{
        type: 'list',
        name: 'continue',
        message: 'Quieres modificar otros datos del grupo?:',
        choices: ['Yes', 'No'],
      }]).then((answers) => {
        if (answers['continue'] == 'Yes') this.modificarGrupo();
        else this.userMenu();
      });
    });
  }

  modificarArtista():void {
    console.log(`=====================Proceso de Modificar Artista=================`);
    inquirer.prompt([
      {
        type: 'input',
        name: 'artistModificar',
        message: 'Qué artista deseas modificar:',
      },
      {
        type: 'list',
        name: 'tipoArtistaModificar',
        message: 'Qué datos del artista quieres modificar:',
        choices: ['nombre', 'grupos', 'generos', 'albumes', 'canciones', 'oyentes'],
      },
      {
        type: 'input',
        name: 'dataArtistaModificar',
        message: 'Introduzca el dato que quieres actualizar:',
      },
    ]).then((answers) =>{
      console.log(`modificar artista + ` + answers['artistaModificar']);

      const artistaModificar:string = answers['artistModificar'];
      const tipoDatoModificar:string = answers['tipoArtistaModificar'];
      const dataModificar:string = answers['dataArtistaModificar'];
      
      console.log(JSON.stringify(this.database.get('grupos').find({nombre: artistaModificar}).value()));
      if (this.database.get('canciones').find({nombre: artistaModificar}).value() !== undefined) {
        console.log(`Voy a modificar un grupo`);
        this.database.get('grupos').find({nombre: artistaModificar}).set(tipoDatoModificar, dataModificar).write();
      } else {
        console.log(`No existe dicho artista`);
        this.modificarArtista();
      }
      console.log('Successfully modify artista');
      inquirer.prompt([{
        type: 'list',
        name: 'continue',
        message: 'Quieres modificar otros datos del grupo?:',
        choices: ['Yes', 'No'],
      }]).then((answers) => {
        if (answers['continue'] == 'Yes') this.modificarCancion();
        else this.userMenu();
      });
    });
  }

  modificarGenero():void {
    console.log(`=====================Proceso de Modificar Genero=================`);
    inquirer.prompt([
      {
        type: 'input',
        name: 'generoModificar',
        message: 'Qué genero deseas modificar:',
      },
      {
        type: 'list',
        name: 'tipoGeneroModificar',
        message: 'Qué datos del genero quieres modificar:',
        choices: ['nombre', 'grupos', 'albumes', 'canciones'],
      },
      {
        type: 'input',
        name: 'dataGeneroModificar',
        message: 'Introduzca el dato que quieres actualizar:',
      },
    ]).then((answers) =>{
      const generoModificar:string = answers['generoModificar'];
      const tipoDatoModificar:string = answers['tipoGeneroModificar'];
      const dataModificar:string = answers['dataGeneroModificar'];
      console.log(JSON.stringify(this.database.get('generos').find({nombre: generoModificar}).value()));
      if (this.database.get('generos').find({nombre: generoModificar}).value() !== undefined) {
        console.log(`Voy a modificar un genero`);
        this.database.get('generos').find({nombre: generoModificar}).set(tipoDatoModificar, dataModificar).write();
      } else {
        console.log(`No existe dicho genero`);
        this.modificarCancion();
      }
      console.log(`modificar genero + ` + answers['generoModificar']);
      // this.database.get('albumes')
      console.log('Successfully modify genero');
      inquirer.prompt([{
        type: 'list',
        name: 'continue',
        message: 'Quieres modificar otros datos del genero?:',
        choices: ['Yes', 'No'],
      }]).then((answers) => {
        if (answers['continue'] == 'Yes') this.modificarGenero();
        else this.userMenu();
      });
    });
  }
  
}

const app = new App();
app.userMenu();
