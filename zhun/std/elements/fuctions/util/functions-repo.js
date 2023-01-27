 
import { getMetadataFormMData } from "../../templates/data/domain_data/metadata/metadata-form/metadata-form";
import { getViewMetadataTabel } from "../../templates/data/domain_data/metadata/metadata-view";
import { getfieldset, get_input_file_element, get_input_select, get_input_text_element } from "../../templates/data/form-elements/form-elements-generator-oi";

const functions_repo=new Map([
    ["_form_field_input_select",get_input_select],
    ["_form_fieldset",getfieldset],
    ["_form_field_input_text",get_input_text_element],
    ["_form_field_input_file",get_input_file_element],
    ["getMetadataFormMData",getMetadataFormMData],
    ["getViewMetadataTabel",getViewMetadataTabel]

])
const _get_functions = (key)=>{
return    functions_repo.get(key);
}

export { _get_functions }