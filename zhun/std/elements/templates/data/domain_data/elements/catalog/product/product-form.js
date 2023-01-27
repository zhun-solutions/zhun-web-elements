// import { Item, ItemData } from "../../../../../../../../../../zhun-data-elements/zhun-data-elements";
// import { ItemService } from "../../../../../../../../../../zhun-store-adapter/firestore-adapter/item.service";
// import { _get_functions } from "../../../../../../fuctions/util/functions-repo";
// import { get_input_text_field } from "../../../../../list/list-templates";
// import { getBasicForm, getfieldset, get_input_textarea_element } from "../../../../form-elements/form-elements-generator";

// const getProductForm= (formname)=>{
//   let trainee_mdt_item  = new Item();
//     trainee_mdt_item.name="_Product_metadata_";
//     trainee_mdt_item.t_type="zwe-form"
//     trainee_mdt_item.addData("form_name",new ItemData("form_name","Product"));
//     trainee_mdt_item.addData("form_submit_name",new ItemData("form_submit_name","Save"));
//     let status_options=["Draft in Review","Approved","Published","Staging"];
//     let status_options2=["A","B","C","D"];

//     let trainee_status_field=new Item();
//     trainee_status_field.name="Product Schema Status";
//     trainee_status_field.c_type="_form_field";
//     trainee_status_field.t_type="_input_select";
//     trainee_status_field.addData("options",new ItemData("options",status_options));
//     trainee_mdt_item.addRelElements(trainee_status_field.name,trainee_status_field);

//     // new - product type dropdown and options
  
//     let product_type_field=new Item();
//     product_type_field.name="Product Type";
//     product_type_field.c_type="_form_field";
//     product_type_field.t_type="_input_select";
//     product_type_field.addData("options",new ItemData("options",status_options2));
//     trainee_mdt_item.addRelElements(product_type_field.name,product_type_field);



         




//     let basicInfo_fs_mdt= new Item();
//     basicInfo_fs_mdt.name="Basic Info";
//     basicInfo_fs_mdt.c_type="_form_fieldset";
//     basicInfo_fs_mdt.t_type="";


//     // New Edit --> using get_input_text_filed method
//     // Adding product ID to Basic info
//     basicInfo_fs_mdt.addRelElements("Product ID",get_input_text_field("Product ID","Product ID Details")); 

//     // Adding Product name to Basic info
//     basicInfo_fs_mdt.addRelElements("Name",get_input_text_field("Name","Name Details")); 

//     // Adding Product brand to Basic info
//     basicInfo_fs_mdt.addRelElements("Brand",get_input_text_field("Brand","Brand Details")); 

//     // Adding Product category to Basic info
//     basicInfo_fs_mdt.addRelElements("Category",get_input_text_field("Category","Category Details")); 

//     // Adding Product  price to Basic info
//     basicInfo_fs_mdt.addRelElements("Price",get_input_text_field("Price","Price Details")); 

//     // Adding Product OEM to Basic info
//     basicInfo_fs_mdt.addRelElements("OEM",get_input_text_field("OEM","OEM Details")); 


//   // Adding Basic Info to Trainee_mdt_item
//     trainee_mdt_item.addRelElements(basicInfo_fs_mdt.name,basicInfo_fs_mdt);






//    // Category info 
//     let categoryDetails_fs_mdt= new Item();
//     categoryDetails_fs_mdt.name="Category";
//     categoryDetails_fs_mdt.c_type="_form_fieldset";
//     categoryDetails_fs_mdt.t_type="";

//     // New Edit --> using get_input_text_filed method

//     // Adding product ID to Category
//     categoryDetails_fs_mdt.addRelElements("Domain ",get_input_text_field("Domain","Provide domain details")); 

//     // Adding Product name to Category
//     categoryDetails_fs_mdt.addRelElements("Sub-Domain",get_input_text_field("Sub-Domain","Provide Sub-domain details")); 

//     // Adding Product brand to Category
//     categoryDetails_fs_mdt.addRelElements("Category",get_input_text_field("Category","Provide category details")); 

//     // Adding Product category to Category
//     categoryDetails_fs_mdt.addRelElements("Sub-Category 1",get_input_text_field("Sub-Category 1","Provide sub category details")); 

//     // Adding Product  price to Category
//     categoryDetails_fs_mdt.addRelElements("Sub-Category 2",get_input_text_field("Sub-Category 2","Provide sub category details")); 

//     // Adding Product OEM to Category
//     categoryDetails_fs_mdt.addRelElements("Sub-Category 3",get_input_text_field("Sub-Category 3","Provide sub category details")); 


//   // Adding Category to Trainee_mdt_item
//     trainee_mdt_item.addRelElements(categoryDetails_fs_mdt.name,categoryDetails_fs_mdt);



//     // Product Attribute info 
//     let attributeDetails_fs_mdt= new Item();
//     attributeDetails_fs_mdt.name="Product Attribute";
//     attributeDetails_fs_mdt.c_type="_form_fieldset";
//     attributeDetails_fs_mdt.t_type="";

//     // New Edit --> using get_input_text_filed method
//     // Adding product Colour to Category
//     attributeDetails_fs_mdt.addRelElements("Colour ",get_input_text_field("Colour","Provide colour of the product of your choice")); 

//     // Adding Size to Product Attribute
//     attributeDetails_fs_mdt.addRelElements("Size",get_input_text_field("Size","Provide size of the product of your choice")); 

//     // Adding Quantity to Product Attribute
//     attributeDetails_fs_mdt.addRelElements("Quantity",get_input_text_field("Quantity","Provide quantity of the product")); 

//     // Adding Brand Name to Product Attribute
//     attributeDetails_fs_mdt.addRelElements("Brand Name",get_input_text_field("Brand Name","Provide the brand name of your choice")); 

//     // Adding MRP to Product Attribute
//     attributeDetails_fs_mdt.addRelElements("MRP",get_input_text_field("MRP","Provide MRP of the product")); 

//     // Adding Product OEM to Product Attribute
//     attributeDetails_fs_mdt.addRelElements("Selling Price",get_input_text_field("Selling Price","Provide selling price of the product")); 
    
//     // Adding Short Product Production to Product Attribute
//     attributeDetails_fs_mdt.addRelElements("Short Product Production",get_input_text_field("Short Product Production","Provide short description of the product")); 


//   // Adding Product Attribute to Trainee_mdt_item
//     trainee_mdt_item.addRelElements(attributeDetails_fs_mdt.name,attributeDetails_fs_mdt);





//     // Product Variant Part
//     let producrVariant_fs_mdt= new Item();
//     producrVariant_fs_mdt.name="Product Variant";
//     producrVariant_fs_mdt.c_type="_form_fieldset";
//     producrVariant_fs_mdt.t_type="";
    
//     //let product_variant_fs=getfieldset("Product Variant");
//     // product_variant_fs.addRelElementsOnType("render-metadata","Variant Details",get_input_textarea_element("Variant Details", "Provide product variant details" ));
    

//     // New Edit --> using get_input_text_filed method
//     // Adding Variant Details to Product Variant
//     producrVariant_fs_mdt.addRelElements("Variant Details",get_input_text_field("Variant Details","Provide product variant details")); 

//   // Adding Variant Details  to Trainee_mdt_item
//     trainee_mdt_item.addRelElements(producrVariant_fs_mdt.name,producrVariant_fs_mdt);


//     trainee_mdt_item.addRelElements(basicInfo_fs_mdt.name,basicInfo_fs_mdt);
//      let productSchemaForm=getBasicForm(trainee_mdt_item.getData("form_name").fieldValue,trainee_mdt_item.getData("form_submit_name").fieldValue)
//    // let trainee_status_fs=null;
//     console.log(  trainee_mdt_item.getRelElements().values());
//     reduce_form_mdt(trainee_mdt_item,productSchemaForm,"RNDR_MDT")
   

   
//     console.log("productSchemaForm after reduce through code is");
//     console.log(productSchemaForm);
 
    
// // new category details

// let category_details_fs=getfieldset("Category");
// category_details_fs.addRelElementsOnType("RNDR_MDT","Domain",get_input_textarea_element("Domain", "Provide domain details" ));
// category_details_fs.addRelElementsOnType("RNDR_MDT","Sub-Domain",get_input_textarea_element("Sub-Domain", "Provide domain details" ));
// category_details_fs.addRelElementsOnType("RNDR_MDT","Category",get_input_textarea_element("Category", "Provide category details" ));
// category_details_fs.addRelElementsOnType("RNDR_MDT","Sub-Category 1",get_input_textarea_element("Sub-Category 1", "Provide category details" ));
// category_details_fs.addRelElementsOnType("RNDR_MDT","Sub-Category 2",get_input_textarea_element("Sub-Category 2", "Provide category details" ));
// category_details_fs.addRelElementsOnType("RNDR_MDT","Sub-Category 3",get_input_textarea_element("Sub-Category 3", "Provide category details" ));

// // new product attributes

// let product_attributes_fs=getfieldset("Product Attribute");
// product_attributes_fs.addRelElementsOnType("RNDR_MDT","Colour",get_input_textarea_element("Colour", "Provide colour of the product of your choice" ));
// product_attributes_fs.addRelElementsOnType("RNDR_MDT","Size",get_input_textarea_element("Size", "Provide size of the product of your choice" ));
// product_attributes_fs.addRelElementsOnType("RNDR_MDT","Quantity",get_input_textarea_element("Quantity", "Provide quantity of the product" ));
// product_attributes_fs.addRelElementsOnType("RNDR_MDT","Brand Name",get_input_textarea_element("Brand Name", "Provide the brand name of your choice" ));
// product_attributes_fs.addRelElementsOnType("RNDR_MDT","MRP",get_input_textarea_element("MRP", "Provide MRP of the product" ));
// product_attributes_fs.addRelElementsOnType("RNDR_MDT","Selling Proce",get_input_textarea_element("Selling price", "Provide selling price of the product " ));
// product_attributes_fs.addRelElementsOnType("RNDR_MDT","Short Product Production",get_input_textarea_element("Short Product Description", "Provide short description of the product" ));

// // new product variant
// let product_variant_fs=getfieldset("Product Variant");
// product_variant_fs.addRelElementsOnType("RNDR_MDT","Variant Details",get_input_textarea_element("Variant Details", "Provide product variant details" ));

// // new images 

// let product_images_fs=getfieldset("Images");
// //product_images_fs.addRelElementsOnType("RNDR_MDT","Achivements/Awards/Recognition",get_input_textarea_element("Variant Details", "Provide details of the products that you may want to highlight" ));


// // new offers

// let product_offers_fs=getfieldset("Offers");
// product_offers_fs.addRelElementsOnType("RNDR_MDT","Discounts",get_input_textarea_element("Discounts", "Provide discount details that are available" ));
// product_offers_fs.addRelElementsOnType("RNDR_MDT","EMI Offers",get_input_textarea_element("EMI Offers", "Provide EMI offers that are available" ));


    
    
     
//     productSchemaForm.addRelElementsOnType("RNDR_MDT",category_details_fs.name,category_details_fs  );
//     productSchemaForm.addRelElementsOnType("RNDR_MDT",product_attributes_fs.name,product_attributes_fs  );
//     //productSchemaForm.addRelElementsOnType("RNDR_MDT",product_variant_fs.name,product_variant_fs  );
//     //productSchemaForm.addRelElementsOnType("RNDR_MDT",product_images_fs.name,product_images_fs  );
//     productSchemaForm.addRelElementsOnType("RNDR_MDT",product_offers_fs.name,product_offers_fs  );
//     productSchemaForm.addData("form_context_schema_id",new ItemData("form_context_schema_id","catalog_product_form"));
//     let itemService= new ItemService();
//     let quertItem= new Item();
//     quertItem.contextId='product_form_schema';
//     productSchemaForm.contextId='product_form_schema';

//      itemService.add("records","caas_form_schema",productSchemaForm);
//     let d= itemService.getOnContextId("records","caas_form_schema",quertItem);
//   console.log("fatch api data us :");
//   console.log(d);
//   console.log("dis");
//   console.log(JSON.stringify(d));
//   console.log("productSchemaFormis");
//   console.log(JSON.stringify(productSchemaForm));
//   return d;
// //    console.log("fatch api data us :");
// // console.log(data);
// //      return data;
 
// }

// const reduce_form_mdt=(formItem,itemToPopulate,onType)=>{
//     formItem.getRelElements().forEach(form_field=>{ 
//       console.log('wokring on form field for reduction:')
//       console.log(form_field);
//        let func=_get_functions(form_field.c_type+form_field.t_type);
//       let   itm= func(form_field);
//       if(form_field.c_type==="_form_fieldset"){
         
//         reduce_form_mdt(form_field,itm,onType);  
//       }  
//       itemToPopulate.addRelElementsOnType(onType,itm.name,itm); 
//     })  
// }
// export { getProductForm}



import { Item, ItemData } from "../../../../../../../../../../zhun-data-elements/zhun-data-elements";
import { ItemService } from "../../../../../../../../../../zhun-store-adapter/firestore-adapter/item.service";
import { _get_functions } from "../../../../../../fuctions/util/functions-repo";
import { get_input_text_field } from "../../../../../list/list-templates";
import { getBasicForm, getfieldset, get_input_textarea_element } from "../../../../form-elements/form-elements-generator";

const getProductForm= (formname)=>{
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



    // Product basic info Part
    let basicInfo_fs_mdt= new Item();
    basicInfo_fs_mdt.name="Basic Info";
    basicInfo_fs_mdt.c_type="_form_fieldset";
    basicInfo_fs_mdt.t_type="";

    basicInfo_fs_mdt.addRelElements("Product ID",get_input_text_field("Product ID","Product ID Details")); 
    basicInfo_fs_mdt.addRelElements("Name",get_input_text_field("Name","Name Details")); 
    basicInfo_fs_mdt.addRelElements("Brand",get_input_text_field("Brand","Brand Details")); 
    basicInfo_fs_mdt.addRelElements("Category",get_input_text_field("Category","Category Details")); 
    basicInfo_fs_mdt.addRelElements("Price",get_input_text_field("Price","Price Details")); 
    basicInfo_fs_mdt.addRelElements("Product Title",get_input_text_field("Product Title","Title of the Product")); 
    basicInfo_fs_mdt.addRelElements("OEM",get_input_text_field("OEM","OEM Details")); 
    trainee_mdt_item.addRelElements(basicInfo_fs_mdt.name,basicInfo_fs_mdt);



   // Category info 
    let categoryDetails_fs_mdt= new Item();
    categoryDetails_fs_mdt.name="Category";
    categoryDetails_fs_mdt.c_type="_form_fieldset";
    categoryDetails_fs_mdt.t_type="";

    categoryDetails_fs_mdt.addRelElements("Domain ",get_input_text_field("Domain","Provide domain details")); 
    categoryDetails_fs_mdt.addRelElements("Sub-Domain",get_input_text_field("Sub-Domain","Provide Sub-domain details")); 
    categoryDetails_fs_mdt.addRelElements("Category",get_input_text_field("Category","Provide category details")); 
    categoryDetails_fs_mdt.addRelElements("Sub-Category 1",get_input_text_field("Sub-Category 1","Provide sub category details")); 
    categoryDetails_fs_mdt.addRelElements("Sub-Category 2",get_input_text_field("Sub-Category 2","Provide sub category details")); 
    categoryDetails_fs_mdt.addRelElements("Sub-Category 3",get_input_text_field("Sub-Category 3","Provide sub category details")); 
    trainee_mdt_item.addRelElements(categoryDetails_fs_mdt.name,categoryDetails_fs_mdt);



    // Product Attribute info 
    let attributeDetails_fs_mdt= new Item();
    attributeDetails_fs_mdt.name="Product Attribute";
    attributeDetails_fs_mdt.c_type="_form_fieldset";
    attributeDetails_fs_mdt.t_type="";

    // New Edit --> using get_input_text_filed method
    // Adding product Colour to Category
    attributeDetails_fs_mdt.addRelElements("Colour ",get_input_text_field("Colour","Provide colour of the product of your choice")); 

    // Adding Size to Product Attribute
    attributeDetails_fs_mdt.addRelElements("Size",get_input_text_field("Size","Provide size of the product of your choice")); 

    // Adding Quantity to Product Attribute
    attributeDetails_fs_mdt.addRelElements("Quantity",get_input_text_field("Quantity","Provide quantity of the product")); 

    // Adding Brand Name to Product Attribute
    attributeDetails_fs_mdt.addRelElements("Brand Name",get_input_text_field("Brand Name","Provide the brand name of your choice")); 

    // Adding MRP to Product Attribute
    attributeDetails_fs_mdt.addRelElements("MRP",get_input_text_field("MRP","Provide MRP of the product")); 

    // Adding Product OEM to Product Attribute
    attributeDetails_fs_mdt.addRelElements("Selling Price",get_input_text_field("Selling Price","Provide selling price of the product")); 
    
    // Adding Short Product Production to Product Attribute
    attributeDetails_fs_mdt.addRelElements("Short Product Production",get_input_text_field("Short Product Production","Provide short description of the product")); 


  // Adding Product Attribute to Trainee_mdt_item
    trainee_mdt_item.addRelElements(attributeDetails_fs_mdt.name,attributeDetails_fs_mdt);





    // Product Variant Part
    let producrVariant_fs_mdt= new Item();
    producrVariant_fs_mdt.name="Product Variant";
    producrVariant_fs_mdt.c_type="_form_fieldset";
    producrVariant_fs_mdt.t_type="";
    
    //let product_variant_fs=getfieldset("Product Variant");
    // product_variant_fs.addRelElementsOnType("render-metadata","Variant Details",get_input_textarea_element("Variant Details", "Provide product variant details" ));
    

    // New Edit --> using get_input_text_filed method
    // Adding Variant Details to Product Variant
    producrVariant_fs_mdt.addRelElements("Variant Details",get_input_text_field("Variant Details","Provide product variant details")); 

  // Adding Variant Details  to Trainee_mdt_item
    trainee_mdt_item.addRelElements(producrVariant_fs_mdt.name,producrVariant_fs_mdt);


     let productSchemaForm=getBasicForm(trainee_mdt_item.getData("form_name").fieldValue,trainee_mdt_item.getData("form_submit_name").fieldValue)
    console.log(  trainee_mdt_item.getRelElements().values());

    reduce_form_mdt(trainee_mdt_item,productSchemaForm,"RNDR_MDT")
   
    console.log("productSchemaForm after reduce through code is");
    console.log(productSchemaForm);
 
    let itemService= new ItemService();
    let quertItem= new Item();
    quertItem.contextId='product_form_schema';
    productSchemaForm.contextId='product_form_schema';

    // itemService.add("records","caas_form_schema",productSchemaForm);
    let d= itemService.getOnContextId("records","caas_form_schema",quertItem);
  console.log("fatch api data us :");
  console.log(d);
  console.log("dis");
  console.log(JSON.stringify(d));
  console.log("productSchemaFormis");
  console.log(JSON.stringify(productSchemaForm));
  return d;

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
export { getProductForm}
