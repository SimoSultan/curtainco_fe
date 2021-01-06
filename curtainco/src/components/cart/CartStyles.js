import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: "80%",
    },
    secondaryIconButton: {
        border: "1px solid red",
    },
    primaryIconButton: {
        border: "1px solid royalBlue",
    },
    cartItemImg: {
        height: "80%",
        width: "100%",
        maxWidth: "150px",
        maxHeight: "100px",
        objectFit: "cover",
    },
    cartItemPrice: {
        fontWeight: "500",
        fontStyle: "italic",
    },
    cartTotalCont: {
        width: "90%",
    },
}))

export default useStyles
