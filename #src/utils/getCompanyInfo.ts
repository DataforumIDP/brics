import axios from "axios";


export async function info(inn: string) {
    try {
        const response = (await axios(`http://inn.wpdataforum.ru/?q=${inn}`)).data
        return [response?.suggestions[0], null]
    } catch(e) {
        return [null, e]
    }
}