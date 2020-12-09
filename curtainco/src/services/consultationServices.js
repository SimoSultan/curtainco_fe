import api from '../config/api'

async function submitConsultationRequest(message) {
    // call to server to logout user
    const response = await api.post("/consultation", message)
    console.log(response.data);
    return response
}

export {
    submitConsultationRequest,
}