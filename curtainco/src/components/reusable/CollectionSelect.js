import React from "react";

import { FormControl, Grid, InputLabel, Select } from "@material-ui/core";
import useStyles from "../../components/account/admin/AdminStyles";

function CollectionSelect({
    menuItems,
    handleSelectChange,
    collection,
    labelName,
    category,
    index,
}) {
    const classes = useStyles();
    return (
        <Grid item xs={12}>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor={`collection-input-${category}-${index}`}>
                    {labelName}
                </InputLabel>
                <Select
                    label={labelName}
                    defaultValue={collection[category][index] || ""}
                    inputProps={{
                        name: `${category}-${index}`,
                        id: `collection-input-${category}-${index}`,
                    }}
                    onChange={handleSelectChange}
                    value={
                        collection[category][index] === "" ||
                        collection[category][index] === undefined
                            ? ""
                            : collection[category][index]
                    }
                >
                    {menuItems}
                </Select>
            </FormControl>
        </Grid>
    );
}

export default CollectionSelect;
