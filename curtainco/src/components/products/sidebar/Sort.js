import React from "react";

import { TextField, MenuItem } from "@material-ui/core";

function Sort({ sortFields, sortBy, handleChange }) {
    const sortItems = sortFields.map((field) => (
        <MenuItem value={field} key={field}>
            {field}
        </MenuItem>
    ));

    return (
        <>
            <TextField
                id="sort-by"
                variant="outlined"
                label="Sort"
                value={sortBy}
                select
                onChange={handleChange}
            >
                {sortItems}
            </TextField>
        </>
    );
}

export default Sort;
