import api from "../config/api"

async function updateUserInformation(userInfo, userId) {
    const response = await api.put(`/users/${userId}`, userInfo)
    return response
}

async function getUpdatedUserWithOrderObjects(userId) {
    const response = await api.get(`/users/${userId}`)
    return response
}

export { updateUserInformation, getUpdatedUserWithOrderObjects }
