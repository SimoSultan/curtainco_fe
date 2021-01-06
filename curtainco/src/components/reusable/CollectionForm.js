import React from "react"

import {
    Typography,
    Grid,
    TextField,
    Button,
    Box,
    MenuItem,
} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import useStyles from "../../components/account/admin/AdminStyles"
import { useCurtainContext } from "../../config/CurtainCoContext"
import FileInput from "./FileInput"
import CollectionSelect from "./CollectionSelect"
import { capitalize } from "../../helpers/appHelpers"

function CollectionForm({
    title,
    buttonText,
    handleTextChange,
    handleSelectChange,
    handleSubmit,
    collection,
    handleRemove,
    handleFileChange,
    setResetFile,
    resetFile,
}) {
    const classes = useStyles()
    const { state } = useCurtainContext()

    function buildSelectOptions(products, category) {
        let productArray = products.filter((prod) => prod.category === category)
        let menuItems = []
        for (let i = 0; i < productArray.length; i++) {
            const prod = productArray[i]
            // ADD A MENU ITEM FOR EACH PRODUCT ON DB
            menuItems.push(
                <MenuItem key={prod._id} value={prod._id}>
                    {prod.name}
                </MenuItem>
            )
            // ADD A FINISHED MENU ITEM AT THE END OF THE DROPDOWN
            if (i === productArray.length - 1) {
                menuItems.push(
                    <MenuItem
                        key={`${category}-noProduct-${productArray.length}`}
                        value="noProduct"
                    >
                        No Product
                    </MenuItem>
                )
            }
        }

        return menuItems
    }

    function buildSelectElements(
        menuItems,
        handleSelectChange,
        collection,
        category,
        numberOfInputs
    ) {
        let selectArray = []
        for (let i = 0; i < numberOfInputs; i++) {
            // WHEN INDEX IS 0 FOR A TRACK, LABEL NAME = TRACK 1
            // THIS IS TO DISPLAY 1 - 4 FOR THE USER
            // INSTEAD OF 0 - 3
            let labelName = `${capitalize(category)} ${i + 1}`

            selectArray.push(
                <CollectionSelect
                    menuItems={menuItems}
                    handleSelectChange={handleSelectChange}
                    collection={collection}
                    labelName={labelName}
                    category={category}
                    index={i}
                    key={labelName}
                />
            )
        }
        return selectArray
    }

    let fabricItems = buildSelectOptions(state.products, "Fabric")
    let trackItems = buildSelectOptions(state.products, "Track")
    let accessoryItems = buildSelectOptions(state.products, "Accessory")

    let fabricSelects = buildSelectElements(
        fabricItems,
        handleSelectChange,
        collection,
        "fabric",
        4
    )
    let trackSelects = buildSelectElements(
        trackItems,
        handleSelectChange,
        collection,
        "track",
        4
    )
    let accessorySelects = buildSelectElements(
        accessoryItems,
        handleSelectChange,
        collection,
        "accessory",
        4
    )

    return (
        <>
            <Box pb={1}>
                <Grid container justify="center" alignItems="center">
                    <Grid item xs={3}>
                        {collection.imgUrl !== "" ? (
                            <img
                                src={
                                    collection.imgUrl !== ""
                                        ? collection.imgUrl
                                        : ""
                                }
                                alt={
                                    collection.imgUrl === ""
                                        ? ""
                                        : `${collection.name}`
                                }
                                className={classes.editFormImage}
                            />
                        ) : (
                            ""
                        )}
                    </Grid>
                    <Grid
                        item
                        container
                        justify="center"
                        alignItems="center"
                        xs={9}
                        spacing={2}
                    >
                        <Grid item xs={12}>
                            <Typography
                                variant="h6"
                                style={{ textAlign: "center" }}
                            >
                                {title}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FileInput
                                handleFileChange={handleFileChange}
                                resetFile={resetFile}
                                setResetFile={setResetFile}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Box>

            <Grid container spacing={1} justify="center" alignItems="center">
                <Grid item xs={12} sm={5}>
                    <TextField
                        id="collection-input"
                        label="Collection Name"
                        variant="outlined"
                        name="name"
                        fullWidth
                        onChange={handleTextChange}
                        value={collection.name}
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <TextField
                        label="Collection Description"
                        variant="outlined"
                        name="description"
                        multiline
                        fullWidth
                        onChange={handleTextChange}
                        value={collection.description}
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <TextField
                        id="collection-price-input"
                        label="Price"
                        variant="outlined"
                        type="number"
                        name="price"
                        fullWidth
                        onChange={handleTextChange}
                        value={collection.price}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Fabric Tip"
                        variant="outlined"
                        name="fabricTip"
                        fullWidth
                        onChange={handleTextChange}
                        value={collection.fabricTip}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Track Tip"
                        variant="outlined"
                        name="trackTip"
                        multiline
                        fullWidth
                        onChange={handleTextChange}
                        value={collection.trackTip}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Accessory Tip"
                        variant="outlined"
                        name="accessoryTip"
                        multiline
                        fullWidth
                        onChange={handleTextChange}
                        value={collection.accessoryTip}
                    />
                </Grid>
                <Grid
                    item
                    container
                    direction="column"
                    xs={12}
                    sm={4}
                    spacing={1}
                >
                    {fabricSelects}
                </Grid>

                <Grid
                    item
                    container
                    direction="column"
                    xs={12}
                    sm={4}
                    spacing={1}
                >
                    {trackSelects}
                </Grid>
                <Grid
                    item
                    container
                    direction="column"
                    xs={12}
                    sm={4}
                    spacing={1}
                >
                    {accessorySelects}
                </Grid>

                {collection ? (
                    <Grid
                        item
                        container
                        justify="space-between"
                        alignItems="center"
                        xs={12}
                        style={{ marginTop: "5%" }}
                    >
                        {/* IF THE REMOVE HANDLER WAS PASSED IN, SHOW THE DELETE BUTTON */}
                        <Grid item>
                            {handleRemove ? (
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<DeleteIcon />}
                                    onClick={handleRemove}
                                >
                                    Delete
                                </Button>
                            ) : (
                                ""
                            )}
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                            >
                                {buttonText}
                            </Button>
                        </Grid>
                    </Grid>
                ) : (
                    ""
                )}
            </Grid>
        </>
    )
}

export default CollectionForm
