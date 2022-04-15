/* eslint-disable padded-blocks */
/* eslint-disable no-unused-vars */
import 'mocha';
import {expect} from 'chai';
import {Collection} from '../src/collection';
import FileSync from 'lowdb/adapters/FileSync';
import {Cancion} from '../src/cancion';

describe('Test para la clase Collection', () => {

  const colleccion = new Collection();

  const cancion1 = new Cancion("Dile", ["Don Omar"], 3.24, ["Reggaeton"], true, 306730425, 2003);
  const cancion2 = new Cancion("Bandoleros", ["Don Omar", "Tego Calderon"], 5.05, ["Reggaeton"], false, 210011575, 2015);

  it('addCancion => to not throw', () => {
    expect(colleccion.addCancion('Drivers License', ['Olivia Rodrigo'], 2.56, ['Pop'], true, 154213421, 2022)).to.be.not.null;
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

  it('addPlaylist => to not throw', () => {
    expect(colleccion.addPlaylist('nueva playlist', [cancion1, cancion2])).to.not.throw;
  });

  it('getPlaylist => to not throw', () => {
    expect(colleccion.getPlaylist('nueva playlist')).to.not.throw;
  });

  it('eliminarPlaylist => to not throw', () => {
    expect(colleccion.eliminarPlaylist('nueva playlist')).to.not.throw;
  });

  it('eliminarAlbum => to not throw', () => {
    expect(colleccion.eliminarAlbum('CSS')).to.not.throw;
  });

  it('eliminarCancion => to not throw', () => {
    expect(colleccion.eliminarCancion('Drivers License')).to.not.throw;
  });

  it('eliminarGenero => to not throw', () => {
    expect(colleccion.eliminarGenero('Rock 2')).to.not.throw;
  });

  it('eliminarGrupo => to not throw', () => {
    expect(colleccion.eliminarGrupo('One Direction')).to.not.throw;
  });

  it('eliminarArtista => to not throw', () => {
    expect(colleccion.eliminarArtista('Bad Bunny')).to.not.throw;
  });
});
