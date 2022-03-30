import { Libreria } from "./Libreria";
import { Cancion } from "./cancion";

// steph
export class Album {
    constructor(private nombre:string, private artista:string,
      private year:number, private canciones:Cancion[]) {
        this.nombre = nombre;
        this.artista = artista;
        this.year = year;
        this.canciones = canciones;
    }
    public getNombre():string{ return this.nombre; }
    public getArtista():string{return this.artista; }
    public getYear():number{ return this.year; }
    public getCanciones():Cancion[] { return this.canciones; }
    public getGeneros():string{
    let genero:string = '';
      for(let i = 0; i < this.canciones.length; i++){
        genero += this.canciones[i].getGeneros();
        if(i != this.canciones.length - 1){
          genero += ', ';
        }
      }
      return genero;        
    }
  }