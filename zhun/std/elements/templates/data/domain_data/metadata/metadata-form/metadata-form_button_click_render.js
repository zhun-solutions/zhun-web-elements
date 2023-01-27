 import { Item, ItemData } from "../../../../../../../../../zhun-data-elements/zhun-data-elements";
import { getBasicForm, getfieldset, get_input_text_element,get_input_textarea_element,get_input_checkbox_element, get_input_select } from "../../../form-elements/form-elements-generator";
import { getManageTabs } from "../../../manage-object-crud-tabs/manage-object-crud-tabs";
import { getFieldsFormMData } from "../fields/fields-form/fields-form";
import { getViewFieldsTabel } from "../fields/fields-view";
import {getViewMetadataTabel} from "../metadata-view";
const getMetadataFormMData= (formname)=>{
 
    let metadataForm=getBasicForm(formname,"Save")
    
    
 
    let metadata_status_fs = new Item();
    metadata_status_fs.name="metadata_status_field_set";
    metadata_status_fs.c_type="fieldset";
    metadata_status_fs.addData("styleclasslist",new ItemData("styleclasslist","form-fieldset-minimal collapsibles minimized"));
    metadata_status_fs.addData("legend", new ItemData("legend","Training Status"));
    metadata_status_fs.addData("contains-subscribeable-ce", new ItemData("contains-subscribeable-ce",true));
 

    let status_options=[ "Suspended","Blocked" ,"Registered","Published & In Active","Active","Created","Published & Active"];
    let mstatusItem=new Item();
    mstatusItem.name="Metadata Status";
    mstatusItem.addData("options", new ItemData("options",status_options))
    let metadata_status= get_input_select(mstatusItem)

     metadata_status_fs.addRelElementsOnType("RNDR_MDT",metadata_status.name,metadata_status);
  
  
    let basicinfofieldset=getfieldset("Basic Info");
    basicinfofieldset.addRelElementsOnType("RNDR_MDT","Domain Object Name",get_input_text_element("Domain Object Name", "Enter Domain Object Name" ));
    basicinfofieldset.addRelElementsOnType("RNDR_MDT","Base Type",get_input_text_element("Base Type", "Enter Base Type" ));
    basicinfofieldset.addRelElementsOnType("RNDR_MDT","Component Type",get_input_text_element("Component Type","Enter Component Type"  ));
    basicinfofieldset.addRelElementsOnType("RNDR_MDT","Element Type",get_input_text_element("Element Type", "Enter Element Type"  ));
    let fields_fs=getfieldset("Fields");
    let attrcontext= new Item(); 
    attrcontext.addData("is_sub_element_form",new ItemData("is_sub_element_form",true));
    attrcontext.addData("element_broadcast_id", new ItemData("element_broadcast_id","edse"+metadataForm.getId()));
    attrcontext.addData("exec_data_subs_id", new ItemData("exec_data_subs_id","edse"+metadataForm.getId()));
    attrcontext.addData("sub_element_broadcast_event_suffix", new ItemData("sub_element_broadcast_event_suffix","__from_parent_id"));
    attrcontext.addData("collection", new ItemData("collection","training_batches"));
   
    let mng_fields_tabs=getManageTabs("Fields",getFieldsFormMData,getViewFieldsTabel,attrcontext)
        mng_fields_tabs.b_type="ce"
        mng_fields_tabs.t_type="subscribeable-ce";
        mng_fields_tabs.addData("is_sub_element_manager", new ItemData("is_sub_element_manager",true))
        console.log("mng_fields_tabs are");
        console.log(mng_fields_tabs);
        let form_data_render_item=Array.from(mng_fields_tabs.getRelElementsOnType("RNDR_MDT").values()).find(item=> item.name.match(/^View*/));
        console.log("form-datarender item is");
        console.log(form_data_render_item);
          mng_fields_tabs.addRelElementsOnType("form-data-renderer", form_data_render_item.name,form_data_render_item);
          fields_fs.addRelElementsOnType("RNDR_MDT",mng_fields_tabs.name,mng_fields_tabs);
         
         
           fields_fs.addData("contains-subscribeable-ce", new ItemData("contains-subscribeable-ce",true));
          metadataForm.addRelElementsOnType("sub_elements_form_components",mng_fields_tabs.getId(),mng_fields_tabs);
      
let attr_context_mng_admin= new Item();
attr_context_mng_admin.addData("collection", new ItemData("collection","metadata"));

    let add_child_metadata_btn= new Item();
    add_child_metadata_btn.name="Add Metadata";
    let render_metada_on_event_exec_cntx= new Item();
    render_metada_on_event_exec_cntx.type="rmd_e_o_e"
    add_child_metadata_btn.addRelElementsOnType("exec_cntx",render_metada_on_event_exec_cntx.name, render_metada_on_event_exec_cntx);
    add_child_metadata_btn.addData("tagName",new ItemData("tagName","zwe-button"))
    let render_metadata_mdi= new Item();
    render_metadata_mdi.addData("gmd_f",new ItemData("gmd_f",getManageTabs));
    let gmd_f_prms=new Array();
    gmd_f_prms.push("Metadata");
    gmd_f_prms.push("getMetadataFormMData");
    gmd_f_prms.push("getViewMetadataTabel");
    gmd_f_prms.push(attr_context_mng_admin);
    render_metadata_mdi.addData("gmd_f_prms",new ItemData("gmd_f",gmd_f_prms));
    
    add_child_metadata_btn.addRelElementsOnType("exec_data",render_metadata_mdi.name,render_metadata_mdi)
    add_child_metadata_btn.b_type="ce";
    add_child_metadata_btn.t_type="subscribeable-ce"
    let child_eles_fs=getfieldset("Child Elements");
    child_eles_fs.addRelElementsOnType("RNDR_MDT",add_child_metadata_btn.name,add_child_metadata_btn)
    child_eles_fs.addData("contains-subscribeable-ce", new ItemData("contains-subscribeable-ce",true));
 
    metadataForm.addRelElementsOnType("RNDR_MDT",metadata_status.name,metadata_status)

    metadataForm.addRelElementsOnType("RNDR_MDT",basicinfofieldset.name,basicinfofieldset);
    metadataForm.addRelElementsOnType("RNDR_MDT",fields_fs.name,fields_fs);
    metadataForm.addRelElementsOnType("RNDR_MDT",child_eles_fs.name,child_eles_fs);
    
    return metadataForm;

 
}
export { getMetadataFormMData}
