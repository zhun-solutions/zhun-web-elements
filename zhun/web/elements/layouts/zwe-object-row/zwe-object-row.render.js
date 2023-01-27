 import styles from './zwe-object-row.styles.scss'; 
 const _render =(host)=>{ 
//console.log("ZweobjectRow^_render^audit^");
//console.log(host.metadataItem);
   let dataobjI=    host.metadataItem.getRelElementsOnType("exec-data").values().next().value;
//console.log("dataobject item is");
//console.log(dataobjI);
 host.shadow.innerHTML=    `
            <style>  
             ${styles}</style>
             <details id="${host.metadataItem.getId()}" class="collapsibles">
             <summary>${dataobjI.getData("batch_name").fieldValue}  / ${dataobjI.getData("batch_start_date").fieldValue}/ 
             ${dataobjI.getData("batch_end_date").fieldValue} 
             </summary> 
               
              </details>
     `
  
};

export {_render}