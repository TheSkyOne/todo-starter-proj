import { todoReducer } from "./todo.reducer.js"

const { createStore, combineReducers, compose } = Redux

// const rootReducer = combineReducers({
//     todoState: todoReducer
//   })

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(todoReducer, composeEnhancers())