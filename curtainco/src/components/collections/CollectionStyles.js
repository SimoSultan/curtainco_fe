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
}));

export default useStyles;
