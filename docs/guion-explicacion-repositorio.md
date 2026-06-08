# Guion para explicar desde el repositorio

Duracion sugerida: 6 a 8 minutos.

## 1. Inicio

Frase sugerida:

> Buenos dias/tardes. En este video voy a presentar el repositorio desarrollado para la actividad de plataforma de gestion de pedidos. La solucion consiste en una API REST para crear, consultar, listar y actualizar pedidos. La demostracion se realiza desde el repositorio para explicar la estructura del proyecto, el funcionamiento de la aplicacion y la propuesta de automatizacion en AWS documentada en el entregable.

## 2. Vista general del repositorio

Mostrar la pagina principal del repositorio en GitHub.

Frase sugerida:

> En la vista principal del repositorio se encuentran los archivos de la aplicacion, las pruebas, la configuracion de integracion continua, la infraestructura como codigo y los documentos de soporte para la entrega.

Mencionar:

- `README.md`
- `src/`
- `test/`
- `buildspec.yml`
- `infrastructure/`
- `docs/`

## 3. README del proyecto

Abrir `README.md`.

Frase sugerida:

> En el archivo README se resume el objetivo del proyecto. Aqui se describen las funcionalidades principales de la API, los comandos para ejecutar el proyecto, los endpoints disponibles y la arquitectura propuesta.

Explicar:

- La aplicacion permite crear pedidos.
- Permite listar pedidos.
- Permite filtrar y ordenar pedidos.
- Permite consultar un pedido especifico.
- Permite actualizar el estado de un pedido.

Frase sugerida:

> Tambien se incluye una seccion de arquitectura donde se muestra el flujo general: el desarrollador sube cambios al repositorio, el pipeline ejecuta la construccion y pruebas, y luego se realiza el despliegue hacia un entorno en AWS.

## 4. Codigo de la API

Abrir `src/app.js`.

Frase sugerida:

> En la carpeta `src` esta la logica principal de la API. El archivo `app.js` contiene las rutas, las validaciones y las operaciones sobre los pedidos.

Explicar los endpoints:

- `GET /health`: endpoint de salud para comprobar que la API esta activa.
- `POST /orders`: permite crear un pedido con cliente, productos, cantidades y direccion de envio.
- `GET /orders`: permite listar pedidos y aplicar filtros por estado u ordenamiento.
- `GET /orders/{id}`: permite consultar un pedido por su identificador.
- `PATCH /orders/{id}/status`: permite actualizar el estado del pedido.

Frase sugerida:

> Cada pedido se crea con un identificador unico, fecha de creacion, fecha de actualizacion y estado inicial `Pendiente`. Los estados permitidos son `Pendiente`, `En Proceso`, `Enviado` y `Entregado`.

## 5. Archivo de inicio

Abrir `src/server.js`.

Frase sugerida:

> El archivo `server.js` es el punto de entrada de la aplicacion. Este archivo importa la API y levanta el servidor en el puerto definido por la variable de entorno `PORT`, o en el puerto 3000 si no se define una variable.

## 6. Pruebas automatizadas

Abrir `test/orders.test.js`.

Frase sugerida:

> En la carpeta `test` se encuentran las pruebas automatizadas. Estas pruebas verifican los casos principales de negocio: crear pedidos, listar pedidos, consultar pedidos, actualizar estados y rechazar informacion invalida.

Explicar:

- Se valida que un pedido completo se pueda crear correctamente.
- Se valida que el pedido aparezca al listar.
- Se valida que se pueda consultar por ID.
- Se valida que el estado pueda actualizarse.
- Se valida que la API rechace datos incompletos o estados no permitidos.

Frase sugerida:

> Estas pruebas son importantes porque en un flujo de integracion continua permiten detectar errores antes de generar o desplegar un artefacto.

## 7. Integracion continua con CodeBuild

Abrir `buildspec.yml`.

Frase sugerida:

> El archivo `buildspec.yml` define los pasos que ejecutaria AWS CodeBuild dentro del pipeline de integracion continua.

Explicar las fases:

- `install`: instala las dependencias del proyecto.
- `pre_build`: ejecuta las pruebas automatizadas.
- `build`: prepara el artefacto de despliegue.
- `post_build`: finaliza el proceso de construccion.

Frase sugerida:

> Con este archivo, cada vez que el pipeline se ejecute, CodeBuild puede instalar dependencias, correr las pruebas y preparar los archivos necesarios para desplegar la API.

## 8. Contenedor y despliegue

Mostrar `Dockerfile` y `Procfile`.

Frase sugerida:

> El proyecto tambien incluye un `Dockerfile`, que permite contenerizar la aplicacion, y un `Procfile`, que indica como iniciar la API en un servicio como Elastic Beanstalk.

Explicar:

- `Dockerfile`: define una imagen basada en Node.js.
- `Procfile`: indica el comando `node src/server.js`.

## 9. Infraestructura como codigo

Abrir `infrastructure/cloudformation-pipeline.yml`.

Frase sugerida:

> En la carpeta `infrastructure` se encuentra la plantilla de CloudFormation. Esta plantilla deja definida la infraestructura necesaria para la propuesta de automatizacion en AWS.

Mencionar recursos:

- Repositorio CodeCommit.
- Bucket S3 para artefactos.
- Proyecto CodeBuild.
- Pipeline CodePipeline.
- Aplicacion y entorno Elastic Beanstalk.
- Roles IAM para permisos.

Frase sugerida:

> En esta actividad se presentaron inconvenientes con permisos IAM durante la configuracion en AWS. Por esa razon, en el video se explica la propuesta desde el repositorio y la evidencia de la conexion con AWS se presenta en el documento del entregable.

## 10. Documentacion del entregable

Abrir carpeta `docs/`.

Frase sugerida:

> En la carpeta `docs` estan los documentos de soporte de la entrega. El archivo principal es `informe.pdf`, donde se resume el cumplimiento de los requisitos, la arquitectura, los endpoints, las pruebas, la automatizacion propuesta en AWS y las conclusiones.

Mencionar:

- `informe.pdf`: documento de entrega.
- `guion-video-final.md`: guion de apoyo para la grabacion.
- `comandos-demo.md`: comandos de prueba si se desea ejecutar localmente.

Frase sugerida:

> La parte de AWS, incluyendo el pipeline y los permisos necesarios, se explica en el informe para dejar evidencia del proceso planteado.

## 11. Cierre

Frase sugerida:

> En conclusion, este repositorio contiene una solucion completa para el caso de estudio. La API cumple con los requisitos de negocio porque permite crear, visualizar, filtrar, ordenar y actualizar pedidos. Tambien se deja planteada la automatizacion DevOps en AWS mediante CodePipeline, CodeBuild, CloudFormation y Elastic Beanstalk. La demostracion se realizo desde el repositorio para explicar de forma clara la estructura y funcionamiento del proyecto, mientras que la evidencia de AWS se encuentra documentada en el informe de entrega.

