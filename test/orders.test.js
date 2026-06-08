const assert = require("node:assert");
const { createApp } = require("../src/app");

let server;
let baseUrl;

async function setup() {
  server = createApp();
  await new Promise((resolve) => server.listen(0, resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
}

async function teardown() {
  await new Promise((resolve) => server.close(resolve));
}

async function testCreateListAndFindOrders() {
  const created = await request("/orders", {
    method: "POST",
    body: {
      customer: { name: "Ana Gomez", email: "ana@example.com" },
      products: [{ sku: "SKU-1", name: "Camisa", quantity: 2 }],
      shippingAddress: "Calle 10 # 20-30"
    }
  });

  assert.equal(created.status, 201);
  assert.equal(created.body.data.status, "Pendiente");

  const listed = await request("/orders?sortBy=customer&sortOrder=asc");
  assert.equal(listed.status, 200);
  assert.ok(listed.body.data.some((order) => order.id === created.body.data.id));

  const found = await request(`/orders/${created.body.data.id}`);
  assert.equal(found.status, 200);
  assert.equal(found.body.data.customer.email, "ana@example.com");
}

async function testUpdateOrderStatus() {
  const created = await request("/orders", {
    method: "POST",
    body: {
      customer: { name: "Luis Perez", email: "luis@example.com" },
      products: [{ sku: "SKU-2", name: "Zapatos", quantity: 1 }],
      shippingAddress: "Carrera 7 # 12-45"
    }
  });

  const updated = await request(`/orders/${created.body.data.id}/status`, {
    method: "PATCH",
    body: { status: "Enviado" }
  });

  assert.equal(updated.status, 200);
  assert.equal(updated.body.data.status, "Enviado");
}

async function testRejectsInvalidPayloads() {
  const invalidOrder = await request("/orders", {
    method: "POST",
    body: { customer: { name: "Sin productos", email: "bad@example.com" } }
  });

  assert.equal(invalidOrder.status, 400);
  assert.ok(invalidOrder.body.errors.length > 0);

  const invalidStatus = await request("/orders/no-existe/status", {
    method: "PATCH",
    body: { status: "Cancelado" }
  });

  assert.equal(invalidStatus.status, 400);
}

async function request(path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    method: options.method || "GET",
    headers: options.body ? { "Content-Type": "application/json" } : undefined,
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  return {
    status: response.status,
    body: await response.json()
  };
}

async function run() {
  const tests = [
    ["crea, lista y consulta pedidos", testCreateListAndFindOrders],
    ["actualiza el estado de un pedido", testUpdateOrderStatus],
    ["rechaza pedidos incompletos y estados invalidos", testRejectsInvalidPayloads]
  ];

  await setup();
  try {
    for (const [name, testCase] of tests) {
      await testCase();
      console.log(`OK - ${name}`);
    }
  } finally {
    await teardown();
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
