 import styles from './zwe-core-editor.styles.scss'; 
// import html from './zwe-core-editor.html';
// const savesvg = require('../../../../../../std/elements/icons/save-icon.svg');
//src/npm-modules/zhun-web-elements/zhun/std/elements/icons/save-icon.svg
import savIcon from '../../../../../../std/elements/icons/save-icon.svg';
import editIcon from '../../../../../../std/elements/icons/edit-icon.svg';
   const _render =(host)=>{ 
//console.log("ZweTabLayoutRendrer^_render^audit^ item recevied is");
//console.log(host.metadataItem);
 host.shadow.innerHTML= `
 <style>   ${styles}</style>

 <details>
              <summary>${host.metadataItem.name} </summary>
<div class="editor-body" id="editor-${host.metadatakeyid}">
      <div class="editor">
        <div class="toolbar">
          <div class="line">
            
            <div class="box">
              <span class="btn icon smaller" data-action="bold" data-tag-name="b" title="Bold">
                <img src="https://image.flaticon.com/icons/svg/25/25432.svg">
              </span>
              <span class="btn icon smaller" data-action="italic" data-tag-name="i" title="Italic">
                <img src="https://image.flaticon.com/icons/svg/25/25392.svg">
              </span>
              <span class="btn icon smaller" data-action="underline" data-tag-name="u" title="Underline">
                <img src="https://image.flaticon.com/icons/svg/25/25433.svg">
              </span>
              <span class="btn icon smaller" data-action="strikeThrough" data-tag-name="strike" title="Strike through">
                <img src="https://image.flaticon.com/icons/svg/25/25626.svg">
              </span>
              <span class="btn icon has-submenu">
                T
                <div class="submenu">
                  <span class="btn icon" data-action="formatBlock" data-tag-name="H1"  title="Heading">
        <button class="text-icon">H1</button>  
                  </span>
                  <span class="btn icon" data-action="formatBlock" data-tag-name="H2"  title="Justify center">
                  <button class="text-icon">H2</button>   
                  </span>
                  <span class="btn icon" data-action="formatBlock"  data-tag-name="H3" title="Justify right">
                      <button class="text-icon">H3</button> 
                  </span>
                  <span class="btn icon" data-action="formatBlock"  data-tag-name="H4" title="Justify block">
                      <button class="text-icon">H4</button>
                  </span>
                </div>
              </span>
            </div>
                  
            <div class="box"> 
              <span class="btn icon has-submenu">
                <img src="https://image.flaticon.com/icons/svg/25/25351.svg">
                <div class="submenu">
                  <span class="btn icon" data-action="justifyLeft" data-style="textAlign:left" title="Justify left">
                    <img src="https://image.flaticon.com/icons/svg/25/25351.svg">  
                  </span>
                  <span class="btn icon" data-action="justifyCenter" data-style="textAlign:center" title="Justify center">
                    <img src="https://image.flaticon.com/icons/svg/25/25440.svg">  
                  </span>
                  <span class="btn icon" data-action="justifyRight" data-style="textAlign:right" title="Justify right">
                    <img src="https://image.flaticon.com/icons/svg/25/25288.svg">  
                  </span>
                  <span class="btn icon" data-action="formatBlock" data-style="textAlign:justify" title="Justify block">
                    <img src="https://image.flaticon.com/icons/svg/25/25181.svg">  
                  </span>
                </div>
              </span>
              <span class="btn icon" data-action="insertOrderedList" data-tag-name="ol" title="Insert ordered list">
                <img src="https://image.flaticon.com/icons/svg/25/25242.svg">  
              </span>
              <span class="btn icon" data-action="insertUnorderedList" data-tag-name="ul" title="Insert unordered list">
                <img src="https://image.flaticon.com/icons/svg/25/25648.svg">  
              </span>
              <span class="btn icon" data-action="outdent" title="Outdent">
                <img src="https://image.flaticon.com/icons/svg/25/25410.svg">  
              </span>
              <span class="btn icon" data-action="indent" title="Indent">
                <img src="https://image.flaticon.com/icons/svg/25/25233.svg">  
              </span>
              
            </div>
           
            
          </div>
          <div class="line">
          <div class="box">
          <span class="btn icon" data-action="insertHorizontalRule" title="Insert horizontal rule">
            <img src="https://image.flaticon.com/icons/svg/25/25232.svg">  
          </span>
        </div>
            <div class="box">
              <span class="btn icon smaller" data-action="undo" title="Undo">
                <img src="https://image.flaticon.com/icons/svg/25/25249.svg">
              </span>
              <span class="btn icon" data-action="removeFormat" title="Remove format">
                <img src="https://image.flaticon.com/icons/svg/25/25454.svg">  
              </span>
            </div>
            
            <div class="box">
              <span class="btn icon smaller" data-action="createLink" title="Insert Link">
                <img src="https://image.flaticon.com/icons/svg/25/25385.svg">
              </span>
              <span class="btn icon smaller" data-action="unlink" data-tag-name="a" title="Unlink">
                <img src="https://image.flaticon.com/icons/svg/25/25341.svg">
              </span>
            </div>
            
            <div class="box">
              <span class="btn icon" data-action="code" title="Show HTML-Code">
                <img src="https://image.flaticon.com/icons/svg/25/25185.svg">
              </span>
              <span class="btn icon" data-action="save" title="Save changes">
              <button id="editor-save-button-${host.metadatakeyid}"><img src=${savIcon}></button>
            </span>
        
            </div>
            
          </div>
        </div>
        <div class="content-area">
          <div class="visuell-view" contenteditable>  </div>  
            <textarea class="html-view"></textarea>
        
        </div>
        </div>
        
        <div class="modal">
        <div class="modal-bg"></div>
        <div class="modal-wrapper">
          <div class="close">✖</div>
          <div class="modal-content" id="modalCreateLink">
            <h3>Insert Link</h3>
            <input type="text" id="linkValue" placeholder="Link (example: https://webdeasy.de/)">
            <div class="row">
              <input type="checkbox" id="new-tab">
              <label for="new-tab">Open in new Tab?</label>
            </div>
            <button class="done">Done</button>
          </div>
        </div>
        </div>
        
        
        
        </div>
        
    <input id="editor-data-${host.metadatakeyid}" style="display:none" name="${host.metadataItem.name.toLowerCase().replace(/\s/g,"_")}" form="${host.metadataItem.getData("form").fieldValue}"></input>
 

   </div>
   <div id="post-edit-renderer-${host.metadatakeyid}">
   <button class="edit-button"  id="editor-open-button-${host.metadatakeyid}"><img src=${editIcon}></button><div id="editors-core-renderer-${host.metadatakeyid}"></div>
    </div>
    </details>      
`
  
};
 
export {_render}