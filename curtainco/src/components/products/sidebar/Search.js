import React from "react";

import { TextField } from "@material-ui/core";

function Search({ searchInput, handleChange }) {
    return (
        <>
            <TextField
                name="search-product"
                variant="outlined"
                fullWidth
                id="search-product"
                label="Search Name"
                value={searchInput}
                onChange={handleChange}
            />
        </>
    );
}

export default Search;
