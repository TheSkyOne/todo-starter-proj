import { todoReducer } from "./todo.reducer.js"
import { userReducer } from "./user.reducer.js"

const { createStore, combineReducers, compose } = Redux

const rootReducer = combineReducers({
    todoState: todoReducer,
    userState: userReducer
  })

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())