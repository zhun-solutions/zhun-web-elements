import { Item, ItemData } from "../../../../../../../../../zhun-data-elements/zhun-data-elements";
import { _get_functions } from "../../../../../fuctions/util/functions-repo";
import { getBasicForm, getfieldset, get_input_textarea_element } from "../../../form-elements/form-elements-generator";

const getProductFormMData= (formname)=>{
  let trainee_mdt_item  = new Item();
    trainee_mdt_item.name="_Product_metadata_";
    trainee_mdt_item.t_type="zwe-form"
    trainee_mdt_item.addData("form_name",new ItemData("form_name","Product"));
    trainee_mdt_item.addData("form_submit_name",new ItemData("form_submit_name","Save"));
    let status_options=["Draft in Review","Approved","Published","Staging"];
    let status_options2=["A","B","C","D"];

    let trainee_status_field=new Item();
    trainee_status_field.name="Product Schema Status";
    trainee_status_field.c_type="_form_field";
    trainee_status_field.t_type="_input_select";
    trainee_status_field.addData("options",new ItemData("options",status_options));
    trainee_mdt_item.addRelElements(trainee_status_field.name,trainee_status_field);

    // new - product type dropdown and options
  
    let product_type_field=new Item();
    product_type_field.name="Product Type";
    product_type_field.c_type="_form_field";
    product_type_field.t_type="_input_select";
    product_type_field.addData("options",new ItemData("options",status_options2));
    trainee_mdt_item.addRelElements(product_type_field.name,product_type_field);



         




    let basicInfo_fs_mdt= new Item();
    basicInfo_fs_mdt.name="Basic Info";
    basicInfo_fs_mdt.c_type="_form_fieldset";
    basicInfo_fs_mdt.t_type="";

    let id_proof_no_field=new Item();
    id_proof_no_field.name="Product ID";
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
    //basicInfo_fs_mdt.addRelElements(gender_f.name,gender_f);
   
   
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
    //basicInfo_fs_mdt.addRelElements(languages_know_f.name,languages_know_f); 

    // new addition - OEM
    let oem_details_f=new Item();
    oem_details_f.name="OEM";
    oem_details_f.c_type="_form_field";
    oem_details_f.t_type="_input_text";
    oem_details_f.addData("placeholder",new ItemData("placeholder","OEM Details"));
    basicInfo_fs_mdt.addRelElements(oem_details_f.name,oem_details_f); 



    trainee_mdt_item.addRelElements(basicInfo_fs_mdt.name,basicInfo_fs_mdt);
     let traineeForm=getBasicForm(trainee_mdt_item.getData("form_name").fieldValue,trainee_mdt_item.getData("form_submit_name").fieldValue)
   // let trainee_status_fs=null;
    console.log(  trainee_mdt_item.getRelElements().values());
    reduce_form_mdt(trainee_mdt_item,traineeForm,"RNDR_MDT")
   

   
    console.log("traineeForm after reduce through code is");
    console.log(traineeForm);
 
    
// new category details

let category_details_fs=getfieldset("Category");
category_details_fs.addRelElementsOnType("RNDR_MDT","Domain",get_input_textarea_element("Domain", "Provide domain details" ));
category_details_fs.addRelElementsOnType("RNDR_MDT","Sub-Domain",get_input_textarea_element("Sub-Domain", "Provide domain details" ));
category_details_fs.addRelElementsOnType("RNDR_MDT","category Details",get_input_textarea_element("Category", "Provide category details" ));
category_details_fs.addRelElementsOnType("RNDR_MDT","Sub-Category 1",get_input_textarea_element("Sub-Category 1", "Provide category details" ));
category_details_fs.addRelElementsOnType("RNDR_MDT","Sub-Category 2",get_input_textarea_element("Sub-Category 2", "Provide category details" ));
category_details_fs.addRelElementsOnType("RNDR_MDT","Sub-Category 3",get_input_textarea_element("Sub-Category 3", "Provide category details" ));

// new product attributes

let product_attributes_fs=getfieldset("Product Attribute");
product_attributes_fs.addRelElementsOnType("RNDR_MDT","Colour",get_input_textarea_element("Colour", "Provide colour of the product of your choice" ));
product_attributes_fs.addRelElementsOnType("RNDR_MDT","Size",get_input_textarea_element("Size", "Provide size of the product of your choice" ));
product_attributes_fs.addRelElementsOnType("RNDR_MDT","Quantity",get_input_textarea_element("Quantity", "Provide quantity of the product" ));
product_attributes_fs.addRelElementsOnType("RNDR_MDT","Brand Name",get_input_textarea_element("Brand Name", "Provide the brand name of your choice" ));
product_attributes_fs.addRelElementsOnType("RNDR_MDT","MRP",get_input_textarea_element("MRP", "Provide MRP of the product" ));
product_attributes_fs.addRelElementsOnType("RNDR_MDT","Selling Proce",get_input_textarea_element("Selling price", "Provide selling price of the product " ));
product_attributes_fs.addRelElementsOnType("RNDR_MDT","Short Product Production",get_input_textarea_element("Short Product Description", "Provide short description of the product" ));

// new product variant
let product_variant_fs=getfieldset("Product Variant");
product_variant_fs.addRelElementsOnType("RNDR_MDT","Variant Details",get_input_textarea_element("Variant Details", "Provide product variant details" ));

// new images 

let product_images_fs=getfieldset("Images");
//product_images_fs.addRelElementsOnType("RNDR_MDT","Achivements/Awards/Recognition",get_input_textarea_element("Variant Details", "Provide details of the products that you may want to highlight" ));


// new offers

let product_offers_fs=getfieldset("Offers");
product_offers_fs.addRelElementsOnType("RNDR_MDT","Discounts",get_input_textarea_element("Discounts", "Provide discount details that are available" ));
product_offers_fs.addRelElementsOnType("RNDR_MDT","EMI Offers",get_input_textarea_element("EMI Offers", "Provide EMI offers that are available" ));


    
    
     
    traineeForm.addRelElementsOnType("RNDR_MDT",category_details_fs.name,category_details_fs  );
    traineeForm.addRelElementsOnType("RNDR_MDT",product_attributes_fs.name,product_attributes_fs  );
    //traineeForm.addRelElementsOnType("RNDR_MDT",product_variant_fs.name,product_variant_fs  );
    //traineeForm.addRelElementsOnType("RNDR_MDT",product_images_fs.name,product_images_fs  );
    traineeForm.addRelElementsOnType("RNDR_MDT",product_offers_fs.name,product_offers_fs  );
    
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
export { getProductFormMData}
