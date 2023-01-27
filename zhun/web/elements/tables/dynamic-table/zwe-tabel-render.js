   import { _list_form_elements_template } from '../../../../std/elements/templates/list/list-templates.js';
import styles from './zwe-tabel.styles.scss'; 
  const _render =(host)=>{ 
       
//console.log("ZweForm^render^audit^@ render ");
//console.log(host.metadataItem);
   //        
  host.innerHTML=    `
             <style>   ${styles}</style>        
             <div class="zwe-form-container">
             <form id="${host.metadataItem.getId()}"> 
          ${Array.from(host.metadataItem.getRelElementsOnType("RNDR_MDT").values()).map(_list_form_elements_template).join('')} 
              <button type="submit">submit</button>
             </form> 
             </div> 
         `
  
};

export {_render}
