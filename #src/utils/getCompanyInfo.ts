import axios from "axios";

export async function info(inn: string): Promise<[any, null] | [null, any]> {
    let result: any[] = [];
    let counter = 0;
    do {
        
        try {
            const response = (
                await axios(`http://inn.wpdataforum.ru/?q=${inn}`)
            ).data;
            result = [response?.suggestions[0], null];
        } catch (e) {
            result = [null, e];
        }
        counter++;
    } while (result[1] && counter != 5);

    return result as [any, null] | [null, any];
}
