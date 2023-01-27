 import { EntityUtil, Item, ItemData } from '../../../../../../zhun-data-elements/zhun-data-elements';
import { DataElementTypeConfig } from '../../../../../../zhun-store-adapter/firestore-adapter/config/DataElementTypeconfig';
import { ItemServiceUtil } from '../../../../../../zhun-store-adapter/firestore-adapter/item-servicee-util';
import { ItemService } from '../../../../../../zhun-store-adapter/firestore-adapter/item.service';
import { zhun_web_data_fiber, zhun_web_metadata_fiber } from '../../../../../../zhun-web-fabric/zhun-fabric';
import { _get_functions } from '../../../../std/elements/fuctions/util/functions-repo';
import { searchRMItemOnId } from '../../../../std/elements/fuctions/util/search-item';
import { _render_element,_render_self_as_element } from '../../../../std/elements/templates/list/list-templates';
import { ZweCoreForm } from '../../core/zwe-core-form';
import {_render} from './zwe-form-render'
 export class ZweForm extends ZweCoreForm{
    formItem;
    formData;rowindex;subelementsitemmap;
    isUpdate=false;
    parentId='';
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
   //  let itemservice= new ItemService();
   //  itemservice.add("records",this.metadataItem.getData("collection").fieldValue+"_form_schema",this.metadataItem)
        if(this.metadataItem.getData("exec-data-subscribe-able") && this.metadataItem.getData("exec-data-subscribe-able").fieldValue===true){
         zhun_web_data_fiber.subscribe("exec-data-"+this.metadataItem.getData("exec-data-subscribe-able-id").fieldValue,this.handelExecDataSubscription);

        }else{
         console.log("No exec data subscribable in zwe form");
        }
     }
     handelExecDataSubscription=(event)=>{
      console.log("ZWEForm^handelExecDataSubscription^ handling event");
      console.log(event);
      this.rowindex=event.detail.getData("zwe-row-index-int").fieldValue;
      this.isUpdate=true;
      // alert("setting update to true");
     this.formItem=event.detail.getRelElementsOnType("exec-data").values().next().value;
     console.log("subscribed item in zwe form is:");
     console.log(this.formItem);
      // this.form
      let formele=this.shadowRoot.getElementById(`frm${this.metadatakeyid}`)
      console.log("form elements are ");
     console.log(formele.elements);
      let unprocessedfieldelements=new Map();
      this.formItem.fields.forEach(field=>{
        console.log("each field is");
        console.log(field);
        console.log("form ele is");
         let inputele=formele.elements[field.name];
         console.log("inputele  is for field:"+field.name);
         console.log(inputele);

         if(inputele){
            // mappedFields(field.name,field.name)
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
      this.formItem.getAllRelElementRefs().forEach((map,key)=>{
         console.log("All relements refs to be worked on are for key"+key);
         console.log(Array.from(map.keys()));
         zhun_web_data_fiber.push("rel-exec-data"+key+"edse"+this.metadataItem.getId(),Array.from(map.keys()))
      })

    ////exec-data-subscribe-able///
    this.broadcastInstanceId();
   }
  
     postrendersubs=()=>{
//console.log("under zwe form postrendersubs template  for metadataitem key is:"+this.metadataItem.getId();
    //  console.log(this.shadowRoot.innerHTML);
    
      this.publishSubElementsData(); 
   } 
    
   handleSubElements=(event)=>{
      console.log("zwe-form^handleSubElements^under handling sub elements data");
      console.log(event);
      console.log(event.detail);
      
      this.formItem.addRelElementRefsOnType(event.detail.getData("collection_name").fieldValue,event.detail.getId(),event.detail.getId());
      // this.formItem.addRelElements
   console.log("form item after setting relelemnts of subelement type is");
   console.log(this.formItem);
   }
   handlebiidevent=(event)=>{
      console.log("ZweForm^handlebiidevent^event captured is");
      console.log(this.metadataItem);
      console.log(event);
      console.log(event.detail);
      this.parentId=event.detail;
   }
  publishSubElementsData=()=>{
     let button=this.shadow.getElementById(`frm-btn${this.metadataItem.getId()}`)
     if(this.metadataItem.getData("element_broadcast_id")){
        let broadcastId=this.metadataItem.getData("element_broadcast_id").fieldValue.replace(/^edse/,"");
        zhun_web_data_fiber.subscribe("edse_biid"+broadcastId,this.handlebiidevent);
     }

     let form=this.shadow.getElementById(`frm${this.metadataItem.getId()}`);
   //   form.
     
     form.addEventListener("submit",this.handleFormSubmit);
     let formele=this.shadowRoot.getElementById(`frm${this.metadatakeyid}`)
     console.log(formele.id);//.filter(ele.form==formele.id)
     Array.from(this.shadowRoot.querySelectorAll("select")).filter(s=>s.form.id==form.id).forEach(ele=>{ 
      console.log("element from form :with id:"+formele.id+ "ele.form.id:"+ele.form.id);
      console.log(ele);
     let onload=true;
      Array.from(this.metadataItem.getRelElementsOnType("RNDR_MDT").values()).filter(me=> me.id==ele.id).filter(e=>(e.fields.get("options_dervation_collection")!=undefined && e.fields.get("options_dervation_collection_parent")==undefined )).forEach(sele=>{    
         this.createSelectOptions(sele,ele);
         // console.log("idvalele :");
         // console.log(idvalele);
         console.log("sele");
         console.log(sele);
         console.log("formitem for setting the bpv value:")
         console.log(this.formItem);
         sele.addData("bpv",new ItemData("bpv",ele.value));
         console.log("adding bpv change value to metadata sele [["+sele.fields.get("bpv").fieldValue+"]]");
         ele.addEventListener("change",this.handleChildDropDownSelect)
         // this.createForChild(sele);
      })
   //    Array.from(this.metadataItem.getRelElementsOnType("RNDR_MDT").values()).filter(me=> me.id==ele.id).filter(e=>(e.fields.get("options_dervation_collection")!=undefined && e.fields.get("options_dervation_collection_parent")!=undefined )).forEach(sele=>{    
   //     //this are child
   //       this.createSelectOptions(sele,ele);
   //    //   ele.addEventListener("change",this.handleChildDropDownSelect)
   //   })
     })
    let   allsubforms=Array.from(this.shadowRoot.querySelectorAll("form")).filter(f=>f.id!==form.id);
console.log("all subforms are");
console.log(allsubforms);
console.log("METADATAITEM WITH SUBFORMS IS:");

console.log(this.metadataItem);
    allsubforms.forEach(sform=>{
      sform.addEventListener("submit",this.handleSubFormSubmit);
      let sfitemmdt=this.metadataItem.getRelElementsOnType("sub-forms").get(sform.id.replace(/frm/,""));
   console.log("sfitemmdt is");
   console.log(sfitemmdt);
      let sfrenderer=sfitemmdt.getRelElementsOnType("form-data-renderer").values().next().value;
console.log("sfrenderer item is");
console.log(sfrenderer);
if(sfitemmdt.getData("is_sub_element_manager")&& sfitemmdt.getData("is_sub_element_manager").fieldValue){
   //submite metadata for subform-manager
  // zhun_web_metadata_fiber.push(sfitemmdt.getId(),sfitemmdt);

}else{
      zhun_web_metadata_fiber.push(sfrenderer.getId(),sfrenderer);
   }
    })

    this.metadataItem.getRelElementsOnType("sub_elements_form_components").forEach(item=>{
       //subscribe for getting subelement details :
       zhun_web_data_fiber.subscribe("edse"+this.metadataItem.getId()+item.getId(),this.handleSubElements);
      //  zhun_web_data_fiber.push("edse_pid"+this.metadataItem.getId()+item.getId(),formItem.getId());
      
  
      })
    //SET SUBSCRIPTIONS OF SUBFORM ITEMS WHERE FOR-ELEMENTS ARE EDITED BY OTHER DELEGATED CUSTOM-ELEMENTS
     Array.from(this.metadataItem.getRelElementsOnType("RNDR_MDT").values()).map(item=>{
       if(item.getData("contains-subscribeable-ce") && item.getData("contains-subscribeable-ce").fieldValue){

         if(item.getData("rmd_e_o_e") && item.getData("rmd_e_o_e").fieldValue){
               console.log("item has rmd_e_o_e setting click listener");
               let ele=this.shadowRoot.getElementById(item.getId());
            console.log("Element is ");
            console.log(ele);
               ele.addEventListener("click",this.handle_rmd_eoe);
         }else{
             
         Array.from(item.getRelElementsOnType("RNDR_MDT").values()).map(subitem=>{
            if(subitem.t_type==="subscribeable-ce"){
               subitem.addData("form", new ItemData("form",`frm${this.metadataItem.getId()}`))
               subitem.addData("form-keys", new ItemData("form-keys",[subitem.name.toLowerCase().replace(/\s/g,"_")]));
console.log("zwe-form subitem is subscribable push data");
console.log(subitem);
//console.log("this is ");
//console.log(this);
//console.log( this.shadowRoot.querySelector(`#s${subitem.getId()}`) );
              let elseis= this.shadowRoot.querySelector(`#s${subitem.getId()}`);
               elseis.parentNode.classList.add("subscribe-able");
               // subitem.addData("ed_parent_id", new ItemData("ed_parent_id",formItem.getId()))
               zhun_web_metadata_fiber.push(subitem.getId(),subitem);
               zhun_web_data_fiber.subscribe("ipudfrm"+this.metadataItem.getId()+subitem.getId(),this.savesubscribeabledata)
              if(subitem.getRelElementsOnType("exec_cntx")){
                 let exec_cntx=subitem.getRelElementsOnType("exec_cntx").values().next().value;
                 if(exec_cntx){
                  zhun_web_data_fiber.subscribe(exec_cntx.type+"frm"+this.metadataItem.getId()+subitem.getId(),this.render_metadata_on_event)
                 }
              }
            }
      })
         }

      }
     })
     if(!this.metadataItem.getData("exec-data-subscribe-able"))
{ 
   this.broadcastInstanceId();
}
   // zhun_web_data_fiber.push("",)
  }
  handle_rmd_eoe=(event)=>{
   console.log("event captured for handling rmd_eoe is");
   console.log(event)
   console.log(event.target);
   let tgate=event.target;
   if(event.target.tagName==="LEGEND"){
      tgate=event.target.parentNode
   }
   console.log("target is");
   // console.lo(event.cur);
   console.log(tgate);
   console.log(tgate.classList);
   console.log(`tgate.classList.contains("expanded") ${tgate.classList.contains("expanded")}`);
   
   if(tgate.classList.contains("minimized")){
      // let eleItem=this.metadataItem.getRelElementsOnType("RNDR_MDT");
      console.log("eleItem is");
      console.log(this.metadataItem);
 let itemforrmdeoe=searchRMItemOnId(this.metadataItem,tgate.id);
      console.log(itemforrmdeoe);
      this.process_render_metadata_on_event(tgate,itemforrmdeoe.getRelElementsOnType("exec_data").values().next().value)
   }
  }
  render_metadata_on_event=(event)=>{
   console.log("remder_metadata_on_event in zwe forms event is");
   console.log(event);
  let item=event.detail;
   this.process_render_metadata_on_event(item);
}
process_render_metadata_on_event=(node,item)=>{
   // let ele=this.shadowRoot.getElementById("s"+item.parentId);
   // console.log("ele clicked is");
   // console.log(ele);
   let generate_metadata_fuction=item.getData("gmd_f").fieldValue;
   let metadata_fuction_params=item.getData("gmd_f_prms").fieldValue;
   console.log("generate_metadata_function is");
   console.log(generate_metadata_fuction);
   console.log("metadatafuction parms are");
   console.log(metadata_fuction_params);
   console.log("item name is");
   let item_name=metadata_fuction_params[0];
   console.log(item_name);
   console.log("form fuction is");
   let form_func=_get_functions(metadata_fuction_params[1]);
   console.log(form_func);
   console.log("view fuction is");
   let view_func=_get_functions(metadata_fuction_params[2]);
   console.log(view_func);
   console.log("attr_contex is");
   let attr_cntx=metadata_fuction_params[3]
   console.log(attr_cntx);
let   mditem=generate_metadata_fuction(item_name,form_func ,view_func ,attr_cntx )
   console.log("mditem to render is");
   console.log(mditem);
    let    rendereleTemplate=  _render_self_as_element(mditem);
   // let parent=ele.parentNode;
   node.insertAdjacentHTML("beforeend",rendereleTemplate);
   zhun_web_metadata_fiber.push(mditem.getId(),mditem);
}
  broadcastInstanceId=()=>{

   console.log("metadata item to push the formid on attribute context of broad-cast-instance id is");
   console.log(this.metadataItem);
   console.log("this.formItem is");
   let isu= new ItemServiceUtil();
   console.log(isu.getItemJson(this.formItem));
   console.log(this.formItem);
  this.updateMetadataSelectOnFormItem();
   console.log("after setting initinal bvp to actual value:");
   console.log(isu.getItemJson(this.metadataItem));
   console.log(this.metadataItem.getRelElementsOnType("attribute_context").get("attr_cntx"));
   let attrcntx=this.metadataItem.getRelElementsOnType("attribute_context").get("attr_cntx");
   if(attrcntx){
    let fecntx=        attrcntx.getRelElementsOnType("event_contexts").get("fe_cntx");
    console.log("fecntx is");
    console.log(fecntx);
    if(fecntx.getData("broadcast_instance_id") &&fecntx.getData("broadcast_instance_id").fieldValue){ 
        zhun_web_data_fiber.push("edse_biid"+this.metadataItem.getId(),this.formItem.getId())
    }
   }
  }

  updateMetadataSelectOnFormItem=()=>{
   Array.from(this.metadataItem.getRelElementsOnType('RNDR_MDT').values()).filter(v=>v.fields.get("element")!=undefined && v.fields.get("element").fieldValue=="select").forEach(v=>{
      console.log("loking at value:");
      console.log(v );
      // if(v.fields.get("bvp")==undefined  ){
      //    console.log("loking at value bvp item is empty:");
      //    console.log(v);
         // console.log("this.formItem.fields.get(v.name) is:");
         // console.log(this.formItem.fields.get(v.name));
         if(this.formItem.fields.get(v.name)!=undefined){
         v.addData("bpv", this.formItem.fields.get(v.name));
         console.log(v);
      }
      // }
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
   let data = new FormData(event.target); 
     //get the key of the subform that is submited
   let sfkey=  event.target.id.replace(/frm/g,"");
 
//get the sub-form-Item the subformslist from the metadata of this parent.
let sfItem= this.metadataItem.getRelElementsOnType("sub-forms").get(sfkey);

//getall subform items from the formitem that were submited to the core store item for this formtype.
let subformitemmap= this.formItem.getRelElementsOnType(sfItem.name.toLowerCase().replace(/\s/g,"_"));
    
  let trainingBatch=new Item();

  
   this.updateFromFormData(data,trainingBatch)
   trainingBatch.name="trainingBatch"+trainingBatch.getId(); 
    //update local subform submited on the formitem to bestored: 
    subformitemmap.set(trainingBatch.getId(),trainingBatch);

    //render the item. prep a new renderer each time.
    let fdrmap=sfItem.getRelElementsOnType("form-data-renderer");  

    let frmdatarendere=fdrmap.values().next().value;
   if(frmdatarendere===undefined){
      console.log("frmdatarendere item is undeifned");
      console.log(frmdatarendere);
      if(   sfItem.getData("is-form-data-renderer") && sfItem.getData("is-form-data-renderer").fieldValue ){
         console.log("subform item itself is form-data-renderer");
         console.log(sfItem);
      }
   }
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
   console.log("FORM DATA ENTRIES ARE");
console.log(JSON.stringify(Array.from(formdata.entries())));

   let value = Object.fromEntries(formdata.entries());
   console.log("value object is");
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
console.log("handling event as formsubmit for broadcast");
console.log(event);
    let data=event.submitter.dataset;
    let item=new Item();
    item.addData("mode", new ItemData("mode",data.mode));
    item.addData("id", new ItemData("mode",data.bcstid));
    item.t_type="lce";
    item.c_type="ce"
        let element=this.shadowRoot.getElementById(event.target.id);
  if(data.mode.toLowerCase()==="delete"){
      this.remove();
      }

  }

  
  handleChildDropDownSelect =(event)=>{
   console.log("on change of drop down:");
   console.log(event);

   console.log(event.target);
   console.log("target is:");
   console.log("event target value is:"+event.target.value);
   
   console.log("event target recent is:"+event.target.recent);
   console.log("this.metadataItem.getRelElementsOnType(RNDR_MDT).get(event.target.id)::"+event.target.name);
   let iteme=this.metadataItem.getRelElementsOnType("RNDR_MDT").get(event.target.name);
   if(iteme.fields.get("bpv")!=undefined){
   console.log("this.metadataItem.getRelElementsOnType(RNDR_MDT).get(event.target.id):iteme: before pv change [["+iteme.fields.get("bpv").fieldValue+"]]");
   }
   console.log("this.metadataItem.getRelElementsOnType(RNDR_MDT).get(event.target.id):iteme: after pv change");
   console.log(iteme );
   console.log(this.metadataItem.getRelElementsOnType("RNDR_MDT").get(event.target.name));
   this.createForChild(event.target);
// this.createSelectOptions(sele,event.target);

  }
  createForChild(pele){
   Array.from(this.metadataItem.getRelElementsOnType("RNDR_MDT").values()).filter(val=>(val.fields.get("options_dervation_collection_parent")!=undefined && val.fields.get("options_dervation_collection_parent").fieldValue==pele.name)).forEach(mdi=>{
      let   sele=mdi;
      let formele=this.shadowRoot.querySelectorAll('[name="'+sele.name +'"]')[0];
      console.log("formele idenfified for load of change of dataa");
      //   let formele=this.shadowRoot.getElementById(`frm${this.metadatakeyid}`)
     console.log(formele);//.filter(ele.form==formele.id)
   // let parentEle=this.shadowRoot.querySelectorAll('[name="'+filteronParent +'"]')[0];
   this.createSelectOptions(sele,formele);

   })
  }

  handleDropDownSelect =(event)=>{
   console.log("onclick of drop down:");
   console.log(event);
   console.log("target is:");
   console.log("this.metadataItem.getRelElementsOnType(RNDR_MDT).get(event.target.id)::"+event.target.name);
   console.log(this.metadataItem.getRelElementsOnType("RNDR_MDT").get(event.target.name));
let   sele=this.metadataItem.getRelElementsOnType("RNDR_MDT").get(event.target.name);
this.createSelectOptions(sele,event.target);

  }

  createSelectOptions(sele,ele){
   console.log('element selected for adding change listner');
   console.log(sele);
   //for this element we need  to itemservice . get all items for the given {"options_dervation_collection" => y}{"options_dervation_collection_type" => y}
   let itemServie= new ItemService();
   let colname=sele.fields.get("options_dervation_collection").fieldValue;
   let filterType=sele.fields.get("options_dervation_collection_type").fieldValue;
   if(sele.fields.get("options_dervation_collection_parent")!=undefined){
      let filteronParent=sele.fields.get("options_dervation_collection_parent").fieldValue;
      console.log("Form data is:");
      console.log(this.formData);
      let formele=this.shadowRoot.getElementById(`frm${this.metadatakeyid}`)
     console.log(formele.id);//.filter(ele.form==formele.id)
   let parentEle=this.shadowRoot.querySelectorAll('[name="'+filteronParent +'"]')[0];
      console.log("parent ele is: for name:"+filteronParent+" with value");
      console.log(parentEle.value);

      console.log("on parent : colname and type: "+colname+" fitlertype:"+filterType);
      itemServie.getOnParent(colname,filterType,parentEle.value).then(resp=>{
            console.log("REPSONE OF DOMAIN LIST:");
            console.log(JSON.stringify(resp));
            console.log("ele is");
            console.log(ele);
            let defaultph=ele.options[0];

            ele.options.length = 0;
            ele.add(defaultph);
            resp.forEach(itm=>{
               let option = new Option(itm.name, itm.id); 
               ele.add(option);
              
            })
         })

   }else{

   console.log("colname and type: "+colname+" fitlertype:"+filterType);
   itemServie.getOnType(colname,filterType).then(resp=>{
         console.log("REPSONE OF DOMAIN LIST:");
         console.log(JSON.stringify(resp));
         console.log("ele is");
         console.log(ele);       
              let defaultph=ele.options[0];

         ele.options.length = 0;
         ele.add(defaultph);

         resp.forEach(itm=>{
            let option = new Option(itm.name, itm.id); 
            ele.add(option);
           
         })
      })
   }

  }
  handleFormSubmit=(event)=>{
   event.preventDefault();
 console.log("zwe-form^handleFormSubmit^event captured");
 console.log("event-submitter is");
 console.log(event.submitter.dataset);
    if(event.submitter.dataset.bcstid){
      this.handlerforSubmitAsBroadcast(event);
 console.log("returning with no further action");
    return false;

    }
   //  else if (this.metadataItem.getData("is_sub_element_form") && this.metadataItem.getData("is_sub_element_form").fieldValue){
   //    this.handlerforSubmitAsBroadcast(event);
   //    console.log("returning with no further action");
   //       return false;
   //  }
    else{
 console.log("handling as general form");
 console.log(event);
console.log("event-target is");
console.log(event.target);

console.log("event-target id is");
console.log(event.target.id);
  let data = new FormData(event.target);
console.log("data.entries() are");
console.log(data);
   if(this.metadataItem.getData("zwe-file-upload-form")!=undefined){
      console.log("handleFile");
   let   datafile=data['File'];
   console.log("datafile");
   console.log(datafile);

   }
  console.log(this.metadataItem);
if(this.metadataItem.getData("is_sub_element_form")){
   console.log("this is a sub-element forM");
}
console.log(Array.from(data.entries()));
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
 console.log("parentId is");
 console.log(this.parentId);
 this.formItem.parentId=this.parentId;

console.log("Store object after setting parent id is");
console.log(this.formItem);
console.log("this.metadataItem.getData(collection).fieldValue is:"+this.metadataItem.getData("collection").fieldValue);
if(this.isUpdate){
   // this.me
   console.log("Metadata item on update of form:");
   console.log(this.metadataItem);
 Array.from(   this.metadataItem.getRelElementsOnType("RNDR_MDT").values()).filter(v=>( v.fields.get("bpv")!=undefined && v.fields.get("bpv").fieldValue !=undefined &&  v.fields.get("bpv").fieldValue !="" ) ).forEach( vl=>{
   console.log("bpv value to update on form :");
   console.log(vl);
   //   let valOffield= this.formItem.fields.get(vl.name);
   // console.log("val of field is:");
   // let newval=valOffield.fieldValue;
   // let  itm= new Item();
   // itm.addData("old_value",new ItemData("old_value",vl.fields.get("bpv").fieldValue));
   // itm.addData("new_value",new ItemData("new_value",newval));
   this.formItem.addData("old_value_"+vl.name,vl.fields.get("bpv"));

   // this.formItem.addData(vl.name,itm);
   // console.log(valOffield);
 })
   console.log("formItem item on update of form:");
   console.log(this.formItem);
   console.log("calling update from zwe-form");
   this.formItem.removeData("zwe-row-index-int");
   itemservice.update("records",this.metadataItem.getData("collection").fieldValue,this.formItem);

   this.updateMetadataSelectOnFormItem();
} else{
   
   console.log("this.metadataItem.getData(data_type).fieldValue");
   
   console.log(this.metadataItem.getData("data_type").fieldValue);
     this.formItem.type=this.metadataItem.getData("data_type").fieldValue;
itemservice.add("records",this.metadataItem.getData("collection").fieldValue,this.formItem);
}console.log("ZweForm^meta data item just post storage is^");
 console.log(this.metadataItem);
   if(this.isUpdate){
     this.formItem.addData("zwe-row-index-int", new ItemData("zwe-row-index-int",this.rowindex))
     
     zhun_web_data_fiber.push("record_updated"+"-"+"records"+"-"+this.metadataItem.getData("collection").fieldValue+this.metadataItem.getData("record_boradcast_eid").fieldValue,this.formItem);
//in case of created the rel-id still remains the same so no need to trigger an event
     // if(this.metadataItem.getData("is_sub_element_form") && this.metadataItem.getData("is_sub_element_form").fieldValue){
      //  console.log("sub_element flag and braodcast ids are found dispaching event");
      //    zhun_web_data_fiber.push("sub_ele_record_updated"+"-"+"records"+"-"+this.metadataItem.getData("collection").fieldValue+this.metadataItem.getData("element_broadcast_id").fieldValue,this.formItem);

      // }
  }else{
   zhun_web_data_fiber.push("record_created"+"-"+"records"+"-"+this.metadataItem.getData("collection").fieldValue+this.metadataItem.getData("record_boradcast_eid").fieldValue,this.formItem);
   if(this.metadataItem.getData("is_sub_element_form") && this.metadataItem.getData("is_sub_element_form").fieldValue){
      console.log("sub_element flag and braodcast ids are found dispaching event");
      if(this.metadataItem.getData("element_broadcast_id") && this.metadataItem.getData("sub_element_broadcast_event_suffix")){
         this.formItem.parentId=this.metadataItem.getData("element_broadcast_id").fieldValue.replace(/^edse/,"");
         this.formItem.addData("collection_name",new ItemData("collection_name",this.metadataItem.getData("collection").fieldValue))
        zhun_web_data_fiber.push(this.metadataItem.getData("element_broadcast_id").fieldValue+this.metadataItem.getData("sub_element_broadcast_event_suffix").fieldValue,this.formItem);
      }
     }  this.formItem= new Item();
     if(!this.metadataItem.getData("exec-data-subscribe-able"))
     { 
        this.broadcastInstanceId();
     }
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
