import api from "../config/api";

// GET all orders
async function getAllOrders() {
  const response = await api.get("/orders");
  console.log(response);
  return response;
}

// POST new order
async function createOrder(newOrder) {
  const response = await api.post("/orders", newOrder);
  return response;
}

// GET single order

// PUT updated order
async function markOrderProcessed(id, updatedOrder) {
  const response = await api.patch(`/orders/${id}`, updatedOrder);
  return response;
}

export {
  getAllOrders,
  createOrder,
  markOrderProcessed
};

