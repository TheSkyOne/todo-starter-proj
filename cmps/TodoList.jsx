import { TodoPreview } from "./TodoPreview.jsx"
const { Link } = ReactRouterDOM
const { useState } = React

export function TodoList({ todos, onRemoveTodo, onToggleTodo }) {
    const [activeTodoId, setActiveTodoId] = useState(null)
    const [pickedColor, setPickedColor] = useState(null)
    const [previewsAndColorsMap, setPreviewsAndColorsMap] = useState({})

    function onRemoveTodoButtonClicked(todoId) {
        if (confirm("Delete todo entry?")) {
            console.log("deleting")
            onRemoveTodo(todoId)
        }
    }

    function onColorChange(ev, todoId) {
        const color = ev.target.value
        setPickedColor(color)
        setActiveTodoId(todoId)
        setPreviewsAndColorsMap({...previewsAndColorsMap, [todoId]: color})
    }


    return (
        <ul className="todo-list">
            {todos.map(todo =>
                <li key={todo._id} 
                    style={{backgroundColor: todo._id === activeTodoId ? pickedColor : previewsAndColorsMap[todo._id]}}>
                    <input type="color" onChange={ev => onColorChange(ev, todo._id)} value="#99a695"></input>
                    <TodoPreview todo={todo} onToggleTodo={() => onToggleTodo(todo)} />
                    <section>
                        <button onClick={() => onRemoveTodoButtonClicked(todo._id)}>Remove</button>
                        <button><Link to={`/todo/${todo._id}`}>Details</Link></button>
                        <button><Link to={`/todo/edit/${todo._id}`}>Edit</Link></button>
                    </section>
                </li>
            )}
        </ul>
    )
}