   import { Item, ItemData } from '../../../../../../zhun-data-elements/zhun-data-elements';
import { _list_form_elements_template ,_list_subform_elements_template,_generate_form_elements_template} from '../../../../std/elements/templates/list/list-templates.js';
import styles from './zwe-form.styles.scss'; 
  const _render =(host)=>{ 
       
//console.log("ZweForm^render^audit^@ render ");
//console.log(host.metadataItem);
   //        
   let detailsItem=new Item();
    detailsItem.addData("form-id", new ItemData("form-id",host.metadataItem.getId()));
//console.log("value of details item passed from the render to map function is");
//console.log(detailsItem);
    let template=    `
             <style>   ${styles}</style>        
             <div class="zwe-form-container">
             
              <form id="frm${host.metadataItem.getId()}">  </form> 
              ${Array.from(host.metadataItem.getRelElementsOnType("sub-forms").values()).map(_list_subform_elements_template).join('')}
              
             ${_generate_form_elements_template(host.metadataItem)}
              
            
             </div> 
         `;
        //  ${Array.from(host.metadataItem.getRelElementsOnType("RNDR_MDT").values()).map(item=>_list_form_elements_template(item,{"form_id":"frm"+host.metadataItem.getId()})).join('')} 
             
        //  console.log("under zwe form renderer template  for metadataitem key is:"+host.metadataItem.getId();
        //  console.log(template);
         host.shadow.innerHTML=  template;
//console.log("Zwe form after loading inner html is ");
        // console.log(host.innerHTML);
}; 
export {_render}
