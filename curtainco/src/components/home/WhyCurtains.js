import React from "react"
import { Link } from "react-router-dom"
import { Button, Typography } from "@material-ui/core"

function WhyCurtains() {
    return (
        <div>
            <Typography variant="h3" component="h3">
                Why Curtains?
            </Typography>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequatur maiores veritatis tempora nostrum, laudantium
                repellat voluptatem, error hic ipsum in debitis doloribus nulla
                autem odit voluptas soluta asperiores deleniti perspiciatis!
            </p>
            <Button variant="contained" color="secondary">
                <Link to={`/collections`} className="link">
                    Collections
                </Link>
            </Button>
        </div>
    )
}

export default WhyCurtains
