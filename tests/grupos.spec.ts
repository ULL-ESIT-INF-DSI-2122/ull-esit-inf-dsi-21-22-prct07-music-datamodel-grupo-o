import 'mocha';
import {expect} from 'chai';
import {Grupos} from '../src/grupos';
import {Artistas} from '../src/artistas';
import {Album} from '../src/album';
import {Cancion} from '../src/cancion';

describe('Test de la clase Grupos', () => {
  const cancion1 = new Cancion('16 añitos', ['Dani Martin'], 4.13, ['pop rock', 'rock en español'], false, 17020329, 2021);
  const cancion2 = new Cancion('Zapatillas', ['Dani Martin'], 2.52, ['rock en español'], false, 46992557, 2005);
  const album1 = new Album('Pequeño', 2010, [cancion1], 'Dani Martin');
  const album2 = new Album('Otero y yo', 2020, [cancion2], 'David Otero');

  const artista1 = new Artistas('Dani Martin', ['pop rock', 'rock en español'], [album1, album2], [cancion1, cancion2], 3105602);
  const artista2 = new Artistas('David Otero', ['pop rock', 'rock'], [album2], [cancion2], 1926306);
  const grupo1 = new Grupos('El Canto del Loco', [artista1], 2010, ['pop rock', 'rock en español'], [album2], 2610923);

  it('Se crea la clase correctamente', () => {
    expect(new Grupos('El Canto del Loco', [artista1], 2010, ['pop rock', 'rock en español'], [album2], 2610923));
  });
  it('Se obtiene el nombre del grupo correctamente', () => {
    expect(grupo1.getNombre()).to.be.equal('El Canto del Loco');
  });
  it('Se obtienen los artistas del grupo correctamente', () => {
    expect(grupo1.getArtistas()).to.be.eql([artista1]);
  });
  it('Se obtiene el año de creación del grupo correctamente', () => {
    expect(grupo1.getYear()).to.be.equal(2010);
  });
  it('Se obtiene el genero del grupo correctamente', () => {
    expect(grupo1.getGeneroMusical()).to.be.eql(['pop rock', 'rock en español']);
  });
  it('Se obtienen los albumes del grupo correctamente', () => {
    expect(grupo1.getAlbumes()).to.be.eql([album2]);
  });
  it('Se obtiene el numero de oyentes mensuales del grupo correctamente', () => {
    expect(grupo1.getOyentes()).to.be.equal(2610923);
  });
  it('Se modifica el numero de oyentes mensuales del grupo correctamente', () => {
    expect(grupo1.setOyentes(3010923));
  });
  it('Se añade un artista al grupo correctamente', () => {
    expect(grupo1.addArtistas(artista2));
  });
  it('Se añade un album al grupo correctamente', () => {
    expect(grupo1.addAlbum(album1));
  });
  it('Se añade un genero musical al grupo correctamente', () => {
    expect(grupo1.addGeneroMusical('rock'));
  });
});
