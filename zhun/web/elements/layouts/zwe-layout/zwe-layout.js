 import { ZweCore } from '../../core/zwe-core';
import {_render} from './zwe-layout-render'
 export class ZweLayout extends ZweCore{
        
     constructor(){
        super();
        super.metadatakeyid=this.getAttribute('metadatakeyid');
        }   
    
    connectedCallback(){ 
      this.connectedCallbackpre(this.metadatakeyid);
       } 

     render(){ 
      _render(this);  
     }  

  
      postrendersubs(){
        this.publishSubElementsData();
    } 
    publishSubElementsData=()=>{
      let lb=this.metadataItem.getRelElementsOnType("RNDR_MDT").get("left-bar");
      if(lb)
        zhun_web_metadata_fiber.push(lb.getId(),lb);

      let rb=this.metadataItem.getRelElementsOnType("RNDR_MDT").get("right-bar");
      if(rb)
        zhun_web_metadata_fiber.push(rb.getId(),rb);    
    
      let hdr=this.metadataItem.getRelElementsOnType("RNDR_MDT").get("header");
      if(hdr)
       zhun_web_metadata_fiber.push(hdr.getId(),hdr);      

      let ftr=this.metadataItem.getRelElementsOnType("RNDR_MDT").get("footer");
      if(ftr)
         zhun_web_metadata_fiber.push(ftr.getId(),ftr);
      let mainc=this.metadataItem.getRelElementsOnType("RNDR_MDT").get("main-content");
      if(mainc)
         zhun_web_metadata_fiber.push(mainc.getId(),mainc);
     }

  // renderRoutes=async (event)=>{ 
  //     this.routeItem=event.detail;
  //     this.routeItem.parentId=this.navbmdItm.getId();
       
  //     webelementsnavigateTo(this.routeItem.getData('hash').fieldValue);
  //    let view= await webelementsrouter(this.routeItem);
  //   let rolet=this.shadowRoot.querySelector(`#rolet-${this.navbmdItm.getId()}`)
  //    rolet.innerHTML=await view.getHtml();
  // }
}
customElements.define('zwe-layout',ZweLayout)
