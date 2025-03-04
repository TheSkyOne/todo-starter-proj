const { useState } = React
const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter
const { useSelector } = ReactRedux


import { userService } from '../services/user.service.js'
import { userLoggedIn, userLoggedOut } from '../store/user.action.js'
import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'
import { ProgressBar } from './ProgressBar.jsx'


export function AppHeader() {
    const navigate = useNavigate()
    // const [user, setUser] = useState(userService.getLoggedinUser())
    const user = useSelector(storeState => storeState.userState.user)
    const userBalance = useSelector(storeState => storeState.userState.user ? storeState.userState.user.balance : null)
    const userFullname = useSelector(storeState => storeState.userState.user ? storeState.userState.user.fullname : null)

    function onLogout() {
        userLoggedOut()
        // userService.logout()
        //     .then(() => {
        //         onSetUser(null)
        //     })
        //     .catch((err) => {
        //         showErrorMsg('OOPs try again')
        //     })
    }

    // function onSetUser(user) {
    //     userLoggedIn(user)
    //     navigate('/')
    // }

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Todo App</h1>
                {user ? (
                    < section >
                        <Link to={`/user/${user._id}`}>Hello {userFullname}</Link>
                        <button onClick={onLogout}>Logout</button>
                        <h4>Your balance is: {userBalance}</h4>
                    </ section >
                ) : (
                    <section>
                        <LoginSignup />
                    </section>
                )}
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/todo" >Todos</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                    <NavLink to="userDetails">User Details</NavLink>
                </nav>
            </section>

            <label htmlFor="progress-bar">Todos Progress:</label>
            <ProgressBar id="progress-bar"></ProgressBar>
            <UserMsg />
        </header>
    )
}
