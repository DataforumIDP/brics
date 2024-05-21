

const content = [
    {
        selector: '.decor__title',
        attr: 'text',
        text: {
            ru: 'Форум будущего БРИКС. Облачный город',
            en: 'BRICS Future Forum. Cloud City'
        }
    },
    {
        selector: '.decor__subtitle',
        attr: 'text',
        text: {
            ru: '18 — 19 сентября 2024',
            en: 'September 18 — 19, 2024'
        }
    },
    {
        selector: '.decor__text',
        attr: 'text',
        text: {
            ru: 'Москва, Московский концертный зал «Зарядье»',
            en: 'Moscow, Zaryadye Moscow Concert Hall'
        }
    },
    {
        selector: '#fio',
        attr: 'placeholder',
        text: {
            ru: 'ФИО',
            en: 'Last name First name'
        }
    },
    {
        selector: '#organization',
        attr: 'placeholder',
        text: {
            ru: 'Организация',
            en: 'Name of the organization'
        }
    },
    {
        selector: '#grade',
        attr: 'placeholder',
        text: {
            ru: 'Должность',
            en: 'Post'
        }
    },
    {
        selector: '#country',
        attr: 'placeholder',
        text: {
            ru: 'Страна',
            en: 'Country'
        }
    },
    {
        selector: '#city',
        attr: 'placeholder',
        text: {
            ru: 'Город',
            en: 'City'
        }
    },
    {
        selector: '#email',
        attr: 'placeholder',
        text: {
            ru: 'E-mail',
            en: 'E-mail'
        }
    },
    {
        selector: '#phone',
        attr: 'placeholder',
        text: {
            ru: 'Телефон',
            en: 'Phone number'
        }
    },
    {
        selector: '.form__btn span',
        attr: 'text',
        text: {
            ru: 'Отправить',
            en: 'Send'
        }
    },
    {
        selector: '.modal__btn span',
        attr: 'text',
        text: {
            ru: 'Закрыть',
            en: 'Close'
        }
    },
    {
        selector: '.politics__title',
        attr: 'html',
        text: {
            ru: 'Даю согласие на обработку моих персональных данных. <a href="#">Политика конфиденциальности</a>',
            en: 'I agree to the processing of personal data. <a href="#">Read the privacy policy</a>'
        }
    },
]

let currentLang = 'ru'

export function getLang() {
    return currentLang
}

export function toggleLang() {
    $(this).addClass('--active')
    $('.lang').toggleClass('--open')
    const lang = $(this).attr('value')
    loadLangStruct(lang)
}

export function loadLangStruct(lang) {
    currentLang = lang
    $('.--active').removeClass('--active')
    $(`.lang__item[value="${lang}"]`).addClass('--active')
    content.forEach(loadLangItem.bind(lang))
}

function loadLangItem(item) {
    const { selector, attr, text } = item
    if (attr != 'placeholder') {
        $(selector)[attr](text[this])
    } else {
        $(selector).attr('placeholder', text[this])
    }
}