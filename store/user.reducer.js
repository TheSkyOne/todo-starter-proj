import { userService } from "../services/user.service.js"

const SET_USER = "SET_USER"
const SET_BALANCE = "SET_BALANCE"
const SET_FULLNAME = "SET_FULLNAME"
const ADD_ACTIVITY = "ADD_ACTIVITY"
const CLEAR_ACTIVITIES = "CLEAR_ACTIVITIES"

const initialState = {
    user: userService.getLoggedinUser()
}

export function userReducer(state = initialState, cmd) {
    switch (cmd.type) {
        case SET_USER:
            return { ...state, user: cmd.user }

        case SET_BALANCE:
            return { ...state, user: { ...state.user, balance: cmd.newBalance } }

        case SET_FULLNAME:
            return { ...state, user: { ...state.user, fullname: cmd.newFullname } }
        
        case ADD_ACTIVITY:
            return { ...state, user: { ...state.user, activities: [...state.user.activities, cmd.newActivity] } }

        case CLEAR_ACTIVITIES:
            return { ...state, user: { ...state.user, activities: [] } }
        
        default: return state
    }
}
