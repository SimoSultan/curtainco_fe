import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
    heading: {
        textAlign: "center",
    },
    purchaseHistoryRoot: {
        width: "100%",
        // maxWidth: "36px",
    },
    textCenter: {
        textAlign: "center",
    },
    link: {
        textDecoration: "none",
        color: "inherit",
    },
    orderImg: {
        height: "100px",
        width: "100px",
        objectFit: "contain",
    },
}))

export default useStyles
