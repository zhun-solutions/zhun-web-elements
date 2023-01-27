 import { ZweCoreTabel } from '../../core/zwe-core-tabel';
import {_render} from './zwe-tabel-render'
 export class ZweTabel extends ZweCoreTabel{
        
     constructor(){
        super();
        super.metadatakeyid=this.dataset.metadataKeyId;
//console.log(`ZweTable^constructor^value of metadatakeyid:${this.metadatakeyid}`);
       }   
    
    connectedCallback(){ 
//console.log(`ZweTable^connected callback^audit^entering connected callback: calling pre`);
//console.log(`ZweTable^constructor^value of metadatakeyid:${this.metadatakeyid}`);
      this.connectedCallbackpre(this.metadatakeyid);
//console.log(`ZweTable^connected callback^audit^entering connected callback: after calling pre`);
     } 

  
     postrendersubs(){
      this.publishSubElementsData(); 
   } 
    
  publishSubElementsData=()=>{
//console.log("call under publsih subelements data publishing zwe nav links data for elemtns");
 
   
  }

     render(){
//console.log(`ZweForm^render^audit^calling renderer of the layout render`);

      _render(this);  

     }  


} 
customElements.define('zwe-tabel',ZweTabel,{extends:'tabel'})