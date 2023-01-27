   export class ZweCore extends HTMLElement{
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

 render_on_event(){

 }
 render(){

//console.log("ZweCore^render^audit");
 }
 postrendersubs(){
   
 };
  getElementMetaDataItem=(event)=>{   
      
    this.metadataItem=event.detail;
     this.render(); 
     this.render_on_event();
     //pushout subelment contentents
     this.postrendersubs();
      if(this.metadataItem.getData("routing-attribute")){
      Array.from( this.shadowRoot.querySelectorAll(`[${this.metadataItem.getData("routing-attribute").fieldValue}]`)).forEach(element=>{
      element.addEventListener('click',(event)=>{
          if(event.target.matches(`[${this.metadataItem.getData("routing-attribute").fieldValue}]`)){
        zhun_web_metadata_fiber.push("route-clicked",this.metadataItem.getRelElementsOnType("RNDR_MDT").get(event.target.textContent));
       event.preventDefault();
        event.stopPropagation();
     }
      })



    })
   
  }
  }
   
} 
