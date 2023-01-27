// import { Item, ItemData } from "../../../../../../../../../zhun-data-elements/zhun-data-elements";
import { Item, ItemData } from "../../../../../../../../../zhun-data-elements/zhun-data-elements";
import { _get_functions } from "../../../../../fuctions/util/functions-repo";
// import { getBasicForm, getfieldset, get_input_text_element,get_input_textarea_element,get_input_checkbox_element, get_input_select } 
// import {_get_functions} from "../../../../../fuctions/util/functions-repo"; 
import { getBasicForm } from "../../../form-elements/form-elements-generator";
const getProductTypeFormMData= (formname)=>{
  let trainee_mdt_item  = new Item();
  trainee_mdt_item.name="_Product_Type_metadata_";
  trainee_mdt_item.t_type="zwe-form"
  trainee_mdt_item.addData("form_name",new ItemData("form_name","Product Type"));
  trainee_mdt_item.addData("form_submit_name",new ItemData("form_submit_name","Save"));
  
  

// Product Name
  let productName_status_field=new Item();
  productName_status_field.name="Product Type Name";
  productName_status_field.c_type="_form_field";
  productName_status_field.t_type="_input_text";
  productName_status_field.addData("placeholder",new ItemData("placeholder","Enter the Product Name"));
  trainee_mdt_item.addRelElements(productName_status_field.name,productName_status_field);


  // changes--> changions=["Draft in Review","Approved","Published","Staging"];
  // let productType_status_field=new Item();
  // productType_status_field.name="Product Type Status";
  // productType_status_field.c_type="_form_field";
  // productType_status_field.t_type="_input_select";
  // productType_status_field.addData("options",new ItemData("options",status_options));
  // trainee_mdt_itng the field name as Product Type Status
  // let status_options=["Draft in Review","Approved","Published","Staging"];
  // let productType_status_field=new Item();
  // productType_status_field.name="Product Type Status";
  // productType_status_field.c_type="_form_field";
  // productType_status_field.t_type="_input_select";
  // productType_status_field.addData("options",new ItemData("options",status_options));
  // trainee_mdt_item.addRelElements(productType_status_field.name,productType_status_field);


 
  // changes-->changing the field name as Category
  let categoryInfo_fs_mdt= new Item();
  categoryInfo_fs_mdt.name=" Category ";
  categoryInfo_fs_mdt.c_type="_form_fieldset";
  categoryInfo_fs_mdt.t_type="";
  trainee_mdt_item.addRelElements(categoryInfo_fs_mdt.name,categoryInfo_fs_mdt);

  // changes --> Updating Category field
  // let category_options=["1","2","3","4"]; 
  // let category_f=new Item();
  // category_f.name="Category";
  // category_f.c_type="_form_field";
  // category_f.t_type="_input_select";
  // category_f.addData("options",new ItemData("options",category_options));
  //category_f.addData("placeholder",new ItemData("placeholder","Enter Category"));



   //changes-->domain field

       //changes-->domain field
       let domainName_field=new Item();
       let domainf_options=[];
       domainName_field.name="Domain";
       domainName_field.c_type="_form_field";
       domainName_field.t_type="_input_select";
       domainName_field.addData("options",new ItemData("options",domainf_options));
       domainName_field.addData("options_dervation_collection", new ItemData("options_dervation_collection","product_domain_metadata"))
       domainName_field.addData("options_dervation_collection_type", new ItemData("options_dervation_collection","PRODUCT_DOMAIN"))
       domainName_field.addData("form-data-name",new ItemData("form-data-name","domain"));
       trainee_mdt_item.addRelElements(domainName_field.name,domainName_field);
   

       
  //Sub-Domain
  let subDomain_field=new Item();
  let sub_domain_options=[]
  subDomain_field.name="Sub Domain";
  subDomain_field.c_type="_form_field";
  subDomain_field.t_type="_input_select";
  subDomain_field.addData("options",new ItemData("options",sub_domain_options));
  subDomain_field.addData("options_dervation_collection", new ItemData("options_dervation_collection","product_sub_domain_metadata"))
  subDomain_field.addData("options_dervation_collection_type", new ItemData("options_dervation_collection_type","PRODUCT_SUB_DOMAIN"))
  subDomain_field.addData("options_dervation_collection_parent", new ItemData("options_dervation_collection_parent","domain"))
  subDomain_field.addData("form-data-name",new ItemData("form-data-name","sub_domain"));

  trainee_mdt_item.addRelElements(subDomain_field.name,subDomain_field);

   
   let categoryName_field=new Item();
   let categoryfield_options=[];
   categoryName_field.name="Category";
   categoryName_field.c_type="_form_field";
   categoryName_field.t_type="_input_select";
   categoryName_field.addData("options",new ItemData("options",categoryfield_options));
   categoryName_field.addData("options_dervation_collection", new ItemData("options_dervation_collection","product_category_metadata"))
   categoryName_field.addData("options_dervation_collection_type", new ItemData("options_dervation_collection","PRODUCT_CATEGORY"))
   categoryName_field.addData("options_dervation_collection_parent", new ItemData("options_dervation_collection_parent","sub_domain"))
   categoryName_field.addData("form-data-name",new ItemData("form-data-name","category"));
   trainee_mdt_item.addRelElements(categoryName_field.name,categoryName_field);


   
   let subcategoryName_field=new Item();
   let subcategoryfield_options=[];
   subcategoryName_field.name="Sub Category";
   subcategoryName_field.c_type="_form_field";
   subcategoryName_field.t_type="_input_select";
   subcategoryName_field.addData("options",new ItemData("options",subcategoryfield_options));
   subcategoryName_field.addData("options_dervation_collection", new ItemData("options_dervation_collection","product_category_metadata"))
   subcategoryName_field.addData("options_dervation_collection_type", new ItemData("options_dervation_collection","PRODUCT_SUB_CATEGORY"))
   subcategoryName_field.addData("form-data-name",new ItemData("form-data-name","category"));
   trainee_mdt_item.addRelElements(subcategoryName_field.name,subcategoryName_field);


  //changes--> adding Attributes details 
  let attributeInfo_fs_mdt= new Item();
  attributeInfo_fs_mdt.name=" Attribute ";
  attributeInfo_fs_mdt.c_type="_form_fieldset";
  attributeInfo_fs_mdt.t_type="";
  // changes --> adding attribute details
  trainee_mdt_item.addRelElements(attributeInfo_fs_mdt.name,attributeInfo_fs_mdt);

  
  // //let subDomain_options=["400","500","600"];
  // let new_Attribute_field_f=new Item();
  // new_Attribute_field_f.name="Add New Attribute";
  // new_Attribute_field_f.c_type="_form_field";
  // new_Attribute_field_f.t_type="_input_text";
  // new_Attribute_field_f.addData("placeholder",new ItemData("placeholder",""));
  // //sub_domain_status_f.addData("placeholder",new ItemData("placeholder","Enter Sub Domain"));
  // trainee_mdt_item.addRelElements(new_Attribute_field_f.name,new_Attribute_field_f);


  // let add_Attribute_field_f=new Item();
  // add_Attribute_field_f.name="Add Attribute";
  // add_Attribute_field_f.c_type="_form_field";
  // add_Attribute_field_f.t_type="_input_text";
  // add_Attribute_field_f.addData("placeholder",new ItemData("placeholder",""));
  // //sub_domain_status_f.addData("placeholder",new ItemData("placeholder","Enter Sub Domain"));
  // trainee_mdt_item.addRelElements(add_Attribute_field_f.name,add_Attribute_field_f);




  // //changes--> adding Variants details 
  // let variantInfo_fs_mdt= new Item();
  // variantInfo_fs_mdt.name=" Variant Details ";
  // variantInfo_fs_mdt.c_type="_form_fieldset";
  // variantInfo_fs_mdt.t_type="";
  // trainee_mdt_item.addRelElements(variantInfo_fs_mdt.name,variantInfo_fs_mdt);
  
  // //Add New Variant Buttons
  // let new_variant_btn_f=new Item();
  // new_variant_btn_f.name="Add Variant Button";
  // new_variant_btn_f.c_type="_form_field";
  // new_variant_btn_f.t_type="_input_text";
  // new_variant_btn_f.addData("placeholder",new ItemData("placeholder",""));
  // trainee_mdt_item.addRelElements(new_variant_btn_f.name,new_variant_btn_f);

  

  let basicInfo_fs_mdt= new Item();
  basicInfo_fs_mdt.name="Basic Info";
  basicInfo_fs_mdt.c_type="_form_fieldset";
  basicInfo_fs_mdt.t_type="";
  // trainee_mdt_item.addRelElements(basicInfo_fs_mdt.name,basicInfo_fs_mdt);

  let id_proof_no_field=new Item();
  id_proof_no_field.name="Product ID";
  id_proof_no_field.c_type="_form_field";
  id_proof_no_field.t_type="_input_text";
  id_proof_no_field.addData("placeholder",new ItemData("placeholder","Enter ID Proof No"));
  trainee_mdt_item.addRelElements(id_proof_no_field.name,id_proof_no_field);
 
  let first_name_f=new Item();
  first_name_f.name="Title";
  first_name_f.c_type="_form_field";
  first_name_f.t_type="_input_text";
  first_name_f.addData("placeholder",new ItemData("placeholder","Enter First Name"));
  trainee_mdt_item.addRelElements(first_name_f.name,first_name_f);
 
  let last_name_f=new Item();
  last_name_f.name="Brand";
  last_name_f.c_type="_form_field";
  last_name_f.t_type="_input_text";
  last_name_f.addData("placeholder",new ItemData("placeholder","Enter Last Name"));
  trainee_mdt_item.addRelElements(last_name_f.name,last_name_f);
 
  let gender_f=new Item();
  gender_f.name="Category";
  gender_f.c_type="_form_field";
  gender_f.t_type="_input_text";
  gender_f.addData("placeholder",new ItemData("placeholder","Enter Gender"));
  //basicInfo_fs_mdt.addRelElements(gender_f.name,gender_f);
 
 
  let maratial_status_f=new Item();
  maratial_status_f.name="Price";
  maratial_status_f.c_type="_form_field";
  maratial_status_f.t_type="_input_text";
  maratial_status_f.addData("placeholder",new ItemData("placeholder","Enter Maratial Status"));
  trainee_mdt_item.addRelElements(maratial_status_f.name,maratial_status_f);
 
 
  let languages_know_f=new Item();
  languages_know_f.name="Sub-Category";
  languages_know_f.c_type="_form_field";
  languages_know_f.t_type="_input_text";
  languages_know_f.addData("placeholder",new ItemData("placeholder","Enter Languages Known"));
  //basicInfo_fs_mdt.addRelElements(languages_know_f.name,languages_know_f); 

  // new addition - OEM
  let oem_details_f=new Item();
  oem_details_f.name="OEM";
  oem_details_f.c_type="_form_field";
  oem_details_f.t_type="_input_text";
  oem_details_f.addData("placeholder",new ItemData("placeholder","OEM Details"));
  trainee_mdt_item.addRelElements(oem_details_f.name,oem_details_f); 



 

   let traineeForm=getBasicForm(trainee_mdt_item.getData("form_name").fieldValue,trainee_mdt_item.getData("form_submit_name").fieldValue)
 // let trainee_status_fs=null;
  console.log(trainee_mdt_item.getRelElements().values());
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
export { getProductTypeFormMData}
