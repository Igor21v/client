import { setUser, clearDataUser } from "../reducers/userReducer";
import { $authHost, $host } from '.';

export const login = (phon, password) => {
    return async dispatch => {
        try {
            const response = await $host.post(`api/auth/login`, {
                phon,
                password
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

export const refresh = () => {
    return async dispatch => {
        try {
            const response = await $authHost.get(`api/auth/refresh`)
            console.log(response)
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            alert(e.response.data.message)
            localStorage.removeItem('token')
        }
    }
}

export const logout = () => {
    return async dispatch => {
        try {
            const response = await $authHost.post('api/auth/logout')
            dispatch(clearDataUser())
        } catch (e) {
            console.log('Ошибка!' + e)
        }
    }
}

/* export const refresh  */
