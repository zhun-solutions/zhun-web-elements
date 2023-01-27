import { Item, ItemData } from "../../../../../../../../../zhun-data-elements/zhun-data-elements";
import { _get_functions } from "../../../../../fuctions/util/functions-repo";
import { getBasicForm } from "../../../form-elements/form-elements-generator";
const getSubDomainMDForm= (formname)=>{
    let trainee_mdt_item  = new Item();
    trainee_mdt_item.name="_Sub_Domain_metadata_";
    trainee_mdt_item.t_type="zwe-form"
    trainee_mdt_item.addData("form_name",new ItemData("form_name","Sub Domain"));
    trainee_mdt_item.addData("form_submit_name",new ItemData("form_submit_name","Save"));
    let status_options=["Draft in Review","Approved","Published","Staging"];

    // changes-->Product Sub-Domain Info
    let trainee_status_field=new Item();
    trainee_status_field.name="Product Sub Domain Info";
    trainee_status_field.c_type="_form_fieldset";
    trainee_status_field.t_type="";
    //trainee_status_field.addData("options",new ItemData("options",status_options));
    trainee_mdt_item.addRelElements(trainee_status_field.name,trainee_status_field);
     

    //changes-->domain field
    let domainName_field=new Item();
    let domain_options=[];
    domainName_field.name="Domain";
    domainName_field.c_type="_form_field";
    domainName_field.t_type="_input_select";
    domainName_field.addData("options",new ItemData("options",domain_options));
    domainName_field.addData("options_dervation_collection", new ItemData("options_dervation_collection","product_domain_metadata"))
    domainName_field.addData("options_dervation_collection_type", new ItemData("options_dervation_collection","PRODUCT_DOMAIN"))
    domainName_field.addData("form-data-name",new ItemData("form-data-name","domain"));
    trainee_mdt_item.addRelElements(domainName_field.name,domainName_field);

    //changes-->Sub domain name
    let domainValue_field=new Item();
    domainValue_field.name="Sub Domain Name";
    domainValue_field.c_type="_form_field";
    domainValue_field.t_type="_input_text";
    domainValue_field.addData("placeholder",new ItemData("placeholder","Enter Sub-Domain Name"));
    domainValue_field.addData("form-data-name",new ItemData("form-data-name","name"));

    trainee_mdt_item.addRelElements(domainValue_field.name,domainValue_field);
    // trainee_mdt_item.addRelElements("Sub Domain Name ",get_input_text_field("Colour","Provide colour of the product of your choice")); 

  // changes-->Sub domain value
    let subDomain_value_field=new Item();
    subDomain_value_field.name="Sub Domain Value";
    subDomain_value_field.c_type="_form_field";
    subDomain_value_field.t_type="_input_text";
    subDomain_value_field.addData("placeholder",new ItemData("placeholder","Enter Sub-Domain Value"));
    subDomain_value_field .addData("form-data-name",new ItemData("form-data-name","code"));

    trainee_mdt_item.addRelElements(subDomain_value_field.name,subDomain_value_field);
   
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
export { getSubDomainMDForm}
