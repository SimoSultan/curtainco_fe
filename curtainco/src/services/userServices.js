import api from "../config/api"

async function updateUserInformation(userInfo, userId) {
    const response = await api.put(`/users/${userId}`, userInfo)
    return response
}

async function getUserOrders(orderId) {
    const response = await api.get(`/orders/${orderId}`)
    return response
}

export { updateUserInformation, getUserOrders }
