"use client"
import { useEffect, useState } from "react"
import { UserContext } from "./Context"


const UserProvider = ({ children }) => {

    const [userState, setUserState] = useState({
        id: '',
        firstName: '',
        lastName: '',
        loggedIn: false
    })

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch('/api/me');
                const data = await res.json();
                if (data.success) {
                    setUserState({ ...data.user, loggedIn: true })
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        !userState.loggedIn && getUser();
    }, [userState.loggedIn])

    return (
        <UserContext.Provider value={{ userState, setUserState }}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider