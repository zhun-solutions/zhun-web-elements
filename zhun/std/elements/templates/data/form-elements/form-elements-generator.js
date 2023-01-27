import { Item, ItemData } from "../../../../../../../zhun-data-elements/zhun-data-elements";

const getBasicForm=(name,submit_prefix)=>{
    let form= new Item();
    form.name=name; 
    form.addData("tagName", new ItemData("tagName","zwe-form"));
    form.addData("submit-name",new ItemData("submit-name",`${submit_prefix} ${name.replace(/Form$/,"")}`))
   return form
}


const getfieldset=(name)=>{ 
    let fieldset= new Item();
    fieldset.name=`${name.toLowerCase().replace(/\s/g,"_")}`;
    fieldset.c_type="fieldset";
    fieldset.addData("styleclasslist",new ItemData("styleclasslist","form-fieldset-minimal collapsibles minimized"));
    //TODO fix legend name if needed
    fieldset.addData("legend", new ItemData("legend",`${name} Details`));
    return fieldset;
  }
  const get_input_select=(formfield)=>{


    let select_=new Item();
    select_.name=formfield.name;
    select_.addData("label", new ItemData("label",formfield.name));
    select_.addData("type", new ItemData("type",""));
    select_.addData("element", new ItemData("element","select"));
    select_.addData("placeholder", new ItemData("placeholder",""));
    select_.addData("section_style", new ItemData("section_style","grid-column:1"))
    select_.addData("form-data-name", new ItemData("form-data-name",formfield.name));
   
    let defaultOptiontstrItem= new Item();
    defaultOptiontstrItem.name="-- Please select an option --";
    defaultOptiontstrItem.addData("value",new ItemData("value",""));
    select_.addRelElementsOnType("options",defaultOptiontstrItem.name,defaultOptiontstrItem );
    formfield.getData("options").fieldValue.forEach(option=>{
      let opentsItem= new Item();
      opentsItem.name=option;
      opentsItem.addData("value",new ItemData("value",opentsItem.name.toLowerCase().replace(/\s/,"_")));
      select_.addRelElementsOnType("options",opentsItem.name,opentsItem );
        })
     return select_;
  }
  const get_input_text_element=(name,palceholder)=>{ 
  
      let inputformelement=new Item();
    inputformelement.name=name.toLowerCase().replace(/\s/g,"_");
    inputformelement.addData("label", new ItemData("label",name));
    inputformelement.addData("type", new ItemData("type","text"));
    inputformelement.addData("element", new ItemData("element","input"));// other attributes : autocomplete-off required
    inputformelement.addData("placeholder", new ItemData("placeholder",palceholder));
     return inputformelement
  }
  const get_input_checkbox_element=(name,palceholder)=>{ 
  
    let inputformelement=new Item();
  inputformelement.name=name.toLowerCase().replace(/\s/g,"_");
  inputformelement.addData("label", new ItemData("label",name));
  inputformelement.addData("type", new ItemData("type","checkbox"));
  inputformelement.addData("element", new ItemData("element","input"));// other attributes : autocomplete-off required
  inputformelement.addData("placeholder", new ItemData("placeholder",palceholder));
   return inputformelement
}
 
  const get_input_textarea_element=(name,palceholder)=>{ 
  
    let inputformelement=new Item();
  inputformelement.name=name.toLowerCase().replace(/\s/g,"_");
  inputformelement.addData("label", new ItemData("label",name));
  inputformelement.addData("type", new ItemData("type","text"));
  inputformelement.addData("element", new ItemData("element","textarea"));// other attributes : autocomplete-off required
  inputformelement.addData("placeholder", new ItemData("placeholder",palceholder));
  inputformelement.addData("form-data-name", new ItemData("form-data-name",name));

  return inputformelement
}
  const get_input_date_element=(name,placeholder)=>{ 
  
    let inputformelement=new Item();
  inputformelement.name=name.toLowerCase().replace(/\s/g,"_");
  inputformelement.addData("label", new ItemData("label",name));
  inputformelement.addData("type", new ItemData("type","date"));
  inputformelement.addData("element", new ItemData("element","input"));// other attributes : autocomplete-off required
  inputformelement.addData("placeholder", new ItemData("placeholder",placeholder));
   return inputformelement
}


  export {get_input_select,get_input_checkbox_element,get_input_textarea_element,getfieldset,get_input_text_element,get_input_date_element,getBasicForm}
