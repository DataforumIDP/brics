export function formatedPhone (tel: string) {
    tel = tel.replace(/[^\d]/g, '')
    if (tel.length == 11) {
        return tel.slice(1)
    }
    else return tel
}