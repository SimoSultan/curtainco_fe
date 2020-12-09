import { colors } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
    heading: {
        textAlign: 'center',
    },
    purchaseHistoryRoot: {
        width: '100%',
        maxWidth: '36ch',
    },
    textCenter: {
        textAlign: 'center'
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
    }
}));


export default useStyles