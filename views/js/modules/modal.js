import { awaiting } from "./awaiting.js"


export function modal(sel) {
    $(sel).find('.modal__back, .modal__btn').click(async ()=>{
        $(sel).css({opacity: 0})
        await awaiting(0.5)
        $(sel).css({zIndex: 0})
    })
}

export function openModal(sel) {
    $(sel).css({
        zIndex: 22,
        opacity: 1
    })
}