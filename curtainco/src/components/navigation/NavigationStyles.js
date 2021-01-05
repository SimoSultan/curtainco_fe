import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
    link: {
        color: "#fff",
        textDecoration: "none",
    },

    footerRoot: {
        position: "absolute",
        // bottom: -150,
        // height: "92px",
        bottom: 0,
        height: "fit-content",
        width: "100%",
        zIndex: "100",
    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
    },
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: "auto",
        backgroundColor:
            theme.palette.type === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
    },
}));

export default useStyles;
