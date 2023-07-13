import { configureStore } from "@reduxjs/toolkit"
import userReducer from '../components/feature/UserSlice'
import Cookies from 'js-cookie'
import { setUser } from "../components/feature/UserSlice"

export const store = configureStore({
    reducer: {
        user: userReducer
    },
})

const initializeApp = async () => {
    const userId = Cookies.get('user_id');
    const token = Cookies.get('token');
    if (userId && token) {
        fetch(`http://localhost:8080/getuser/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            },
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        }).then((data) => {
            store.dispatch(setUser(data.data));
        }).catch(() => {
        
        })
    }
}


initializeApp();
