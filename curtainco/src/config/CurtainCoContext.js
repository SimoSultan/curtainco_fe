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
        },
        products: [],
        collections: [],
        customizedCollection: { track: [], fabric: [], accessory: [] },
        consults: [],
        cart: [],
    }

    const [state, dispatch] = useReducer(stateReducer, initialState)

    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    )
}

export default CurtainContext
