import React, { useReducer, createContext, useContext } from "react"
import stateReducer from "./stateReducer"

const Context = createContext()

export function useCurtainContext() {
    return useContext(Context)
}

function CurtainContext({ children }) {
    // initial state for state reducer
    const initialState = {
        loggedIn: null,
        currentUser: null,
        users: [],
        snackbar: {
            severity: "success",
            message: "",
            open: false,
        },
        modal: {
            open: false,
            title: "",
            message: "",
            data: {},
            paymentSummary: false,
            orderSummary: false,
        },
        products: [],
        collections: [],
        customizedCollection: { track: [], fabric: [], accessory: [] },
        consults: [],
        orders: [],
        cart: [],
        discounts: {
            mostProductsMultiplier: 0.85,
            someProductsMultiplier: 0.87,
            littleProductsMultiplier: 0.89,
        },
    }

    const [state, dispatch] = useReducer(stateReducer, initialState)

    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    )
}

export default CurtainContext
