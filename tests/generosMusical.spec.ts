import 'mocha';
import {expect} from 'chai';
import {GenerosMusicales} from "../src/generosMusical";
import {Artistas} from "../src/artistas";
import {Cancion} from "../src/cancion";
import {Album} from "../src/album";

const cancion1 = new Cancion('16 añitos', ['Dani Martin'], 4.13, ['pop rock', 'rock en español'], false, 17020329);
const cancion2 = new Cancion('Una foto en blanco y negro', ['David Otero'], 2.52, ['pop rock'], false, 46992557);
const album1 = new Album('Pequeño', 2010, [cancion1]);
const album2 = new Album('Otero y yo', 2020, [cancion2]);

const artista1 = new Artistas('Dani Martin', ['pop rock', 'rock en español'], [album1, album2], [cancion1, cancion2], 3105602);
const artista2 = new Artistas('David Otero', ['pop rock', 'rock'], [album2], [cancion2], 1926306);

const popRock = new GenerosMusicales("pop rock", [artista1, artista2], [album1, album2], [cancion1, cancion2]);

describe('Test para la clase Generos Musicales', () => {
  it('Se crea la clase correctamente', () => {
    expect(new GenerosMusicales("pop rock", [artista1, artista2], [album1, album2], [cancion1, cancion2]));
  });

  it("Test nombre del género", () => {
    expect(popRock.getGenero()).to.be.equal('pop rock');
  });

  it("Test nombre artistas/grupos de ese género ", () => {
    expect(popRock.getGruposArtistas()).to.be.eql([artista1, artista2]);
  });

  it("Test nombre albumes de ese género ", () => {
    expect(popRock.getGeneroAlbumes()).to.be.eql([album1, album2]);
  });

  it("Test nombre canciones de ese género ", () => {
    expect(popRock.getGeneroCanciones()).to.be.eql([cancion1, cancion2]);
  });
});
