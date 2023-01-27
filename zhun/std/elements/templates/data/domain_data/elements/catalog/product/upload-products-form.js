import { Item, ItemData } from "../../../../../../../../../../zhun-data-elements/zhun-data-elements";
import { ItemService } from "../../../../../../../../../../zhun-store-adapter/firestore-adapter/item.service";
import { _get_functions } from "../../../../../../fuctions/util/functions-repo";
import { get_input_file_field, get_input_text_field } from "../../../../../list/list-templates";
import { getBasicForm, getfieldset, get_input_textarea_element } from "../../../../form-elements/form-elements-generator";

const getUploadProductsForm= (formname)=>{
  let trainee_mdt_item  = new Item();
    trainee_mdt_item.name="_Product_metadata_";
    trainee_mdt_item.t_type="zwe-form"
    // trainee_mdt_item.b_type="zwe-file-upload-form";
    trainee_mdt_item.addData("form_name",new ItemData("form_name","Upload Products"));
    trainee_mdt_item.addData("form_submit_name",new ItemData("form_submit_name","Save"));
    let status_options=["Draft in Review","Approved","Published","Staging"];
     let status_options2=["A","B","C","D"];

    // let trainee_status_field=new Item();
    // trainee_status_field.name="Product Schema Status";
    // trainee_status_field.c_type="_form_field";
    // trainee_status_field.t_type="_input_select";
    // trainee_status_field.addData("options",new ItemData("options",status_options));
    // trainee_mdt_item.addRelElements(trainee_status_field.name,trainee_status_field);

    // new - product type dropdown and options
  
    let product_type_field=new Item();
    product_type_field.name="Product Type";
    product_type_field.c_type="_form_field";
    product_type_field.t_type="_input_select";
    product_type_field.addData("options",new ItemData("options",status_options2));
    trainee_mdt_item.addRelElements(product_type_field.name,product_type_field);



    // Product basic info Part
    let basicInfo_fs_mdt= new Item();
    basicInfo_fs_mdt.name="File Info";
    basicInfo_fs_mdt.c_type="_form_fieldset";
    basicInfo_fs_mdt.t_type="";

    basicInfo_fs_mdt.addRelElements("File",get_input_file_field("File","Products File")); 
    trainee_mdt_item.addRelElements(basicInfo_fs_mdt.name,basicInfo_fs_mdt);



     let productSchemaForm=getBasicForm(trainee_mdt_item.getData("form_name").fieldValue,trainee_mdt_item.getData("form_submit_name").fieldValue)
    console.log(  trainee_mdt_item.getRelElements().values());
    productSchemaForm.b_type="zwe-file-upload-form";
    reduce_form_mdt(trainee_mdt_item,productSchemaForm,"RNDR_MDT")
   
    console.log("productSchemaForm after reduce through code is");
    console.log(productSchemaForm);
 
  //   let itemService= new ItemService();
  //   let quertItem= new Item();
  //   quertItem.contextId='product_form_schema';
  //   productSchemaForm.contextId='product_form_schema';

  //     // itemService.add("records","caas_form_schema",productSchemaForm);
  //   let d= itemService.getOnContextId("records","caas_form_schema",quertItem);
  // console.log("fatch api data us :");
  // console.log(d);
  // console.log("dis");
  // console.log(JSON.stringify(d));
  // console.log("productSchemaFormis");
  // console.log(JSON.stringify(productSchemaForm));
  return productSchemaForm;

}

const reduce_form_mdt=(formItem,itemToPopulate,onType)=>{
    formItem.getRelElements().forEach(form_field=>{ 
      console.log('wokring on form field for reduction:')
      console.log(form_field);
       let func=_get_functions(form_field.c_type+form_field.t_type);
      let   itm= func(form_field);
      if(form_field.c_type==="_form_fieldset"){
         
        reduce_form_mdt(form_field,itm,onType);  
      }  
      itemToPopulate.addRelElementsOnType(onType,itm.name,itm); 
    })  
}
export { getUploadProductsForm}
