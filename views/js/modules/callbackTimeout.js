export function callBackTimeout(func, time) {
    let timer
    return function () {
        clearTimeout(timer)
        timer = setTimeout(func.bind(this), time);
    }
}