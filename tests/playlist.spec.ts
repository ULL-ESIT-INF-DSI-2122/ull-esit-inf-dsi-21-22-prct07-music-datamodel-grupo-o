import 'mocha';
import { expect } from 'chai';
import { Playlist } from '../src/playlist';
import { Cancion } from '../src/cancion';

describe('Test para la clase Playlist' , () => {
    
    // constructor(private nombre:string, private autor:string, private duracion:number, 
    //     private generos: string[], private single:boolean, private numeroReproducciones:number) {
    //   }
    
    const stay:Cancion = new Cancion('Stay', ['Justin Bieber'], 141, ['pop-rock', 'hip-hop'], true, 200);
    const butter:Cancion = new Cancion('Butter', ['BTS'], 164, ['dance-pop', 'k-pop'], true, 100);

    // constructor(private nombre:string, private canciones:Cancion[]) {
    //     // Nombre de la playlist.
    //     // Canciones incluidas dentro de la playlist.
    //     // Duración en horas y minutos.         //private duracion:number, 
    //     // Género(s) musicales que se incluyen dentro de la playlist.
    // }

    const collection1 = [stay, butter];
    // collection1.addCanciones(stay);
    // collection1.addCanciones(butter);

    const playlist1 = new Playlist("Mejores canciones 2022", collection1);

    it("Test para la clase Playlist", () => {
        expect(playlist1).not.to.be.null;
    });

    it("Test obtener nombre de la lista", () => {
        expect(playlist1.getNombre()).to.eq("Mejores canciones 2022");
    });

    it("Test obtener la duracion de la lista", () => {
        expect(playlist1.getDuracion()).to.eq(305);
    });

    it("Test obtener generos de la lista", () => {
        // expect(playlist1.getGenerosMusicales()).to.eqls(["pop-rock", "hip-hop"]);
    });
});