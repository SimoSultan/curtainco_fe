import React from "react";
import {
    List,
    ListItem,
    ListItemText,
    Typography,
    Grid,
} from "@material-ui/core";

function CollectionIncludes({ fabrics, tracks, accessories, price }) {
    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Grid item>
                <Typography variant="h5" component="h5">
                    Your Collection Includes
                </Typography>
            </Grid>
            <Grid item>
                <List style={{ width: "100%" }}>
                    <ListItem key={`fabric-length-${fabrics.length}`}>
                        <ListItemText
                            primary={`- ${fabrics.length}x ${
                                fabrics.length < 2 ? "Fabric" : "Fabrics"
                            }`}
                        />
                    </ListItem>
                    <ListItem key={`track-length-${tracks.length}`}>
                        <ListItemText
                            primary={`- ${tracks.length}x ${
                                tracks.length < 2 ? "Track" : "Tracks"
                            }`}
                        />
                    </ListItem>
                    <ListItem key={`accessories-length-${accessories.length}`}>
                        <ListItemText
                            primary={`- ${accessories.length}x ${
                                accessories.length < 2
                                    ? "Accessory"
                                    : "Accessories"
                            }`}
                        />
                    </ListItem>
                </List>
            </Grid>
            <Grid item>
                <Typography variant="h6" component="h6">
                    {`Total: $${price}`}
                </Typography>
            </Grid>
        </Grid>
    );
}

export default CollectionIncludes;
