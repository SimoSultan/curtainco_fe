import React from 'react'

import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Grid } from '@material-ui/core';

function PurchasedItem( { item } ) {
    return (
        <>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText 
                    primary={ item.type } 
                    secondary={
                        <Grid container justify="space-between" alignItems="center">
                            <Grid item>{`Purchased: ${item.date}`}</Grid>
                            <Grid item>{`Amount: $${item.amount}`}</Grid>
                        </Grid>
                    }
                />
            </ListItem>

            <Divider variant="inset" component="li" />
        </>
    )
}

export default PurchasedItem
