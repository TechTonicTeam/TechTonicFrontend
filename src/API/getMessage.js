import $api from "../http";

export const createMessage = async (message) => {
    try {
        return await $api.message(`/message/create`, message)
    } catch(e) {
        console.log(e.message)
    }
}