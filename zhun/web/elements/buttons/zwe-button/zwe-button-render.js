  import {_list_anchors_template} from "../../../../std/elements/templates/list/list-templates";
  import styles from './zwe-button.styles.scss'; 
 const _render =(host)=>{ 
console.log("Zwebutton^_render^audit^");
console.log(host.metadataItem);
 host.shadow.innerHTML=    `
            <style>  
             ${styles}</style>
           <button>${host.metadataItem.name}</button>
     `
  
};

export {_render}