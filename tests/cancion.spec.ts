import 'mocha';
import { expect } from 'chai';
import { Cancion } from '../src/cancion';

describe('Tests de la clase Cancion', () => {
  const cancion1 = new Cancion('Desde mis Ojos', 'Chris Lebron', 2.49, ['Reggaeton'], false, 5237187);
  // const cancion2 = new Cancion('Lágrimas desordenadas', 'Melendi', 3.49, ['Pop rock'], false, 41559577);
  it('Se crea correctamente la clase', () => {
    expect(new Cancion('Desde mis Ojos', 'Chris Lebron', 2.49, ['Reggaeton'], true, 5237187));
  });
  it('Se accede al nombre de la cancion correctamente', () => {
    expect(cancion1.getNombre()).to.be.equal('Desde mis Ojos');
  });
  it('Se accede al autor de la cancion correctamente', () => {
    expect(cancion1.getAutor()).to.be.equal('Chris Lebron');
  });
  it('Se accede a la duracion de la cancion correctamente', () => {
    expect(cancion1.getDuracion()).to.be.equal(2.49);
  });
  it('Se accede a los géneros musicales de la cancion correctamente', () => {
    expect(cancion1.getGeneros()).to.be.eql(['Reggaeton']);
  });
  it('La canción no es un single', () => {
    expect(cancion1.getSingle()).to.be.equal(false);
  });
  it('Se accede al número de reproducciones de la cancion correctamente', () => {
    expect(cancion1.getNumeroReproducciones()).to.be.equal(5237187);
  });
  it('Se modifica el número de reproducciones de la cancion correctamente', () => {
    expect(cancion1.setNumeroReproducciones(7237187));
  });
});