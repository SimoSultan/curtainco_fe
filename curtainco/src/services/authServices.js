import api from '../config/api'


async function registerUser(userInfo) {
    // call to server to login user
    // return user info if successful and error if not
    const response = await api.post("/account/register", userInfo)
    console.log("user created", response) 
    return response.data
}


async function loginUser(userInfo) {
    // call to server to login user
    // return user info if successful and error if not
    const response = await api.post("/account", userInfo)
    console.log("got user back from server", response) 
    return response.data
}

async function logoutUser() {
    // call to server to logout user
    return api.get("/account/logout")
}

export {
    registerUser,
    loginUser,
    logoutUser,
}