import api from "../config/api"

async function sendRequestToPayPal(payload) {
    const response = await api.post("/orders", payload)
    console.log(response)
    return response
}

export { sendRequestToPayPal }
