   import { _list_tabsbuttons_template, _list_tabs_template } from '../../../../std/elements/templates/list/list-templates';
import styles from './zwe-tab-layout.styles.scss'; 
   
   const _render =(host)=>{ 
//console.log("ZweTabLayoutRendrer^_render^audit^ item recevied is");
//console.log(host.metadataItem);
 host.shadow.innerHTML=    `
            <style>   ${styles}</style>
             <div class="zwe-layout">
         ${renderElement(host,'header')}
         ${renderElement(host,'left-bar')}
         ${renderElement(host,'main-content')} 
         ${renderElement(host,'right-bar')} 
         ${renderElement(host,'footer')}
         </div>

     `
  
};

// <!-- ${Array.from(host.metadataItem.getRelElementsOnType("RNDR_MDT").values()).map(_list_tabs_template).join('')}</ul>
// ${renderbuttons(host,'header')}         -->
const defaults=[
   'main-content'
]
const layouttemplates=(key,host)=>{
   let ctemplate=``;
     switch (key) {
      case 'header':
         ctemplate=`<header>
            ${renderbuttons(host)}
             </header>`
         break;
      case 'footer':
         ctemplate=`<footer>
            ${renderbuttons(host)}
             </footer>`
         break;
      case 'left-bar':
         ctemplate=`<div class="left-bar">
            ${rendercontent(host)}
            </div>`
        break; 
      case 'main-content':
        ctemplate=`<div class="main-content">
           ${rendercontent(host)}
           </div>`
       break;
      case 'right-bar':
         ctemplate=`<div class="right-bar">
            ${renderbuttons(host)}
            </div>`
        break;
      default:
         break;
      
   } 
   return ctemplate;
   }

   const rendercontent=(host)=>{
      return    `<div class="tab-contents">${Array.from(host.metadataItem.getRelElementsOnType("RNDR_MDT").values()).map(_list_tabs_template).join('')}</div>`
   }

const renderbuttons=(host)=>{
return `<nav >${Array.from(host.metadataItem.getRelElementsOnType("RNDR_MDT").values()).map(_list_tabsbuttons_template).join('')}</nav>`
}
const renderElement=(host,key)=>{
    if(host.metadataItem.getRelElementOnType("layout-metadata",key) ){
   return layouttemplates(key,host);
}else{
   return ``;
}
}

export {_render}
