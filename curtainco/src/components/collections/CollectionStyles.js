import { makeStyles } from "@material-ui/core/styles"
const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(3),
        width: "60%",
    },
    link: {
        textDecoration: "none",
        color: "inherit",
    },
    collectionHeaderImage: {
        width: "60%",
    },
    collectionHeaderCont: {
        width: "50%",
        margin: "0 auto",
    },
    collectionList: {
        width: "100%",
    },
    accordionRoot: {
        width: "100%",
    },
    accordionHeading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    accordionDetails: {
        width: "90%",
        margin: "0 auto",
    },
    accordionDataItemSelected: {
        border: "2px solid royalBlue",
        padding: "4px",
        cursor: "pointer",
        height: "100px",
        width: "100px",
        objectFit: "cover",
    },
    accordionDataItem: {
        padding: "6px",
        cursor: "pointer",
        height: "100px",
        width: "100px",
        objectFit: "cover",
    },
}))

export default useStyles
