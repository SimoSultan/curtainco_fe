import React, { useState } from "react";

// ADMIN COMPONENTS
import AdminTabs from "./AdminTabs";

// MAT UI
import { Container, Typography } from "@material-ui/core";

function AdminDashboard() {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Container>
            <AdminTabs tabValue={tabValue} handleChange={handleTabChange} />
        </Container>
    );
}

export default AdminDashboard;
