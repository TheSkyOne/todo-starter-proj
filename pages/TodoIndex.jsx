import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { loadTodos, removeTodo, setFilter, updateTodo } from "../store/todo.action.js"

const { useState, useEffect } = React
const { useSelector } = ReactRedux
const { Link, useSearchParams } = ReactRouterDOM

export function TodoIndex() {

    const todos = useSelector(storeState => storeState.todoState.todoList)

    // Special hook for accessing search-params:
    const [searchParams, setSearchParams] = useSearchParams()

    const defaultFilter = todoService.getFilterFromSearchParams(searchParams)

    const filterBy = useSelector(storeState => storeState.todoState.filter)

    useEffect(() => {
        setSearchParams(filterBy)
        loadTodos(filterBy)
    }, [filterBy])


    function onRemoveTodo(todoId) {
        removeTodo(todoId)
        // todoService.remove(todoId)
        //     .then(() => {
        //         setTodos(prevTodos => prevTodos.filter(todo => todo._id !== todoId))
        //         showSuccessMsg(`Todo removed`)
        //     })
        //     .catch(err => {
        //         console.log('err:', err)
        //         showErrorMsg('Cannot remove todo ' + todoId)
        //     })
    }

    function onToggleTodo(todo) {
        const todoToSave = { ...todo, isDone: !todo.isDone }
        updateTodo(todoToSave)
        loadTodos(filterBy)
        // todoService.save(todoToSave)
        //     .then((savedTodo) => {
        //         setTodos(prevTodos => prevTodos.map(currTodo => (currTodo._id !== todo._id) ? currTodo : { ...savedTodo }))
        //         showSuccessMsg(`Todo is ${(savedTodo.isDone) ? 'done' : 'back on your list'}`)
        //     })
        //     .catch(err => {
        //         console.log('err:', err)
        //         showErrorMsg('Cannot toggle todo ' + todoId)
        //     })
    }

    if (!todos) return <div>Loading...</div>
    return (
        <section className="todo-index">
            <TodoFilter filterBy={filterBy} onSetFilterBy={setFilter} />
            <div>
                <Link to="/todo/edit" className="btn" >Add Todo</Link>
            </div>
            {
                todos.length !== 0 &&
                <div>
                    <h2>Todos List</h2>
                    <TodoList todos={todos} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo} />
                    <hr />
                    <h2>Todos Table</h2>
                    <div style={{ width: '60%', margin: 'auto' }}>
                        <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
                    </div>
                </div>

            }

        </section>
    )
}