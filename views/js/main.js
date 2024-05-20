import { checkboxControl } from "./modules/checkbox.js";
import { loadLangStruct, toggleLang } from "./modules/langModel.js"
import { inputLogic } from "./modules/companySearch.js"
import { callBackTimeout } from "./modules/callbackTimeout.js";
import { getData, saveFio, setData } from "./modules/regData.js";
import { awaiting } from "./modules/awaiting.js";
import { modal, openModal } from "./modules/modal.js";
import { attendeesReg } from "./modules/attendeesReg.js";

const userLang = navigator.language || navigator.userLanguage;
const lang = userLang.startsWith('ru') ? 'ru' : 'en'

loadLangStruct(lang)
modal('.modal')

$(document).on('click', '.lang__item.--active', () => { $('.lang').toggleClass('--open') })
$(document).on('click', '.lang__item:not(.--active)', toggleLang)

checkboxControl('.checkbox', function(){
    setData('check', $(this).attr('val'))
})

$(organization).on('input', callBackTimeout(inputLogic, 1000))
$(fio).on('input', saveFio)
$(grade).on('input', function(){ setData('grade', $(this).val()) })
$(country).on('input', function(){ setData('country', $(this).val()) })
$(city).on('input', function(){ setData('city', $(this).val()) })
$(email).on('input', function(){ setData('mail', $(this).val()) })
$(phone).on('input', function(){ setData('phone', $(this).val()) })

$(".org-list").overlayScrollbars({
    className: "os-theme-dark",
});

// resizeHandler()

// window.addEventListener('resize', resizeHandler);

// function resizeHandler() {
//     const button = document.querySelector('button');
//     const buttonRect = button.getBoundingClientRect();
//     const heightToBottom = window.innerHeight - buttonRect.bottom;

//     $('.decor').css({ paddingBottom: heightToBottom })
// }

$('.form__btn').click(async function () {
    $(this).addClass('--sending')
    await attendeesReg()
    $(this).removeClass('--sending')
})


