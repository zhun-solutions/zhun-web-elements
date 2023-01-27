 import { _list_table_elements_template,_list_table_elements_columns_template } from '../../../../../../std/elements/templates/list/list-templates';

import styles from './zwe-table.styles.scss'; 
  const _render =(host)=>{ 
       
console.log("Zwetabel^render^audit^@ render ");
console.log(host.metadataItem);
//console.log(".metadataItem.getRelElementsOnType(render-metadata).values() in zhun table are ");
console.log(host.metadataItem.getRelElementsOnType('columns').values());
    
//console.log("Cols to dispaly are");
    let rowMetadatItem= host.metadataItem.getRelElementsOnType("row_metadata_item").values().next().value;
  host.shadow.innerHTML=   `
             <style>   ${styles}</style>  
            
             <input id="fe${host.metadatakeyid}" type="text" placeholder="Filter data"  class="search-bar">
               <table id="ct${host.metadatakeyid}" style="border-collapse:collapse" >      
             <thead><tr>  ${Array.from(host.metadataItem.getRelElementsOnType('columns').values()).map(_list_table_elements_columns_template).join('')} </tr>
             </thead>
             <tbody>
          </tbody>
          </table> `
    //      ${Array.from(host.metadataItem.getRelElementsOnType("exec-data").values()).map(item=>{return _list_table_elements_template(item,rowMetadatItem)}).join('')} 
          //   <table id="${host.metadataItem.getId()}"> <tr>
  
        //  </table> 
 
};
{/* <input type="checkbox" id="mcf${host.metadatakeyid}" name="mcf" value=true>
<label for="mcf${host.metadatakeyid}"> Multi Column Filter</label><br> */}
export {_render}