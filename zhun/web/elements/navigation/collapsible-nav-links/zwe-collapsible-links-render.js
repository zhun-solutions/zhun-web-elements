  import {_list_navlinks_details_template} from "../../../../std/elements/templates/list/list-templates";
  import styles from './zwe-collapsible-links.styles.scss'; 
 const _render =(host)=>{ 
//console.log("ZwecollapsiblenavLinks^_render^audit^");
 host.shadow.innerHTML=    `
            <style>  
             ${styles}</style>
          
             <nav>
             
             <ul class="nav-links">
            ${Array.from(host.metadataItem.getRelElementsOnType("RNDR_MDT").values()).map(_list_navlinks_details_template).join('')}</ul>
     </ul> </nav>
     `
  
};

export {_render}
