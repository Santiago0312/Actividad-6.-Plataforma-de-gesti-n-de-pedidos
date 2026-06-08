const http = require("node:http");
const { randomUUID } = require("node:crypto");

const VALID_STATUSES = ["Pendiente", "En Proceso", "Enviado", "Entregado"];

function createOrderStore(initialOrders = []) {
  const orders = new Map();

  for (const order of initialOrders) {
    orders.set(order.id, order);
  }

  function create(payload) {
    const errors = validateNewOrder(payload);
    if (errors.length > 0) {
      return { errors };
    }

    const now = new Date().toISOString();
    const order = {
      id: randomUUID(),
      customer: {
        name: payload.customer.name.trim(),
        email: payload.customer.email.trim()
      },
      products: payload.products.map((product) => ({
        sku: String(product.sku).trim(),
        name: String(product.name).trim(),
        quantity: Number(product.quantity)
      })),
      shippingAddress: String(payload.shippingAddress).trim(),
      status: "Pendiente",
      createdAt: now,
      updatedAt: now
    };

    orders.set(order.id, order);
    return { order };
  }

  function list({ status, sortBy = "createdAt", sortOrder = "desc" }) {
    let result = Array.from(orders.values());

    if (status) {
      result = result.filter((order) => order.status === status);
    }

    const allowedSorts = new Set(["createdAt", "status", "customer"]);
    const normalizedSort = allowedSorts.has(sortBy) ? sortBy : "createdAt";
    const direction = sortOrder === "asc" ? 1 : -1;

    result.sort((left, right) => {
      const leftValue = normalizedSort === "customer" ? left.customer.name : left[normalizedSort];
      const rightValue = normalizedSort === "customer" ? right.customer.name : right[normalizedSort];
      return String(leftValue).localeCompare(String(rightValue)) * direction;
    });

    return result;
  }

  function find(id) {
    return orders.get(id);
  }

  function updateStatus(id, status) {
    if (!VALID_STATUSES.includes(status)) {
      return { errors: [`Estado invalido. Use: ${VALID_STATUSES.join(", ")}`] };
    }

    const order = orders.get(id);
    if (!order) {
      return { notFound: true };
    }

    const updatedOrder = {
      ...order,
      status,
      updatedAt: new Date().toISOString()
    };

    orders.set(id, updatedOrder);
    return { order: updatedOrder };
  }

  return { create, list, find, updateStatus };
}

function validateNewOrder(payload) {
  const errors = [];

  if (!payload || typeof payload !== "object") {
    return ["El cuerpo de la solicitud debe ser un objeto JSON."];
  }

  if (!payload.customer || typeof payload.customer !== "object") {
    errors.push("customer es obligatorio.");
  } else {
    if (!payload.customer.name || typeof payload.customer.name !== "string") {
      errors.push("customer.name es obligatorio.");
    }
    if (!payload.customer.email || typeof payload.customer.email !== "string") {
      errors.push("customer.email es obligatorio.");
    }
  }

  if (!Array.isArray(payload.products) || payload.products.length === 0) {
    errors.push("products debe contener al menos un producto.");
  } else {
    payload.products.forEach((product, index) => {
      if (!product.sku) errors.push(`products[${index}].sku es obligatorio.`);
      if (!product.name) errors.push(`products[${index}].name es obligatorio.`);
      if (!Number.isInteger(Number(product.quantity)) || Number(product.quantity) <= 0) {
        errors.push(`products[${index}].quantity debe ser un entero positivo.`);
      }
    });
  }

  if (!payload.shippingAddress || typeof payload.shippingAddress !== "string") {
    errors.push("shippingAddress es obligatorio.");
  }

  return errors;
}

function createApp({ store = createOrderStore() } = {}) {
  return http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url, "http://localhost");

      if (req.method === "GET" && url.pathname === "/health") {
        return sendJson(res, 200, { status: "ok" });
      }

      if (req.method === "POST" && url.pathname === "/orders") {
        const body = await readJson(req);
        const result = store.create(body);
        if (result.errors) return sendJson(res, 400, { errors: result.errors });
        return sendJson(res, 201, { data: result.order });
      }

      if (req.method === "GET" && url.pathname === "/orders") {
        const orders = store.list({
          status: url.searchParams.get("status"),
          sortBy: url.searchParams.get("sortBy") || undefined,
          sortOrder: url.searchParams.get("sortOrder") || undefined
        });
        return sendJson(res, 200, { data: orders });
      }

      const orderMatch = url.pathname.match(/^\/orders\/([^/]+)$/);
      if (req.method === "GET" && orderMatch) {
        const order = store.find(orderMatch[1]);
        if (!order) return sendJson(res, 404, { error: "Pedido no encontrado." });
        return sendJson(res, 200, { data: order });
      }

      const statusMatch = url.pathname.match(/^\/orders\/([^/]+)\/status$/);
      if (req.method === "PATCH" && statusMatch) {
        const body = await readJson(req);
        const result = store.updateStatus(statusMatch[1], body.status);
        if (result.errors) return sendJson(res, 400, { errors: result.errors });
        if (result.notFound) return sendJson(res, 404, { error: "Pedido no encontrado." });
        return sendJson(res, 200, { data: result.order });
      }

      return sendJson(res, 404, { error: "Ruta no encontrada." });
    } catch (error) {
      if (error.code === "INVALID_JSON") {
        return sendJson(res, 400, { error: "JSON invalido." });
      }
      return sendJson(res, 500, { error: "Error interno del servidor." });
    }
  });
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (error) {
        error.code = "INVALID_JSON";
        reject(error);
      }
    });
  });
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  });
  res.end(JSON.stringify(payload));
}

module.exports = {
  VALID_STATUSES,
  createApp,
  createOrderStore
};
