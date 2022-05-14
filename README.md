# Markdown Links

## Índice

* [1. Preámbulo](#1-preámbulo)
* [2. Descripción](#2-resumen-del-proyecto)
* [3. Diagrama de flujo](#4-diagrama-de-flujo)
* [4. Instalación ](#3-instalación)
* [5. Guía de uso](#4-guia-de-uso)
* [6. Tecnologías utilizadas](#6-tecnologías-utlizadas)
* [7. Autor](#7-autor)
***

## 1. Preámbulo 

Markdown es un lenguaje de marcado ligero muy popular entre developers. Es usado en muchísimas plataformas que manejan texto plano (GitHub, foros, blogs, ...), y es muy común encontrar varios archivos en ese formato en cualquier tipo de repositorio (empezando por el tradicional README.md).
Estos archivos Markdown normalmente contienen links (vínculos/ligas) que muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de la información que se quiere compartir.
Dentro de una comunidad de código abierto, nos han propuesto crear una herramienta usando Node.js, que lea y analice archivos en formato Markdown, para verificar los links que contengan y reportar algunas estadísticas.

## 2. Descripción 📝

Es una herramienta de línea de comando(CLI) y una librería, que permite extraer los links de un archivo tipo Markdown(md), e identifica cuales están funcionando y cuales están rotos. Adicionalmente esta información se puede entregar al usuario como estadísticas donde se puede ver:
* Total de links
* Links únicos
* Links rotos

## 3. Diagrama de flujo

Para llevar a cabo el proyecto se hizo necesario realizar un diagrama de flujo. El cual se muestra a continuación:
![image](https://user-images.githubusercontent.com/97484586/168404292-ed40890c-24a3-4bb6-98cc-c7a84d82ab0a.png)
![image](https://user-images.githubusercontent.com/97484586/168404330-db2fed8c-eed7-4734-8dbf-2c988865d181.png)

## 4. Instalación 💻

Para hacer uso de la librería ejecuta en la terminal el siguiente comando:
* npm install md-links-daniela1421

## 5. Guía de uso 📇

Para utilizar esta librería puedes ejecutar los siguientes comandos:
1. Si necesitas conocer la ruta de donde proviene los links, su enlace, e información sobre este, solo ingresas la ruta --> mdlinks <path>

![image](https://user-images.githubusercontent.com/92064924/168402857-08c61595-16ff-407e-815d-e398fb845f7c.png)

 2. Si además de la información anterior necesitas conocer si los enlaces en tu archivo están funcionando o no, ingresas el siguiente comando: mdlinks <path> --v ó mdlinks <path> --validate

 ![image](https://user-images.githubusercontent.com/92064924/168403109-82db34f7-b742-4d47-9db3-d9ffd69ba497.png)

3. Si quieres saber cuantos links hay en total en tu archivo o directorio, y cuantos son unicos, ingresa: mdlinks <path> --s ó mdlinks <path> --stats

![image](https://user-images.githubusercontent.com/92064924/168403260-58b8cba2-17ef-4a6d-804b-864d823db4e6.png)

4. Por último, si deseas consultar cuantos links se encuentran rotos, puedes ingresar:
  mdlinks <path> --s --v ó mdlinks <path> --stats --validate

 ![image](https://user-images.githubusercontent.com/92064924/168403361-f7f186d6-dba6-4ee9-b304-c4db39ef04e9.png)

## 6. Tecnologias utilizadas 🛠️

* [Node](https://nodejs.org/es/) - Utilizado para ejecutar javascript en consola
* [Lucid.app](https://lucid.app/es-LA/users/login#/login?clearStorage=true) - Utilizado para la creación del diagrama de flujo
* [JAVASCRIPT](https://developer.mozilla.org/es/docs/Web/JavaScript) - Lenguaje de programación
* [GitHub](https://github.com/)- Usado guardar el repositorio del proyecto

## 7. Autor ✒️

* **Luisa Martínez** - [Luisa006](https://github.com/Luisa006)
