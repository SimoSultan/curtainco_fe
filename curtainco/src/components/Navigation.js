import React from 'react'

import { 
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

import { Link, withRouter } from "react-router-dom";


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


function Navigation() {
    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>

                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>

                <Typography variant="h6" className={classes.title}>
                    The Curtain Co
                </Typography>

                <Button color="inherit">
                    <Link className={classes.link} to="/">Home</Link>
                </Button>

                <Button color="inherit">
                    <Link className={classes.link} to="/login">Login</Link>
                </Button>
                
            </Toolbar>
        </AppBar>
    )
}

export default withRouter(Navigation);