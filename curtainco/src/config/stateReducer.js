export const ACTIONS = {
    LOGIN: 'login-user',
    LOGOUT: 'logout-user',
    REGISTER: 'register-user',
}


export default function (state, action) {
    switch(action.type) {
        case ACTIONS.LOGIN: {
            return {
                ...state,
                currentUser: action.payload,
                loggedIn: true
            }
        }
        case ACTIONS.LOGOUT: {
            return {
                ...state,
                currentUser: null,
                loggedIn: false
            }
        }
        case ACTIONS.REGISTER: {
            return {
                ...state,
                users: [...state.users, action.payload],
                currentUser: action.payload,
                loggedIn: true
            }
        }
        default: 
            return state
    }
}

