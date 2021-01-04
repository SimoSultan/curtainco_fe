import { sortConsultations } from "../helpers/consultationHelpers";
import { sortACTIONS, sortProducts } from "../helpers/productHelpers";

function sortProductsForState(products) {
    let sortedProducts = sortProducts(products, sortACTIONS.NAME_ALPHABETICAL);
    sortedProducts = sortProducts(sortedProducts, sortACTIONS.CATEGORY);
    return sortedProducts;
}

export const ACTIONS = {
    LOGIN: "login-user",
    LOGOUT: "logout-user",
    REGISTER: "register-user",
    SET_CURRENT_USER: "get-user-on-page-refresh",
    SET_SNACKBAR: "update-snackbar",
    SET_MODAL: "update-modal",
    ADD_PRODUCT: "add-product",
    UPDATE_PRODUCT: "update-product",
    DELETE_PRODUCT: "delete-product",
    ADD_COLLECTION: "add-collection",
    UPDATE_COLLECTION: "update-collection",
    DELETE_COLLECTION: "delete-collection",
    SET_ALL_USERS: "get-all-users",
    SET_ALL_PRODUCTS: "get-all-products",
    SET_ALL_COLLECTIONS: "get-all-collections",
    SET_ALL_CONSULTATIONS: "get-all-consults",
    ADD_CONSULTATION: "add-consult",
    VIEW_CONSULTATION: "view-consult",
    UPDATE_CONSULTATION: "update-consult",
    DELETE_CONSULTATION: "delete-consult",
};

export default function stateReducer(state, action) {
    switch (action.type) {
        //  -------- AUTHENTICATION --------
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

        //  -------- SNACKBAR & MODAL --------
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

        // -------- PRODUCTS --------
        case ACTIONS.SET_ALL_PRODUCTS: {
            let sortedProducts = action.payload;
            sortedProducts = sortProductsForState(sortedProducts);
            return {
                ...state,
                products: sortedProducts,
            };
        }
        case ACTIONS.ADD_PRODUCT: {
            let sortedProducts = [...state.products, action.payload];
            sortedProducts = sortProductsForState(sortedProducts);
            return {
                ...state,
                products: sortedProducts,
            };
        }
        case ACTIONS.UPDATE_PRODUCT: {
            const updatedProduct = action.payload;
            const productsWithUpdateRemoved = state.products.filter(
                (prod) => prod._id !== updatedProduct._id
            );
            let sortedProducts = [...productsWithUpdateRemoved, updatedProduct];
            sortedProducts = sortProductsForState(sortedProducts);

            return {
                ...state,
                products: sortedProducts,
            };
        }
        case ACTIONS.DELETE_PRODUCT: {
            const id = action.payload;
            const productsWithRequestedRemoved = state.products.filter(
                (prod) => prod._id !== id
            );
            let sortedProducts = sortProductsForState(
                productsWithRequestedRemoved
            );
            return {
                ...state,
                products: sortedProducts,
            };
        }

        //  -------- COLLECTIONS --------
        case ACTIONS.SET_ALL_COLLECTIONS: {
            return {
                ...state,
                collections: action.payload,
            };
        }
        case ACTIONS.ADD_COLLECTION: {
            return {
                ...state,
                collections: [...state.collections, action.payload],
            };
        }
        case ACTIONS.UPDATE_COLLECTION: {
            const updatedCollection = action.payload;
            const collectionsWithUpdateRemoved = state.collections.filter(
                (coll) => coll._id !== updatedCollection._id
            );
            return {
                ...state,
                collections: [
                    ...collectionsWithUpdateRemoved,
                    updatedCollection,
                ],
            };
        }
        case ACTIONS.DELETE_COLLECTION: {
            const id = action.payload;
            const collectionsWithRequestedRemoved = state.collections.filter(
                (prod) => prod._id !== id
            );
            return {
                ...state,
                collections: collectionsWithRequestedRemoved,
            };
        }

        //  -------- USERS --------
        case ACTIONS.SET_ALL_USERS: {
            return {
                ...state,
                users: action.payload,
            };
        }

        //  -------- CONSULTATIONS --------
        case ACTIONS.SET_ALL_CONSULTATIONS: {
            let sortedConsults = sortConsultations(action.payload);
            return {
                ...state,
                consults: sortedConsults,
            };
        }
        case ACTIONS.ADD_CONSULTATION: {
            let newConsultList = [...state.consults, action.payload];
            newConsultList = sortConsultations(newConsultList);

            return {
                ...state,
                consults: newConsultList,
            };
        }
        case ACTIONS.UPDATE_CONSULTATION: {
            const updatedConsult = action.payload;
            const consultsWithUpdateRemoved = state.consults.filter(
                (con) => con._id !== updatedConsult._id
            );
            let newConsultList = [...consultsWithUpdateRemoved, updatedConsult];
            newConsultList = sortConsultations(newConsultList);
            return {
                ...state,
                consults: newConsultList,
            };
        }
        default:
            return state;
    }
}
