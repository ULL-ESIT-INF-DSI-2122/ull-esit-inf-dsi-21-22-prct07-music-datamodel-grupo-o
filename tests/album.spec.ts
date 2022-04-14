import 'mocha';
import {expect} from 'chai';
import {Album} from '../src/album';
import {Cancion} from '../src/cancion';

const DriversLicense = new Cancion('Drivers License', ['Olivia Rodrigo'], 4.02, ['bedroom pop',
  'indie pop', 'power pop'], false, 1357546820, 2021);
const Good4U = new Cancion('Good 4 U', ['Olivia Rodrigo'], 2.58, ['Pop punk',
  'pop rock', 'teen pop'], false, 1339674630, 2021);
const Traitor = new Cancion('Traitor', ['Olivia Rodrigo'], 2.58, ['Pop punk',
  'pop rock', 'teen pop'], false, 702172687, 2021);
const Sour = new Album('Sour', 2021, [DriversLicense, Good4U], 'Olivia Rodrigo');

describe('Test para la clase Album', () => {
  it("Test GetNombre => Sour", () => {
    expect(Sour.getNombre()).to.be.equal('Sour');
  });
  it("Test GetArtista => Olivia Rodrigo", () => {
    expect(Sour.getArtista()).to.be.equal('Olivia Rodrigo');
  });
  it("Test GetYear =>  2021", () => {
    expect(Sour.getYear()).to.be.equal(2021);
  });
  it("Test getCanciones =>  Good 4 U and Drivers License", () => {
    expect(Sour.getCanciones()).to.be.deep.equal([DriversLicense, Good4U]);
  });
  it("Test AddCancion = > to not throw", () => {
    expect(Sour.addCancion(Traitor)).to.not.throw;
  });
  it("Test getCanciones = > Good 4 U, Drivers License & Traitor", () => {
    expect(Sour.getCanciones()).to.be.deep.equal([DriversLicense, Good4U, Traitor]);
  });
  it("Test setGeneros = > not throw", () => {
    expect(Sour.setGeneros(DriversLicense)).to.not.throw;
  });
  it("Test addGenerosAllSongs => not to throw", () => {
    expect(Sour.addGenerosAllSongs()).to.not.throw;
  });
  it("Test GetGeneros = > Todos los géneros de las canciones", () => {
    expect(Sour.getGeneros()).to.be.deep.equal(['bedroom pop',
      'indie pop', 'power pop', 'Pop punk',
      'pop rock', 'teen pop']);
  });
});
