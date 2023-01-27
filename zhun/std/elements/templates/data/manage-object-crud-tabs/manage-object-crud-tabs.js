import { Item, ItemData } from "../../../../../../../zhun-data-elements/zhun-data-elements";

const getBaseManageTab=(objectname)=>{
    let manageTabs= new Item();
    manageTabs.name=`Manage ${objectname}s Tabs`;
    manageTabs.type="ZweTabslayout"
    manageTabs.addData("tagName",new ItemData("tagName","zwe-tab-layout"))
    manageTabs.addData("tab-rendering-attribute",new ItemData("tab-rendering-attribute","render-tab-link") );
    let headermdt= new Item();
    headermdt.name="header";
    
    let maincmdt= new Item();
    maincmdt.name="main-content";
    
    manageTabs.addRelElementsOnType("layout-metadata",headermdt.name,headermdt);
    manageTabs.addRelElementsOnType("layout-metadata",maincmdt.name,maincmdt);
    return manageTabs;
}
export{getBaseManageTab}

const getTab=(tabname,objectname,formfunc,datamap)=>{
    let tab= new Item();
    tab.name=`${tabname} ${objectname}`;
    tab.type="ZweTab"
    tab.addData("tab-title", new ItemData("tab-title",`${tabname} ${objectname}`));
    tab.addData("tab-content",new ItemData("tab-content",`this is the tab content of ${tabname}  ${objectname}`))
    tab.addData("tab-render-id", new ItemData("tab-render-id",`${tabname}_${objectname}`));
    tab.addData("base-attributes",new ItemData("base-attributes","render-tab-link") );
    if(formfunc){
        let form=formfunc(`${tabname}`,` ${objectname} Form`);
        if(datamap){
        datamap.forEach((value,key)=>form.addData(key,new ItemData(key,value)));
    }
       
        tab.addRelElementsOnType("RNDR_MDT",form.name,form); 
        }

   return tab;
}
export{getTab}
//
const getManageTabs=(name,formfunction,viewfunction,attr_context)=>{
  console.log("attr_context passesd to getmanagetabs is");
  console.log(attr_context);
   let manageTabs=getBaseManageTab(name);
   
   let updatetabmap=new Map();
   updatetabmap.set("exec-data-subscribe-able",true);
   if(attr_context){
      if(attr_context.getData("collection")){
       updatetabmap.set("collection",attr_context.getData("collection").fieldValue)
      } if(attr_context.getData("data_type")){
         updatetabmap.set("data_type",attr_context.getData("data_type").fieldValue)
        }
      }
   //   updatetabmap.set("exec-data-subscribe-able-id",new ItemData("exec-data-subscribe-able-id",updatetab.getId()))
   let updatetab=getTab("Update",name,formfunction,updatetabmap);
//TODO optimize to fix it generically.
   updatetab.getRelElementsOnType("RNDR_MDT").values().next().value.addData("exec-data-subscribe-able-id",new ItemData("exec-data-subscribe-able-id",updatetab.getId()));

    let viewtabmap=new Map();
    viewtabmap.set("update-operation-render-id",updatetab.getId());
   if(attr_context.getData("exec_data_subs_id")){
    viewtabmap.set("exec_data_subs_id",attr_context.getData("exec_data_subs_id").fieldValue);
   } if(attr_context.getData("data_type")){
      viewtabmap.set("data_type",attr_context.getData("data_type").fieldValue);
     }
    let viewtab=getTab("View",name+"s",viewfunction,viewtabmap);
   console.log("view tab from managetabs is");
   console.log(viewtab);
    let addformmap=new Map();
    if(attr_context){
      if(attr_context.getData("collection")){
         addformmap.set("collection",attr_context.getData("collection").fieldValue)
      }if(attr_context.getData("data_type")){
         addformmap.set("data_type",attr_context.getData("data_type").fieldValue)
      }
      }
     if(attr_context){
      if( attr_context.getData("is_sub_element_form")){
    addformmap.set("is_sub_element_form",attr_context.getData("is_sub_element_form").fieldValue)
      }
       if( attr_context.getData("element_broadcast_id")){
    addformmap.set("element_broadcast_id",attr_context.getData("element_broadcast_id").fieldValue);
       }
      if(attr_context.getData("sub_element_broadcast_event_suffix")){
         if(attr_context.getData("sub_element_broadcast_event_suffix").fieldValue==="__from_parent_id"){
            addformmap.set("sub_element_broadcast_event_suffix",manageTabs.getId());
         }else{
          addformmap.set("sub_element_broadcast_event_suffix",attr_context.getData("sub_element_broadcast_event_suffix").fieldValue);
         }
      }
      }
    let addtab=getTab("Add",name,formfunction,addformmap);
    updatetab.getRelElementsOnType("RNDR_MDT").values().next().value.addData("record_boradcast_eid",new ItemData("record_boradcast_eid",viewtab.getRelElementsOnType("RNDR_MDT").values().next().value.getId()));
       addtab.getRelElementsOnType("RNDR_MDT").values().next().value.addData("record_boradcast_eid",new ItemData("record_boradcast_eid",viewtab.getRelElementsOnType("RNDR_MDT").values().next().value.getId()));
   
  
    manageTabs.addRelElementsOnType("RNDR_MDT",viewtab.name,viewtab);
    manageTabs.addRelElementsOnType("RNDR_MDT",addtab.name,addtab);
    manageTabs.addRelElementsOnType("RNDR_MDT",updatetab.name,updatetab)
   
   return manageTabs;
}
export {getManageTabs}
