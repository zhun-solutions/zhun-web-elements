 import styles from './zwe-render-slot.styles.scss'; 
 const _render =(host)=>{ 
//console.log("ZweRenderSlot^_render^audit^");
//console.log("metadataitem is");
//console.log(host.metadataItem);
    let renderslotnameitem=host.metadataItem.getData("render-slot-name");
    let renderslotname=renderslotnameitem.fieldValue;
    let renderslotid=renderslotnameitem.eleid;
//console.log(`${renderslotname} ${renderslotid}`);
 host.shadow.innerHTML=    `
            <style>  
             ${styles}</style>
          
             <div id="${renderslotname}${renderslotid}">
                 <slot name="${renderslotname}${renderslotid}"></slot>
             </div>
     `
  
};

export {_render}