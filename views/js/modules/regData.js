

let regData = {

}

export function setData(key, data) {
    regData[key] = data
}

export function getData(key) {
    return regData[key]??regData
}

export function saveFio() {
    const value = $(this).val()

    const [surname, name, lastname] = value.trim().replace(/\s{2,}/g, ' ').split(' ')

    setData("name", name)
    setData("surname", surname)
    setData("lastname", lastname)

}