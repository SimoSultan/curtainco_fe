export const ACTIONS = {
    LOGIN: 'login-user',
    LOGOUT: 'logout-user',
}

export default function (state, action) {
    switch(action.type) {
        case ACTIONS.LOGIN: {
            return {
                ...state,
                loggedInUser: action.payload
            }
        }
        case ACTIONS.LOGOUT: {
            return {
                ...state,
                loggedInUser: action.payload
            }
        }
        default: 
            return state
    }
}

