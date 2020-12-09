import React from 'react'
// global state
import { useCurtainContext } from '../../config/CurtainCoContext'
import { ACTIONS } from '../../config/stateReducer';
// authentication services
import { logoutUser } from '../../services/authServices'
// routing
import { Link, withRouter } from "react-router-dom";

// material ui
import { 
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
// material icons
import MenuIcon from '@material-ui/icons/Menu';



const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    link: {
        color: '#fff',
        textDecoration: 'none'
    },
}));





function NavBar() {
    const classes = useStyles();

    const { state, dispatch } = useCurtainContext()

    function handleLogout(e) {
        e.preventDefault()

        logoutUser().then((response) => {
            console.log("Got back response on logout", response.status)
        }).catch ((error) => {
            console.log("The server may be down - caught an exception on logout:", error)
        })
        // Even if we catch an error, logout the user locally
        dispatch({type: ACTIONS.LOGOUT})

    }

    return (
        <AppBar position="static">
            <Toolbar>

                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>

                <Typography variant="h6" className={classes.title}>
                    <Link className={classes.link} to="/">The Curtain Co</Link>
                </Typography>

                <Button color="inherit">
                    <Link className={classes.link} to="/">Home</Link>
                </Button>

                <Button color="inherit">
                    <Link className={classes.link} to="/collections">Collections</Link>
                </Button>

                <Button color="inherit">
                    <Link className={classes.link} to="/products">Products</Link>
                </Button>

                <Button color="inherit">
                    <Link className={classes.link} to="/about">About</Link>
                </Button>

                <Button color="inherit">
                    <Link className={classes.link} to="/cart">Cart</Link>
                </Button>

                {
                    state.loggedIn
                    ?   <Button color="inherit">
                            <Link className={classes.link} to="/account" >Account</Link>
                        </Button>
                    :   ''
                }

                {
                    state.loggedIn
                    ?   <Button color="inherit" onClick={handleLogout}>
                            <Link className={classes.link} to="/" >Logout</Link>
                        </Button>
                    :   <Button color="inherit">
                            <Link className={classes.link} to="/login" >Login</Link>
                        </Button>
                }
                

            </Toolbar>
        </AppBar>
    )
}

export default withRouter(NavBar);