import api from "../config/api";

async function submitConsultationRequest(message) {
    // call to server to logout user
    const response = await api.post("/consults", message);
    console.log(response.data);
    return response;
}

async function getAllConsultations() {
    const response = await api.get("/consults");
    return response;
}

export { submitConsultationRequest, getAllConsultations };
