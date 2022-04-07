import inquirer from 'inquirer';
// import { Low, JSONFile } from 'lowdb';
// import { join } from 'path';
import {Cancion} from './cancion';

import {Playlist} from "./playlist";

enum Commands {
  visualizar = "Visualizar todas las playlist",
  navegar = "Navegar una playlist",
  crear = "Crear una playlist",
  borrar = "Borrar una playlist",
  salir = "Salir el programa"
}

export abstract class Gestor {
  constructor() {
  }

  // public mostrarPrincipal() {

  // }

  // visualizar todas las playlist
  async visualizar():Promise<void> {
    console.clear();
    await inquirer.prompt({
      type: 'input',
      name: 'visualizar',
      message: 'Visualizar todas las playlist',
    });
    // hacer algo
    this.menuUser();
  }

  async navegar():Promise<void> {
    console.clear();
    await inquirer.prompt({
      type: 'input',
      name: 'navegar',
      message: 'Navegar un playlist',
      // hacer algo
    });
    this.menuUser();
  }

  async crear():Promise<void> {
    console.clear();
    await inquirer.prompt({
      type: 'input',
      name: 'crear',
      message: 'Crear un playlist',
    });
    // hacer algo
    this.menuUser();
  }

  async borrar():Promise<void> {
    console.clear();
    await inquirer.prompt({
      type: 'input',
      name: 'borrar',
      message: 'Borrar un playlist',
    });

    // hacer algo
    this.menuUser();
  }

  async menuUser(): Promise<void> {
    console.clear();
    // mostrarPrincipal();
    const answers = await inquirer.prompt({
      type: 'list',
      name: 'command',
      message: 'Elige una opción',
      choices: Object.values(Commands),
    });
    switch (answers['command']) {
      case Commands.visualizar:
        console.log(`visualizar`);
        break;

      case Commands.navegar:
        break;

      case Commands.crear:
        console.clear();
        inquirer.prompt([{
          name: 'nombre',
          type: 'input',
          message: '¿Qué nombre tendrá la playlist?',
        }]).then((answers) => {
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

  // /**
  //  * Función que ordena alfabéticamente una playlist
  //  * @param dato Dato por el que se quiere ordenar (título, nombre, año, ...)
  //  * @param tipo Tipo de ordenación (ascendente, descendente)
  //  */
  // ordenPlaylist(dato: string, tipo: string): Prueba {

  // }
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
}

// const play: Prueba[] = [{nombre: "Hola", canciones: ["can1", "can2"], duracion: 100, generos: ["gen1", "gen2"]},
//   {nombre: "mundo", canciones: ["can3", "can4"], duracion: 3000, generos: ["gen4", "gen2"]}];
// const prueba = new Gestor(play);
// const ordenado = prueba.ordenPlaylist("nombre", "ascendente");
}

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

/*
  function mostrarPrincipal(): void {
    enum Commands {
      Salir = "Salir",
      Mostrar albumes = "Mostrar albumes"
    }
    */
