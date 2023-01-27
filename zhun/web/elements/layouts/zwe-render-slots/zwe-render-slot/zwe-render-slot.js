 import { ZweCore } from '../../../core/zwe-core';
import {_render} from './zwe-render-slot.render';
import {_render_element} from "../../../../../std/elements/templates/list/list-templates";
import { zhun_web_metadata_fiber } from '../../../../../../../zhun-web-fabric/zhun-fabric';
 export class ZweRenderSlot extends ZweCore{
        
     constructor(){
        super();
        super.metadatakeyid=this.dataset.metadataKeyId;
//console.log(`ZweRenderSlot^constructor^value of metadatakeyid:${this.metadatakeyid}`);
       }   
    
    connectedCallback(){ 
//console.log(`ZweRenderSlot^connected callback^audit^entering connected callback: calling pre`);

//console.log(`ZweRenderSlot^constructor^value of metadatakeyid:${this.metadatakeyid}`);
      this.connectedCallbackpre(this.metadatakeyid);
//console.log(`ZweRenderSlot^connected callback^audit^entering connected callback: after calling pre`);
     } 
     postrendersubs(){
  //        this.subscribeToDataChangeEvents();
      this.publishSubElementsData();
      if(this.metadataItem.getData("compact-view") && this.metadataItem.getData("compact-view").fieldValue){
      this.closedetails();
   }
   } 


//    subscribeToDataChangeEvents=()=>{
//       console.log("metadataitem in subscribetodatachange event is");
//         console.log(this.metadataItem);
//         let renderslotnameitem=this.metadataItem.getData("render-slot-name");
//     let renderslotname=renderslotnameitem.fieldValue;
//     let renderslotid=renderslotnameitem.eleid;
//     zhun_web_metadata_fiber.subscribe(renderslotname+renderslotid,this.processSubscribedRendering); 
   
//    }
//    processSubscribedRendering=(event)=>{
//      let item=event.detail;
    
// let    rendereleTemplate=  _render_element(item);
//       console.log("rendereleTemplate is");
//       console.log(rendereleTemplate);
//       let  rendermetadata=item.getRelElementsOnType("RNDR_MDT").values().next().value;
      
//   // let      slot=this.shadowRoot.querySelector('slot[name="'+rendermetadata.getData("render-slot-id").fieldValue+'"]')
// //slot.insertAdjacentHTML('beforeend', rendereleTemplate);
// let      div= this.shadowRoot.getElementById(rendermetadata.getData("render-slot-id").fieldValue);
// // this.shadowRoot.
// div.insertAdjacentHTML('beforeend', rendereleTemplate); 
//       zhun_web_metadata_fiber.push(item.getId(),item);
//    }
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
  
  
  
   
  }

     render(){
//console.log(`ZweRenderSlot^render^audit^entering render`);
//console.log(`ZweRenderSlot^render^audit^calling renderer of the layout render`);

      _render(this);  

     }  
}
customElements.define('zwe-render-slot',ZweRenderSlot)
