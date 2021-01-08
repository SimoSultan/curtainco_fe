import React, { useEffect } from "react"
import { useCurtainContext } from "./config/CurtainCoContext"
import { ACTIONS } from "./config/stateReducer"
import { Container } from "@material-ui/core"
import "./styles/Main.css"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { getLoggedInUserFromHomeRoute } from "./services/authServices"

import {
    NavBar,
    Home,
    Footer,
    About,
    Collections,
    CollectionCustomise,
    Products,
    Cart,
    Account,
    Login,
    Register,
    RequestConsultation,
    CustomSnackbar,
    CustomModal,
    PageNotFound,
} from "./components/export.js"

function App() {
    const { state, dispatch } = useCurtainContext()

    useEffect(() => {
        if (state.currentUser === null) {
            getLoggedInUserFromHomeRoute()
                .then((resp) => {
                    let currentUser = resp.data.user
                    if (currentUser && resp.status === 200) {
                        dispatch({
                            type: ACTIONS.SET_CURRENT_USER,
                            payload: currentUser,
                        })
                    } else {
                        console.log("No user logged in on page reload")
                    }
                })
                .catch((error) => {
                    console.log(
                        `An error ocurred on getLoggedInUserFromHomeRoute: ${error}.`
                    )
                })
        }
    }, [dispatch, state.currentUser])

    return (
        <Router>
            <NavBar />

            <Container className="app-container" component="main">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/collections" component={Collections} />
                    <Route
                        exact
                        path="/collections/customise/:id"
                        component={CollectionCustomise}
                    />
                    <Route exact path="/products" component={Products} />
                    <Route exact path="/cart" component={Cart} />
                    <Route
                        exact
                        path="/request"
                        component={RequestConsultation}
                    />
                    <Route exact path="/account" component={Account} />
                    <Route component={PageNotFound} />
                </Switch>
            </Container>

            <CustomSnackbar
                open={state.snackbar.open}
                severity={state.snackbar.severity}
                message={state.snackbar.message}
            />
            <CustomModal
                title={state.modal.title}
                open={state.modal.open}
                message={state.modal.message}
                data={state.modal.data}
            />
            <Footer />
        </Router>
    )
}

export default App
