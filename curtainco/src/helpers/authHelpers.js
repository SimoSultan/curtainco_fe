function loginFieldAreBad(field, type) {
    if (field === "") {
        return "Field must not be empty"
    }
    if (
        (type === "email" && !field.includes("@")) ||
        (type === "email" && !field.includes("."))
    ) {
        return "Email is badly formatted"
    }

    if (
        (type === "password" && field.length < 6) ||
        (type === "password" && field.length > 32)
    ) {
        return "Password must be between 6 and 32 characters"
    }
    return false
}

export { loginFieldAreBad }
