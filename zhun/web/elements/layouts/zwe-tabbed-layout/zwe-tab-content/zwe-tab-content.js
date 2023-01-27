 import { ZweCore } from '../../../core/zwe-core';
import {_render} from './zwe-tab-content-render'
 export class ZweTabContent extends ZweCore{
        
     constructor(){
        super();//data-metadata-key-id
        super.metadatakeyid=this.dataset.metadataKeyId;
     //  alert(`under the constructor of zwe tab layout ${this.metadatakeyid}`)
      }    
    connectedCallback(){ 
      this.connectedCallbackpre(this.metadatakeyid);
      zhun_web_metadata_fiber.subscribe("show-tab-content-"+this.metadatakeyid,this.rendertabcontent); 

      zhun_web_metadata_fiber.subscribe("hide-tab-content-"+this.metadatakeyid,this.hidetabcontent); 
    } 
     render(){ 
      _render(this);  
     }   
      postrendersubs(){
      this.publishSubElementsData();
   }
   
   

   hidetabcontent=(event)=>{
//console.log("call under render tab content for metadatakey"+this.metadatakeyid+"and item");
//console.log(this.metadataItem);
    event.preventDefault();
    event.stopPropagation();
    let ele=this.shadowRoot.querySelector(".zwe-tab-content");
//console.log("tabcontent ele is");
    ele.classList.remove("zwe-tab-content-active");
 
//console.log(ele);
     }
 rendertabcontent=(event)=>{
//console.log("call under render tab content for metadatakey"+this.metadatakeyid+"and item");
//console.log(this.metadataItem);
  event.preventDefault();
  event.stopPropagation();
  let ele=this.shadowRoot.querySelector(".zwe-tab-content");
//console.log("tabcontent ele is");
  ele.classList.add("zwe-tab-content-active");
//console.log(ele);
   }
  publishSubElementsData=()=>{
      Array.from(this.metadataItem.getRelElementsOnType("RNDR_MDT").values()).map(element=>{
//console.log("Dispatchin data from zwe-tab-content is");
//console.log(element);
   zhun_web_metadata_fiber.push(element.getId(),element);

      })
//   zhun_web_metadata_fiber.push(this.metadataItem.getRelElementsOnType("RNDR_MDT").get("left-bar").getId(),this.metadataItem.getRelElementsOnType("RNDR_MDT").get("left-bar"));
  } 
}
customElements.define('zwe-tab-content',ZweTabContent)
