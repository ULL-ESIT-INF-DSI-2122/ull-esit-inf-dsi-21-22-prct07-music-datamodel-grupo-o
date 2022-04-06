import inquirer from 'inquirer';
// import { Low, JSONFile } from 'lowdb';
// import { join } from 'path';
// import { Cancion } from './cancion';

// import { Playlist } from "./playlist";

enum Commands {
  visualizar = "Visualizar todas las playlist",
  navegar = "Navegar una playlist",
  crear = "Crear una plalist",
  borrar = "Borrar una playlist",
  salir = "Salir el programa"
}

export abstract class Gestor {
  constructor() {
  }

  // public mostrarPrincipal() {

  // }

  async MenuUser(): Promise<void> {
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
        console.log(`Crear una plalist`);
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
