import 'mocha';
import {expect} from 'chai';
import {Cancion} from '../src/cancion';
import {Playlist} from '../src/playlist';
import {Gestor} from '../src/gestor';

describe('Tests de la clase Gestor', () => {
  const cancion = new Cancion('Cesde mis Ojos', ['Chris Lebron'], 1.8, ['Reggaeton', 'trap'], false, 5237187, 2000);
  const cancion2 = new Cancion('Ajos', ['Lebron', 'Max'], 2.49, ['Hip'], false, 15537187, 2020);
  const newPlay = new Playlist("hola", [cancion, cancion2]);
  const newPlay2 = new Playlist("mundo", [cancion2]);
  // const gestor = new Gestor([newPlay, newPlay2]);

  it('Se crea la clase Gestor correctamente', () => {
    expect(new Gestor([newPlay, newPlay2])).to.be.not.null;
  });
  // it('Se llama al menú del usuario correctamente', () => {
  //   expect(gestor.menuUser());
  // });
  // it('Se imprimen todas las playlists correctamente', () => {
  //   expect(gestor.imprimir());
  // });
  // it('Se visualizan las playlist existentes correctamente', () => {
  //   expect(gestor.visualizar());
  // });
  // it('Se navega por una playlist específica correctamente', () => {
  //   expect(gestor.navegar());
  // });
  // it('Se ordena una playlist específica correctamente', () => {
  //   expect(gestor.ordenPlaylist(newPlay, 'titulo', 'ascendente'));
  //   expect(gestor.ordenPlaylist(newPlay, 'titulo', 'descendente'));
  //   expect(gestor.ordenPlaylist(newPlay, 'nombre', 'ascendente'));
  //   expect(gestor.ordenPlaylist(newPlay, 'nombre', 'descendente'));
  //   expect(gestor.ordenPlaylist(newPlay, 'year', 'ascendente'));
  //   expect(gestor.ordenPlaylist(newPlay, 'year', 'descendente'));
  //   expect(gestor.ordenPlaylist(newPlay, 'duracion', 'ascendente'));
  //   expect(gestor.ordenPlaylist(newPlay, 'duracion', 'descendente'));
  //   expect(gestor.ordenPlaylist(newPlay, 'genero', 'ascendente'));
  //   expect(gestor.ordenPlaylist(newPlay, 'genero', 'descendente'));
  //   expect(gestor.ordenPlaylist(newPlay, 'reproducciones', 'ascendente'));
  //   expect(gestor.ordenPlaylist(newPlay, 'reproducciones', 'descendente'));
  // });

  // it('Se crea una playlist y se añaden canciones correctamente', () => {
  //   expect(gestor.crear());
  // });  
  // it('Se borra una playlist específica correctamente', () => {
  //   expect(gestor.borrar());
  // });
});