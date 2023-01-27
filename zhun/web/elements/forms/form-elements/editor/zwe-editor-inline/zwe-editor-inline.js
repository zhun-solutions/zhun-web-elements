//  import Quill from 'quill';
import { ZweCore } from '../../../../core/zwe-core';
import {_render} from './zwe-editor-inline-render'
 export class ZweEditorInline extends ZweCore{
  
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
//console.log("ZweEditorInline Metadta item in zwe editor is");
//console.log(this.metadataItem);
      //  zhun_web_metadata_fiber.subscribe("render-editor-"+this.metadatakeyid,this.rendereditor); 
      
        let editordiv=    this.shadowRoot.querySelector(`#editor-${this.metadatakeyid}`)
        // this.quill= new Quill(editordiv, {
        //       theme: 'bubble'
        //     });
    let  btn=this.shadowRoot.querySelector(`#editor-open-button${this.metadatakeyid}`);
     btn.addEventListener("click",this.saveeditordata)
//console.log("ZweEditorInline button after adding event listeenr is");
//console.log(btn);
      this.publishSubElementsData();
   this.postprocessing()
    } 
   postprocessing(){
 
   }
   saveeditordata=(event)=>{
//console.log("ZweEditorInline need to save editor data");
     let editordiv=    this.shadowRoot.querySelector(`#editor-${this.metadatakeyid}`)
//console.log("div to work on is");
//console.log(editordiv);
     let qleditor=editordiv.querySelector(".ql-editor");
//console.log("ZweEditorInline ql editor is");
//console.log(qleditor);
    
//console.log(qleditor.childNodes);
    let opdiv=document.createElement("div");

    qleditor.childNodes.forEach(node=>{
//console.log(`ZweEditorInline working on node`);
//console.log(node);
     let cnode=node.cloneNode(true);
      opdiv.appendChild(cnode);
    })
    this.shadowRoot.appendChild(opdiv)
//console.log("ZweEditorInline div to append is");
//console.log(opdiv);
  }
 
  publishSubElementsData=()=>{
    
  } 
}
customElements.define('zwe-editor-inline',ZweEditorInline)