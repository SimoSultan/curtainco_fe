import React, { useState } from "react";

import { TextField } from "@material-ui/core";

function Search() {
    const [searchInput, setSearchInput] = useState("");

    function handleChange(e) {
        e.preventDefault();
        setSearchInput(e.target.value);
    }

    return (
        <>
            <TextField
                name="search-product"
                variant="outlined"
                fullWidth
                id="search-product"
                label="Search Product"
                value={searchInput}
                onChange={handleChange}
            />
        </>
    );
}

export default Search;
