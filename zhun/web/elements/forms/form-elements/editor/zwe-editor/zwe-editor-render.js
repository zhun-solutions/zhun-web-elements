 import styles from './zwe-editor.styles.scss'; 
//import `html` from './zwe-editor.html';

   const _render =(host)=>{ 
//console.log("ZweTabLayoutRendrer^_render^audit^ item recevied is");
//console.log(host.metadataItem);
 host.shadow.innerHTML= `
 <style>   ${styles}</style>        

             <style>@import url('https://cdn.quilljs.com/1.3.6/quill.snow.css')</style> 
         <details>
              <summary>${host.metadataItem.name}</summary>

    <div id="editor-${host.metadatakeyid}">
    <p>Hello World!</p>
    <p>Some initial <strong>bold</strong> text</p>
    <p><br></p>
  </div>
  <button id="editor-open-button${host.metadatakeyid}">Save ${host.metadataItem.name}</button>

  <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
  </details>      
`
  
};
 
export {_render}