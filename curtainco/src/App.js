import React from 'react'

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

// global states
import CurtainContext from './config/CurtainCoContext'

// styles
import './styles/Main.css'

// routing
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App() {
    return (

        <Router>

            <CurtainContext>

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

            </CurtainContext>

        </Router>

    );
}

export default App;
