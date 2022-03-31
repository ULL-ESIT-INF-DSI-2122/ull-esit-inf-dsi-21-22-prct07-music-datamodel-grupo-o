import { Cancion } from "./cancion";

export class cancionColecction {
    constructor(private cancionColecction:Cancion[]) {

    }
    
    addCanciones(newCancion:Cancion):void {
        this.cancionColecction.push(newCancion);
    }

    getCancionColeccion():Cancion[] {
        return this.cancionColecction;
    }
}