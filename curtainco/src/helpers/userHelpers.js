function getFirstNameFromFullName(fullName) {
    return fullName.split(",")[0];
}

function getLastNameFromFullName(fullName) {
    return fullName.split(",")[1];
}

// function splitFullName(fullName) {
//     let firstName = fullName.split(",")[0];
//     let lastName = fullName.split(",")[1];
//     return [firstName, lastName];
// }

function checkIfRequiredUserDataFormFieldsAreEmpty(userDetails) {
    delete userDetails.title;
    delete userDetails.companyName;
    let values = Object.values(userDetails);
    if (values.includes("") || values.includes(undefined)) return true;
    return false;
}
module.exports = {
    getFirstNameFromFullName,
    getLastNameFromFullName,
    checkIfRequiredUserDataFormFieldsAreEmpty,
    // splitFullName,
};
