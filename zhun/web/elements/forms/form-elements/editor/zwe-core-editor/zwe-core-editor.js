 import { Item, ItemData } from '../../../../../../../../zhun-data-elements/zhun-data-elements';
import { zhun_web_data_fiber, zhun_web_metadata_fiber } from '../../../../../../../../zhun-web-fabric/zhun-fabric';
import { ZweCore } from '../../../../core/zwe-core';
import {_render} from './zwe-core-editor-render'
 export class ZweCoreEditor extends ZweCore{
    editor ;
          toolbar ;
          buttons  ;
          contentArea  ;
          visuellView  ;
          htmlView  ;
          modal ;
          selection;
          close;
          submit;
          posteditrendererdiv;
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
     renderprestdata=(event)=>{
      console.log("got message under renderpreset data event : detail to be prerendered is");
      console.log(event);
      console.log(event.V);
      this.visuellView.innerHTML=`${event.detail.fieldValue}`;
      let inputdiv=this.shadowRoot.querySelector(`#editor-data-${this.metadatakeyid}`);
     let rendererdiv=this.shadowRoot.querySelector(`#editors-core-renderer-${this.metadatakeyid}`);
      rendererdiv.innerHTML=this.visuellView.innerHTML; 
    inputdiv.value= this.visuellView.innerHTML;
     }
     postrendersubs=()=>{
//console.log("Metadta item in zwe editor is postrendersubs");
//console.log(this.metadataItem);
//console.log("Element rendered is");
//console.log(this);
zhun_web_data_fiber.subscribe("exec-data-"+this.metadatakeyid,this.renderprestdata);
        zhun_web_metadata_fiber.subscribe("render-editor-"+this.metadatakeyid,this.rendereditor); 
      
        let editordiv= this.shadowRoot.querySelector(`#editor-${this.metadatakeyid}`)
//console.log("editordiv IS");
//console.log(editordiv);
     
         this.editor = editordiv.getElementsByClassName('editor')[0];
         this.toolbar = this.editor.getElementsByClassName('toolbar')[0];
         this.buttons = this.toolbar.querySelectorAll('.btn:not(.has-submenu)');
         this.contentArea = this.editor.getElementsByClassName('content-area')[0];
         this.visuellView = this.contentArea.getElementsByClassName('visuell-view')[0];
         this.htmlView = this.contentArea.getElementsByClassName('html-view')[0];
         this.modal = editordiv.getElementsByClassName('modal')[0];
         this.savchangesbutton=this.shadowRoot.querySelector(`#editor-save-button-${this.metadatakeyid}`);
         this.editoropenbutton=this.shadowRoot.querySelector(`#editor-open-button-${this.metadatakeyid}`);
          this.posteditrendererdiv=this.shadowRoot.querySelector(`#post-edit-renderer-${this.metadatakeyid}`);
//console.log("this.savchagnesbutton is");
//console.log(this.savchangesbutton);
         this.savchangesbutton.addEventListener("click",this.saveeditordata);
         this.editoropenbutton.addEventListener("click", this.openeditordata);
         this.posteditrendererdiv.style.display="none";
        // POST PROCESSING


// add active tag event//
//document.addEventListener('selectionchange', this.selectionChange);
 this.visuellView.addEventListener('click', this.clickineditordiv);

//add toolbar button actions
for(let i = 0; i < this.buttons.length; i++) {
  let button = this.buttons[i];
//console.log("adding click event listener to button:");
//console.log(button);
  button.addEventListener('click', this.buttonclicked);
}

    } 

    buttonclicked=(e)=> {
//console.log("underbuttonClicked event is");
//console.log(e);
      let btn=e.target.parentNode;
//console.log("e.target is");

//console.log(btn);
      let action = btn.dataset.action;
      let va=btn.dataset.tagName;
//console.log("Va captured is");
//console.log(va);
//console.log("value of this in buttonclicked is");
//console.log(this);
      switch(action) {
        case 'code':
          this.execCodeAction(btn);
          break;
        case 'createLink':
          this.execLinkAction();
          break;
        default:
          this.execDefaultAction(action,va);
      }''
      
    }
    clickineditordiv=()=>{
//console.log("captured in clickineditordir");
//console.log("shadowroot selection is");
//console.log(this.shadowRoot.getSelection());
    this.selectionChange();
  }


// sets the current format buttons active/inactive
  selectionChange=()=> {
//console.log("UNDER SELCTIONCHANGE :");
  
  for(let i = 0; i < this.buttons.length; i++) {
    let button = this.buttons[i];
    //console.log("UNDER SELCTIONCHANGE REMOVING ACTIVE FROM BUTTON:");
  //  console.log(button);
    button.classList.remove('active');
  }
  this.parentTagActive(this.shadowRoot.getSelection().anchorNode.parentNode);
}




  parentTagActive=(elem)=> {
    //if element is of visuell-view dont do anything
//console.log("undr parent tag Active working on elem");
//console.log(elem);
  if(elem && elem.classList && elem.classList.contains('visuell-view')) return false;
  
  let toolbarButton;
  
  // active by tag names
//console.log("working on elem");
//console.log(elem);

  if(elem && elem.tagName){
//console.log("working on tagname");
//console.log(elem.tagName);
  let tagName = elem.tagName.toLowerCase();

  toolbarButton = this.shadowRoot.querySelectorAll(`.toolbar .btn[data-tag-name="${tagName}"]`)[0];
  if(toolbarButton) {
    toolbarButton.classList.add('active');
  }}
  
  // active by text-align
  if(elem && elem.style){
  let textAlign = elem.style.textAlign;
  toolbarButton = document.querySelectorAll(`.toolbar .btn[data-style="textAlign:${textAlign}"]`)[0];
  if(toolbarButton) {
    toolbarButton.classList.add('active');
  }}
  if(elem){
  return this.parentTagActive(elem.parentNode);
}else{
  return false;
}
}




// this function toggles between visual and html view
 execCodeAction=(button)=>{

  if(button.classList.contains('active')) { // show visuell view
    this.visuellView.innerHTML = this.htmlView.value;
    this.htmlView.style.display = 'none';
    this.visuellView.style.display = 'block';

    button.classList.remove('active');     
  } else {  // show html view
    this.htmlView.innerText = this.visuellView.innerHTML;
    this.visuellView.style.display = 'none';
    this.htmlView.style.display = 'block';

    button.classList.add('active'); 
  }
}

// add link action
  execLinkAction=()=> {  
  this.modal.style.display = 'block';
   this.selection = this.saveSelection();

  this.submit = this.modal.querySelectorAll('button.done')[0];
  this.close = this.modal.querySelectorAll('.close')[0];
  
  // done button active => add link
  this.submit.addEventListener('click',this.execLinkSubmit);  
  
  // close modal on X click
  this.close.addEventListener('click', function() {
    let linkInput = this.modal.querySelectorAll('#linkValue')[0];
    
    this.modal.style.display = 'none';
    linkInput.value = '';
    
    // deregister modal events
    this.submit.removeEventListener('click',this.execLinkAction  );
    this.close.removeEventListener('click', this.execLinkAction );
  });
}

//
execLinkSubmit=()=>{ 
    let newTabCheckbox = this.modal.querySelectorAll('#new-tab')[0];
    let linkInput = this.modal.querySelectorAll('#linkValue')[0];
    let linkValue = linkInput.value;
    let newTab = newTabCheckbox.checked;    
    
    this.restoreSelection(this.selection);
    
    if(this.shadowRoot.getSelection().toString()) {
      let a = document.createElement('a');
      a.href = linkValue;
      if(newTab) a.target = '_blank';
      this.shadowRoot.getSelection().getRangeAt(0).surroundContents(a);
    }

    this.modal.style.display = 'none';
    linkInput.value = '';
    
    // deregister modal events
    this.submit.removeEventListener('click',this.execLinkSubmit  );
    this.close.removeEventListener('click', this.execLinkSubmit );
  
}
// executes normal actions
  execDefaultAction=(action,va)=> {
//console.log("under exect default action");
//console.log(action);
//console.log("calling exec command with action:"+action+"va:"+va);
  document.execCommand(action, false,va);
}

// saves the current selection
  saveSelection=()=> {
    if(this.shadowRoot.getSelection) {
     let   sel = this.shadowRoot.getSelection();
        if(sel.getRangeAt && sel.rangeCount) {
            let ranges = [];
            for(var i = 0, len = sel.rangeCount; i < len; ++i) {
                ranges.push(sel.getRangeAt(i));
            }
            return ranges;
        }
    } else if (document.selection && document.selection.createRange) {
        return document.selection.createRange();
    }
    return null;
}

// loads a saved selection
  restoreSelection=(savedSel)=> {
    if(savedSel) {
        if(this.shadowRoot.getSelection) {
           let sel = this.shadowRoot.getSelection();
            sel.removeAllRanges();
            for(var i = 0, len = savedSel.length; i < len; ++i) {
                sel.addRange(savedSel[i]);
            }
        } else if(document.selection && savedSel.select) {
            savedSel.select();
        }
    }
}




   postprocessing(){
 
   }
   openeditordata=(event)=>{
//console.log("need to open editor ");
    let editordiv=    this.shadowRoot.querySelector(`#editor-${this.metadatakeyid}`)
    let inputdiv=this.shadowRoot.querySelector(`#editor-data-${this.metadatakeyid}`);
    let rendererdiv=this.shadowRoot.querySelector(`#editors-core-renderer-${this.metadatakeyid}`);

    rendererdiv.innerHTML=this.visuellView.innerHTML;
//editors-core-renderer-
//console.log("div to work on is");
//console.log(editordiv); 
    this.visuellView.innerHTML=inputdiv.value 
//console.log("core editor     inputdiv.value= this.visuellView.innerHTML is     ");
//console.log(inputdiv.value);
   editordiv.style.display="block";
   this.posteditrendererdiv.style.display="none";
 }
   saveeditordata=(event)=>{
//console.log("need to save editor data");
     let editordiv=    this.shadowRoot.querySelector(`#editor-${this.metadatakeyid}`)
     let inputdiv=this.shadowRoot.querySelector(`#editor-data-${this.metadatakeyid}`);
     let rendererdiv=this.shadowRoot.querySelector(`#editors-core-renderer-${this.metadatakeyid}`);
      rendererdiv.innerHTML=this.visuellView.innerHTML;
       //editors-core-renderer-
//console.log("div to work on is");
//console.log(editordiv);
    //  let qleditor=this.visuellView;
    inputdiv.value= this.visuellView.innerHTML;
//console.log("core editor     inputdiv.value= this.visuellView.innerHTML is     ");
//console.log(inputdiv.value);
    editordiv.style.display="none";
    this.posteditrendererdiv.style.display="block";
    let inputdivitem= new Item();
      inputdivitem.name="ipud"+this.metadataItem.getData("form").fieldValue+this.metadataItem.getId();
    let formData=new FormData();
    
    formData.append(this.metadataItem.getData("form-keys").fieldValue[0],`${inputdiv.value}`);
//console.log("formData being passed from coreeditor is");
//console.log(formData.get("input"));
    inputdivitem.addData("form-data",new ItemData("form-data",formData));
    zhun_web_data_fiber.push("ipud"+this.metadataItem.getData("form").fieldValue+this.metadataItem.getId(),inputdivitem)
  }
 
  publishSubElementsData=()=>{
    
  } 
}
customElements.define('zwe-core-editor',ZweCoreEditor)