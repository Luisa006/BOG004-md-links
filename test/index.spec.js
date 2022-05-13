const mdlinks = require('../index.js');
const readFiles = require('../index.js');
const path = './test/pruebasTest/archivo1.md';

describe('mdLinks', () => {
  it('should be a function', () => {
    expect(typeof mdlinks).toBe('function');
  });
  /*it('should return a promise', (done) => {
    // jest.setTimeout(30000);
    expect(readFiles(path) instanceof Promise).toBeTruthy()
  });*/
  it('should return validate: false ', (done) => {
    mdlinks(path, {}).then((result) => {
      const expected = [
        {
          href: 'https://nodejs.org/',
          text: 'Node.js',
          file: 'C:\\Users\\Usuario\\Desktop\\MD links\\BOG004-md-links\\test\\pruebasTest\\archivo1.md'
        },
        {
          href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
          text: 'Funciones — bloques de código reutilizables - MDN',
          file: 'C:\\Users\\Usuario\\Desktop\\MD links\\BOG004-md-links\\test\\pruebasTest\\archivo1.md'
        }
      ];
      expect(result).toEqual(expected)
      done();
    });
  });
  it('should return validate: true ', (done) => {
    mdlinks(path, { validate: '--v' }).then((result) => {
      const expected = [
        {
          href: 'https://nodejs.org/',
          text: 'Node.js',
          file: 'C:\\Users\\Usuario\\Desktop\\MD links\\BOG004-md-links\\test\\pruebasTest\\archivo1.md',
          status: 200,
          result: 'OK'
        },
        {
          href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
          text: 'Funciones — bloques de código reutilizables - MDN',
          file: 'C:\\Users\\Usuario\\Desktop\\MD links\\BOG004-md-links\\test\\pruebasTest\\archivo1.md',
          status: 404,
          result: 'FAIL'
        }
      ];
      expect(result).toEqual(expected)
      done();
    });
  });
  it('should return stats: true ', (done) => {
    mdlinks(path, { stats: '--s' }).then((result) => {
      const expected = { total: 2, unique: 2 }
      expect(result).toEqual(expected)
      done();
    });
  });
  it('should return validate: true - stats: true ', (done) => {
    mdlinks(path, { validate: '--v', stats: '--s' }).then((result) => {
      const expected = { total: 2, unique: 2, broken: 1 }
      expect(result).toEqual(expected)
      done();
    });
  });
  it('should return error mdlinks ', (done) => {
    mdlinks(('./pruebasTest/archivo3.md'), {}).catch((result) => {
      const expected = 'La ruta no es valida';
      expect(result).toEqual(expected)
      done();
    });
  });
});
describe('readfiles', () => {
  it('should return error readFiles ', (done) => {
    readFiles(('./pruebasTest/text.txt'), {}).catch((result) => {
      const expected = 'La ruta no es valida';
      expect(result).toEqual(expected)
      done();
    });
  });
});
