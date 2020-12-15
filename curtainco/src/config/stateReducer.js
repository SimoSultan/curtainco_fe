export const ACTIONS = {
    LOGIN: "login-user",
    LOGOUT: "logout-user",
    REGISTER: "register-user",
    SET_CURRENT_USER: "get-user-on-page-refresh",
    SET_SNACKBAR: "update-snackbar",
    SET_MODAL: "update-modal",
    ADD_PRODUCT: "add-product",
    SET_ALL_USERS: "get-all-users",
    SET_ALL_PRODUCTS: "get-all-products",
    SET_ALL_CONSULTATIONS: "get-all-consults",
};

export default function stateReducer(state, action) {
    switch (action.type) {
        // AUTHENTICATION
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

        // SNACKBAR & MODAL
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

        // USERS
        case ACTIONS.SET_ALL_USERS: {
            return {
                ...state,
                users: action.payload,
            };
        }

        // PRODUCTS
        case ACTIONS.SET_ALL_PRODUCTS: {
            return {
                ...state,
                products: action.payload,
            };
        }
        case ACTIONS.ADD_PRODUCT: {
            return {
                ...state,
                products: [...state.products, action.payload],
            };
        }

        // CONSULTATIONS
        case ACTIONS.SET_ALL_CONSULTATIONS: {
            return {
                ...state,
                consults: action.payload,
            };
        }
        default:
            return state;
    }
}
