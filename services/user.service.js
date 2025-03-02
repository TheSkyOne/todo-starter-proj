import { storageService } from "./async-storage.service.js"


export const userService = {
    getLoggedinUser,
    login,
    logout,
    signup,
    getById,
    query,
    getEmptyCredentials,
    updateUserBalance,
    updateUserFullname,
    updateUserActivities,
    clearActivities
}

const STORAGE_KEY_LOGGEDIN = 'user'
const STORAGE_KEY = 'userDB'

function query() {
    return storageService.query(STORAGE_KEY)
}

function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

function login({ username, password }) {
    return storageService.query(STORAGE_KEY)
        .then(users => {
            const user = users.find(user => user.username === username)
            if (user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid login')
        })
}

function signup({ username, password, fullname }) {
    const user = {
        username,
        password,
        fullname,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        balance: 0,
        activities: [],
        prefs: { color: "black", bgColor: "white" }
    }


    return storageService.post(STORAGE_KEY, user)
        .then(_setLoggedinUser)
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, balance: user.balance, activities: user.activities, prefs: user.prefs }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function getEmptyCredentials() {
    return {
        fullname: '',
        username: 'muki',
        password: 'muki1',
    }
}

function updateUserBalance(newBalance) {
    const currentUser = getLoggedinUser()
    const updatedUser = { ...currentUser, balance: newBalance }
    _setLoggedinUser(updatedUser)
    return storageService.put(STORAGE_KEY, updatedUser)
}

function updateUserFullname(newFullname) {
    const currentUser = getLoggedinUser()
    if (!currentUser) throw "Please log-in to update your name"

    const updatedUser = { ...currentUser, fullname: newFullname }
    _setLoggedinUser(updatedUser)
    return storageService.put(STORAGE_KEY, updatedUser)
}

function updateUserActivities(newActivity) {
    const currentUser = getLoggedinUser()
    var newActivities = currentUser.activities
    var found = false

    for (let i = 0; i < newActivities.length; i++) {
        if (newActivities[i].creationTime === newActivity.creationTime) {
            newActivities[i] = newActivity
            found = true
            break
        }
    }

    if (!found) newActivities.push(newActivity)

    const updatedUser = { ...currentUser, activities: newActivities }
    _setLoggedinUser(updatedUser)
    return storageService.put(STORAGE_KEY, updatedUser)
}

export function createActivity(desc) {
    const creationTime = Date.now()
    const formattedTimestamp = _formatActivityTimestamp(creationTime)
    return { creationTime, desc, displayText: `${formattedTimestamp}: ${desc}` }
}

export function updateActivity(activity) {
    const reformattedTimestamp = _formatActivityTimestamp(activity.creationTime)
    activity.displayText = `${reformattedTimestamp}: ${activity.desc}`
    updateUserActivities(activity)
}

function clearActivities() {
    const currentUser = getLoggedinUser()
    const updatedUser = { ...currentUser, activities: [] }
    _setLoggedinUser(updatedUser)
    return storageService.put(STORAGE_KEY, updatedUser)
}

function _formatActivityTimestamp(timeMillis) {
    const diff = Date.now() - timeMillis
    const minute_millisec = 60000
    const minutes_passed = Math.floor(diff / minute_millisec)
    const hours_passed = Math.floor(minutes_passed / 60)

    if (minutes_passed < 1) return "Just now"
    if (minutes_passed < 2) return "A minute ago"
    if (minutes_passed < 60) return `${minutes_passed} minutes ago`
    if (hours_passed < 2) return "An hour ago"
    if (hours_passed < 24) return `${hours_passed} hours ago`

    return "A while ago"
}

// signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// login({username: 'muki', password: 'muki1'})

// Data Model:
// const user = {
//     _id: "KAtTl",
//     username: "muki",
//     password: "muki1",
//     fullname: "Muki Ja",
//     createdAt: 1711490430252,
//     updatedAt: 1711490430999
// }