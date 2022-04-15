/* eslint-disable no-multiple-empty-lines */
/* eslint-disable padded-blocks */
/* eslint-disable no-unused-vars */
import 'mocha';
import {expect} from 'chai';
import {JsonPlaylist} from "../src/jsonPlaylistCollection";
import {Cancion} from '../src/cancion';
import {Playlist} from '../src/playlist';

console.log = function() {};
describe('Test para la clase Playlists Collection', () => {
  const jsonPlaylist = new JsonPlaylist();

  // const jsonPlaylist = new JsonPlaylist();
  const cancion1 = new Cancion("Dile", ["Don Omar"], 3.24, ["Reggaeton"], true, 306730425, 2003);
  const cancion2 = new Cancion("Bandoleros", ["Don Omar", "Tego Calderon"], 5.05, ["Reggaeton"], false, 210011575, 2015);
  // const playlist_nueva = new Playlist("Los Bandoleros", [cancion1, cancion2]);

  it("Test getPlaylistMap => Playlist de la colección", () => {
    expect(jsonPlaylist.getPlaylistMap()).to.not.throw;
    expect(jsonPlaylist.getPlaylistMap()).to.not.be.null;
  });
  it("Test getAlbumMap => Albumes de la colección", () => {
    expect(jsonPlaylist.getAlbumMap()).to.not.throw;
    expect(jsonPlaylist.getAlbumMap()).to.not.be.null;
  });
  it("Test getCancionMap => Canciones de la colección", () => {
    expect(jsonPlaylist.getCancionMap()).to.not.throw;
    expect(jsonPlaylist.getCancionMap()).to.not.be.null;
  });
  it("Test getGeneroMap => Generos de la colección", () => {
    expect(jsonPlaylist.getGeneroMap()).to.not.throw;
    expect(jsonPlaylist.getGeneroMap()).to.not.be.null;
  });
  it("Test getGrupoMap => Grupos de la colección", () => {
    expect(jsonPlaylist.getGrupoMap()).to.not.throw;
    expect(jsonPlaylist.getGrupoMap()).to.not.be.null;
  });
  it("Test getArtistaMap => Artistas de la colección", () => {
    expect(jsonPlaylist.getArtistaMap()).to.not.throw;
    expect(jsonPlaylist.getArtistaMap()).to.not.be.null;
  });
  it("Test getPlaylistMap => Playlists de la colección", () => {
    expect(jsonPlaylist.getPlaylistMap()).to.not.throw;
    expect(jsonPlaylist.getArtistaMap()).to.not.be.null;
  });
  it("Test loadCancion => not to throw", () => {
    expect(jsonPlaylist.loadCancion()).to.not.throw;
  });
  it("Test loadAlbum => not to throw", () => {
    expect(jsonPlaylist.loadAlbum()).to.not.throw;
  });
  it("Test loadPlaylist => not to throw", () => {
    expect(jsonPlaylist.loadPlaylist()).to.not.throw;
  });
  it("Test loadArtista => not to throw", () => {
    expect(jsonPlaylist.loadArtista()).to.not.throw;
  });
  it("Test loadGenero => not to throw", () => {
    expect(jsonPlaylist.loadGenero()).to.not.throw;
  });
  it("Test loadGrupo => not to throw", () => {
    expect(jsonPlaylist.loadGrupo()).to.not.throw;
  });
  it("Test loadGrupo => not to throw", () => {
    expect(jsonPlaylist.getPlaylistPrint()).to.not.throw;
  });

  it("Test addPlaylist => not to throw", () => {
    expect(jsonPlaylist.addPlaylist('Exitos Don Omar', [cancion1, cancion2])).to.not.throw;
  });

  it("Test addAlbum => not to throw", () => {
    expect(jsonPlaylist.addAlbum('Los Bandoleros 2', 2020, "Dile", "Don Omar")).to.not.throw;
  });

  it("Test addCancion => not to throw", () => {
    expect(jsonPlaylist.addCancion("Pa tu casa", ["Don Omar"], 3.24, ["Reggaeton"], true, 306730425, 2003)).to.not.throw;
  });

  it("Test addArtista => not to throw", () => {
    expect(jsonPlaylist.addArtista("Chopin", ["Clasica"], ["Composiciones"], ["Preludio"], 123456789)).to.not.throw;
  });

  it("Test addGenero => not to throw", () => {
    expect(jsonPlaylist.addGenero("Clasica", ["Chopin"], ["Composiciones"], ["Preludio"])).to.not.throw;
  });

  it("Test removeAlbum => not to throw", () => {
    expect(jsonPlaylist.removeAlbumm('Los Bandoleros 2')).to.not.throw;
  });

  it("Test removeCancion => not to throw", () => {
    expect(jsonPlaylist.removeCancion('Pa tu casa')).to.not.throw;
  });

  it("Test addGrupo => not to throw", () => {
    expect(jsonPlaylist.addGrupo("Pignoise", ["Manolo", "Pepe"], 2003, ["Pop rock"], ["Fisica o quimica"], 1234567876)).to.not.throw;
  });

  it("Test removeGrupo => not to throw", () => {
    expect(jsonPlaylist.removeGrupo('Pignoise')).to.not.throw;
  });

  it("Test removeGenero => not to throw", () => {
    expect(jsonPlaylist.removeGenero('Clasica')).to.not.throw;
  });

  it("Test removeArtista => not to throw", () => {
    expect(jsonPlaylist.removeArtista('Chopin')).to.not.throw;
  });

  it("Test removePlaylist => not to throw", () => {
    expect(jsonPlaylist.removePlaylist('Exitos Don Omar')).to.not.throw;
  });



});
