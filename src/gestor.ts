// import * as inquirer from 'inquirer';
// import { Low, JSONFile } from 'lowdb';
// import { join } from 'path';
// import { Cancion } from './cancion';

import {Playlist} from "./playlist";

// type Prueba = {
//   nombre: string;
//   canciones: string[];
//   duracion: number;
//   generos: string[];
// }

export class Gestor {
  constructor(private nombrePlaylist: Playlist[]) {
  }

  // lowdb
  //     public Create() {
  //       const file = join(__dirname, 'db.json');
  //       const db = new Low(new JSONFile(file));
  //     }
  //   }

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
