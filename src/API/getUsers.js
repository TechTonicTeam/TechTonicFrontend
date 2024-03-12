import axios from "axios";

export const getUsers = async (email) => {
    const user = await axios.get(`http://localhost:5000/api/userl?email=${email}`)
    return user.data
}

export const putUsersIcon = async (id, picture) => {
    await axios.put('http://localhost:5000/api/user', {id, picture})
}