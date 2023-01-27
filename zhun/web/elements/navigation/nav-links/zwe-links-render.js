  import {_list_anchors_template} from "../../../../std/elements/templates/list/list-templates";
  import styles from './zwe-links.styles.scss'; 
 const _render =(host)=>{ 
//console.log("ZwenavLinks^_render^audit^");
 host.shadow.innerHTML=    `
            <style>  
             ${styles}</style>
            <nav>     <ul class="nav-links">
            ${Array.from(host.metadataItem.getRelElementsOnType("RNDR_MDT").values()).map(_list_anchors_template).join('')}      </ul>

     </ul> </nav>
     `
  
};

export {_render}
