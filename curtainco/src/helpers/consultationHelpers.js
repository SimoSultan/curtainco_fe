function sortConsultations(allConsults) {
    // sort by date, newest first
    // then sort by processed, showing unprocessed first
    let sorted = allConsults.sort((a, b) => {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    let completedConsults = [];
    let incompleteConsults = [];

    for (let i = 0; i < sorted.length; i++) {
        const element = sorted[i];
        if (element.isProcessed) {
            completedConsults.push(element);
        } else {
            incompleteConsults.push(element);
        }
    }

    return [...incompleteConsults, ...completedConsults];
}

module.exports = { sortConsultations };
