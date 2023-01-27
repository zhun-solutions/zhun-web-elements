 import { EntityUtil, Item, ItemData } from '../../../../../../zhun-data-elements/zhun-data-elements';
import { ItemService } from '../../../../../../zhun-store-adapter/firestore-adapter/item.service';
import { zhun_web_data_fiber, zhun_web_metadata_fiber } from '../../../../../../zhun-web-fabric/zhun-fabric';
import { _render_element } from '../../../../std/elements/templates/list/list-templates';
import { ZweCoreForm } from '../../core/zwe-core-form';
import {_render} from './zwe-form-render'
 export class ZweForm extends ZweCoreForm{
    formItem;
    formData;rowindex;
    isUpdate=false;
    constructor(){
        super();
        super.metadatakeyid=this.dataset.metadataKeyId;
//console.log(`ZweForm^constructor^value of metadatakeyid:${this.metadatakeyid}`);
        this.formItem=new Item();
     
       }   
    
    connectedCallback(){ 
//console.log(`ZweForm^connected callback^audit^entering connected callback: calling pre`);
//console.log(`ZweForm^connected callback^value of metadatakeyid:${this.metadatakeyid} under connected callback pre`);
      this.connectedCallbackpre(this.metadatakeyid);
//console.log(`ZweForm^connected callback^audit^entering connected callback: after calling pre`);
     } 
     prerenderprep=()=>{
        console.log("ZweForm^Under pre render prep^ Form metadata item is");
        console.log(this.metadataItem);
        if(this.metadataItem.getData("exec-data-subscribe-able") && this.metadataItem.getData("exec-data-subscribe-able").fieldValue===true){
         zhun_web_data_fiber.subscribe("exec-data-"+this.metadataItem.getData("exec-data-subscribe-able-id").fieldValue,this.handelExecDataSubscription);

        }
     }
     handelExecDataSubscription=(event)=>{
      console.log("ZWEForm^handelExecDataSubscription^ handling event");
      console.log(event);
      this.rowindex=event.detail.getData("zwe-row-index-int").fieldValue;
      this.isUpdate=true;
     this.formItem=event.detail.getRelElementsOnType("exec-data").values().next().value;
     // console.log(forminputItem);
      // this.form
      let formele=this.shadowRoot.getElementById(`frm${this.metadatakeyid}`)
      console.log("form elements are ");
     // console.log(formele.elements);
      let unprocessedfieldelements=new Map();
      this.formItem.getDataMap().forEach(field=>{
      //   console.log("each field is");
      //   console.log(field);
       //  console.log("form ele is");
         let inputele=formele.elements[field.name];
         if(inputele){
         switch(inputele.type) {
            case 'checkbox': inputele.checked = !!field.fieldValue; break;
            default:         inputele.value = field.fieldValue;     break;
        }
      }else{
         unprocessedfieldelements.set(field.name,field);
      }
      //   console.log(inputele);

      })
      console.log("unprocessed fields are:");
      console.log(unprocessedfieldelements);
      let filteredItemlist=Array.from(this.metadataItem.getRelElementsOnType(`render-metadata`).values()).filter(item=>
         item.getData("contains-subscribeable-ce") && item.getData("contains-subscribeable-ce").fieldValue && Array.from(item.getRelElementsOnType("RNDR_MDT").values()).
         filter(sitem=> sitem.t_type==="subscribeable-ce").length>>0)
      console.log("filterdlist with subscribeablefiels is");
      console.log(filteredItemlist);

      filteredItemlist.forEach(ssaitem=>{
       let ffields=Array.from(ssaitem.getRelElementsOnType("RNDR_MDT").values()).filter(sitem=>sitem.t_type==="subscribeable-ce");
         ffields.forEach(field=>{
        let     fname=field.name.toLowerCase().replace(/\s/g,"_");
            if(unprocessedfieldelements.has(fname)){
               console.log("Field identified to be a subcriber based and should be delegated via-exec-data subscription");
               console.log(field);
               zhun_web_data_fiber.push("exec-data-"+field.getId(),unprocessedfieldelements.get(fname))
            }
         })
      })
      unprocessedfieldelements.forEach(field=>{

 
      })

   }
  
     postrendersubs=()=>{
//console.log("under zwe form postrendersubs template  for metadataitem key is:"+this.metadataItem.getId();
    //  console.log(this.shadowRoot.innerHTML);
    
      this.publishSubElementsData(); 
   } 
    
  publishSubElementsData=()=>{
     let button=this.shadow.getElementById(`frm-btn${this.metadataItem.getId()}`)
   //  button.addEventListener("submit",this.handleFormSubmit);
//console.log("under handling form data");
     let form=this.shadow.getElementById(`frm${this.metadataItem.getId()}`);
     form.addEventListener("submit",this.handleFormSubmit);
//console.log("call under publsih subelements data publishing zwe Form  for elemtns");
    //assign handlers for subforms
    let   allsubforms=Array.from(this.shadowRoot.querySelectorAll("form")).filter(f=>f.id!==form.id);
//console.log("all subforms are");
//console.log(allsubforms);
//console.log("METADATAITEM WITH SUBFORMS IS:");

//console.log(this.metadataItem);
    allsubforms.forEach(sform=>{
      sform.addEventListener("submit",this.handleSubFormSubmit);
      let sfitemmdt=this.metadataItem.getRelElementsOnType("sub-forms").get(sform.id.replace(/frm/,""));
//console.log("subformmetdata is");
//console.log(sfitemmdt);
      let sfrenderer=sfitemmdt.getRelElementsOnType("form-data-renderer").values().next().value;
//console.log("sfrenderer item is");
//console.log(sfrenderer);
      zhun_web_metadata_fiber.push(sfrenderer.getId(),sfrenderer);

    })
     Array.from(this.metadataItem.getRelElementsOnType("RNDR_MDT").values()).map(item=>{
       if(item.getData("contains-subscribeable-ce") && item.getData("contains-subscribeable-ce").fieldValue){ 
         Array.from(item.getRelElementsOnType("RNDR_MDT").values()).map(subitem=>{
               if(subitem.t_type==="subscribeable-ce"){
                  subitem.addData("form", new ItemData("form",`frm${this.metadataItem.getId()}`))
                  subitem.addData("form-keys", new ItemData("form-keys",[subitem.name.toLowerCase().replace(/\s/g,"_")]));
//console.log("zwe-form subitem is subscribable push data");
//console.log(subitem);
//console.log("this is ");
//console.log(this);
//console.log( this.shadowRoot.querySelector(`#s${subitem.getId()}`) );
                 let elseis= this.shadowRoot.querySelector(`#s${subitem.getId()}`);
                  elseis.parentNode.classList.add("subscribe-able");
                  zhun_web_metadata_fiber.push(subitem.getId(),subitem);
                  zhun_web_data_fiber.subscribe("ipudfrm"+this.metadataItem.getId()+subitem.getId(),this.savesubscribeabledata)
               }
         })
      }
     })
   
  }
  savesubscribeabledata=(event)=>{
console.log("under subscription of the data from subscribeableitems in zwe forms");
     let inputItem=event.detail;
console.log(     event.detail);

      this.sbesformdata.set(inputItem.name.toLowerCase().replace(/\s/g,"_"),inputItem.getData("form-data").fieldValue);
console.log(     ` his.sbesformdata.set(inputItem.name.toLowerCase().replace(/\s/g,"_"),inputItem.getData("form-data").fieldValue)`);
console.log(this.sbesformdata);
  
   }
  handleSubFormSubmit=(event)=>{ 
   event.preventDefault();
//console.log("subform event is");
//console.log(event);
//console.log("Under subform submit");
//console.log("event.target is");
//console.log(event.target);
 
   let data = new FormData(event.target);
//console.log("data.entries() are");
//console.log(Array.from(data.keys()));
     
   let sfkey=  event.target.id.replace(/frm/g,"");
//console.log("sfkey is:"+sfkey);
//console.log(this.metadataItem);
   let sfItem= this.metadataItem.getRelElementsOnType("sub-forms").get(sfkey);
//console.log("sfItem   is ");
//console.log(sfItem);
   let subformitemmap= this.formItem.getRelElementsOnType(sfItem.name.toLowerCase().replace(/\s/g,"_"));
   
//console.log("subform item is");
//console.log(sfItem);
  let trainingBatch=new Item();

  
   this.updateFromFormData(data,trainingBatch)
   trainingBatch.name="trainingBatch"+trainingBatch.getId();
//console.log("Store object cr eated is");
//console.log(trainingBatch);
//console.log("event inhandleform submit is");
//console.log(event);
//console.log("under handling form data");
    subformitemmap.set(trainingBatch.getId(),trainingBatch);
    let fdrmap=sfItem.getRelElementsOnType("form-data-renderer");
//console.log("fdrmap is");
//console.log(fdrmap);
    
    
    let frmdatarendere=fdrmap.values().next().value;
    let renderslotnameitem=frmdatarendere.getData("render-slot-name");
    let renderslotname=renderslotnameitem.fieldValue;
    let renderslotid=renderslotnameitem.eleid;//TODO refine further. currently we are using fileds element id not items.getId(
    let rendermetadata= new Item();
    rendermetadata.addData("element",new ItemData("element",frmdatarendere.getData("render-element").fieldValue));
    rendermetadata.addData("render-slot-id", new ItemData("render-slot-id",renderslotname+renderslotid));
    let renderSlotmetdata=new Item();
    renderSlotmetdata.name="renderSlotmetdata"
    renderSlotmetdata.addRelElementsOnType("RNDR_MDT", rendermetadata.getId(),rendermetadata);
    // trainingBatch.addRelElementsOnType("RNDR_MDT", rendermetadata.getId(),rendermetadata);
//console.log("trainingbatch after adding the render-metadata");
//console.log(trainingBatch);
    zhun_web_metadata_fiber.push(renderslotname+renderslotid,renderSlotmetdata); 
//console.log("frmdatarendere id is");
//console.log(frmdatarendere.getId();
    let sfore=this.shadowRoot.getElementById("sfor"+frmdatarendere.getId());

//console.log("sforenderele is");
//console.log(sfore);

    let    rendereleTemplate=  _render_element(renderSlotmetdata);

  sfore.insertAdjacentHTML('beforeend', rendereleTemplate); 
 renderSlotmetdata.addRelElementsOnType("exec-data",trainingBatch.getId(),trainingBatch);
 this.adddlcehandlers(trainingBatch);
 
 
 let itmfrmd=frmdatarendere.getData("render-element-metadata").fieldValue.getRelElementsOnType("RNDR_MDT").values().next().value;
 //let rfieldset=itmfrmd.getRelElementsOnType("RNDR_MDT").values().next().value;
//console.log("itmfrmd is");
//console.log(itmfrmd);
 let rmfskeys=Array.from(itmfrmd.getRelElementsOnType("RNDR_MDT").keys());
//console.log("rmfskeys is");
//console.log(rmfskeys);
 let keysmap=new Map();
  rmfskeys.forEach(key=>{
    keysmap.set(key.toLowerCase().replace(/\s/g,"_"),key);
  })
//console.log("keysmap is");
//console.log(keysmap);
 Array.from(data.keys()).forEach(key=>{
//console.log("checking for datakey:"+key);
   if(keysmap.get(key)){
   let fieldItem=itmfrmd.getRelElementsOnType("RNDR_MDT").get(keysmap.get(key));
//console.log("fieldItem on key:"+key +" is");
//console.log(fieldItem);
   fieldItem.addData("value", new ItemData("value",data.get(key)));
   fieldItem.addData("read-only", new ItemData("read-only",true));
//console.log("fieldItem after update is");
//console.log(fieldItem);
   }else{
//console.log(`key ${key} not found in keysmap`);
   }
})
//console.log("itmfrmd after update is");
//console.log(itmfrmd);
 let rmdmap=new Map();
  rmdmap.set(itmfrmd.getId(),itmfrmd);
 renderSlotmetdata.setRelElementsMapOnType("RNDR_MDT",rmdmap);
//console.log("frmdatarendere to get submit name is");
//console.log(frmdatarendere);
 renderSlotmetdata.addData("submit-name",frmdatarendere.getData("render-element-metadata").fieldValue.getData("submit-name"));
 renderSlotmetdata.addData("submit-mode",frmdatarendere.getData("render-element-metadata").fieldValue.getData("submit-mode"));
 renderSlotmetdata.addData("submit-broadcast",frmdatarendere.getData("render-element-metadata").fieldValue.getData("submit-broadcast"));
  
   zhun_web_metadata_fiber.push(renderSlotmetdata.getId(),renderSlotmetdata);
 
//console.log("form item after updating the batch is");
//console.log(this.formItem ); 
    let eu=new EntityUtil();
//console.log("eu is" );
//console.log(eu);
//console.log("eu.replacer is");
//console.log(eu.replacer);
    let formItemStr=JSON.stringify(this.formItem, eu.replacer);
//console.log("this formitem str:"+formItemStr);
    let composedItem=JSON.parse(formItemStr,Item.reviver);
//console.log("composed item is");
//console.log(composedItem);
    return false;
  }
  replacer(key,value){
    if(value instanceof Map  ){
       let obj= new Object();
       value.forEach((val, key) => {
        obj[key] = val;
          });
            // console.log("value is instance of map:reutring obj:"+JSON.stringify(obj)+" for key:"+key);
          return obj;
    }else{

      // console.log("value is NOT an of map:reutring value:"+value+" for key:"+key)
      return value;
    }
  }
  adddlcehandlers=(item)=>{
    zhun_web_metadata_fiber.subscribe("dlce-Delete"+item.getId(),this.handlerdlceonsubforms);
  }

  handlerdlceonsubforms=(event)=>{
//console.log("dlce event captured");
//console.log(event);
//console.log("dlce event details are ");
//console.log(event.detail);
    let eitem=event.detail;
//console.log("form item is");
//console.log( this.formItem.getAllRelElements());
    if(eitem.getData("mode").fieldValue.toLowerCase()==="delete"){
//console.log("Rel elements to b processed are");
      this.formItem.getAllRelElements().forEach((map)=>{
//console.log("map is");
//console.log(map);
        if(map.has(eitem.getData("id").fieldValue)){
          map.delete(eitem.getData("id").fieldValue);
        }
      })
      
        // console.log();
        

    }
  }
  updateFromFormData=(formdata,item,sbesfd)=>{
   //let eledata=new Item();
  
//console.log(JSON.stringify(Array.from(formdata.entries())));

   let value = Object.fromEntries(formdata.entries());
   console.log("subform redndering value object is");
   console.log(value);
   for (var key of Object.keys(value)) {
    item.addData(key, new ItemData(key,value[key]));
   } 
   if(sbesfd){
   sbesfd.forEach(frmdata=>{
   this.updateFromFormData(frmdata,item)
  })
}
   //item.addRelElementsOnType("exec-data",eledata.getId(),eledata);
  }
  handlerforSubmitAsBroadcast=(event)=>{
//console.log("handling event as formsubmit for broadcast");
//console.log(event);
    let data=event.submitter.dataset;
    let item=new Item();
    item.addData("mode", new ItemData("mode",data.mode));
    item.addData("id", new ItemData("mode",data.bcstid));
    item.t_type="lce";
    item.c_type="ce"
    zhun_web_metadata_fiber.push('dlce-'+data.mode+data.bcstid,item);
    let element=this.shadowRoot.getElementById(event.target.id);
  if(data.mode.toLowerCase()==="delete"){
      this.remove();
      }

  }
  handleFormSubmit=(event)=>{
   event.preventDefault();
//console.log("zwe-form^handleFormSubmit^event captured");
//console.log("event-submitter is");
//console.log(event.submitter.dataset);
    if(event.submitter.dataset.bcstid){
      this.handlerforSubmitAsBroadcast(event);
//console.log("returning with no further action");
    return false;

    }else{
//console.log("handling as general form");
//console.log(event);
//console.log("event-target is");
//console.log(event.target);

//console.log("event-target id is");
//console.log(event.target.id);
  let data = new FormData(event.path[0]);
//console.log("data.entries() are");
   
 

//console.log(Array.from(data.entries()));
   this.updateFromFormData( data  ,this.formItem,this.sbesformdata); 
//    this.sbesformdata.forEach((formdata,fieldname)=>{
//       let formdataArray=Array.from(formdata.entries);

// console.log("formdata array for subform is");
// console.log(formdataArray);
// Array.from(formdata.entries()).forEach(pair=>{
//    data.append(pair[0],pair[1])
// }

//    )
//      this.updateFromFormData(formdata,this.formItem)
//    });
console.log("Store object created is");
console.log(this.formItem);
//console.log("event inhandleform submit is");
//console.log(event);
//console.log("under handling form data");
 let itemservice= new ItemService();
   console.log("before calling item service add: data as per urlsearch is");
  console.log(Array.from(data.entries()));
  console.log(`<hr>`); console.log( new URLSearchParams(data).toString());
  //let rowindex=this.formItem.getData("zwe-row-index-int").fieldValue;
 // this.formItem.removeData("zwe-row-index-int");

   itemservice.add("records","training",this.formItem);
   console.log("metadata item at store  add or update is ");
      console.log(this.metadataItem);
  if(this.isUpdate){
     this.formItem.addData("zwe-row-index-int", new ItemData("zwe-row-index-int",this.rowindex))
   zhun_web_data_fiber.push("record_updated"+"-"+"records"+"-"+this.metadataItem.getData("collection").fieldValue,this.formItem);

  }else{
   zhun_web_data_fiber.push("record_created"+"-"+"records"+"-"+this.metadataItem.getData("collection").fieldValue,this.formItem);
   this.formItem= new Item();
  
  }
   //TODO below is done to keep form ready for new item without refresh. However any side-effects of this are to be fixed.
    return false;
  }
  }

     render(){
//console.log(`ZweForm^render^audit^calling renderer of the layout render`);

      _render(this);  
//console.log("ZweForm^render^audit^after alling render template was");
//console.log(this);
//console.log("metadata item is");
//console.log(this.metadataItem);
     }  


} 
// customElements.define('zwe-form',ZweForm,{extends:'form'})
customElements.define('zwe-form',ZweForm)
