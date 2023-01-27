 import {home_menu_bar_navs} from '../../../std/elements/templates/data/template-data';
 import {_render} from './zwe-nav-bar-cont-render.js'
 
export class ZweNavBarCont extends HTMLElement{
    
    constructor(){
        super(); 
         
        this.shadow=this.attachShadow({mode:"open"});
      
    } 
   

    connectedCallback(){ 
        let itm=home_menu_bar_navs();
        _render(this,itm);  
//console.log("zhun_web_metadata_fiber in nbc before pushing item");
        // console.log(window.                                          zhun_web_metadata_fiber);
         zhun_web_metadata_fiber.push(itm.getId(),itm);
            } 

    
}
customElements.define('zwe-nav-bar-cont',ZweNavBarCont)