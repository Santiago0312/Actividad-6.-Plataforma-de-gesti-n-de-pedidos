# Comandos para la demostracion

## Instalar dependencias

```bash
npm install
```

## Ejecutar pruebas

```bash
npm test
```

## Iniciar API

```bash
npm start
```

## Probar salud del servicio

```bash
curl http://localhost:3000/health
```

## Crear pedido

PowerShell:

```powershell
Invoke-RestMethod -Method Post -Uri "http://localhost:3000/orders" -ContentType "application/json" -Body '{"customer":{"name":"Ana Gomez","email":"ana@example.com"},"products":[{"sku":"SKU-1","name":"Camisa","quantity":2}],"shippingAddress":"Calle 10 # 20-30"}'
```

CMD:

```cmd
curl -X POST http://localhost:3000/orders -H "Content-Type: application/json" -d "{\"customer\":{\"name\":\"Ana Gomez\",\"email\":\"ana@example.com\"},\"products\":[{\"sku\":\"SKU-1\",\"name\":\"Camisa\",\"quantity\":2}],\"shippingAddress\":\"Calle 10 # 20-30\"}"
```

## Listar pedidos

```bash
curl http://localhost:3000/orders
```

## Filtrar pedidos pendientes

```bash
curl "http://localhost:3000/orders?status=Pendiente"
```

## Actualizar estado

Reemplazar `ID_DEL_PEDIDO` por el valor devuelto al crear el pedido.

PowerShell:

```powershell
Invoke-RestMethod -Method Patch -Uri "http://localhost:3000/orders/ID_DEL_PEDIDO/status" -ContentType "application/json" -Body '{"status":"Enviado"}'
```

CMD:

```cmd
curl -X PATCH http://localhost:3000/orders/ID_DEL_PEDIDO/status -H "Content-Type: application/json" -d "{\"status\":\"Enviado\"}"
```

