import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none !important",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "none !important",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: "50%",
        maxWidth: "700px",
        minWidth: "500px",
    },
    closeButton: {
        position: "absolute",
        top: "-7%",
        right: "-7%",
        // border: "1px solid red",
    },
    closeButtonCont: {
        position: "relative",
    },
}))

export default useStyles
