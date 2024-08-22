

export const fileTypes = {
    img: ['png', 'jpeg', 'jpg', 'pdf'],
    doc: ['doc', 'docx', 'odt'],
    present: ['ppt', 'pptx', 'odp', 'pdf']
}

export function docTypeCheck(type: string) {
    return (item: string)=>{
        const fileType = item.split('.')[1]
        if (!fileTypes[type].includes(fileType)) throw new Error()
        return true
    }
}