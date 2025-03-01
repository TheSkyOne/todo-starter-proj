import { userService } from "../services/user.service.js"

const SET_USER = "SET_USER"
const SET_BALANCE = "SET_BALANCE"

const initialState = {
    user: userService.getLoggedinUser()
}

export function userReducer(state = initialState, cmd) {
    switch (cmd.type) {
        case SET_USER:
            return {...state, user: cmd.user}
        
        case SET_BALANCE:
            return {...state, user: {...state.user, balance: cmd.newBalance}}

        default: return state
    }
}
