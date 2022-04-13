# 07 - Digitalizando la colección de música de los abuelos
```
Curso: 2021- 2022
Universidad: Universidad de La laguna
Asignatura: Desarrollo de Sistemas Informaticos
Herramienta: Visual Studio Code
Lenguaje de programción: TypeScipt
```

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
El objetivo de esta práctica es aprender a diseñar e implementar un modelo de datos siguiendo el diseño orientado a objetos. También, se debe aprender a utilizar las herramientas descritas en clase, las cuales son la documentación mediante TypeDoc, las pruebas unitarias del código fuente con Mocha y Chai, siguiendo la métodología TDD o BDD, el uso de Instanbull y Coveralls para el cubrimiento de código, con la integración continua con Github Actions y la comprobación de la calidad del código mediante Sonar Cloud. Además, se debe aprender el uso de Inquier y Lowdb para gestionar una base de datos por la consola.

## 3. Biblioteca Musical
La biblioteca musical almacena la información necesaria para poder representar playlists y canciones, además de reprensentar el género musical, los artitas, los grupos y albumes de ambas. También se encarga de manejar las playlists para que el usuario de la biblioteca pueda ver todos los datos almacenados dentro de ella, así como modificar, añadir y eliminar canciones y playlists.  En primer lugar, para realizar la representación de los datos, se creó una clase para cada tipo de datos a almacenar, las cuales se van a comentar a continuación.  

### 3.1. Clase Genero Musical
Esta clase es la encargada de representar un género musical, los atributos que permiten la representación de dicha clase son el nombre del género musical, un array con todos los grupos o artitas que producen música de ese género, un array con los álbumes que hay relacionados con ese género y un array con todas las canciones que tienen ese género musical.  Los métodos implementados en esta clase son todos métodos que permiten acceder a cada atributo (getters) debido a que todos los atributos son privados en la clase.

### 3.2. Clase Cancion
Esta clase es la encargada de representar una canción, los atributos que permiten la representación de dicha clase son el nombre de la canción, el autor, la duración, los géneros musicales que tiene dicha canción, un atributo que dice si la canción es un single o no, el número de reproducciones totales y la fecha de lanzamiento de la canción. Los métodos implementados en esta clase son los métodos que permiten acceder a cada atributo (getters) debido a que todos los atributos son privados en la clase y también se implementó un único método que modifica el número de reproducciones (setter) ya que es el único atributo que puede cambiar. 

### 3.3. Clase Álbum
Esta clase es la encargada de representar un álbum, los atributos que permiten la representación de dicha clase son el nombre del álbum, el nombre del grupo o artista que lo publicó, el año de publicación, un array con los géneros musicales que lo componen y un array con todas las canciones que perteneces al album. Los métodos implementados en esta clase son los métodos que permiten acceder a cada atributo (getters) debido a que todos los atributos son privados en la clase. También se implementó un método que añade canciones nuevas, otro método que añade los géneros de una canción y por último, otro método que añade todos los géneros de todas las canciones al album.  

### 3.4. Clase Grupos
Esta clase es la encargada de representar un grupo musical, los atributos que permiten la representación de dicha clase son el nombre del grupo, un array con todos los artistas que forman el grupo, el año de creación, un array con los géneros musicales que produce el grupo, un array con todos los álbumes en los que ha participado, otro array con todas las canciones publicadas por ese grupo y la cantidad de oyentes mensuales. Los métodos implementados en esta clase son los métodos que permiten acceder a cada atributo (getters) debido a que todos los atributos son privados en la clase. Además de implementar un método que permite modificar el atributo de oyentes mensuales (setter) ya que es un atributo que se debe cambiar mensualmente. También se implementó un método que permite añadir artistas nuevos, otro que permite añadir álbumes y por último, otro método que permite añadir un género musical al grupo.  

### 3.5. Clase Artista
Esta clase es la encargada de representar un artista, los atributos que permiten la representación de dicha clase son el nombre del artista, el nombre del grupo al que pertenece, un array con todos los géneros musicales que compone, otro array con todos los álbumnes en los que aparece, un array con todas las canciones que ha publicado y la cantidad de oyentes mensuales. Los métodos implementados en esta clase son los métodos que permiten acceder a cada uno de los atributos de la clase (getters) debido a que todos ellos son privados en la clase. También se implementó un método que calcula los oyentes mensuales del artista de forma que suma los oyentes de los grupos a los que pertenece el artista más el número de reproducciones de las canciones del mismo artista y se divide entre 12, obteniendo así el número de oyentes mensuales.  

### 3.6. Clase Playlist
Esta clase es la encargada de representar una playlist, los atributos que permiten la representación de dicha clase son el nombre de la playlist, un array con todas las canciones incluidas dentro de esa playlist, la duración total de la playlist y los géneros musicales que tiene la playlist. Los métodos implementados en esta clase son los métodos que permiten acceder a cada uno de los atributos (getters) debido a que todos los atributos son privados en la clase. Y también se implementó un método que añade canciones nuevas a la playlist.

### 3.7. Clase Gestor
Esta clase es la encargada de gestionar, como su nombre indica, las peticiones del programa. Se construye pasando como parámetro un array de `Playlist` que contiene todas las playlist de la aplicación. Seguidamente lo mapeará y almacenará sus características principales: `Canciones`, `Duracion` y `Generos`.
También cuenta con un método de impresión, que muestra los datos de todas las playlist, y es usado en el método visualizar (prácticamente lo mismo, pero añadiendo que el menú aparezca una vez se impriman). Otras opciones implementadas son las de navegar una playlist y mostrar la información de la misma, así como crear, ordenarlas y eliminarlas. Todo ello se realiza desde `menuUser`, con un switch de comandos que hace uso de `Inquirer`.

### 3.8. Clase jsonPlaylist
Esta clase es la encargada de gestionar la lectura y escritura en la base de datos json del programa, extentiendo de la `Clase Gestora`. Al constructor se le pasa un nombre de usuuario y todas las playlist de la aplicación. Si la base de datos ya tiene la playlist, entonces  se mapea; en caso contrario se escribe.  

### 3.9. Clase App ( Donde inicializa la aplicacion )
El funcionaimiento de la aplicacion consiste en la `class app`, donde en el constructor inicializa a acceder un database que ya existe `JsonDatabase.json`, en él estan los albumnes, las canciones, los grupos, las artistas, los generos y todos los playlist.
En la funcion `userMenu()` es la parte que usa **inquirer** para interactual con usuario. Inicialmente se pregunta al usuario `Qué operacion quieres hacer`:
> - **Operacion con albumnes**
> - **Operacion con canciones**
> - **Operacion con generos**
> - **Operacion con grupos**
> - **Operacion con artistas**
> - **Operaciones avanzadas con playlist** (aqui utilizará la gestor)

Dependiendo de la opcion que elija el usuario, entramos el método `operacion(option:string)`, dicho método pregunta al usuario que operacio  deseas hacer: 
> - **Visualizar**
> - **Añadir**
> - **Borrar**
> - **Modificar**

En el método `Visualizar()`, simplemente usando la funcion que proporciona **lowdb** `JSON.stringify()` se puede mostrar los datos según el tipo de datos que desea el usuario.

En el método `add()`, usando **inquirer** para preguntar al usuario los datos que quieres agregar. Comprobamos que no existe en la `jsonDataBase.json` y que los datos introducidos son validos. y Usando cada clase creamos objetos y añadimos a la colecion.

En el método `borrar()`, igual que el método anterior, usando **inquirer** para preguntar al usuario el nombre del objeto que desea eliminar, usa la funcion **por ejemplo en el caso de album**: `this.database.get('canciones').remove({nombre: cancionEliminar}).write();` elimina directaente el objeto que está dentro de `canciones` y según el nombre `cancionEliminar` que introduce el usuario **(en este caso el nombre es el dato unico)** eliminar el objeto de cancion.

En el método `Modificar()`, usamos **inquirer** preguntamos qué **(album, cancion, genero, artista, grupo)** desea cambiar el dato.
**por ejemplo en le caso de album**: 
`this.database.get('albumes').find({nombre: albumMoficar}).set(tipoDatoMoficar, dataMoficar).write();`
`get()` para acceder objetos que están dentro de **albumnes**.
`find()` para encontrar el objeto con el nombre introducido.
`set()` para modificar el datos que desea cambiar el usuario.
`write()` para guardar el cambio.



### Documentación TypeDoc  
Para la documentación de los ejercicios se utilizó la herramienta TypeDoc que convierte los comentarios en el código fuente de TypeScript en documentación HTML renderizada. A continuación, se adjunta el enlace a la página web creada mediante TypeDoc.  
[Enlace repositorio documentacion Typedoc](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo-o/tree/main/docs)  

### Testing  
Para la realización del testing de los ejercicios se utilizaron las herramientas Mocha y Chai.  
Se han realizado pruebas sobre todas las clases implementadas para el correcto funcionamiento de la aplicación, en las cuales se comprueba que los valores pasados por parámetro dan el resultado esperado o al contrario, es decir, se comprueba que no dan el resultado esperado. Para ello se ha creado un fichero clase.spec.ts para cada clase y se han añadido algunas pruebas de todas las funciones utilizadas.  

A continuación se muestra la salida en la terminal al ejecutar el test.  
```
```

##  4. Conclusiones

En esta práctica, he aprendido más cosas que están relacionado con

## 5. Bibliografía
- [Clases abstractas e interfaces](https://ifgeekthen.everis.com/es/clases-abstractas-e-interfaces)
- [Relaciones de clases abstractas](https://qastack.mx/programming/597769/how-do-i-create-an-abstract-base-class-in-javascript)
- [Clases y métodos](https://lenguajejs.com/javascript/caracteristicas/clases-es6/)
- [Apuntes de la clases](https://ull-esit-inf-dsi-2122.github.io/typescript-theory/)
- [Guión de la práctica](https://ull-esit-inf-dsi-2122.github.io/prct07-music-dataModel/)
