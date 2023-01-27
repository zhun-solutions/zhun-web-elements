import { Item, ItemData } from "../../../../../../../zhun-data-elements/zhun-data-elements";

const getBasicForm=(name,submit_prefix)=>{
    let form= new Item();
    form.name=name; 
    form.addData("tagName", new ItemData("tagName","zwe-form"));
    form.addData("submit-name",new ItemData("submit-name",`${submit_prefix} ${name.replace(/Form$/,"")}`))
   return form
}


const getfieldset=(item)=>{  
    let fieldset= new Item();
    fieldset.name=`${item.name.toLowerCase().replace(/\s/g,"_")}`;
    fieldset.c_type="fieldset";
    fieldset.addData("styleclasslist",new ItemData("styleclasslist","form-fieldset-minimal collapsibles minimized"));
    //TODO fix legend name if needed
    fieldset.addData("legend", new ItemData("legend",`${item.name} Details`));
    return fieldset;
  }
  const get_input_select=(formfield)=>{


    let select_=new Item();
    select_.name=formfield.name.toLowerCase().replace(/\s/,"_");
    select_.addData("label", new ItemData("label",formfield.name));
    select_.addData("type", new ItemData("type",""));
    select_.addData("element", new ItemData("element","select"));
    select_.addData("placeholder", new ItemData("placeholder",""));
    select_.addData("section_style", new ItemData("section_style","grid-column:1"))
    select_.addData("options_dervation_collection",formfield.getData("options_dervation_collection") ); 
    select_.addData("options_dervation_collection_type",formfield.getData("options_dervation_collection_type") ); 
    select_.addData("options_dervation_collection_parent",formfield.getData("options_dervation_collection_parent") ); 
    
    console.log("form data name for select field:"+formfield.name+" is set:");
    select_.addData("form-data-name", formfield.getData("form-data-name") );
   
    let defaultOptiontstrItem= new Item();
    defaultOptiontstrItem.name="-- Please select an option --";
    defaultOptiontstrItem.addData("value",new ItemData("value",""));
    select_.addRelElementsOnType("options",defaultOptiontstrItem.name,defaultOptiontstrItem );
    formfield.getData("options").fieldValue.forEach(option=>{
      let opentsItem= new Item();
      opentsItem.name=option;
      opentsItem.addData("value",new ItemData("value",opentsItem.name));
      select_.addRelElementsOnType("options",opentsItem.name,opentsItem );
        })
        select_.addData("field_disc_code",formfield.getData("field_disc_code") ); 
        return select_;
  }
  const get_input_text_element=(formfield)=>{ 
  
      let inputformelement=new Item();
    inputformelement.name=formfield.name.toLowerCase().replace(/\s/g,"_");
      inputformelement.addData("label", new ItemData("label",formfield.name));
    inputformelement.addData("type", new ItemData("type","text"));
    inputformelement.addData("element", new ItemData("element","input"));// other attributes : autocomplete-off required
    inputformelement.addData("placeholder", new ItemData("placeholder",formfield.getData("placeholder").fieldValue));
    inputformelement.addData("form-data-name",formfield.getData("form-data-name") ); 
    return inputformelement
  }

  const get_input_file_element=(formfield)=>{ 
  
    let inputformelement=new Item();
  inputformelement.name=formfield.name.toLowerCase().replace(/\s/g,"_");
    inputformelement.addData("label", new ItemData("label",formfield.name));
  inputformelement.addData("type", new ItemData("type","file"));
  inputformelement.addData("element", new ItemData("element","input"));// other attributes : autocomplete-off required
  inputformelement.addData("placeholder", new ItemData("placeholder",formfield.getData("placeholder").fieldValue));
  inputformelement.addData("form-data-name",formfield.getData("form-data-name") ); 
  return inputformelement
}
  const get_input_checkbox_element=(name,palceholder)=>{ 
  
    let inputformelement=new Item();
  inputformelement.name=name.toLowerCase().replace(/\s/g,"_");
  inputformelement.addData("label", new ItemData("label",name));
  inputformelement.addData("type", new ItemData("type","checkbox"));
  inputformelement.addData("element", new ItemData("element","input"));// other attributes : autocomplete-off required
  inputformelement.addData("placeholder", new ItemData("placeholder",palceholder));
  inputformelement.addData("field_disc_code",formfield.getData("field_disc_code") ); 
  return inputformelement
}
 
  const get_input_textarea_element=(name,palceholder)=>{ 
  
    let inputformelement=new Item();
  inputformelement.name=name.toLowerCase().replace(/\s/g,"_");
  inputformelement.addData("label", new ItemData("label",name));
  inputformelement.addData("type", new ItemData("type","text"));
  inputformelement.addData("element", new ItemData("element","textarea"));// other attributes : autocomplete-off required
  inputformelement.addData("placeholder", new ItemData("placeholder",palceholder));
  inputformelement.addData("field_disc_code",formfield.getData("field_disc_code") ); 
  return inputformelement
}
  const get_input_date_element=(name,placeholder)=>{ 
  
    let inputformelement=new Item();
  inputformelement.name=name.toLowerCase().replace(/\s/g,"_");
  inputformelement.addData("label", new ItemData("label",name));
  inputformelement.addData("type", new ItemData("type","date"));
  inputformelement.addData("element", new ItemData("element","input"));// other attributes : autocomplete-off required
  inputformelement.addData("placeholder", new ItemData("placeholder",placeholder));
  inputformelement.addData("field_disc_code",formfield.getData("field_disc_code") ); 
  return inputformelement;
}


  export {get_input_file_element,get_input_select,get_input_checkbox_element,get_input_textarea_element,getfieldset,get_input_text_element,get_input_date_element,getBasicForm}
