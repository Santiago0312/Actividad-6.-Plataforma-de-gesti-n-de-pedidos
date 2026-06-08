# Guion final para video de entrega

Duracion sugerida: 7 a 9 minutos.

## 1. Presentacion inicial

Tiempo sugerido: 30 segundos.

Frase sugerida:

> Buenos dias/tardes. En este video presento la solucion desarrollada para la actividad: una API REST para una plataforma basica de gestion de pedidos. En esta demostracion se va a mostrar el funcionamiento de la aplicacion de forma local. La conexion y automatizacion en AWS se evidencia en el documento del entregable, ya que durante la configuracion se presentaron algunos inconvenientes con permisos IAM, similar a lo ocurrido en la aplicacion anterior.

Explicar:

- El objetivo fue desarrollar la aplicacion y dejar definida la automatizacion del ciclo de vida en AWS.
- La aplicacion permite crear pedidos, consultar pedidos, filtrarlos y actualizar su estado.
- En el video se demuestra el funcionamiento del sistema.
- La parte de AWS se explica y evidencia en el informe.

## 2. Mostrar estructura del proyecto

Tiempo sugerido: 1 minuto.

Mostrar en pantalla los archivos principales:

- `src/app.js`
- `src/server.js`
- `test/orders.test.js`
- `buildspec.yml`
- `infrastructure/cloudformation-pipeline.yml`
- `docs/informe.pdf`

Frase sugerida:

> La aplicacion esta desarrollada en Node.js. En la carpeta `src` se encuentra la logica de la API, en `test` estan las pruebas, el archivo `buildspec.yml` define los pasos que ejecuta CodeBuild y la carpeta `infrastructure` contiene la plantilla de CloudFormation para crear la infraestructura del pipeline.

## 3. Explicar la API REST

Tiempo sugerido: 1 minuto.

Mostrar `src/app.js`.

Frase sugerida:

> La API maneja pedidos con datos del cliente, productos, cantidades, direccion de envio, estado, fecha de creacion y fecha de actualizacion. El estado inicial de cada pedido es `Pendiente`, y luego puede cambiar a `En Proceso`, `Enviado` o `Entregado`.

Endpoints para mencionar:

- `GET /health`: verifica que la API este activa.
- `POST /orders`: crea un pedido.
- `GET /orders`: lista pedidos, con filtro por estado y ordenamiento.
- `GET /orders/{id}`: consulta un pedido especifico.
- `PATCH /orders/{id}/status`: actualiza el estado del pedido.

## 4. Ejecutar pruebas locales

Tiempo sugerido: 1 minuto.

Comando:

```bash
npm test
```

Frase sugerida:

> Antes de ejecutar la aplicacion, se realizan pruebas automatizadas. Estas pruebas validan que se puedan crear pedidos, listar pedidos, consultar pedidos, actualizar estados y rechazar datos invalidos. En la propuesta de AWS, estas mismas pruebas se ejecutan dentro del pipeline de integracion continua.

Resultado esperado:

```text
OK - crea, lista y consulta pedidos
OK - actualiza el estado de un pedido
OK - rechaza pedidos incompletos y estados invalidos
```

## 5. Iniciar el sistema localmente

Tiempo sugerido: 1 minuto.

Comando:

```bash
npm start
```

Frase sugerida:

> Ahora inicio la aplicacion localmente para demostrar el funcionamiento de la API. El servidor queda escuchando en el puerto 3000.

En otra terminal o herramienta de pruebas, usar:

```bash
curl http://localhost:3000/health
```

Frase:

> El endpoint de salud responde correctamente, lo que indica que el servicio esta disponible.

## 6. Crear y consultar un pedido

Tiempo sugerido: 1 minuto y 30 segundos.

Comando para crear pedido:

```bash
curl -X POST http://localhost:3000/orders ^
  -H "Content-Type: application/json" ^
  -d "{\"customer\":{\"name\":\"Ana Gomez\",\"email\":\"ana@example.com\"},\"products\":[{\"sku\":\"SKU-1\",\"name\":\"Camisa\",\"quantity\":2}],\"shippingAddress\":\"Calle 10 # 20-30\"}"
```

Frase sugerida:

> Aqui creo un nuevo pedido enviando la informacion del cliente, los productos, la cantidad y la direccion de envio. La API responde con un identificador unico y asigna el estado inicial `Pendiente`.

Comando para listar:

```bash
curl http://localhost:3000/orders
```

Frase:

> Luego consulto la lista de pedidos y se evidencia que el pedido creado aparece correctamente.

## 7. Actualizar estado del pedido

Tiempo sugerido: 1 minuto.

Comando:

```bash
curl -X PATCH http://localhost:3000/orders/ID_DEL_PEDIDO/status ^
  -H "Content-Type: application/json" ^
  -d "{\"status\":\"Enviado\"}"
```

Frase sugerida:

> Finalmente actualizo el estado del pedido. Este endpoint permite representar las etapas del proceso logistico, por ejemplo pasar de `Pendiente` a `En Proceso`, `Enviado` o `Entregado`.

## 8. Explicar la propuesta AWS documentada

Tiempo sugerido: 1 minuto y 30 segundos.

Mostrar `buildspec.yml`, `infrastructure/cloudformation-pipeline.yml` y `docs/informe.pdf`.

Frase sugerida:

> Para la automatizacion DevOps se definio una propuesta de pipeline en AWS. El flujo inicia cuando se suben cambios al repositorio. CodePipeline toma el codigo fuente, CodeBuild instala dependencias, ejecuta pruebas unitarias y genera el artefacto. Luego, el artefacto se entrega a Elastic Beanstalk para desplegar la aplicacion.

Explicar permisos:

> En esta parte no se hara la demostracion en vivo de AWS porque durante la configuracion se presentaron problemas con permisos IAM. Sin embargo, la conexion con AWS, los servicios usados y la estructura del pipeline se muestran en el documento del entregable. Los permisos necesarios se relacionan principalmente con los roles para que CodePipeline, CodeBuild y Elastic Beanstalk puedan acceder a S3, al repositorio y a los recursos de despliegue.

## 9. Mostrar informe

Tiempo sugerido: 30 segundos.

Mostrar `docs/informe.pdf`.

Frase sugerida:

> Como entregable documental se genero un informe en PDF donde se resumen los requisitos cumplidos, la arquitectura, los endpoints, la propuesta de automatizacion DevOps en AWS, las pruebas y las conclusiones del proyecto. En este documento se evidencia la parte de conexion y despliegue en AWS.

## 10. Cierre

Tiempo sugerido: 30 segundos.

Frase sugerida:

> En conclusion, la solucion cumple con los requisitos principales del caso de estudio: permite gestionar pedidos mediante una API REST y deja planteada la automatizacion CI/CD en AWS. En el video se demostro el funcionamiento de la aplicacion, mientras que la conexion y configuracion en AWS se presenta en el documento del entregable. Como mejora futura, se podria agregar una base de datos como DynamoDB o RDS, autenticacion de usuarios y ambientes separados de pruebas y produccion.
