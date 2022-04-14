import 'mocha';
import {expect} from 'chai';
import {Artistas} from "../src/artistas";
import {Cancion} from "../src/cancion";
import {Album} from "../src/album";
import {Grupos} from "../src/grupos";

const cancion1 = new Cancion('16 añitos', ['Dani Martin'], 4.13, ['pop rock', 'rock en español'], false, 17020329, 2010);
const cancion2 = new Cancion('Una foto en blanco y negro', ['David Otero'], 2.52, ['pop rock'], false, 46992557, 2003);
const album1 = new Album('Pequeño', 2010, [cancion1], 'Dani Martin');
const album2 = new Album('Otero y yo', 2020, [cancion2], 'David Otero');
const artista1 = new Artistas('Dani Martin', ['pop rock', 'rock en español'], [album1], [cancion1], 3105602);

const grupo = new Grupos('Estopa', [artista1], 2008, ['pop rock', 'rock en español'], [album1, album2], 1234756);
const artista2 = new Artistas('David Otero', ['pop rock'], [album1], [cancion1], 3105602, [grupo]);

// const grupo1 = new Grupos('El Canto del Loco', [artista1], 2010, ['pop rock', 'rock en español'], [album1], 2610923);

describe('Test para la clase Artista', () => {
  it('Se crea la clase correctamente', () => {
    expect(new Artistas('Dani Martin', ['pop rock', 'rock en español'], [album1, album2], [cancion1, cancion2], 3105602));
  });

  it("Test nombre del artista", () => {
    expect(artista1.getNombreArtista()).to.be.equal('Dani Martin');
  });

  it("Test grupos del artista", () => {
    expect(artista1.getGruposArtista()).to.be.equal(undefined);
  });

  it("Test género del artista", () => {
    expect(artista1.getGenerosArtista()).to.be.eql(['pop rock', 'rock en español']);
  });

  it("Test albumes del artista", () => {
    expect(artista1.getAlbumesArtista()).to.be.eql([album1]);
  });

  it("Test canciones del artista", () => {
    expect(artista1.getCancionesArtista()).to.be.eql([cancion1]);
  });

  it("Test oyentes mensuales del artista", () => {
    expect(artista1.getOyentesArtista()).to.be.equal(3105602);
  });
  it("Test calcular oyentes mensuales del artista", () => {
    expect(artista1.calcularOyentes()).to.be.equal(1418360.75);
    expect(artista2.calcularOyentes()).to.be.equal(1521257.08);
  });
  it("Test añade un nuevo genero al artista", () => {
    expect(artista1.setGenerosArtista('rock')).to.be.not.null;
    expect(artista1.getGenerosArtista()).to.be.eql(['pop rock', 'rock en español', 'rock']);
  });
});
