
import { Item, ItemData } from "../../../../../../../../../zhun-data-elements/zhun-data-elements";
import { _get_functions } from "../../../../../fuctions/util/functions-repo";
import { getBasicForm } from "../../../form-elements/form-elements-generator";
const getSubCategoryMDForm= (formname)=>{
  let trainee_mdt_item  = new Item();
  trainee_mdt_item.name="_Sub_Category_metadata_";
  trainee_mdt_item.t_type="zwe-form"
  trainee_mdt_item.addData("form_name",new ItemData("form_name","Sub Category"));
  trainee_mdt_item.addData("form_submit_name",new ItemData("form_submit_name","Save"));
  let status_options=["Draft in Review","Approved","Published","Staging"];


  //change--> Product Sub Category info
  let trainee_status_field=new Item();
  trainee_status_field.name="Product Sub-Category Info";
  trainee_status_field.c_type="_form_fieldset";
  trainee_status_field.t_type="";
  //trainee_status_field.addData("options",new ItemData("options",status_options));
  trainee_mdt_item.addRelElements(trainee_status_field.name,trainee_status_field);

  // Category field
  let category_field=new Item();
  let category_field_options=[]
  category_field.name="Category";
  category_field.c_type="_form_field";
  category_field.t_type="_input_select";
  category_field.addData("options",new ItemData("options",category_field_options));
  category_field.addData("options_dervation_collection", new ItemData("options_dervation_collection","product_category_metadata"))
  category_field.addData("options_dervation_collection_type", new ItemData("options_dervation_collection","PRODUCT_CATEGROY"))
  category_field.addData("form-data-name",new ItemData("form-data-name","category"));
  trainee_mdt_item.addRelElements(category_field.name,category_field);

  // //Sub Category Name
  let category_value_field=new Item();
  category_value_field.name="Sub-Category Name";
  category_value_field.c_type="_form_field";
  category_value_field.t_type="_input_text";
  category_value_field.addData("placeholder",new ItemData("placeholder","Enter Sub-Category Name"));
  trainee_mdt_item.addRelElements(category_value_field.name,category_value_field);

  // // Sub Category value
  let doamin_field=new Item();
  doamin_field.name="Sub-Category Value";
  doamin_field.c_type="_form_field";
  doamin_field.t_type="_input_text";
  doamin_field.addData("placeholder",new ItemData("placeholder","Enter Sub-Category Value"));
  trainee_mdt_item.addRelElements(doamin_field.name,doamin_field);


   let traineeForm=getBasicForm(trainee_mdt_item.getData("form_name").fieldValue,trainee_mdt_item.getData("form_submit_name").fieldValue)
 // let trainee_status_fs=null;
  console.log(  trainee_mdt_item.getRelElements().values());
  reduce_form_mdt(trainee_mdt_item,traineeForm,"RNDR_MDT")
 

 
  console.log("traineeForm after reduce through code is");
  console.log(traineeForm);

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
export { getSubCategoryMDForm}
