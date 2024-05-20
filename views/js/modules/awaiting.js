


export async function awaiting(sec) {
    const prom = await new Promise(resolve => {
        setTimeout(() => {
            return resolve()
        }, sec * 1000);

    })

    return prom
}