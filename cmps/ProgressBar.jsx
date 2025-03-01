import { getDoneTodosCount, getTodosCount } from "../store/todo.action.js"
import { eventBusService } from "../services/event-bus.service.js"

const { useState, useEffect } = React

export function ProgressBar({ length = 200 }) {
    const [progress, setProgress] = useState(0)


    useEffect(() => {
        const unsubscribe = eventBusService.on("progress-updated", getProgress)
        setProgress(getProgress())

        return unsubscribe
    }, [])

    async function getProgress() {
        var todosCount = await getTodosCount()
        var doneTodosCount = await getDoneTodosCount()

        const progress = (doneTodosCount / todosCount) * length // 0-1 between no todos are done and all todos are done, scaled by the components length
        setProgress(Math.floor(progress))
    }

    function getValueAsString(value) {
        return `${value}px`
    }

    return (
        <div className="progress-bar" style={{ width: getValueAsString(length), height: getValueAsString(length / 10.0) }}>
            <div className="background" style={{ width: getValueAsString(length), height: getValueAsString(length / 10.0) }}></div>
            <div className="foreground" style={{ width: getValueAsString(progress), height: getValueAsString(length / 10.0) }}></div>
        </div>
    )
}