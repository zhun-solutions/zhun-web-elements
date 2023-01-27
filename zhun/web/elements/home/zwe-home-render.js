   import styles from './zwe-home.styles.scss'; 
  const _render =(host)=>{ 
   
   //   console.log("homemenuebarnavs is");
   //  console.log(home_menu_bar_navs);
   //    
//console.log("zwehome::host.layomditm  is");
//console.log( host.layomditm   );
  host.shadow.innerHTML=    `
             <style>   ${styles}</style>        
      <div  id="rolet-${host.navbmdItm.getId()}" class="container">
             <zwe-layout metadatakeyid=${host.layomditm.getId()}>
             <div slot="header" >
      <zwe-nav-bar   navdetails=${host.navbmdItm.getId()} data-link></zwe-nav-bar>
              </div>
             <div slot="left-bar" >
             <zwe-collapsible-nav-links metadatakeyid=${host.layomditm.getRelElementsOnType('RNDR_MDT').get('left-bar').getId()}></zwe-collapsible-nav-links>
  </div>
             <div slot="main-content" >
              </div>
             <div slot="right-bar" >
              </div>
             <div slot="footer" >
              </div>
             </zwe-layout>
             </div>
         `
  
};

export {_render}
