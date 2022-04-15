import 'mocha';
import {expect} from 'chai';
import {JsonPlaylist} from "../src/jsonPlaylistCollection";
import {Cancion} from '../src/cancion';

console.log = function() {};
describe('Test para la clase Playlists Collection', () => {
  const jsonPlaylistCollection = new JsonPlaylist();
  const cancion1 = new Cancion("Dile", ["Don Omar"], 3.24, ["Reggaeton"], true, 306730425, 2003);
  const cancion2 = new Cancion("Bandoleros", ["Don Omar", "Tego Calderon"], 5.05, ["Reggaeton"], false, 210011575, 2015);
  it("Test getPlaylistMap => Playlist de la colección", () => {
    expect(jsonPlaylistCollection.getPlaylistMap()).to.not.throw;
    expect(jsonPlaylistCollection.getPlaylistMap()).to.not.be.null;
  });
  it("Test getAlbumMap => Albumes de la colección", () => {
    expect(jsonPlaylistCollection.getAlbumMap()).to.not.throw;
    expect(jsonPlaylistCollection.getAlbumMap()).to.not.be.null;
  });
  it("Test getCancionMap => Canciones de la colección", () => {
    expect(jsonPlaylistCollection.getCancionMap()).to.not.throw;
    expect(jsonPlaylistCollection.getCancionMap()).to.not.be.null;
  });
  it("Test getGeneroMap => Generos de la colección", () => {
    expect(jsonPlaylistCollection.getGeneroMap()).to.not.throw;
    expect(jsonPlaylistCollection.getGeneroMap()).to.not.be.null;
  });
  it("Test getGrupoMap => Grupos de la colección", () => {
    expect(jsonPlaylistCollection.getGrupoMap()).to.not.throw;
    expect(jsonPlaylistCollection.getGrupoMap()).to.not.be.null;
  });
  it("Test getArtistaMap => Artistas de la colección", () => {
    expect(jsonPlaylistCollection.getArtistaMap()).to.not.throw;
    expect(jsonPlaylistCollection.getArtistaMap()).to.not.be.null;
  });
  it("Test getPlaylistMap => Playlists de la colección", () => {
    expect(jsonPlaylistCollection.getPlaylistMap()).to.not.throw;
    expect(jsonPlaylistCollection.getArtistaMap()).to.not.be.null;
  });
  it("Test loadCancion => not to throw", () => {
    expect(jsonPlaylistCollection.loadCancion()).to.not.throw;
  });
  it("Test loadAlbum => not to throw", () => {
    expect(jsonPlaylistCollection.loadAlbum()).to.not.throw;
  });
  it("Test loadPlaylist => not to throw", () => {
    expect(jsonPlaylistCollection.loadPlaylist()).to.not.throw;
  });
  it("Test loadArtista => not to throw", () => {
    expect(jsonPlaylistCollection.loadArtista()).to.not.throw;
  });
  it("Test loadGenero => not to throw", () => {
    expect(jsonPlaylistCollection.loadGenero()).to.not.throw;
  });
  it("Test loadGrupo => not to throw", () => {
    expect(jsonPlaylistCollection.loadGrupo()).to.not.throw;
  });
  it("Test addPlaylist => not to throw", () => {
    expect(jsonPlaylistCollection.addPlaylist('Exitos Don Omar', [cancion1, cancion2])).to.not.throw;
  });
  it("Test removeAlbum => not to throw", () => {
    expect(jsonPlaylistCollection.removeAlbumm('Let It Be')).to.not.throw;
  });
  it("Test removeCancion => not to throw", () => {
    expect(jsonPlaylistCollection.removeCancion('Dile')).to.not.throw;
  });
  it("Test removeGrupo => not to throw", () => {
    expect(jsonPlaylistCollection.removeGrupo('Imagine Dragons')).to.not.throw;
  });
  it("Test removeGenero => not to throw", () => {
    expect(jsonPlaylistCollection.removeGenero('Rock')).to.not.throw;
  });
  it("Test removeArtista => not to throw", () => {
    expect(jsonPlaylistCollection.removeArtista('Miley Cyrus')).to.not.throw;
  });
  it("Test removePlaylist => not to throw", () => {
    expect(jsonPlaylistCollection.removePlaylist('playlistFavorito')).to.not.throw;
  });
});
