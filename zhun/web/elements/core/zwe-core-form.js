import { zhun_web_metadata_fiber } from "../../../../../zhun-web-fabric/zhun-fabric";

//TODO uncomment if coreform is fixed
  //  export class ZweCoreForm extends HTMLFormElement{
 
   export class ZweCoreForm extends HTMLElement{
       metadataItem;
       metadatakeyid='';
    
       sbesformdata;
       
        constructor(){
        super();  
        this.sbesformdata= new Map();
          this.shadow=this.attachShadow({mode:"open"});
      }   
    
    connectedCallbackpre( mdatakey){ 
        zhun_web_metadata_fiber.subscribe(this.metadatakeyid,this.getElementMetaDataItem); 
      
      } 


    disconnectedCallback(){ 
      zhun_web_metadata_fiber.remove(this.metadatakeyid,this.getElementMetaDataItem); 
    
 } 
 render(){

//console.log("ZweCore^render^audit");
 }
 postrendersubs(){
   
 }; prerenderprep(){

 }
  getElementMetaDataItem=(event)=>{   
      
    this.metadataItem=event.detail;
     this.prerenderprep();
    this.render(); 
     //pushout subelment contentents
     this.postrendersubs();

     Array.from( this.shadowRoot.querySelectorAll(".collapsibles")).forEach(element=>{
//console.log("adding eventlistenr to listen to fieldset changes "+element.id);
//console.log("funvtion passed is");
//console.log(this.handelFieldSetClicked);
      element.addEventListener('click',this.handelFieldSetClicked);
     });   
  }
    
  handelFieldSetClicked=   (event)=>{
//console.log("clicked fired form core ");
//console.log(event);
      let  element=event.target;
//console.log("core form element tagname is"+event.target.tagName);
//console.log("core form element ID is"+event.target.id);
      if(event.target.tagName==="LEGEND"){
          element=event.target.parentNode;
      }

      // if(element.tagName==="FIELDSET" && element.classList.contains("minimized")){

      if(element.tagName==="FIELDSET"  ){
//console.log("element is");
//console.log(element);
      if(element.classList.contains("expanded")){
//console.log("element has classs list of expanded removing it");
//console.log(element.classList);
       element.classList.remove("expanded");
       element.classList.add("minimized");

      }else 
      if(element.classList.contains("minimized")){
//console.log("element has classs list of minimized removing it");
//console.log(element.classList);
        element.classList.remove("minimized");
        element.classList.add("expanded");
      
      }
//console.log("element has classs list  as below after all changes");

//console.log(element.classList);
//console.log("handelFieldSetClicked value of this is");
//console.log(this);

      this.closeFieldsets(element);
       event.preventDefault();
       event.stopPropagation();
     }
    //  event.preventDefault();
    //   event.stopPropagation();
    }
  
 filterOutEles(array,ele_){
 return array.filter((elee)=>{
 return  elee.id !== ele_.ele.id && elee.id !== ele_.pid 
  })
 }
  closeFieldsets=(element)=>{
//console.log("closeFieldsets value of this is");
//console.log("element passed is:::::::::::::::");
//console.log(element);
    let parentnodeid=element.parentNode.id;
//console.log(`parent node idis:${parentnodeid}`);
//console.log(this);
   let elses=Array.from(this.shadowRoot.querySelectorAll(".collapsibles"));
//console.log("pre filter eles are");
//console.log(elses);
   let elestoClose= this.filterOutEles(elses,{pid:parentnodeid,ele:element});
//console.log("post filter eles are");
//console.log(elestoClose);
    
//console.log("details elements are:");
    elestoClose.forEach(ele=>{ 
      ele.classList.remove("expanded");
      ele.classList.add("minimized");
    })
  }
} 