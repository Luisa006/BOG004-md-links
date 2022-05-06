// module.exports = () => {
//   // ...
// };


const fs = require('fs');
const { resolve } = require('path');
// const { rejects } = require('assert');
const path = require('path');
const process = require('process');
const markdownLinkExtractor = require('markdown-link-extractor');
const { log } = require('console');

// mdlinks(route);

const route = process.argv[2];

// --------verifica si la ruta existe ----------
const pathExist = (route) => {
  return new Promise((resolve, reject) => {
    fs.stat(route, (err, stats) => {
      if (err) {
        // console.log('La ruta no existe');
        reject('La ruta no existee')
      } else {
        // console.log('Ruta existente')
        resolve(route)
      }
    });
  })
};
pathExist(route)
  .then(response => console.log('path existeee', response))
  .catch(err => console.log(err))

//----Valida si la ruta es absoluta, si es relatva la convierte a absoluta------
const pathAbsolute = (route) => {
  return new Promise((resolve, reject) => {
    if (path.isAbsolute(route) === true) {
      resolve(route)
    } else {
      resolve(path.resolve(route))
      // console.log('convertidaaaa', path.resolve(route));
    }
    reject('Ruta invalida')
  })

}
pathAbsolute(route)
  .then(response => console.log('convertidaaa', response))
  .catch(err => console.log(err))

//----------si es archivo directorio
const identify = (route) => {
  return new Promise((resolve, reject) => {
    fs.stat(route, (err, stats) => {         
      if (err) {
        reject('La ruta no existe');
      } else if (stats.isFile()) {
        if (path.extname(route) === '.md') {
          console.log('Es .md');
          // readFiles(route).then(response => console.log('readfileees md', response));          
          // resolve(readFiles(route));//buscar ext
        } else {
          console.log('Este archivo no es compatible con la busqueda');
        }
      }
      else if (stats.isDirectory()) {
        resolve(recursion(route)); // llamar a la funcion recursiva, preguntar si es archivo y buscar extension
      }
    });
  })
};
identify(route)
  .then(response => console.log('identify', response))
  .catch(err => console.log(err))

//---- leer un archivo----
const readFiles = (route, UTF) => {
  return new Promise((resolve, reject) => {
    fs.readFile(route, UTF, (err, data) => {
      if (err) reject('No se pudo leer el archivo');
      if (data) resolve(data);
    })
  });
};
readFiles(route, 'utf-8').then((response) => {
  // console.log('dataaaa', response)
  let expresion = /(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/g;
  let arrayLink = response.match(expresion);
  console.log(arrayLink);
  return arrayLink;
}).catch(err => console.log(err))

//----- lee un directorio/ funcion recursiva--- 
let newArr = [];
const recursion = (route) => {
  let array = fs.readdirSync(route)
  array.forEach((item) => {
    const newRoute = path.resolve(route, item);
    console.log(newRoute);
    switch (path.extname(newRoute)) {
      case '.md': {
        newArr.push(newRoute)
        break
      }
      case '': {
        let recursive = recursion(newRoute)
        if (recursive.length > 0) {
          newArr.push(...recursive)
        }
        break
      }
    }
  });
  return newArr
};






// console.log(recursion(route));





    // return new Promise((resolve, reject) => {
    //   fs.stat(route, (err, stats) => {
    //     if (err) {
    //       reject('La ruta no existe');
    //      } else if (stats.isDirectory()) {
    //         resolve(recursion(route)); // llamar a la funcion recursiva, preguntar si es archivo y buscar extension
    //     } else if(path.extname(newRoute) === '.md') {
    //       resolve (newArr.push(newRoute));
    //       } 
    //     });     
    //   });
    // })
    // fs.stat(newRoute, (err, stats) => {
    //   if (err) {
    //     console.log('La ruta no existe', err);
    //   }
    //   if (stats.isDirectory()) {
    //     console.log('el otro dir', recursion(newRoute))
    //   } else if (path.extname(newRoute) === '.md'){
    //   newArr.push(newRoute)
    //   }     
    //     // console.log('MD', newRoute)      
    // })
 
  // console.log('newArr', newArr)



















// new Promise((resolve, reject))





// fs.writeFile('data1.txt', 'hola lu -despierta', (error)=>{
//   if (error) {
//     console.log(`Error: ${error}`);
//   }
// });
// fs.readFile('data1.txt', 'utf-8', (error, data)=>{
// if (!error){
//   console.log(data);
// } else {
//   console.log(`Error: ${error}`);
// }
// });

// alt 92 backslash



