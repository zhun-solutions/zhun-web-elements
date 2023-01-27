 import { zhun_web_metadata_fiber } from '../../../../../../zhun-web-fabric/zhun-fabric';
import { ZweCore } from '../../core/zwe-core';
import {_render} from './zwe-tab-layout-render'
 export class ZweTabLayout extends ZweCore{
        
     constructor(){
        super();
        super.metadatakeyid=this.getAttribute('metadatakeyid');
          if(this.metadatakeyid===null){
            super.metadatakeyid=this.dataset.metadataKeyId;
          }
        console.log(`under the constructor of zwe tab layout ${this.metadatakeyid}`)
      }    
    connectedCallback(){ 
      this.connectedCallbackpre(this.metadatakeyid);
       } 
     render(){ 
      _render(this);  
     }   
      postrendersubs(){
      this.publishSubElementsData();
   this.postprocessing()
    } 
   postprocessing(){
    
    console.log("ZweTabLayout^postprocessing^metadataItem");
    console.log(this.metadataItem);
    if(this.metadataItem.getData("tab-rendering-attribute")){
      Array.from(this.metadataItem.getRelElementsOnType("RNDR_MDT").values()).map(btnItm=>{
    console.log("button item is");
        let btnele=        this.shadowRoot.getElementById(`tabbtn-${btnItm.getId()}`);
        btnele.addEventListener('click',this.postrenderbuttonclickedeventhandler)
      //TODO : might need optimization
      zhun_web_metadata_fiber.subscribe("show-tab-content-ext-"+btnItm.getId(),this.handleToShowTabContent);

      });
      
   
  }
   }
   handleToShowTabContent=(event)=>{
    console.log("under handle to show tab content");
    console.log("event is");
    console.log(event);
    console.log(event.detail);
    // postrenderbuttonclicked()
    let id=event.type.replace("show-tab-content-ext-","");
    console.log("id to show on ext event is");
    console.log(id);
    //TODO currently internally simulating button click might have to be optimized
    this.postrenderbuttonclicked("tabbtn-"+id);

   }
   postrenderbuttonclicked=(tid)=>{
    let  idtomatch=''+tid;
    let id=idtomatch.replace("tabbtn-","");
    console.log("id for tab show content is");
    console.log(id);
    this.shadowRoot.getElementById(idtomatch).classList.add("tabactive");
    zhun_web_metadata_fiber.push(`show-tab-content-${id}`,id);
    
      Array.from(this.metadataItem.getRelElementsOnType("RNDR_MDT").values()).map(btnItm=>{
          if(!idtomatch.match(btnItm.getId())){
          this.shadowRoot.getElementById(`tabbtn-${btnItm.getId()}`).classList.remove("tabactive");
          // this.shadowRoot.getElementById(`tabbtn-${btnItm.getId()}`).style.display="none";
            zhun_web_metadata_fiber.push(`hide-tab-content-${btnItm.getId()}`,btnItm.getId());  
          } 
        }); 
   }
   postrenderbuttonclickedeventhandler=(event)=>{

console.log(`event.target.id is ${event.target.id}`);
  
this.postrenderbuttonclicked(event.target.id);
       event.preventDefault();
       event.stopPropagation();
        
   }
  publishSubElementsData=()=>{
    Array.from(this.metadataItem.getRelElementsOnType("RNDR_MDT").values()).map(contentelement=>{
      zhun_web_metadata_fiber.push(contentelement.getId(),contentelement);
    });
//  
  } 
}
customElements.define('zwe-tab-layout',ZweTabLayout)
