# Guion sugerido para video de demostracion

Duracion maxima: 10 minutos.

## 1. Introduccion del proyecto

Presentar brevemente que se construyo una API REST para gestion de pedidos con endpoints para crear, listar, consultar y actualizar estados.

## 2. Revision del codigo

Mostrar:

- `src/app.js`: logica principal de la API.
- `test/orders.test.js`: pruebas unitarias.
- `buildspec.yml`: pasos de CI.
- `infrastructure/cloudformation-pipeline.yml`: infraestructura como codigo.

## 3. Prueba local

Ejecutar:

```bash
npm test
npm start
```

Probar:

```bash
curl http://localhost:3000/health
```

## 4. Pipeline en AWS

Mostrar:

- Repositorio en CodeCommit.
- Pipeline en CodePipeline.
- Build exitoso en CodeBuild.
- Despliegue en Elastic Beanstalk.

## 5. Demostracion de API desplegada

Probar la URL publica de Elastic Beanstalk:

```bash
curl https://URL-DEL-ENTORNO/health
```

Crear un pedido con `POST /orders`, listar con `GET /orders` y actualizar estado con `PATCH /orders/{id}/status`.

## 6. Cierre

Explicar que el despliegue queda automatizado: cada commit en la rama principal activa el pipeline, ejecuta pruebas y publica la nueva version.
