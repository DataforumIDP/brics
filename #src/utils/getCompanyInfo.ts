import axios from "axios";


export async function info(inn: string) {
    const response = (await axios(`http://inn.wpdataforum.ru/?q=${inn}`)).data
    return response?.suggestions[0]
}