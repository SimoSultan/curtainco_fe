import api from "../config/api";

async function updateUserInformation(userInfo, userId) {
    const response = await api.put(`/users/${userId}`, userInfo);
    console.log("got updated user back from server", response.data);
    return response;
}

export { updateUserInformation };
