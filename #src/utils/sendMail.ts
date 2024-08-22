import axios from "axios"


export async function sendMail(mail: string, subject: string, body: string, hook: string = 'webhook_reply_cloudcityconf.php') {
    try {
        const data = new FormData()

        data.append('email', mail)
        data.append('subject', subject)
        data.append('body', body)

        const result = await axios.post(`https://online.dataforum.pro/${hook}`, data, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        })

        console.log(result.data);
        
    } catch (e: any) {
        return [null, e]
    }
}