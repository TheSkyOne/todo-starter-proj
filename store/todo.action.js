import { todoService } from "../services/todo.service.js"
import { store } from "./store.js"


export function loadTodos(filter = {}) {
    store.dispatch({ type: "SET_IS_LOADING", isLoading: true })
    todoService.query(filter)
        .then(todoList => store.dispatch({ type: "SET_TODOS", todoList }))
        .catch(err => {
            console.log("failed to load todo list", err)
            throw err
        })
        .finally(() => store.dispatch({ type: "SET_IS_LOADING", isLoading: false }))
}

export function addTodo(newTodo) {
    return todoService.save(newTodo)
        .then(() => store.dispatch({ type: "ADD_TODO", newTodo }))
        .catch(() => {
            console.log("failed to add new todo", err)
            throw err
        })
}

export function removeTodo(todoId) {
    return todoService.remove(todoId)
        .then(() => store.dispatch({ type: "REMOVE_TODO", todoId }))
        .catch(() => {
            console.log("failed to remove todo", err)
            throw err
        })
}

export function updateTodo(updatedTodo) {
    return todoService.save(updatedTodo)
        .then(() => {
            store.dispatch({ type: "UPDATE_TODO", updatedTodo })
            return updatedTodo
        })
        .catch(() => {
            console.log("failed to update todo", err)
            throw err
        })
}

export function setFilter(newFilter) {
    store.dispatch({ type: "SET_FILTER", newFilter })

    // store.dispatch({ type: "isLoading", isLoading: true})
    // todoService.query(newFilter)
    //     .then(todoList => {
    //         store.dispatch({ type: "SET_FILTER", filter: newFilter })
    //         store.dispatch({ type: "SET_TODOS", todoList })
    //     })
    //     .catch(err => {
    //         console.log("failed to set the filter", err)
    //         throw err
    //     })
    //     .finally(() => store.dispatch({ type: "SET_IS_LOADING", isLoading: false }))
}


export function getTodosCount() {
    return todoService.query({})
        .then(todos => {
            return todos.length
        })
}


export function getDoneTodosCount() {
    return todoService.query({ category: "done" })
        .then(todos => {
            return todos.length
        })
}