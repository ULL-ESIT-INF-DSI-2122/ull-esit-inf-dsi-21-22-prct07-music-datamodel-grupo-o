# Práctica  - Clases e interfaces genéricas. Principios SOLID

```
Curso: 2021- 2022
Universidad: Universidad de La laguna
Asignatura: Desarrollo de Sistemas Informaticos
Herramienta: Visual Studio Code
Lenguaje de programción: TypeScipt
```

# 07 - Digitalizando la colección de música de los abuelos

```
>>  PROYECTO: Un sistema de bibliteca musical
>>  EQUIPO: Grupo_O
>>  CURSO: 2021 - 2022
>>  COMPONENTES: XueMei Lin
>>               Noelia Ibáñez Silvestre
>>               Andrea Hernandez Martín
>>               Stephanie Andreína Arismendi Escobar
>>  EMAIL:       alu0101225845@ull.edu.es
>>               alu0101225555@ull.edu.es
>>               alu0101119137@ull.edu.es
>>               alu0101351728@ull.edu.es
>>  UNIVERSIDAD: Universidad de La Laguna
>>  ASIGNATURA:  Desarrollo de Sistemas informáticos
>>  VERSION:     0.0.1
>> Herramienta: Visual Studio Code
>> Lenguaje de programción: TypeScript
```

## 1. Introducción
Esta práctica consiste en llevar a cabo un diseño del modelo de datos de un sistema de información que permita almacenar una biblioteca musical. Además, dicho diseño se tendrá que implementar con el lenguaje de programación TypeScript.    

## 2. Objetivos
El objetivo de esta práctica es aprender a diseñar e implementar un modelo de datos siguiendo el diseño orientado a objetos. También, se debe aprender a utilizar las herramientas descritas en clase, las cuales son la documentación mediante TypeDoc, las pruebas unitarias del código fuente con Mocha y Chai, siguiendo la metodología TDD o BDD, el uso de Instanbull y Coveralls para el cubrimiento de código, con la integración continua con Github Actions y la comprobación de la calidad del código mediante Sonar Cloud. Además, se debe aprender el uso de Inquier y Lowdb para gestionar una base de datos por la consola.

## 3. Biblioteca Musical
La biblioteca musical almacena la información necesaria para poder representar playlists y canciones, además de reprensentar el género musical, los artitas, los grupos y albumes de ambas. También se encarga de manejar las playlists para que el usuario de la biblioteca pueda ver todos los datos almacenados dentro de ella, así como modificar, añadir y eliminar canciones y playlists.  En primer lugar, para realizar la representación de los datos, se creó una clase para cada tipo de datos a almacenar, las cuales se van a comentar a continuación.  
- **Clase Genero Musical**: esta clase es la encargada de representar un género musical, los atributos que permiten la representación de dicha clase son el nombre del género musical, un array con todos los grupos o artitas que producen música de ese género, un array con los álbumes que hay relacionados con ese género y un array con todas las canciones que tienen ese género musical.  Los métodos implementados en esta clase son todos métodos que permiten acceder a cada atributo (getters) debido a que todos los atributos son privados en la clase.  
- **Clase Cancion**: esta clase es la encargada de representar una canción, los atributos que permiten la representación de dicha clase son el nombre de la canción, el autor, la duración, los géneros musicales que tiene dicha canción, un atributo que dice si la canción es un single o no, el número de reproducciones totales y la fecha de lanzamiento de la canción. Los métodos implementados en esta clase son los métodos que permiten acceder a cada atributo (getters) debido a que todos los atributos son privados en la clase y también se implementó un único método que modifica el número de reproducciones (setter) ya que es el único atributo que puede cambiar.  
- **Clase Álbum**: esta clase es la encargada de representar un álbum, los atributos que permiten la representación de dicha clase son el nombre del álbum, el nombre del grupo o artista que lo publicó, el año de publicación, un array con los géneros musicales que lo componen y un array con todas las canciones que perteneces al album. Los métodos implementados en esta clase son los métodos que permiten acceder a cada atributo (getters) debido a que todos los atributos son privados en la clase. También se implementó un método que añade canciones nuevas, otro método que añade los géneros de una canción y por último, otro método que añade todos los géneros de todas las canciones al album.  
- **Clase Grupos**: esta clase es la encargada de representar un grupo musical, los atributos que permiten la representación de dicha clase son el nombre del grupo, un array con todos los artistas que forman el grupo, el año de creación, un array con los géneros musicales que produce el grupo, un array con todos los álbumes en los que ha participado, otro array con todas las canciones publicadas por ese grupo y la cantidad de oyentes mensuales.  

##  4. Conclusiones

En esta práctica, he aprendido más cosas que están relacionado con

## 5. Bibliografía
- [Clases abstractas e interfaces](https://ifgeekthen.everis.com/es/clases-abstractas-e-interfaces)
- [Relaciones de clases abstractas](https://qastack.mx/programming/597769/how-do-i-create-an-abstract-base-class-in-javascript)
- [Clases y metodos](https://lenguajejs.com/javascript/caracteristicas/clases-es6/)
- [Apuntes de la clases](https://ull-esit-inf-dsi-2122.github.io/typescript-theory/)
- [Guión de la práctica](https://ull-esit-inf-dsi-2122.github.io/prct07-music-dataModel/)
