import React, { useEffect } from 'react'
// context provider
// import CurtainContext from './config/CurtainCoContext'
// global state
import { useCurtainContext } from './config/CurtainCoContext'
import { ACTIONS } from './config/stateReducer'
// styles
import './styles/Main.css'
// routing
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { getLoggedInUser } from "./services/authServices";

// components
import {
    Navigation,
    Home,
    Footer,
    About,
    Collections,
    Products,
    Cart,
    Account,
    Login,
    Register,
} from './components/export.js'




function App() {

    const { state, dispatch } = useCurtainContext()

    useEffect(() => {

        if (state.currentUser === null) {
            getLoggedInUser().then((resp) => {
                let currentUser = resp.data.user
                if(currentUser) {
                    dispatch({type: ACTIONS.SET_CURRENT_USER, payload: currentUser})
                } else {
                    console.log("No user logged in on page reload")
                }
            }).catch((error) => {
                console.log(`An error ocurred on getLoggedInUser: ${error}.`);
            })
        }

    }, [])

    return (

            
            <Router>

                <Navigation />

                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/collections" component={Collections} />
                    <Route exact path="/products" component={Products} />
                    <Route exact path="/cart" component={Cart} />
                    <Route exact path="/account" component={Account} />
                </Switch>

                <Footer />

            </Router>


    );
}

export default App;
