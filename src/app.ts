/* eslint-disable no-unused-vars */
import inquirer from 'inquirer';
import FileSync from 'lowdb/adapters/FileSync';
import {Gestor} from './gestor';
import {JsonPlaylist} from './jsonPlaylistCollection';

/**
 * Enumeración de los comandos de la aplicación
 * @enum
 */
enum appComandos {
  album = 'Operación con albumes',
  cancion = 'Operación con canciones',
  genero = 'Operación con generos',
  grupo = 'Operación con grupos',
  artista = 'Operación con artistas',
  playlist = 'Operación especial con playlists',
  salir = 'Salir del programa'
}


/**
 * Enumeración de los comandos de opeacion de la aplicación
 * @enum
 */
enum operacionComandos {
  visualiza = 'Visualizar',
  añadir = 'Añadir',
  borrar = 'Borrar',
  modificar = 'Modificar'
}

/**
 * Clase App de la aplicación
 */
export class App {
  private low = require('lowdb');
  private database = this.low(new FileSync('./src/json/jsonDatabase.json'));
  private colectionMain: JsonPlaylist;
  constructor() {
    this.colectionMain = new JsonPlaylist();
  }

  /**
   * Función menú del usuario
   */
  userMenu():void {
    console.clear();
    console.log(`===========================Bienvenido al SANX Music==============================`);
    inquirer.prompt(
        {
          name: 'option',
          type: 'list',
          message: 'Qué Operación deseas hacer:',
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
          const playlistOperacion = new Gestor();
          playlistOperacion.promptPlalistMenu();
          break;
        case appComandos.salir:
          console.log('Thank you for using our application');
          process.exit();
      }
    });
  }

  /**
   * Función que hace las operaciones de la aplicación
   * @param option Sobre que se desea hacer la operacion (albumes, canciones, grupo, ...)
   */
  operacion(option: string):void {
    console.clear();
    inquirer.prompt({
      name: 'operacion',
      type: 'list',
      message: 'Que operacion quieres hacer con ' + option,
      choices: Object.values(operacionComandos),
    }).then((answers) => {
      switch (answers['operacion']) {
        case operacionComandos.visualiza:
          switch (option) {
            case 'albumes':
              inquirer.prompt([
                {
                  type: 'list',
                  name: 'visualizar',
                  message: 'De qué manera deseas visualizar album?:',
                  choices: ['Según nombre', 'Según año de lanzamiento', 'Según artista'],
                },
              ]).then((answers) => {
                if (answers['visualizar'] !== 'Normal') {
                  inquirer.prompt([
                    {
                      type: 'list',
                      name: 'orden',
                      message: 'ascendente o descendente:',
                      choices: ['ascendente', 'descendente'],
                    },
                  ]).then((option) => {
                    switch (answers['visualizar']) {
                      case 'Según nombre':
                        switch (option['orden']) {
                          case 'ascendente':
                            console.log(JSON.stringify(this.database.get('albumes').sortBy('nombre').value(), null, '\t'));
                            break;
                          case 'descendente':
                            console.log(JSON.stringify(this.database.get('albumes').sortBy('nombre').reverse().value(), null, '\t'));
                            break;
                        }
                        break;

                      case 'Según año de lanzamiento':
                        switch (option['orden']) {
                          case 'ascendente':
                            console.log(JSON.stringify(this.database.get('albumes').sortBy('year').value(), null, '\t'));
                            break;
                          case 'descendente':
                            console.log(JSON.stringify(this.database.get('albumes').sortBy('year').reverse().value(), null, '\t'));
                            break;
                        }
                        break;

                      case 'Según artista':
                        switch (option['orden']) {
                          case 'ascendente':
                            console.log(JSON.stringify(this.database.get('albumes').sortBy('artista').value(), null, '\t'));
                            break;
                          case 'descendente':
                            console.log(JSON.stringify(this.database.get('albumes').sortBy('artista').reverse().value(), null, '\t'));
                            break;
                        }
                        break;
                    }
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
                  });
                }
              });
              break;

            case 'canciones':
              inquirer.prompt([
                {
                  type: 'list',
                  name: 'visualizar',
                  message: 'De qué manera deseas visualizar canciones?:',
                  choices: ['Según nombre', 'Según año de lanzamiento', 'Según numero de reproducciones', 'Según single'],
                },
              ]).then((answers) => {
                if (answers['visualizar'] !== 'Normal') {
                  inquirer.prompt([
                    {
                      type: 'list',
                      name: 'orden',
                      message: 'ascendente o descendente:',
                      choices: ['ascendente', 'descendente'],
                    },
                  ]).then((option) => {
                    switch (answers['visualizar']) {
                      case 'Según nombre':
                        switch (option['orden']) {
                          case 'ascendente':
                            console.log(JSON.stringify(this.database.get('canciones').sortBy('nombre').value(), null, '\t'));
                            break;
                          case 'descendente':
                            console.log(JSON.stringify(this.database.get('canciones').sortBy('nombre').reverse().value(), null, '\t'));
                            break;
                        }
                        break;

                      case 'Según año de lanzamiento':
                        switch (option['orden']) {
                          case 'ascendente':
                            console.log(JSON.stringify(this.database.get('canciones').sortBy('fecha').value(), null, '\t'));
                            break;

                          case 'descendente':
                            console.log(JSON.stringify(this.database.get('canciones').sortBy('fecha').reverse().value(), null, '\t'));
                            break;
                        }
                        break;

                      case 'Según numero de reproducciones':
                        switch (option['orden']) {
                          case 'ascendente':
                            console.log(JSON.stringify(this.database.get('canciones').sortBy('numeroReproducciones').value(), null, '\t'));
                            break;
                          case 'descendente':
                            console.log(JSON.stringify(this.database.get('canciones').sortBy('numeroReproducciones').reverse().value(), null, '\t'));
                            break;
                        }
                        break;

                      case 'Según single':
                        switch (option['orden']) {
                          case 'ascendente':
                            console.log(JSON.stringify(this.database.get('canciones').filter({single: true}).sortBy('nombre').value(), null, '\t'));
                            break;
                          case 'descendente':
                            console.log(JSON.stringify(this.database.get('canciones').filter({single: true}).sortBy('nombre').reverse().value(), null, '\t'));
                            break;
                        }
                        break;
                    }
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
                  });
                }
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

            case 'artistas':
              console.log(JSON.stringify(this.database.get('artistas').values(), null, "\t"));
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

        // Opción de la operación de añadir
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

        // Opción de la operación de borrar
        case operacionComandos.borrar:
          switch (option) {
            case 'albumes':
              this.borrarAlbum();
              break;
            case 'canciones':
              this.borrarCancion();
              break;
            case 'generos':
              this.borrarGenero();
              break;
            case 'artistas':
              this.borraArtista();
              break;
            case 'grupos':
              this.borrarGrupo();
              break;
          }
          break;

        // Opción de la operación de modificar
        case operacionComandos.modificar:
          switch (option) {
            case 'albumes':
              this.modificarAlbumes();
              break;
            case 'canciones':
              this.modificarCancion();
              break;
            case 'generos':
              this.modificarGenero();
              break;
            case 'artistas':
              this.modificarArtista();
              break;
            case 'grupos':
              this.modificarGrupo();
              break;
          }
          break;
      }
    });
  }


  /**
   * Método que añade un album
   */
  async addAlbum() {
    console.clear();
    console.log(`=================Proceso de añadir un album==================`);
    const answerNombre = await inquirer.prompt([
      {
        type: 'input',
        name: 'nombreAlbum',
        message: 'Nombre del album:',
      }, {
        type: 'input',
        name: 'fechaAlbum',
        message: 'Fecha del album:',
      },
    ]);
    const choiseArtista:string[] = [];
    this.colectionMain.getCancionMap().forEach((cancion) => {
      choiseArtista.push(cancion.getAutor());
    });
    choiseArtista.sort();
    const unicosArista = Array.from(new Set(choiseArtista));
    const answerArtista = await inquirer.prompt([
      {
        type: 'list',
        name: 'artistaAlbum',
        message: 'Eliges una artista',
        choices: unicosArista,
      },
    ]);
    const choiseCancion:string[] = [];
    this.colectionMain.getCancionMap().forEach((cancion) => {
      if (cancion.getAutor() == answerArtista['artistaAlbum']) {
        choiseCancion.push(cancion.getNombre());
      }
    });
    choiseCancion.sort();
    const unicosCancion = Array.from(new Set(choiseCancion));
    const answerCancion = await inquirer.prompt([{
      type: 'list',
      name: 'cancionesAlbum',
      message: 'Canciones que tiene artista:',
      choices: unicosCancion,
    },
    ]);
    this.colectionMain.addAlbum(answerNombre['nombreAlbum'], answerNombre['fechaAlbum'], answerCancion['cancionesAlbum'], answerArtista['artistaAlbum'] );
    console.log(`Album Agregado`);
    inquirer.prompt([{
      type: 'list',
      name: 'continue',
      message: 'Quieres agregar otro album:',
      choices: ['Yes', 'No'],
    }]).then((answers) => {
      if (answers['continue'] == 'Yes') this.addAlbum();
      else this.userMenu();
    });
  }

  /**
   * Método que añade una cancion
   */
  addCancion():void {
    console.log(`=================Proceso de añadir una Cancion==================`);
    inquirer.prompt([
      {
        type: 'input',
        name: 'nombreCancion',
        message: 'Nombre de la cancion:',
      },
      {
        type: 'input',
        name: 'cantantesCancion',
        message: 'Cantantes de la cancion:',
      },
      {
        type: 'input',
        name: 'duracionCancion',
        message: 'Duracion de la cancion:',
      },
      {
        type: 'input',
        name: 'generosCancion',
        message: 'Generos de la cancion:',
      },
      {
        type: 'confirm',
        name: 'single',
        message: 'Es single?',
      },
      {
        type: 'input',
        name: 'numeroProCancion',
        message: 'Número de reproducciones de la cancion:',
      },
      {
        type: 'input',
        name: 'fechaCancion',
        message: 'Fecha de la cancion:',
      },
      {
        type: 'input',
        name: 'fechaCancion',
        message: 'Fecha de la cancion:',
      },
    ]).then((answers) => {
      const cantantes:string[] = [];
      const generos:string[] = [];
      cantantes.push(answers['cantantesCancion']);
      generos.push(answers['generosCancion']);
      this.colectionMain.addCancion(
          answers['nombreCancion'],
          cantantes,
          answers['duracionCancion'],
          generos,
          answers['single'],
          answers['numeroProCancion'],
          answers['fechaCancion'],
      );
      console.log(`Se ha agreado la cancion: ` + answers['nombreCancion']);
      inquirer.prompt([{
        type: 'list',
        name: 'continue',
        message: 'Quieres agregar otra cancion?:',
        choices: ['Yes', 'No'],
      }]).then((answers) => {
        if (answers['continue'] == 'Yes') this.addCancion();
        else this.userMenu();
      });
    });
  }

  /**
   * Método que añade un grupo
   */
  async addGrupo() {
    console.log(`=================Proceso de añadir un Grupo==================`);
    const answer = await inquirer.prompt([
      {
        type: 'input',
        name: 'nombreGrupo',
        message: 'Nombre del Grupo:',
      },
      {
        type: 'input',
        name: 'artistasGrupo',
        message: 'Artistas del Grupo:',
      },
      {
        type: 'input',
        name: 'fechaGrupo',
        message: 'Fecha del Grupo:',
      },
      {
        type: 'input',
        name: 'generosGancion',
        message: 'Generos del Grupo:',
      },
      {
        type: 'input',
        name: 'albumnesGancion',
        message: 'Albumes del Grupo:',
      },
      {
        type: 'input',
        name: 'oyenteGrupo',
        message: 'Oyentes mensuales de Grupo:',
      },
    ]);
    // Son tipos de datos arrya
    const artista:string[] = [];
    const generos:string[] = [];
    const albumes:string[] = [];
    artista.push(answer['artistasGrupo']);
    generos.push(answer['generosGancion']);
    albumes.push(answer['albumnesGancion']);
    this.colectionMain.addGrupo(
        answer['nombreGrupo'],
        artista,
        answer['fechaGrupo'],
        generos,
        albumes,
        answer['oyenteGrupo'],
    );
    console.log(`Se ha agreado el grupo: ` + answer['nombreGrupo']);
    inquirer.prompt([{
      type: 'list',
      name: 'continue',
      message: 'Quieres agregar otro grupo:',
      choices: ['Yes', 'No'],
    }]).then((answers) => {
      if (answers['continue'] == 'Yes') this.addGrupo();
      else this.userMenu();
    });
  }

  async addArtista() {
    console.clear();
    console.log(`=================Proceso de añadir un/ artista==================`);
    const answer = await inquirer.prompt([
      {
        type: 'input',
        name: 'nombreArtista',
        message: 'Nombre del artista:',
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
    ]);
    const canciones:string[] = [];
    const generos:string[] = [];
    const albumes:string[] = [];
    canciones.push(answer['artistasGrupo']);
    generos.push(answer['generosGancion']);
    albumes.push(answer['albumnesGancion']);
    this.colectionMain.addArtista(
        answer['nombreArtista'],
        generos,
        albumes,
        canciones,
        answer['oyentesArtista'],
    );
    console.log(`El nuevo artista se llama: ` + answer['nombreArtista']);
    inquirer.prompt([{
      type: 'list',
      name: 'continue',
      message: 'Quieres agregar otro artista:',
      choices: ['Yes', 'No'],
    }]).then((answers) => {
      if (answers['continue'] == 'Yes') this.addArtista();
      else this.userMenu();
    });
  }

  addGenero():void {
    console.clear();
    console.log(`=================Proceso de añadir un Genero==================`);
    inquirer.prompt([
      {
        type: 'input',
        name: 'nombreGenero',
        message: 'Nombre del genero:',
      }, {
        type: 'input',
        name: 'artistaGenero',
        message: 'Artistas con el genero:',
      }, {
        type: 'input',
        name: 'generosAlbum',
        message: 'Albumes con el genero:',
      }, {
        type: 'input',
        name: 'cancionesGeneros',
        message: 'Canciones de dicho genero:',
      },
    ]).then((answers) => {
      // Falta la comprobacion
      // if (/^\d+/.test(answers['fechaAlbum'])) {

      // }
      console.log(`El uevo genero se llama: ` + answers['nombreGenero']);
      inquirer.prompt([{
        type: 'list',
        name: 'continue',
        message: 'Quieres agregar otro genero?:',
        choices: ['Yes', 'No'],
      }]).then((answers) => {
        if (answers['continue'] == 'Yes') this.addGenero();
        else this.userMenu();
      });
    });
  }


  /**
   * Metodo que borra un album
   */
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
        console.log(`Eliminando album.....`);
        this.colectionMain.removeAlbumm(albumEliminar);
      } else {
        console.log(`No existe dicho album`);
      }
      console.log(`Album eliminado: ` + albumEliminar);
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

  /**
   * Método que borra una canción
   */
  borrarCancion() {
    console.log(`=====================Proceso de Eliminar Cancion=================`);
    inquirer.prompt([
      {
        type: 'input',
        name: 'cancionEliminar',
        message: 'Qué canción desea eliminar:',
      },
    ]).then((answers) =>{
      const cancionEliminar:string = answers['cancionEliminar'];
      console.log(JSON.stringify(this.database.get('canciones').find({nombre: cancionEliminar}).value()));
      if (this.database.get('canciones').find({nombre: cancionEliminar}).value() !== undefined) {
        console.log(`Eliminando cancion.....`);
        this.colectionMain.removeCancion(cancionEliminar);
      } else {
        console.log(`No existe dicha canción`);
        this.borrarCancion();
      }
      console.log(`Cancion eliminada: ` + answers['cancionEliminar']);
      inquirer.prompt([{
        type: 'list',
        name: 'continue',
        message: 'Quieres eliminar otra canción?:',
        choices: ['Yes', 'No'],
      }]).then((answers) => {
        if (answers['continue'] == 'Yes') this.borrarCancion();
        else this.userMenu();
      });
    });
  }

  /**
   * Método que borra un grupo
   */
  borrarGrupo() {
    console.log(`=====================Proceso de Eliminar Grupo=================`);
    inquirer.prompt([
      {
        type: 'input',
        name: 'grupoEliminar',
        message: 'Qué grupo desea eliminar:',
      },
    ]).then((answers) =>{
      const grupoEliminar:string = answers['grupoEliminar'];
      console.log(JSON.stringify(this.database.get('grupos').find({nombre: grupoEliminar}).value()));
      if (this.database.get('grupos').find({nombre: grupoEliminar}).value() !== undefined) {
        console.log(`Voy a borrar el grupo`);
        this.colectionMain.removeGrupo(grupoEliminar);
      } else {
        console.log(`No existe dicho grupo`);
        this.borrarGrupo();
      }
      console.log(`Grupo eliminado: ` + answers['grupoEliminar']);
      inquirer.prompt([{
        type: 'list',
        name: 'continue',
        message: 'Quieres eliminar otro grupo?:',
        choices: ['Yes', 'No'],
      }]).then((answers) => {
        if (answers['continue'] == 'Yes') this.borrarGrupo();
        else this.userMenu();
      });
    });
  }

  /**
   * Método que borra un artista
   */
  borraArtista() {
    console.log(`=====================Proceso de Eliminar Artista=================`);
    inquirer.prompt([
      {
        type: 'input',
        name: 'artistaEliminar',
        message: 'Qué artista desea eliminar:',
      },
    ]).then((answers) =>{
      const artistaEliminar:string = answers['artistaEliminar'];
      console.log(JSON.stringify(this.database.get('artistas').find({nombre: artistaEliminar}).value()));
      if (this.database.get('artistas').find({nombre: artistaEliminar}).value() !== undefined) {
        console.log(`Voy a borrar el artista`);
        this.colectionMain.removeArtista(artistaEliminar);
      } else {
        console.log(`No existe dicho artista`);
        this.borraArtista();
      }
      console.log(`Artista eliminado: ` + answers['artistaEliminar']);
      inquirer.prompt([{
        type: 'list',
        name: 'continue',
        message: 'Quieres eliminar otro artista?:',
        choices: ['Yes', 'No'],
      }]).then((answers) => {
        if (answers['continue'] == 'Yes') this.borraArtista();
        else this.userMenu();
      });
    });
  }

  /**
   * Método que borra un genero
   */
  borrarGenero() {
    console.log(`=====================Proceso de Eliminar Género=================`);
    inquirer.prompt([
      {
        type: 'input',
        name: 'generoEliminar',
        message: 'Qué género desea eliminar:',
      },
    ]).then((answers) =>{
      const generoEliminar:string = answers['generoEliminar'];
      console.log(JSON.stringify(this.database.get('generos').find({genero: generoEliminar}).value()));
      if (this.database.get('generos').find({genero: generoEliminar}).value() !== undefined) {
        console.log(`Voy a borrar el género`);
        this.colectionMain.removeGenero(generoEliminar);
      } else {
        console.log(`No existe dicho género`);
        this.borrarGenero();
      }
      console.log(`Genero eliminado: ` + answers['generoEliminar']);
      inquirer.prompt([{
        type: 'list',
        name: 'continue',
        message: 'Quieres eliminar otro género?:',
        choices: ['Yes', 'No'],
      }]).then((answers) => {
        if (answers['continue'] == 'Yes') this.borrarGenero();
        else this.userMenu();
      });
    });
  }


  /**
   * Método que modifica un album
   */
  modificarAlbumes():void {
    console.log(`=====================Proceso de Modificar Album=================`);
    inquirer.prompt([
      {
        type: 'input',
        name: 'albumMoficar',
        message: 'Qué album deseas modificar:',
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
        console.log(`Voy a modificar el album`);
        this.database.get('albumes').find({nombre: albumMoficar}).set(tipoDatoMoficar, dataMoficar).write();
        this.colectionMain.loadAlbum();
      } else {
        console.log(`No existe dicho album`);
        this.modificarAlbumes();
      }
      console.log(`Album modificado: ` + answers['albumMoficar']);
      inquirer.prompt([{
        type: 'list',
        name: 'continue',
        message: 'Quieres modificar otros datos de album?:',
        choices: ['Yes', 'No'],
      }]).then((answers) => {
        if (answers['continue'] == 'Yes') this.modificarAlbumes();
        else this.userMenu();
      });
    });
  }

  /**
   * Método que modifica una cancion
   */
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
        console.log(`Voy a modificar la cancion`);
        this.database.get('canciones').find({nombre: cancionModificar}).set(tipoDatoModificar, dataModificar).write();
        this.colectionMain.loadCancion();
      } else {
        console.log(`No existe dicha cancion`);
        this.modificarCancion();
      }
      console.log(`Cancion modificada: ` + answers['cancionModificar']);
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

  /**
   * Método que modifica un grupo
   */
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
        console.log(`Voy a modificar el grupo`);
        this.database.get('grupos').find({nombre: grupoModificar}).set(tipoDatoModificar, dataModificar).write();
        this.colectionMain.loadGrupo();
      } else {
        console.log(`No existe dicho grupo`);
        this.modificarCancion();
      }
      console.log(`Grupo modificado: ` + answers['grupoModificar']);
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

  /**
   * Método que modifica un artista
   */
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
      console.log(`Artista modificado: ` + answers['artistaModificar']);
      const artistaModificar:string = answers['artistModificar'];
      const tipoDatoModificar:string = answers['tipoArtistaModificar'];
      const dataModificar:string = answers['dataArtistaModificar'];
      console.log(JSON.stringify(this.database.get('grupos').find({nombre: artistaModificar}).value()));
      if (this.database.get('canciones').find({nombre: artistaModificar}).value() !== undefined) {
        console.log(`Voy a modificar el artista`);
        this.database.get('grupos').find({nombre: artistaModificar}).set(tipoDatoModificar, dataModificar).write();
        this.colectionMain.loadArtista();
      } else {
        console.log(`No existe dicho artista`);
        this.modificarArtista();
      }
      inquirer.prompt([{
        type: 'list',
        name: 'continue',
        message: 'Quieres modificar otros datos del artista?:',
        choices: ['Yes', 'No'],
      }]).then((answers) => {
        if (answers['continue'] == 'Yes') this.modificarCancion();
        else this.userMenu();
      });
    });
  }

  /**
   * Método que modifica un genero
   */
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
        console.log(`Voy a modificar el genero`);
        this.database.get('generos').find({nombre: generoModificar}).set(tipoDatoModificar, dataModificar).write();
        this.colectionMain.loadGenero();
      } else {
        console.log(`No existe dicho genero`);
        this.modificarCancion();
      }
      console.log(`Genero modificado: ` + answers['generoModificar']);
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
