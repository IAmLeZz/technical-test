<b>Prueba técnica Equipzilla</b>

## Iniciar Node.js (backend)

**Requisitos: Node.js, NPM, MySQL**

Tenemos que correr el servidor backend en Node.js con los siguientes comandos en la terminal:

* Primero tenemos que movermos a la carpeta de server

```bash
cd /server
```

* Ahora tenemos que instalar las dependencias

```bash
npm i
```

* Una vez que se hayan instalado las dependencias

```bash
npm run dev
```

Asumiendo que ya tenemos un gestor de bases de datos MySQL en nuestro sistema con un servidor corriendo, ahora tenemos que buscar los datos del servidor de base de datos para completar las variables de entorno.</br>

**Esto es un ejemplo de un servidor tipo MariaDB**

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

##

## Iniciar Next.js (frontend)

* Asumiendo que estabas en la carpeta de *"server"*, tenemos que volver atras hacia *"technical-test"*

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

##

Frontend URL por defecto [http://localhost:3000](http://localhost:3000) <br>
Backend URL por defecto [http://localhost:4000](http://localhost:4000)
