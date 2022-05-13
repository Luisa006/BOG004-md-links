const { error } = require("console");
const fs = require("fs");
const { resolve } = require("path");
const path = require("path");
// const { openStdin } = require("process");
const process = require("process");
const { default: fetch } = require("node-fetch");

// mdlinks(route);
const route = process.argv[2];
// Verifica si la ruta es absoluta, y si no la convierte
const pathAbsolute = (route) => path.isAbsolute(route) ? route : path.resolve(route);
// Verifica si la extension es MD
const fileMD = (route) => path.extname(route) === '.md' ? route : "";//"Archivo no compatible con la busqueda";

//----------si es archivo o directorio?--------------
const identify = (route) => {
  let files = []
  return new Promise((resolve, reject) => {
    fs.stat(route, (err, stats) => {
      if (err) {
        reject('La ruta no existe');
      } else if (stats.isFile()) {
        if (fileMD(route) === route) {
          files.push(route)
          resolve(files)
        }
      }
      else if (stats.isDirectory()) {
        files = recursion(route)
        resolve(files)
      }
    });
  })
};

//---- leer un archivo----
const readFiles = (route) => {
  return new Promise((resolve, reject) => {
    fs.promises.readFile(route, 'utf-8')
      .then(resp => {
        resolve(resp)
      })
      .catch(() => reject('Error en la lectura del archivo'))
  });
};

//
const getLinks = (arrayMD) => {
  return new Promise((resolve, reject) => {
    let arr = []
    arrayMD.forEach((md) => {
      getObjects(md)
        .then((resp) => {
          arr.push(resp)
          resolve(arr.flat())
        })
    })
  })
}

//Funcion de extrear links
const getObjects = (file) => {
  return new Promise((resolve, reject) => {
    let arrContentObj = []
    let arrMatches = []
    const retMdLinks = /\[([^\[]+)\](\(.*\))/gm;
    readFiles(file)
      .then((resp) => {
        arrMatches = resp.match((retMdLinks));
        if (arrMatches !== null) {
          const singleMatch = /\[([^\[]+)\]\((.*)\)/;
          arrMatches.forEach((link) => {
            const match = singleMatch.exec(link)
            arrContentObj.push({
              href: match[2],
              text: match[1].substring(0, 50),
              file,
            })
          })
          resolve(arrContentObj)
        } else {
          console.log('no hay links');
        }
      })
      .catch((error) => console.log(error));
  })
}

//----- lee un directorio/ funcion recursiva---
const recursion = (route) => {
  let newArr = [];
  let recursive = []
  let array = fs.readdirSync(route);
  array.forEach((item) => {
    const newRoute = path.resolve(route, item);
    switch (path.extname(newRoute)) {
      case ".md": {
        newArr.push(newRoute);
        break;
      }
      case "": {
        recursive = recursive.concat(recursion(newRoute));
        if (recursive.length > 0) {
          newArr.push(...recursive);
        }
        break;
      }
    }
  });
  return newArr;
};
const statsLinks = (res) => {
  return {
    total: res.length,
    unique: new Set(res.map(({ href }) => href)).size,
  }
}
const statsBrokens = (res) => {
  const brokens = res.filter(link => link.result === 'FAIL').length
  return {
    total: res.length,
    unique: new Set(res.map(({ href }) => href)).size,
    broken: brokens
  }
}

// Validacion http
const validateHttp = (arr) => {
  const arrValidate = arr.map((link) => {
    return fetch(link.href)
      .then((response) => {
        if (response.status >= 200 && response.status <= 399) {
          link.status = response.status,
            link.result = 'OK'
          return link
        } else if (response.status >= 400 && response.status <= 499) {
          link.status = response.status,
            link.result = 'FAIL'
          return link
        }
      })
      .catch((error) => console.log(error))
  })
  return Promise.all(arrValidate)
}

// función mdlinks -------
const mdlinks = (path, options) => {
  return new Promise((resolve, reject) => {
    identify(pathAbsolute(path))
      .then((response) => getLinks(response))
      .then((resp) => {
        if (!options.validate && !options.stats) {
          resolve(resp)
        }
        return validateHttp(resp)
      })
      .then(response => {
        if (options.validate && options.stats) {
          resolve(statsBrokens(response));
        } else if (options.validate) {
          resolve(response)
        } else if (options.stats) {
          const stats = statsLinks(response);
          resolve(stats);
        }
      })
      .catch((error) => reject('La ruta no es valida'))
  })
}
module.exports = mdlinks, readFiles;









