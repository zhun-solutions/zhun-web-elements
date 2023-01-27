 import { Item, ItemData } from "../../../../../../../../../../zhun-data-elements/zhun-data-elements";
import { getBasicForm, getfieldset, get_input_text_element,get_input_textarea_element,get_input_checkbox_element, get_input_select } from "../../../../form-elements/form-elements-generator";
import { getManageTabs } from "../../../../manage-object-crud-tabs/manage-object-crud-tabs";
  
const getFieldsFormMData= (formname)=>{
 
    let fieldForm=getBasicForm(formname,"Save")
    
    
 
    let field_status_fs = new Item();
    field_status_fs.name="field_status_field_set";
    field_status_fs.c_type="fieldset";
    field_status_fs.addData("styleclasslist",new ItemData("styleclasslist","form-fieldset-minimal collapsibles minimized"));
    field_status_fs.addData("legend", new ItemData("legend","Training Status"));
    field_status_fs.addData("contains-subscribeable-ce", new ItemData("contains-subscribeable-ce",true));
 

    let status_options=[ "Suspended","Blocked" ,"Registered","In Active","Active"];
    let mstatusItem=new Item();
    mstatusItem.name="Field Status";
    mstatusItem.addData("options", new ItemData("options",status_options))
    let field_status= get_input_select(mstatusItem)

     field_status_fs.addRelElementsOnType("RNDR_MDT",field_status.name,field_status);
  
  
    let basic_info_fs=getfieldset("Basic Info");
    basic_info_fs.addRelElementsOnType("RNDR_MDT","Field Name",get_input_text_element("Domain Object Name", "Enter Domain Object Name" ));
    basic_info_fs.addRelElementsOnType("RNDR_MDT","Base Type",get_input_text_element("Base Type", "Enter Base Type" ));
    basic_info_fs.addRelElementsOnType("RNDR_MDT","Component Type",get_input_text_element("Component Type","Enter Component Type"  ));
    basic_info_fs.addRelElementsOnType("RNDR_MDT","Element Type",get_input_text_element("Element Type", "Enter Element Type"  ));
   
    fieldForm.addRelElementsOnType("RNDR_MDT",field_status.name,field_status)

    fieldForm.addRelElementsOnType("RNDR_MDT",basic_info_fs.name,basic_info_fs);
    // log
    return fieldForm;

 
}
export { getFieldsFormMData}
