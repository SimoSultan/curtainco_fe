import Navigation from './components/Navigation';
import Home from './components/Home';
import Footer from './components/Footer';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

import './styles/Main.css'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (

    <Router>

        <Navigation />

        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
        </Switch>

        <Footer />

    </Router>

  );
}

export default App;
