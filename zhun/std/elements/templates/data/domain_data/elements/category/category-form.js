import { Item, ItemData } from "../../../../../../../../../zhun-data-elements/zhun-data-elements";
import { _get_functions } from "../../../../../fuctions/util/functions-repo";
import { getBasicForm } from "../../../form-elements/form-elements-generator";

const getCategoryMDForm= (formname)=>{
  let trainee_mdt_item  = new Item();
  trainee_mdt_item.name="_Product_Category_metadata_";
  trainee_mdt_item.t_type="zwe-form"
  trainee_mdt_item.addData("form_name",new ItemData("form_name","Product Category"));
  trainee_mdt_item.addData("form_submit_name",new ItemData("form_submit_name","Save"));
  let status_options=["Draft in Review","Approved","Published","Staging"];


  //change--> Product Category info
  let trainee_status_field=new Item();
  trainee_status_field.name="Product Category Info";
  trainee_status_field.c_type="_form_fieldset";
  trainee_status_field.t_type="";
  //trainee_status_field.addData("options",new ItemData("options",status_options));
  trainee_mdt_item.addRelElements(trainee_status_field.name,trainee_status_field);

  // Category Title
  let category_field=new Item();
  category_field.name="Category Title";
  category_field.c_type="_form_field";
  category_field.t_type="_input_text";
  category_field.addData("placeholder",new ItemData("placeholder","Enter Category Title"));
  category_field.addData("form-data-name",new ItemData("form-data-name","name"));

  trainee_mdt_item.addRelElements(category_field.name,category_field);

  //Category Value
  let category_value_field=new Item();
  category_value_field.name="Category Value";
  category_value_field.c_type="_form_field";
  category_value_field.t_type="_input_text";
  category_value_field.addData("placeholder",new ItemData("placeholder","Enter Category Value"));
  category_value_field.addData("form-data-name",new ItemData("form-data-name","code"));
  trainee_mdt_item.addRelElements(category_value_field.name,category_value_field);

  //Domain
  let doamin_field=new Item();
  let domain_options=[]
  doamin_field.name="Domain";
  doamin_field.c_type="_form_field";
  doamin_field.t_type="_input_select";
  doamin_field.addData("options",new ItemData("options",domain_options));
  doamin_field.addData("options_dervation_collection", new ItemData("options_dervation_collection","product_domain_metadata"))
  doamin_field.addData("options_dervation_collection_type", new ItemData("options_dervation_collection","PRODUCT_DOMAIN"))
    
  trainee_mdt_item.addRelElements(doamin_field.name,doamin_field);

  //Sub-Domain
  let subDomain_field=new Item();
  let sub_domain_options=[]
  subDomain_field.name="Sub-Domain";
  subDomain_field.c_type="_form_field";
  subDomain_field.t_type="_input_select";
  subDomain_field.addData("options",new ItemData("options",sub_domain_options));
  subDomain_field.addData("options_dervation_collection", new ItemData("options_dervation_collection","product_sub_domain_metadata"))
  subDomain_field.addData("options_dervation_collection_type", new ItemData("options_dervation_collection_type","PRODUCT_SUB_DOMAIN"))
  subDomain_field.addData("options_dervation_collection_parent", new ItemData("options_dervation_collection_parent","domain"))
    
  trainee_mdt_item.addRelElements(subDomain_field.name,subDomain_field);

  // // Sub category info 
  // let sub_category_status_field=new Item();
  // sub_category_status_field.name="Sub-Category Info"; 
  // sub_category_status_field.c_type="_form_fieldset";
  // sub_category_status_field.t_type="";
  // trainee_mdt_item.addRelElements(sub_category_status_field.name,sub_category_status_field);

  // // add sub category button
  // let sub_category_field=new Item();
  // sub_category_field.name="Sub-Category Button";
  // sub_category_field.c_type="_form_field";
  // sub_category_field.t_type="_input_text";
  // sub_category_field.addData("placeholder",new ItemData("placeholder",""));
  // trainee_mdt_item.addRelElements(sub_category_field.name,sub_category_field);


  let basicInfo_fs_mdt= new Item();
  basicInfo_fs_mdt.name="Basic Info";
  basicInfo_fs_mdt.c_type="_form_fieldset";
  basicInfo_fs_mdt.t_type="";

  let id_proof_no_field=new Item();
  id_proof_no_field.name="ID";
  id_proof_no_field.c_type="_form_field";
  id_proof_no_field.t_type="_input_text";
  id_proof_no_field.addData("placeholder",new ItemData("placeholder","Enter ID Proof No"));
  basicInfo_fs_mdt.addRelElements(id_proof_no_field.name,id_proof_no_field);
 
  let first_name_f=new Item();
  first_name_f.name="Title";
  first_name_f.c_type="_form_field";
  first_name_f.t_type="_input_text";
  first_name_f.addData("placeholder",new ItemData("placeholder","Enter First Name"));
  basicInfo_fs_mdt.addRelElements(first_name_f.name,first_name_f);
 
  // let middle_name_f=new Item();
  // middle_name_f.name="Description";
  // middle_name_f.c_type="_form_field";
  // middle_name_f.t_type="_input_text";
  // middle_name_f.addData("placeholder",new ItemData("placeholder","Enter Middle Name"));
  // basicInfo_fs_mdt.addRelElements(middle_name_f.name,middle_name_f);
  // basicInfo_fs_mdt.addRelElementsOnType("RNDR_MDT","Description",get_input_textarea_element("Description", "Provide details of product catalog description that you may want to highlight" ));
  // let addtional_details_fs=getfieldset("Additional Details");
  // addtional_details_fs.addRelElementsOnType("RNDR_MDT","Achivements/Awards/Recognition",get_input_textarea_element("Achivements/Awards/Recognition", "Provide details of your acheivements, awards or recognitions that you may want to highlight" ));
  
  let last_name_f=new Item();
  last_name_f.name="Brand";
  last_name_f.c_type="_form_field";
  last_name_f.t_type="_input_text";
  last_name_f.addData("placeholder",new ItemData("placeholder","Enter Last Name"));
  basicInfo_fs_mdt.addRelElements(last_name_f.name,last_name_f);
 
  let gender_f=new Item();
  gender_f.name="Category";
  gender_f.c_type="_form_field";
  gender_f.t_type="_input_text";
  gender_f.addData("placeholder",new ItemData("placeholder","Enter Gender"));
  basicInfo_fs_mdt.addRelElements(gender_f.name,gender_f);
 
 
  let maratial_status_f=new Item();
  maratial_status_f.name="Price";
  maratial_status_f.c_type="_form_field";
  maratial_status_f.t_type="_input_text";
  maratial_status_f.addData("placeholder",new ItemData("placeholder","Enter Maratial Status"));
  basicInfo_fs_mdt.addRelElements(maratial_status_f.name,maratial_status_f);
 
 
  let languages_know_f=new Item();
  languages_know_f.name="Sub-Category";
  languages_know_f.c_type="_form_field";
  languages_know_f.t_type="_input_text";
  languages_know_f.addData("placeholder",new ItemData("placeholder","Enter Languages Known"));
  basicInfo_fs_mdt.addRelElements(languages_know_f.name,languages_know_f); 
 
  //trainee_mdt_item.addRelElements(basicInfo_fs_mdt.name,basicInfo_fs_mdt);
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
export { getCategoryMDForm}
