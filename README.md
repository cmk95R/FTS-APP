# 📁 FTSApp – Trabajo Práctico Final

Alumno : Cristian Velazquez
## Descripción general

FTSApp es una aplicación cliente-servidor que permite transferir y administrar archivos de forma segura a través del protocolo TLS (Transport Layer Security). La app fue desarrollada en Node.js e implementa comandos similares a los de un servidor FTP:


LIST: listar archivos del servidor

GET: descargar un archivo

PUT: subir un archivo

DELETE: eliminar un archivo

RENAME: renombrar un archivo

## ⚙️ Funcionamiento general

### 🧩 Componentes
Sección “Tecnologías utilizadas” (Node.js, Express, TLS, HTML/CSS/JS).

Créditos o autores si corresponde.
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
## Accedé a la interfaz web
La interfaz web se abrir en el el puerto 3000. El link es el siguiente

```bash
https://localhost:3000/
```


## Manual de Uso 
#### Pagina Principal

![1](https://github.com/user-attachments/assets/dd4f25e4-92fb-4666-a7a8-1c6805f03ba7)

#### Seleccion de Archivo para subir al servidor.

![2](https://github.com/user-attachments/assets/c60d6a12-c8e9-4727-a8b2-6a39e34bd899)

#### Previsualizacion de archivo seleccionado 

![222](https://github.com/user-attachments/assets/34995ee6-b7d3-474c-bea9-d30432be9069)

#### Subir archivo seleccionado

![3](https://github.com/user-attachments/assets/6029df6b-8657-4268-a994-648b555203df)

#### Verificar el archivo seleccionado  en la tabla inferior , darle actualizar a la pagino ademas tenemos 2 

![444](https://github.com/user-attachments/assets/1a64eeb1-d2a0-46d0-9b70-6bdb2f621f96)

#### Renombrar archivo 
Al presionar el boton de renombrar nos aparece un modal que nos permite renombrar el archivo y luego gurdar

![6](https://github.com/user-attachments/assets/d38320dc-b7e1-4935-a8bf-2d32ce947372)

#### Renombrar archivo Exitoso
Luego de renombrar el archivo y el cambio realizado nos aparece el nuevo nombre modificado

![666](https://github.com/user-attachments/assets/6a74a7a9-e2a8-4270-940a-42003636fa5c)

#### Descargar archivo 
Al presionar el boton de descargar nos aparece un modal que nos permite descargar el archivo y luego guardarlo en nuestra pc.

![7](https://github.com/user-attachments/assets/198d5265-13cb-45b3-a191-5b3bc7614500)


#### Descarga de archivo Exitoso
Luego de confirmar la descarga en nuestro modal se nos empieza a descargar el archivo.

![image](https://github.com/user-attachments/assets/c2b7a7af-16e5-48ef-a160-004c2a4345df)

#### Eliminar archivo 
Al presionar el boton de eliminar nos aparece un modal que nos permite eliminar el archivo de nuestro servidor.

![image](https://github.com/user-attachments/assets/c1c71327-1e7e-43f8-8e0e-54487dbb6a19)



#### Eliminar de archivo Exitoso
Luego de confirmar la eliminacion en nuestro modal se nos eliminar el archivo seleccionado. 

![image](https://github.com/user-attachments/assets/39adefe7-cc2d-4e1c-9292-babccdb8515c)

🙌 Agradecimientos y cierre
Gracias por visitar este repositorio.
FTSApp fue desarrollado como parte del Trabajo Práctico Final para la materia Programación sobre redes  en el marco de la Tecnicatura en Desarrollo de Software.

Este proyecto representa la integración de múltiples conocimientos adquiridos, como la programación en Node.js, la implementación de seguridad con TLS, y el diseño de interfaces web accesibles con HTML, CSS y JavaScript.

## License

[MIT](https://choosealicense.com/licenses/mit/)
