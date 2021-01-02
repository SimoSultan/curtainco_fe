import React, { useEffect } from "react";

import { useCurtainContext } from "./config/CurtainCoContext";
import { ACTIONS } from "./config/stateReducer";

import "./styles/Main.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { getLoggedInUser } from "./services/authServices";

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
} from "./components/export.js";

function App() {
    const { state, dispatch } = useCurtainContext();

    useEffect(() => {
        if (state.currentUser === null) {
            getLoggedInUser()
                .then((resp) => {
                    let currentUser = resp.data.user;
                    if (currentUser) {
                        dispatch({
                            type: ACTIONS.SET_CURRENT_USER,
                            payload: currentUser,
                        });
                    } else {
                        console.log("No user logged in on page reload");
                    }
                })
                .catch((error) => {
                    console.log(
                        `An error ocurred on getLoggedInUser: ${error}.`
                    );
                });
        }
    }, [dispatch, state.currentUser]);

    return (
        <Router>
            <NavBar />

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
                <Route exact path="/request" component={RequestConsultation} />
                <Route exact path="/account" component={Account} />
            </Switch>

            <CustomSnackbar
                severity={state.snackbar.severity}
                open={state.snackbar.open}
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
    );
}

export default App;
