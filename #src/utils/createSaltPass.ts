import md5 from "md5"


export const saltPassword = (password: string, allSalt?: string) => {
    if (allSalt == undefined) {
        let salt = new Date().getTime()
        allSalt = md5(`${salt}pop3`)
    }

    return {
        salt: allSalt,
        sPass: md5(allSalt+ password)
    }
} 