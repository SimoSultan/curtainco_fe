import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "100%",
        backgroundColor: theme.palette.background.paper,
    },
    seeMore: {
        marginTop: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(3),
    },
    tableRow: {
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "lightgrey",
        },
    },
}));

export default useStyles;
