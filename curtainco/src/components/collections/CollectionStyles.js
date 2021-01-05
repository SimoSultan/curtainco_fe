import { makeStyles } from "@material-ui/core/styles";
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
        width: "80%",
        margin: "0 auto",
    },
    accordionDataItemSelected: {
        border: "1px solid black",
        padding: "8px 0 4px 0",
        cursor: "pointer",
    },
    accordionDataItem: {
        padding: "8px 0 4px 0",
        cursor: "pointer",
    },
}));

export default useStyles;
