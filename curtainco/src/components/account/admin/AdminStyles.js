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
    optionItem: {
        color: "black",
    },
    selectPlaceholder: {
        color: "rgba(0, 0, 0, 0.57)",
    },
    checkboxSelected: {
        color: "rgba(0, 0, 0, 0.47)",
    },
    accessorySubHeading: {
        fontWeight: "bold",
        marginBottom: "2%",
    },
    accessoryCont: {
        margin: "4% 0",
    },
    tableContainer: {
        height: window.innerHeight > 1080 ? 800 : 400,
    },
    editFormImage: {
        height: "100px",
        width: "100px",
        objectFit: "contain",
    },
}));

export default useStyles;
