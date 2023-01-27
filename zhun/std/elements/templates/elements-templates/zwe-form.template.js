
const _generate_form_elements_template=(form)=> {
    let formid=form.getId();
    Array.from(form.getRelElementsOnType("RNDR_MDT").values()).map(formfield=>{
        formtmplt=`${formtmplt}${generate_form_field(formfield)}`;
    })

    let formtmplt=``;
return formtmplt;
}
