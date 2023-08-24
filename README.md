<b>Prueba técnica Equipzilla </b>

# Iniciar Node.js (backend)

**Requisitos: [Node.js, NPM](https://nodejs.org/es) y un servidor con base de datos [MySQL](https://www.apachefriends.org/es/index.html)**

Tenemos que correr el servidor backend en Node.js con los siguientes comandos en la terminal:

* Primero tenemos que movernos a la carpeta ```server```

```bash
cd server
```

* Ahora tenemos que instalar las dependencias

```bash
npm i
```

Asumiendo que ya tenemos un gestor de bases de datos MySQL en nuestro sistema con un servidor corriendo, ahora tenemos que buscar los datos del servidor de base de datos para completar las variables de entorno.</br>

**Ejemplo de un servidor tipo MariaDB**

```
Database server
Server: 127.0.0.1 via TCP/IP
Server type: MariaDB
Server connection: SSL is not being used Documentation
Server version: 10.4.24-MariaDB - mariadb.org binary distribution
Protocol version: 10
User: root@localhost
Server charset: UTF-8 Unicode (utf8mb4)
```

Ahora tenemos que abrir el archivo ```.env```, donde veremos lo siguientes campos a rellenar con los datos de nuestro servidor de base de datos

```
DB_CONNECTION=
DB_HOST=
DB_PORT=
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
```

* Ejemplo de ```.env``` funcional.

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=mydatabase
DB_USERNAME=root
DB_PASSWORD=12345
```

## Tener en cuenta que

* ```DB_PASSWORD``` **puede** ser opcional y estar completamente vacío </br>
* ```DB_DATABASE``` **debe** ser rellenado con *"spacex_api_data"* ya que es el nombre de la base de datos que vamos a crear a continuación.

## Migraciones

* Crear la base de datos con el siguiente comando

```bash
npx sequelize-cli db:create    
```

* Iremos a nuestro gestor de bases de datos para verificar que la base de datos fue creada con éxito
* Si la DB *"spacex_api_data"* existe, entonces vamos a ejecutar las migraciones para crear las tablas necesarias

```bash
npx sequelize-cli db:migrate    
```

##

Ya teniendo las migraciones realizadas, iniciar el servidor

```bash
npm start
```

# Iniciar Next.js (frontend)

* Asumiendo que tu terminal estaba posicionada en ```server```, volver hacia ```technical-test```

```bash
cd ..
```

* Vamos a instalar las dependencias del frontend:

```bash
npm i 
```

* Una vez que se hayan instalado las dependencias

```bash
npm run dev
```

## Direcciones

Frontend URL por defecto [http://localhost:3000](http://localhost:3000) <br>
Backend URL por defecto [http://localhost:4000](http://localhost:4000)
