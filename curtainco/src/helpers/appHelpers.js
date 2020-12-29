function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function isEmpty(object) {
    for (const prop in object) {
        if (object.hasOwnProperty(prop)) {
            return false;
        }
    }
    return true;
}

module.exports = {
    capitalize,
    isEmpty,
};
