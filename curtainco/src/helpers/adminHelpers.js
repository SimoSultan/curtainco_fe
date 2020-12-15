function getRoute(page) {
    let route = "";

    if (page.includes("Add")) {
        let firstPart = page.split(" ")[1].toLowerCase();
        route = "/account/" + firstPart + "/add";
    } else {
        route = "/account/" + page.toLowerCase();
    }

    return route;
}

export { getRoute };
