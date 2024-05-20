
import { getLang } from "./langModel.js"
import { openModal } from "./modal.js"
import { getData } from "./regData.js"

const titles = {
    success: {
        ru: 'Успешная регистрация',
        en: 'Successful registration'
    },
    error: {
        ru: 'Ошибка регистрации',
        en: 'Registration error'
    }
}

export async function attendeesReg() {
    const data = getData()

    if (!data.check) {
        $('.modal__error').remove()
        $('.modal__title').text(titles.error[getLang()])
        $('.modal__btn').before(`<h3 class="modal__error">${getLang() == 'ru' ? 'Согласие на обработку данных является обязательным!' : 'Consent to data processing is mandatory!'}</h3>`)
        openModal('.modal')
        return
    }

    const [res, err] = await sendRegData(data)

    if (err) {
        $('.modal__error').remove()
        $('.modal__title').text(titles.error[getLang()])

        Object.values(err.data.errors).map(item => { $('.modal__btn').before(`<h3 class="modal__error">${item[getLang()]}</h3>`) })

        openModal('.modal')
        return
    }


    $('.modal__error').remove()
    $('.modal__title').text(titles.success[getLang()])

}


async function sendRegData(data) {
    const result = await new Promise(async (resolve) => {
        try {
            const result = await axios.post('http://brics.wpdataforum.ru/api/reg/attendees', data)
            resolve([result.data, null])
        } catch (err) {
            resolve([null, err.response])
        }
    })

    return result
}