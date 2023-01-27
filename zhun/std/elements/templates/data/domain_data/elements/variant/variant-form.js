import { Item, ItemData } from "../../../../../../../../../zhun-data-elements/zhun-data-elements";
import { _get_functions } from "../../../../../fuctions/util/functions-repo";
import { getBasicForm } from "../../../form-elements/form-elements-generator";

const getProductVariantFormMData= (formname)=>{
  let trainee_mdt_item  = new Item();
  trainee_mdt_item.name="_Product_Variant_metadata_";
  trainee_mdt_item.t_type="zwe-form"
  trainee_mdt_item.addData("form_name",new ItemData("form_name","Product Variant"));
  trainee_mdt_item.addData("form_submit_name",new ItemData("form_submit_name","Save"));
  let status_options=["Draft in Review","Approved","Published","Staging"];


  //change--> Product Variant info
  let trainee_status_field=new Item();
  trainee_status_field.name="Product Variant Info";
  trainee_status_field.c_type="_form_fieldset";
  trainee_status_field.t_type="";
  //trainee_status_field.addData("options",new ItemData("options",status_options));
  trainee_mdt_item.addRelElements(trainee_status_field.name,trainee_status_field);

  // Select Attribute As Variant
  let select_Attribute_field=new Item();
  let select_Attribute_field_options=["a","b","c"]
  select_Attribute_field.name=" Select Attribute as Variant";
  select_Attribute_field.c_type="_form_field";
  select_Attribute_field.t_type="_input_select";
  select_Attribute_field.addData("options",new ItemData("options",select_Attribute_field_options));
  trainee_mdt_item.addRelElements(select_Attribute_field.name,select_Attribute_field);

  // add variant values
  let category_value_field=new Item();
  category_value_field.name="Add Variant Value";
  category_value_field.c_type="_form_field";
  category_value_field.t_type="_input_text";
  category_value_field.addData("placeholder",new ItemData("placeholder","Enter New Variant Value"));
  trainee_mdt_item.addRelElements(category_value_field.name,category_value_field);

  
  // add variant value button
  let category_value_btn_field=new Item();
  category_value_btn_field.name="Add Variant Value Button";
  category_value_btn_field.c_type="_form_field";
  category_value_btn_field.t_type="_input_text";
  category_value_btn_field.addData("placeholder",new ItemData("placeholder",""));
  trainee_mdt_item.addRelElements(category_value_btn_field.name,category_value_btn_field);


  //trainee_mdt_item.addRelElements(basicInfo_fs_mdt.name,basicInfo_fs_mdt);
   let traineeForm=getBasicForm(trainee_mdt_item.getData("form_name").fieldValue,trainee_mdt_item.getData("form_submit_name").fieldValue)
 // let trainee_status_fs=null;
  console.log(  trainee_mdt_item.getRelElements().values());
  reduce_form_mdt(trainee_mdt_item,traineeForm,"RNDR_MDT")
 

 
  console.log("traineeForm after reduce through code is");
  console.log(traineeForm);

  
  // basicinfofieldset.addRelElementsOnType("RNDR_MDT","Languages Known",get_input_text_element("Languages Known", "Enter Languages Known" ));

  return traineeForm;


 
}



const reduce_form_mdt=(formItem,itemToPopulate,onType)=>{
    formItem.getRelElements().forEach(form_field=>{ 
       let func=_get_functions(form_field.c_type+form_field.t_type);
      let   itm= func(form_field);
      if(form_field.c_type==="_form_fieldset"){
         
        reduce_form_mdt(form_field,itm,onType);  
      }  
      itemToPopulate.addRelElementsOnType(onType,itm.name,itm); 
    })  
}
export { getProductVariantFormMData}
