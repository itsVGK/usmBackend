"use strict"

let Email = (email) => {
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (email.match(emailRegex)) {
        return email
    } else {
        return false
    }
}

/* Minimum 8 characters which contain only characters,numeric digits, underscore and first character must be a letter */
let Password = (password) => {
    let passwordRegex = /^[A-Za-z0-9]\w{7,}$/
    if (password.match(passwordRegex)) {
        return password
    } else {
        return false
    }
}

let trim = (x) => {
    let value = String(x)
    return value.replace(/^\s+|\s+$/gm, '')
}

let isEmpty = (value) => {
    if (value === null || value === undefined || trim(value) === '' || value.length === 0) {
        return true
    } else {
        return false
    }
}

module.exports = {
    Email: Email,
    Password: Password,
    isEmpty: isEmpty,
    trim: trim
}
