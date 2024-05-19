import $api from "../http";

export const createMessage = async (message) => {
    try {
        return await $api.post(`/report`, message)
    } catch(e) {
        console.log(e.message)
    }
}