   import { _render_plain_template } from '../../../../../std/elements/templates/list/list-templates.js';
import styles from './zwe-tab-content.styles.scss'; 
 const _render =(host)=>{ 
//console.log("ZweTabContentRendrer^_render^audit^ item recevied is");
//console.log(host.metadataItem);
let tmplt=    `
            <style>   ${styles}</style>
          <div class="zwe-tab-content zwe-tab-content-inactive">
          ${Array.from(host.metadataItem.getRelElementsOnType("RNDR_MDT").values()).map(_render_plain_template).join('')}</ul>

         </div>
         
     `;
//console.log("template in zwe-tab-content is");
//console.log(tmplt);

     host.shadow.innerHTML=tmplt;
//console.log("innerhtml post tmplt load is");
//console.log(host.shadow.innerHTML);
}; 

export {_render}
