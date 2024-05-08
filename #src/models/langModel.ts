
export type lang = 'ru'|'uz'|'tj'

const accessLangs:lang[] = [
    'ru',
    'uz',
    'tj',
]

export function hasInLangs(lang: lang) {
    return accessLangs.includes(lang)
}