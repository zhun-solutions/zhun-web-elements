 
   export class ZweCoreTable extends HTMLElement{
       metadataItem;
       metadatakeyid='';
     constructor(){
        super();  
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
   
 } 
 prerender(){}
  getElementMetaDataItem=(event)=>{   
      
    this.metadataItem=event.detail;
    this.prerender();
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
//console.log("clicked fired");
      let  element=event.target;
//console.log("element tagname is"+event.target.tagName);
      if(event.target.tagName==="LEGEND"){
          element=event.target.parentNode;
      }

      if(element.tagName==="FIELDSET" && element.classList.contains("minimized")){
//console.log("element is");
//console.log(element);
       element.classList.add("expanded");
      element.classList.remove("minimized");
//console.log(element.classList);
//console.log("handelFieldSetClicked value of this is");
//console.log(this);

      this.closeFieldsets(element);
      event.preventDefault();
      event.stopPropagation(); }
    
    }
  
 filterOutEles(array,ele){
 return array.filter((elee)=>{
 return  elee.id !== ele.id
  })
 }
  closeFieldsets=(element)=>{
//console.log("closeFieldsets value of this is");
//console.log("element passed is:::::::::::::::");
//console.log(element);
//console.log(this);
   let elses=Array.from(this.shadowRoot.querySelectorAll(".collapsibles"));
//console.log("pre filter eles are");
//console.log(elses);
   let elestoClose= this.filterOutEles(elses,element);
//console.log("post filter eles are");
//console.log(elestoClose);
    
//console.log("details elements are:");
    elestoClose.forEach(ele=>{ 
      ele.classList.remove("expanded");
      ele.classList.add("minimized");
    })
  }
} 