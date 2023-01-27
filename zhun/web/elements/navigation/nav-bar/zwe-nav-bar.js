 import { addeventlistner_for_classtoggel_on_element, addeventlistner_for_classtoggel_on_subelement, animate_nav_links } from '../../../../std/util/dom-eventors.js';
import {_render} from './zwe-nav-bar-render.js'
 export class ZweNavBar extends HTMLElement{
      navdetails='';
      navItem;
     constructor(){
        super();  
      
          this.navdetails=this.getAttribute('navdetails');
         this.navItem=this.getAttribute('navitem');
        this.shadow=this.attachShadow({mode:"open"});
       
    }   
    
    connectedCallback(){ 
         zhun_web_metadata_fiber.subscribe(this.navdetails,this.getNavItem); 
        if(this.isConnected){
         }
    } 

    disconnectedCallback(){ 
      zhun_web_metadata_fiber.remove(this.navdetails,this.getNavItem); 
    
 } 
  getNavItem=(event)=>{ 
      this.navItem=event.detail;
      // console.log("Object this in getnavItem is");
      // console.log(this);
      // console.log("the navitem after callbacksetting is ");
      // console.log(this.navItem);
      _render(this);  
      addeventlistner_for_classtoggel_on_subelement(this,"click",".burger",".nav-links","nav-active"); 
      animate_nav_links(this,"click",".burger",'.nav-links li');
      addeventlistner_for_classtoggel_on_element(this,"click",".burger", "toggel");
      addeventlistner_for_classtoggel_on_element(this,"page-scrolled","nav", "nav-scrolled")
//console.log("all navlinks in nav bar are");
//console.log(this.shadowRoot.querySelectorAll(`[${this.navItem.getData("routing-attribute").fieldValue}]`));

//console.log("all navlinks in nav bar are");
//console.log(this.shadowRoot.querySelectorAll(`${this.navItem.getData("routing-attribute").fieldValue}`));
   Array.from( this.shadowRoot.querySelectorAll(`[${this.navItem.getData("routing-attribute").fieldValue}]`)).forEach(element=>{
      element.addEventListener('click',(event)=>{
//console.log("under navbar clicked item event is");
      if(event.target.matches(`[${this.navItem.getData("routing-attribute").fieldValue}]`)){
console.log("under navbar clicked item clicked is routable");
console.log(event.target);
console.log(event.target.textContent);
       zhun_web_metadata_fiber.push("route-clicked",this.navItem.getRelElementsOnType("RNDR_MDT").get(event.target.textContent));
       event.preventDefault();
        event.stopPropagation();
     }
      })
    })
   
   
  }
  
    toggelClasses(event,detail){
            // console.log("under toggelClasses"+event);
            // console.log(detail);
            // console.log("---------end--------------");
            this.shadowRoot.querySelector("nav").classList.toggle(detail.classstoggeldata);
        }
}
customElements.define('zwe-nav-bar',ZweNavBar)
