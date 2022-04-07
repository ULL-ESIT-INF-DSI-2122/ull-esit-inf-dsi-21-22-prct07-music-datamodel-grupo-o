import {Console} from 'console';
import inquirer from 'inquirer';
// import input from '@inquirer/input';
import {convertToObject, getParsedCommandLineOfConfigFile} from 'typescript';
// import { Low, JSONFile } from 'lowdb';
// import { join } from 'path';
import {Cancion} from './cancion';

import {Playlist} from "./playlist";

let myPlaylist: Playlist = new Playlist('', []);

enum Commands {
  visualizar = "Visualizar todas las playlist",
  navegar = "Navegar una playlist",
  crear = "Crear una playlist",
  borrar = "Borrar una playlist",
  salir = "Salir del programa"
}

enum Consulta {
  titulo = "Visualizar por título de la canción",
  nombre = "Visualizar por nombre del grupo/artista",
  year = "Visualizar por año de lanzamiento",
  genero = "Visualizar por género musical",
  duracion = "Visualizar por duración de la canción",
  reproducciones = "Visualizar por número de reproducciones totales"
}

enum Orden {
  ascendente = "Ordenar de manera ascendente los datos",
  descendente = "Ordenar de manera descendente los datos"
}

/**
 * Clase Gestora de la aplicación
 */
export class Gestor {
  constructor(protected playlists: Playlist[]) {
  }

  /**
   * Método que visualiza todas las playlist según el nombre, el género o la duración
   */
  async visualizar():Promise<void> {
    console.clear();
    console.log('Playlists existentes:');
    this.playlists.forEach((element) => {
      console.log(`
      Nombre de la playlist: ${element.getNombre()}, 
      Géneros musicales: ${element.getGenerosMusicales()}, 
      Duración: ${element.getDuracion()}`);
    });
    this.menuUser();
  }

  async navegar():Promise<void> {
    console.clear();
    const answersNavegar = await inquirer.prompt([{
      name: 'nombre',
      type: 'input',
      message: 'Elija el nombre de una playlist existente: ',
    }]).then((answersNavegar: any) => { //se añadió :any -> ¿sería correcta la declaración?
      console.log(answersNavegar);
      this.playlists.forEach((element) => {
        if (element.getNombre() == answersNavegar["nombre"]) {
          // console.log(`answer1 = ${answers1["nombre"]}`);
          // console.log(`element = ${element.getNombre()}`);
          console.log(`lista:`);
          myPlaylist = element;
          console.log(`
          Nombre de la playlist: ${element.getNombre()}, 
          Géneros musicales: ${element.getGenerosMusicales()}, 
          Duración: ${element.getDuracion()}`);
        }
      });
    });

    const answers = await inquirer.prompt({
      type: 'list',
      name: 'command',
      message: 'Elige una opción',
      choices: Object.values(Consulta),
    });

    const orden = await inquirer.prompt({
      type: 'list',
      name: 'option',
      message: 'Elige una opción',
      choices: Object.values(Orden),
    });

    switch (answers['command']) {
      case Consulta.titulo:
        this.ordenPlaylist(myPlaylist, answers['command'], orden['option']);
        break;

      case Consulta.nombre:
        // this.ordenPlaylist(myPlaylist, answers['command'], orden['option']);
        break;

      case Consulta.year:
        // this.ordenPlaylist(myPlaylist, answers['command'], orden['option']);
        break;

      case Consulta.duracion:
        break;

      case Consulta.genero:
        break;

      case Consulta.reproducciones:
        break;
    }

    this.menuUser();
  }

  async crear():Promise<void> {
    console.clear();
    const answersCrear = await inquirer.prompt({
      name: 'nombre',
      type: 'input',
      message: 'Introduzca el nombre de playlist que desea crear:',
      // canciones: 'canciones',
      // type: 'input',
      // message: 'Introduca nombre de las canciones',
    }).then((answersCrear: any) => { //se añadió :any -> declaración correcta??
      console.log(answersCrear);
      this.playlists.forEach((element) => {
        // if (element.getNombre() == answersCrear["nombre"]) {
        // }
      });
    // hacer algo
    // this.menuUser();
    });
  }

  //Arreglar para que funcione correctamente
  async borrar():Promise<void> {
    console.clear();
    const answersBorrar = await inquirer.prompt([{
      name: 'borrar',
      type: 'input',
      message: 'Introduzca el nombre de la playlist que desea borrar: ',
    }]).then((answersBorrar: any) => { //se añadió :any -> declaración correcta?
      console.log(answersBorrar);
      this.playlists.forEach((element) => {
        if (element.getNombre() == answersBorrar["name"]) {
          this.playlists.splice(this.playlists.indexOf(answersBorrar.name), 1);
        }
      });
    });
    // hacer algo
    this.menuUser();
  }

  async menuUser(): Promise<void> {
    console.log();
    const answers = await inquirer.prompt({
      type: 'list',
      name: 'command',
      message: 'Elige una opción',
      choices: Object.values(Commands),
    });
    switch (answers['command']) {
      case Commands.visualizar:
        this.visualizar();
        break;

      case Commands.navegar:
        this.navegar();
        break;

      case Commands.crear:
        console.clear();
        inquirer.prompt([{
          name: 'nombre',
          type: 'input',
          message: '¿Qué nombre tendrá la playlist?',
        }]).then((answers: any) => { //se añadió :any -> declaración correcta??
          const cancion1 = new Cancion('Desde mis Ojos', ['Chris Lebron'], 2.49, ['Reggaeton'], false, 5237187); // pensar cómo agregar las canciones
          const newPlaylist = new Playlist(answers.name, [cancion1]); // se crea una playlist pero luego hay que agregarla a la base de datos con algún método
        });
        break;

      case Commands.borrar:
        break;

      case Commands.salir:
        console.log(`Salir del programa`);
        break;
    }

    // .then((answers) => {
    //   switch (answers['command']) {
    //     case Commands.visualizar:
    //       console.log(`Visualizar`);
    //       break;
    //   }
    //   console.log(answers);
    // });
  }

  ordenPlaylist(playlist: Playlist, tipo: string, orden: string): void {
    const orderNombre = new Map<string, Cancion>();
    playlist.getCanciones().forEach((element) => {
      orderNombre.set(element.getNombre(), element);
    });

    console.log(playlist, tipo, orden);
    switch (tipo) {
      case Consulta.titulo:
        if (orden == Orden.ascendente) {
          // console.log(orderNombre.get());
        } else {
          console.log(playlist.getCanciones().sort());
        }
      case Consulta.duracion:
        if (orden == Orden.ascendente) {
          console.log(playlist.getCanciones().sort(((a, b) => a.getDuracion() - b.getDuracion())));
        } else {
          console.log(playlist.getCanciones().sort(((a, b) => b.getDuracion() - a.getDuracion())).reverse());
        }
        break;
    }

    // this.playlists.forEach((element) => {
    //   element.getCanciones().forEach((dato) => {
    //     nombre.push(dato.getNombre());
    //   });
    // });
    // if (orden == Orden.ascendente) {
    //   console.log(nombre.sort());
    // } else {
    //   console.log(nombre.reverse());
    // }
  }
}

const cancion = new Cancion('Desde mis Ojos', ['Chris Lebron'], 2.49, ['Reggaeton'], false, 5237187); // pensar cómo agregar las canciones
const cancion2 = new Cancion('Ojos', ['Lebron'], 2.49, ['Hip'], false, 5237187); // pensar cómo agregar las canciones
const newPlay = new Playlist("hola", [cancion, cancion2]); // se crea una playlist pero luego hay que agregarla a la base de datos con algún método
const newPlay2 = new Playlist("mundo", [cancion2]); // se crea una playlist pero luego hay que agregarla a la base de datos con algún método

const cancion3 = new Cancion('Desde', ['Chris Lebron'], 2.49, ['Reggaeton'], false, 5237187); 
const cancion4 = new Cancion('Prueba', ['Lebron'], 2.49, ['Hip'], false, 5237187); 
const newPlay3 = new Playlist("pruebaplay3", [cancion3, cancion2]); 
const newPlay4 = new Playlist("pruebaplay4", [cancion4]);

const gestor = new Gestor([newPlay, newPlay2, newPlay3, newPlay4]);
gestor.menuUser();

// const play: Prueba[] = [{nombre: "Hola", canciones: ["can1", "can2"], duracion: 100, generos: ["gen1", "gen2"]},
//   {nombre: "mundo", canciones: ["can3", "can4"], duracion: 3000, generos: ["gen4", "gen2"]}];
// const prueba = new Gestor(play);
// const ordenado = prueba.ordenPlaylist("nombre", "ascendente");
// }

// Xue
// Preguntar al usuario: que quiere hacer:
// 1. Visualizar todas las playlist, consultar el nombre de playlist
// Entrar bases de datos,  buscar el nombre de playlist,

// Andrea
// 2. Navegar por una playlist. Visualizar y decidir el orden:
// -Alfabéticamente por título
// -Alfabéticamente por nombre grupo/artista
// -Año lanzamiento
// -Duración de la canción
// -Género musical
// -Nº reproducciones
// Entrar en la base de datos, pregunta playlist, pregunta el orden (ascendente o descendente), ordena y muestra
// steph
// 3. Crear una nueva playlist
// Entrar a base de datos, preguntar si crear nueva playlist o a partir de una existente, asignar nombre distinto

// Noe
// 4. Borrar y guardar playlist
// Entrar a base de datos, preguntar si borrar o guardar (borrar solo propietario)
// ATENCION: distinguir entre playlist usuarios y playlist cargadas en el sistema.

// BBDD
// Al menos 50 canciones distintas. Puede ayudarse del siguiente recurso o de la información extraída de Spotify para cumplimentar esta información si lo necesita.
// Incluir al menos diez géneros musicales distintos. Las canciones deben estar uniformemente distribuidas entre estos diez géneros.
// Un mínimo de cinco grupos musicales.
// Al menos cinco artistas.
// Entre cinco y diez álbumes musicales.
// Incluir tres playlists distintas.
