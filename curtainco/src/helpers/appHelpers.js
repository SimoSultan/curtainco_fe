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

function displayShortDate(createdAt) {
    // let newDate = date.substr(0, 10);
    // let newDate = new Date(createdAt);
    let [month, date, year] = new Date(createdAt)
        .toLocaleDateString("en-US")
        .split("/");
    let dateStr = `${date}.${month}.${year}`;

    return dateStr;
}

module.exports = {
    capitalize,
    isEmpty,
    displayShortDate,
};
