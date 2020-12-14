import React, { useState } from "react";

import { TextField, MenuItem } from "@material-ui/core";

const sortFields = [
    "Price: Low to High",
    "Price: High to Low",
    "Name: A to Z",
    "Name: Z to A",
    "Featured",
    "On Sale",
];

const sortItems = sortFields.map((field) => (
    <MenuItem value={field} key={field}>
        {field}
    </MenuItem>
));

function Sort() {
    const [sortBy, setSortBy] = useState("Featured");

    function handleChange(e) {
        setSortBy(e.target.value);
    }

    return (
        <>
            <TextField
                id="sort-by"
                variant="outlined"
                label="Sort"
                value={sortBy}
                select
                onChange={handleChange}
                fullWidth
            >
                {sortItems}
            </TextField>
        </>
    );
}

export default Sort;
