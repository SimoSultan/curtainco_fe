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
    tableRowHover: {
        cursor: "pointer",
    },
    formControl: {
        minWidth: 120,
        width: "100%",
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    fullWidth: {
        width: "100%",
    },
    optionItem: {
        color: "black",
    },
    selectPlaceholder: {
        color: "rgba(0, 0, 0, 0.57)",
    },
    checkboxSelected: {
        color: "rgba(0, 0, 0, 0.47)",
    },
}));

export default useStyles;
