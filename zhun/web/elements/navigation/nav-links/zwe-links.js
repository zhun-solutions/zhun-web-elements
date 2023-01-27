 import { ZweCore } from '../../core/zwe-core';
import {_render} from './zwe-links-render'
 export class ZweNavLinks extends ZweCore{
        
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

     render(){
//console.log(`ZweLinks^render^audit^entering render`);
//console.log(`ZweLinks^render^audit^calling renderer of the layout render`);

      _render(this);  

     }  
}
customElements.define('zwe-nav-links',ZweNavLinks)