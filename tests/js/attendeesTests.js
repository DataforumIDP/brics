
const baseUserData = {
    "name": "Иван",
    "surname": "Иванов",
    "lastname": "Иванович",
    "organization": "7813579556",
    "grade": "7813579556",
    "mail": "test5@gmail.com",
    "phone": "9005553535",
    "country": "Рашн Федерашн",
    "city": "Канзас"
}

function getRandomUser() {
    return { ...baseUserData, ...{ mail: `user${getRandomNumber()}@gmail.com`} }
}

const getRandomNumber = () => {
    const min = 10000000000; // Минимальное число из 11 цифр
    const max = 99999999999; // Максимальное число из 11 цифр
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

async function test() {
    console.time('test');
    const requests = Array.from({length: 30}).map(createUser)
    
    let responses = await Promise.all(requests)
    responses = responses.map(item=> item.data??item.response.data)
    console.log(responses);
    console.timeEnd('test');
}

async function testSingle() {
    const requests = await createUser()
    console.log(requests);
    // try {
    // } catch (e) {
    //     console.log(e);
    // }
    
    // let responses = await Promise.all(requests)
    // responses = responses.map(item=> item.data)
}


async function createUser(){
    const data = getRandomUser()

    const result = new Promise(async (resolve)=>{
        try {
            const res = await axios.post('http://localhost:3225/api/reg/attendees', data)
            resolve(res)
        } catch (err) {
            resolve(err)
        }
    })

    return result
    

}