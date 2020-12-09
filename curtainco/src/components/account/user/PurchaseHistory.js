import React from 'react'

import PurchasedItem from './PurchasedItem'

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List';

import useStyles from './UserDashboardStyles'

// Generate Order Data
function createData(id, date, type, amount) {
    return { id, date, type, amount };
  }
  
const rows = [
    createData(0, '16 Mar, 2019', 'fabric', 312.44),
    createData(1, '16 Mar, 2019', 'rod', 866.99),
    createData(2, '16 Mar, 2019', 'accessory', 100.81),
];


const allPurchasedItems = rows.map(item => <PurchasedItem key={item.id} item={item} />)


function PurchaseHistory() {
    const classes = useStyles()

    return (
        <Container>
            <Typography variant="h5" className={classes.heading}>
                Purchase History
            </Typography>

            <List className={classes.purchaseHistoryRoot}>
                { allPurchasedItems }
            </List>
            
        </Container>
    )
}

export default PurchaseHistory
