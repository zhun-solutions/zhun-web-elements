 import { ZweCoreRtr } from '../../core/zwe-core-rtr';
import {_render} from './zwe-button-render'
 export class ZweButton extends ZweCoreRtr{
        
     constructor(){
        super();
        super.metadatakeyid=this.dataset.metadataKeyId;
console.log(`ZweButton^constructor^value of metadatakeyid:${this.metadatakeyid}`);
       }   
    
    connectedCallback(){ 
console.log(`ZweButton^connected callback^audit^entering connected callback: calling pre`);

console.log(`ZweButton^constructor^value of metadatakeyid:${this.metadatakeyid}`);
      this.connectedCallbackpre(this.metadatakeyid);
console.log(`ZweButton^connected callback^audit^entering connected callback: after calling pre`);
     } 

     render(){
console.log(`ZweButton^render^audit^entering render`);
console.log(`ZweButton^render^audit^calling renderer of the layout render`);

      _render(this);  
console.log(`ZweButton^render^audit^after rendering metadata is:`);

      console.log(this.metadataItem);

     }  
}
customElements.define('zwe-button',ZweButton)