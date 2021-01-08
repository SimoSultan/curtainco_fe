import api from "../config/api"

async function registerUser(userInfo) {
    // call to server to login user
    // return user info if successful and error if not
    console.log(userInfo)
    const response = await api.post("/account/register", userInfo)
    console.log("user created", response.data.user)
    return response
}

async function loginUser(userInfo) {
    // call to server to login user
    // return user info if successful and error if not
    const response = await api.post("/account", userInfo)
    console.log(response)
    console.log("got user back from server", response.data.user)
    return response
}

async function logoutUser() {
    // call to server to logout user
    return api.get("/account/logout")
}

async function getLoggedInUserFromHomeRoute() {
    // call to server to logout user
    const response = await api.get("/")
    console.log(response.data)
    return response
}

export { registerUser, loginUser, logoutUser, getLoggedInUserFromHomeRoute }
