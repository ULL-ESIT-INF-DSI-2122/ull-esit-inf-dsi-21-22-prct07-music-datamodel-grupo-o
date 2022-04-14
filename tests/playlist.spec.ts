import 'mocha';
import {expect} from 'chai';
import {Playlist} from '../src/playlist';
import {Cancion} from '../src/cancion';

describe('Test para la clase Playlist', () => {
  const stay:Cancion = new Cancion('Stay', ['Justin Bieber'], 141, ['pop-rock', 'hip-hop'], true, 200, 2020);
  const butter:Cancion = new Cancion('Butter', ['BTS'], 164, ['dance-pop', 'k-pop'], true, 100, 2021);
  const badHabits:Cancion = new Cancion('Bad Habits', ['Ed Sheeran', 'Johnny McDaid', 'Fred again'], 230, ['dance-pop', 'synth pop'], false, 1990, 2021);

  const collection1 = [stay, butter];
  const playlist1 = new Playlist("Mejores canciones 2022", collection1);

  it("Test para la clase Playlist", () => {
    expect(playlist1).not.to.be.null;
  });

  it("Test añadir una de la lista de canciones", () => {
    expect(playlist1.addCanciones(badHabits));
    expect(playlist1.getCanciones()).to.deep.eq([stay, butter, badHabits]);
  });

  it("Test obtener nombre de la lista", () => {
    expect(playlist1.getNombre()).to.eq("Mejores canciones 2022");
  });

  it("Test obtener la duracion de la lista", () => {
    expect(playlist1.getDuracion()).to.eq(535);
  });

  it("Test obtener generos de la lista", () => {
    expect(playlist1.getGenerosMusicales()).to.deep.eq(["pop-rock", "hip-hop", "dance-pop", "k-pop", "synth pop"]);
  });

  it("Test printInformacion() => to not throw", () => {
    expect(playlist1.printInformacion()).to.not.throw;
  });
});
