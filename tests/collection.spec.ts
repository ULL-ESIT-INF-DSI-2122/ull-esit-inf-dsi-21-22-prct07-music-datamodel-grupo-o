import 'mocha';
import {expect} from 'chai';
import {Collection} from '../src/collection';
const colleccion = new Collection();
// const jsonPlaylistColection = new ();

describe('Test para la clase Collection', () => {
  it('addCancion => to not throw', () => {
    expect(colleccion.addCancion('Drivers License', ['Olivia Rodrigo'], 2.56, ['Pop'], true, 154213421, 2022)).to.not.throw;
  });
  it('addGrupo => to not throw', () => {
    expect(colleccion.addGrupo('One Direction', ['Harry Styles', 'Niall Horan'], 2012, ['Pop'], ['Midnight Memories'], 556465254)).to.not.throw;
  });
  it('addGenero => to not throw', () => {
    expect(colleccion.addGenero('Rock 2', ['Miley Cyrus'], ['Midnight Sky'], ['Midnight Sky'])).to.not.throw;
  });
  it('addArtista => to not throw', () => {
    expect(colleccion.addArtista('Bad Bunny', ['Reggaeton'], ['YHLQMDLG'], ['Safaera', 'Callaita'], 2545545458)).to.not.throw;
  });
  // it('addPlaylist => to not throw', () => {
  //   expect(colleccion.addPlaylist('nueva playlist', ['All Too Well'])).to.not.throw;
  // });
  it('getPlaylist => to not throw', () => {
    expect(colleccion.getPlaylist('nueva playlist')).to.not.throw;
  });
  it('eliminarPlaylist => to not throw', () => {
    expect(colleccion.eliminarPlaylist('nueva playlist')).to.not.throw;
  });
  it('getAllPlaylist => to not be null', () => {
    expect(colleccion.getAllPlaylist()).to.not.be.null;
  });
  it('eliminarAlbum => to not throw', () => {
    expect(colleccion.eliminarAlbum('Let It Be')).to.not.throw;
  });
  it('eliminarCancion => to not throw', () => {
    expect(colleccion.eliminarCancion('Adore You')).to.not.throw;
  });
  it('eliminarGenero => to not throw', () => {
    expect(colleccion.eliminarGenero('Rock alternativo')).to.not.throw;
  });
  it('eliminarGrupo => to not throw', () => {
    expect(colleccion.eliminarGrupo('Imagine Dragons')).to.not.throw;
  });
  it('eliminarArtista => to not throw', () => {
    expect(colleccion.eliminarArtista('Justin Bieber')).to.not.throw;
  });
});
