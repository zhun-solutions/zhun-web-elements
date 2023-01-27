import {_list_anchors_template} from '../../../../std/elements/templates/list/list-templates';
  import styles from './zwe-nav-bar.styles.scss'; 
  const imgl= require('./logo/ondc.png');
const _render =(host)=>{ 
   
//      console.log("call under _render of the navbar homemenuebarnavs is");
//     console.log(home_menu_bar_navs);
 host.shadow.innerHTML=  `
            <style>   ${styles}</style>
     <nav class="fixed-header "> 
 
     <div class="logo">
<!--     <img src=${imgl} alt="" class="logo svg-logo" >-->
      <div>${host.navItem.name}</div></div>
      <ul class="nav-links">
            ${Array.from(host.navItem.getRelElementsOnType("RNDR_MDT").values()).map(_list_anchors_template).join('')}      </ul>

     </ul>
    <div class="burger" >
    <div class="line1"></div>
    <div class="line2"></div>
    <div class="line3"></div>
    </div>
    </nav>`
  
};

export {_render}
