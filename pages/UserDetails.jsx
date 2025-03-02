import { showErrorMsg } from "../services/event-bus.service.js"
import { updateActivity } from "../services/user.service.js"
import { updateUserFullname, clearActivities } from "../store/user.action.js"

const { useRef, useEffect } = React
const { useSelector } = ReactRedux

export function UserDetails() {
    const elNameInput = useRef(null)
    const user = useSelector(storeState => storeState.userState.user)
    const activitiesCount = useSelector(storeState => storeState.userState.user.activities.length)

    const canDisplayActivities = user ? true : false
    const anyActivities = canDisplayActivities && activitiesCount > 0

    useEffect(() => {
        if (anyActivities){
            user.activities.forEach(activity => {
                updateActivity(activity)
            })
        }
    }, [])

    function onFormSubmit() {
        try {
            updateUserFullname(elNameInput.current.value)
        }
        catch (err) {
            showErrorMsg(err)
        }
    }

    function onClearClicked() {
        clearActivities()
    }

    return (
        <section className="user-details">
            <h1>Profile</h1>

            <form onSubmit={onFormSubmit}>
                <div className="field">
                    <label htmlFor="name">Name: </label>
                    <input ref={elNameInput} type="text" id="name" />
                </div>

                <div className="field">
                    <label htmlFor="txt-color">Text Color: </label>
                    <input type="color" id="txt-color" />
                </div>

                <div className="field">
                    <label htmlFor="bg-color">Background Color: </label>
                    <input type="color" id="bg-color" />
                </div>

                <button className="btn">Save</button>
            </form>

            {!canDisplayActivities && <div>Log-in to see your activity list.</div>}
            {canDisplayActivities && !anyActivities && <div>No activities to show</div>}
            {canDisplayActivities && anyActivities &&
                <section className="activity-list">
                    <h1>Your activity:</h1>
                    <ul>
                        {user.activities.map(activity => 
                            <li key={activity.creationTime}>{activity.displayText}</li>
                        )}
                    </ul>
                    <button onClick={onClearClicked}>Clear activity log</button>
                </section>
            }
        </section>
    )
}