   import styles from './zwe-layout.styles.scss'; 
 const _render =(host)=>{ 
//console.log("ZweLayoutRendrer^_render^audit^");
//console.log("metadata item is:");
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
const defaults=[
   'main-content'
]
const layouttemplates={
   'header':`<header>
               <slot name="header"></slot>
             </header>`,
'left-bar':` <div class="left-bar">
               <slot name="left-bar"></slot>
             </div>`, 

'main-content':`<div class="main-content">
                  <slot name="main-content"></slot>
               </div>`, 
  'right-bar':` <div class="right-bar">
                 <slot name="right-bar"></slot>
                 </div>`, 
   'footer':` <footer>
               <slot name="footer"></slot>
             </footer>`
 
   }



const renderElement=(host,key)=>{
//console.log("ZweLayoutRender^renderElement^host.metadataItem ");
   if(host.metadataItem.getRelElementsOnType("RNDR_MDT").get(key) ){
   return layouttemplates[key]
}else{
   return ``;
}
}

export {_render}
