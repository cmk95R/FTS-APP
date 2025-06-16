# 📁 FTSApp – Trabajo Práctico Final

## Descripción general

FTSApp es una aplicación cliente-servidor que permite transferir y administrar archivos de forma segura a través del protocolo TLS (Transport Layer Security). La app fue desarrollada en Node.js e implementa comandos similares a los de un servidor FTP:


LIST: listar archivos del servidor

GET: descargar un archivo

PUT: subir un archivo

DELETE: eliminar un archivo

RENAME: renombrar un archivo

## ⚙️ Funcionamiento general

### 🧩 Componentes

#### Archivo Descripción

secure-server.js = 	Servidor TLS que escucha comandos desde el cliente y manipula archivos.

secure-client.js =	Cliente que se conecta al servidor TLS y ejecuta comandos.

tls-client.js    =	Alternativa o versión paralela del cliente 
TLS.

web-server.js =	Servidor web en Express que sirve una interfaz HTML con instrucciones.

## Clonar Repositorio


```bash

git clone https://github.com/usuario/FTSApp.git
cd FTSApp
```

## Instalar Dependencias



```bash
npm install -y



```


## Iniciar Proyecto
Se configuro el script dev para que inicie los comandos node src/web-server.js   y node src/secure-server.js inicien al mismo tiempo.
n
```bash
npm run dev
```
## Interfaz UI Web
La interfaz web se abrir en el el puerto 3000. El link es el siguiente

```bash
https://localhost:3000/
```


## Manual de Uso 



## License

[MIT](https://choosealicense.com/licenses/mit/)
