 import styles from './zwe-trix-editor.styles.scss';  
  // const cssstyles = fetch("./trix.css");
 const _render =(host)=>{ 
//console.log("ZweTabLayoutRendrer^_render^audit^ item recevied is");
//console.log(host.metadataItem);
 host.shadow.innerHTML= `
 <style>   ${styles}</style>        

       
         <details>
              <summary>${host.metadataItem.name}</summary>
           
    <div id="editor-${host.metadatakeyid}">
    <input id="editor-input-${host.metadatakeyid}" value="${host.metadataItem.getData("placeholder").fieldValue}" type="hidden" name="content">
  <trix-editor class="trix-content" input="editor-input-${host.metadatakeyid}" palceholder="${host.metadataItem.getData("placeholder").fieldValue}"></trix-editor>
  </div>
  <button id="editor-open-button${host.metadatakeyid}">Save ${host.metadataItem.name}</button>

  <script type="text/javascript" src="trix.js"></script>
  </details>      
`
  
};
 
export {_render}