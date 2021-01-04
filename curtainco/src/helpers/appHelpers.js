function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function isEmpty(object) {
    return Object.keys(object).length === 0;
}

function isPhotoPresent(photo) {
    return photo.size !== undefined;
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
    isPhotoPresent,
    displayShortDate,
};
