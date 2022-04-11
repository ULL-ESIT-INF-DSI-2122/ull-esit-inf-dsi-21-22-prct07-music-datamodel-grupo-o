import inquirer from 'inquirer';
// import input from '@inquirer/input';
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

/**
 * Clase Gestora de la aplicación
 */
export class Gestor {
  constructor(protected playlists: Playlist[]) {}

  imprimir():void {
    this.playlists.forEach((element) => {
      process.stdout.write(`
        Nombre de la playlist: ${element.getNombre()}`);
      element.getCanciones().forEach((cancion, index) => {
        process.stdout.write(`
            [Cancion ${index}]: ${cancion.getNombre()}`);
      });
      console.log(`
        Géneros musicales: ${element.getGenerosMusicales()}
        Duración: ${element.getDuracion()}`);
    });
  }


  /**
   * Método que visualiza todas las playlist según el nombre, el género o la duración
   */
  async visualizar():Promise<void> {
    console.clear();
    console.log('Playlists existentes:');
    this.imprimir();
    this.menuUser();
  }

  /**
   * Método que navega un playlist y mostrar la informacion de dicho playlist
   */
  async navegar():Promise<void> {
    console.clear();
    const answersNavegar = await inquirer.prompt([{
      name: 'nombre',
      type: 'input',
      message: 'Elija el nombre de una playlist existente: ',
    }]).then((answersNavegar: any) => { // se añadió :any -> ¿sería correcta la declaración?
      this.playlists.forEach((element) => {
        if (element.getNombre() == answersNavegar["nombre"]) {
          // console.log(`answer1 = ${answers1["nombre"]}`);
          // console.log(`element = ${element.getNombre()}`);
          console.log(`Playlist Name: ${element.getNombre()}`);
          myPlaylist = element;
          // element.getCanciones().forEach((cancion, index) => {
          //   console.log(`   [${index}]` + `:` + cancion.getNombre());
          // });
        }
      });
    });

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

    switch (answers['command']) {
      case Consulta.titulo:
        this.ordenPlaylist(myPlaylist, answers['command'], orden['option']);
        break;

      case Consulta.nombre:
        this.ordenPlaylist(myPlaylist, answers['command'], orden['option']);
        break;

      case Consulta.year:
        // this.ordenPlaylist(myPlaylist, answers['command'], orden['option']);
        break;

      case Consulta.duracion:
        this.ordenPlaylist(myPlaylist, answers['command'], orden['option']);
        break;

      case Consulta.genero:
        this.ordenPlaylist(myPlaylist, answers['command'], orden['option']);
        break;

      case Consulta.reproducciones:
        this.ordenPlaylist(myPlaylist, answers['command'], orden['option']);
        break;
    }

    this.menuUser();
  }

  async crear():Promise<void> {
    console.clear();
    const answersCrear = await inquirer.prompt([
      {
        name: 'addNombre',
        type: 'input',
        message: 'Introduzca el nombre de playlist que desea crear:',
      },
      {
        name: 'cancion',
        type: 'input',
        message: 'Que canciones quieres agregar:',
      },
    ]).then((answersCrear:any) => { // se añadió :any -> declaración correcta??
      // console.log(answersCrear['addNombre']);
      // console.log(answersCrear['cancion']);
      let poderCrear: boolean = true;
      this.playlists.forEach((element) => {
        if (element.getNombre() == answersCrear['addNombre']) {
          console.log(`No puedes crear una playlist con el mismo nombre`);
          poderCrear = false;
        }
      });
      if ((answersCrear['addNombre'])!== '' && poderCrear) {
        // Consultar la base de datos sobre canciones
        // Un ejemplo.
        const nuevaCancion = new Cancion(answersCrear['cancion'], ['Coldplay', 'BTS'], 3.48, ['k-pop', 'dance-pop'], false, 2458793);
        const coleccionCanciones = [nuevaCancion];
        this.playlists.push(new Playlist(answersCrear['addNombre'], coleccionCanciones));
      }
      this.menuUser();
    });
  }

  // Arreglar para que funcione correctamente
  /**
   * Método que elimina una playlist elegida por el usuario
   */
  async borrar():Promise<void> {
    console.clear();
    const answersBorrar = await inquirer.prompt([{
      name: 'borrar',
      type: 'input',
      message: 'Introduzca el nombre de la playlist que desea borrar: ',
    }]).then((answersBorrar: any) => { // se añadió :any -> declaración correcta?
      // console.log(answersBorrar);
      this.playlists.forEach((element) => {
        if (element.getNombre() == answersBorrar['borrar']) {
          // comprobar
          this.playlists.splice(this.playlists.indexOf(answersBorrar.name)); // splice(0, indexOF)? ó push(indexOf)?
        }
      });
    });
    // hacer algo
    this.menuUser();
  }

  /**
   * Menú del usuario para usar la aplicación
   */
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
        this.crear();
        break;

      case Commands.borrar:
        this.borrar();
        break;

      case Commands.salir:
        console.log(`Salir del programa`);
        break;
    }
  }

  /**
   * Método que ordena las canciones de una playlist según unos parámetros
   * @param playlist Playlist a la que queremos ordenar sus canciones
   * @param tipo El tipo de orden según el título, el autor, el año, la duracion, ...
   * @param orden Orden ascendente o descendente
   */
  ordenPlaylist(playlist: Playlist, tipo: string, orden: string): void {
    const orderNombre = new Map<string, Cancion>();
    switch (tipo) {
      case Consulta.titulo:
        playlist.getCanciones().forEach((element) => {
          orderNombre.set(element.getNombre(), element);
        });
        playlist.getCanciones().forEach((cancion) => {
          orderNombre.set(cancion.getNombre(), cancion);
        });
        const unsortArray = [...orderNombre];
        if (orden == 'ascendente') {
          unsortArray.sort();
          unsortArray.forEach((element) => {
            console.log(element);
          });
        } else {
          unsortArray.sort().reverse();
          unsortArray.forEach((element) => {
            console.log(element);
          });
        }
        break;

      case Consulta.nombre:
        playlist.getCanciones().forEach((element) => {
          orderNombre.set(element.getAutor(), element);
        });
        playlist.getCanciones().forEach((cancion) => {
          orderNombre.set(cancion.getAutor(), cancion);
        });
        const unSArray = [...orderNombre];
        if (orden == 'ascendente') {
          unSArray.sort();
          unSArray.forEach((element) => {
            console.log(element);
          });
        } else {
          unSArray.sort().reverse();
          unSArray.forEach((element) => {
            console.log(element);
          });
        }
        break;

      // case Consulta.year:
      //   if (orden == 'ascendente') {
      //     console.log(`prueba`);
      //     console.log(playlist.getCanciones().sort(((a, b) => b.() - a.getDuracion())));
      //   } else {
      //     console.log(playlist.getCanciones().sort(((a, b) => a.getDuracion() - b.getDuracion())));
      //   }
      //   break;
      case Consulta.duracion:
        if (orden == 'ascendente') {
          console.log(playlist.getCanciones().sort(((a, b) => b.getDuracion() - a.getDuracion())));
        } else {
          console.log(playlist.getCanciones().sort(((a, b) => a.getDuracion() - b.getDuracion())));
        }
        break;

      case Consulta.genero:
        playlist.getCanciones().forEach((element) => {
          orderNombre.set(element.getGenero(), element);
        });
        playlist.getCanciones().forEach((cancion) => {
          orderNombre.set(cancion.getGenero(), cancion);
        });
        const array = [...orderNombre];
        if (orden == 'ascendente') {
          array.sort();
          array.forEach((element) => {
            console.log(element);
          });
        } else {
          array.sort().reverse();
          array.forEach((element) => {
            console.log(element);
          });
        }
        break;

      case Consulta.reproducciones:
        if (orden == 'ascendente') {
          console.log(playlist.getCanciones().sort((((a, b) => b.getNumeroReproducciones() - a.getNumeroReproducciones()))));
        } else {
          console.log(playlist.getCanciones().sort(((a, b) => a.getNumeroReproducciones() - b.getNumeroReproducciones())));
        }
        break;
    }
  }
}

const cancion = new Cancion('Cesde mis Ojos', ['Chris Lebron'], 1.8, ['Reggaeton', 'trap'], false, 5237187); // pensar cómo agregar las canciones
const cancion2 = new Cancion('Ajos', ['Lebron', 'Max'], 2.49, ['Hip'], false, 15537187); // pensar cómo agregar las canciones
const newPlay = new Playlist("hola", [cancion, cancion2]); // se crea una playlist pero luego hay que agregarla a la base de datos con algún método
const newPlay2 = new Playlist("mundo", [cancion2]); // se crea una playlist pero luego hay que agregarla a la base de datos con algún método

const cancion3 = new Cancion('Desde', ['Chris Lebron'], 2.49, ['Reggaeton'], false, 5237187);
const cancion4 = new Cancion('Prueba', ['Lebron'], 2.49, ['Hip'], false, 5237187);
const newPlay3 = new Playlist("pruebaplay3", [cancion3, cancion2]);
const newPlay4 = new Playlist("pruebaplay4", [cancion4]);

const gestor = new Gestor([newPlay, newPlay2, newPlay3, newPlay4]);
gestor.menuUser();

// Andrea
// 2. Navegar por una playlist. Visualizar y decidir el orden:
// -Año lanzamiento

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
