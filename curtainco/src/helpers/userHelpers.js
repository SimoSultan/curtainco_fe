function getFirstNameFromFullName(fullName) {
    return fullName.split(",")[0];
}
function getLastNameFromFullName(fullName) {
    return fullName.split(",")[1];
}
module.exports = {
    getFirstNameFromFullName,
    getLastNameFromFullName,
};
