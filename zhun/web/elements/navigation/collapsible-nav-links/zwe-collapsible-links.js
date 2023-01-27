 import { ZweCore } from '../../core/zwe-core';
import {_render} from './zwe-collapsible-links-render'
 export class ZweCollapsibleNavLinks extends ZweCore{
        
     constructor(){
        super();
        super.metadatakeyid=this.getAttribute('metadatakeyid');
//console.log(`ZweLinks^constructor^value of metadatakeyid:${this.metadatakeyid}`);
       }   
    
    connectedCallback(){ 
//console.log(`ZweLinks^connected callback^audit^entering connected callback: calling pre`);

//console.log(`ZweLinks^constructor^value of metadatakeyid:${this.metadatakeyid}`);
      this.connectedCallbackpre(this.metadatakeyid);
//console.log(`ZweLinks^connected callback^audit^entering connected callback: after calling pre`);
     } 

  
     postrendersubs(){
      this.publishSubElementsData();
      if(this.metadataItem.getData("compact-view") && this.metadataItem.getData("compact-view").fieldValue){
      this.closedetails();
   }
   } 
   closedetails=()=>{
      let eles=this.shadowRoot.querySelectorAll(".collapsibles");
//console.log("details elements are:");
      eles.forEach(ele=>{
//console.log("details element is");
//console.log(ele);
         ele.addEventListener("click",(event)=>{
//console.log("event taget is");
//console.log(event.target.parentNode);
            let eles=this.shadowRoot.querySelectorAll(".collapsibles");
            eles.forEach(ele=>{
               // console.log("tarvering on node:");
               // console.log(ele);
               // console.log("taversing at parent");
               // console.log(ele);
               // console.log(ele);
               if(ele.id!==event.target.parentNode.id){
//console.log("the 2 ids dont match remove id"+ele.id+":: "+event.target.parentNode.id);
                  ele.removeAttribute("open");
               }
            })
         })
      })
    }
  publishSubElementsData=()=>{
//console.log("call under publsih subelements data publishing zwe nav links data for elemtns");
   Array.from(this.metadataItem.getRelElementsOnType("RNDR_MDT").values()).map(
      itm=>{
//console.log(`publishing zwe nav links data for elemtns ${itm.getId()} :: ${itm.name}`);
         zhun_web_metadata_fiber.push(itm.getId(),itm);
      }
   )
   
  }

     render(){
//console.log(`ZweLinks^render^audit^entering render`);
//console.log(`ZweLinks^render^audit^calling renderer of the layout render`);

      _render(this);  

     }  
}
customElements.define('zwe-collapsible-nav-links',ZweCollapsibleNavLinks)
