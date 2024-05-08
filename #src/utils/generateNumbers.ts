

export const randomNum = (val: number = 1)=>{
    let value = ''
    for (let i = 0; i < val; i++) {
        value = value + Math.floor(Math.random() * 10)
    }
    return value
}
