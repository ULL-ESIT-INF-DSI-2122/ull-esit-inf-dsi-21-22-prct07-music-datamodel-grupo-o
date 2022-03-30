// import { GenerosMusicales } from "./generosMusical";
// import { Libreria } from "./Libreria";

// Andrea
// export class Cancion extends Libreria<> {
export class Cancion {
  constructor(private nombre:string, private autor:string,
    private duracion:number, private generos:string[],
    private single:boolean, private numeroProducciones:number) {
    // super();
  
    // Nombre de la canción
    // Autor de la canción.
    // Duración en minutos y segundos.
    // Género(s) al que pertenece.
    // Single: Flag que determina si la canción fue lanzada como single o no.
    // Número de reproducciones totales.

    this.nombre = nombre;
    this.autor = autor;
    this.duracion = duracion;
    this.generos = generos;
    this.single = single;
    this.numeroProducciones = numeroProducciones;
  }

  getNombre():string { return this.nombre; }

  getAutor():string { return this.autor; }
  
  getDuracion():number { return this.duracion; }

  getGeneros():string[] { return this.generos; }

  getSingle():boolean { return this.single; }

  getNumeroProducciones(): number { return this.numeroProducciones; }

}