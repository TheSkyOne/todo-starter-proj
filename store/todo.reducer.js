import { todoService } from "../services/todo.service.js"

const SET_TODOS = "SET_TODOS"
const ADD_TODO = "ADD_TODO"
const REMOVE_TODO = "REMOVE_TODO"
const UPDATE_TODO = "UPDATE_TODO"

const SET_FILTER = "SET_FILTER"
const SET_IS_LOADING = "SET_IS_LOADING"


const initialState = {
    todoList: [],
    isLoading: false,
    filter: {}
}

export function todoReducer(state = initialState, cmd) {
    switch (cmd.type) {
        case SET_TODOS:
            return { ...state, todoList: cmd.todoList }

        case ADD_TODO:
            return { ...state, todoList: [...state.todoList, cmd.newTodo] }

        case REMOVE_TODO:
            return { ...state, todoList: state.todoList.filter(todo => todo._id !== cmd.todoId) }

        case UPDATE_TODO:
            return { ...state, todoList: state.todoList.map(todo => todo._id === cmd.updatedTodo._id ? cmd.updatedTodo : todo) }

        case SET_FILTER:
            return { ...state, filter: cmd.newFilter }

        case SET_IS_LOADING:
            return { ...state, isLoading: cmd.isLoading }

        default: return state
    }
}
