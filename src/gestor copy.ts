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

/**
 * Variable global que almanacena una playlist específica
 */
let myPlaylist: Playlist = new Playlist('', []);

/**
 * Enumeración de las opciones del menú para realizar sobre las playlists
 * @enum
 */
enum Commands {
  visualizar = "Visualizar todas las playlist",
  navegar = "Navegar una playlist",
  crear = "Crear una playlist",
  borrar = "Borrar una playlist",
  salir = "Salir del programa"
}

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
 * @type {playlistGestor} Tipo de datos de una playlist
 */
type playlistGestor = {
  canciones: Cancion[],
  duracion: number,
  generos: string[],
}

/**
 * Clase Gestora de la aplicación
 */
export class Gestor {
  protected itemMap = new Map<string, playlistGestor>();

  /**
   * Constructor de la clase Gestor
   * @param playlists Array de playlists que contiene todas las playlist de la aplicación
   */
  constructor(protected playlists: Playlist[]) {
    this.playlists.forEach((pList) => {
      this.itemMap.set(pList.getNombre(), {canciones: pList.getCanciones(),
        duracion: pList.getDuracion(), generos: pList.getGenerosMusicales()});
    });
  }

  /**
   * Método que muestra todas las playlist
   */
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
   * Método que visualiza las playlist existentes
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
    }]).then((answersNavegar: any) => {
      this.playlists.forEach((element) => {
        if (element.getNombre() == answersNavegar["nombre"]) {
          console.log(`Playlist Name: ${element.getNombre()}`);
          myPlaylist = element;
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
        this.ordenPlaylist(myPlaylist, answers['command'], orden['option']);
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

  /**
   * Método que crea una playlist y añade canciones
   */
  async crear():Promise<void> {
    console.clear();
    const answersCrear = await inquirer.prompt([
      {
        name: 'addPlaylist',
        type: 'input',
        message: 'Introduzca el nombre de playlist que desea crear:',
      },
      {
        name: 'cancion',
        type: 'input',
        message: 'Que canciones quieres agregar:',
      },
    ]).then((answersCrear:any) => {
      let poderCrear: boolean = true;
      this.playlists.forEach((element) => {
        if (element.getNombre() == answersCrear['addPlaylist']) {
          console.log(`No puedes crear una playlist con el mismo nombre`);
          poderCrear = false;
        }
      });

      if ((answersCrear['addPlaylist'])!== '' && poderCrear) {
        const addPlaylistName:string = answersCrear['addPlaylist'];
        const addCancionName:string = answersCrear['cancion'];
        console.log(`llamar canciones.json + ${addCancionName}`);
        console.log(`nuevoplaylist + ${addPlaylistName}`);

        const low = require('lowdb');
        const database = low(new FileSync('./src/json/canciones.json'));
        console.log(database.get('canciones').find({nombre: addCancionName}).value());

        let stop:boolean = false;
        while (stop == false) {
          const cancionNombre:string = database.get('canciones').find({nombre: addCancionName}).get('nombre').value();
          const cancionCantantes:string[] = database.get('canciones').find({nombre: addCancionName}).get('cantantes').value();
          const cancionDuracion:number = database.get('canciones').find({nombre: addCancionName}).get('duracion').value();
          const cancionGeneros:string[] = database.get('canciones').find({nombre: addCancionName}).get('generos').value();
          const cancionSingle:boolean = database.get('canciones').find({nombre: addCancionName}).get('single').value();
          const cancionNumeroReproducciones:number = database.get('canciones').find({nombre: addCancionName}).get('numeroReproducciones').value();
          const cancionFecha:number = database.get('canciones').find({nombre: addCancionName}).get('fecha').value();
          console.log(`${cancionNombre}`);
          console.log(`${cancionCantantes}`);

          const nuevaCancion = new Cancion(cancionNombre, cancionCantantes, cancionDuracion, cancionGeneros, cancionSingle, cancionNumeroReproducciones, cancionFecha);
          const coleccionCanciones:Cancion[] = [nuevaCancion];
          this.playlists.push(new Playlist(addPlaylistName, coleccionCanciones));
          this.itemMap.set(addPlaylistName, {canciones: coleccionCanciones, duracion: cancionDuracion, generos: cancionGeneros});
          console.log(`Desea agregar más opciones?:`);
          stop = true;
        }
      }
      // this.menuUser();
    });
  }


  /**
   * Método que elimina una playlist elegida por el usuario
   */
  async borrar():Promise<void> {
    console.clear();
    const answersBorrar = await inquirer.prompt([{
      name: 'borrar',
      type: 'input',
      message: 'Introduzca el nombre de la playlist que desea borrar: ',
    }]).then((answersBorrar: any) => {
      // console.log(answersBorrar);
      /* Esto funciona pero no guarda los cambios en JSON
      this.playlists.forEach((element) => {
        if (element.getNombre() == answersBorrar["borrar"]) {
          const index = this.playlists.indexOf(element); // guardamos el índice
          this.playlists.splice(index, 1); // eliminamos
        }
      })
      */
      //

      // const low = require('lowdb');
      // const database = low(new FileSync('./src/json/Playlist.json'));
      // const deletePlaylistName: string = answersBorrar['borrar'];
      // console.log(deletePlaylistName);
      // /console.log(database.get('playlistJ').find({nombre: deletePlaylistName}));
      // const found = database.find((elem: any) => elem == answersBorrar["borrar"]);
    });
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
        process.exit();
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

      case Consulta.year:
        if (orden == 'ascendente') {
          console.log(playlist.getCanciones().sort(((a, b) => b.getFecha() - a.getFecha())));
        } else {
          console.log(playlist.getCanciones().sort(((a, b) => a.getFecha() - b.getFecha())));
        }
        break;

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