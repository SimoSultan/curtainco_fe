import React, { useState, useEffect } from "react"
import {
    List,
    ListItem,
    ListItemText,
    Typography,
    Grid,
} from "@material-ui/core"

function CollectionIncludes({ fabrics, tracks, accessories, price, discount }) {
    const [lengths, setLengths] = useState({
        fabricLength: 0,
        trackLength: 0,
        accessoryLength: 0,
    })

    useEffect(() => {
        let f = fabrics.filter((fab) => fab !== false).length
        let t = tracks.filter((tra) => tra !== false).length
        let a = accessories.filter((acc) => acc !== false).length
        setLengths({ fabricLength: f, trackLength: t, accessoryLength: a })
    }, [fabrics, tracks, accessories])

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
                            primary={`- ${lengths.fabricLength} ${
                                lengths.fabricLength === 1
                                    ? "Fabric"
                                    : "Fabrics"
                            }`}
                        />
                    </ListItem>
                    <ListItem key={`track-length-${tracks.length}`}>
                        <ListItemText
                            primary={`- ${lengths.trackLength} ${
                                lengths.trackLength === 1 ? "Track" : "Tracks"
                            }`}
                        />
                    </ListItem>
                    <ListItem key={`accessories-length-${accessories.length}`}>
                        <ListItemText
                            primary={`- ${lengths.accessoryLength} ${
                                lengths.accessoryLength === 1
                                    ? "Accessory"
                                    : "Accessories"
                            }`}
                        />
                    </ListItem>
                    <ListItem key="total-length">
                        <ListItemText
                            primary={`Total Products = ${
                                lengths.accessoryLength +
                                lengths.trackLength +
                                lengths.fabricLength
                            } `}
                        />
                    </ListItem>
                </List>
            </Grid>
            <Grid item>
                <Typography variant="h6" component="h6">
                    {`Discount : ${discount * 100}%`}
                </Typography>
            </Grid>
            <Grid item>
                <Typography>
                    (showing discount only for test purposes, unless we want to
                    leave it here in some form?)
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="h6" component="h6">
                    {`Total: $${price.toFixed(2)}`}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default CollectionIncludes
