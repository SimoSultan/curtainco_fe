import api from "../config/api";

async function submitConsultationRequest(userRequest) {
    // call to server to logout user
    console.log(userRequest);
    const response = await api.post("/consults", userRequest);
    console.log(response);
    return response;
}

async function getAllConsultations() {
    const response = await api.get("/consults");
    console.log(response);
    return response;
}

async function markConsultationCompleted(id, valueToUpdate) {
    const response = await api.patch(`/consults/${id}`, valueToUpdate);
    console.log(response);
    return response;
}

async function checkIfUserHasMadeAConsultationRequest(id) {}

export {
    submitConsultationRequest,
    getAllConsultations,
    markConsultationCompleted,
    checkIfUserHasMadeAConsultationRequest,
};
