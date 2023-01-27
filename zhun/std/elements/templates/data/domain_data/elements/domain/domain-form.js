import { Item, ItemData } from "../../../../../../../../../zhun-data-elements/zhun-data-elements";
import { _get_functions } from "../../../../../fuctions/util/functions-repo";
import { getBasicForm } from "../../../form-elements/form-elements-generator";

 
const getProductDomainsFormMData= (formname)=>{
    let trainee_mdt_item  = new Item();
    trainee_mdt_item.name="_Product_Domain_metadata_";
    trainee_mdt_item.t_type="zwe-form"
    trainee_mdt_item.addData("form_name",new ItemData("form_name","Product Domain"));
    trainee_mdt_item.addData("form_submit_name",new ItemData("form_submit_name","Save"));
    let status_options=["Draft in Review","Approved","Published","Staging"];

    // changes-->Product Domain Info
    let trainee_status_field=new Item();
    trainee_status_field.name="Product Domain Info";
    trainee_status_field.c_type="_form_fieldset";
    trainee_status_field.t_type="";
    //trainee_status_field.addData("options",new ItemData("options",status_options));
    trainee_mdt_item.addRelElements(trainee_status_field.name,trainee_status_field);
     

    //changes-->domain name
    let domainName_field=new Item();
    domainName_field.name="name";
    domainName_field.c_type="_form_field";
    domainName_field.t_type="_input_text";
    domainName_field.addData("placeholder",new ItemData("placeholder","Enter Domain Name"));
    domainName_field.addData("label",new ItemData("label","Domain Display Name"));
    domainName_field.addData("label-or",new ItemData("label-or","Domain Display Name"));
    domainName_field.addData("field_disc_code",new ItemData("field_disc_code","CORE"));
    // domainName_field.addData("field_disc_code",new ItemData("field_disc_code","CORE"));
    trainee_mdt_item.addRelElements(domainName_field.name,domainName_field);

    //changes-->domain value
    let domainValue_field=new Item();
    domainValue_field.name="code";
    domainValue_field.c_type="_form_field";
    domainValue_field.t_type="_input_text";
    domainValue_field.addData("placeholder",new ItemData("placeholder","Enter Domain Value"));
    domainValue_field.addData("label-or",new ItemData("label-or","Domain Value"));
    domainValue_field.addData("label",new ItemData("label","Domain Value"));
    trainee_mdt_item.addRelElements(domainValue_field.name,domainValue_field);

  // Sub domain
    let sub_domain_field=new Item();
    sub_domain_field.name="Sub Domain";
    sub_domain_field.c_type="_form_fieldset";
    sub_domain_field.t_type="";

    let sub_domain_btn_field=new Item();
    sub_domain_btn_field.name="";
    sub_domain_btn_field.c_type="_form_field";
    sub_domain_btn_field.t_type="_input_text";
    sub_domain_btn_field.addData("placeholder",new ItemData("placeholder","Enter Sub Domain Value"));
    sub_domain_field.addRelElements(sub_domain_btn_field.name,sub_domain_btn_field);

    // trainee_mdt_item.addRelElements(sub_domain_field.name,sub_domain_field);
    
    

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
export { getProductDomainsFormMData}
