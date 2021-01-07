import React from "react"

import { useCurtainContext } from "../../config/CurtainCoContext"
import { ACTIONS } from "../../config/stateReducer"

import { logoutUser } from "../../services/authServices"
import { Link, withRouter } from "react-router-dom"

import { AppBar, Toolbar, Typography, Button } from "@material-ui/core"

import useStyles from "./NavigationStyles"

function NavBar() {
    const classes = useStyles()

    const { state, dispatch } = useCurtainContext()

    function handleLogout(e) {
        e.preventDefault()

        logoutUser()
            .then((resp) => {
                console.log("Got back response on logout", resp.status)
                // logout the user locally
                if (resp.status === 204) {
                    dispatch({ type: ACTIONS.LOGOUT })
                }
            })
            .catch((error) => {
                console.log(
                    "The server may be down - caught an exception on logout:",
                    error
                )
            })
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    <Link className={classes.link} to="/">
                        The Curtain Co
                    </Link>
                </Typography>

                <Button color="inherit">
                    <Link className={classes.link} to="/">
                        Home
                    </Link>
                </Button>

                <Button color="inherit">
                    <Link className={classes.link} to="/collections">
                        Collections
                    </Link>
                </Button>

                <Button color="inherit">
                    <Link className={classes.link} to="/products">
                        Products
                    </Link>
                </Button>

                <Button color="inherit">
                    <Link className={classes.link} to="/about">
                        About
                    </Link>
                </Button>

                <Button color="inherit">
                    <Link className={classes.link} to="/cart">
                        Cart
                    </Link>
                </Button>

                {state.loggedIn ? (
                    <Button color="inherit">
                        <Link className={classes.link} to="/account">
                            Account
                        </Link>
                    </Button>
                ) : (
                    ""
                )}

                {state.loggedIn ? (
                    <Button color="inherit" onClick={handleLogout}>
                        <Link className={classes.link} to="/">
                            Logout
                        </Link>
                    </Button>
                ) : (
                    <Button color="inherit">
                        <Link
                            className={classes.link}
                            to={{
                                pathname: "/login",
                                state: {
                                    prevUrl: window.location.href,
                                },
                            }}
                        >
                            Login
                        </Link>
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default withRouter(NavBar)
