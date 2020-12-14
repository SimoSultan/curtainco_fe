import React from "react";

import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

function PurchasedItem({ item }) {
    return (
        <>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                    />
                </ListItemAvatar>

                <ListItemText
                    primary={item.type}
                    secondary={`Purchased: ${item.date} Amount: $${item.amount}`}
                />
            </ListItem>

            <Divider variant="inset" component="li" />
        </>
    );
}

export default PurchasedItem;
