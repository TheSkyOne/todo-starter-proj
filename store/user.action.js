import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { userService } from "../services/user.service.js"
import { store } from "./store.js"


export function userSignedUp(user) {
    userService.signup({ username: user.username, password: user.password, fullname: user.fullname })
        .then(() => {
            store.dispatch({ type: "SET_USER", user })
            showSuccessMsg("Signed-up successfully!")
        })
        .catch(err => {
            console.log("failed to set user on sign-up")
            showErrorMsg("Failed to sign-up")
            throw err
        })
}

export function userLoggedIn({ username, password }) {
    userService.login({ username, password })
        .then(user => {
            store.dispatch({ type: "SET_USER", user })
            showSuccessMsg("Logged-in successfully!")
        })
        .catch(err => {
            console.log("failed to set user on log-in", err)
            showErrorMsg("Invalid login, please try again.")
            throw err
        })
}

export function userLoggedOut() {
    userService.logout()
        .then(() => {
            store.dispatch({ type: "SET_USER", user: undefined })
            showSuccessMsg("Logged out successfully")
        })
        .catch(err => {
            console.log("failed to set user on log-out")
            showErrorMsg("Failed to log-out")
            throw err
        })
}
