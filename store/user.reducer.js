import { userService } from "../services/user.service.js"

const SET_USER = "SET_USER"

const initialState = {
    user: userService.getLoggedinUser()
}

export function userReducer(state = initialState, cmd) {
    switch (cmd.type) {
        case SET_USER:
            return {...state, user: cmd.user}

        default: return state
    }
}
