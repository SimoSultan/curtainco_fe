import React from "react";
import { UserDataForm } from "../../export";

function EditUserInformation({ user, handleUpdate }) {
    return (
        <UserDataForm
            user={user}
            formTitle={"Edit Information"}
            handleFunctionFromParent={handleUpdate}
            withAuth={false}
            buttonText={"Update Information"}
            headerInformation={false}
        />
    );
}

export default EditUserInformation;
