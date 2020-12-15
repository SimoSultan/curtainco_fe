export const ACTIONS = {
    LOGIN: "login-user",
    LOGOUT: "logout-user",
    REGISTER: "register-user",
    SET_CURRENT_USER: "get-user-on-page-refresh",
    SET_SNACKBAR: "update-snackbar",
    SET_MODAL: "update-modal",
    ADD_PRODUCTS: "add-products",
    SET_ALL_USERS: "get-all-users",
};

export default function stateReducer(state, action) {
    switch (action.type) {
        case ACTIONS.LOGIN: {
            return {
                ...state,
                currentUser: action.payload,
                loggedIn: true,
            };
        }
        case ACTIONS.LOGOUT: {
            return {
                ...state,
                currentUser: null,
                loggedIn: false,
            };
        }
        case ACTIONS.SET_CURRENT_USER: {
            return {
                ...state,
                currentUser: action.payload,
                loggedIn: true,
            };
        }
        case ACTIONS.REGISTER: {
            return {
                ...state,
                users: [...state.users, action.payload],
                currentUser: action.payload,
                loggedIn: true,
            };
        }
        case ACTIONS.SET_SNACKBAR: {
            return {
                ...state,
                snackbar: action.payload,
            };
        }
        case ACTIONS.SET_MODAL: {
            return {
                ...state,
                modal: action.payload,
            };
        }
        case ACTIONS.ADD_PRODUCTS: {
            return {
                ...state,
                products: [...state.products, action.payload],
            };
        }
        case ACTIONS.SET_ALL_USERS: {
            return {
                ...state,
                users: action.payload,
            };
        }
        default:
            return state;
    }
}
