import api from "../config/api";

async function getAllUsers() {
    const response = await api.get("/users");
    return response;
}

export { getAllUsers };
