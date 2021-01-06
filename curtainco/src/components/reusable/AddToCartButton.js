import React from "react"
import { Button } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart"

function AddToCartButton({ icon, text, size, handleClick }) {
    return (
        <Button
            variant="contained"
            color="secondary"
            size={size}
            onClick={handleClick}
        >
            {icon && <AddIcon fontSize="small" />}
            {text !== false ? text : ""}
        </Button>
    )
}

AddToCartButton.defaultProps = {
    size: "medium",
}

export default AddToCartButton
