


export function checkboxControl(sel, callback = ()=>{}) {
    $(document).on('click', sel, function(){
        const value = $(this).attr('val') == 'true' ? 'false' : 'true'
        $(this).attr('val', value)
        
        if (callback) callback.bind(this)()
    })
}